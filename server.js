//import express and path 
const fs = require('fs');
const express = require('express');
const path = require('path');
const {notes} = require('./db/db.json');

// server 
const app = express();
const PORT = 3001;

// use files from public 
app.use(express.static('public'));
// middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


function newNote(body, notesArray) {
    const note = body
    notesArray.push(note)
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({
            notes: notesArray
        }, null, 2), 
    )
    return note;
} 

app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString()
    const note = newNote(req.body, notes)
    res.json(note)
})

function getNotes(query, notesArray) {
    let allNotes = notesArray
    if (query.title) {
        allNotes = allNotes.filter(
            (note) => notes.title === query.title
            
        )
    }

    return allNotes;
}

app.get('/api/notes', (req, res) => {
    let results = notes
    if (req.query) {
        results = getNotes(req.query, results)
    }
    res.json(results)
})

/*
function findIndex(id, notesArray) {
    const deletedNote =  id;
    for (let i = 0; i < notesArray.length; i++) {
        if (deletedNote === notesArray[i].id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(path.join(__dirname, './db/db.json'),
            JSON.stringify({notes: notesArray}, null, 2), err=> {
                if (err) {
                    throw err;
                }
            });
        }
    }
}

app.delete('/api/notes/:id', (req, res) => {
    let notes = JSON.parse(fs.readFileSync('./db/db.json'));
    const notesIndex = notes.findIndex((note) => note.id === req.params.id)
    if (notesIndex === -1) 
    return res.status(404).json({})
    notes.splice(notesIndex, 1)
    fs.writeFileSync('./db/db.json', JSON.stringify(notes)) 
    res.json(notes)
}) 
*/

// delete - not working 
app.delete('/api/notes/:id', (req, res) => {
    const params = req.params.id
    findIndex(params, notes);
    res.redirect('');
})

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