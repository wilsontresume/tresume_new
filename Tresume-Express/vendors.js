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

module.exports = router;

router.post('/getTraineeVendorList', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const request = new sql.Request();
    const query = "select * from Vendors where PrimaryOwner = '" + req.body.TraineeID + "' and active = 1";

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
        error: "No active vendors found! ",
      };
      res.send(result);
    }
  } catch (error) {
    console.error("Error fetching vendor data:", error);
    const result = {
      flag: 0,
      error: "An error occurred while fetching vendor data!",
    };
    res.status(500).send(result);
  }
});


router.post('/deleteVendorAccount', async (req, res) => {
  const VendorID = req.body.VendorID;
  try {
    const dVendor = await deactivatevendor(VendorID);
    if (dVendor) {
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
    console.error("Error deleting vendor:", error);
    const result = {
      flag: 0,
      error: "An error occurred while deleting the vendor!",
    };
    res.status(500).send(result);
  }

})


async function deactivatevendor(VendorID) {
  try {
    const pool = await sql.connect(config);
    const request = pool.request();
    const queryResult = await request.query(
      `update Vendors set active = 0 where VendorID = '${VendorID}'`
    );

    if (queryResult.rowsAffected[0] === 0) {
      throw new Error("No records found!");
    }

    return queryResult;
  } catch (error) {
    console.error("Error while deleting vendor:", error);
    throw error;
  }
}

router.post('/addVendor', async (req, res) => {
  try {
    const request = new sql.Request();
    OrgID = req.body.OrgID;
    const query = `INSERT INTO Vendors (VendorName, ContactNumber, EmailID, Address, VMSVendorName, FederalID,ZipCode, Website, Fax, Industry, Country, State, City, VendorStatusID,  VendorCategoryID, PrimaryOwner,RequiredDocuments, PaymentTerms, AboutCompany, Access, sendingEmail, posting, Notes) VALUES 
    ('${req.body.VendorName}', '${req.body.ContactNumber}', '${req.body.VendorEmailID}', '${req.body.Address}', '${req.body.VMSVendorName}', '${req.body.FederalID}', '${req.body.ZipCode}', '${req.body.VendorWebsite}', '${req.body.Fax}', '${req.body.Industry}', '${req.body.Country}', '${req.body.State}', '${req.body.City}', ${req.body.VendorStatus}, ${req.body.VendorCategory}, '${req.body.PrimaryOwner}','${req.body.requiredDocuments}','${req.body.PaymentTerms}' ,'${req.body.AboutCompany}', '1', '', '','')`;

    console.log(req);
    console.log(query);
    const result = await request.query(query);
    console.log(result);
    res.status(200).json({ success: true, message: 'Vendor added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


