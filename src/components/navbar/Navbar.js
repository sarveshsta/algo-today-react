import React, { useEffect, useRef, useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { GrHomeRounded } from "react-icons/gr";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(true);

    if(toggle){
      setToggle(false)
    }
    
  };

const closeWindow = () => {
  document.addEventListener('close', setToggle(false))
}  

  return (
    <>
      <div className={`hamburger-icon`} onClick={handleToggle}>
        ☰
      </div>

      <div className={`${toggle ? 'block' : 'verticle-navbar'}`} onClick={closeWindow}>
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
        </ul>
        {/* </div> */}
      </div>
    </>
  );
};
export default Navbar;