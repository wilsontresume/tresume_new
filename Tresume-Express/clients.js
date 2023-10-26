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

router.post('/getTraineeClientList', async (req, res) => {
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    var query = "select * from Clients where PrimaryOwner '"+ req.body.TraineeID +"' and active = 1";

    console.log(query);
    request.query(query,
      function (err, recordset) {
        if (err) console.log(err);

        var result = {
          flag: 1,
          result: recordset.recordsets[0],
        };

        res.send(result);
      }
    );
  });

})

router.post('/deleteclient', async (req, res) => {
  const TraineeID = req.body.TraineeID;

  try {
    const dclient = await deactivateclient(TraineeID);
    if (dclient) {
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
    console.error("Error deleting client:", error);
    const result = {
      flag: 0,
      error: "An error occurred while deleting the client.",
    };
    res.status(500).send(result);
  }  

})

async function deactivateclient(TraineeID) {
  const pool = await sql.connect(config);
  const request = pool.request();
  const queryResult = await request.query(
    `update Clients set active = 0 where PrimaryOwner = '${TraineeID}'`
  );

  if (queryResult.rowsAffected[0] === 0) {
    throw new Error("No records found!");
  }

  return queryResult;
}
module.exports = router;