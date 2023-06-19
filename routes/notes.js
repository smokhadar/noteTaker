const fs = require('fs');
// const path = require('path');
const notes = require('express').Router();
const uuid = require('../helpers/uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
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

        //convert data to string to save
        // const noteString = JSON.stringify(newNote);

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
        
        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting note')
    }
})

module.exports = notes;