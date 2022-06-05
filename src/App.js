import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
// import NotesList from "./components/NotesList";
import TaskList from "./components/TaskList";
import Demo from "./components/demo";
import Demo2 from "./components/demo2";

const App = () => {
  const [notes, setNotes] = useState([]);

  const [searchText] = useState("");

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));

    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <div className="wrapper">
      <div className="container">
        <div className="sidebar">
          <div className="notesList">
            <Demo />
            <Demo2 />
            {/* <NotesList
              notes={notes.filter((note) =>
                note.text.toLowerCase().includes(searchText)
              )}
              handleAddNote={addNote}
              handleDeleteNote={deleteNote}
            /> */}
          </div>
          <div className="taskList">
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
