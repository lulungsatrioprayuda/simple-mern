import React, { useEffect } from "react";
import Notes from "../components/Notes";
import UpdateForm from "../components/UpdateForm";
import CreateForm from "../components/CreateForm";
import notesStore from "../stores/noteStore";

export default function NotePage() {
  const store = notesStore();
  //state

  //use effect
  useEffect(() => {
    store.fetchNotes();
  }, []);

  return (
    <>
      <Notes />
      <UpdateForm />
      <CreateForm />
    </>
  );
}
