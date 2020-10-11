// Dependencies, requires
const express = require('express');
// Heroku requires port 80, set the environment variable process.env.PORT
const PORT = process.env.PORT || 3002;
// Instantiate an Express server & set port
const app = express();
const path = require('path');
// required to POST
const fs = require('fs');
// id gen
const unique_id = require('unique-id-key')

const notes = require('./db/db.json');

// Variables Above -- Functions Below (this is the way)

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET requests
app.get('/', (req, res) => { // home to index.html
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get('/notes', (req, res) => { // notes to index.html
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get('/api/notes', (req, res) => {
  return res.json(notes);
});

// POST requests

app.post('/api/notes', (req, res) => {
  req.body.id = unique_id.APIKEY(8, "-");
  const newNote = req.body;
  notes.push(newNote);
  res.json(newNote);
});

// Listen for requests
app.listen(PORT, () => {
  console.log(`API server on port ${PORT}!`);
});