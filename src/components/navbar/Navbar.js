import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { GrHomeRounded } from "react-icons/gr";
import { IoIosCloseCircle } from "react-icons/io";
import React, { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate()

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
            src={require("../../assets/icons/algo logo WHITE.png")}
          />
        </div>

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
          <li className="vertnav-ul-li" id="opendemat">
            <img
              className="iconimg"
              src={require("../../assets/icons/Vector.png")}
              alt="vector"
            />
            <Link
              to="/opendemate"
              style={{ textDecorationLine: "none", color: "white" }}
            >
              <span className="link-text">Open Demat Account</span>
            </Link>
          </li>
          </div>
          <div>
          <li className="vertnav-ul-li" id="acc">
            <img
              className="iconimg"
              src={require("../../assets/icons/Vector.png")}
              alt="vector"
            />
            <Link
              to="/linkbroker"
              style={{ textDecorationLine: "none", color: "white" }}
            >
            <span className="link-text">Link Brokeraccount</span>
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
          <div>
          <li className="vertnav-ul-li" id="usrhist">
            <img
              className="iconimg"
              src={require("../../assets/icons/Vector (1).png")}
              alt="vector"
            />
            <Link
              to="/userhistory"
              style={{ textDecorationLine: "none", color: "white" }}
            >
            <span className="link-text">UserHistory</span>
            </Link>
          </li>
          </div>
          <div>
          <li className="vertnav-ul-li" id="ref&ern">
            <img
              className="iconimg"
              src={require("../../assets/icons/Group 98.png")}
              alt="vector"
            />
            <Link
              to="/refer&earn"
              style={{ textDecorationLine: "none", color: "white" }}
            >
            <span className="link-text">Refer&Earn</span>
            </Link>
          </li>
          </div>
        </ul>
        {/* </div> */}
      </div>
    </>
  );
};
export default React.memo(Navbar);
