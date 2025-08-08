import "./userhistory.css";
import React, { useEffect, useRef } from "react";
import { IoTriangle } from "react-icons/io5";
import Navbar from "../../components/navbar/Navbar";
import HorizontalNav from "../../components/navbar/HorizontalNav";
import { useDispatch, useSelector } from "react-redux";
import { tradeHistoryApi } from "../features/customdata/custAuthentication";
const UserHistory = () => {
  const dispatch = useDispatch();
  const groupByDate = (data) => {
    const grouped = {};
    data.forEach((item) => {
      const date = new Date(item.trade_time).toLocaleDateString("en-GB"); // e.g., "17/06/2025"
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(item);
    });
    return grouped;
  };
  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    if (isMounted.current) dispatch(tradeHistoryApi());
    const interval = setInterval(() => {
      if (isMounted.current) dispatch(tradeHistoryApi());
    }, 30000);
    // Clean up on unmount
    return () => {
      isMounted.current = false;
      clearInterval(interval);
    };
  }, [dispatch]);
  const tradeHistory = useSelector((state) => state?.index?.tradeHistory?.data);
  console.log("trade history ", tradeHistory);
  return (
    <>
      <HorizontalNav />
      <Navbar />
      <div className="userhistory-dataa">
        {Array.isArray(tradeHistory) && tradeHistory.length > 0 ? (
          Object.entries(groupByDate(tradeHistory)).map(([date, trades]) => (
            <div key={date} className="main-div">
              <div id="first-box" className="box" style={{ padding: "20px" }}>
                <div className="managetrading-bottomborder">
                  <p
                    className="box-para"
                    style={{ textDecorationLine: "underline" }}
                  >
                    Trade History - {date}
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
                        <th>Quantity</th>
                        <th>Name</th>
                        <th>Strike</th>
                        <th>Order Type</th>
                        <th>Symbol</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trades.map((item, index) => (
                        <tr key={index}>
                          <td>{item.quantity} Qty</td>
                          <td>{item.name}</td>
                          <td>{parseFloat(item.strike_price) / 100}</td>
                          <td>{item.signal.toUpperCase()}</td>
                          <td>{item.symbol}</td>
                          <td>{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div id="first-box" className="box" style={{ padding: "20px" }}>
            <div className="managetrading-bottomborder">
              <p
                className="box-para"
                style={{ textDecorationLine: "underline" }}
              >
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
                    <th>Quantity</th>
                    <th>Name</th>
                    <th>Order Type</th>
                    <th>Symbol</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center" }}>
                      No records
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default React.memo(UserHistory);