import "./dashboard.css";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { GrHomeRounded } from "react-icons/gr";
import { IoIosCloseCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";

const userlistData = [
  {
    userimg: require("../../assets/icons/IMG_0399.jpg"),
    username: "Aman Jain(ALGO124)",
    stra1: "Expert Streategies",
    stra2: "Custom Streategies",
    coinbala: "Coin Balance",
    currestatus: "Current Status",
    Expir: "Expires on",
  },
  {
    userimg: require("../../assets/icons/IMG_0399.jpg"),
    username: "Aman Jain(ALGO124)",
    stra1: "Expert Streategies",
    stra2: "Custom Streategies",
    coinbala: "Coin Balance",
    currestatus: "Current Status",
    Expir: "Expires on",
  },
  {
    userimg: require("../../assets/icons/IMG_0399.jpg"),
    username: "Aman Jain(ALGO124)",
    stra1: "Expert Streategies",
    stra2: "Custom Streategies",
    coinbala: "Coin Balance",
    currestatus: "Current Status",
    Expir: "Expires on",
  },
  {
    userimg: require("../../assets/icons/IMG_0399.jpg"),
    username: "Aman Jain(ALGO124)",
    stra1: "Expert Streategies",
    stra2: "Custom Streategies",
    coinbala: "Coin Balance",
    currestatus: "Current Status",
    Expir: "Expires on",
  },
  {
    userimg: require("../../assets/icons/IMG_0399.jpg"),
    username: "Aman Jain(ALGO124)",
    stra1: "Expert Streategies",
    stra2: "Custom Streategies",
    coinbala: "Coin Balance",
    currestatus: "Current Status",
    Expir: "Expires on",
  },
];

const Dashboard = () => {
  const [isKeyPressed, setIsKeyPressed] = useState(false);
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(true);
  };

  const handleKeyPress = (event) => {
    setIsKeyPressed(!!event.target.value);
  };

  const closeWindow = () => {
    if (toggle) {
      setToggle(false);
    }
  };
  return (
    <>
      <div className="admin-dashbord">
{/*------------------------------Vertical-admin-nav----------------------------- */}
        <div className={`hamburger-icon`} onClick={handleToggle}>
          <FaBars />
        </div>

        <div
          id="admin-dashboard-nav"
          className={`${toggle ? "block" : "verticle-navbar"}`}
          onClick={closeWindow}
        >
          <div className="close-btn">
            <IoIosCloseCircle />
          </div>

          <div className="logo">
            <img
              className="logo-img"
              src={require("../../assets/icons/upscaler-2-2x 1.png")}
            />
            <h2 className="dashbord-nav-h2">ALGO Today</h2>
          </div>

          <div className="dashbord-horiz"></div>

          {/* <div className="nav-ul"> */}
          <ul id="admin-dash-ul-nav" className={`ul-list`}>
            <div className="iconhome">
              <GrHomeRounded color="white" />
              <li className="vertnav-ul-li" id="home">
                <Link
                  to="/"
                  style={{ textDecorationLine: "none", color: "white" }}
                >
                  <span className="link-text">Home</span>
                </Link>
              </li>
            </div>
            <div>
              <li className="vertnav-ul-li" id="wallet">
                <img
                  className="iconimg"
                  src={require("../../assets/icons/Vector2.png")}
                  alt="vector"
                />
                <Link
                  to="/wallet"
                  style={{ textDecorationLine: "none", color: "white" }}
                >
                  <span className="link-text">Wallet</span>
                </Link>
              </li>
            </div>
            <div>
              <li className="vertnav-ul-li" id="cust">
                <img
                  className="iconimg"
                  src={require("../../assets/icons/Group 48096030.png")}
                  alt="vector"
                />
                <Link
                  to="/custom"
                  style={{ textDecorationLine: "none", color: "white" }}
                >
                  <span className="link-text">CustomStrategies</span>
                </Link>
              </li>
            </div>
            <div>
              <li className="vertnav-ul-li" id="mantrad">
                <img
                  className="iconimg"
                  src={require("../../assets/icons/Group 48096029.png")}
                  alt="vector"
                />
                <Link
                  to="/managetrading"
                  style={{ textDecorationLine: "none", color: "white" }}
                >
                  <span className="link-text">Managetrading</span>
                </Link>
              </li>
            </div>
          </ul>
          {/* </div> */}
        </div>

{/*------------------------------Horizontal-admin-nav----------------------------- */}
        <div className="admin-dash-horizontal-nav-maindiv">
          <div className="dash-horizontal-nav-subdiv">
            <ul className="dash-horizontal-nav-ul">
              <div className="dash-horizontal-nav-divofli">
                <li className="dash-horizontal-nav-li">
                  {!isKeyPressed && (
                    <CiSearch
                      className={`horizontal-nav-li-icon ${
                        isKeyPressed ? "icon-hidden" : ""
                      }`}
                    />
                  )}
                  <input
                    className={`dash-hori-inp`}
                    type="search"
                    placeholder="Search..."
                    onChange={handleKeyPress}
                  />
                </li>
                <div className="waana-flex-this-li">
                  <li className="dash-horizontal-nav-li">
                    {/* <h5 className="email-top-number-show">7</h5> */}
                    <LuMail className="dash-hori-icon" />
                  </li>
                  <li className="dash-horizontal-nav-li">
                  {/* <h5 className="email-top-number-show2">3</h5> */}
                    <IoNotificationsOutline className="dash-hori-icon" />
                  </li>
                </div>
              </div>
              <div className="dash-horizontal-nav-2nddiv">
                <div className="dash-horizontal-nav-imgdiv">
                  <img
                    src={require("../../assets/icons/IMG_0399.jpg")}
                    className="dash-nav-img"
                  />
                </div>
                <div className="dash-horizontal-nav-txtdiv">
                  <h3 className="dash-horizontal-nav-txt">Aman Jain</h3>
                  <p className="dash-horizontal-nav-para">Admin</p>
                </div>
              </div>
            </ul>
          </div>
        </div>

{/*------------------------------Dashboard-User-List----------------------------- */}
        <div className="dashbord-userlist-div">
          <div className="userlist-main-div">
            <ul className="userlist-ui">
              <div className="userlist-div">
                <div className="userlist-li-div">
                  <li className="li-list">All User</li>
                </div>
                <div className="userlist-li-div">
                  <li className="li-list">Inactive</li>
                </div>
                <div className="userlist-li-div">
                  <li className="li-list">Active</li>
                </div>
                <div className="userlist-li-div">
                  <li className="li-list">Low Coins</li>
                </div>
                <div className="userlist-li-div">
                  <li className="li-list">Expiry Date</li>
                </div>
              </div>
              <div className="userlist-input-search-div">
                <input
                  className="userlist-input-search"
                  type="search"
                  placeholder="Search user, coin, broker amt...."
                />
              </div>
            </ul>
          </div>
          <div className="wanna-grid-user-list">
            <div className="user-list">
              {userlistData.map((item) => {
                const {
                  userimg,
                  username,
                  stra1,
                  stra2,
                  coinbala,
                  currestatus,
                  Expir,
                } = item;
                return (
                  <>
                    <div className="wanna-flex-do-it">
                      <div className="user-list-div1">
                        <img className="list-div1-img" src={userimg} />
                      </div>
                      <div className="user-list-div2">
                        <div className="user-list-div2-subdiv1">
                          <h3 className="subdiv1-h3">{username}</h3>
                        </div>
                        <div className="user-list-div2-subdiv2">
                          <div className="div2-subdiv2-1">
                            <h3 id="h3-1-subdiv" className="subdiv2-h3">
                              {stra1}
                            </h3>
                            <h4 id="h4-1-subdiv" className="subdiv2-h4">
                              {Expir}
                            </h4>
                          </div>
                          <div className="div2-subdiv2-2">
                            <h3 id="h3-2-subdiv" className="subdiv2-h3">
                              {stra2}
                            </h3>
                            <h4 id="h4-2-subdiv" className="subdiv2-h4">
                              {Expir}
                            </h4>
                          </div>
                          <div className="div2-subdiv2-3">
                            <h3 id="h3-3-subdiv" className="subdiv2-h3">
                              {coinbala}
                            </h3>
                            <h4 id="h4-3-subdiv" className="subdiv2-h4">
                              {Expir}
                            </h4>
                          </div>
                          <div className="div2-subdiv2-4">
                            <h3 id="h3-4-subdiv" className="subdiv2-h3">
                              {currestatus}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
