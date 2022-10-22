const express = require('express');
const path = require('path');
const pageRoutes = express.Router();
const {statusReport} = require('../utils/logger');



pageRoutes.get('/', (req, res) => {
    const pagePath = path.join(__dirname, '../public/index.html');
    
    res.sendFile(pagePath);
});

pageRoutes.get('/notes', (req, res)=> {
    const pagePath = path.join(__dirname, '../public/notes.html');
    res.sendFile(pagePath);
});




module.exports = pageRoutes;