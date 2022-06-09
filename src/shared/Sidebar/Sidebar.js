import React from "react";
import "./style.css";

const Sidebar = () => {
  return(
    <>
      <div className="sidebarCont">
        <div className="logo">
          <img src="/assets/images/logo.png" alt="" />
          <h4 className="removeOnActive">Enmeldung</h4>
        </div>
        <div className="navbar">
          <h6 className="removeOnActive">MAIN</h6>
          <ul className="navbar-menu">
            <li>
              <a href="/#" className="active">
                <svg className="icon" aria-labelledby="Dashboard Icon">
                    <title id="dashboard">Dashboard Icon</title>
                    <use xlinkHref="/assets/svg-icons/icons.svg#dashboard" xlinkTitle="Dashboard Icon"></use>
                </svg>
                <span className="removeOnActive">Dashboard</span>
              </a>
            </li>
            <li>
              <a href="/#">
                <svg className="icon" aria-labelledby="Management System Icon">
                    <title id="management-system">Management System Icon</title>
                    <use xlinkHref="/assets/svg-icons/icons.svg#management-system" xlinkTitle="Management System Icon"></use>
                </svg>
                <span className="removeOnActive">Management System</span>
              </a>
            </li>
            <li>
              <a href="/#">
                <svg className="icon" aria-labelledby="User Icon">
                    <title id="users">User Icon</title>
                    <use xlinkHref="/assets/svg-icons/icons.svg#users" xlinkTitle="User Icon"></use>
                </svg>
                <span className="removeOnActive">Ticket System</span>
              </a>
            </li>
            <li>
              <a href="/#">
                <svg className="icon" aria-labelledby="Location Icon">
                    <title id="location">Location Icon</title>
                    <use xlinkHref="/assets/svg-icons/icons.svg#location" xlinkTitle="Location Icon"></use>
                </svg>
                <span className="removeOnActive">Locations</span>
              </a>
            </li>
            <li>
              <a href="/#">
                <svg className="icon" aria-labelledby="Brifcase Icon">
                    <title id="brifcase">Brifcase Icon</title>
                    <use xlinkHref="/assets/svg-icons/icons.svg#brifcase" xlinkTitle="Brifcase Icon"></use>
                </svg>
                <span className="removeOnActive">Store</span>
              </a>
            </li>
          </ul>

          {/* pages dropdown */}
          <h6 className="removeOnActive">Pages</h6>
          <ul className="navbar-menu">
            <li>
              <a href="/#">
                <svg className="icon" aria-labelledby="Phone Icon">
                    <title id="phone">Phone Icon</title>
                    <use xlinkHref="/assets/svg-icons/icons.svg#phone" xlinkTitle="Phone Icon"></use>
                </svg>
                <span className="removeOnActive">Support</span>
              </a>
            </li>
            <li>
              <a href="/#">
                <svg className="icon" aria-labelledby="File Icon">
                    <title id="file">File Icon</title>
                    <use xlinkHref="/assets/svg-icons/icons.svg#file" xlinkTitle="File Icon"></use>
                </svg>
                <span className="removeOnActive">Files</span>
              </a>
            </li>
            <li>
              <a href="/#">
                <svg className="icon" aria-labelledby="Setting Icon">
                    <title id="settings">Setting Icon</title>
                    <use xlinkHref="/assets/svg-icons/icons.svg#settings" xlinkTitle="Setting Icon"></use>
                </svg>
                <span className="removeOnActive">Settings</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="copyright removeOnActive">
          <p>Copyright © 2022 <br /> <a href="/#">www.enmeldung.com</a> <br /> All rights reserved </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
