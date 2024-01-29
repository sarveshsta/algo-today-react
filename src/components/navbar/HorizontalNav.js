import React from "react";
import './horizontalnav.css'

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
      <h2 className="Horizontalheading">Algo User</h2>
      <h3 className="Horizontalheading1">Hello</h3>
      <img
        className="Horizontalimg2"
        src={require("../../assets/icons/Group 91.png")}
        alt="image"
      />
      <img
        className="Horizontalimg3"
        src={require("../../assets/icons/Group 84.png")}
        alt="image"
      />
    </div>
  );
};

export default HorizontalNav;
