const Note = require("../models/note");

const fetchNotes = async (req, res) => {
  //find note
  const notes = await Note.find();
  //respond with note
  res.json({ notes });
};

const fetchNote = async (req, res) => {
  //get the id
  const noteId = req.params.id;
  //find the note using id
  const note = await Note.findById(noteId);
  //respon the note
  res.json({ note });
};

const createNote = async (req, res) => {
  //Get the sent in data off request body
  const { title, body } = req.body;

  //Create a note with it
  const note = await Note.create({
    title,
    body,
  });
  //respond with the new note
  res.json({ note });
};

const updateNote = async (req, res) => {
  //Get id of the url
  const noteId = req.params.id;

  //get data after request body
  const { titleReq, bodyReq } = req.body;

  //find and update the record or data
  await Note.findByIdAndUpdate(noteId, {
    titleReq,
    bodyReq,
  });

  //find updated note
  const note = await Note.findById(noteId);
  //Respond with the updated note
  res.json({ note });
};

const deleteNote = async (req, res) => {
  //find id of the url
  const noteId = req.params.id;

  //delete the record
  await Note.deleteOne({ _id: noteId });

  //respond
  res.json({ success: "Record deleted successfully!" });
};

module.exports = {
  fetchNotes,
  fetchNote,
  createNote,
  updateNote,
  deleteNote,
};
