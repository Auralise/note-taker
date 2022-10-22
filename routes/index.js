const express = require('express');
const { appendFile } = require('fs');
const path = require('path');
const apiRoutes = require('./api-routes');
const pageRoutes = require('./page-routes');

const primaryRouter = express.Router();


primaryRouter.use('/api', apiRoutes);

primaryRouter.use('/', pageRoutes);


module.exports = primaryRouter;