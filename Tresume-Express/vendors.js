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
    const query = "SELECT   V.vendorid,  V.vendorname,  V.emailid,  V.contactnumber,  CONCAT(T.firstname, ' ', T.lastname) AS primaryowner FROM   vendors V INNER JOIN   Trainee T ON V.primaryowner = T.traineeid WHERE   V.active = 1  AND V.primaryowner = '" + req.body.TraineeID + "'";

    

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
    var query = `INSERT INTO Vendors (VendorName, ContactNumber, EmailID, Address, VMSVendorName, FederalID,ZipCode, Website, Fax, Industry, Country, State, City, VendorStatusID,  VendorCategoryID, PrimaryOwner,RequiredDocuments, PaymentTerms, AboutCompany, Access, sendingEmail, posting, Notes, Active) VALUES 
    ('${req.body.VendorName}', '${req.body.ContactNumber}', '${req.body.EmailID}', '${req.body.Address}', '${req.body.VMSVendorName}', '${req.body.FederalID}', '${req.body.ZipCode}', '${req.body.Website}', '${req.body.Fax}', '${req.body.Industry}', '${req.body.Country}', '${req.body.State}', '${req.body.City}', '${req.body.VendorStatusID}', '${req.body.VendorCategoryID}', '${req.body.PrimaryOwner}','${req.body.RequiredDocuments}','${req.body.PaymentTerms}', '${req.body.AboutCompany}', '${req.body.Access ? '1' : '0'}', '${req.body.sendingEmail ? '1' : '0'}', '${req.body.posting ? '1' : '0'}', '${req.body.Notes}',  ${req.body.Active ? '1' : '0'})`;
 
    console.log(query);
    const pool = await sql.connect(config);
    const request = new sql.Request(pool);
    const recordset = await request.query(query);

    const result = {
      flag: 1,
      message: "Vendor data inserted successfully!",
    };
    res.status(200).json(result);

  } catch (error) {
    console.error("Error inserting Vendor data:", error);
    const result = {
      flag: 0,
      error: "An error occurred while inserting Vendor data!",
    };
    res.status(500).json(result);
  }
});

