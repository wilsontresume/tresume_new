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
router.use(bodyparser.json());

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.mail.yahoo.com",
  auth: {
    user: "support@tresume.us",
    pass: "xzkmvglehwxeqrpd",
  },
  secure: true,
});

const dbConfig = {
  user: "sa",
  password: "Tresume@123",
  server: "92.204.128.44",
  database: "Tresume_Beta",
  trustServerCertificate: true,
};

router.post('/getInterviewList', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    

    const query = "SELECT CONVERT(NVARCHAR, TI.InterviewDate, 101) AS Date, CONCAT(T1.FirstName, ' ', T1.LastName) AS Marketer, ISNULL(TI.Assistedby, '') AS Assigned, TI.InterviewMode, ISNULL(TI.Notes, '') AS Notes, ISNULL(TI.ClientName, '') AS Client, ISNULL(TI.VendorName, '') AS Vendor, ISNULL(TI.SubVendor, '') AS SubVendor, ISNULL(TI.TypeofAssistance, '') AS TypeofAssistance FROM TraineeInterview TI LEFT JOIN Trainee T1 ON T1.TraineeID = TI.RecruiterID WHERE TI.active = 1 AND TI.TraineeID = '20742' ORDER BY TI.CreateTime DESC;";
console.log(query);
    const result = await pool.request()
      .query(query);

    res.json({
      flag: 1,
      result: result.recordset,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.' });
  }
});
router.post('/deleteinterviewdata', async (req, res) => {
  // const traineeID = req.body.traineeID;
  try {
    const interviewdata = await deactivateinterviewdata(traineeID);
    if (interviewdata) {
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
    console.error("Error deleting interviewdata:", error);
    const result = {
      flag: 0,
      error: "An error occurred while deleting the interviewdata!",
    };
    res.status(500).send(result);
  }  

})

async function deactivateinterviewdata(traineeID) {
  try {
    const pool = await sql.connect(config);
    const request = pool.request();
    const queryResult = await request.query(
      "UPDATE Trainee SET Active = 0 WHERE TraineeID = @traineeID",
      { traineeID }
    );
    
    if (queryResult.rowsAffected[0] === 0) {
      throw new Error("No records found!");
    }
    
    return queryResult;
  } catch (error) {
    console.error("Error while deleting interviewdata:", error);
    throw error;
  }
}
module.exports = router;



