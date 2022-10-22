const express = require('express');
const path = require('path');
const pageRoutes = express.Router();
const {logMethod} = require('../utils/logger');


pageRoutes.use((req, res, next) => {
    logMethod(req.method, `${req.path}`)
    next();
});


pageRoutes.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

pageRoutes.get('/notes', (req, res)=> {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
})




module.exports = pageRoutes;