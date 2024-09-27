import "./userhistory.css";
import React, { useEffect } from "react";
import { IoTriangle } from "react-icons/io5";
import Navbar from "../../components/navbar/Navbar";
import HorizontalNav from "../../components/navbar/HorizontalNav";
import { useDispatch, useSelector } from "react-redux";
import { tradeHistoryApi } from "../features/customdata/custAuthentication";

const UserHistory = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tradeHistoryApi());
  }, []);

  const tradeHistory = useSelector((state) => state?.index?.tradeHistory);

  return (
    <>
      <HorizontalNav />
      <Navbar />
      <div className="userhistory-dataa">
        <div id="first-box" className="box" style={{ padding: "20px" }}>
          <div className="managetrading-bottomborder">
            <p className="box-para" style={{ textDecorationLine: "underline" }}>
              Trade History
            </p>
            <table
              border="1"
              style={{
                borderCollapse: "collapse",
                width: "100%",
                border: "none",
              }}
            >
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Quantity</th>
                  <th>Symbol</th>
                  <th>Order Type</th>
                  <th>Expiry</th>
                  <th>Change</th>
                  <th>LTP</th>
                </tr>
              </thead>
              <tbody>
                {tradeHistory && tradeHistory?.length > 0 ? (
                  tradeHistory?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.token.lotsize}Qty</td>
                        <td>{item.token.name}</td>
                        <td>{item.signal.toUpperCase()}</td>
                        <td>{item.token.expiry}</td>
                        <td>
                          <IoTriangle /> 10,00.29
                        </td>
                        <td>LTP 18.65</td>
                      </tr>
                    );
                  })
                ) : (
                  // Show this row when tradeHistory is empty or undefined
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center" }}>
                      No records
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="userhistory-dataa">
        <div id="first-box" className="box" style={{ padding: "20px" }}>
          <div className="managetrading-bottomborder">
            <p className="box-para">
              Closed Position <div className="blue-point"></div>{" "}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(UserHistory);
