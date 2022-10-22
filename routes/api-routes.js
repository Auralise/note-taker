const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const { existsSync } = require('fs');
const { statusReport } = require('../utils/logger');
const { createUuid } = require('../utils/uuid');

//initialise express router
const apiRoutes = express.Router();

// use the JSON middleware
apiRoutes.use(express.json());

//db.json path
const dbPath = path.join(__dirname, '../db/db.json');

//API get route which returns all saved notes
apiRoutes.get('/notes', async (req, res) => {
    
    try {
        //If the db does not exist, create an empty file 
        if (!existsSync(dbPath)){
            await fs.writeFile(dbPath, JSON.stringify([]));
        } 

        //read existing notes
        let existingNotes = JSON.parse(await fs.readFile(dbPath));    

        statusReport(200,);
        res.status(200).json(existingNotes);
    }
    catch (err) {
        statusReport(500, err)
        res.status(500).send(`Failed to read database`);

    }

});


apiRoutes.post('/notes', async (req, res) => {

    //based on the frontend code, this will never happen - Good to have it anyway
    if (!req.body.title || !req.body.text) {
        res.status(400).json({
            error: "Body must contain text with the Fields title and text. Please try again.",
            status: 400,
        })
    }

    try {
        let existingNotes = JSON.parse(await fs.readFile(dbPath));

        const note = {
            id: createUuid(),
            title: req.body.title,
            text: req.body.text
        }

        existingNotes.push(note);

        await fs.writeFile(dbPath, JSON.stringify(existingNotes));

        statusReport(201,);
        res.status(201).json({ status: 201, message: 'successfully added note' });

    }
    catch (err) {
        statusReport(500, err);
        res.status(500).json({ error: "Failed to add note.", status: 500 });
    }

});


apiRoutes.delete('/notes/:id', async (req, res) => {
       
    try {
        const notes = JSON.parse(await fs.readFile(dbPath));
        
        const deleted = notes.splice(notes.findIndex(e => e.id === req.params.id), 1);
        
        await fs.writeFile(dbPath, JSON.stringify(notes));

        statusReport(200, );
        res.status(200).json({
            status: 200,
            message: "Note successfully deleted",
            deletedid: `${deleted[0].id}`,
        });

    }
    catch (err) {
        statusReport(500, err);
        res.status(500).json({
            status: 500,
            message: `Failed to delete note id ${req.params.id}`,
            error_text: `Error text: ${err}`
        });
    }


})



module.exports = apiRoutes;