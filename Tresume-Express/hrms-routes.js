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

router.post('/insertTraineeInterview', async function (req, res) {
  try {
    var TraineeInterviewID = await generateTraineeInterviewID();

    var interviewQuery =
    "IF NOT EXISTS(SELECT * FROM TraineeInterview WHERE TraineeInterviewID = '" +
    TraineeInterviewID +
    "') " +
    "BEGIN " +
    "INSERT INTO [dbo].[TraineeInterview] " +
    "([TraineeInterviewID], [TraineeID], [RecruiterID], [InterviewDate], [InterviewTimeZone], " +
    "[InterviewMode], [InterviewStatus], [Notes], [Rating], [Active], [CreateTime], " +
    "[CreateBy], [LastUpdateTime], [LastUpdateBy], [IsTraineeUpdate], [JobID], " +
    "[InterviewStatusUpdateTime], [InviteEmail], [SubVendor], [Assistedby], [TypeofAssistance], " +
    "[VendorName], [ClientName]) " +
    "VALUES " +
    "('" + TraineeInterviewID + "', " +
    formatValue(req.body.traineeID) + ", " +
    formatValue(req.body.recruiterID) + ", " +
    formatValue(req.body.interviewDate) + ", " +
    formatValue(req.body.interviewTimeZone) + ", " +
    formatValue(req.body.interviewMode) + ", " +
    formatValue(req.body.interviewInfo) + ", " +
    formatValue(req.body.notes) + ", " +
    formatValue(req.body.rating) + ", " +
    "1, " +
     "'GETDATE(), " +
    formatValue(req.body.recruiteremail) + ", " +
    "'GETDATE(), " +
    formatValue(req.body.recruiteremail) + ", " +
    formatValue(req.body.isTraineeUpdate) + ", " +
    formatValue(req.body.jobID) + ", " +
    formatValue(req.body.interviewStatusUpdateTime) + ", " +
    formatValue(req.body.inviteEmail) + ", " +
    formatValue(req.body.subVendor) + ", " +
    formatValue(req.body.assistedBy) + ", " +
    formatValue(req.body.typeOfAssistance) + ", " + 
    formatValue(req.body.vendor) + ", " +
    formatValue(req.body.client) + ")";
  
  console.log(interviewQuery);

    // Perform the database insertion using the constructed query
        // await sql.connect(config);
    // var request = new sql.Request();
    // var result = await request.query(interviewQuery);

    res.status(200).send("Trainee Interview Data Fetched");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

async function generateTraineeInterviewID() {
  try {
    await sql.connect(config);
    var request = new sql.Request();

    var query = "SELECT TOP 1 TraineeInterviewID FROM TraineeInterview ORDER BY TraineeInterviewID DESC";

    var recordset = await request.query(query);

    if (recordset.recordset.length > 0) {
      return recordset.recordset[0].TraineeInterviewID + 1;
    } else {
      return 1; 
    }
  } catch (error) {
    console.error("Error generating TraineeInterviewID:", error);
    throw error;
  }
}

router.post('/insertTraineeCandidate', async function (req, res) {
  try {
    var TraineeID = await generateTraineeID();

    var query =
      "IF NOT EXISTS(SELECT * FROM Trainee WHERE UserName = '" +
      req.body.email +
      "' AND UserOrganizationID = '" +
      req.body.OrganizationID +
      "') " +
      "BEGIN " +
      "INSERT INTO Trainee (TraineeID, email, firstName, phone, middleName, lastName, legalStatus, candidateStatus, degree, gender, notes, recruiterName, referralType, groups, locationConstraint, marketerName, university ) " +
      "VALUES (" +
      `'${TraineeID}',` +
      ` ${formatValue(req.body.email)},` +
      ` ${formatValue(req.body.firstName)},` +
      ` ${formatValue(req.body.phone)},` +
      ` ${formatValue(req.body.middleName)},` +
      ` ${formatValue(req.body.lastName)},` +
      ` ${formatValue(req.body.groups)},` +
      ` ${formatValue(req.body.legalStatus)},` +
      ` ${formatValue(req.body.candidateStatus)},` +
      ` ${formatValue(req.body.degree)},` +
      ` ${formatValue(req.body.gender)},` +
      ` ${formatValue(req.body.notes)},` +
      ` ${formatValue(req.body.recruiterName)},` +
      ` ${formatValue(req.body.referralType)},` +
      ' 1,' +
      ` ${formatValue(req.body.locationConstraint)},` +
      ` ${formatValue(req.body.marketerName)},` +
      ` ${formatValue(req.body.university)},` +
      ' 1,' +
      " 'ACTIVE'," +
      " 'READY'," +
      ' 1,' +
      ' 1,' +
      " 'TRESUMEUSER', " +
      "'', GETDATE()) " +
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
      return 1; 
    }
  } catch (error) {
    console.error("Error generating TraineeID:", error);
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
    const traineeID = req.body.TraineeID;

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
    P.TraineeID = '${traineeID}' AND P.Active = 1
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

router.post('/getSubmissionList', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const request = new sql.Request();
    // const candidateID = '20742'; 
    const query = `SELECT S.Title, S.SubmissionDate, CONCAT(T.FirstName, ' ', T.LastName) AS MarketerName, S.VendorName, S.ClientName, S.Note, S.Rate, S.CreateBy, S.CreateTime, S.Active, S.TraineeID, S.LastUpdateBy, S.LastUpdateTime 
      FROM Submission S 
      INNER JOIN Trainee T ON S.MarkerterID = T.TraineeID 
      WHERE T.TraineeID = @candidateID`;

    console.log(query);

    const recordset = await request.input('candidateID', sql.VarChar, req.body.candidateID).query(query);

    const result = {
      flag: 1,
      result: recordset.recordset,
    };
    res.status(200).send(result);

  } catch (error) {
    console.error("Error fetching candidates data:", error);
    const result = {
      flag: 0,
      error: "An error occurred while fetching candidates data!",
    };
    res.status(500).send(result); 
  }
});


router.post('/insertSubmissionInfo', async (req, res) => {
  try {
    // const pool = await sql.connect(config);
    // const request = new sql.Request();
    // var SubmissionID = await generateSubmission();
    var query = `INSERT INTO Submission(Title,SubmissionDate,MarkerterID,VendorName,ClientName,Note,Rate,CreateBy,CreateTime,Active,TraineeID,LastUpdateBy,LastUpdateTime) VALUES ('${req.body.title}','${req.body.submissionDate}', '${req.body.MarketerID}', '${req.body.vendorName}', '${req.body.clientName}', '${req.body.notes}' , '${req.body.rate}', '${req.body.recruiteremail}', GETDATE(), ${req.body.Active ? '1' : '0'} ,${req.body.CandidateID}, '${req.body.recruiteremail}', GETDATE());`;
    
    // console.log(query);
    // res.send("Data Fetched"); 

    // Execute the SQL query
    const pool = await sql.connect(config);
    const request = new sql.Request(pool);
    const recordset = await request.query(query);

    const result = {
      flag: 1,
      message: "Submission data inserted successfully!",
    };
    res.status(200).json(result);

  } catch (error) {
    console.error("Error inserting submission data:", error);
    const result = {
      flag: 0,
      error: "An error occurred while inserting submission data!",
    };
    res.status(500).json(result);
  }
});

async function generateSubmission() {
  try {
    const pool = await sql.connect(config);
    var request = new sql.Request(pool);

    var query = "SELECT TOP 1 SubmissionID FROM Submission ORDER BY SubmissionID DESC";

    var recordset = await request.query(query);

    if (recordset.recordset.length > 0) {
      return recordset.recordset[0].SubmissionID + 1;
    } else {
      return 1; 
    }
  } catch (error) {
    console.error("Error generating SubmissionID:", error);
    throw error;
  }
}

router.post('/updateFinancial', async function (req, res) {
  try {
    var query =
      "UPDATE Trainee SET " +
      "  ReferredBy = " + formatValue(req.body.ReferredBy) +
      ", DealOffered = " + formatValue(req.body.DealOffered) +
      ", division = " + formatValue(req.body.division) +
      ", dob = " + formatValue(req.body.dob) +
      ", duiFelonyInfo = " + formatValue(req.body.duiFelonyInfo) +
      ", firstName = " + formatValue(req.body.firstName) +
      ", ftcNotes = " + formatValue(req.body.ftcNotes) +
      ", generalEmail = " + formatValue(req.body.generalEmail) +
      ", lastName = " + formatValue(req.body.lastName) +
      ", legalStatusVal = " + formatValue(req.body.legalStatusVal) +
      ", legalStatusValend = " + formatValue(req.body.legalStatusValend) +
      ", middleName = " + formatValue(req.body.middleName) +
      ", otherNotes = " + formatValue(req.body.otherNotes) +
      ", phoneNumberG = " + formatValue(req.body.phoneNumberG) +
      ", recruiterName = " + formatValue(req.body.recruiterName) +
      ", refered = " + formatValue(req.body.refered) +
      ", selectedLegalStatus = " + formatValue(req.body.selectedLegalStatus) +
      ", statusDate = " + formatValue(req.body.statusDate) +
      " WHERE " +
      "  TraineeID = " + formatValue(req.body.TraineeID);
    var query = "UPDATE trainee SET FinancialNotes = '"+req.body.FinancialNotes+"', Salary = '"+req.body.Salary+"',Perdeium = '"+req.body.Perdeium+"',   LegalStatus = '"+req.body.LegalStatus1+"',   MaritalStatus = '"+req.body.MaritalStatus+"',   StateTaxAllowance = '"+req.body.StateTaxAllowance+"',   StateTaxExemptions = '"+req.body.StateTaxExemptions+"',   FederalTaxAllowance = '"+req.body.FederalTaxAllowance+"',   FederalTaxAdditionalAllowance = '"+req.body.FederalTaxAdditionalAllowance+"',   LCARate = '"+req.body.LCARate+"',   Lcadate = '"+req.body.Lcadate+"',   GCWages = '"+req.body.GCWages+"',   Gcdate = '"+req.body.Gcdate+"',   state = '"+req.body.state+"',   Bank1Name = '"+req.body.Bank1Name+"',   Bank2Name = '"+req.body.Bank2Name+"',   Bank1AccountType = '"+req.body.Bank1AccountType+"',   Bank2AccountType = '"+req.body.Bank2AccountType+"',   Bank1AccountNumber = '"+req.body.Bank1AccountNumber+"',   Bank2AccountNumber = '"+req.body.Bank2AccountNumber+"',   Bank1RoutingNumber = '"+req.body.Bank1RoutingNumber+"',   Bank2RoutingNumber = '"+req.body.Bank2RoutingNumber+"',   SalaryDepositType = '"+req.body.SalaryDepositType+"',   HowMuch = '"+req.body.HowMuch+"' WHERE traineeID = '"+req.body.traineeID;

    console.log(query);

// Uncomment the following lines when you are ready to execute the query
    // await sql.connect(config);
    // var request = new sql.Request();
    // var result = await request.query(query);

    res.status(200).send("Data Fetched");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post('/updateGeneral', async function (req, res) {
  try {
    var query =
      "UPDATE Trainee SET " +
      "  ReferredBy = " + formatValue(req.body.ReferredBy) +
      ", DealOffered = " + formatValue(req.body.DealOffered) +
      ", Division = " + formatValue(req.body.division) +
      ", DOB = " + formatValue(req.body.dob) +
      ", DuiFelonyInfo = " + formatValue(req.body.duiFelonyInfo) +
      ", FirstName = " + formatValue(req.body.firstName) +
      ", FTCNotes = " + formatValue(req.body.ftcNotes) +
      ", UserName = " + formatValue(req.body.generalEmail) +
      ", LastName = " + formatValue(req.body.lastName) +
      ", LegalStatusValidFrom = " + formatValue(req.body.legalStatusVal) +
      ", LegalStatusValidTo = " + formatValue(req.body.legalStatusValend) +
      ", MiddleName = " + formatValue(req.body.middleName) +
      ", Notes = " + formatValue(req.body.otherNotes) +
      ", PhoneNumber = " + formatValue(req.body.phoneNumberG) +
      ", RecruiterName = " + formatValue(req.body.recruiterName) +
      ", ReferredBy_external = " + formatValue(req.body.refered) +
      ", LegalStatus = " + formatValue(req.body.selectedLegalStatus) +
      ", statusdate = " + formatValue(req.body.statusDate) +
      " WHERE " +
      "  TraineeID = " + formatValue(req.body.TraineeID);

    console.log(query);

    await sql.connect(config);
    var request = new sql.Request();
    var result = await request.query(query);
    
    const data = {
      flag: 1,
      message: "Data Updated",
    };

    res.send(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post('/updateTrainee', async function (req, res) {
  try {
    var query =
      'UPDATE Trainee SET ' +
      '  ReferredBy = ' + formatValue(req.body.ReferredBy) +
      ', assistedBy = ' + formatValue(req.body.assistedBy) +
      ', division = ' + formatValue(req.body.division) +
      ', dob = ' + formatValue(req.body.dob) +
      ', duiFelonyInfo = ' + formatValue(req.body.duiFelonyInfo) +
      ', firstName = ' + formatValue(req.body.firstName) +
      ', ftcNotes = ' + formatValue(req.body.ftcNotes) +
      ', generalEmail = ' + formatValue(req.body.generalEmail) +
      ', lastName = ' + formatValue(req.body.lastName) +
      ', legalStatusVal = ' + formatValue(req.body.legalStatusVal) +
      ', legalStatusValend = ' + formatValue(req.body.legalStatusValend) +
      ', middleName = ' + formatValue(req.body.middleName) +
      ', otherNotes = ' + formatValue(req.body.otherNotes) +
      ', phoneNumberG = ' + formatValue(req.body.phoneNumberG) +
      ', recruiterName = ' + formatValue(req.body.recruiterName) +
      ', refered = ' + formatValue(req.body.refered) +
      ', selectedLegalStatus = ' + formatValue(req.body.selectedLegalStatus) +
      ', statusDate = ' + formatValue(req.body.statusDate) +
      ' WHERE TraineeID = ' + formatValue(req.body.TraineeID);

    console.log(query);

    // Uncomment the following lines when you are ready to execute the query
    // await sql.connect(config);
    // var request = new sql.Request();
    // var result = await request.query(query);

    res.status(200).send('Data Updated');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
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
      return 1; 
    }
  } catch (error) {
    console.error("Error generating TraineeID:", error);
    throw error;
  }
}

// Helper function to format values
function formatValue(value) {
  return value !== undefined ? `'${value}'` : '';
}

// Endpoint to check if email exists
router.post('/checkEmail', async function (req, res) {
  const email = req.body.email;
  const orgID = req.body.orgID;

  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Trainee WHERE Active = 1 AND userOrganizationID =${orgID}  AND userName = ${email}`;

    if (result.recordset.length > 0) {
      
      const data = {
        flag: 2,
        message: "The candidate is already under "+result.recordset[0].CreateBy,
      };
      res.send(data);
    } else {
      const data = {
        flag: 1,
        message: "The candidate is not available",
      };
      res.send(data);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await sql.close();
  }
});

module.exports = router;
 
