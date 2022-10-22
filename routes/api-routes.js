const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const {statusReport} = require('../utils/logger');
const {createUuid} = require('../utils/uuid');

const apiRoutes = express.Router();

apiRoutes.use(express.json());

//db.json path
const dbPath = path.join(__dirname, '../db/db.json');

apiRoutes.get('/notes', async (req, res) => {
    let existingNotes = JSON.parse(await fs.readFile(dbPath));
    if (existingNotes.length === 0) existingNotes = JSON.stringify([]);

    try{
        statusReport(200, );
        res.status(200).json(existingNotes);
    }
    catch (err) {
        statusReport(500, err)
        res.status(500).send(`Failed to read database`);

    }

});


apiRoutes.post('/notes', async (req, res) => {

    
    if (!req.body.title || !req.body.text){
        res.status(400).json({
            error: "Body must contain text. Please try again.",
            status: 400,
        })
    }
    
    try {
        let existingNotes = JSON.parse(await fs.readFile(dbPath));
        if (existingNotes.length === 0) existingNotes = [];
        const note = {
            id: createUuid(),
            title: req.body.title,
            text: req.body.text
        }
        existingNotes.push(note);
        await fs.writeFile(dbPath, JSON.stringify(existingNotes));

        statusReport(201, );
        res.status(201).json({status: 201, message: 'success'});

    }
    catch (err) {
        statusReport(500, err);
        res.status(500).json({error: "Failed to add note.", status: 500});
    }

    





});



module.exports = apiRoutes;