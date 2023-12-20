const express = require("express");
const router = express.Router();
const pool = require("./database");
var request = require("request");
var sql = require("mssql");
const axios = require("axios");
const nodemailer = require("nodemailer");
var crypto = require("crypto");
const bodyparser = require('body-parser');

const environment = process.env.NODE_ENV || "prod";
const envconfig = require(`./config.${environment}.js`);
const apiUrl = envconfig.apiUrl;

router.use(bodyparser.json());

const config = {
    user: "sa",
    password: "Tresume@123",
    server: "92.204.128.44",
    database: "Tresume_Beta",
    trustServerCertificate: true,
  };
  
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.mail.yahoo.com",
    auth: {
      user: "support@tresume.us",
      pass: "xzkmvglehwxeqrpd",
    },
    secure: true,
  });

  // router.post("/ssologin", async function (req, res) {

  //   var username = req.body.username;
  //   var password = req.body.password;
  //   var token = crypto.randomBytes(20).toString('hex');
  //   const key = "twothree";
  //   const encryptedPassword = encrypt(password, key);
  //   res.send(encryptedPassword);
  // });

  function generateKey(key) {
    const hash = crypto.createHash('sha256').update(key).digest();
    return hash;
  }
  
  // Encryption function
  function encrypter(text) {
    var key = 'NesaMani&Co';
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', generateKey(key), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + encrypted;
  }

  function decrypter(encryptedText) {
    var key = 'NesaMani&Co';
    const iv = Buffer.from(encryptedText.slice(0, 32), 'hex');
    const encryptedData = encryptedText.slice(32);
  
    const decipher = crypto.createDecipheriv('aes-256-cbc', generateKey(key), iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

router.post('/ssologin', async (req, res) => {
  console.log(req);
  var UserName = req.body.username;
  var PWD = req.body.password;
  console.log(UserName);
  try {
    // const apiUrl = `https://tresume.us/api/Member/Login/${UserName}/${PWD}`;
    const apiUrl = `http://localhost:59983/api/Member/Login/${UserName}/${PWD}`;
    console.log(apiUrl);
    const response = await axios.get(apiUrl);

    const responseData = response.data; 
    console.log
    if (responseData.TraineeID) {
      
      var accessToken = randomString(16, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

      sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
    
        var query = "select * from trainee where active = 1 and username like '%"+UserName+"%'";
    
        console.log(query);
        request.query(query,
          function (err, recordset) {
            if (err) console.log(err);
    
            var result = {
              flag: 1,
              result: recordset.recordsets[0],
              data:responseData,
            };
    
            res.send(result);
          }
        );
      });

      // try {
      //   await sql.connect(config);
      //   const query = `
      //     INSERT INTO AccessToken (UserName, TraineeID, accessToken, createtime, expires_at, ipaddress, active)
      //     VALUES (@UserName, @TraineeID, @accessToken, GETDATE(), DATEADD(minute, 3, GETDATE()), @ipaddress, 1)
      //   `;
      //   const request = new sql.Request();
      //   request.input('UserName', sql.VarChar, UserName);
      //   request.input('TraineeID', sql.Int, responseData.TraineeID);
      //   request.input('accessToken', sql.VarChar, accessToken);
      //   request.input('ipaddress', sql.VarChar, req.ip); 

      //   await request.query(query);
      //   res.status(200).json({ 
      //     message: 'Login successful' ,
      //     data:responseData,
      //     accessToken:accessToken
      //   });
      // } catch (error) {
      //   console.error('MSSQL Error:', error);
      //   res.status(500).json({ message: 'An error occurred while inserting the token' });
      // } finally {
      //   sql.close();
      // }


      
    } else {
      
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});


router.post('/getuseraccess', async (req, res) => {
  var UserName = req.body.username;

  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();

    var query = "SELECT RD.RoleName, RD.ViewOnly, RD.FullAccess, RD.DashboardPermission,RD.RoleID FROM MemberDetails MD INNER JOIN RolesNew RD ON MD.RoleID = RD.RoleID WHERE MD.UserEmail = '"+UserName+"' AND RD.Active = 1";

    console.log(query);
    request.query(query,
      function (err, recordset) {
        if (err) console.log(err);

        var result = {
          flag: 1,
          result: recordset.recordsets[0],
        };

        res.send(result);
      }
    );
  });
})


router.get('/generatepassword', async (req, res) => {

  var password = encrypt("T!@#$%^&*()_+");
  var decryptpass = decrypter(password);
  var result = {
    encrypted: password,
    decryptpass: decryptpass,
    };
  res.send(result); 
})


router.post('/login', async (req, res) => {
  console.log(req);
  var UserName = req.body.username;
  var PWD = req.body.password;
  try {
      
      sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        var querypassword;
        var query1 = "select * from trainee where active = 1 and username like '%"+UserName+"%'";
        var responseData;
        request.query(query1,
              function (err, recordset) {
                if (err) console.log(err);
                responseData =  recordset.recordsets[0];
                 querypassword = decrypter(responseData[0].Password);
                console.log(responseData[0].Password);
                console.log(querypassword);
                if(PWD === querypassword){
                  var query = "SELECT RD.RoleName, RD.ViewOnly, RD.FullAccess, RD.DashboardPermission,RD.RoleID FROM MemberDetails MD INNER JOIN RolesNew RD ON MD.RoleID = RD.RoleID WHERE MD.UserEmail = '"+UserName+"' AND RD.Active = 1";
        
                  console.log(query);
                  request.query(query,
                    function (err, recordset) {
                      if (err) console.log(err);
              
                      var result = {
                        flag: 1,
                        result: recordset.recordsets[0],
                        data:responseData,
                      };
              
                      res.send(result);
                    }
                  );
                }else{
                  res.status(401).json({ message: 'Invalid credentials' });
                }
              }
            );
      });
      
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});
  module.exports = router;