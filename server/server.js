if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const connectToDb = require('./db');
const noteController = require('./controllers/note-controller');

//parses all incoming json requests
app.use(express.json());
//serves all static files
app.use(express.static(path.resolve(__dirname, '../dist')));
//enables cross-resource sharing for all routes (would usually target a specific domain irl, rather than all)
app.use(cors());

connectToDb();

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, 'index.html'));
});

app.post('/pomonotes', noteController.createNote, (req, res) => {
  res.status(200).json(res.locals.newNote);
});

app.get('/pomonotes', noteController.getNotes, (req, res) => {
  res.status(200).json(res.locals.getNotes);
});

app.get('/pomonotes/:id', noteController.getNoteById, (req, res) => {
  res.status(200).json(res.locals.getNoteById);
});

app.put('/pomonotes/:id', noteController.updateNote, (req, res) => {
  res.status(200).json(res.locals.updateNote);
});

app.delete('/pomonotes/:id', noteController.deleteNote, (req, res) => {
  res.status(200).json(res.locals.deleteNote);
});

app.all('*', (req, res) => {
  res.status(404).send('The page you\'re looking for does not exist. Get back to studying!');
});

//global error handler
app.use((err, req, res, next) => {
  const defaultError = {
    log: 'An unknown error has occurred',
    status: 500,
    message: {err: 'An error has occurred'}
  }
  const errorObj = Object.assign(defaultError, err);

  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, ()=> console.log(`Server is listening on port ${PORT}`));