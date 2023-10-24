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
  database: "Tresume",
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

router.post('/getOrgUserList', async (req, res) => {
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    var query = "SELECT  MD.id,  MD.useremail,  MD.firstname AS MemberFirstName,  MD.lastname AS MemberLastName, RN.RoleName, ISNULL( STRING_AGG( COALESCE(T.firstname, '--'), ', ' ) WITHIN GROUP (ORDER BY T.Traineeid),      '--'  ) AS TeamLeads FROM Memberdetails MD LEFT JOIN Trainee T ON CHARINDEX(CONVERT(NVARCHAR(10), T.Traineeid), MD.teamlead) > 0 LEFT JOIN RolesNew RN ON MD.roleid = RN.RoleID WHERE MD.orgID = '" + req.body.OrgID + "' and MD.active = 1 GROUP BY MD.id, MD.useremail, MD.firstname, MD.lastname, RN.RoleName";
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

router.post('/deleteUserAccount', async (req, res) => {
  const email = req.body.email;
  try {
    const dtrainee = await deactivatetrainee(email);
    const dmemberdetails = await deactivatememberdetails(email);

    if (dtrainee && dmemberdetails) {
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
    const result = {
      flag: 0,
    };
    res.send(result);
  }

})

async function deactivatetrainee(email){
  const pool = await sql.connect(config);
  const request = pool.request();
  const queryResult = await request.query(
    `update trainee set active = 0 where username = '${email}'`
  );
  return queryResult;
}

async function deactivatememberdetails(email){
  const pool = await sql.connect(config);
  const request = pool.request();
  const queryResult = await request.query(
    `update memberdetails set active = 0 where  useremail ='${email}'`
  );
  return queryResult;
}

module.exports = router;

