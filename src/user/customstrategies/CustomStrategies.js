import "./customstrategies.css";
import Select from "react-select";
import Shape from "../../components/shape/Shape";
import Navbar from "../../components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Newshape from "../../components/shape/custshape/Newshape";
import HorizontalNav from "../../components/navbar/HorizontalNav";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Orangenewshape from "../../components/shape/custshape/Orangenewshape";
import { getBankniftyDataApi } from "../features/customdata/custAuthentication";

const option4 = [
  { value: "CE", label: "CE" },
  { value: "PE", label: "PE" },
];

// const option5 = [
//   { value: "Chart Time", label: "Chart Time" },
//   { value: "1 minute", label: "1 minute" },
//   { value: "2 minute", label: "2 minute" },
//   { value: "3 minute", label: "3 minute" },
//   { value: "4 minute", label: "4 minute" },
//   { value: "5 minute", label: "5 minute" },
//   { value: "10 minute", label: "10 minute" },
//   { value: "15 minute", label: "15 minute" },
//   { value: "20 minute", label: "20 minute" },
//   { value: "25 minute", label: "25 minute" },
//   { value: "30 minute", label: "30 minute" },
//   { value: "60 minute", label: "60 minute" },
//   { value: "120 minute", label: "120 minute" },
//   { value: "180 minute", label: "180 minute" },
// ];

// const autoData = [
//   { value: "Auto Start Date", label: "Auto Start Date" },
//   { value: "Auto Stop Date", label: "Auto Stop Date" },
// ];

const custStyle = {
  option: (provided, state) => ({
    ...provided,
    // backgroundColor: state.isSelected ? "#ff00ff" : "#ffd1dc",
    color: "black",
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
    extAlign: "center",
    // backgroundColor: "#3498DB",
    borderRadius: 25,
    backgroundColor: "rgba(52, 152, 219, 0.2)",
    border: "1px solid rgba(52, 152, 219, 1)",
    // border: "2px solid #ff00ff",
    // fontSize: 20,
    "&:hover": {
      // borderColor: "#7fffd4",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "black",
    fontSize: 20,
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "black",
    fontSize: 20,
  }),
};

const CustomStrategies = () => {
  const [selectedInput, setSelectedInput] = useState("");
  const [checkedCheckBox, setCheckedCheckBox] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector((state) => state?.index?.data?.data || []);

  const mappedData = useMemo(
    () => Object.values(state).map((item) => item?.expiry),
    [state]
  );

  const strikePrice = useMemo(
    () => Object.values(state).map((item) => item?.symbol),
    [state]
  );

  const subsymbols = useMemo(
    () => strikePrice.map((symbol) => symbol?.substring(15, 20)),
    [strikePrice]
  );

  useEffect(() => {
    dispatch(getBankniftyDataApi());
  }, [dispatch]);

  const handleSubmit = useCallback((changeinput) => {
    setSelectedInput(changeinput);
  }, []);

  const checkBoxChange = useCallback(() => {
    setCheckedCheckBox((prevState) => !prevState);
  }, []);

  const submitButton = useCallback(() => {
    console.log("selected", checkedCheckBox);
  }, [checkedCheckBox]);

  return (
    <div>
      <HorizontalNav />
      <Orangenewshape />
      <Newshape />
      <Navbar />
      {/* <Shape/> */}

      <div className="customstrategies-main-container">
        <div className="algo-trading-container">
          <h3>Custom Algo-Trading Strategy</h3>
          <div className="customstrategies-flex-select-option">
            <div className="select-container">
              <Select
                options={[
                  { value: "Nifty 50", label: "Nifty 50" },
                  { value: "BANKNIFTY", label: "BANKNIFTY" },
                ]}
                // value={selectedInput[0]}
                styles={custStyle}
                onChange={handleSubmit}
                placeholder="Index"
              />
            </div>

            <div className="select-container">
              <Select
                options={subsymbols.map((item) => ({
                  value: item,
                  label: item,
                }))}
                // value={mappedData}
                styles={custStyle}
                onChange={handleSubmit}
                placeholder="Strike Price"
              />
            </div>

            <div className="select-container">
              <Select
                options={mappedData.map((item) => ({
                  value: item,
                  label: item,
                }))}
                // value={selectedInput[2]}
                styles={custStyle}
                onChange={handleSubmit}
                placeholder="Expiry"
              />
            </div>

            <div className="select-container">
              <Select
                options={option4}
                // value={selectedInput[3]}
                styles={custStyle}
                onChange={handleSubmit}
                placeholder="CE/PE"
              />
            </div>

            <div className="select-container">
              <Select
                // options={option5}
                value={selectedInput[4]}
                styles={custStyle}
                onChange={handleSubmit}
                placeholder="Chart Time"
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
          <Select
            // options={autoData}
            value={selectedInput[5]}
            styles={custStyle}
            onChange={handleSubmit}
          />
          <Select
            // options={autoData}
            value={selectedInput[5]}
            styles={custStyle}
            onChange={handleSubmit}
          />
        </div>
        <div className="cust-input-second">
          <input
            className="cust-inputbtn"
            type="text"
            placeholder="No. of shares/Amount"
          />
          <Select
            // options={autoData}
            value={selectedInput[5]}
            styles={custStyle}
            onChange={handleSubmit}
          />
          <Select
            // options={autoData}
            value={selectedInput[5]}
            styles={custStyle}
            onChange={handleSubmit}
          />
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
            <button type="button" id="buy-btn2" className="btn">
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
          <h2> Selling Value</h2>
          <input
            className="cust-inputbtn"
            type="text"
            placeholder="Enter LTP"
          />
        </div>
      </div>

      <div className="buying-pre-condition-thirddiv">
        <div className="thirdddiv">
          <div className="thirdddiv">
            <input
              className="cust-inputbtn"
              type="text"
              placeholder="Enter LTP"
            />
          </div>
          <div>
            <input
              className="cust-inputbtn"
              type="text"
              placeholder="Enter LTP"
            />
          </div>
        </div>
        <div className="thirdddiv-btnn">
          <button
            type="button"
            id="thirdddiv-btnn1"
            className="btn btn-primary"
          >
            Start Amount Trading
          </button>
          <button type="button" id="thirdddiv-btnn2" className="btn">
            Start Paper Trading
          </button>
        </div>
      </div>
    </div>
  );
};
export default React.memo(CustomStrategies);
