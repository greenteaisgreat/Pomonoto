const Note = require('../models/note');

const noteController = {};

noteController.createNote = async (req, res, next) => {
  //retrieve the user's title and note
  const {title, noteBody} = req.body;

    const note = await Note.create({
      title,
      noteBody
    });

    res.locals.newNote = note;

    console.log('The note was sent!');
    return next();
  } 

module.exports = noteController;