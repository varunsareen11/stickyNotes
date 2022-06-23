import { useState, useRef, useEffect } from "react";
import "./style.css";
import TaskList from "../../../components/TaskList";
import Demo from "../../../components/demo";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
const API = "http://54.87.14.216";

function ManagementSystem() {
  const { t, i18n } = useTranslation();
  const user = JSON.parse(localStorage.getItem("user-info"));
  const token = user.token;
  console.log(token);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user-info")) {
      navigate("/login");
    }
  })
  // TaskBar Script
  const dragEl = useRef(null);
  const [pos, setPos] = useState([476, 0]);
  const [mov, setMov] = useState([0, 0]);
  const [initial, setInitial] = useState([0, 0]);
  const [down, setDown] = useState(false);
  const [style, setStyle] = useState({});

  const handlePointerDown = (e) => {
    setDown(true);
    setInitial([e.clientX, e.clientY]);
    setMov([0, 0]);

    if (dragEl?.current != null) {
      dragEl?.current?.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e) => {
    if (!down) return;
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;

    setMov([e.clientX - initial[0], e.clientY - initial[1]]);
    const x = pos[0] + mov[0];
    const y = pos[1] + mov[1];
    setStyle({
      // transform: `translate3d(${x}px,${y}px,0)`,
      left: `${x}px`,
      top: `${y}px`
    });
    createDrag(style);
  };

  const handlePointerUp = (e) => {
    setDown(false);
    setPos([pos[0] + mov[0], pos[1] + mov[1]]);

    if (dragEl?.current != null) {
      dragEl?.current?.releasePointerCapture(e.pointerId);
    }
  };

  // Event Calender Script
  const [pos2, setPos2] = useState([0, 0]);
  const [mov2, setMov2] = useState([0, 0]);
  const [initial2, setInitial2] = useState([0, 0]);

  const [down2, setDown2] = useState(false);

  const [style2, setStyle2] = useState({});
  const dragEl2 = useRef(null);

  const eventHandlePointerDown = (e) => {
    setDown2(true);
    setInitial2([e.clientX, e.clientY]);
    setMov2([0, 0]);

    if (dragEl2?.current != null) {
      dragEl2?.current?.setPointerCapture(e.pointerId);
    }
  };

  const eventHandlePointerMove = (e) => {
    if (!down2) return;
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;

    setMov2([e.clientX - initial2[0], e.clientY - initial2[1]]);
    const x = pos2[0] + mov2[0];
    const y = pos2[1] + mov2[1];
    setStyle2({
      // transform: `translate3d(${x}px,${y}px,0)`,
      left: `${x}px`,
      top: `${y}px`,
    });
  };

  const eventHandlePointerUp = (e) => {
    setDown2(false);
    setPos2([pos2[0] + mov2[0], pos2[1] + mov2[1]]);

    if (dragEl2?.current != null) {
      dragEl2?.current?.releasePointerCapture(e.pointerId);
    }
  };

  // resize taskbar
  const taskRef = useRef(null);
  const taskRefLeft = useRef(null);
  const taskRefTop = useRef(null);
  const taskRefRight = useRef(null);
  const taskRefBottom = useRef(null);
  useEffect(() => {
    const resizeableEle = taskRef.current;
    const styles = window.getComputedStyle(resizeableEle);
    let width = parseInt(styles.width, 10);
    let height = parseInt(styles.height, 10);
    let x = 0;
    let y = 0;

    // resizeableEle.style.top = "0";
    // resizeableEle.style.left = "0";

    // Right resize
    const onMouseMoveRightResize = (event) => {
      const dx = event.clientX - x;
      x = event.clientX;
      if ((width + dx) < 320) {
        width = 320;
      } else {
        width = width + dx;
      }
      resizeableEle.style.width = `${width}px`;
    };

    const onMouseUpRightResize = (event) => {
      document.removeEventListener("mousemove", onMouseMoveRightResize);
    };

    const onMouseDownRightResize = (event) => {
      x = event.clientX;
      resizeableEle.style.left = styles.left;
      resizeableEle.style.right = null;
      document.addEventListener("mousemove", onMouseMoveRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
    };

    // Top resize
    const onMouseMoveTopResize = (event) => {
      const dy = event.clientY - y;
      height = height - dy;
      y = event.clientY;
      resizeableEle.style.height = `${height}px`;
    };

    const onMouseUpTopResize = (event) => {
      document.removeEventListener("mousemove", onMouseMoveTopResize);
    };

    const onMouseDownTopResize = (event) => {
      y = event.clientY;
      const styles = window.getComputedStyle(resizeableEle);
      resizeableEle.style.bottom = styles.bottom;
      resizeableEle.style.top = null;
      document.addEventListener("mousemove", onMouseMoveTopResize);
      document.addEventListener("mouseup", onMouseUpTopResize);
    };

    // Bottom resize
    const onMouseMoveBottomResize = (event) => {
      const dy = event.clientY - y;
      height = height + dy;
      y = event.clientY;
      resizeableEle.style.height = `${height}px`;
    };

    const onMouseUpBottomResize = (event) => {
      document.removeEventListener("mousemove", onMouseMoveBottomResize);
    };

    const onMouseDownBottomResize = (event) => {
      y = event.clientY;
      const styles = window.getComputedStyle(resizeableEle);
      resizeableEle.style.top = styles.top;
      resizeableEle.style.bottom = null;
      document.addEventListener("mousemove", onMouseMoveBottomResize);
      document.addEventListener("mouseup", onMouseUpBottomResize);
    };

    // Left resize
    const onMouseMoveLeftResize = (event) => {
      const dx = event.clientX - x;
      x = event.clientX;
      if ((width - dx) < 320) {
        width = 320;
      } else {
        width = width - dx;
      }
      resizeableEle.style.width = `${width}px`;
    };

    const onMouseUpLeftResize = (event) => {
      document.removeEventListener("mousemove", onMouseMoveLeftResize);
    };

    const onMouseDownLeftResize = (event) => {
      x = event.clientX;
      resizeableEle.style.right = styles.right;
      resizeableEle.style.left = null;
      document.addEventListener("mousemove", onMouseMoveLeftResize);
      document.addEventListener("mouseup", onMouseUpLeftResize);
    };

    // Add mouse down event listener
    const resizerRight = taskRefRight.current;
    resizerRight.addEventListener("mousedown", onMouseDownRightResize);
    const resizerBottom = taskRefBottom.current;
    const resizerTop = taskRefTop.current;
    resizerTop.addEventListener("mousedown", onMouseDownTopResize);
    resizerBottom.addEventListener("mousedown", onMouseDownBottomResize);
    const resizerLeft = taskRefLeft.current;
    resizerLeft.addEventListener("mousedown", onMouseDownLeftResize);

    return () => {
      resizerTop.removeEventListener("mousedown", onMouseDownTopResize);
      resizerRight.removeEventListener("mousedown", onMouseDownRightResize);
      resizerBottom.removeEventListener("mousedown", onMouseDownBottomResize);
      resizerLeft.removeEventListener("mousedown", onMouseDownLeftResize);
    };
  }, []);

  // resize Event calender
  const eventRef = useRef(null);
  const eventRefLeft = useRef(null);
  const eventRefRight = useRef(null);
  const eventRefBottom = useRef(null);
  useEffect(() => {
    const resizeableEle = eventRef.current;
    const styles = window.getComputedStyle(resizeableEle);
    let width = parseInt(styles.width, 10);
    let height = parseInt(styles.height, 10);
    let x = 0;
    let y = 0;

    // Right resize
    const onMouseMoveRightResize = (event) => {
      const dx = event.clientX - x;
      x = event.clientX;
      if ((width + dx) < 500) {
        width = 500;
      } else {
        width = width + dx;
      }
      resizeableEle.style.width = `${width}px`;
      resizeableEle.style.flex = `0 0 ${width}px`;
    };

    const onMouseUpRightResize = (event) => {
      document.removeEventListener("mousemove", onMouseMoveRightResize);
    };

    const onMouseDownRightResize = (event) => {
      x = event.clientX;
      resizeableEle.style.left = styles.left;
      resizeableEle.style.right = null;
      document.addEventListener("mousemove", onMouseMoveRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
    };

    // Bottom resize
    const onMouseMoveBottomResize = (event) => {
      const dy = event.clientY - y;
      height = height + dy;
      y = event.clientY;
      let calenderMainWrap = document.querySelector("#notesListId .MuiPaper-elevation");
      let eventTableCell = document.querySelectorAll("#notesListId .Cell-cell.MuiTableCell-body");
      let eventModule = document.querySelectorAll("#notesListId .css-ljfojm > div");
      for (var i = 0; i < eventTableCell.length; i++) {
        eventTableCell[i].style.height = `${height / 8.5}px`;
        console.log(eventModule);
      }
      for (var modl = 0; modl < eventModule.length; modl++) {
        eventModule[modl].style.top = `${height / 10}px`;
        console.log(eventModule);
      }
      // eventModule.style.top = `${height / 7.5625}px`;
      calenderMainWrap.style.height = `${height}px`;
      resizeableEle.style.height = `${height}px`;
    };

    const onMouseUpBottomResize = (event) => {
      document.removeEventListener("mousemove", onMouseMoveBottomResize);
    };

    const onMouseDownBottomResize = (event) => {
      y = event.clientY;
      const styles = window.getComputedStyle(resizeableEle);
      resizeableEle.style.top = styles.top;
      resizeableEle.style.bottom = null;
      document.addEventListener("mousemove", onMouseMoveBottomResize);
      document.addEventListener("mouseup", onMouseUpBottomResize);
    };

    // Left resize
    const onMouseMoveLeftResize = (event) => {
      const dx = event.clientX - x;
      x = event.clientX;
      if ((width - dx) < 500) {
        width = 500;
      } else {
        width = width - dx;
      }
      resizeableEle.style.width = `${width}px`;
      resizeableEle.style.flex = `0 0 ${width}px`;
    };

    const onMouseUpLeftResize = (event) => {
      document.removeEventListener("mousemove", onMouseMoveLeftResize);
    };

    const onMouseDownLeftResize = (event) => {
      x = event.clientX;
      resizeableEle.style.right = styles.right;
      resizeableEle.style.left = null;
      document.addEventListener("mousemove", onMouseMoveLeftResize);
      document.addEventListener("mouseup", onMouseUpLeftResize);
    };

    // Add mouse down event listener
    const resizerRight = eventRefRight.current;
    resizerRight.addEventListener("mousedown", onMouseDownRightResize);
    const resizerBottom = eventRefBottom.current;
    resizerBottom.addEventListener("mousedown", onMouseDownBottomResize);
    const resizerLeft = eventRefLeft.current;
    resizerLeft.addEventListener("mousedown", onMouseDownLeftResize);

    return () => {
      resizerRight.removeEventListener("mousedown", onMouseDownRightResize);
      resizerBottom.removeEventListener("mousedown", onMouseDownBottomResize);
      resizerLeft.removeEventListener("mousedown", onMouseDownLeftResize);
    };
  }, []);
  // const getStyle = document.getElementById("taskListId").getAttribute("style");
  useEffect(() => {
    getDrag();
  }, []);

  // Post Slidebar
  const createDrag = (data) => {
    return fetch(`${API}/api/create-drag`, {
      method: "POST",
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("create-drag", json[0].data_content.note);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // get Taskbar
  const getDrag = (data) => {
    return fetch(`${API}/api/get-drag`, {
      method: "POST",
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("get-drag.data_content", json[0].data_content.note);
        setStyle(json[0].data_content.note);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="main-body">
      <div className="sidebar">
        <div className="notesList" id="notesListId" ref={eventRef} style={style2}>
          <div className="dragable-header"
            ref={dragEl2}
            onPointerDown={eventHandlePointerDown}
            onPointerMove={eventHandlePointerMove}
            onPointerUp={eventHandlePointerUp}
          >
            <h4><Trans>Kalender</Trans></h4>
          </div>
          <div className="resizeable-body">
            <div ref={eventRefLeft} className="resizer resizer-l"></div>
            <Demo />
            <div ref={eventRefRight} className="resizer resizer-r"></div>
          </div>
          <div ref={eventRefBottom} className="resizer resizer-b"></div>
        </div>
        {/* task list card */}
        <div className="taskList" id="taskListId" ref={taskRef} style={style}>
          <div ref={taskRefTop} className="resizer resizer-t"></div>
          <div className="dragable-header"
            ref={dragEl}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            <h4><Trans>Aufgaben</Trans></h4>
          </div>
          <div className="resizeable-body">
            <div ref={taskRefLeft} className="resizer resizer-l"></div>
            <TaskList />
            <div ref={taskRefRight} className="resizer resizer-r"></div>
          </div>
          <div ref={taskRefBottom} className="resizer resizer-b"></div>
        </div>
      </div>
    </div>
  );
}

export default ManagementSystem;