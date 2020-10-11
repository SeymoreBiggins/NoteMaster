// Dependencies, requires
const express = require('express');
// connect to the JSON data //
const { notes } = require('./db/db');
const path = require('path');
// required to POST
const fs = require('fs');

// Instantiate an Express server & set port
const app = express();
// Heroku requires port 80, set the environment variable process.env.PORT
const PORT = process.env.PORT || 3002;

// Variables Above -- Functions Below (this is the way)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

// GET requests
app.get('/', (req, res) => { // home to index.html
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get('/notes', (req, res) => { // notes to index.html
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get('/api/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// POST requests

app.post('/api/notes', (req, res) => {
  // array 
   req.body.id = notes.length.toString();
  //validation
  if (!validateNotes(req.body)) {
    res.status(400).send('The note is not formed propertly. Ensure all fields are filled.');
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});

// Listen for requests
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});