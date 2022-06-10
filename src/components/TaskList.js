import React, { useState, useEffect } from "react";
const API = "http://54.87.14.216";

function TaskList() {

    const [inputVal, setinputVal] = useState("");
    const [taskListInput, setTaskListInput] = useState("");
    const [Items, setItems] = useState([]);
    const ListWrap = (e) => {
        setinputVal(e.target.value);
        setTaskListInput(e.target.value);
    };
    const listofItems = (e) => {
        e.preventDefault();
        const getTaskVal = {title: taskListInput};
        createSlidebar(getTaskVal);
        setItems((oldItems) => {
            return [...oldItems, inputVal];
        });
        
        setinputVal("");
        getSidebar();
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
            console.log("json", json);
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
            setItems(json);
          })
          .catch((err) => {
            console.log(err);
          });
      };
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
                {Items.map((curelem, index) => {
                    console.log(curelem);
                    return (
                        <li className="tackListTask" key={curelem._id}>
                            {curelem.title}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default TaskList;
