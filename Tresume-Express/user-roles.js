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

  router.post('/ssologin', async (req, res) => {

    
  })

  module.exports = router;