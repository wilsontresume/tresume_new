const express = require('express');
const router = express.Router();
const pool = require('./database');
var request = require('request');

router.post('/deleteOnboard', async (req, res) => {

    pool.request().query("delete from CurrentOnboardings where ID=" + req.body.id +
        "delete from OnboardingDocRequest where OnboardID=" + req.body.id +
        "delete from OnboardingSession where OnboardID=" + req.body.id, (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Error executing query');
                return;
            }
            res.send(result.recordset);
        });
});

router.post('/deleteRequestedDoc', async (req, res) => {

    pool.request().query("delete from OnboardingDocRequest where ID=" + req.body.id + "and OnboardID=" + req.body.onBoardID + ";" +
        "exec setOnboardingPercent " + req.body.onBoardID + ";", (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Error executing query');
                return;
            }
            res.send(result.recordset);
        });
});

router.post('/rejectDoc', async (req, res) => {

    pool.request().query("update OnboardingDocRequest set isUpload=0, DocNotes='" + req.body.note + "' where OnboardID=" + req.body.onBoardID + " and ID=" + req.body.id,
        (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Error executing query');
                return;
            }
            res.send(result.recordset);
        });
});

router.post('/getBaseAI', function (req, res) {
    let response = null;
    var options = {
        'method': 'POST',
        'url': 'https://base64.ai/api/scan',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': 'ApiKey rohit@tresume.us:7073ecba-8017-4107-b62c-5bc8240e9a38'
        },
        body: JSON.stringify({
            "image": req.body.file
        })
        ,
        timeout: 10000
    };

    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.send(response.body);
    });
});

module.exports = router;
