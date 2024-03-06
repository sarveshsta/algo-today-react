import "./dashboard.css";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import { GrHomeRounded } from "react-icons/gr";
import { IoIosCloseCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";

const userlistData = [
  {
    userimg: require('../../assets/icons/Group 48095916.png'),
    username: "Siddharth",
    stra1:"Expert Streategies",
    stra2:"Custom Streategies",
    coinbala:"Coin Balance",
    currestatus:"Current Status",
    Expir:"Expires on"
  }
]

const Dashboard = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(true);
  };

  const closeWindow = () => {
    if (toggle) {
      setToggle(false);
    }
  };
  return (
    <>
      <div className="admin-dashbord">
        <div className={`hamburger-icon`} onClick={handleToggle}>
          <FaBars />
        </div>

        <div
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
          <ul className={`ul-list`}>
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

        <div className="admin-dash-horizontal-nav-maindiv">
          <div className="dash-horizontal-nav-subdiv">
            <ul className="dash-horizontal-nav-ul">
              <div className="dash-horizontal-nav-divofli">
                <li className="dash-horizontal-nav-li">
                  <input
                    className="dash-hori-inp"
                    type="search"
                    placeholder="Search..."
                  />
                </li>
                <div className="waana-flex-this-li">
                  <li className="dash-horizontal-nav-li">
                    <LuMail className="dash-hori-icon" />
                  </li>
                  <li className="dash-horizontal-nav-li">
                    <IoNotificationsOutline className="dash-hori-icon" />
                  </li>
                </div>
              </div>
              <div className="dash-horizontal-nav-2nddiv">
                <div className="dash-horizontal-nav-imgdiv">
                  <img
                    src={require("../../assets/icons/userimg.png")}
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
          <div className="user-list">
            {userlistData.map((item) => {
              const {userimg, username,stra1,stra2,coinbala,currestatus,Expir} = item
              return (
                <>
                  <div className="user-list-div1" ></div>
                  <div className="user-list-div2"></div>
                </>
              )
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
