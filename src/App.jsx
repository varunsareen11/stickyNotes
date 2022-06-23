// https://www.postman.com/collections/02a7c7e98435c86328a5
// use baseurl : 54.87.14.216
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Header from "./shared/Header/Header";
import Sidebar from "./shared/Sidebar/Sidebar";
import ManagementSystem from "./pages/Dashboard/ManagementSystem/ManagementSystem";
import Login from "./auth/Login/Login";
import Register from "./auth/Register/Register";
import Packages from "./pages/Packages/Packages";
import { useTranslation, Trans } from "react-i18next";
// import MakePayment from "./pages/Packages/MakePayment/MakePayment";
// import ThankYou from "./pages/Packages/ThankYou/ThankYou";

const App = () => {
  console.clear();
  const { t, i18n } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  const index = 11;
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      // console.log('This will run after 1 second!')
    }, 10000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div className="app">
        <div className="main-wrapper">
          <BrowserRouter>
            <Sidebar sideClass={`main-aside ${isActive ? "main-aside-active" : ""}`} />
            <div className="main-content">
              <Header clickfunc={() => setIsActive(!isActive)} addClass={isActive ? "remove-icon" : ""} cickGe={() => changeLanguage("de")} cickEn={() => changeLanguage("en")} />
              <Routes>
                <Route path="/" element={<ManagementSystem />} />
                <Route path="/packages" element={<Packages />} />
                {/* <Route path="/packages/payment" element={<MakePayment />} /> */}
                {/* <Route path="/thank-you" element={<ThankYou />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </div >
    </>
  );
};

export default App;
