import "./about.css";
import React, { useState } from "react";
import Mainnav from "../../components/navbar/Mainnav";
import { aboutcardData } from "../../arraydata/Arraydata";
import Testimonial from "../../components/testinomial/Testimonial";
import Footer from "../../components/footer/Footer";

const About = () => {
  const [hover, setHover] = useState(false);

  const onHover = (e) => {
    e.preventDefault();
    setHover(true); // turn true
  };

  const onHoverOver = (e) => {
    e.preventDefault(); // turn false
    setHover(false);
  };

  return (
    <>
      <Mainnav />
      <div className="about-firstdiv">
        <h2 className="about-heading">Trade Smarter. Live Free </h2>
        <p className="about-para">
          Say goodbye to trading stress with our expert strategies, liberating
          you to enjoy life while your investments work for you.
        </p>
      </div>
      <div className="about-images">
        <div className="image1">
          <img
            className="img-of-about"
            src={require("../../assets/icons/Mask group.png")}
          />
        </div>
        <div className="image2">
          <img
            className="img-of-about"
            src={require("../../assets/icons/Mask group (1).png")}
          />
        </div>
        <div className="image3">
          <img
            className="img-of-about"
            src={require("../../assets/icons/Mask group (2).png")}
          />
        </div>
        <div className="image4">
          <img
            className="img-of-about"
            src={require("../../assets/icons/Mask group (3).png")}
          />
        </div>
        <div className="image5">
          <img
            className="img-of-about"
            src={require("../../assets/icons/Mask group (4).png")}
          />
        </div>
        <div className="image6">
          <img
            className="img-of-about"
            src={require("../../assets/icons/Mask group (5).png")}
          />
        </div>
        <div className="image7">
          <img
            className="img-of-about"
            src={require("../../assets/icons/Mask group (6).png")}
          />
        </div>
      </div>
      <div>{/* <img src={require('../../assets/icons/')} /> */}</div>
      <div className="about-mission">
        <h3 className="mission-heading">Our Mission</h3>
        <p className="mission-para">
        At AlgoToday, we are committed to transforming the trading landscape through advanced algorithmic solutions that eliminate the emotional biases inherent in human decision-making. Our platform empowers investors to pursue consistent growth with intelligent compounding strategies, allowing them to focus on long-term financial objectives with confidence.
        </p>
      </div>
      <div className="card-data-about">
        {aboutcardData?.map((item) => (
          <>
            <div className="main-carddiv">
              <div className="carddiv-h3">
                <h3 className="h3-text">{item.text1}</h3>
              </div>
              <div className="carddiv-para">
                <p className="para-text">{item.para1}</p>
              </div>
            </div>
          </>
        ))}
      </div>
      <div className="about-team-div">
        <div className="about-content">
          <h3 className="about-h3">Precision Through Data-Driven Insights*</h3>
          <p className="about-para">
            Navigate the markets with confidence using our algorithmic trading
            platform, where precision meets performance. Empower your financial
            journey with data-driven decisions and seamless execution
          </p>
        </div>
        <div className="team-image">
          {/* <div className="team-img">
            <img
              className="people-img"
              src={require("../../assets/icons/1.png")}
            />
          </div>
          <div className="team-img">
            <img
              className="people-img"
              src={require("../../assets/icons/1.png")}
            />
          </div> */}
          <div className="team-img">
            <img
              className="people-img"
              src={require("../../assets/icons/3.png")}
            />
          </div>
          <div className="team-img">
            {/* {hover && (
              <div className="hover-divv">
                <p className="waanshowtext">She is the CEO</p>
              </div>
            )} */}
            <img
              onMouseEnter={(e) => onHover(e)}
              onMouseLeave={(e) => onHoverOver(e)}
              className="people-img"
              src={require("../../assets/icons/4.png")}
            />
          </div>
          <div className="team-img">
            <img
              className="people-img"
              src={require("../../assets/icons/5.png")}
            />
          </div>
          <div className="team-img">
            <img
              className="people-img"
              src={require("../../assets/icons/6.png")}
            />
          </div>
          {/* <div className="team-img">
            <img
              className="people-img"
              src={require("../../assets/icons/1.png")}
            />
          </div> */}
        </div>
      </div>
      <Testimonial />
      <div style={{ marginTop: "20px" }}>
        <Footer />
      </div>
    </>
  );
};
export default React.memo(About);
