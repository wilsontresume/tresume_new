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



// Route for handling form submissions
router.post('/leadenquiry', async (req, res) => {
  try {
    const { firstname, surename, email, phone, message, companyname, type } = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.mail.yahoo.com",
      auth: {
        user: "support@tresume.us",
        pass: "xzkmvglehwxeqrpd",
      },
      secure: true,
    });

    // Define the email options
    const mailOptions = {
      from: 'support@tresume.us',
      to: 'nithya@tresume.us',
      bcc: 'wilson.am@tresume.us',
      subject: 'Enquiry from new Lead',
      html: `
        <p><strong>Firstname:</strong> ${req.body.name}</p>
        <p><strong>Lastname:</strong> ${req.body.surname}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Phone:</strong> ${req.body.phone}</p>
        <p><strong>Company Name:</strong> ${req.body.companyName}</p>
        <p><strong>Message:</strong> ${req.body.message}</p>


      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.send({ success: true, message: 'Form submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
