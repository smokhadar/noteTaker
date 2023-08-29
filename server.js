const path = require('path');
const express = require('express');
const api = require('./routes/index.js');

const PORT = 3001;
const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', api);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req, res) => {
    console.info('directing to notes page')
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.listen(PORT, () =>
    console.info(`noteTaker app listening at http://localhost:${PORT}`));
