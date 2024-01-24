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
    const pool = new sql.ConnectionPool(config);
    const poolConnect = pool.connect();
    await poolConnect;

    const traineeID = req.body.traineeID;
    const OrganizationID = req.body.OrganizationID;

    const request = new sql.Request(pool);

    const query = `
      SELECT
        trn.TraineeID, trn.FirstName, trn.LastName, trn.YearsOfExpInMonths, trn.Organization, trn.CandidateStatus, trn.PhoneNumber,
        TB.GroupID, trn.CurrentLocation, trn.MiddleName, trn.Gender, trn.Degree, trn.ReferralType, trn.RecruiterName, trn.LegalStatus, trn.Notes,
        trn.Title AS [TraineeTitle], COUNT(trn.TraineeID) OVER() AS overall_count, ISNULL(tr.Rating, 0) AS QuickRate, TB.TBID, trn.Source,
        TB.BenchStatus, (SELECT PhoneNumber FROM Phone WHERE PhoneID = (SELECT TOP(1) PhoneID FROM TraineePhone WHERE TraineeID = trn.TraineeID)) AS phone,
        trn.UserName, TB.BillRate, TB.PayType, TB.ReferredBy, TB.CreateTime, DATEDIFF(DAY, TB.CreateTime, GETUTCDATE()) AS age,
        CONCAT(T1.FirstName, ' ', T1.MiddleName, ' ', T1.LastName) AS Recruiter, ISNULL(TB.IsNew, '0') AS IsNew,
        (SELECT traineeid FROM JBDetail WHERE jobid = '') AS JBTraineeID, trn.groupid
      FROM
        Trainee trn (NOLOCK)
        LEFT JOIN TraineeRating tr (NOLOCK) ON tr.Active = 1 AND trn.TraineeID = tr.TraineeID AND tr.Recruiterid = '${traineeID}'
        LEFT JOIN Trainee T1 ON T1.TraineeID = trn.RecruiterName AND T1.Active = 1
        JOIN TalentBench TB (NOLOCK) ON TB.Active = 1 AND trn.TraineeID = TB.TraineeID
      WHERE
        trn.Talentpool = 1
        AND (trn.UserOrganizationID = '${OrganizationID}' OR trn.TraineeID IN (
          SELECT ja.TraineeID
          FROM JobApplication ja
          WHERE ja.Active = 1 AND ja.JobID IN (
            SELECT j.JobID
            FROM Job j
            WHERE j.Active = 1 AND j.RecruiterID IN (
              SELECT TraineeID
              FROM Trainee
              WHERE OrganizationID = '${OrganizationID}' AND Active = 1 AND Role = 'RECRUITER'
            )
          )
        ))
        AND trn.active = 1 AND trn.Role = 'TRESUMEUSER'
      GROUP BY
        trn.TraineeID, T1.FirstName, T1.MiddleName, T1.LastName, trn.FirstName, trn.PhoneNumber, trn.LastName, trn.YearsOfExpInMonths,
        trn.CandidateStatus, TB.TBID, TB.GroupID, trn.MiddleName, trn.Gender, trn.Degree, trn.ReferralType, trn.RecruiterName, trn.LegalStatus,
        trn.Notes, trn.Organization, trn.CurrentLocation, trn.Title, trn.LastUpdateTime, trn.CreateTime, tr.Rating, trn.Source,
        TB.BenchStatus, trn.UserName, TB.BillRate, TB.PayType, TB.ReferredBy, TB.CreateTime, TB.IsNew,trn.groupid
      ORDER BY
        trn.CreateTime DESC
    `;

    // console.log(query);

    // console.log(query);

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
        error: "No active clients found!",
      };
      res.send(result);
    }
  } catch (error) {
    console.error("Error fetching talent bench data:", error);
    const result = {
      flag: 0,
      error: "An error occurred while fetching talent bench data!",
    };
    res.status(500).send(result);
  }
});

router.post('/AddTalentBenchList', async function (req, res) {
  try {
    var TraineeID = await generateTraineeID();
    console.log(TraineeID);
    var query =
      "IF NOT EXISTS(SELECT * FROM Trainee WHERE UserName = '" +
      req.body.email +
      "' AND UserOrganizationID = '" + req.body.orgID + "') " +
      "BEGIN " +
      "INSERT INTO Trainee (TraineeID, username, firstName, phonenumber, middleName, lastName, legalStatus, candidateStatus, degree, gender, notes, recruiterName, referralType, locationConstraint, marketerName,Active,Accountstatus,profilestatus,role,createtime,userorganizationid,createby,FollowUpon, CurrentLocation,talentpool ) " +
      "VALUES (" +
      `'${TraineeID}',` +
      ` ${formatValue(req.body.email || '')},` +
      ` ${formatValue(req.body.firstName || '')},` +
      ` ${formatValue(req.body.phone || '')},` +
      ` ${formatValue(req.body.middleName || '')},` +
      ` ${formatValue(req.body.lastName || '')},` +
      ` ${formatValue(req.body.legalStatus || '')},` +
      ` ${formatValue(req.body.candidateStatus || '')},` +
      ` ${formatValue(req.body.degree || '')},` +
      ` ${formatValue(req.body.gender || '')},` +
      ` ${formatValue(req.body.notes || '')},` +
      ` ${formatValue(req.body.recruiterName || '')},` +
      ` ${formatValue(req.body.referralType || '')},` +
      ` ${formatValue(req.body.locationConstraint || '')},` +
      ` ${formatValue(req.body.marketerName || '')},` +
      ' 1,' +
      " 'ACTIVE'," +
      " 'READY'," +
      " 'TRESUMEUSER', " +
      " GETDATE(), " +
      ` ${formatValue(req.body.orgID || '')},` +
      ` ${formatValue(req.body.createby || '')},` +
      ` ${formatValue(req.body.followupon || '')},` +
      ` ${formatValue(req.body.currentLocation || '')}` +
      ",1) END";

    console.log(query);

    // await sql.connect(config);
    // var request = new sql.Request();
    // var result = await request.query(query);

    const data = {
      flag: 1,
      message: "Trainee Candidate Data Fetched",
    };

    res.send(data);
  }
  catch (error) {
    const data = {
      flag: 1,
      message: "Internal Server Error",
    };
    res.status(500).send(data);
  }
});

