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
      console.log('Note successfully created!');
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

  noteController.updateNote = async (req, res, next) => {
    try {
    const userId = req.params.id;
    const {title, noteBody} = req.body;
    
    //this finds the note and updates, but does not return the update
    await Note.findByIdAndUpdate(userId, {
      title,
      noteBody
    });

    //returns the updated note
    const updateNote = await Note.findById(userId);

    console.log('Successfully updated user note!');
    res.locals.updateNote = updateNote;
    return next();
  }
  catch(err) {
    return next({
      log: 'An error occurred in noteController.updateNote',
      status: 500,
      message: {
        err: 'An internal server error occurred while updating your note. You didn\'t change your username in the URL, did you?'
      }
    });
   }
  }

  noteController.deleteNote = async (req, res, next) => {
    try {
      const {title, noteBody} = req.body;

      if (Object.values(req.body).length === 0) {
        return next({
          log: 'No data in req.body',
          status: 404,
          message: {
            err: 'That note doesn\'t exist to be deleted!'
          }
        });
      }

      const deleteNote = await Note.deleteMany({
        title,
        noteBody
      });

      res.locals.deleteNote = deleteNote;
      console.log('Note deleted!');
      return next();
    }
    catch(err) {
      return next({
        log: 'An error occurred in noteController.deleteNote',
        status: 500,
        message: {
          err: 'An internal server occurred while trying to delete that note'
        }
      });
    }
  }

  noteController.deleteUserNote = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const {title, noteBody} = req.body;

      const userNote = await Note.findByIdAndDelete(userId, {
        title,
        noteBody
      });

      res.locals.deleteUserNote = userNote;
      console.log('User note successfully deleted!');
      return next();
    }
    catch(err) {
      return next({
        log: 'An error occurred in noteController.deleteUserNote',
        status: 500,
        message: {
          err: 'An internal server error occurred while trying to delete your note'
        }
      });
    }
  }
module.exports = noteController;