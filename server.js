//import express and path 
const { Console } = require('console');
const express = require('express');
const path = require('path');

// server 
const app = express();
const PORT = 3001;

// use files from public 
app.use(express.static('public'));

// route to notes.html 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});
// route to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`));