import { create } from "zustand";
import axios from "axios";

const notesStore = create((set) => ({
  notes: null,

  createForm: {
    title: "",
    body: "",
  },

  updateForm: {
    _id: null,
    title: "",
    body: "",
  },

  fetchNotes: async () => {
    //  fetch the notes data
    const res = await axios.get("http://localhost:3000/notes");

    //  set to state
    set({
      notes: res.data.notes,
    });
  },

  updateCreateFormField: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        createForm: {
          ...state.createForm,
          [name]: value,
        },
      };
    });
  },

  createNote: async (e) => {
    e.preventDefault();

    const { createForm, notes } = notesStore.getState();
    //create the note
    const res = await axios.post("http://localhost:3000/notes", createForm);

    set({
      notes: [...notes, res.data.note],
      createForm: { title: "", body: "" },
    });
  },

  deleteNote: async (_id) => {
    //delete the note
    const res = await axios.delete(`http://localhost:3000/notes/${_id}`);
    const { notes } = notesStore.getState();

    //update state
    const newNotes = notes.filter((note) => {
      return note._id !== _id;
    });

    set({ notes: newNotes });

    //  try {
    //    // delete the note
    //    await axios.delete(`http://localhost:3000/notes/${_id}`);

    //    // update state after successful deletion
    //    set((state) => ({
    //      notes: state.notes.filter((note) => note._id !== _id),
    //    }));
    //  } catch (error) {
    //    console.error("Error deleting note:", error);
    //  }
  },

  handleUpdateFieldChange: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        updateForm: {
          ...state.updateForm,
          [name]: value,
        },
      };
    });
  },

  toggleUpdate: ({ _id, title, body }) => {
    //get the current note values
    set({
      updateForm: {
        title,
        body,
        _id,
      },
    });
  },

  updateNote: async (e) => {
    e.preventDefault();

    const {
      updateForm: { title, body, _id },
      notes,
    } = notesStore.getState();
    //send update request
    const res = await axios.put(`http://localhost:3000/notes/${_id}`, {
      title,
      body,
    });
    //update state
    const newNotes = [...notes];
    const noteIndex = notes.findIndex((note) => {
      return note._id === _id;
    });

    newNotes[noteIndex] = res.data.note;

    set({
      notes: newNotes,
      updateForm: {
        _id: null,
        title: "",
        body: "",
      },
    });
  },
}));

export default notesStore;
