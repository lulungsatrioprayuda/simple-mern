const Note = require("../models/note");

const fetchNotes = async (req, res) => {
  try {
    //find note
    const notes = await Note.find({ user: req.user._id });
    //respond with note
    res.json({ notes });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const fetchNote = async (req, res) => {
  //get the id
  const noteId = req.params.id;

  //find the note using id
  const note = await Note.findOne({ _id: noteId, user: req.user._id });
  //respon the note
  res.json({ note });
};

const createNote = async (req, res) => {
  try {
    //Get the sent in data off request body
    const { title, body } = req.body;

    //Create a note with it
    const note = await Note.create({
      title,
      body,
      user: req.user._id,
    });
    //respond with the new note
    res.json({ note });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const updateNote = async (req, res) => {
  try {
    //Get id of the url
    const noteId = req.params.id;

    //get data after request body
    const { title, body } = req.body;

    //find and update the record or data
    await Note.findOneAndUpdate(
      { _id: noteId, user: req.user._id },
      {
        title,
        body,
      }
    );

    //find updated note
    const note = await Note.findById(noteId);
    //Respond with the updated note
    res.json({ note });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const deleteNote = async (req, res) => {
  try {
    //find id of the url
    const noteId = req.params.id;

    //delete the record
    await Note.deleteOne({ _id: noteId, user: req.user._id });

    //respond
    res.json({ success: "Record deleted successfully!" });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

module.exports = {
  fetchNotes,
  fetchNote,
  createNote,
  updateNote,
  deleteNote,
};
