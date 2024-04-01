import "./about.css";
import React from "react";
import Mainnav from "../../components/navbar/Mainnav";

const About = () => {
  return (
    <>
      <Mainnav />
      <div className="about-firstdiv">
        <h2 className="about-heading">How we make a difference</h2>
        <p className="about-para">
          Navigate the markets with confidence using our algorithmic trading
          platform, where precision meets performance. Empower your financial
          journey with data-driven decisions and seamless execution
        </p>
      </div>
      <div className="about-images">
        <div className="image1">
          <img className="img-of-about" src={require("../../assets/icons/Mask group.png")} />
        </div>
        <div className="image2">
          <img className="img-of-about" src={require("../../assets/icons/Mask group (1).png")} />
        </div>
        <div className="image3">
          <img className="img-of-about" src={require("../../assets/icons/Mask group (2).png")} />
        </div>
        <div className="image4">
          <img className="img-of-about" src={require("../../assets/icons/Mask group (3).png")} />
        </div>
        <div className="image5">
          <img className="img-of-about" src={require("../../assets/icons/Mask group (4).png")} />
        </div>
        <div className="image6">
          <img className="img-of-about" src={require("../../assets/icons/Mask group (5).png")} />
        </div>
        <div className="image7">
          <img className="img-of-about" src={require("../../assets/icons/Mask group (6).png")} />
        </div>
      </div>
      <div>
        {/* <img src={require('../../assets/icons/')} /> */}
      </div>
      <div className="about-mission">
        <h3 className="mission-heading">Our Mission</h3>
        <p className="mission-para">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
      </div>
    </>
  );
};
export default About;
