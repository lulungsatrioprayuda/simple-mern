import React from "react";
import notesStore from "../stores/noteStore";

export default function UpdateForm() {
  const store = notesStore();

  if (!store.updateForm._id) return <></>;
  return (
    <div>
      {store.updateForm._id && (
        <div>
          <h2>Update Note</h2>
          <form onSubmit={store.updateNote}>
            <input
              onChange={store.handleUpdateFieldChange}
              type="text"
              value={store.updateForm.title}
              name="title"
            />
            <textarea
              onChange={store.handleUpdateFieldChange}
              name="body"
              value={store.updateForm.body}
              id=""
              cols="30"
              rows="10"
            ></textarea>
            <button type="submit">Update note</button>
          </form>
        </div>
      )}
    </div>
  );
}
