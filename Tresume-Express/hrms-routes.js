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

router.post('/gethrmscandidateList', async (req, res) => {
    try {
      const pool = await sql.connect(config);
      const request = new sql.Request();0
      const query = "SELECT CONCAT(CreatedBy.FirstName, ' ', CreatedBy.LastName) AS CreatedBy, CONCAT(T.FirstName, ' ', T.LastName) AS Name, T.UserName AS Email, T.PhoneNumber AS Phone, T.LegalStatus AS LegalStatus, CS.Value AS CandidateStatus, T.CreateTime AS DateCreated FROM Trainee T INNER JOIN CandidateStatus CS ON T.CandidateStatus = CS.CandidateStatusID LEFT JOIN Trainee CreatedBy ON T.CreateBy = CreatedBy.UserName WHERE T.RecruiterName = '"+ req.body.TraineeID + "'";
  
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
          error: "No active candidates found! ",
        };
        res.send(result); 
      }
    } catch (error) {
      console.error("Error fetching candidates data:", error);
      const result = {
        flag: 0,
        error: "An error occurred while fetching candidates data!",
      };
      res.status(500).send(result);
    }
  });
  
  router.post('/updatehrmscandidate', async (req, res) => {

  })
  async function deactivatecandidate(TraineeID) {
    try {
      const pool = await sql.connect(config);
      const request = pool.request();
      const queryResult = await request.query(
        `update Trainee set active = 0 where TraineeID = '${TraineeID}'`
      );
      
      if (queryResult.rowsAffected[0] === 0) {
        throw new Error("No records found!");
      }
      
      return queryResult;
    } catch (error) {
      console.error("Error while deleting candidate:", error);
      throw error;
    }
  }
  

router.post('/getInterviewList', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const traineeID = '20742';

    const query = "SELECT CONVERT(NVARCHAR, TI.InterviewDate, 101) AS Date, CONCAT(T1.FirstName, ' ', T1.LastName) AS Marketer, ISNULL(TI.Assistedby, '') AS Assigned,TI.TraineeInterviewID, TI.InterviewMode, ISNULL(TI.Notes, '') AS Notes, ISNULL(TI.ClientName, '') AS Client, ISNULL(TI.VendorName, '') AS Vendor, ISNULL(TI.SubVendor, '') AS SubVendor, ISNULL(TI.TypeofAssistance, '') AS TypeofAssistance FROM TraineeInterview TI LEFT JOIN Trainee T1 ON T1.TraineeID = TI.RecruiterID WHERE TI.active = 1 AND TI.TraineeID = "+traineeID+" ORDER BY TI.CreateTime DESC;";
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
  try {
    const interviewdata = await deactivateinterviewdata(req.body.TraineeInterviewID);
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

async function deactivateinterviewdata(TraineeInterviewID) {
  try {
    const pool = await sql.connect(config);
    const request = pool.request();
    const queryResult = await request.query(
      "UPDATE TraineeInterview SET Active = 0 WHERE TraineeInterviewID = "+ TraineeInterviewID);
    
    if (queryResult.rowsAffected[0] === 0) {
      throw new Error("No records found!");
    }
    
    return queryResult;
  } catch (error) {
    console.error("Error while deleting interviewdata:", error);
    throw error;
  }
}

// Placement - Table - List

router.post('/getPlacementList', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const traineeID = '20742';

    const query = `
      SELECT CONVERT(NVARCHAR, TI.InterviewDate, 101) AS Date,
      CONCAT(T1.FirstName, ' ', T1.LastName) AS Marketer,
      ISNULL(TI.Assistedby, '') AS Assigned,
      TI.TraineeInterviewID, TI.InterviewMode,
      ISNULL(TI.Notes, '') AS Notes,
      ISNULL(TI.ClientName, '') AS Client,
      ISNULL(TI.VendorName, '') AS Vendor,
      ISNULL(TI.SubVendor, '') AS SubVendor,
      ISNULL(TI.TypeofAssistance, '') AS TypeofAssistance
      FROM TraineeInterview TI
      LEFT JOIN Trainee T1 ON T1.TraineeID = TI.RecruiterID
      WHERE TI.active = 1 AND TI.TraineeID = ${traineeID}
      ORDER BY TI.CreateTime DESC;
    `;

    const result = await pool.request().query(query);

    res.json({
      flag: 1,
      result: result.recordset,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.' });
  }
});

module.exports = router;
 
