import React from "react";
import notesStore from "../stores/noteStore";
import Note from "./Note";

export default function Notes() {
  const store = notesStore();

  return (
    <>
      <div>
        <h2>Notes:</h2>
        {store.notes &&
          store.notes.map((note) => {
            return <Note note={note} key={note._id} />;
          })}
      </div>
    </>
  );
}
