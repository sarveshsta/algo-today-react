import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import HorizontalNav from "../components/navbar/HorizontalNav";

const Wrapper = styled.div`
  .container {
    ${"" /* border: 2px solid; */}
    ${"" /* padding: 92px; */}
    width: auto;
    margin-left: 17%;
    height: 86vh;
    display: flex;
    display: -webkit-flex;
    margin-top: 15px;
    text-align: center;
  }
  ,
  .row {
    ${"" /* border: 2px solid; */}
    padding: 40px;
    width: -webkit-fill-available;
    /* height: max-content; */
    margin: 0;
  }
  ,
  .box {
    position: relative;
    border-radius: 1.875rem;
    background: #fff;
    box-shadow: 0px 43px 95px 0px rgba(41, 41, 41, 0.1),
      0px 173px 173px 0px rgba(41, 41, 41, 0.09),
      0px 388px 233px 0px rgba(41, 41, 41, 0.05),
      1px 690px 276px 0px rgba(41, 41, 41, 0.01),
      1px 1078px 302px 0px rgba(41, 41, 41, 0);
    margin-bottom: 10px;
  }
  ,
  .headng-div {
    ${"" /* border: 2px solid; */}
    margin-top: 14px;
    border-radius: inherit;
  }
  ,
  .box-h3 {
    text-align: center;
    font-family: Roboto;
    font-size: 1.3rem;
    font-style: normal;
    font-weight: 400;
    margin: 0;
  },
  img.box1-img {
    position: relative;
    top: 4vh;
},
.box-btnn-div {
    border-radius: inherit;
    position: relative;
    top: 14vh;
},
button.btn.btn-primary {
    border-radius: 13px;
},
img.box2-img {
    position: relative;
    top: 4vh;
},
img.box3-img {
    position: relative;
    top: 4vh;
},
img.box4-img {
    position: relative;
    top: 4vh;
},
#row-box-3 {
    border-radius: 1.25rem;
    background: rgba(255, 255, 255, 0.01);
    box-shadow: 0px 1px 40px 0px rgba(52, 152, 219, 0.20) inset, 0px 4px 18px 0px #3498DB inset, 0px 98px 100px -48px rgba(52, 152, 219, 0.30) inset, 0px -82px 68px -64px rgba(52, 152, 219, 0.30) inset, 0px 11px 10.9px -4px #FFF inset, 0px 39px 56px -36px rgba(255, 255, 255, 0.50) inset;
    backdrop-filter: blur(50px);
},
#row2-box-2 {
    border-radius: 1.25rem;
    background: rgba(255, 255, 255, 0.01);
    box-shadow: 0px 1px 40px 0px rgba(52, 152, 219, 0.20) inset, 0px 4px 18px 0px #3498DB inset, 0px 98px 100px -48px rgba(52, 152, 219, 0.30) inset, 0px -82px 68px -64px rgba(52, 152, 219, 0.30) inset, 0px 11px 10.9px -4px #FFF inset, 0px 39px 56px -36px rgba(255, 255, 255, 0.50) inset;
    backdrop-filter: blur(50px);
},
#boxbtndivid1 {
    position: relative;
    top: 10.2vh;
},
#boxbtndivid2 {
    position: relative;
    top: 10.2vh;
},

.btn.btn-primary:before,
.btn.btn-primary:after {
    width: 4.4em;
    height: 2.95em;
    position: absolute;
    content: "";
    display: inline-block;
    background: var(--color);
    border-radius: 50%;
    transition: transform 1s ease;
    transform: scale(0);
    z-index: -1;
}

.btn.btn-primary:before {
    top: -25%;
    left: 20%;
}

.btn.btn-primary:after {
    bottom: -25%;
    right: 20%;
}

.btn.btn-primary:hover:before,
.btn.btn-primary:hover:after {
    transform: none;
}

`;

const LinkBroker = () => {
  return (
    <Wrapper>
      <HorizontalNav />
      <Navbar />
      <div className="container">
        <div className="row">
          <div id="row-box-1" className="box">
            <div className="headng-div">
              <h3 className="box-h3">Link your Broker Account with Zerodha</h3>
            </div>
            <img
              className="box1-img"
              src={require("../assets/Group.png")}
              alt="Zerodha logo"
            />
            <img
              className="box1-img"
              src={require("../assets/Group (1).png")}
              alt="Zerodha"
            />
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
            <img
              className="box2-img"
              src={require("../assets/Group.png")}
              alt="Zerodha logo"
            />
            <img
              className="box2-img"
              src={require("../assets/Group (1).png")}
              alt="Zerodha"
            />
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
              </h3>{" "}
            </div>
            <img
              className="box3-img"
              src={require("../assets/angel-one-logos-id-Z21xHlt.png")}
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
              src={require("../assets/angel-one-logos-id-Z21xHlt.png")}
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
    </Wrapper>
  );
};

export default React.memo(LinkBroker);
