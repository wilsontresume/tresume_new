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

router.post('/getTalentBenchList', async (req, res) => {
  try {
    sql.connect(config, async function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Database connection error' });
      }

      const request = new sql.Request();
      const query = "SELECT J.jobtitle AS JobTitle, J.company AS Company, CONCAT(J.city, ', ', J.state, ', ', J.country) AS Location, J.payrate AS PayRate, SUM(CASE WHEN JA.Status = 'NEW' THEN 1 ELSE 0 END) AS NewApplicants, COUNT(CASE WHEN JA.Status <> 'DELETED' THEN 1 ELSE NULL END) AS TotalApplicants, J.createtime AS PostedOn, CONCAT(T.FirstName, ' ', T.LastName) AS PostedBy, JT.Value AS JobType, T2.FirstName AS Assignee, J.JobStatus FROM Job J INNER JOIN JobApplication JA ON J.JobID = JA.JobID LEFT JOIN Trainee T ON J.Recruiterid = T.TraineeID LEFT JOIN Trainee T2 ON J.PrimaryRecruiterID = T2.TraineeID INNER JOIN JobType JT ON J.JobTypeID = JT.JobTypeID WHERE T.OrganizationID = '" + req.body.OrgID + "' GROUP BY J.jobtitle, J.company, J.city, J.state, J.country, J.payrate, J.createtime, T.FirstName, T.LastName, JT.Value, T2.FirstName, J.JobStatus ORDER BY J.createtime DESC;";
      console.log(query);
      const recordset = await request.query(query);

      const result = {
        flag: 1,
        result: recordset.recordsets[0],
      };
      return res.send(result);
     res.send(result);
    });
  } catch (error) {
    console.error(error);
    const result = {
      flag: 0,
      message: 'Internal server error',
    };

    return res.send(result);
  }
});
module.exports = router;
