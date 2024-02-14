import React from "react";
import styled from "styled-components";

const CustomStrategies = () => {
  return (
    <Wrapper>
      <div>
        <div className="algo-trading-container">
          <h3>Custom Algo-Trading Strategy</h3>
 <div className="customstrategies-flex-select-option">
          <div className="select-container">
            <select>
              <option>Nifty 50</option>
              <option>S&P 500</option>
            </select>
          </div>

          <div className="select-container">
            <select>
              <option>2024-03-01</option>
              <option>2024-04-01</option>
            </select>
          </div>

          <div className="select-container">
            <select>
              <option>11000</option>
              <option>12000</option>
            </select>
          </div>

          <div className="select-container">
            <select>
              <option>Call Option (CE)</option>
              <option>Put Option (PE)</option>
            </select>
          </div>

          <div className="select-container">
            <select>
              <option>1 Hour</option>
              <option>4 Hours</option>
            </select>
          </div>
        </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .algo-trading-container {
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }

  .label-container {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }

  .label-container label {
    margin-right: 10px;
  }

  .select-container {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }

  .customstrategies-flex-select-option{
    
  }
`;

export default CustomStrategies;
