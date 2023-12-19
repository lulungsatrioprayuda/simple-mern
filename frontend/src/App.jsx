import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  //state
  const [notes, setNotes] = useState(null);
  const [createForm, setCreateForm] = useState({
    title: "",
    body: "",
  });

  //use effect
  useEffect(() => {
    fetchNotes();
  }, []);

  //function
  const fetchNotes = async () => {
    //  fetch the notes data
    const res = await axios.get("http://localhost:3000/notes");

    //  set to state
    setNotes(res.data.notes);
  };

  const updateCreateFormField = (e) => {
    const { name, value } = e.target;

    setCreateForm({
      ...createForm,
      [name]: value,
    });
  };

  //create note
  const createNote = async (e) => {
    e.preventDefault();

    //create the note
    const res = await axios.post("http://localhost:3000/notes", createForm);

    //  update state
    setNotes([...notes, res.data.note]);

    //  clear the form state
    setCreateForm({ title: "", body: "" });
  };

  const deleteNote = async (_id) => {
    const id = _id;
    //delete the note
    const res = await axios.delete(`http://localhost:3000/notes/${id}`);
    console.log(res);
    //update state
  };

  return (
    <>
      <div>
        <div>
          <h2>Notes:</h2>
          {notes &&
            notes.map((note) => {
              return (
                <div key={note._id}>
                  <h3>{note.title}</h3>
                  <button onClick={() => deleteNote(note._id)}>
                    Delete note
                  </button>
                </div>
              );
            })}
        </div>

        <div>
          <h2>Create Note</h2>
          <form onSubmit={createNote}>
            <input
              onChange={updateCreateFormField}
              value={createForm.title}
              type="text"
              name="title"
            />
            <textarea
              onChange={updateCreateFormField}
              value={createForm.body}
              name="body"
              id=""
              cols="30"
              rows="10"
            ></textarea>
            <button type="submit">Create note</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
