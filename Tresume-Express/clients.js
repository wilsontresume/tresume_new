const express = require("express");
const router = express.Router();
var sql = require("mssql");
const nodemailer = require("nodemailer");
const bodyparser = require('body-parser');
const environment = process.env.NODE_ENV || "prod";
const envconfig = require(`./config.${environment}.js`);
router.use(bodyparser.json());

const config = {
  user: "sa",
  password: "Tresume@123",
  server: "92.204.128.44",
  database: "Tresume_Beta",
  trustServerCertificate: true,
};


module.exports = router;

router.post('/getTraineeClientList', async (req, res) => {
  try {
    const request = new sql.Request();
    const query = "select * from Clients where PrimaryOwner = '" +req.body.TraineeID+ "' and active = 1";

    console.log(query);

    const recordset = await request.query(query);

    if (recordset && recordset.recordsets && recordset.recordsets.length > 0) {
      const result = {
        flag: 1,
        result: recordset.recordsets[0],
      };
      res.send(result);
    } else {
      const result = {
        flag: 0,
        error: "No active clients found! ",
      };
      res.send(result); 
    }
  } catch (error) {
    console.error("Error fetching client data:", error);
    const result = {
      flag: 0,
      error: "An error occurred while fetching client data!",
    };
    res.status(500).send(result);
  }
});

router.post('/deleteClientAccount', async (req, res) => {
  const ClientID = req.body.ClientID;

  try {
    const dclient = await deactivateclient(ClientID);
    if (dclient) {
      const result = {
        flag: 1,
      };
      res.send(result);
    } else {
      const result = {
        flag: 0,
      };
      res.send(result);
    }
  } catch (error) {
    console.error("Error deleting client:", error);
    const result = {
      flag: 0,
      error: "An error occurred while deleting the client!",
    };
    res.status(500).send(result);
  }  

})
async function deactivateclient(ClientID) {
  try {
    const pool = await sql.connect(config);
    const request = pool.request();
    const queryResult = await request.query(
      `update Clients set active = 0 where ClientID = '${ClientID}'`
    );
    
    if (queryResult.rowsAffected[0] === 0) {
      throw new Error("No records found!");
    }
    
    return queryResult;
  } catch (error) {
    console.error("Error while deleting client:", error);
    throw error;
  }
}



router.post('/addClienta', async (req, res) => {
  try {
    const request = new sql.Request();

    const query = `INSERT INTO Clients (ClientName, ContactNumber, EmailID, Address, VMSClientName, FederalID,ZipCode, Website, Fax, Industry, Country, State, City, ClientStatusID,  ClientCategoryID, PrimaryOwner,RequiredDocuments, PaymentTerms, AboutCompany, Access, sendingEmail, posting, Notes) VALUES 
    ('${req.body.ClientName}', '${req.body.ContactNumber}', '${req.body.EmailID}', '${req.body.Address}', '${req.body.VMSClientName}', '${req.body.FederalID}', '${req.body.ZipCode}', '${req.body.Website}', '${req.body.Fax}', '${req.body.Industry}', '${req.body.Country}', '${req.body.State}', '${req.body.City}', ${req.body.ClientStatusID}, ${req.body.ClientCategoryID}, '${req.body.PrimaryOwner}', '${req.body.AboutCompany}', ${req.body.Active ? '1' : '0'}, ${req.body.Access ? '1' : '0'}, ${req.body.posting ? '1' : '0'}, ${req.body.sendingEmail ? '1' : '0'}, '${req.body.PaymentTerms}', '${req.body.Notes}')`;

    console.log(query);
    const result = await request.query(query);
    console.log(result);
    res.status(200).json({ success: true, message: 'Client added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});




