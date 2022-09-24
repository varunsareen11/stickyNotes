
import React, { useState, useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
import TaskList from "../../components/TaskList";
import Demo from "../../components/demo";
import "./style.css";
import ListIcon from '@mui/icons-material/List';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import DocumentManagentment from "../DocumentManagentment/DocumentManagentment";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddCategory from "../DocumentManagentment/AddCategory";
import AddPlanCategory from "../Plans/AddPlanCategory";
import Plans from "../Plans/Plans";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import colors from "../../demo-data/ChangeColor";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useSelector, useDispatch } from "react-redux";
import DocumentModal from '../../modal/DocumentModal/DocumentModal';
import CloseIcon from '@mui/icons-material/Close';
import { getLocation } from "../../Redux/Action/Action";

const API = "http://54.87.14.216/api";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0",
  top: 0,
  left: 0
};

function ManagementSystem({ isTaskModule, taskModule, isEventModule, eventCalenderModule, isPlanModule, isDocumentModule, eventDocumentModule, eventPlanModule, modulefixed }) {
  const user = JSON.parse(localStorage.getItem("user-info"));
  const parent = document.querySelector('body');
  const parentRect = parent.getBoundingClientRect();
  const token = user?.token;
  const [loading, setLoading] = useState(false);
  const [dragItem, setDragItem] = useState();
  const selectedLocationId = useSelector((state) => state.locationIdReducer);
  // Document List
  const [categoryList, setCategoryList] = useState(false);
  const [addDocument, setAddDocument] = useState(false);
  const [editDocumentBox, setEditDocumentBox] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  // Plan list
  const [activePlanSearch, setActivePlanSearch] = useState(false);
  const [searchPlanLocation, setSearchPlanLocation] = useState("");
  const [categoryPlanList, setCategoryPlanList] = useState(false);
  const [addPlanDocument, setAddPlanDocument] = useState(false);
  const [editPlanDocumentBox, setEditPlanDocumentBox] = useState(false);
  const dispatch = useDispatch();
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

  // module States
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
  const [documentUploadSize, setDocumentUploadSize] = useState({
    width: "",
    height: "",
  });
  const [documentUploadposition, setDocumentUploadPosition] = useState({
    x: 0,
    y: 0,
  });
  const [planSize, setPlanSize] = useState({
    width: "",
    height: "",
  });
  const [planposition, setPlanPosition] = useState({
    x: 0,
    y: 0,
  });
  let calenderMainWrap = document.querySelector("#notesListId .MuiPaper-elevation");
  let eventTableCell = document.querySelectorAll("#notesListId .Cell-cell.MuiTableCell-body");
  let eventModule = document.querySelectorAll("#notesListId .css-ljfojm > div");

  useEffect(() => {
    getDrag();
    getLocationData();
    categoryPlanListAPI();
    categoryListAPI();
  }, [selectedLocationId]);

  // get Category
  const categoryListAPI = (data) => {
    return fetch(`${API}/get-category`, {
      method: "POST",
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => (res.json()))
      .then((json) => {
        console.log(json)
        // setCategory(json);
      })
  }
  const categoryPlanListAPI = (data) => {
    return fetch(`${API}/get-plan-category`, {
      method: "POST",
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => (res.json()))
      .then((json) => {
        console.log(json)
        // setCategory(json);
      })
  }

  // change color taskbar
  const [colorClass, setColorClass] = useState(colors[0].id);
  const [colorName, setColorName] = useState("Red");
  const [colorClassTaskbar] = useState(colors);
  const listTitles = colorClassTaskbar.map((item, index) => (
    <li key={index} onClick={() => {
      setColorClass(item.id)
      setModuleBox(false)
      setColorName(item.color)
    }} className={`${item.color} ${colorClass === item.id ? "tab-title tab-title--active" : "tab-title"}`}>{item.color}</li>
  ));

  // change color calender
  const [colorCalenderClass, setColorCalenderClass] = useState(colors[0].id);
  const [colorCalenderName, setColorCalenderName] = useState("Red");
  const [colorCalenderClassTaskbar] = useState(colors);
  const listCalenderTitles = colorCalenderClassTaskbar.map((item, index) => (
    <li key={index} onClick={() => {
      setColorCalenderClass(item.id)
      setCalenderModuleBox(false)
      setColorCalenderName(item.color)
    }} className={`${item.color} ${colorCalenderClass === item.id ? "tab-title tab-title--active" : "tab-title"}`}>{item.color}</li>
  ));
  // change color documentUpload
  const [colorDocumentUploadClass, setColorDocumentUploadClass] = useState(colors[0].id);
  const [colorDocumentUploadName, setColorDocumentUploadName] = useState("Red");
  const [colorDocumentUploadClassTaskbar] = useState(colors);
  const listDocumentUploadTitles = colorDocumentUploadClassTaskbar.map((item, index) => (
    <li key={index} onClick={() => {
      setColorDocumentUploadClass(item.id)
      setDocumentUploadModuleBox(false)
      setColorDocumentUploadName(item.color)
    }} className={`${item.color} ${colorDocumentUploadClass === item.id ? "tab-title tab-title--active" : "tab-title"}`}>{item.color}</li>
  ));
  // change color Plan Module
  const [colorPlanClass, setColorPlanClass] = useState(colors[0].id);
  const [colorPlanName, setColorPlanName] = useState("Red");
  const [colorPlanClassTaskbar] = useState(colors);
  const listPlanTitles = colorPlanClassTaskbar.map((item, index) => (
    <li key={index} onClick={() => {
      setColorPlanClass(item.id)
      setPlanModuleBox(false)
      setColorPlanName(item.color)
    }} className={`${item.color} ${colorPlanClass === item.id ? "tab-title tab-title--active" : "tab-title"}`}>{item.color}</li>
  ));

  // Submit form on taskbar
  const [formOpen, setFormOpen] = useState(false);
  const [moduleBox, setModuleBox] = useState(false);
  const [colorBox, setColorBox] = useState(false);
  const [calenderModuleBox, setCalenderModuleBox] = useState(false);
  const [colorCalenderBox, setColorCalenderBox] = useState(false);
  const [documentUploadModuleBox, setDocumentUploadModuleBox] = useState(false);
  const [colorDocumentUploadBox, setColorDocumentUploadBox] = useState(false);
  const [planModuleBox, setPlanModuleBox] = useState(false);
  const [colorPlanBox, setColorPlanBox] = useState(false);
  const dropDownCont = useRef(null);
  const handleClickOutside = event => {
    if (dropDownCont.current && !dropDownCont.current.contains(event.target)) {
      // setModuleBox(false);
      // setColorBox(false)
      setDocumentUploadModuleBox(false)
      setColorDocumentUploadBox(false);
      // setPlanModuleBox(false)
      // setColorPlanBox(false);
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

  // openColorBox
  const openColorBox = (e) => {
    setColorBox(!colorBox);
  }

  // ================================================= API's =========================================================


  // get API
  const getDrag = (data) => {
    setLoading(true);
    return fetch(`${API}/get-drag/${selectedLocationId}`, {
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
        setDragItem(resp[0]);
        if (resp[0]?.data) {
          const { calendar, note, document, plan } = JSON.parse(resp[0].data) || {};
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
          setDocumentUploadSize({
            width: document.width,
            height: document.height,
          });
          setDocumentUploadPosition({
            x: document.top,
            y: document.left,
          });
          setPlanSize({
            width: plan.width,
            height: plan.height,
          });
          setPlanPosition({
            x: plan.top,
            y: plan.left,
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

  // Create and Update Drag API
  const createUpdateDrag = (data) => {
    if (dragItem?._id) {
      return fetch(`${API}/update-drag/${dragItem?._id}`, {
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
          // console.log("create-drag", resp);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return fetch(`${API}/create-drag`, {
        method: "POST",
        headers: {
          "x-access-token": token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: data, "location": selectedLocationId }),
      })
        .then((res) => res.json())
        .then((resp) => {
          // console.log("create-drag", resp);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // Get locaiton API
  const getLocationData = (data) => {
    return fetch(`${API}/get-location-data`, {
      method: "GET",
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res?.json())
      .then((json) => {
        dispatch(getLocation(json));
      })
      .catch((err) => {
        console.log("getLocationData", err);
      });
  };
  return (
    <>
      <div className="main-body">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="sidebar">

            {/* Calender Module */}
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
                      document: {
                        width: documentUploadSize.width,
                        height: documentUploadSize.height,
                        top: documentUploadposition.x.toString(),
                        left: documentUploadposition.y.toString(),
                      },
                      plan: {
                        width: planSize.width,
                        height: planSize.height,
                        top: planposition.x.toString(),
                        left: planposition.y.toString(),
                      }
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
                      document: {
                        width: documentUploadSize.width,
                        height: documentUploadSize.height,
                        top: documentUploadposition.x.toString(),
                        left: documentUploadposition.y.toString(),
                      },
                      plan: {
                        width: planSize.width,
                        height: planSize.height,
                        top: planposition.x.toString(),
                        left: planposition.y.toString(),
                      }
                    });
                  }
                }}
              >
                <div className={`dragable-header ${colorCalenderName}`}>
                  <h4>
                    Kalender
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
                        <li onClick={(e) => { isEventModule(false) }}>
                          <CancelPresentationIcon className="cancel-board" color="action" />
                          <span className="drop-text">Auf Bord schließen</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="resizeable-body">
                  <Demo formOpen={formOpen} setFormState={setFormOpen} />
                </div>
              </Rnd>
            </div>

            {/* Taskbar  */}
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
                      document: {
                        width: documentUploadSize.width,
                        height: documentUploadSize.height,
                        top: documentUploadposition.x.toString(),
                        left: documentUploadposition.y.toString(),
                      },
                      plan: {
                        width: planSize.width,
                        height: planSize.height,
                        top: planposition.x.toString(),
                        left: planposition.y.toString(),
                      }
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
                      document: {
                        width: documentUploadSize.width,
                        height: documentUploadSize.height,
                        top: documentUploadposition.x.toString(),
                        left: documentUploadposition.y.toString(),
                      },
                      plan: {
                        width: planSize.width,
                        height: planSize.height,
                        top: planposition.x.toString(),
                        left: planposition.y.toString(),
                      }
                    });
                  }
                }}
              >
                <div className={`dragable-header ${colorName}`}>
                  <h4>
                    Aufgaben
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
                        <li onClick={(e) => { isTaskModule(false) }}>
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

            {/* Plan Module */}
            <div className={`documentUploadList ${eventPlanModule === false ? "moduleRemove" : ""} ${editPlanDocumentBox ? "docUploadReset" : ""} ${categoryPlanList ? "docUploadReset" : ""} ${addPlanDocument ? "docUploadReset" : ""}`}>
              <Rnd
                style={style}
                size={{
                  width: planSize.width,
                  height: planSize.height,
                }}
                position={{ x: planposition.x, y: planposition.y }}
                onDragStop={(e, d) => {
                  if ((e.clientX + 100 >= e.target.offsetWidth) && (e.clientX <= parentRect.right - 100 && modulefixed === false)) {

                    setPlanPosition({ x: d.x, y: d.y });
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
                        top: taskPosition.x.toString(),
                        left: taskPosition.y.toString(),
                      },
                      document: {
                        width: documentUploadSize.width,
                        height: documentUploadSize.height,
                        top: documentUploadposition.x.toString(),
                        left: documentUploadposition.y.toString(),
                      },
                      plan: {
                        width: planSize.width,
                        height: planSize.height,
                        top: d.x.toString(),
                        left: d.y.toString(),
                      }
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
                    }
                    calenderMainWrap.style.height = `${parseInt(ref.style.height) - 50}px`;
                    setPlanSize({
                      width: ref.style.width,
                      height: ref.style.height,
                    });
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
                        top: taskPosition.x.toString(),
                        left: taskPosition.y.toString(),
                      },
                      document: {
                        width: documentUploadSize.width,
                        height: documentUploadSize.height,
                        top: documentUploadposition.x.toString(),
                        left: documentUploadposition.y.toString(),
                      },
                      plan: {
                        width: ref.style.width,
                        height: ref.style.height,
                        top: planposition.x.toString(),
                        left: planposition.y.toString(),
                      }
                    });
                  }
                }}
              >
                <div className={`dragable-header ${colorName}`}>
                  <h4>
                    Plans
                  </h4>
                  <div className="moduleHeaderOption">
                    <button className='btn cmn_yellow_bg'
                      onClick={(e) => {
                        setTimeout(() => {
                          categoryPlanListAPI();
                        }, 500);
                        setAddPlanDocument(true);
                        setCategoryPlanList(false)
                      }}
                    >
                      <svg className="icon" aria-labelledby="Add Item">
                        <title id="addItem">Add Item</title>
                        <use
                          xlinkHref="/assets/svg-icons/icons.svg#addItem"
                          xlinkTitle="Add Item"
                        ></use>
                      </svg>

                    </button>
                    <div className={`search-btn cmn_document-icons ${activePlanSearch && "active-search "}`}>
                      <input type="text"
                        name="search-Firma"
                        id="search-Firma"
                        value={searchPlanLocation}
                        onChange={(e) => setSearchPlanLocation(e.target.value)} />
                      <svg className="icon" aria-labelledby="Search Icon" onClick={(e) => { setActivePlanSearch(!activePlanSearch) }}>
                        <title id="search">Search Icon</title>
                        <use
                          xlinkHref="/assets/svg-icons/icons.svg#search"
                          xlinkTitle="Search Icon"
                        ></use>
                      </svg>
                    </div>
                    <div className='filter-btn cmn_document-icons'>
                      <FilterAltIcon className="filterIcon" color="action" />
                    </div>
                    <div className="moduleDropown" ref={dropDownCont}>
                      <ListIcon className="dropIcon" color="action" onClick={() => setPlanModuleBox(!planModuleBox)} />
                      <div className={`openDrop ${planModuleBox ? "show" : ""}`}>
                        <ul className="openDropList">
                          <li onClick={(e) => { setColorPlanBox(!colorPlanBox) }} ref={dropDownCont}>
                            <ColorLensIcon className="color-lens" color="action" />
                            <span className="drop-text">Farbe andern</span>
                            <ChevronRightIcon className="angle-right" color="action" />

                            <div className={`colorList ${colorPlanBox ? "show" : ""}`}>
                              {listPlanTitles}
                            </div>
                          </li>
                          <li>
                            <button onClick={(e) => { setPlanModuleBox(false); setCategoryPlanList(true); setAddPlanDocument(false) }}><FormatListBulletedIcon className="listIcon" color="action" /> Plan Category</button>
                          </li>
                          <li
                            onClick={(e) => { isPlanModule(false) }}
                          >
                            <CancelPresentationIcon className="cancel-board" color="action" />
                            <span className="drop-text">Auf Bord schließen</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="resizeable-body">
                  <div style={{
                    display: "none"
                  }}>
                    <AddPlanCategory />
                  </div>
                  <Plans locPlanSearch={searchPlanLocation} catPlanList={categoryPlanList} setCatPlanList={setCategoryPlanList} addPlanDoc={addPlanDocument} setAddPlanDoc={setAddPlanDocument} editPlancat={editPlanDocumentBox} setEditPlanCat={setEditPlanDocumentBox} />
                </div>
              </Rnd>
            </div>

            {/* Document Module */}
            <div className={`documentUploadList ${eventDocumentModule === false ? "moduleRemove" : ""} ${editDocumentBox ? "docUploadReset" : ""} ${categoryList ? "docUploadReset" : ""} ${addDocument ? "docUploadReset" : ""}`}>
              <Rnd
                style={style}
                size={{
                  width: documentUploadSize.width,
                  height: documentUploadSize.height,
                }}
                position={{ x: documentUploadposition.x, y: documentUploadposition.y }}
                onDragStop={(e, d) => {
                  if ((e.clientX + 100 >= e.target.offsetWidth) && (e.clientX <= parentRect.right - 100 && modulefixed === false)) {

                    setDocumentUploadPosition({ x: d.x, y: d.y });
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
                        top: taskPosition.x.toString(),
                        left: taskPosition.y.toString(),
                      },
                      document: {
                        width: documentUploadSize.width,
                        height: documentUploadSize.height,
                        top: d.x.toString(),
                        left: d.y.toString(),
                      },
                      plan: {
                        width: planSize.width,
                        height: planSize.height,
                        top: planposition.x.toString(),
                        left: planposition.y.toString(),
                      }
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
                    }
                    calenderMainWrap.style.height = `${parseInt(ref.style.height) - 50}px`;
                    setDocumentUploadSize({
                      width: ref.style.width,
                      height: ref.style.height,
                    });
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
                        top: taskPosition.x.toString(),
                        left: taskPosition.y.toString(),
                      },
                      document: {
                        width: ref.style.width,
                        height: ref.style.height,
                        top: documentUploadposition.x.toString(),
                        left: documentUploadposition.y.toString(),
                      },
                      plan: {
                        width: planSize.width,
                        height: planSize.height,
                        top: planposition.x.toString(),
                        left: planposition.y.toString(),
                      }
                    });
                  }
                }}
              >
                <div className={`dragable-header ${colorName}`}>
                  <h4>
                    Dokumentenverwaltung
                  </h4>
                  <div className="moduleHeaderOption">
                    <button className='btn cmn_yellow_bg'
                      onClick={(e) => {
                        setTimeout(() => {
                          categoryListAPI();
                        }, 1000);
                        setAddDocument(true);
                        setCategoryList(false)
                      }}
                    >
                      <svg className="icon" aria-labelledby="Add Item">
                        <title id="addItem">Add Item</title>
                        <use
                          xlinkHref="/assets/svg-icons/icons.svg#addItem"
                          xlinkTitle="Add Item"
                        ></use>
                      </svg>

                    </button>
                    <div className={`search-btn cmn_document-icons ${activeSearch && "active-search "}`}>
                      <input type="text"
                        name="search-Firma"
                        id="search-Firma"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)} />
                      <svg className="icon" aria-labelledby="Search Icon" onClick={(e) => { setActiveSearch(!activeSearch) }}>
                        <title id="search">Search Icon</title>
                        <use
                          xlinkHref="/assets/svg-icons/icons.svg#search"
                          xlinkTitle="Search Icon"
                        ></use>
                      </svg>
                    </div>
                    <div className='filter-btn cmn_document-icons'>
                      <FilterAltIcon className="filterIcon" color="action" />
                    </div>
                    <div className="moduleDropown" ref={dropDownCont}>
                      <ListIcon className="dropIcon" color="action" onClick={() => setDocumentUploadModuleBox(!documentUploadModuleBox)} />
                      <div className={`openDrop ${documentUploadModuleBox ? "show" : ""}`}>
                        <ul className="openDropList">
                          <li onClick={(e) => { setColorDocumentUploadBox(!colorDocumentUploadBox) }} ref={dropDownCont}>
                            <ColorLensIcon className="color-lens" color="action" />
                            <span className="drop-text">Farbe andern</span>
                            <ChevronRightIcon className="angle-right" color="action" />

                            <div className={`colorList ${colorDocumentUploadBox ? "show" : ""}`}>
                              {listDocumentUploadTitles}
                            </div>
                          </li>
                          <li>
                            <button onClick={(e) => { setCategoryList(true); setAddDocument(false) }}><FormatListBulletedIcon className="listIcon" color="action" /> Category</button>
                          </li>
                          <li
                            onClick={(e) => { isDocumentModule(false) }}
                          >
                            <CancelPresentationIcon className="cancel-board" color="action" />
                            <span className="drop-text">Auf Bord schließen</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="resizeable-body">
                  <div style={{
                    display: "none"
                  }}>
                    <AddCategory />
                  </div>
                  <DocumentManagentment locSearch={searchLocation} catList={categoryList} setCatList={setCategoryList} addDoc={addDocument} setAddDoc={setAddDocument} editcat={editDocumentBox} setEditCat={setEditDocumentBox} />
                </div>
              </Rnd>
            </div>
            {/* Add Document Category */}
            {
              categoryList ? (
                <>
                  <DocumentModal
                    content={
                      <div className='cmn_modal'>
                        <CloseIcon className="closeModal" color="action"
                          onClick={(e) => { setCategoryList(false) }}
                        />
                        <AddCategory />
                      </div>
                    }
                  />
                </>
              )
                : ("")
            }

          </div>
        )}

        {/* Add Plan Category */}
        {
          categoryPlanList ? (
            <>
              <DocumentModal
                content={
                  <div className='cmn_modal'>
                    <CloseIcon className="closeModal" color="action"
                      onClick={(e) => { setCategoryPlanList(false) }}
                    />
                    <AddPlanCategory />
                  </div>
                }
              />
            </>
          ) : ("")
        }
      </div>
    </>
  );
}

export default ManagementSystem;