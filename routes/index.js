const express = require('express');
const apiRoutes = require('./api-routes');
const pageRoutes = require('./page-routes');

//Logger middleware
const {logMethod} = require('../utils/logger');

//Express router init
const primaryRouter = express.Router();

//Use middleware logger for all incoming requests
primaryRouter.use((req, res, next)=> {
    logMethod(req.method, `${req.path}`);
    next();
});

primaryRouter.use('/api', apiRoutes);

primaryRouter.use('/', pageRoutes);


module.exports = primaryRouter;