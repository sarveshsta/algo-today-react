import "./horizontalnav.css";
import React, { useState } from "react";
import { VscBellDot } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { IoExitOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logoutAPI } from "../../user/features/auth/authAuthentication";

const HorizontalNav = ({ showBtnOnClick }) => {
  const [showNotification, setShowNotification] = useState(false);
  const state = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const iconClick = () => {
    setShowNotification(true);

    if (showNotification) {
      setShowNotification(false);
    }

    setTimeout(() => {
      setShowNotification(false);
    }, 6000);
  };

  const handleLogout = async () => {
    dispatch(logoutAPI());
  };

  return (
    <div className="HorizontalNav">
      <img
        className="Horizontalimg"
        src={require("../../assets/icons/Ellipse 24.png")}
        alt="image"
      />
      <img
        className="Horiimg1"
        src={require("../../assets/icons/handicon.png")}
        alt="icon"
      />
      <h2 className="Horizontalheading">User</h2>
      <h3 className="Horizontalheading1">Hello</h3>

      {showBtnOnClick && (
        <>
          <div className="strat-btn">
            <button id="stry-btn1" className="strat-button">
              Broker Amt 5,00,000
            </button>
            <button id="stry-btn2" className="strat-button">
              Broker Amt 5,00,000
            </button>
          </div>
        </>
      )}

      <VscBellDot
        className={`Horizontalimg2 ${showNotification ? "bg-color" : ""}`}
        onClick={iconClick}
      />
      <IoExitOutline className="Horizontalimg3" onClick={handleLogout} />

      {/* Notification */}
      {showNotification && (
        <div className="icon-notification-div">This is Notification Pop-Up</div>
      )}
    </div>
  );
};
export default React.memo(HorizontalNav);
