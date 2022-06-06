import React, { useState } from "react";

function TaskList() {

    const [inputVal, setinputVal] = useState();
    const [Items, setItems] = useState([]);
    const ListWrap = (e) => {
        setinputVal(e.target.value);
    };
    const listofItems = () => {
        setItems((oldItems) => {
            return [...oldItems, inputVal];
        });
        setinputVal("");
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
                        <li className="tackListTask" key={index}>
                            {curelem}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default TaskList;
