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
      const request = new sql.Request();
      const query = "SELECT T.TraineeID,CONCAT(CreatedBy.FirstName, ' ', CreatedBy.LastName) AS CreatedBy, CONCAT(T.FirstName, ' ', T.LastName) AS Name, T.UserName AS Email, T.PhoneNumber AS Phone, T.LegalStatus AS LegalStatus, CS.Value AS CandidateStatus, T.CreateTime AS DateCreated FROM Trainee T INNER JOIN CandidateStatus CS ON T.CandidateStatus = CS.CandidateStatusID LEFT JOIN Trainee CreatedBy ON T.CreateBy = CreatedBy.UserName WHERE T.RecruiterName = '"+ req.body.TraineeID + "'";
  
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

router.post('/addHrmsCandidate', async (req, res) => {
  console.log(req);
})

router.post('/saveSubmissionFormData', async (req, res) => {
  console.log(req);
})

router.post('/saveInterviewFormData', async (req, res) => {
  console.log(req);
})

router.post('/saveGeneralFormData', async (req, res) => {
  console.log(req);
})

router.post('/saveFinancialInfoFormData', async (req, res) => {
  console.log(req);
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
    SELECT
    P.PID,
    ISNULL(P.Notes, '') AS Notes,
    ISNULL(P.CurrentPlacement, '1') AS CurrentPlacement,
    ISNULL(P.BillRate, '') AS BillRate,
    ISNULL(P.BillType, '') AS BillType,
    ISNULL(T.FirstName, '0') AS MarketerFirstName,
	ISNULL(T.LastName, '0') AS MarketerFirstName,
    ISNULL(P.ClientState, '') AS ClientState,
    ISNULL(CONVERT(NVARCHAR(10), P.StartDate, 101), '') AS StartDate1,
    ISNULL(CONVERT(NVARCHAR(10), P.EndDate, 101), '') AS EndDate1,
    ISNULL(CONVERT(NVARCHAR(10), P.PlacedDate, 101), '') AS PlacedDate,
    ISNULL(P.PositionTitle, '') AS PositionTitle,
    ISNULL(P.CandidateEmailId, '') AS CandidateEmailId,
    ISNULL(P.ClientName, '') AS ClientName,
    ISNULL(CONVERT(NVARCHAR(10), P.POStartDate, 101), '') AS POStartDate,
    ISNULL(CONVERT(NVARCHAR(10), P.POEndDate, 101), '') AS POEndDate,
    ISNULL(P.ClientManagerName, '') AS ClientManagerName,
    ISNULL(P.ClientEmail, '') AS ClientEmail,
    ISNULL(P.ClientPhoneNumber, '') AS ClientPhoneNumber,
    ISNULL(P.ClientAddress, '') AS ClientAddress,
    ISNULL(P.VendorName, '') AS VendorName,
    ISNULL(P.VendorContactName, '') AS VendorContactName,
    ISNULL(P.VendorEmail, '') AS VendorEmail,
    ISNULL(P.VendorPhone, '') AS VendorPhone,
    ISNULL(P.VendorAddress, '') AS VendorAddress,
    ISNULL(P.SubVendorName, '') AS SubVendorName,
    ISNULL(P.SubVendorContactName, '') AS SubVendorContactName,
    ISNULL(P.SubVendorEmail, '') AS SubVendorEmail,
    ISNULL(P.SubVendorPhone, '') AS SubVendorPhone,
    ISNULL(P.SubVendorAddress, '') AS SubVendorAddress,
    CONCAT(T.FirstName, ' ', T.LastName) AS Name,
    P.PrimaryPlacement
FROM
    Placements P
LEFT JOIN
    Trainee T ON T.TraineeID = P.MarketerName
LEFT JOIN
    Currentstatus cs ON cs.CsID = T.CandidateStatus
WHERE
    P.TraineeID = '20742' AND P.Active = 1
ORDER BY
    P.StartDate DESC
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

router.post('/deleteplacementdata', async (req, res) => {
  try {
    const placementdata = await deactivateplacementdata(req.body.PID);
    console.log(placementdata);
    if (placementdata) {
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
    console.error("Error deleting Placementdata:", error);
    const result = {
      flag: 0,
      error: "An error occurred while deleting the Placementdata!",
    };
    res.status(500).send(result);
  }  
})

async function deactivateplacementdata(PID) {
  try {
    const pool = await sql.connect(config);
    const request = pool.request();
    var query = 'UPDATE Placements SET Active = 0 WHERE PID ='+PID
    const queryResult = await request.query(query, {
    });

    if (queryResult.rowsAffected[0] === 0) {
      throw new Error('No records found!');
    }

    return queryResult;
  } catch (error) {
    console.error('Error while deactivating PlacementData:', error);
    throw error;
  }
}

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

router.post('/getCandidateInfo', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const request = new sql.Request();
    const query = "select t.FTCNotes,t.FirstName ,t.LastName ,t.MiddleName,CONVERT(NVARCHAR(10),t.DOB,101) AS DOB,T.PhoneNumber,(t.FirstName + ' '+t.LastName) as Name,t.UserName,Cs.CSName,T.Candidatestatus,d.Value,t.division,t.SSn,T.RecruiterName,t.marketername,T.ReferredBy,T.DealOffered,t.DuiFelonyInfo,T.EmergConName,t.EmergConPhone,t.EmergConemail,t.ReferredBy_external,t.PassportNumber,t.Address,t.validateNumber, CONVERT(NVARCHAR(10),t.statusdate,101) AS statusdate,CONVERT(NVARCHAR(10),t.LegalStatusValidFrom,101) AS Legalstartdate, CONVERT(NVARCHAR(10),t.LegalStatusValidTo,101) AS Legalenddate,CONVERT(NVARCHAR(10),t.PassValidityEndDate,101) AS Passvalidateenddate,CONVERT(NVARCHAR(10),t.PassvalidityStartDate,101) AS PassvalidateStartdate,CONVERT(NVARCHAR(10),t.validateEnddate,101) AS ValidateEndDate,CONVERT(NVARCHAR(10),t.EmploymentStartDate,101) AS EmploymentStartDate,CONVERT(NVARCHAR(10),t.EmploymentEndDate,101) AS EmploymentEndDate,t.Title,t.Skill,t.Country,t.state,t.City,t.Zipcode,t.Notes,t.LegalStatus,  t.FinancialNotes,t.Salary,t.State,t.Perdeium,t.MaritalStatus,t.LCARate,t.FState,t.GCWages,t.StateTaxAllowance,t.StateTaxExemptions,t.FederalTaxAllowance,t.HealthInsurance,t.LifeInsurance,t.FederalTaxAdditionalAllowance,t.Bank1Name,t.Bank1AccountType,t.Bank1AccountNumber,t.Bank1RoutingNumber,t.SalaryDepositType,t.HowMuch,t.Bank2Name,t.Bank2AccountType,t.Bank2AccountNumber,t.Bank2RoutingNumber,CONVERT(NVARCHAR(10),t.Lcadate,101) AS Lcadate,CONVERT(NVARCHAR(10),t.Gcdate,101) AS Gcdate from Trainee t LEFT Join Currentstatus cs On cs.CsID=T.Candidatestatus LEFT Join Department d On d.DepartmentID = T.Division   left Join Phone p On p.PhoneID=(select TOP 1 PhoneID from TraineePhone where TraineeID='"+req.body.TraineeID+"'AND Active = 1) AND p.Active = 1  where TraineeID = '"+req.body.TraineeID+"' and t.Active=1";

    console.log(query);

    const recordset = await request.query(query);

      const result = {
        flag: 1,
        result: recordset.recordsets[0],
      };
      res.send(result);
    
  } catch (error) {
    console.error("Error fetching candidates data:", error);
    const result = {
      flag: 0,
      error: "An error occurred while fetching candidates data!",
    };
    res.status(500).send(result);
  }
});


router.post('/insertTrainee', async function (req, res) {
  try {
    // Assuming TraineeID is generated or obtained elsewhere in your code
    var TraineeID = await generateTraineeID();

    var query = "IF NOT EXISTS(SELECT * FROM Trainee WHERE UserName = '" + req.body.email + "' AND UserOrganizationID = '" + req.body.OrganizationID + "') " +
                "BEGIN " +
                "INSERT INTO Trainee (TraineeID, email, firstName, phone, middleName, lastName, legalStatus, candidateStatus, degree, gender, notes, recruiterName, referralType, groups, locationConstraint, marketerName, university ) " +
                "VALUES ('" + TraineeID + "', '" + req.body.email + "', '" + req.body.firstName + "', '" + req.body.phone + "', '" + req.body.middleName + "', '" + req.body.lastName + "', '" + req.body.groups + "', '" + req.body.legalStatus + "', '" + req.body.candidateStatus + "', '" + req.body.degree + "', '" + req.body.gender + "', '" + req.body.notes + "', '" + req.body.recruiterName + "', '" + req.body.referralType + "', 1, '" + req.body.locationConstraint + "','" + req.body.marketerName + "', '"+ req.body.university + "', 1, 'ACTIVE', 'READY', 1, 1, 'TRESUMEUSER', '" + "', GETDATE()) " +
                "END";
    console.log(query);

    // await sql.connect(config);
    // var request = new sql.Request();

    // var result = await request.query(query);
    
    res.status(200).send("Data Fetched");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

async function generateTraineeID() {
  try {
    await sql.connect(config);
    var request = new sql.Request();

    var query = "SELECT TOP 1 TraineeID FROM Trainee ORDER BY TraineeID DESC";

    var recordset = await request.query(query);

    if (recordset.recordset.length > 0) {
      return recordset.recordset[0].TraineeID + 1;
    } else {
      return 1; // If no records exist, start from 1
    }
  } catch (error) {
    console.error("Error generating TraineeID:", error);
    throw error;
  }
}



module.exports = router;
 
