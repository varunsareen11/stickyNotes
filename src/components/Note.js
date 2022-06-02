import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";

const Note = ({ id, text, date, handleDeleteNote }) => {
  const [initialPos, setInitialPos] = useState([null, null]);
  const [initialSize, setInitialSize] = useState([null, null]);
  const initial = (e, id) => {
    let resizable = document.getElementById(id);
    console.log("event", e);
    console.log("id", id);
    setInitialPos([e.clientX, e.clientY]);
    setInitialSize([resizable.offsetWidth, resizable.offsetHeight]);
  };

  const resize = (e, id) => {
    let resizable = document.getElementById(id);

    resizable.style.width = `${
      parseInt(initialSize[0]) + parseInt(e.clientX - initialPos[0])
    }px`;
    resizable.style.height = `${
      parseInt(initialSize[1]) + parseInt(e.clientX - initialPos[1])
    }px`;
  };
  return (
    <div
      className="note"
      id={id}
      draggable="true"
      onDragStart={(e) => initial(e, id)}
      onDrag={(e) => resize(e, id)}
    >
      <span>{text}</span>
      <div className="note-footer">
        <small>{date}</small>
        <MdDeleteForever
          onClick={() => handleDeleteNote(id)}
          className="delete-icon"
          size="1.3em"
        />
      </div>
    </div>
  );
};

export default Note;
