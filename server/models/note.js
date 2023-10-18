const mongoose = require('mongoose');

const noteModel = new mongoose.Schema({
  title: String,
  noteBody: {type: String, required: true},
});

const NewNote = mongoose.model('Note', noteModel);

module.exports = NewNote;