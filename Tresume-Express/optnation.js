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

const username = 'wilson.am@tresume.us';
const password = 'tresume123';

router.use(bodyparser.json());

const config = {
    user: "sa",
    password: "Tresume@123",
    server: "92.204.128.44",
    database: "Tresume",
    trustServerCertificate: true,
  };

  router.get('/optresumesearch', async (req, res) => {
    try {
      const { keywords, location, sort, start, limit, page } = req.query;
  
      const apiUrl = 'https://optnation.com/api/resumesearch';
      const queryParams = {
        username,
        password,
        keywords: keywords || '',
        location: location || '',
        sort: sort || 'date',
        start: start || 0,
        limit: limit || 10,
        page: page || 1,
      };
      console.log(queryParams);
      const response = await axios.get(apiUrl, { params: queryParams });

      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/optresumeopen', async (req, res) => {
    try {
      const { resumeid } = req.query;

      const apiUrl = 'https://optnation.com/api/resumeopen';
      const queryParams = {
        username,
        password,
        resumeid,
      };
  
      const response = await axios.get(apiUrl, { params: queryParams });
  
      if (response.data && response.data.downloadLink && response.data.resumeBase64) {
        const { downloadLink, resumeBase64 } = response.data;

        res.json({ downloadLink, resumeBase64 });
      } else {
        res.status(500).json({ error: 'Invalid response from the external API' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.post('/optpostjob', async (req, res) => {
    try {
      const {
        title,
        skill,
        location,
        jobcat,
        description,
        benefits,
        indtype,
        s1,
        s2,
        stype,
        hires,
        jobtype,
        minexp,
        maxexp,
      } = req.body;
  
      // Make sure required parameters are provided
      if (
        !title ||
        !skill ||
        !jobcat ||
        !description ||
        !indtype ||
        !s1 ||
        !s2 ||
        !stype ||
        !hires ||
        !jobtype ||
        !minexp ||
        !maxexp
      ) {
        return res.status(400).json({ error: 'All required parameters must be provided.' });
      }

      const apiUrl = 'https://optnation.com/api/postjob';

      const requestData = {
        username,
        password,
        title,
        skill,
        location: location || '',
        jobcat,
        description,
        benefits: benefits || '',
        indtype,
        s1,
        s2,
        stype,
        hires,
        jobtype,
        minexp,
        maxexp,
      };
  
      const response = await axios.post(apiUrl, requestData);
  
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports = router;
  
  