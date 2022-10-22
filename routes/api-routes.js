const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const apiRoutes = express.Router();
const {logMethod, statusReport} = require('../utils/logger');

apiRoutes.use((req, res, next)=> {
    logMethod(req.method, `${req.path}`);
    next();
});
apiRoutes.use(express.json());

apiRoutes.get('/notes', async (req, res) => {

    try{
        const dbPath = path.join(__dirname, '../db/db.json');
        const existingNotes = JSON.parse(await fs.readFile(dbPath));
        statusReport(200, );
        res.status(200).json(existingNotes);
    }
    catch (err) {
        statusReport(500, err)
        res.status(500).send(`Failed to read database`);

    }

});


// apiRoutes.post('/notes', async (req, res) => {

// });



module.exports = apiRoutes;