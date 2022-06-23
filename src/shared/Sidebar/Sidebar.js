import React from "react";
import "./style.css";
import { useLocation } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

const Sidebar = (props) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  let pathArr = location.pathname.split("/");
  pathArr.shift();
  return (
    <>
      {!["login", "register", "packages", "thank-you"].includes(
        pathArr[0].toLowerCase()
      ) && (
        <div className={props.sideClass}>
          <div className="sidebarCont">
            <div className="logo">
              <img src="/assets/images/logo.png" alt="" />
              <h4 className="removeOnActive">BSB management</h4>
            </div>
            <div className="ctm-navbar">
              <h6 className="removeOnActive">MAIN</h6>
              <ul className="navbar-menu">
                <li>
                  <a href="/#">
                    <svg className="icon" aria-labelledby="Dashboard Icon">
                      <title id="dashboard">Dashboard Icon</title>
                      <use
                        xlinkHref="/assets/svg-icons/icons.svg#dashboard"
                        xlinkTitle="Dashboard Icon"
                      ></use>
                    </svg>
                    <span className="removeOnActive">
                      <Trans>Dashboard</Trans>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="/#" className="active">
                    <svg className="icon" aria-labelledby="Standorte Icon">
                      <title id="standorte">Standorte Icon</title>
                      <use
                        xlinkHref="/assets/svg-icons/icons.svg#standorte"
                        xlinkTitle="Standorte Icon"
                      ></use>
                    </svg>
                    <span className="removeOnActive">
                      <Trans>Locations</Trans>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="/#">
                    <svg className="icon" aria-labelledby="User Icon">
                      <title id="users">User Icon</title>
                      <use
                        xlinkHref="/assets/svg-icons/icons.svg#users"
                        xlinkTitle="User Icon"
                      ></use>
                    </svg>
                    <span className="removeOnActive">
                      <Trans>TicketSystem</Trans>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="/#">
                    <svg className="icon" aria-labelledby="Location Icon">
                      <title id="location">Location Icon</title>
                      <use
                        xlinkHref="/assets/svg-icons/icons.svg#location"
                        xlinkTitle="Location Icon"
                      ></use>
                    </svg>
                    <span className="removeOnActive">
                      <Trans>Locations</Trans>
                    </span>
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
                      <use
                        xlinkHref="/assets/svg-icons/icons.svg#phone"
                        xlinkTitle="Phone Icon"
                      ></use>
                    </svg>
                    <span className="removeOnActive">
                      <Trans>Support</Trans>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="/#">
                    <svg className="icon" aria-labelledby="File Icon">
                      <title id="file">File Icon</title>
                      <use
                        xlinkHref="/assets/svg-icons/icons.svg#file"
                        xlinkTitle="File Icon"
                      ></use>
                    </svg>
                    <span className="removeOnActive">
                      <Trans>Files</Trans>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="/#">
                    <svg className="icon" aria-labelledby="Setting Icon">
                      <title id="settings">Setting Icon</title>
                      <use
                        xlinkHref="/assets/svg-icons/icons.svg#settings"
                        xlinkTitle="Setting Icon"
                      ></use>
                    </svg>
                    <span className="removeOnActive">
                      <Trans>Settings</Trans>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="copyright removeOnActive">
              <p>
                Copyright © 2022 <br /> <a href="/#">www.enmeldung.com</a>
                <br /> All rights reserved
              </p>
            </div>
            <ul className="navbar-menu">
              <li>
                <a href="/#">
                  <svg className="icon" aria-labelledby="Brifcase Icon">
                    <title id="brifcase">Brifcase Icon</title>
                    <use
                      xlinkHref="/assets/svg-icons/icons.svg#brifcase"
                      xlinkTitle="Brifcase Icon"
                    ></use>
                  </svg>
                  <span className="removeOnActive">
                    <Trans>Store</Trans>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
