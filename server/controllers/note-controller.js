const Note = require('../models/note');

const noteController = {};

noteController.createNote = async (req, res, next) => {
  //retrieve the user's optional title and note
  const {title, noteBody} = req.body;

  if (!noteBody) {
    return next({
      log: 'No note body provided in the request',
      status: 400,
      message: {
        err: 'You must provide at least one character within the body of the note!'
      }
    });
  }

  try{
    const note = await Note.create({
      title,
      noteBody
    });
    //send the entire note to the server
    res.locals.newNote = note;

    console.log('The note was sent!');
    return next();
  } 
  catch(err) {
    return next({
      log: 'An error occurred in noteController.createNote',
      status: 500,
      message: {
        err: 'Unable to create a note due to an internal error'
      }
    });
   }
  } 

noteController.getNote = async (req, res, next) => {
  try {
    const note = await Note.find();
    if (note.length === 0) {
      return next({
        log: 'No notes within the database',
        status: 404,
        message: 'No notes have been taken yet!'
      });
    } 
    res.locals.getNote = note;
    next();
  } 
  catch(err) {
    return next({
      log: 'Error in noteController.getNote',
      status: 400,
      message: {
        err: 'Unable to retrieve any notes!'
      }
    });
   }
  }

module.exports = noteController;