import { useEffect } from "react";
import notesStore from "../stores/noteStore";
import CreateForm from "./CreateForm";
import Notes from "./Notes";
import UpdateForm from "./UpdateForm";

function App() {
  const store = notesStore();
  //state

  //use effect
  useEffect(() => {
    store.fetchNotes();
  }, []);

  return (
    <>
      <div>
        <Notes />
        <UpdateForm />
        <CreateForm />
      </div>
    </>
  );
}

export default App;
