import React from "react";
import './horizontalnav.css'
import { VscBellDot } from "react-icons/vsc";
import { IoExitOutline } from "react-icons/io5";

const HorizontalNav = () => {
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
      <VscBellDot className="Horizontalimg2" />
      <IoExitOutline className="Horizontalimg3" />
    </div>
  );
};

export default HorizontalNav;
