import React, { useState } from "react";
import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";
const Header = (props) => {
  const [openDropdrown, setOpenDropdrown] = useState(false);
  const [standorte, setStandorte] = useState(false);
  const [addModule, setAddModule] = useState(false);
  const [fixBoard, setFixBoard] = useState(false);
  const [networdDrop, setNetwordDrop] = useState(false);
  const location = useLocation();
  let pathArr = location.pathname.split("/");
  pathArr.shift();
  let user = JSON.parse(localStorage.getItem("user-info"));
  const navigate = useNavigate();
  const logoutFunc = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {!["login", "register", "packages", "thank-you"].includes(
        pathArr[0].toLowerCase()
      ) && (
          <header className="main-header">
            <div className="header-left">
              <div
                className={`menu-icon cmn-style ${props.addClass}`}
                onClick={props.clickfunc}
              >
                <svg className="icon icon-right" aria-labelledby="dropdownButton">
                  <title id="dropdownButton">dropdownButton</title>
                  <use
                    xlinkHref="/assets/svg-icons/icons.svg#dropdownButton"
                    xlinkTitle="dropdownButton"
                  ></use>
                </svg>
                <svg className="icon icon-left" aria-labelledby="dropdownButton">
                  <title id="dropdownButton">dropdownButton</title>
                  <use
                    xlinkHref="/assets/svg-icons/icons.svg#dropdownButton"
                    xlinkTitle="dropdownButton"
                  ></use>
                </svg>
              </div>
              <div className="dropdown">
                <button
                  className={`btn dropdown-toggle ${standorte ? "show" : ""}`}
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded={`${standorte ? "true" : "false"}`}
                  onClick={() => setStandorte(!standorte)}
                >
                  Standorte
                </button>
                <ul className={`dropdown-menu ${standorte ? "show" : ""}`} aria-labelledby="dropdownMenuButton1">
                  <li>
                    <a className="dropdown-item" href="#">
                      City / Street Nr
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      City / Street Nr
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      City / Street Nr
                    </a>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Standorte anlegen</a></li>
                </ul>
              </div>
              <div className="dropdown">
                <button
                  className={`btn dropdown-toggle ${addModule ? "show" : ""}`}
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded={`${addModule ? "true" : "false"}`}
                  onClick={() => setAddModule(!addModule)}
                >
                  Modul hinzufugen
                </button>
                <ul className={`dropdown-menu ${addModule ? "show" : ""}`} aria-labelledby="dropdownMenuButton1">
                  <li>
                    <a className="dropdown-item" href="#">
                      City / Street Nr
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      City / Street Nr
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      City / Street Nr
                    </a>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Standorte anlegen</a></li>
                </ul>
              </div>
              <div className="dropdown">
                <button
                  className={`btn dropdown-toggle ${fixBoard ? "show" : ""}`}
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded={`${fixBoard ? "true" : "false"}`}
                  onClick={() => setFixBoard(!fixBoard)}
                >
                  Board Fixieren
                </button>
                <ul className={`dropdown-menu ${fixBoard ? "show" : ""}`} aria-labelledby="dropdownMenuButton1">
                  <li>
                    <a className="dropdown-item" href="#">
                      City / Street Nr
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      City / Street Nr
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      City / Street Nr
                    </a>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Standorte anlegen</a></li>
                </ul>
              </div>
              {/* <div className="colorTheme cmn_change-hover cmn-style">
              <div className="colorThemeImages">
                <img
                  src="/assets/images/pallete.png"
                  alt="pallete"
                  className="main-img"
                />
                <img
                  src="/assets/images/pallete-color-change.png"
                  alt="pallete color"
                  className="hover-img"
                />
              </div>
              <p>Change Theme Color</p>
            </div> */}
            </div>
            <div className="header-right">
              <div className="dropdown networkImages cmn_change-hover cmn-style">
                <button
                  className={`btn dropdown-toggle ${networdDrop ? "show" : ""}`}
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded={`${networdDrop ? "true" : "false"}`}
                  onClick={() => setNetwordDrop(!networdDrop)}
                >
                  <img
                    src="/assets/images/network.png"
                    alt="network"
                    className="main-img"
                  />
                  <img
                    src="/assets/images/network-color-change.png"
                    alt="network color"
                    className="hover-img"
                  />
                </button>
                <ul className={`dropdown-menu ${networdDrop ? "show" : ""}`} aria-labelledby="dropdownMenuButton1">
                  <li>
                    <button onClick={props.cickGe} className={`${props.cickGe ? "test" : ""}`}>GE</button>
                  </li>
                  <li>
                    <button onClick={props.cickEn}>en</button>
                  </li>
                </ul>
              </div>
              <div className="searchIcon cmn-style">
                <svg className="icon" aria-labelledby="Search Icon">
                  <title id="search">Search Icon</title>
                  <use
                    xlinkHref="/assets/svg-icons/icons.svg#search"
                    xlinkTitle="Search Icon"
                  ></use>
                </svg>
              </div>
              {/* <div className="emailImages cmn_change-hover cmn-style">
              <img
                src="/assets/images/mail.png"
                alt="mail"
                className="main-img"
              />
              <img
                src="/assets/images/mail-color-change.png"
                alt="mail color"
                className="hover-img"
              />
            </div> */}
              {/* <div className="bellIcom cmn-style">
              <svg className="icon" aria-labelledby="Bell Icon">
                <title id="bell">Bell Icon</title>
                <use
                  xlinkHref="/assets/svg-icons/icons.svg#bell"
                  xlinkTitle="Bell Icon"
                ></use>
              </svg>
            </div> */}
              <div
                className="profileDropdown cmn-style"
                onClick={() => setOpenDropdrown(!openDropdrown)}
              >
                <img src="/assets/images/user.png" alt="User" />
                <svg className="icon" aria-labelledby="Dropdown Icon">
                  <title id="dropdownButton">Dropdown Icon</title>
                  <use
                    xlinkHref="/assets/svg-icons/icons.svg#dropdownButton"
                    xlinkTitle="Dropdown Icon"
                  ></use>
                </svg>
                <div
                  className={`dropdownBox ${openDropdrown ? "dropdownActive" : ""
                    }`}
                >
                  <p>Currently in</p>
                  <div className="dropProfileCard">
                    <img src="/assets/images/user.png" alt="User" />
                    <div className="dropProfileInfoCont">
                      <h4>Nick</h4>
                      <p>Personal</p>
                      <p>contact@mstflotfy.com</p>
                    </div>
                  </div>
                  <p>Profile</p>
                  <ul className="dropProfileInfo">
                    <li>
                      <button>Settings</button>
                    </li>
                    <li>
                      <button>Profile</button>
                    </li>
                    <li>
                      <button>Terms and privacy</button>
                    </li>
                    <li>
                      <button onClick={() => navigate("/packages")}>
                        Packages
                      </button>
                    </li>
                    {localStorage.getItem("user-info") ? (
                      <li onClick={logoutFunc}>Logout</li>
                    ) : (
                      ""
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </header>
        )}
    </>
  );
};

export default Header;
