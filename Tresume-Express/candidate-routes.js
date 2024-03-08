const express = require('express');
const router = express.Router();
const pool = require('./database');
var request = require('request');

router.post('/getPlacementDetails', async (req, res) => {
    try {
        const result = await pool.request().query(`SELECT p.PID as PlacementID, p.TraineeID, p.RecuiterID, p.Notes, p.BillRate, p.BillType, 
            p.startdate as StartDate, p.Enddate AS EndDate, p.positiontitle as Title, 
            CONCAT(t.FirstName, ' ', t.LastName) AS MarketerName, p.MarketerName AS MarketerID, p.PlacedDate AS PlacedDate, 
            p.ClientState, p.CandidateEmailId, p.ClientName, p.ClientAddress, 
            p.ClientManagerName, p.ClientEmail, p.ClientPhoneNumber AS ClientPhone, 
            p.POStartDate AS POStartDate, p.POEndDate AS POEndDate, p.VendorName, 
            p.VendorContactName AS VendorContact, p.VendorEmail, p.VendorPhone, p.VendorAddress, 
            p.SubVendorName, p.SubVendorContactName AS SubVendorContact, p.SubVendorEmail, p.SubVendorPhone, 
            p.SubVendorAddress, p.PrimaryPlacement 
            FROM placements p
            LEFT JOIN Trainee t ON p.MarketerName = t.TraineeID
            WHERE p.PID=` + req.body.placementID);

        res.send(result.recordset);
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error executing query');
    }
});


/* router.post('/addPlacement1', async (req, res) => {
    try {
        const result = await pool.request()
            .input('PlacementId', sql.Int, req.PlacementId)
            .input('TraineeID', sql.Int, req.TraineeID)
            .input('Notes', sql.NVarChar(sql.MAX), req.Notes)
            .input('BillRate', sql.NVarChar(50), req.BillRate)
            .input('BillType', sql.Int, req.BillType)
            .input('CreateBy', sql.NVarChar(100), req.CreateBy)
            .input('MarketerName', sql.NVarChar(50), req.MarketerName)
            .input('ClientState', sql.NVarChar(50), req.ClientState)
            .input('StartDate', sql.Date, req.StartDate)
            .input('EndDate', sql.Date, req.EndDate)
            .input('DatePlaced', sql.Date, req.DatePlaced)
            .input('Title', sql.NVarChar(50), req.Title)
            .input('WorkEmailID', sql.NVarChar(100), req.WorkEmailID)
            .input('ClientName', sql.NVarChar(100), req.ClientName)
            .input('POStartDate', sql.Date, req.POStartDate)
            .input('POSEndDate', sql.Date, req.POSEndDate)
            .input('ClientManagerName', sql.NVarChar(50), req.ClientManagerName)
            .input('ClientEmail', sql.NVarChar(100), req.ClientEmail)
            .input('ClientPhone', sql.NVarChar(20), req.ClientPhone)
            .input('ClientAddress', sql.NVarChar(200), req.ClientAddress)
            .input('VendorName', sql.NVarChar(100), req.VendorName)
            .input('VendorContact', sql.NVarChar(50), req.VendorContact)
            .input('VendorEmail', sql.NVarChar(100), req.VendorEmail)
            .input('VendorPhone', sql.NVarChar(20), req.VendorPhone)
            .input('VendorAddress', sql.NVarChar(200), req.VendorAddress)
            .input('SubVendorName', sql.NVarChar(100), req.SubVendorName)
            .input('SubVendorContact', sql.NVarChar(50), req.SubVendorContact)
            .input('SubVendorEmail', sql.NVarChar(100), req.SubVendorEmail)
            .input('SubVendorPhone', sql.NVarChar(20), req.SubVendorPhone)
            .input('SubVendorAddress', sql.NVarChar(200), req.SubVendorAddress)
            .input('PrimaryPlacement', sql.Int, req.PrimaryPlacement)
            .execute('UpdatePlacement');

        return result.recordset[0].PlacementId;
    } catch (err) {
        console.error(err);
    }
}); */


module.exports = router;