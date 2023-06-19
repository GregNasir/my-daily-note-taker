const express = require('express');
const path = require('path');
const fs = require('fs');
// Helper method for generating unique ids
const uuid = require('uuid');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('./develop/public'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));

   // Log our request to the terminal
    console.info(`${req.method} request received to get notes`);
});

// GET /notes should return the notes.html file.
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));

  // Log our request to the terminal
  console.info(`${req.method} request received to get notes`);
});

// // GET request for notes
// app.get('/api/notes', (req, res) => {
//   // Send a message to the client
//   res.sendFile(path.join(__dirname, '../db/db.json'));

//   // Log our request to the terminal
//   console.info(`${req.method} request received to get notes`);
// });


// POST request to add a review
app.post('/api/notes', (req, res) => {
    let db = fs.readFileSync('db/db.json');
    db = JSON.parse(db);
    res.json(db);

    // If all the required properties are present
    if (title && text) {    
    // creating body for note
    let userNote = {
      title: req.body.title,
      text: req.body.text,
      // creating unique id for each note
      id: uniqid(),
    };

    // pushing created note to be written in the db.json file
    db.push(userNote);

    fs.writeFileSync('db/db.json', JSON.stringify(db), (err) => 
    err
    ? console.error(err)
    : console.log(
        `Notes for ${notes.html} has been written to JSON file`
        )
    );

    res.json(db);

    const response = {
        status: 'success',
        body: userNote,
    };

    console.log(response);
    res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting notes');
    }
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

// DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete.
app.delete('/api/notes/:id', (req, res) => {
    // reading notes form db.json
    let db = JSON.parse(fs.readFileSync('db/db.json'))
    // removing note with id
    let deleteNotes = db.filter(item => item.id !== req.params.id);
    // Rewriting note to db.json
    fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
    res.json(deleteNotes);
    
  });

module.exports = (app);