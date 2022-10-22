const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const { existsSync } = require('fs');
const { statusReport } = require('../utils/logger');
const { createUuid } = require('../utils/uuid');

const apiRoutes = express.Router();

apiRoutes.use(express.json());

//db.json path
const dbPath = path.join(__dirname, '../db/db.json');

apiRoutes.get('/notes', async (req, res) => {

    if (!existsSync(dbPath)) await fs.writeFile(dbPath, '')

    let existingNotes = await fs.readFile(dbPath);
    if (existingNotes.length === 0) {
        existingNotes = [];
        await fs.writeFile(dbPath, JSON.stringify(existingNotes));
    }
    else {
        existingNotes = JSON.parse(existingNotes);
    }

    try {
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

        statusReport(201,);
        res.status(201).json({ status: 201, message: 'success' });

    }
    catch (err) {
        statusReport(500, err);
        res.status(500).json({ error: "Failed to add note.", status: 500 });
    }

});


apiRoutes.delete('/notes/:id', async (req, res) => {
    const notes = JSON.parse(await fs.readFile(dbPath));
    let deleted = [];

    try {
        const delIndex = notes.findIndex(e => e.id === req.params.id);
        deleted = notes.splice(delIndex, 1);
    }
    catch (err) {
        statusReport(500, err);
        res.status(500).json({
            status: 500,
            message: `Failed to delete note id ${req.params.id}`,
            error_text: `Error text: ${err}`
        });
    }

    await fs.writeFile(dbPath, JSON.stringify(notes));

    statusReport(200, );
    res.status(200).json({
        status: 200,
        message: "Note successfully deleted",
        deletedid: `${deleted[0].id}`,
    });
})



module.exports = apiRoutes;