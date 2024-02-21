import React, { useState } from "react";
import Select from "react-select";
import styled from "styled-components";
import Shape from "../components/shape/Shape";
import Navbar from "../components/navbar/Navbar";
import HorizontalNav from "../components/navbar/HorizontalNav";

const option1 = [
  { value: "index", label: "index" },
  { value: "Nifty 50", label: "Nifty 50" },
  { value: "S&P 50", label: "S&P 50" },
  { value: "S&P 50", label: "S&P 50" },
];

const option2 = [
  { value: "Expiry Date", label: "Expiry Date" },
  { value: "Nifty 50", label: "Nifty 50" },
  { value: "S&P 50", label: "S&P 50" },
  { value: "S&P 50", label: "S&P 50" },
];

const option3 = [
  { value: "Strike Price", label: "Strike Price" },
  { value: "Nifty 50", label: "Nifty 50" },
  { value: "S&P 50", label: "S&P 50" },
  { value: "S&P 50", label: "S&P 50" },
];

const option4 = [
  { value: "CE / PE", label: "CE / PE" },
  { value: "Nifty 50", label: "Nifty 50" },
  { value: "S&P 50", label: "S&P 50" },
  { value: "S&P 50", label: "S&P 50" },
];

const option5 = [
  { value: "Chart Time", label: "Chart Time" },
  { value: "Nifty 50", label: "Nifty 50" },
  { value: "S&P 50", label: "S&P 50" },
  { value: "S&P 50", label: "S&P 50" },
];

const autoData = [
  { value: "Auto Start Date", label: "Auto Start Date" },
  { value: "Auto Stop Date", label: "Auto Stop Date" },
];

const custStyle = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#ff00ff" : "#ffd1dc",
    color: "white",
    padding: 20,
    border: state.isSelected ? "2px solid #32CD32" : "1px solid #0000ff",
    "&:hover": {
      // backgroundColor: "#7fffd4",
      color: "#0000ff",
    },
  }),

  control: (provided) => ({
    ...provided,
    // minHeight: 50,
    textAlign: "center",
    backgroundColor: "#3498DB",
    borderRadius: 25,
    // border: "2px solid #ff00ff",
    // fontSize: 20,
    "&:hover": {
      borderColor: "#7fffd4",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
    fontSize: 20,
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "white",
    fontSize: 20,
  }),
};

