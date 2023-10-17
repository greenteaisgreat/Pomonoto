const mongoose = require('mongoose');

const noteModel = new mongoose.Schema({
  title: String,
  note: String,
});

const NewNote = mongoose.model('Note', noteModel);

modules.export = NewNote;