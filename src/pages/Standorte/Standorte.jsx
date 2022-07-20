
import React, { useState, useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
import TaskList from "../../components/TaskList";
import { Trans } from "react-i18next";
import Demo from "../../components/demo";
import "./style.css";
import ListIcon from '@mui/icons-material/List';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import colors from "../../demo-data/ChangeColor";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const API = "http://54.87.14.216";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0",
  top: 0,
  left: 0
};

function ManagementSystem({ isTaskModule, taskModule, isEventModule, eventCalenderModule, modulefixed }) {
  const user = JSON.parse(localStorage.getItem("user-info"));
  const parent = document.querySelector('body');
  const parentRect = parent.getBoundingClientRect();
  const token = user?.token;
  const [loading, setLoading] = useState(false);
  const [dragItem, setDragItem] = useState();

  const [ctmStyle, setCtmStyle] = useState({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    background: "#f0f0f0",
    top: 0,
    left: 0,
    width: 0,
    height: 0
  });
  const [taskSize, setTaskSize] = useState({
    width: "",
    height: "",
  });
  const [taskPosition, setTaskPosition] = useState({
    x: 0,
    y: 0,
  });
  const [calenderSize, setCalenderSize] = useState({
    width: "",
    height: "",
  });
  const [Calenderposition, setCalenderPosition] = useState({
    x: 0,
    y: 0,
  });
  let calenderMainWrap = document.querySelector("#notesListId .MuiPaper-elevation");
  let eventTableCell = document.querySelectorAll("#notesListId .Cell-cell.MuiTableCell-body");
  let eventModule = document.querySelectorAll("#notesListId .css-ljfojm > div");

  const getDrag = (data) => {
    setLoading(true);
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
      .then((resp) => {
        console.log("get-drag", resp[0]?.data);
        setDragItem(resp[0]);
        if (resp[0]?.data) {
          const { calendar, note } = JSON.parse(resp[0].data) || {};
          setCalenderSize({
            width: calendar.width,
            height: calendar.height,
          });
          setCalenderPosition({
            x: calendar.top,
            y: calendar.left,
          });
          setTaskSize({
            width: note.width,
            height: note.height,
          });
          setTaskPosition({
            x: note.top,
            y: note.left,
          });
          let calenderMainWrap = document.querySelector("#notesListId .MuiPaper-elevation");
          let eventTableCell = document.querySelectorAll("#notesListId .Cell-cell.MuiTableCell-body");
          let eventModule = document.querySelectorAll("#notesListId .css-ljfojm > div");
          calenderMainWrap.style.height = `${parseInt(calendar.height) - 50}px`;
          for (var i = 0; i < eventTableCell.length; i++) {
            eventTableCell[i].style.height = `${(parseInt(calendar.height) - 100) / 7.5}px`;
          }
          for (var modl = 0; modl < eventModule.length; modl++) {
            eventModule[modl].style.height = `${(parseInt(calendar.height) - 100) / 14}px`;
            // eventModule[modl].style.top = `${parseInt(calendar.height) / 10}px`;
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getDrag();
  }, []);

  const createUpdateDrag = (data) => {
    if (dragItem?._id) {
      return fetch(`${API}/api/update-drag/${dragItem?._id}`, {
        method: "PUT",
        headers: {
          "x-access-token": token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: data }),
      })
        .then((res) => res.json())
        .then((resp) => {
          console.log("create-drag", resp);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return fetch(`${API}/api/create-drag`, {
        method: "POST",
        headers: {
          "x-access-token": token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: data }),
      })
        .then((res) => res.json())
        .then((resp) => {
          console.log("create-drag", resp);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  // change color
  const [colorClass, setColorClass] = useState(colors[0].id);
  const [colorName, setColorName] = useState("Red");
  const [colorClassTaskbar] = useState(colors);
  const listTitles = colorClassTaskbar.map((item) => (
    <li onClick={() => {
      setColorClass(item.id)
      setModuleBox(false)
      setColorName(item.color)
    }} className={`${item.color} ${colorClass === item.id ? "tab-title tab-title--active" : "tab-title"}`}>{item.color}</li>
  ));
  const [colorCalenderClass, setColorCalenderClass] = useState(colors[0].id);
  const [colorCalenderName, setColorCalenderName] = useState("Red");
  const [colorCalenderClassTaskbar] = useState(colors);
  const listCalenderTitles = colorCalenderClassTaskbar.map((item) => (
    <li onClick={() => {
      setColorCalenderClass(item.id)
      setCalenderModuleBox(false)
      setColorCalenderName(item.color)
    }} className={`${item.color} ${colorCalenderClass === item.id ? "tab-title tab-title--active" : "tab-title"}`}>{item.color}</li>
  ));
  const [formOpen, setFormOpen] = useState(false);
  const [moduleBox, setModuleBox] = useState(false);
  const [colorBox, setColorBox] = useState(false);
  const [calenderModuleBox, setCalenderModuleBox] = useState(false);
  const [colorCalenderBox, setColorCalenderBox] = useState(false);
  const dropDownCont = useRef(null);
  const handleClickOutside = event => {
    if (dropDownCont.current && !dropDownCont.current.contains(event.target)) {
      setModuleBox(false);
      setColorBox(false)
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  // openColorBox
  const openCalenderColorBox = (e) => {
    setColorCalenderBox(!colorCalenderBox);
  }

  // hideModuleBox
  const hideCalenderModuleBox = (e) => {
    isEventModule(false);
  }

  // openColorBox
  const openColorBox = (e) => {
    setColorBox(!colorBox);
  }

  // hideModuleBox
  const hideModuleBox = (e) => {
    isTaskModule(false);
  }
  return (
    <>
      <div className="main-body">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="sidebar">
            <div className={`notesList ${eventCalenderModule === false ? "moduleRemove" : ""}`} id="notesListId">
              <Rnd
                style={style}
                size={{
                  width: calenderSize.width,
                  height: calenderSize.height,
                }}
                position={{ x: Calenderposition.x, y: Calenderposition.y }}
                onDragStop={(e, d) => {
                  if ((e.clientX + 100 >= e.target.offsetWidth) && (e.clientX <= parentRect.right - 100 && modulefixed === false)) {
                    // setCtmStyle({
                    //   ...ctmStyle,
                    //   top: d.y.toString() + "px",
                    //   left: d.x.toString() + "px"
                    // })
                    setCalenderPosition({ x: d.x, y: d.y });
                    createUpdateDrag({
                      calendar: {
                        width: calenderSize.width,
                        height: calenderSize.height,
                        top: d.x.toString(),
                        left: d.y.toString(),
                      },
                      note: {
                        width: taskSize.width,
                        height: taskSize.height,
                        top: taskPosition.x.toString(),
                        left: taskPosition.y.toString(),
                      },
                    });
                  }
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                  if (modulefixed === false) {
                    for (var i = 0; i < eventTableCell.length; i++) {
                      eventTableCell[i].style.height = `${(parseInt(ref.style.height) - 100) / 7.5}px`;
                    }
                    for (var modl = 0; modl < eventModule.length; modl++) {
                      eventModule[modl].style.height = `${(parseInt(ref.style.height) - 100) / 14}px`;
                      // eventModule[modl].style.top = `${parseInt(ref.style.height) / 10}px`;
                    }
                    calenderMainWrap.style.height = `${parseInt(ref.style.height) - 50}px`;
                    setCalenderSize({
                      width: ref.style.width,
                      height: ref.style.height,
                      // ...calenderSize,
                    });
                    createUpdateDrag({
                      calendar: {
                        width: ref.style.width,
                        height: ref.style.height,
                        top: Calenderposition.x.toString(),
                        left: Calenderposition.y.toString(),
                      },
                      note: {
                        width: taskSize.width,
                        height: taskSize.height,
                        top: taskPosition.x.toString(),
                        left: taskPosition.y.toString(),
                      },
                    });
                  }
                }}
              >
                <div className={`dragable-header ${colorCalenderName}`}>
                  <h4>
                    <Trans>Kalender</Trans>
                  </h4>
                  <div className="moduleDropown" ref={dropDownCont}>
                    <ListIcon className="dropIcon" color="action" onClick={() => setCalenderModuleBox(!calenderModuleBox)} />
                    <div className={`openDrop ${calenderModuleBox ? "show" : ""}`}>
                      <ul className="openDropList">
                        <li onClick={(e) => openCalenderColorBox()} ref={dropDownCont}>
                          <ColorLensIcon className="color-lens" color="action" />
                          <span className="drop-text">Farbe andern</span>
                          <ChevronRightIcon className="angle-right" color="action" />

                          <div className={`colorList ${colorCalenderBox ? "show" : ""}`}>
                            {listCalenderTitles}
                          </div>
                        </li>
                        <li onClick={(e) => hideCalenderModuleBox(e)}>
                          <CancelPresentationIcon className="cancel-board" color="action" />
                          <span className="drop-text">Auf Bord schließen</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* <select value={colorClass} onChange={e => setColorClass(e.target.value)} style={{ backgroundColor: colorClass }}>
                    {Object.entries(colorsClass).map(([name, value]) => (
                      <option key={`color--${name}`} value={value} style={{ backgroundColor: value }}></option>
                    ))}
                  </select> */}
                </div>
                <div className="resizeable-body">
                  <Demo formOpen={formOpen} setFormState={setFormOpen} />
                </div>
              </Rnd>
            </div>
            <div className={`taskList ${taskModule === false ? "moduleRemove" : ""}`}>
              <Rnd
                style={style}
                size={{ width: taskSize.width, height: taskSize.height }}
                position={{ x: taskPosition.x, y: taskPosition.y }}
                onDragStop={(e, d) => {
                  if ((e.clientX + 100 >= e.target.offsetWidth) && (e.clientX <= parentRect.right - 100 && modulefixed === false)) {
                    setTaskPosition({ x: d.x, y: d.y });
                    createUpdateDrag({
                      calendar: {
                        width: calenderSize.width,
                        height: calenderSize.height,
                        top: Calenderposition.x.toString(),
                        left: Calenderposition.y.toString(),
                      },
                      note: {
                        width: taskSize.width,
                        height: taskSize.height,
                        top: d.x.toString(),
                        left: d.y.toString(),
                      },
                    });
                  }
                }}
                onResizeStop={(e, direction, ref, delta, position) => {

                  if (modulefixed === false) {
                    setTaskSize({
                      width: ref.style.width,
                      height: ref.style.height,
                      // ...taskSize,
                    });
                    createUpdateDrag({
                      calendar: {
                        width: calenderSize.width,
                        height: calenderSize.height,
                        top: Calenderposition.x.toString(),
                        left: Calenderposition.y.toString(),
                      },
                      note: {
                        width: ref.style.width,
                        height: ref.style.height,
                        top: taskPosition.x.toString(),
                        left: taskPosition.y.toString(),
                      },
                    });
                  }
                }}
              >
                <div className={`dragable-header ${colorName}`}>
                  <h4>
                    <Trans>Aufgaben</Trans>
                  </h4>
                  <div className="moduleDropown" ref={dropDownCont}>
                    <ListIcon className="dropIcon" color="action" onClick={() => setModuleBox(!moduleBox)} />
                    <div className={`openDrop ${moduleBox ? "show" : ""}`}>
                      <ul className="openDropList">
                        <li onClick={(e) => openColorBox()} ref={dropDownCont}>
                          <ColorLensIcon className="color-lens" color="action" />
                          <span className="drop-text">Farbe andern</span>
                          <ChevronRightIcon className="angle-right" color="action" />

                          <div className={`colorList ${colorBox ? "show" : ""}`}>
                            {listTitles}
                          </div>
                        </li>
                        <li onClick={(e) => hideModuleBox(e)}>
                          <CancelPresentationIcon className="cancel-board" color="action" />
                          <span className="drop-text">Auf Bord schließen</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="resizeable-body">
                  <TaskList formOpen={formOpen} setFormState={setFormOpen} />
                </div>
              </Rnd>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ManagementSystem;