const CustomStrategies = () => {
  const [selectedInput, setSelectedInput] = useState([
    option1,
    option2,
    option3,
    option4,
    option5,
  ]);
  const [checkedCheckBox, setCheckedCheckBox] = useState(false);

  const handleSubmit = (changeinput) => {
    setSelectedInput(changeinput);
  };

  const checkBoxChange = () => {
    setCheckedCheckBox(!checkedCheckBox);
  };

  const submitButton = () => {
    console.log("selected", checkedCheckBox);
  };

  return (
    <Wrapper>
      <HorizontalNav />
      <Navbar />
      {/* <Shape/> */}
      <div className="customstrategies-main-container">
        <div className="algo-trading-container">
          <h3>Custom Algo-Trading Strategy</h3>
          <div className="customstrategies-flex-select-option">
            <div className="select-container">
              <Select
                options={option1}
                value={selectedInput[0]}
                styles={custStyle}
                onChange={handleSubmit}
              />
            </div>

            <div className="select-container">
              <Select
                options={option2}
                value={selectedInput[1]}
                styles={custStyle}
                onChange={handleSubmit}
              />
            </div>

            <div className="select-container">
              <Select
                options={option3}
                value={selectedInput[2]}
                styles={custStyle}
                onChange={handleSubmit}
              />
            </div>

            <div className="select-container">
              <Select
                options={option4}
                value={selectedInput[3]}
                styles={custStyle}
                onChange={handleSubmit}
              />
            </div>

            <div className="select-container">
              <Select
                options={option5}
                value={selectedInput[4]}
                styles={custStyle}
                onChange={handleSubmit}
              />
            </div>
          </div>
        </div>
        <div className="cust-input-second">
          <input
            className="cust-inputbtn"
            type="text"
            placeholder="No. of shares/Amount"
          />
          <Select options={autoData} value={autoData} styles={custStyle} />
          <Select options={autoData} value={autoData} styles={custStyle} />
        </div>
        <div className="cust-input-second">
          <input
            className="cust-inputbtn"
            type="text"
            placeholder="No. of shares/Amount"
          />
          <Select options={autoData} value={autoData} styles={custStyle} />
          <Select options={autoData} value={autoData} styles={custStyle} />
        </div>
      </div>

      <div className="buying-pre-condition-main">
        <div className="buying-pre-condition-firstdiv">
          <h2 className="bpc-firstdiv-h2">Buying Pre Conditions</h2>
          <div className="checkbox-div-buy">
            <div className="checkbox-wrapper-13">
              <input
                id="c1-13"
                type="checkbox"
                onChange={checkBoxChange}
                value={checkedCheckBox}
              />
              <label className="checkbox-label" for="c1-13">
                Candle OHLC Compare
              </label>
            </div>
            <div className="checkbox-wrapper-13">
              <input id="c1-13" type="checkbox" />
              <label className="checkbox-label" for="c1-13">
                Single Indicator
              </label>
            </div>
            <div className="checkbox-wrapper-13">
              <input id="c1-13" type="checkbox" />
              <label className="checkbox-label" for="c1-13">
                LTP + Candle OHLC
              </label>
            </div>
            <div className="checkbox-wrapper-13">
              <input id="c1-13" type="checkbox" />
              <label className="checkbox-label" for="c1-13">
                Compare 2 Indicators
              </label>
            </div>
          </div>

          <div className="buy-condition-btn">
            <button
              type="button"
              id="buy-btn1"
              className="btn btn-primary"
              onClick={submitButton}
            >
              Submit
            </button>
            <button type="button" id="buy-btn2" class="btn">
              Add
            </button>
          </div>
        </div>

        <div className="buying-pre-condition-seconddiv">
          <h2> Buying Value</h2>
          <input
            className="cust-inputbtn"
            type="text"
            placeholder="Enter LTP"
          />
        </div>
      </div>

      <div className="buying-pre-condition-main">
        <div className="buying-pre-condition-firstdiv">
          <h2 className="bpc-firstdiv-h2">Selling Pre Conditions</h2>
          <div className="checkbox-div-buy">
            <div className="checkbox-wrapper-13">
              <input id="c1-13" type="checkbox" />
              <label className="checkbox-label" for="c1-13">
                Candle OHLC Compare
              </label>
            </div>
            <div className="checkbox-wrapper-13">
              <input id="c1-13" type="checkbox" />
              <label className="checkbox-label" for="c1-13">
                Single Indicator
              </label>
            </div>
            <div className="checkbox-wrapper-13">
              <input id="c1-13" type="checkbox" />
              <label className="checkbox-label" for="c1-13">
                LTP + Candle OHLC
              </label>
            </div>
            <div className="checkbox-wrapper-13">
              <input id="c1-13" type="checkbox" />
              <label className="checkbox-label" for="c1-13">
                Compare 2 Indicators
              </label>
            </div>
          </div>

          <div className="buy-condition-btn">
            <button type="button" id="buy-btn1" className="btn btn-primary">
              Submit
            </button>
            <button type="button" id="buy-btn2" className="btn">
              Add
            </button>
          </div>
        </div>

        <div className="buying-pre-condition-seconddiv">
          <h2> selling Value</h2>
          <input
            className="cust-inputbtn"
            type="text"
            placeholder="Enter LTP"
          />
        </div>
      </div>

      <div className="buying-pre-condition-thirddiv">
        <div className="thirdddiv">
          <input
            className="cust-inputbtn"
            type="text"
            placeholder="Enter LTP"
          />
          <input
            className="cust-inputbtn"
            type="text"
            placeholder="Enter LTP"
          />
        </div>
        <div className="thirdddiv-btnn">
          <button type="button" id="thirdddiv-btnn1" className="btn btn-primary">
            Start Amount Trading
          </button>
          <button type="button" id="thirdddiv-btnn2" className="btn">
            Start Paper Trading
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .customstrategies-main-container {
    box-shadow: 0px 28px 62px 0px #0000001a;
    border-radius: 8px;
    text-align: center;
    margin-left: 16%;
    margin-top: 1rem;
  }

  ,
  .algo-trading-container {
    // padding: 20px;
    margin-bottom: 1rem;
  }

  ,
  .label-container {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }

  ,
  .label-container label {
    margin-right: 10px;
  }

  ,
  .select-container {
    display: flex;
    align-items: center;
    margin-top: 10px;
    border-radius: 10px;
  }

  ,
  .customstrategies-flex-select-option {
    display: flex;
    // justify-content: space-evenly;
    margin-top: 2rem;
    margin-left: 5px;
  }

  ,
  .custom-select {
    // border: 2px solid rgba(52, 152, 219, 1);
    border-radius: 20px;
    // background: linear-gradient(0deg, #60bfff, #ffffff),
    //   linear-gradient(0deg, rgba(52, 152, 219, 0.2), rgb(92 154 196 / 20%));
    padding: 5px;
  }

  ,
  .cust-input-second {
    display: flex;
    // justify-content: space-evenly;
    margin-bottom: 1rem;
    margin-left: 5px;
  }
  ,
  .cust-inputbtn {
    padding: 10px;
    border-radius: 31px;
    border: 1px solid #3498db;
    color: #3498db;
  }

  ,
  .buying-pre-condition-main {
    display: flex;
    margin-left: 16%;
    margin-top: 2rem;
    // text-align: center;
  }

  ,
  .bpc-firstdiv-h2 {
    line-height: 2;
  }

  .buying-pre-condition-firstdiv {
    width: 50%;
    box-shadow: 0px 43px 95px 0px #2929291a;
    border-radius: 30px;
    margin-right: 1rem;
    padding: 2rem;
  }

  ,
  .buying-pre-condition-seconddiv {
    width: 50%;
    box-shadow: 0px 43px 95px 0px #2929291a;
    border-radius: 30px;
    padding: 1rem;
  }

  ,
  .checkbox-div-buy {
    display: grid;
    grid-template-columns: repeat(2, auto);
    row-gap: 17%;
  }

  ,
  .buy-condition-btn {
    margin-top: 1.5rem;

    #buy-btn1 {
      margin-right: 1rem;
      border: 1px solid #3498db;
      border-radius: 31px;
    }
    #buy-btn2 {
      margin-right: 1rem;
      border: 1px solid #3498db;
      border-radius: 31px;
    }
  }

  ,
  .buying-pre-condition-thirddiv {
    margin-left: 17%;
    margin-top: 2rem;

    .thirdddiv {
      display: flex;
      justify-content: space-between;
      box-shadow: 0px 43px 95px 0px #2929291a;
      width: 50%;
    }

    .thirdddiv-btnn {
      display: flex;
      margin-top: 1rem;

      #thirdddiv-btnn1 {
        width: 50%;
        margin-right: 2rem;
        border: 2px solid #3498db;
        border-radius: 100px;
      }
      #thirdddiv-btnn2 {
        width: 50%;
        border: 2px solid #3498db;
        border-radius: 100px;
      }
    }
  }

  .css-15e68av-control {
    border-color: none;
  }

  .checkbox-wrapper-13 input[type="checkbox"] {
    --active: #275efe;
    --active-inner: #fff;
    --focus: 2px rgba(39, 94, 254, 0.3);
    --border: #bbc1e1;
    --border-hover: #275efe;
    --background: #fff;
    --disabled: #f6f8ff;
    --disabled-inner: #e1e6f9;
    -webkit-appearance: none;
    -moz-appearance: none;
    height: 21px;
    outline: none;
    display: inline-block;
    vertical-align: top;
    position: relative;
    margin: 0;
    cursor: pointer;
    border: 1px solid var(--bc, var(--border));
    background: var(--b, var(--background));
    transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
  }
  .checkbox-wrapper-13 input[type="checkbox"]:after {
    content: "";
    display: block;
    left: 0;
    top: 0;
    position: absolute;
    transition: transform var(--d-t, 0.3s) var(--d-t-e, ease),
      opacity var(--d-o, 0.2s);
  }
  .checkbox-wrapper-13 input[type="checkbox"]:checked {
    --b: var(--active);
    --bc: var(--active);
    --d-o: 0.3s;
    --d-t: 0.6s;
    --d-t-e: cubic-bezier(0.2, 0.85, 0.32, 1.2);
  }
  .checkbox-wrapper-13 input[type="checkbox"]:disabled {
    --b: var(--disabled);
    cursor: not-allowed;
    opacity: 0.9;
  }
  .checkbox-wrapper-13 input[type="checkbox"]:disabled:checked {
    --b: var(--disabled-inner);
    --bc: var(--border);
  }
  .checkbox-wrapper-13 input[type="checkbox"]:disabled + label {
    cursor: not-allowed;
  }
  .checkbox-wrapper-13
    input[type="checkbox"]:hover:not(:checked):not(:disabled) {
    --bc: var(--border-hover);
  }
  .checkbox-wrapper-13 input[type="checkbox"]:focus {
    box-shadow: 0 0 0 var(--focus);
  }
  .checkbox-wrapper-13 input[type="checkbox"]:not(.switch) {
    width: 21px;
  }
  .checkbox-wrapper-13 input[type="checkbox"]:not(.switch):after {
    opacity: var(--o, 0);
  }
  .checkbox-wrapper-13 input[type="checkbox"]:not(.switch):checked {
    --o: 1;
  }
  .checkbox-wrapper-13 input[type="checkbox"] + label {
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    margin-left: 4px;
  }

  .checkbox-wrapper-13 input[type="checkbox"]:not(.switch) {
    border-radius: 40px;
    border: 2px solid #3498db;
  }
  .checkbox-wrapper-13 input[type="checkbox"]:not(.switch):after {
    width: 5px;
    height: 9px;
    border: 2px solid var(--active-inner);
    border-top: 0;
    border-left: 0;
    left: 7px;
    top: 4px;
    transform: rotate(var(--r, 20deg));
  }
  .checkbox-wrapper-13 input[type="checkbox"]:not(.switch):checked {
    --r: 43deg;
  }

  .checkbox-wrapper-13 * {
    box-sizing: inherit;
  }
  .checkbox-wrapper-13 *:before,
  .checkbox-wrapper-13 *:after {
    box-sizing: inherit;
  }
  .checkbox-label {
    font-family: Montserrat;
    font-weight: 600;
    letter-spacing: 0em;
    text-align: left;
    color: #3498db;
  }
`;

export default CustomStrategies;
