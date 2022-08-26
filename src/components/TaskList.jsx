import React, { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useTranslation, Trans } from "react-i18next";
import { useSelector } from "react-redux";
import "./style.css";
const API = "http://54.87.14.216";

function TaskList({ setFormState }) {
  const { t, i18n } = useTranslation();
  const user = JSON.parse(localStorage.getItem("user-info"));
  const token = user?.token;
  const [inputVal, setinputVal] = useState("");
  const [taskListInput, setTaskListInput] = useState("");
  const [Items, setItems] = useState([]);
  const [checkedSidebar, setCheckedSidebar] = useState([]);
  // for edit todo
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");
  const selectedLocationId = useSelector((state) => state.locationIdReducer);

  const ListWrap = (e) => {
    setinputVal(e.target.value);
    setTaskListInput(e.target.value);
  };
  const listofItems = (e) => {
    if (inputVal !== "") {
      e.preventDefault();
      // setItems((oldItems) => {
      //   return [...oldItems, taskListInput];
      // });
      const getTaskVal = { title: taskListInput, location: selectedLocationId };
      createSlidebar(getTaskVal);
    }
    setinputVal("");
  };

  useEffect(() => {
    getSidebar();
    getCheckedSidebar();
  }, [selectedLocationId])
  // Post Slidebar
  const createSlidebar = (data) => {
    return fetch(`${API}/api/create-sidebar`, {
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
        // console.log("json", json);
        getSidebar();
        getCheckedSidebar();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  // Delete TaskBar using API
  async function deleteList(id) {
    let result = await fetch(`${API}/api/delete-sidebar/${id}`, {
      method: "DELETE",
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    getSidebar();
    getCheckedSidebar();
  }


  //   get Slidebar
  const getSidebar = (data) => {
    return fetch(`${API}/api/get-sidebar/${selectedLocationId}`, {
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
        let reverseTaskList = json?.reverse();
        setItems(reverseTaskList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Update Taskbar data
  const updateSidebar = (id, data) => {
    return fetch(`${API}/api/update-sidebar/${id}`, {
      method: "PUT",
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        // console.log("json", json);
        getSidebar();
        getCheckedSidebar();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // Update Taskbar data
  const getCheckedSidebar = (data) => {
    return fetch(`${API}/api/get-checked-sidebar/${selectedLocationId}`, {
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
        let reverseTaskList = json?.reverse();
        setCheckedSidebar(reverseTaskList);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const submitEdits = (id, e) => {
    const getTaskVal = { title: editingText };
    setItems((oldItems) => {
      return oldItems.map((arrayElemNew) => {
        if (arrayElemNew._id === id) {
          arrayElemNew.title = editingText;
        }
        return arrayElemNew;
      })
    })
    updateSidebar(id, getTaskVal);
    // setItems(updatedTodos);
    setTodoEditing(null);
  }
  const completedTask = (taskCheck, e) => {
    console.log(e);
    if (e.target.checked === true) {
      updateSidebar(taskCheck._id, {
        checked: true,
        title: taskCheck.title
      });
      console.log("it is working")
    }
    setTimeout(() => {
      e.target.checked = false;
      console.log(e);
    }, 1500);
    // chekedStatus = false;
    getSidebar();
    getCheckedSidebar();
  }
  return (
    <div className="taskListWrap">
      <div className="tackListInpuArea">
        <input
          type="text"
          placeholder="Aufgabe hinzufügen"
          onChange={ListWrap}
          value={inputVal}
        />
        <button onClick={listofItems}>+</button>
      </div>
      <ul className="tackListUl">
        {/* <li className="tackListTask">Send Follow up notes for the meeting</li> */}
        {Items.map((curelem, index) => {
          return (
            <li className="tackListTask" key={index} id={curelem._id}>
              {
                curelem._id === todoEditing ?
                  (<input type="text" value={editingText} onChange={(e) => setEditingText(e.target.value)} placeholder="Edit task list" />)
                  :
                  (<div className="ctm-checkbox-tasklist">
                    <label className="ctm-checkbox-cont" onClick={(e) => completedTask(curelem, e)}>
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                    <span onClick={() => setTodoEditing(curelem._id)}>{curelem.title}</span>
                  </div>)
              }
              {
                curelem._id === todoEditing ?
                  (<CheckIcon className="checkIcon" color="action" onClick={() => submitEdits(curelem._id)} />) :
                  (<div className="taskbar_icons"><AccessTimeIcon className="access-timeIcon" color="action" onClick={() => setFormState(true)} /> <DeleteIcon className="deleteIcon" color="action" onClick={(e) => { deleteList(curelem._id) }} /> </div>)
              }
            </li>
          );
        })}
      </ul>
      <ul className="tackListUl taskCompleted">
        <li className="listCompleted"><Trans>completedTask</Trans></li>
        {checkedSidebar.map((getMap) => {
          return (
            <li className="tackListTask" key={getMap._id}>
              <CheckCircleOutlineIcon className="checkIcon" color="action" /> {getMap.title}
            </li>
          )
        })}
        {/* <li className="tackListTask">Send Follow up notes for the meeting</li> */}
      </ul>
    </div>
  );
}

export default TaskList;
