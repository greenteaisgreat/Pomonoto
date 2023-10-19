const mongoose = require('mongoose');

const noteModel = new mongoose.Schema({
  title: String,
  noteBody: String,
});

const NewNote = mongoose.model('Note', noteModel);

module.exports = NewNote;