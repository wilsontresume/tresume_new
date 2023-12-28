const express = require("express");
const router = express.Router();
const pool = require("./database");
var request = require("request");
var sql = require("mssql");
const axios = require("axios");
const nodemailer = require("nodemailer");
var crypto = require("crypto");
const bodyparser = require("body-parser");
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

router.post("/getAllTimeList", async (req, res) => {
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();

    var query =
      "SELECT t.firstname,t.lastname,TM.fromdate, TM.todate, TM.totalhrs, TM.approvalstatus, TM.comments FROM Timesheet_Master TM INNER JOIN Trainee T ON TM.traineeid = T.traineeid WHERE T.timesheet_admin ='" +
      req.body.traineeID +
      "' ";

    console.log(query);
    request.query(query, function (err, recordset) {
      if (err) console.log(err);

      var result = {
        flag: 1,
        result: recordset.recordsets[0],
      };

      res.send(result);
    });
  });
});

router.post("/createTimesheet", async (req, res) => {
  const timesheetData = req.body.timesheetData;
  sql.connect(config, async function (err) {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .send({ flag: 0, error: "Database connection error" });
    }

    try {
      const pool = await sql.connect(config);
      const transaction = new sql.Transaction(pool);
      await transaction.begin();

      try {
        const request = new sql.Request(transaction);

        for (const data of timesheetData) {
          request.input("traineeID", sql.VarChar, req.body.traineeID);
          request.input("project", sql.VarChar, data.project);
          request.input("fromdate", sql.Date, data.fromdate);
          request.input("todate", sql.Date, data.todate);
          request.input("totalhrs", sql.Decimal(18, 2), data.totalhrs);
          request.input("approvalstatus", sql.VarChar, data.approvalstatus);
          request.input("comments", sql.VarChar, data.comments);

          const query = `INSERT INTO Timesheet_Master (traineeid, project, fromdate, todate, totalhrs, approvalstatus, comments) VALUES (@traineeID, @project, @fromdate, @todate, @totalhrs, @approvalstatus, @comments)`;

          await request.query(query);
        }

        await transaction.commit();
        res
          .status(200)
          .send({ flag: 1, message: "Timesheet data inserted successfully" });
      } catch (err) {
        console.log(err);
        await transaction.rollback();
        res
          .status(500)
          .send({ flag: 0, error: "Error inserting timesheet data" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ flag: 0, error: "Database connection error" });
    }
  });
});

router.post("/fetchtimesheetusers", async (req, res) => {
  try {
    const organizationid = req.body.OrgID;
    if (!organizationid) {
      return res.status(400).json({ error: "organizationid is required" });
    }
    await sql.connect(config, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database connection error" });
      }
      const query =
        "SELECT traineeid, firstname, lastname from trainee where active = 1 and organizationid =" +
        organizationid;
      console.log(query);
      const request = new sql.Request();
      request.query(query, (err, result) => {
        if (err) {
          console.error(err);
          sql.close();
          return res.status(500).json({ error: "Database query error" });
        }
        sql.close();
        console.log(result);
        var result = {
          flag: 1,
          result: result.recordset,
        };
        res.send(result);
      });
    });
  } catch (err) {
    var result = {
      flag: 2,
    };
    res.send(result);
  }
});

router.post("/addtimesheetadmin", async (req, res) => {
  try {
    const traineeid = req.body.TraineeID;

    if (!traineeid) {
      return res.status(400).json({ error: "traineeid is required" });
    }

    await sql.connect(config, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database connection error" });
      }

      const query =
        "UPDATE Trainee SET timesheet_role = 2 WHERE traineeid =" + traineeid;

      console.log(query);
      const request = new sql.Request();
      request.query(query, (err, result) => {
        if (err) {
          console.error(err);
          sql.close();
          return res.status(500).json({ error: "Database query error" });
        }
        sql.close();
        console.log(result);
        var result = {
          flag: 1,
        };

        res.send(result);
      });
    });
  } catch (err) {
    return next(err);
  }
});

router.post("/fetchtimesheetadmins", async (req, res) => {
  try {
    const OrgID = req.body.OrgID;

    if (!OrgID) {
      return res.status(400).json({ error: "organizationid is required" });
    }

    await sql.connect(config, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database connection error" });
      }

      const query =
        "SELECT traineeid, firstname, lastname FROM trainee WHERE organizationid =" +
        OrgID +
        " AND timesheet_role = 2";

      console.log(query);
      const request = new sql.Request();
      // request.input('organizationid', sql.Int, organizationid);
      request.query(query, (err, result) => {
        if (err) {
          console.error(err);
          sql.close();
          return res.status(500).json({ error: "Database query error" });
        }
        sql.close();
        console.log(result);
        var result = {
          flag: 1,
          result: result.recordset,
        };

        res.send(result);
      });
    });
  } catch (err) {
    var result = {
      flag: 2,
    };

    res.send(result);
  }
});

router.post("/deletetimesheetadmin", async (req, res) => {
  try {
    const traineeid = req.body.TraineeID;

    if (!traineeid) {
      return res.status(400).json({ error: "traineeid is required" });
    }

    await sql.connect(config);
    const query =
      "UPDATE Trainee SET timesheet_role = 0 WHERE traineeid =" + traineeid;

    const request = new sql.Request();
    request.input("traineeid", sql.Int, traineeid);
    const result = await request.query(query);

    await sql.close();

    res.json({ message: "Admin role Removed successfully" });
  } catch (err) {
    return next(err);
  }
});

