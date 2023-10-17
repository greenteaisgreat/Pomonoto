const mongoose = require('mongoose');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

async function connectToDb() {
  try {
  await mongoose.connect(process.env.DB_URL);
  console.log('Connected to database!');
  } 
  catch(err) {
    console.log('An error has occurred in the database: ', err);
  }
}

module.exports = connectToDb;