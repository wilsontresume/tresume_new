const express = require('express');
const router = express.Router();
const pool = require('./database');
var request = require('request');
const multer = require('multer')
const axios = require('axios');
const session = require('express-session');
const { route } = require('./onboarding-routes');
const FormData = require('form-data');
const CryptoJS = require('crypto-js');
require('dotenv').config();
const environment = process.env.NODE_ENV || 'prod';
const envconfig = require(`./config.${environment}.js`);
const apiUrl = envconfig.apiUrl;

const upload = multer();
const redirectUri = `${apiUrl}/getAdobeAccessToken`;

// Adobe Sign application credentials
const adminEmail = "rohit@tresume.us";
const baseUrl = "https://secure.na4.adobesign.com";
const apiurl = "https://api.na4.adobesign.com/";
var accessToken = '';
var refreshToken = '';
var expiresIn = '';
var api_access_point = '';
const cryptkey = "Tresume@123"

router.use(session({
  secret: 'Tresume@123',
  resave: false,
  saveUninitialized: false,
}));


//Auth code
router.get("/getAdobeAuthcode", (req, res) => {

  const scope = "user_read:account+user_write:account+user_login:account+agreement_read:account+agreement_write:account+agreement_send:account+widget_read:account+widget_write:account+library_read:account+library_write:account+workflow_read:account+workflow_write:account";
  const authorizationUrl = `${baseUrl}/public/oauth/v2?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

  res.redirect(authorizationUrl);
});


//Access token
router.get("/getAdobeAccessToken", async (req, res) => {
  const authorizationCode = req.query.code;
  console.log(req.query.code);
  var cid = '';
  var csecret = '';
  pool.request().query(`SELECT TOP 1 *FROM Adobe_cred ORDER BY id DESC`, async (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error executing query');
      return;
    }
    cid = CryptoJS.AES.decrypt(result.recordset[0].clientid, cryptkey).toString(CryptoJS.enc.Utf8);
    csecret = CryptoJS.AES.decrypt(result.recordset[0].secret, cryptkey).toString(CryptoJS.enc.Utf8);
    console.log(cid)
    console.log(csecret)
    try {
      console.log(cid);
      console.log(csecret);
      const body = new URLSearchParams();
      body.append("grant_type", "authorization_code");
      body.append("client_id", cid);
      body.append("client_secret", csecret);
      body.append("redirect_uri", redirectUri);
      body.append("code", authorizationCode);

      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };

      const response = await axios.post(
        `${baseUrl}/oauth/v2/token`,
        body.toString(),
        { headers }
      );
      console.log(response.data);
      accessToken = CryptoJS.AES.encrypt(response.data.access_token, cryptkey).toString();
      refreshToken = CryptoJS.AES.encrypt(response.data.refresh_token, cryptkey).toString();
      expiresIn = response.data.expiresIn;
      api_access_point = response.data.api_access_point;

      req.session.accessToken = accessToken;
      req.session.refreshToken = refreshToken;
      req.session.expiresIn = expiresIn;
      req.session.api_access_point = api_access_point;
      console.log(`UPDATE Adobe_cred SET refreshtoken=` + refreshToken + `, accesstoken=` + accessToken + ` where id = 1`);
      pool.request().query(`UPDATE Adobe_cred SET refreshtoken='` + refreshToken + `', accesstoken='` + accessToken + `' where id = 1`, (err, result) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).send('Error executing query');
          return;
        }

      });
      var reurl = "https://tresume.us/TresumeNG/onboardingList?token=" + accessToken
      res.redirect(reurl);
    } catch (error) {
      console.error("Error retrieving access token:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })

});


//refreshtoken
const checkAccessToken = async (req, res, next) => {
  var refreshToken = req.session.refreshToken
  if (!req.session.accessToken) {
    authcodeurl = `${apiUrl}/getAdobeAuthcode`;
    res.redirect(authcodeurl);
  }

  expiresIn = req.session.expiresIn;
  if (Date.now() >= expiresIn) {
    try {
      const refreshData = new URLSearchParams();
      refreshData.append('grant_type', 'refresh_token');
      refreshData.append('client_id', clientId);
      refreshData.append('client_secret', clientSecret);
      refreshData.append('refresh_token', refreshToken);

      const refreshResponse = await axios.post(`${baseUrl}/oauth/v2/refresh`, refreshData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      req.session.accessToken = refreshResponse.data.access_token;
      req.session.expiresIn = Date.now() + (refreshResponse.data.expires_in * 1000);
    } catch (error) {
      console.error('Error refreshing access token:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  next();
};

async function getAccesstoken() {
  return new Promise((resolve, reject) => {
    pool.request().query(`SELECT TOP 1 * FROM Adobe_cred ORDER BY id DESC`, (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        reject(err);
        return;
      }
      const atoken = CryptoJS.AES.decrypt(result.recordset[0].accesstoken, cryptkey).toString(CryptoJS.enc.Utf8);
      console.log(atoken);
      resolve(atoken);
    });
  });
}

//Upload transientDocuments
router.post('/uploadtransientDocuments', upload.single('File'), async (req, res) => {
  try {

    const fileData = req.file.buffer;
    const endpoint = '/api/rest/v6/transientDocuments';
    const formData = new FormData();
    formData.append('File', fileData, req.file.originalname);

    var accessToken = await getAccesstoken();
    console.log(accessToken);
    var api_access_point = req.session.api_access_point;
    const response = await axios.post(`${apiurl}${endpoint}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
        ...formData.getHeaders(),
      },
    });

    transientDocumentId = response.data.transientDocumentId;
    console.log(transientDocumentId);

    res.json({ transientDocumentId });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Send Agreement
