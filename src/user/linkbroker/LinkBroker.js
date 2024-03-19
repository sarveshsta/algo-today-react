import React from "react";
import "./linkbroker.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import HorizontalNav from "../../components/navbar/HorizontalNav";

const LinkBroker = () => {
  return (
    <div>
      <HorizontalNav />
      <Navbar />
      <div className="container" id="linkbroker-main-container">
        <div className="row" id="linkbroker-row-div">
          <div id="row-box-1" className="box">
            <div className="headng-div">
              <h3 className="box-h3">Link your Broker Account with Zerodha</h3>
            </div>
            <div>
              <img
                className="box1-img"
                src={require("../../assets/Group.png")}
                alt="Zerodha logo"
              />
            </div>
            <div>
              <img
                className="box1-img"
                src={require("../../assets/Group (1).png")}
                alt="Zerodha"
              />
            </div>
            <div className="box-btnn-div">
              <button type="button" id="link-btn1" className="btn btn-primary">
                Setup
              </button>
            </div>
          </div>

          <div id="row-box-3" className="box">
            <div className="headng-div">
              <h3 className="box-h3">Link your Broker Account with Zerodha</h3>{" "}
            </div>
            <div>
              <img
                className="box2-img"
                src={require("../../assets/Group.png")}
                alt="Zerodha logo"
              />
            </div>
            <div>
              <img
                className="box2-img"
                src={require("../../assets/Group (1).png")}
                alt="Zerodha"
              />
            </div>
            <div className="box-btnn-div">
              <Link to="https://smartapi.angelbroking.com/publisher-login?api_key=p1X1tdVU">
                <button type="button" className="btn btn-primary">
                  Setup
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="row">
          <div id="row2-box-1" className="box">
            <div className="headng-div">
              <h3 className="box-h3">
                Link your Broker Account with{" "}
                <span className="angle">Angel</span>
                <span className="one">One</span>
              </h3>
            </div>
            <img
              className="box3-img"
              src={require("../../assets/angel-one-logos-id-Z21xHlt.png")}
              alt="Zerodha logo"
            />
            <div id="boxbtndivid1" className="box-btnn-div">
              <button id="boxbtn-id" type="button" className="btn btn-primary">
                Setup
              </button>
            </div>
          </div>

          <div id="row2-box-2" className="box">
            <div className="headng-div">
              <h3 className="box-h3">
                Link your Broker Account with{" "}
                <span className="angle">Angel</span>
                <span className="one">One</span>
              </h3>{" "}
            </div>
            <img
              className="box4-img"
              src={require("../../assets/angel-one-logos-id-Z21xHlt.png")}
              alt="Zerodha logo"
            />
            <div id="boxbtndivid2" className="box-btnn-div">
              <button id="boxbtn-id2" type="button" className="btn btn-primary">
                Setup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(LinkBroker);
