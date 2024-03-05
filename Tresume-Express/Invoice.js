const express = require("express");
const router = express.Router();
const sql = require("mssql");
const bodyparser = require('body-parser');
const environment = process.env.NODE_ENV || "prod";
const envconfig = require(`./config.${environment}.js`);

router.use(bodyparser.json());

const config = {
  user: "sa",
  password: "Tresume@123",
  server: "92.204.128.44",
  database: "Tresume",
  trustServerCertificate: true,
};

router.post('/getPaidInvoiceList', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const request = pool.request();
        const query = "SELECT im.created_at, im.invoiceNo, im.invoice_message, im.ispaid, c.ClientName FROM invoice_Master AS im JOIN Clients AS c ON im.clientid = c.clientid WHERE im.traineeid = '" + req.body.TraineeID + "' AND im.ispaid = 1";
        console.log(query);
        const queryResult = await request.query(query);
        
        // if (queryResult.rowsAffected[0] === 0) {
        //   return res.status(404).json({ message: "No records found!" });
        // }
        
        return res.status(200).json(queryResult.recordset);
      } catch (error) {
        console.error("Error while fetching paid invoice list:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
});

router.post('/getunPaidInvoiceList', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const request = pool.request();
        const query = "SELECT im.created_at, im.invoiceNo, im.invoice_message, im.ispaid, c.ClientName FROM invoice_Master AS im JOIN Clients AS c ON im.clientid = c.clientid WHERE im.traineeid = '" + req.body.TraineeID + "' AND im.ispaid = 0";
        console.log(query);
        const queryResult = await request.query(query);
        
        // if (queryResult.rowsAffected[0] === 0) {
        //   return res.status(404).json({ message: "No records found!" });
        // }
        
        return res.status(200).json(queryResult.recordset);
      } catch (error) {
        console.error("Error while fetching paid invoice list:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
});

router.post('/getAllInvoiceList', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const request = pool.request();
        const query = "SELECT im.created_at, im.invoiceNo, im.invoice_message, c.ClientName FROM invoice_Master AS im JOIN Clients AS c ON im.clientid = c.clientid WHERE im.traineeid = '" + req.body.TraineeID + "'";
        console.log(query);
        const queryResult = await request.query(query);
        
        // if (queryResult.rowsAffected[0] === 0) {
        //   return res.status(404).json({ message: "No records found!" });
        // }
        
        return res.status(200).json(queryResult.recordset);
      } catch (error) {
        console.error("Error while fetching paid invoice list:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
});

router.post("/UpdateRejectStatus", async function (req, res) {
  try {
    var query = "UPDATE timesheet_master SET status = '" + req.body.status + "' AND admincomments = '" + req.body.comments + "' WHERE id = '" + req.body.id + "'";

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
    console.error(error);
    const data = {
      flag: 0,
      message: "Internal Server Error",
    };
    res.status(500).send(data);
  }
});

router.post("/UpdateAcceptStatus", async function (req, res) {
  try {
    var query = "UPDATE timesheet_master SET status = '" + req.body.status + "' AND admincomments = '" + req.body.comments + "' WHERE id = '" + req.body.id + "'";

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
    console.error(error);
    const data = {
      flag: 0,
      message: "Internal Server Error",
    };
    res.status(500).send(data);
  }
});

router.post("/Candidateviewdetails", async (req, res) => {
  try {
    sql.connect(config, function (err) {
      if (err) {
        console.log(err);
        throw err;
      }
      var request = new sql.Request();

      var query = "SELECT TM.id,TM.admincomment, CONCAT(T.firstname, ' ', T.lastname) as Candidate, TM.projectid, TM.day1, TM.day2, TM.day3, TM.day4, TM.day5, TM.day6, TM.day7, TM.totalamt, TM.comments FROM Timesheet_Master TM INNER JOIN Trainee T ON TM.traineeid = T.traineeid WHERE T.timesheet_admin ='" + req.body.traineeID + "' AND TM.status=1";


      console.log(query);
      request.query(query, function (err, recordset) {
        if (err) {
          console.log(err);
          throw err;
        }

        var result = {
          flag: 1,
          result: recordset.recordsets[0],
        };

        res.send(result);
      });
    });
  } catch (error) {
    console.error("Error occurred: ", error);
    res.status(500).send("An error occurred while processing your request.");
  }
});

module.exports = router;
