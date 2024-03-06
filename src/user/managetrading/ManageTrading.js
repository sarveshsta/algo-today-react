import React from "react";
import styled from "styled-components";
import { IoTriangle } from "react-icons/io5";
import Navbar from "../../components/navbar/Navbar";
import HorizontalNav from "../../components/navbar/HorizontalNav";

const ManageTrading = () => {
  return (
    <Wrapper>
      <HorizontalNav />
      <Navbar />
      <div className="app-container">
        <div id="first-box" className="box" style={{ padding: "20px" }}>
          <p className="box-para">Active Position <div className="green-point"></div> </p> 
          <div className="text-container">
            <div className="text-first-div">
              <div className="left-text">75 Qty</div>
              <div className="left-text" style={{ fontWeight: "500" }}>
                NIFTY JAN 14700 CE
              </div>
              <div className="left-text">NFO Avg 19.20</div>
            </div>
            <div className="text-second-div">
              <div
                id="nrml"
                className="right-text"
                style={{ background: "rgba(236, 240, 240, 1)" }}
              >
                NRML
              </div>

              <div
                className="right-text"
                style={{ color: "rgba(39, 174, 96, 1)" }}
              >
                <IoTriangle /> 10,00.29
              </div>

              <div className="right-text">LTP 18.65</div>
            </div>
          </div>

          <div className="button-container">
            <button className="first-btn">Current Status</button>
            <span className="spacer"></span>
            <button className="second-btn">Exit Trade</button>
            <span className="spacer"></span>
            <p className="btn-wala-para">Stop Algoo</p>
          </div>
        </div>
        <div id="second-box" className="box" style={{ padding: "20px" }}> 
          <div className="text-container">
            <div className="text-first-div">
              <div className="left-text">75 Qty</div>
              <div className="left-text" style={{ fontWeight: "500" }}>
                NIFTY JAN 14700 CE
              </div>
              <div className="left-text">NFO Avg 19.20</div>
            </div>
            <div className="text-second-div">
              <div
                id="nrml"
                className="right-text"
                style={{ background: "rgba(236, 240, 240, 1)" }}
              >
                NRML
              </div>

              <div
                className="right-text"
                style={{ color: "rgba(39, 174, 96, 1)" }}
              >
                <IoTriangle /> 10,00.29
              </div>

              <div className="right-text">LTP 18.65</div>
            </div>
          </div>

          <div className="button-container">
            <button className="first-btn">Current Status</button>
            <span className="spacer"></span>
            <button className="second-btn">Exit Trade</button>
            <span className="spacer"></span>
            <p className="btn-wala-para">Stop Algoo</p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .app-container {
    margin-left: 17%;
    // box-shadow: 0px 43px 95px 0px rgba(41, 41, 41, 0.1);
    box-shadow: 0px 0px 137px 145px rgba(92, 63, 45, 0.1);
    border-radius: 30px;
    margin-top: 3rem;
    margin-right: 1%;
    // height: 100vh;
  }

  .box {
    width: -webkit-fill-available;
    margin: 20px;
    padding: 20px;
    border-bottom: 1px solid rgba(217, 217, 217, 1);
  }

  #second-box{
    margin-bottom: 1rem;
  }

  .box-para {
    font-size: 37px;
    font-weight: 500;
    letter-spacing: 4px;
    display: flex;
  }

  .text-container {
    display: flex;
    flex-direction: column;
  }

  .left-text {
    font-size: 16px;
    font-weight: 400;
    line-height: 41px;
    letter-spacing: 0em;
  }

  .right-text {
    font-size: 16px;
    font-weight: 500;
    line-height: 41px;
    letter-spacing: 0em;
    text-align: left;
  }

  .left-text,
  .right-text {
    text-align: center; /* Center text on all screen sizes */
  }

  .button-container {
    display: flex;
    flex-direction: column; /* Stack buttons and text on small screens */
    margin-top: 30px;
    .first-btn {
      border-radius: 100px;
      border: 2px solid rgba(52, 152, 219, 1);
      background: rgba(52, 152, 219, 1);
      width: 30%;
      color: white;
      margin-right: 1rem;
    }
    .second-btn {
      border-radius: 100px;
      border: 2px solid rgba(52, 152, 219, 1);
      width: 30%;
      color: rgba(52, 152, 219, 1);
      background: none;
    }
    .btn-wala-para {
      font-size: 18px;
      font-weight: 600;
      line-height: 36px;
      letter-spacing: 0em;
      color: rgba(52, 152, 219, 1);
      text-align: right;
      margin: 0px;
      margin-left: 8rem;
      text-decoration: underline;
    }
  }

  .text-first-div {
    display: flex;
    width: 45%;
    justify-content: space-between;
  }

  .text-second-div {
    display: flex;
    width: 30%;
    justify-content: space-between;
  }

  #nrml {
    padding: 1px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 500;
    line-height: 41px;
    letter-spacing: 1px;
  }

  .green-point{
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50px;
    background: linear-gradient(0deg, #27AE60, #27AE60),linear-gradient(0deg, #ECF0F0, #ECF0F0);
    align-self: center;
    margin-top: 0.8rem;
    margin-left: 1rem;
  }

  @media (min-width: 600px) {
    /* Adjust styles for screens wider than 600px */
    .box {
      // width: 60%;
    }

    .text-container {
      flex-direction: row;
      justify-content: space-between;
    }

    .left-text,
    .right-text {
      text-align: left;
    }

    .button-container {
      flex-direction: row;
    }
  }
`;

export default React.memo(ManageTrading);
