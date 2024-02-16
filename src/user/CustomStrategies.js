import React from "react";
import Select from 'react-select';
import styled from "styled-components";


const option1 = [
  {value: 'Nifty 50' , lable: 'Nifty 50'},
  {value: 'S&P 50' , lable: 'S&P 50'},
  {value: 'S&P 50' , lable: 'S&P 50'},
]

const CustomStrategies = () => {
  return (
    <Wrapper>
      <div>
        <div className="algo-trading-container">
          <h3>Custom Algo-Trading Strategy</h3>
          <div className="customstrategies-flex-select-option">
            <div className="select-container">
              <Select options={option1} isDisabled={false} />
              {/* <select className="custom-select" name="Index" >
              <option>Index</option>
                <option>Nifty 50</option>
                <option>S&P 500</option>
              </select> */}
            </div>

            <div className="select-container">
              <select className="custom-select">
                <option>2024-03-01</option>
                <option>2024-04-01</option>
              </select>
            </div>

            <div className="select-container">
              <select className="custom-select">
                <option>11000</option>
                <option>12000</option>
              </select>
            </div>

            <div className="select-container">
              <select className="custom-select">
                <option>Call Option (CE)</option>
                <option>Put Option (PE)</option>
              </select>
            </div>

            <div className="select-container">
              <select className="custom-select">
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
    border-radius: 10px;
  }

  .customstrategies-flex-select-option {
    display: flex;
    justify-content: space-evenly;
  }

  .custom-select {
    // border: 2px solid rgba(52, 152, 219, 1);
    border-radius: 20px;
    background: linear-gradient(0deg, #60bfff, #ffffff),
      linear-gradient(0deg, rgba(52, 152, 219, 0.2), rgb(92 154 196 / 20%));
      padding: 5px;

  }
`;

export default CustomStrategies;