router.post('/agreements', async (req, res) => {
  try {
    const { transientDocumentId, recipientEmail, agreementName } = req.body;
    var api_access_point = req.session.api_access_point;
    const endpoint = '/api/rest/v6/agreements';
    const url = `${apiurl}${endpoint}`;
    var accessToken = await getAccesstoken();

    const requestBody = {
      fileInfos: [
        {
          transientDocumentId: transientDocumentId,
        },
      ],
      name: agreementName,
      participantSetsInfo: [
        {
          memberInfos: [
            {
              email: recipientEmail,
            },
          ],
          order: 1,
          role: 'SIGNER',
        },
      ],
      signatureType: 'ESIGN',
      state: 'IN_PROCESS',
    };

    const response = await axios.post(url, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const agreementId = response.data.id;
    res.json({ agreementId });
  } catch (error) {
    console.error('Error creating agreement:', error);
    res.status(500).json({ error: 'Failed to create agreement' });
  }
});


//Retrieves agreements for the user.
router.get('/agreements/:agreementId/', async (req, res) => {

  try {
    const agreementId = req.params.agreementId;
    var accessToken = await getAccesstoken();
    const endpoint = `/api/rest/v6/agreements/${agreementId}`;
    const url = `${apiurl}${endpoint}`;


    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.get(url, {
      headers: headers,
    });

    const agreement = response.data;

    res.json(agreement);
  } catch (error) {
    console.error('Error retrieving agreement details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }


});


//Filename of the Agreement
router.get('/agreements/:agreementId/documents/', async (req, res) => {

  try {
    const agreementId = req.params.agreementId;
    var accessToken = await getAccesstoken();
    const endpoint = `/api/rest/v6/agreements/${agreementId}/documents`;
    const url = `${apiurl}${endpoint}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const documents = response.data.documents;
    res.json(documents);
  } catch (error) {
    console.error('Error retrieving agreement documents:', error);
    res.status(500).json({ error: 'Failed to retrieve agreement documents' });
  }
});

router.post('/getEsignDocs', async (req, res) => {

  pool.request().query("select * from ESignDocuments where OnboardID=" + req.body.id,
    (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error executing query');
        return;
      }
      res.send(result.recordset);
    });
});


router.post('/insertEsignDocs', async (req, res) => {

  pool.request().query(`insert into ESignDocuments
  (OnboardID,DocTypeName,DocTypeID,AgreementID,DocTransientID,Status)
  values (` + req.body.onboardID + `,'` + req.body.docTypeName + `',` + req.body.docTypeID + `,'` + req.body.agreementID + `','` + req.body.docTransientID + `','` + req.body.status + `')`,
    (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error executing query');
        return;
      }
      res.send(result.recordset);
    });
});

//Get Adobe ClientID and Secret
router.get("/getAdobeCred", (req, res) => {
  pool.request().query(`SELECT TOP 1 *FROM Adobe_cred ORDER BY id DESC`, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error executing query');
      return;
    }
    var cid = CryptoJS.AES.decrypt(result.recordset[0].clientid, cryptkey).toString(CryptoJS.enc.Utf8);
    var csecret = CryptoJS.AES.decrypt(result.recordset[0].secret, cryptkey).toString(CryptoJS.enc.Utf8)
    var data = {
      clientId: cid,
      secret: csecret
    }
    res.send(data);
  });
});

//get Adobe access and refreshtoken
router.get("/getAdobetoken", (req, res) => {
  pool.request().query(`SELECT TOP 1 *FROM Adobe_cred ORDER BY id DESC`, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error executing query');
      return;
    }
    var refreshtoken = CryptoJS.AES.decrypt(result.recordset[0].refreshtoken, cryptkey).toString(CryptoJS.enc.Utf8);
    var accesstoken = CryptoJS.AES.decrypt(result.recordset[0].accesstoken, cryptkey).toString(CryptoJS.enc.Utf8)
    var data = {
      refreshtoken: refreshtoken,
      accesstoken: accesstoken
    }
    res.send(data);
  });
});

//Download Combined document for Agrement
router.get('/agreements/:agreementId/combinedDocument', async (req, res) => {

  try {
    const agreementId = req.params.agreementId;
    const endpoint = `/api/rest/v6/agreements/${agreementId}/combinedDocument`;
    const url = `${apiurl}${endpoint}`;

    var accessToken = await getAccesstoken();

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      responseType: 'stream',
    });

    // Set the appropriate response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="combinedDocument.pdf"');

    response.data.pipe(res);
  } catch (error) {
    console.error('Error retrieving combined document:', error);
    res.status(500).json({ error: 'Failed to retrieve combined document' });
  }


});

//download individual document for agreement by documentid
router.get('/agreements/:agreementId/documents/:documentId', async (req, res) => {
  try {
    const agreementId = req.params.agreementId;
    const documentId = req.params.documentId;
    console.log(agreementId);
    console.log(documentId);
    const endpoint = `/api/rest/v6/agreements/${agreementId}/documents/${documentId}`;
    const url = `${apiurl}${endpoint}`;
    const accessToken = await getAccesstoken();

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      responseType: 'arraybuffer', // Set responseType to 'arraybuffer' for binary data
    });

    // Set the appropriate response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${documentId}.pdf"`);

    res.send(response.data); // Send the response data directly

  } catch (error) {
    console.error('Error retrieving document:', error);
    res.status(500).json({ error: 'Failed to retrieve document' });
  }
});

router.get('/libraryDocuments', async (req, res) => {
  try {
    const endpoint = '/api/rest/v6/libraryDocuments';
    const url = `${baseUrl}${endpoint}`;
    const accessToken = await getAccesstoken();

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const libraryDocuments = response.data.libraryDocumentList;
    res.send(libraryDocuments);
  } catch (error) {
    console.error('Error retrieving library documents:', error);
    res.status(500).json({ error: 'Failed to retrieve library documents' });
  }
});

router.get('/libraryDocuments/:libraryDocumentId', async (req, res) => {
  try {
    const libraryDocumentId = req.params.libraryDocumentId;
    const endpoint = `/api/rest/v6/libraryDocuments/${libraryDocumentId}`;
    const url = `${baseUrl}${endpoint}`;
    const accessToken = await getAccesstoken();

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const libraryDocumentInfo = response.data;
    res.send(libraryDocumentInfo);
  } catch (error) {
    console.error('Error retrieving library document info:', error);
    res.status(500).json({ error: 'Failed to retrieve library document info' });
  }
});

router.get('/libraryDocuments/:libraryDocumentId/combinedDocument', async (req, res) => {
  try {
    const libraryDocumentId = req.params.libraryDocumentId;
    const endpoint = `/api/rest/v6/libraryDocuments/${libraryDocumentId}/combinedDocument`;
    const url = `${baseUrl}${endpoint}`;
    const accessToken = await getAccesstoken();
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      responseType: 'arraybuffer',
    });

    const pdfData = response.data;
    res.set('Content-Type', 'application/pdf');
    res.send(pdfData);
  } catch (error) {
    console.error('Error retrieving combined document:', error);
    res.status(500).json({ error: 'Failed to retrieve combined document' });
  }
});

