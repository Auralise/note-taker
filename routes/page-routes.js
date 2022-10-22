const express = require('express');
const path = require('path');
const pageRoutes = express.Router();
const {statusReport} = require('../utils/logger');

//deliver the notes page
pageRoutes.get('/notes', (req, res)=> {
    const pagePath = path.join(__dirname, '../public/notes.html');
    statusReport(200, );
    res.sendFile(pagePath);
});

//Catch all non-specific routes for example url/notes/somethingelse will be served index.html
pageRoutes.get('*', (req, res) => {
    const pagePath = path.join(__dirname, '../public/index.html');
    statusReport(200, );
    res.sendFile(pagePath);
});



module.exports = pageRoutes;