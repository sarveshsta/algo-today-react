import "./horizontalnav.css";
import React, { useState } from "react";
import { VscBellDot } from "react-icons/vsc";
import { IoExitOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const HorizontalNav = () => {
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const iconClick = () => {
    setShowNotification(true);

    if (showNotification) {
      setShowNotification(false);
    }

    setTimeout(() => {
      setShowNotification(false);
    }, 6000);
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
        alt="image"
      />
      <h2 className="Horizontalheading">User</h2>
      <h3 className="Horizontalheading1">Hello</h3>
      <VscBellDot
        className={`Horizontalimg2 ${showNotification ? "bg-color" : ""}`}
        onClick={iconClick}
      />
      <IoExitOutline
        className="Horizontalimg3"
        onClick={() => navigate("/login")}
      />

      {/* Notification */}
      {showNotification && <div className="icon-notification-div"></div>}
    </div>
  );
};

export default HorizontalNav;