router.get('/libraryDocuments/:libraryDocumentId/documents', async (req, res) => {
  try {
    const libraryDocumentId = req.params.libraryDocumentId;
    const endpoint = `/api/rest/v6/libraryDocuments/${libraryDocumentId}/documents`;
    const url = `${baseUrl}${endpoint}`;
    const accessToken = await getAccesstoken();

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const documents = response.data.documents;
    res.json(documents);
  } catch (error) {
    console.error('Error retrieving library document documents:', error);
    res.status(500).json({ error: 'Failed to retrieve library document documents' });
  }
});

router.get('/libraryDocuments/:libraryDocumentId/documents/:documentId', async (req, res) => {
  try {
    const libraryDocumentId = req.params.libraryDocumentId;
    const documentId = req.params.documentId;
    const endpoint = `/api/rest/v6/libraryDocuments/${libraryDocumentId}/documents/${documentId}`;
    const url = `${baseUrl}${endpoint}`;
    const accessToken = await getAccesstoken();

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      responseType: 'arraybuffer',
    });

    const documentData = response.data;
    res.set('Content-Type', 'application/pdf');
    res.send(documentData);
  } catch (error) {
    console.error('Error retrieving library document:', error);
    res.status(500).json({ error: 'Failed to retrieve library document' });
  }
});

module.exports = router;
