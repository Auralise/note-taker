const express = require('express');
const path = require('path');
const getRoutes = express.Router();
const {logMethod} = require('../utils/logger');


getRoutes.use((req, res, next) => {
    logMethod(req.method, `${req.path}`)
    next();
});


getRoutes.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

getRoutes.get('/notes', (req, res)=> {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
})




module.exports = getRoutes;