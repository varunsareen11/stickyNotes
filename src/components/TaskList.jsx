import React, { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
const API = "http://54.87.14.216";

function TaskList() {

    const [inputVal, setinputVal] = useState("");
    const [taskListInput, setTaskListInput] = useState("");
    const [Items, setItems] = useState([]);
    // for edit todo
    const [todoEditing, setTodoEditing] = React.useState(null);
    const [editingText, setEditingText] = React.useState("");
    
    const ListWrap = (e) => {
        setinputVal(e.target.value);
        console.log("inputVal", inputVal);
        setTaskListInput(e.target.value);
    };
    const listofItems = (e) => {
      if(inputVal !== ""){
        e.preventDefault();
        setItems((oldItems) => {
            return [...oldItems, taskListInput];
        });
        const getTaskVal = {title: taskListInput};
        createSlidebar(getTaskVal);
        console.log("getTaskVal", getTaskVal);
        getSidebar();
      }
      setinputVal("");
    };
    
    useEffect(()=>{
        getSidebar();
    }, [])
    // Post Slidebar
    const createSlidebar = (data) => {
        return fetch(`${API}/api/create-sidebar`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((json) => {
            // console.log("json", json);
          })
          .catch((err) => {
            console.log(err);
          });
      };


    //   get Slidebar
    const getSidebar = (data) => {
        return fetch(`${API}/api/get-sidebar`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((json) => {
            console.log("json sidebar", json);
            let reverseTaskList = json.reverse();
            setItems(reverseTaskList);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      const deleteList = (id) => {
        setItems((oldItems) => {
          return oldItems.filter((arrayElem, index) => {
            return arrayElem._id !== id ; 
          });
      });
      };
      const submitEdits = (id, e) => {
        setItems((oldItems) => {
          return oldItems.map((arrayElemNew) => {
            if (arrayElemNew._id === id) {
              arrayElemNew.title = editingText;
            }
            return arrayElemNew;
          })
        })
        // setItems(updatedTodos);
        setTodoEditing(null);
      }
    return (
        <div className="taskListWrap">
            <div className="tackListInpuArea">
                <input
                    type="text"
                    placeholder="Add a List"
                    onChange={ListWrap}
                    value={inputVal}
                />
                <button onClick={listofItems}>+</button>
            </div>
            <ul className="tackListUl">
                {/* <li className="tackListTask">Send Follow up notes for the meeting</li> */}
                {Items.map((curelem,index) => {
                    return (
                        <li className="tackListTask" key={index} id={curelem._id}>
                          {
                            curelem._id === todoEditing ?
                            (<input type="text" onChange={(e) => setEditingText(e.target.value)} placeholder="Edit task list"/>)
                            :
                            (<span onClick={() => setTodoEditing(curelem._id)}>{curelem.title}</span>)
                          }
                          {
                            curelem._id === todoEditing ?
                            (<CheckIcon className="checkIcon" color="action" onClick={() => submitEdits(curelem._id)} />) :
                            (<DeleteIcon className="deleteIcon" color="action" onClick={(e) => {deleteList(curelem._id)}} />)
                          }
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default TaskList;
