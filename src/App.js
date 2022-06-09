import React, { useState } from "react";
import Header from "./shared/Header/Header";
import Sidebar from "./shared/Sidebar/Sidebar";
import ManagementSystem from "./pages/ManagementSystem/ManagementSystem";

const App = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <div className="app">
        <div className="main-wrapper">
          <div className={`main-aside ${isActive ? "main-aside-active" : ""}`}>
            <Sidebar />
          </div>
          <div className="main-content">
            <Header clickfunc={() => setIsActive(!isActive)} addClass={isActive ? "remove-icon" : ""} />
            <ManagementSystem />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
