const Note = require('../models/note');

const noteController = {};

noteController.createNote = async (req, res, next) => {
  //retrieve the user's optional title and note
  const {title, note} = req.body;

  try {
    const note = await Note.create({
      title,
      note
    });

    res.json({note});
    console.log('The note was sent!');
    return next();
  } 
  catch(err) {
    return next({
      log: 'An error occurred in noteController.createNote',
      status: 500,
      message: {err: 'An error occurred :('}
    });
  }
}

modules.export = noteController;