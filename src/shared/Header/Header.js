import React, { useState } from "react";
import "./style.css";

const Header = () => {
    const [isActive, setIsActive] = useState(false);
    return (
        <header className="main-header">
            <div className="header-left">
                <div className={`menu-icon cmn-style ${isActive ? "remove-icon" : ""}`} onClick={() => setIsActive(!isActive)}>
                    <svg className="icon" aria-labelledby="Hamburger Menu">
                        <title id="hamburgerMenu">Hamburger Menu</title>
                        <use xlinkHref="/assets/svg-icons/icons.svg#hamburgerMenu" xlinkTitle="Hamburger Menu"></use>
                    </svg>
                </div>
                <div className="colorTheme cmn_change-hover cmn-style">
                    <div className="colorThemeImages">
                        <img src="/assets/images/pallete.png" alt="pallete" className="main-img" />
                        <img src="/assets/images/pallete-color-change.png" alt="pallete color" className="hover-img" />
                    </div>
                    <p>Change Theme Color</p>
                </div>
            </div>
            <div className="header-right">
                <div className="networkImages cmn_change-hover cmn-style">
                    <img src="/assets/images/network.png" alt="network" className="main-img" />
                    <img src="/assets/images/network-color-change.png" alt="network color" className="hover-img" />
                </div>
                <div className="searchIcon cmn-style">
                    <svg className="icon" aria-labelledby="Search Icon">
                        <title id="search">Search Icon</title>
                        <use xlinkHref="/assets/svg-icons/icons.svg#search" xlinkTitle="Search Icon"></use>
                    </svg>
                </div>
                <div className="emailImages cmn_change-hover cmn-style">
                    <img src="/assets/images/mail.png" alt="mail" className="main-img" />
                    <img src="/assets/images/mail-color-change.png" alt="mail color" className="hover-img" />
                </div>
                <div className="bellIcom cmn-style">
                    <svg className="icon" aria-labelledby="Bell Icon">
                        <title id="bell">Bell Icon</title>
                        <use xlinkHref="/assets/svg-icons/icons.svg#bell" xlinkTitle="Bell Icon"></use>
                    </svg>
                </div>
                <div className="profileDropdown cmn-style">
                    <img src="/assets/images/user.png" alt="User" />
                    <svg className="icon" aria-labelledby="Dropdown Icon">
                        <title id="dropdownButton">Dropdown Icon</title>
                        <use xlinkHref="/assets/svg-icons/icons.svg#dropdownButton" xlinkTitle="Dropdown Icon"></use>
                    </svg>
                    <div className="dropdownBox">
                        <p>Currently in</p>
                        <div className="dropProfileInfo">
                            <img src="/assets/images/user.png" alt="User" />
                            <div className="dropProfileInfoCont">
                                <h4>Nick</h4>
                                <p>Personal</p>
                                <p>contact@mstflotfy.com</p>
                            </div>
                        </div>
                        <p>Profile</p>
                        <ul className="dropProfileInfo">
                            <li><a href="/#">Settings</a> </li>
                            <li><a href="/#">Profile</a></li>
                            <li> <a href="/#">Terms and privacy</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
