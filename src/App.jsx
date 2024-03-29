// https://www.postman.com/collections/02a7c7e98435c86328a5
// use baseurl : 54.87.14.216
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Header from "./shared/Header/Header";
import Sidebar from "./shared/Sidebar/Sidebar";
import Standorte from "./pages/Standorte/Standorte";
import Dashboard from "./pages/Dashboard/Dashboard";
import Locations from "./pages/Locations/Locations";
import TicketSystem from "./pages/TicketSystem/TicketSystem";
import Support from "./pages/Support/Support";
import Login from "./auth/Login/Login";
import Register from "./auth/Register/Register";
import ForgetPassword from "./auth/ForgetPassword/ForgetPassword";
import ResetPassword from "./auth/ResetPassword/ResetPassword";
import Packages from "./pages/Packages/Packages";
import MakePayment from "./pages/Packages/MakePayment/MakePayment";
import ThankYou from "./pages/Packages/ThankYou/ThankYou";
import User from "./admin/User/User";
import SingleUser from "./admin/SingleUser/SingleUser";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import TermCondition from "./pages/TermCondition/TermCondition"
const API = "http://54.87.14.216/api";

const App = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [isActiveModule, setIsActiveModule] = useState(true);
  const [isActiveModuleDocument, setIsActiveModuleDocument] = useState(true);
  const [isActiveModulePlan, setIsActiveModulePlan] = useState(true);
  const [isActiveEventModule, setIsActiveEventModule] = useState(true);
  const [isBoarFixed, setIsBoarFixed] = useState(false);

  const user = JSON.parse(localStorage.getItem("user-info"));
  const userError = user?.error;
  const token = user?.token;
  const [standoteDrop, setStandoteDrop] = useState({
    event_calender: 1,
    note: 1,
    board_fixed: 0,
  });

  useEffect(() => {
    if (userError) {
      localStorage.clear();
    }
  });
  return (
    <>
      <div className="app">
        <div className="main-wrapper">
          <BrowserRouter>
            <Sidebar sideClass={`main-aside ${isActive ? "main-aside-active" : ""}`} />
            <div className="main-content">
              <Header clickfunc={() => setIsActive(!isActive)} addClass={isActive ? "remove-icon" : ""} isTaskModule={setIsActiveModule} taskModule={isActiveModule} isEventModule={setIsActiveEventModule} eventCalenderModule={isActiveEventModule} isModulefixed={setIsBoarFixed} modulefixed={isBoarFixed} isDocumentModule={setIsActiveModuleDocument} isPlanModule={setIsActiveModulePlan} eventDocumentModule={isActiveModuleDocument} eventPlanModule={isActiveModulePlan} />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/locations" element={<Locations />} />
                <Route path="/ticket-system" element={<TicketSystem />} />
                <Route path="/support" element={<Support />} />
                <Route path="/standorte" element={<Standorte isTaskModule={setIsActiveModule} taskModule={isActiveModule} isDocumentModule={setIsActiveModuleDocument} isPlanModule={setIsActiveModulePlan} isEventModule={setIsActiveEventModule} eventCalenderModule={isActiveEventModule} eventDocumentModule={isActiveModuleDocument} eventPlanModule={isActiveModulePlan} modulefixed={isBoarFixed} />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/packages/payment" element={<MakePayment />} />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/register" element={<Register />} />
                <Route path="/user" element={<User />} />
                <Route path="/user/:_id" element={<SingleUser />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/term-conditions" element={<TermCondition />} />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </div >
    </>
  );
};

export default App;
