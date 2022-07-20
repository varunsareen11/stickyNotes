import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";
import LockIcon from '@mui/icons-material/Lock';
const Header = (props) => {
  const [openDropdrown, setOpenDropdrown] = useState(false);
  const [standorte, setStandorte] = useState(false);
  const [addModule, setAddModule] = useState(false);
  const [fixBoard, setFixBoard] = useState(false);
  const location = useLocation();
  const dropDownCont = useRef(null);

  let pathArr = location.pathname.split("/");
  pathArr.shift();
  let user = JSON.parse(localStorage.getItem("user-info"));
  const navigate = useNavigate();
  const logoutFunc = () => {
    localStorage.removeItem("user-info");
    navigate("/login");
  };
  const handleClickOutside = event => {
    if (dropDownCont.current && !dropDownCont.current.contains(event.target)) {
      setFixBoard(false);
      setAddModule(false);
      setStandorte(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  const removeNote = () => {
    props.isTaskModule(true)
    setAddModule(false);
  }
  const removeCalender = () => {
    props.isEventModule(true)
    setAddModule(false);
  }
  const removeBothCalender = () => {
    props.isEventModule(true)
    props.isTaskModule(true)
    setAddModule(false);
  }
  return (
    <>
      {!["login", "register", "packages", "thank-you", "forget-password", "reset-password"].includes(
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
              {
                ["standorte"].includes(
                  pathArr[0].toLowerCase()
                ) && (
                  <>
                    <div className="dropdown" >
                      <button
                        className={`btn dropdown-toggle ${standorte ? "show" : ""}`}
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded={`${standorte ? "true" : "false"}`}
                        onClick={() => {
                          setStandorte(!standorte)
                        }}
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
                    <div className="dropdown" ref={dropDownCont}>
                      <button
                        className={`btn dropdown-toggle ${addModule ? "show" : ""}`}
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded={`${addModule ? "true" : "false"}`}
                        onClick={() => {
                          setAddModule(!addModule)
                        }}
                      >
                        Modul hinzufügen
                      </button>
                      <ul className={`dropdown-menu ${addModule ? "show" : ""}`} aria-labelledby="dropdownMenuButton1">
                        {props.taskModule ?
                          ""
                          : (<li>
                            <button className="dropdown-item" href="#" onClick={() => removeNote()}>
                              Aufgaben
                            </button>
                          </li>
                          )
                        }
                        {props.eventCalenderModule ?
                          ""
                          : (<li>
                            <button className="dropdown-item" onClick={() => removeCalender()}>
                              Kalender
                            </button>
                          </li>
                          )
                        }
                        <li><hr className="dropdown-divider" /></li>
                        <li>
                          <button className="dropdown-item" onClick={() => removeBothCalender()}>
                            alle Module öffnen
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div className="dropdown">
                      <button
                        className={`btn `}
                        onClick={() => { props.isModulefixed(!props.modulefixed) }}
                      >
                        Board Fixieren
                        {
                          props.modulefixed ?
                            (<LockIcon className="board-fixed" color="action" />) : ""
                        }
                      </button>
                      {/* <ul className={`dropdown-menu ${fixBoard ? "show" : ""}`} aria-labelledby="dropdownMenuButton1">
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
                      </ul> */}
                    </div>
                  </>
                )
              }
            </div>
            <div className="header-right">
              <div className="searchIcon cmn-style">
                <svg className="icon" aria-labelledby="Search Icon">
                  <title id="search">Search Icon</title>
                  <use
                    xlinkHref="/assets/svg-icons/icons.svg#search"
                    xlinkTitle="Search Icon"
                  ></use>
                </svg>
              </div>
              <div className="bellIcom cmn-style">
                <svg className="icon" aria-labelledby="Bell Icon">
                  <title id="bell">Bell Icon</title>
                  <use
                    xlinkHref="/assets/svg-icons/icons.svg#bell"
                    xlinkTitle="Bell Icon"
                  ></use>
                </svg>
              </div>
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
        )
      }
    </>
  );
};

export default Header;
