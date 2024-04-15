import React from "react";
import "./managetrrading.css";
import { IoTriangle } from "react-icons/io5";
import Navbar from "../../components/navbar/Navbar";
import HorizontalNav from "../../components/navbar/HorizontalNav";

const ManageTrading = () => {
  return (
    <div>
      <HorizontalNav />
      <Navbar />
      <div className="app-container">
        <div id="first-box" className="box" style={{ padding: "20px" }}>
         <div className="managetrading-bottomborder">
         <p className="box-para">
            Active Position <div className="green-point"></div>{" "}
          </p>
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
          <div className="managetrading-bottomborder">
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
        </div>
        {/* <div id="second-box" className="box" style={{ padding: "20px" }}> */}
         
      {/* </div> */}
    </div>
  );
};
export default React.memo(ManageTrading);
