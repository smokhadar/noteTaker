// const path = require('path');
const notes = require('express').Router();
const uuid = require('../helpers/uuid');
const { readAndAppend } = require('../helpers/fsUtils');
const notesFiles = require('../db/db.json');

notes.get('/', (req, res) => {
    res.json(notesFiles);
})

notes.post('/', (req, res) => {
    console.info(`${req.method} request received.`)

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        readAndAppend(newNote, `./db/db.json`, (err) =>
            err
            ? console.error(err)
            : console.log(
                `Review for ${newNote.title} has been appended to JSON file`
            )
        );

        const response = {
            status: 'success',
            body: newNote,
        };
        
        console.log(response.status);
        res.status(201).json(response.status);
    } else {
        res.status(500).json('Error in posting note')
    }
})

module.exports = notes;