async function generateTraineeID() {
  try {
    await sql.connect(config);
    var request = new sql.Request();

    var query = "SELECT TOP 1 TraineeID FROM Trainee ORDER BY TraineeID DESC";
    console.log(query)
    var recordset = await request.query(query);

    if (recordset.recordset.length > 0) {
      return recordset.recordset[0].TraineeID + 1;
    } else {
      return 1;
    }
  } catch (error) {
    console.error("Error generating TraineeID:", error);
    throw error;
  }
}


router.post('/getGroupList', async (req, res) => {
  try {
    const pool = new sql.ConnectionPool(config);
    const poolConnect = pool.connect();
    await poolConnect;
    const OrganizationID = req.body.OrganizationID;

    const request = new sql.Request(pool);

    const query = `
    SELECT
    g.GroupName,
    COUNT(t.traineeID) AS TotalTrainees
FROM
    groups g
LEFT JOIN
    trainee t ON g.GID = t.groupid
           AND t.active = 1
WHERE
    g.active = 1 AND
    g.orgID = '${OrganizationID}'
GROUP BY
    g.GID, g.GroupName;
    `;

    // console.log(query);

    // console.log(query);

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
        error: "No active clients found!",
      };
      res.send(result);
    }
  } catch (error) {
    console.error("Error fetching talent bench data:", error);
    const result = {
      flag: 0,
      error: "An error occurred while fetching talent bench data!",
    };
    res.status(500).send(result);
  }
});


router.post('/addGroup', async (req, res) => {
  try {
    var query = `
    INSERT INTO groups (groupName, orgID,Active,createtime,CreatedBy)
    VALUES (+'${req.body.groupName}', ${req.body.orgID}, ${req.body.Active || '1'},GETDATE(),'${req.body.createby}');
  `;
    console.log(query);
    const pool = await sql.connect(config);
    const request = new sql.Request(pool);
    const recordset = await request.query(query);

    const result = {
      flag: 1,
      message: "Client data inserted successfully!",
    };
    res.status(200).json(result);

  } catch (error) {
    console.error("Error inserting Client data:", error);
    const result = {
      flag: 0,
      error: "An error occurred while inserting Client data!",
    };
    res.status(500).json(result);
  }
});



// Helper function to format values
function formatValue(value) {
  return value !== undefined ? `'${value}'` : '';
}


router.post('/fetchGroupList', async (req, res) => {
  try {
    const pool = new sql.ConnectionPool(config);
    const poolConnect = pool.connect();
    await poolConnect;

    const OrganizationID = req.body.OrganizationID;

    const request = new sql.Request(pool);

    const query = "SELECT * FROM groups WHERE active = 1 AND orgID = '" + req.body.orgID + "' ";

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
        error: "No active groups found!",
      };
      res.send(result);
    }
  } catch (error) {
    console.error("Error fetching group data:", error);
    const result = {
      flag: 0,
      error: "An error occurred while fetching group data!",
    };
    res.status(500).send(result);
  }
});


router.post('/TBupdateSelected', async (req, res) => {
  try {
    const pool = new sql.ConnectionPool(config);
    const poolConnect = pool.connect();
    await poolConnect;

    const traineeID = req.body.traineeid;
    const groupid = req.body.groupid;
    const marketername = req.body.marketername;
    var query = '';
    if(groupid){
      query = "UPDATE trainee SET groupid='"+groupid+"' WHERE traineeid = '"+traineeID+"'";
    }else{
      query = "UPDATE trainee SET MarketerName='"+marketername+"' WHERE traineeid = '"+traineeID+"'";
    }

    const request = new sql.Request(pool);


    const recordset = await request.query(query);
    console.log(recordset);
    if (recordset&&recordset.rowsAffected) {
      const result = {
        flag: 1,
        message: "Data Updated Successfully",
      };
      res.send(result);
    } else {
      const result = {
        flag: 0,
        message: "Error please try again",
      };
      res.send(result);
    }
  } catch (error) {
    console.error("Error fetching group data:", error);
    const result = {
      flag: 0,
      error: "An error occurred while fetching group data!",
    };
    res.status(500).send(result);
  }
});


module.exports = router;
