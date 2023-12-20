import React from "react";
import notesStore from "../stores/noteStore";

export default function CreateForm() {
  const store = notesStore();

  if (store.updateForm._id) return <></>;

  return (
    <div>
      <h2>Create Note</h2>
      <form onSubmit={store.createNote}>
        <input
          onChange={store.updateCreateFormField}
          value={store.createForm.title}
          type="text"
          name="title"
        />
        <textarea
          onChange={store.updateCreateFormField}
          value={store.createForm.body}
          name="body"
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <button type="submit">Create note</button>
      </form>
    </div>
  );
}
