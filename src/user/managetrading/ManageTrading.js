import React, { useEffect, useState } from "react";
import "./managetrrading.css";
import { IoTriangle } from "react-icons/io5";
import Navbar from "../../components/navbar/Navbar";
import HorizontalNav from "../../components/navbar/HorizontalNav";
import { useDispatch } from "react-redux";
import {
  managetradingApi,
  stopStrategy,
} from "./../features/customdata/custAuthentication";

const BACKEND_URL = process.env.REACT_APP_FAST_BACKEND_URL;

const ManageTrading = () => {
  const [trades, setTrades] = useState([]);
  const [dayPnl, setDayPnl] = useState(0);
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await dispatch(managetradingApi({})).unwrap();

        // New response shape: { success, data: { day_profit_and_loss, result: [] } }
        if (response?.success) {
          const payload = response?.data;
          // Prefer new structure
          if (payload && Array.isArray(payload?.result)) {
            setTrades(payload.result);
            if (typeof payload?.day_profit_and_loss === "number") {
              setDayPnl(payload.day_profit_and_loss);
            }
          } else if (Array.isArray(response?.data)) {
            // Backward compatibility
            setTrades(response.data);
          } else {
            setTrades([]);
          }
        } else {
          setTrades([]);
        }
      } catch (error) {
        console.error("Failed to fetch trades:", error);
        setTrades([]);
      }
    };

    // Fetch trades immediately on mount
    fetchTrades();

    const ws = new WebSocket(`${BACKEND_URL}/ws/logs`);

    ws.onopen = () => {
      setIsConnected(true);
      setConnectionStatus("Connected");
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      console.log("event data", event.data);

      try {
        const message = JSON.parse(event.data);

        if (message.key === "TRADE_SAVED") {
          console.log("TRADE_SAVED event detected → calling fetchTrades");
          fetchTrades();
        }
      } catch (err) {
        // Non-JSON message (just log output or debug text)
        console.log("Non-JSON message:", event.data);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsConnected(false);
      setConnectionStatus("Connection Error");
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
      setIsConnected(false);
      setConnectionStatus("Disconnected");
    };

    return () => {
      ws.close();
    };
  }, [dispatch]);

  const handleStopStrategy = (strategyId) => {
    dispatch(stopStrategy(strategyId));
  };

  return (
    <div>
      <HorizontalNav />
      <Navbar />
      <div className="app-container">
        <div id="first-box" className="box managetrading-main-box">
          <div className="managetrading-bottomborder">
            <p className="box-para">
              Active Position <span className="green-point"></span>
            </p>

            {/* Top badge for today's total PnL */}
            <div className="top-profit-bar">
              <div
                className={`today-profit-badge ${dayPnl >= 0 ? "profit-positive" : "profit-negative"}`}
                aria-label="Today's Profit and Loss"
                title="Today's Profit and Loss"
              >
                <span>Today PnL:</span>
                <span className="profit-value">
                  <IoTriangle
                    style={{
                      transform: dayPnl >= 0 ? "rotate(0deg)" : "rotate(180deg)",
                    }}
                  />
                  {Number(dayPnl || 0).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Header Row */}
            {trades.length > 0 && (
              <div className="managetrading-header-row">
                <div className="text-first-div">
                  <div className="left-text">Qty</div>
                  <div className="left-text">Symbol</div>
                  <div className="left-text">Trade Type</div>
                </div>
                <div className="text-second-div">
                  <div className="right-text">Order Type</div>
                  <div className="right-text">PnL</div>
                  <div className="right-text">LTP</div>
                </div>
              </div>
            )}

            {trades.length === 0 ? (
              <div className="no-trades-message">
                No trades found for the user.
              </div>
            ) : (
              trades.map((trade, index) => (
                <div
                  className="managetrading-bottomborder managetrading-row"
                  key={trade.id}
                >
                  <div className="text-container">
                    <div className="text-first-div">
                      <div className="left-text">{trade.quantity}</div>
                      <div className="left-text left-text-symbol">
                        {trade.symbol}
                      </div>
                      <div className="left-text">
                        {trade.trade_type || "N/A"}
                      </div>
                    </div>
                    <div className="text-second-div">
                      <div
                        id="nrml"
                        className="right-text right-text-order-type"
                      >
                        {trade.order_type}
                      </div>
                      <div
                        className={`right-text right-text-pnl ${trade.pnl >= 0 ? "pnl-positive" : "pnl-negative"}`}
                      >
                        <IoTriangle
                          style={{
                            transform:
                              trade.pnl >= 0
                                ? "rotate(0deg)"
                                : "rotate(180deg)",
                          }}
                        />{" "}
                        {trade.pnl.toFixed(2)}
                      </div>
                      <div className="right-text right-text-ltp">
                        {trade.ltp}
                      </div>
                    </div>
                  </div>

                  {/* Only show buttons for the most recent trade */}
                  {index === 0 && (
                    <div className="button-container modern-btn-container">
                      <button className="first-btn">Current Status</button>
                      <button className="second-btn">Exit Trade</button>
                      <button
                        className="modern-btn primary-btn"
                        onClick={() => handleStopStrategy(trade.strategy_id)}
                      >
                        Stop Algoo
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ManageTrading);
