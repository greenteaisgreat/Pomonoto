if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const connectToDb = require('./db');

app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../dist')));

connectToDb();

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, 'index.html'));
});

app.post('/pomonotes', (req, res) => {

});

app.all('*', (req, res) => {
  res.status(404).send('The page you\'re looking for does not exist. Get back to studying!');
});

app.listen(PORT, ()=> console.log(`Server is listening on port ${PORT}`));