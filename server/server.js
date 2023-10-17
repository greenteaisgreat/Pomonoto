if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const connectToDb = require('./db');
const noteController = require('./controllers/note-controller');

app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../dist')));

connectToDb();

app.get('/', (req, res) => {
  console.log('The root works!');
  res.status(200).sendFile(path.resolve(__dirname, 'index.html'));
});

app.post('/pomonotes', noteController.createNote, (req, res) => {
  res.status(200).json(res.locals.newNote);
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
});

app.listen(PORT, ()=> console.log(`Server is listening on port ${PORT}`));