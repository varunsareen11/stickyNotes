import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./style.css";
import TaskList from "../../components/TaskList";
import Demo from "../../components/demo";

function ManagementSystem() {
  const [initialPos, setInitialPos] = useState([null, null]);
  const [initialPosNotes, setinitialPosNotes] = useState([null, null]);
  // const [initialSize, setInitialSize] = useState([null, null]);

  const initial = (e) => {
    setInitialPos([e.clientX, e.clientY]);
    setinitialPosNotes([e.clientX, e.clientY]);
  };

  const resize = (e) => {
    let resizable = document.querySelector(`#taskListId`);

    resizable.style.width = `${
      parseInt(resizable.offsetWidth) + parseInt(e.clientX - initialPos[0])
    }px`;
    resizable.style.height = `${
      parseInt(resizable.offsetHeight) + parseInt(e.clientY - initialPos[1])
    }px`;
  };
  // position

  const resizePos = (e) => {
    let resizable = document.querySelector(`#taskListId`);

    resizable.style.left = `${
      parseInt(resizable.offsetLeft) + parseInt(e.clientX - initialPos[0])
    }px`;
    resizable.style.top = `${
      parseInt(resizable.offsetTop) + parseInt(e.clientY - initialPos[1])
    }px`;
  };

  const resizeNotes = (e) => {
    let resizableNotes = document.querySelector(`#notesListId`);

    resizableNotes.style.flex = `0 0 ${
      parseInt(resizableNotes.offsetWidth) +
      parseInt(e.clientX - initialPosNotes[0])
    }px`;
    resizableNotes.style.width = ` ${
      parseInt(resizableNotes.offsetWidth) +
      parseInt(e.clientX - initialPosNotes[0])
    }px`;
    resizableNotes.style.height = `${
      parseInt(resizableNotes.offsetHeight) +
      parseInt(e.clientY - initialPosNotes[1])
    }px`;
  };
  // position

  const resizePosNotes = (e) => {
    let resizableNotes = document.querySelector(`#notesListId`);

    resizableNotes.style.left = `${
      parseInt(resizableNotes.offsetLeft) +
      parseInt(e.clientX - initialPosNotes[0])
    }px`;
    resizableNotes.style.top = `${
      parseInt(resizableNotes.offsetTop) +
      parseInt(e.clientY - initialPosNotes[1])
    }px`;
  };
  // const [notes, setNotes] = useState([]);

  // const [searchText] = useState("");

  // useEffect(() => {
  //   const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));

  //   if (savedNotes) {
  //     setNotes(savedNotes);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
  // }, [notes]);

  // const addNote = (text) => {
  //   const date = new Date();
  //   const newNote = {
  //     id: nanoid(),
  //     text: text,
  //     date: date.toLocaleDateString(),
  //   };
  //   const newNotes = [...notes, newNote];
  //   setNotes(newNotes);
  // };

  // const deleteNote = (id) => {
  //   const newNotes = notes.filter((note) => note.id !== id);
  //   setNotes(newNotes);
  // };
  return (
    <div className="wrapper">
      <div className="container">
        <div className="sidebar">
          <div className="notesList" id="notesListId">
            <div className="dragable-header">
              <div
                className="listMove"
                draggable="true"
                onDragStart={(e) => initial(e)}
                onDragEnd={(e) => resizePosNotes(e)}
              >
                <img src="assets/images/move.png" alt="" />
              </div>
              <div
                className="listDrag"
                draggable="true"
                onDragStart={(e) => initial(e)}
                onDragEnd={(e) => resizeNotes(e)}
              >
                <img src="assets/images/reduce.png" alt="" />
              </div>
            </div>
            <Demo />
            {/* <Demo2 /> */}
            {/* <NotesList
            notes={notes.filter((note) =>
              note.text.toLowerCase().includes(searchText)
            )}
            handleAddNote={addNote}
            handleDeleteNote={deleteNote}
          /> */}
          </div>
          <div className="taskList" id="taskListId">
            <div className="dragable-header">
              <div
                className="listMove"
                draggable="true"
                onDragStart={(e) => initial(e)}
                onDragEnd={(e) => resizePos(e)}
              >
                <img src="assets/images/move.png" alt="" />
              </div>
              <div
                className="listDrag"
                draggable="true"
                onDragStart={(e) => initial(e)}
                onDragEnd={(e) => resize(e)}
              >
                <img src="assets/images/reduce.png" alt="" />
              </div>
            </div>
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagementSystem;
