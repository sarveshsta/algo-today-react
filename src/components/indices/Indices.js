import React, { useEffect, useState } from "react";
import "./indices.css";

const Indices = () => {

  const [stockData, setStockData] = useState(null);
  const wsURL = "wss://9f36-2405-201-302a-d836-8112-7fa4-2a80-f129.ngrok-free.app/strategy/live_strategy_data";

  useEffect(() => {
    const ws = new WebSocket(wsURL);

    ws.onopen = () => {
      console.log("Connected to WebSocket");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStockData(data);
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error: ", error);
    };

    ws.onclose = () => {
      console.log("WebSocket Disconnected");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="StockIndex">
      <div className="Nifty50">
        <h1 className="heading">NIFTY 50</h1>
        <h3 className="subhead">20,133.15</h3>
        <h4 className="change">36.55(0.18%)</h4>
      </div>
      <div className="Sensex">
        <h1 className="heading">SENSEX</h1>
        <h3 className="subhead">20,133.15</h3>
        <h4 className="change">36.55(0.18%)</h4>
      </div>
      <div className="Nifty50">
        <h1 className="heading">NIFTY 50</h1>
        <h3 className="subhead">20,133.15</h3>
        <h4 className="change">36.55(0.18%)</h4>
      </div>
      <div className="Sensex">
        <h1 className="heading">SENSEX</h1>
        <h3 className="subhead">20,133.15</h3>
        <h4 className="change">36.55(0.18%)</h4>
      </div>
      <div className="Nifty50">
        <h1 className="heading">NIFTY 50</h1>
        <h3 className="subhead">20,133.15</h3>
        <h4 className="change">36.55(0.18%)</h4>
      </div>
      <div className="Sensex">
        <h1 className="heading">SENSEX</h1>
        <h3 className="subhead">20,133.15</h3>
        <h4 className="change">36.55(0.18%)</h4>
      </div>
    </div>
  );
};

export default React.memo(Indices);
