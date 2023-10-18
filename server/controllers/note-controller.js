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

  noteController.getNotes = async (req, res, next) => {
    try {
      const note = await Note.find();
      if (note.length === 0) {
        return next({
          log: 'No notes within the database',
          status: 404,
          message: 'No notes have been taken yet!'
        });
      } 
      console.log('Notes retrieved!');
      res.locals.getNotes = note;
      return next();
    } 
    catch(err) {
      return next({
        log: 'Error in noteController.getNotes',
        status: 500,
        message: {
          err: 'A server error occurred while obtaining all of your notes'
        }
      });
     }
    }

  noteController.getUserNote = async (req, res, next) => {
    try {
    const userId = req.params.id;
    const userNote = await Note.findById(userId);

    if (!userNote) {
      return next({
        log: 'No such user exists in the database',
        status: 404,
        message: {
          err: 'The user you provided doesn\'t exist!'
        }
      });
    }

    res.locals.getUserNote = userNote;
    console.log('Successfully retrieved user note!');
    return next();
  }
  catch(err) {
    return next({
      log: 'Error in noteController.getUserNote',
      status: 500,
      message: {
        err: 'A server error occurred while retrieving your note'
      }
    });
   }
  }
module.exports = noteController;