router.post("/fetchtimesheetcandidate", async (req, res) => {
  try {
    const organizationid = req.body.OrgID;

    if (!organizationid) {
      return res.status(400).json({ error: "organizationid is required" });
    }

    await sql.connect(config, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database connection error" });
      }

      const query =
        "SELECT traineeid, firstname, lastname FROM trainee WHERE userorganizationid = " +
        organizationid;

      console.log(query);
      const request = new sql.Request();
      // request.input('organizationid', sql.Int, organizationid);
      request.query(query, (err, result) => {
        if (err) {
          console.error(err);
          sql.close();
          return res.status(500).json({ error: "Database query error" });
        }
        sql.close();
        console.log(result);
        var result = {
          flag: 1,
          result: result.recordset,
        };

        res.send(result);
      });
    });
  } catch (err) {
    var result = {
      flag: 2,
    };

    res.send(result);
  }
});

router.post("/fetchtimesheetallcandidate", async (req, res) => {
  try {
    const organizationid = req.body.OrgID;

    if (!organizationid) {
      return res.status(400).json({ error: "organizationid is required" });
    }

    await sql.connect(config, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database connection error" });
      }

      const query =
        "SELECT t.traineeid, t.firstname AS TraineeFirstName, t.lastname AS TraineeLastName,ta.firstname AS AdminFirstName,ta.lastname AS AdminLastName,tp.projectname FROM  trainee t JOIN  timesheet_project tp ON t.timesheetproject = tp.projectid LEFT JOIN trainee ta ON t.timesheet_admin = ta.traineeid WHERE t.userorganizationid = " +
        organizationid;

      console.log(query);
      const request = new sql.Request();
      // request.input('organizationid', sql.Int, organizationid);
      request.query(query, (err, result) => {
        if (err) {
          console.error(err);
          sql.close();
          return res.status(500).json({ error: "Database query error" });
        }
        sql.close();
        console.log(result);
        var result = {
          flag: 1,
          result: result.recordset,
        };

        res.send(result);
      });
    });
  } catch (err) {
    var result = {
      flag: 2,
    };

    res.send(result);
  }
});


router.post("/fetchtimesheetprojects", async (req, res) => {
  try {
    const organizationid = req.body.OrgID;

    if (!organizationid) {
      return res.status(400).json({ error: "organizationid is required" });
    }

    await sql.connect(config, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database connection error" });
      }

      const query =
        "SELECT * FROM timesheet_project WHERE status=1 AND orgid = " +
        organizationid;

      console.log(query);
      const request = new sql.Request();
      // request.input('organizationid', sql.Int, organizationid);
      request.query(query, (err, result) => {
        if (err) {
          console.error(err);
          sql.close();
          return res.status(500).json({ error: "Database query error" });
        }
        sql.close();
        console.log(result);
        var result = {
          flag: 1,
          result: result.recordset,
        };

        res.send(result);
      });
    });
  } catch (err) {
    var result = {
      flag: 2,
    };

    res.send(result);
  }
});

router.post("/assignproject", async (req, res) => {
  try {
    const timesheetadmin = req.body.timesheetadmin;
    const timesheetproject = req.body.timesheetproject;
    const candidateid = req.body.candidateid;

    if (!candidateid) {
      return res.status(400).json({ error: "candidateid is required" });
    }

    await sql.connect(config, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database connection error" });
      }

      const query =
        "UPDATE Trainee SET timesheet_admin = '"+timesheetadmin+"',timesheetproject='"+timesheetproject+"' WHERE traineeid =" +
        candidateid;

      console.log(query);
      const request = new sql.Request();
      // request.input('organizationid', sql.Int, organizationid);
      request.query(query, (err, result) => {
        if (err) {
          console.error(err);
          sql.close();
          return res.status(500).json({ error: "Database query error" });
        }
        sql.close();
        console.log(result);
        var result = {
          flag: 1,
        };

        res.send(result);
      });
    });
  } catch (err) {
    var result = {
      flag: 2,
    };

    res.send(result);
  }
});

module.exports = router;

// router.post('/createTimesheet', async (req, res) => {
//   sql.connect(config, function (err) {
//     if (err) console.log(err);
//     var request = new sql.Request();
//     var query = "SELECT t.firstname,t.lastname,TM.fromdate, TM.todate, TM.totalhrs, TM.approvalstatus, TM.comments FROM Timesheet_Master TM INNER JOIN Trainee T ON TM.traineeid = T.traineeid WHERE T.timesheet_admin ='" + req.body.traineeID +"' ";
//     console.log(query);
//     request.query(query,
//       function (err, recordset) {
//         if (err) console.log(err);

//         var result = {
//           flag: 1,
//           result: recordset.recordsets[0],
//         };
//         res.send(result);
//       }
//     );
//   });
// })

// router.post('/deleteUserAccount', async (req, res) => {
//   const email = req.body.email;
//   try {
//     const dtrainee = await deactivatetrainee(email);
//     const dmemberdetails = await deactivatememberdetails(email);

//     if (dtrainee && dmemberdetails) {
//       const result = {
//         flag: 1,
//       };
//       res.send(result);
//     } else {
//       const result = {
//         flag: 0,
//       };
//       res.send(result);
//     }
//   } catch (error) {
//     const result = {
//       flag: 0,
//     };
//     res.send(result);
//   }

// })

// async function deactivatetrainee(email){
//   const pool = await sql.connect(config);
//   const request = pool.request();
//   const queryResult = await request.query(
//     `update trainee set active = 0 where username = '${email}'`
//   );
//   return queryResult;
// }

// async function deactivatememberdetails(email){
//   const pool = await sql.connect(config);
//   const request = pool.request();
//   const queryResult = await request.query(
//     `update memberdetails set active = 0 where  useremail ='${email}'`
//   );
//   return queryResult;
// }
