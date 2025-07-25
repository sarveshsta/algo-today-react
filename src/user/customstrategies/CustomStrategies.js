import "./customstrategies.css";
import Select from "react-select";
import Shape from "../../components/shape/Shape";
import Navbar from "../../components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Newshape from "../../components/shape/custshape/Newshape";
import HorizontalNav from "../../components/navbar/HorizontalNav";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Orangenewshape from "../../components/shape/custshape/Orangenewshape";
import {
  getBankniftyDataApi,
  getStrategyDataApi,
  indexExpiryDataApi,
  indexStrikePriceDataApi,
  stopStrategy,
} from "../features/customdata/custAuthentication";
import { useNavigate } from "react-router-dom";
import MicroModal from "micromodal"; // es6 module
import { buyingConditionData } from "../../arraydata/Arraydata";

const option4 = [
  { value: "CE", label: "CE" },
  { value: "PE", label: "PE" },
];

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

const tradeURL =
  "http://ec2-65-0-101-156.ap-south-1.compute.amazonaws.com:8000";

const CustomStrategies = () => {
  const [checkedCheckBox, setCheckedCheckBox] = useState(false);
  const [selectedInput, setSelectedInput] = useState("");
  const [btnDisable, setBtnDisable] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [inputValues, setInputValues] = useState({
    strategy_id: "",
    user_id: "",
    index_list: [
      {
        index: "",
        strike_price: 0,
        expiry: "",
        option: "",
        chart_time: "",
        quantity: 0,
        trading_amount: 0,
      },
    ],
    target_profit: 0,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getStrategy = useSelector((state) => state?.index?.strategy || []);

  console.log("getStrategy",getStrategy);
  

  let IndexData = useSelector(
    (state) => state?.index?.indexExpiryDataApi.data || []
  );
  let StrikData = useSelector(
    (state) => state?.index?.indexStrikePriceDataApi || []
  );

  useEffect(() => {
    MicroModal.init({
      onShow: () => {}, // Optional: Add callbacks if needed
      onClose: () => setIsModalOpen(false), // Update state when modal closes
      disableScroll: true, // Optional: Disable background scroll when modal is open
      awaitCloseAnimation: true, // Optional: Wait for animation to finish before removing modal from DOM
    });
  }, [isModalOpen]);

  const handleSubmit1 = useCallback(() => {
    if (checkedCheckBox) {
      MicroModal.show("modal-1"); // Show the modal using MicroModal's API
    }
  }, [checkedCheckBox]);

  // Function to generate random numeric strategy ID
  const generateRandomStrategyId = () => {
    return Math.floor(1 + Math.random() * 9).toString(); // Generates a 6-digit number
  };

  const handleInputChange = (event, selectname) => {
    let { name } = selectname;
    setInputValues((prevState) => ({
      ...prevState,
      user_id: generateRandomStrategyId(),
      strategy_id: '1',
      index_list: prevState.index_list.map((item, index) => {
        if (index === 0) {
          // Update the strike_price in the first index_list object
          return {
            ...item,
            [name]: event.value, // dynamically update the field by name
          };
        }
        return item;
      }),
    }));
  };

  const checkBoxChange = useCallback(() => {
    setCheckedCheckBox((prevState) => !prevState);
  }, []);

  useEffect(() => {
    if (inputValues?.index_list[0]?.index) {
      dispatch(indexExpiryDataApi(inputValues?.index_list[0]?.index));
    }
    if (
      inputValues?.index_list[0]?.index &&
      inputValues?.index_list[0]?.expiry
    ) {
      dispatch(
        indexStrikePriceDataApi({
          index: inputValues?.index_list[0]?.index,
          expiry: inputValues?.index_list[0]?.expiry,
        })
      );
    }
  }, [inputValues?.index_list[0]?.index, inputValues?.index_list[0]?.expiry]);

  const submitButton = useCallback(() => {
    dispatch(getStrategyDataApi(inputValues));

    setTimeout(() => {
      if (getStrategy?.success === true) {
        navigate("/userhistory");
      }
    }, 2000);
  }, [inputValues]);

  useEffect(() => {
    if (getStrategy?.message === "Live strategy data fetched from WebSocket successfully") {
      setBtnDisable(false);
    }
  }, [getStrategy?.message]);

  const sortedIndexData = IndexData?.map((item) => {
    const expiryDate = new Date(item?.expiry);
    const day = String(expiryDate?.getDate()).padStart(2, "0");
    const month = expiryDate
      .toLocaleString("default", { month: "short" })
      .toUpperCase();
    const year = String(expiryDate.getFullYear()).slice(-2);

    return {
      value: `${day}${month}${year}`,
      label: item?.expiry,
    };
  })
    .sort((a, b) => new Date(a.label) - new Date(b.label))
    .filter(
      (item, index, self) =>
        // Filter out duplicates by checking if the current item's label exists earlier in the array
        index === self.findIndex((t) => t.label === item.label)
    );
  const finalSortedData = sortedIndexData?.map(({ value, label }) => ({
    value,
    label,
  }));

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
                  { value: "NIFTY", label: "NIFTY" },
                  { value: "BANKNIFTY", label: "BANKNIFTY" },
                ]}
                styles={custStyle}
                onChange={handleInputChange}
                placeholder="Index"
                name="index"
                value={
                  inputValues.index && {
                    value: inputValues.index_list[0].index,
                    label: inputValues.index_list[0].index,
                  }
                }
              />
            </div>

            <div className="select-container">
              <Select
                options={finalSortedData}
                styles={custStyle}
                onChange={handleInputChange}
                placeholder="Expiry"
                name="expiry"
                value={
                  inputValues?.expiry && {
                    value: inputValues?.index_list[0]?.expiry,
                    label: inputValues?.index_list[0]?.expiry,
                  }
                }
              />
            </div>

            <div className="select-container">
              <Select
                options={StrikData?.map((item) => ({
                  value: parseInt(item?.strike_price) / 100,
                  label: parseInt(item?.strike_price) / 100,
                }))}
                styles={custStyle}
                onChange={handleInputChange}
                placeholder="Strike Price"
                name="strike_price"
                value={
                  inputValues.strike_price && {
                    value: inputValues?.index_list[0]?.strike_price,
                    label:
                      inputValues?.index_list[0]?.strike_price.split(" . "),
                  }
                }
              />
            </div>

            <div className="select-container">
              <Select
                options={option4}
                styles={custStyle}
                onChange={handleInputChange}
                placeholder="CE/PE"
                name="option"
                value={
                  inputValues?.option && {
                    value: inputValues?.index_list[0]?.option,
                    label: inputValues?.index_list[0]?.option,
                  }
                }
              />
            </div>

            <div className="select-container">
              <Select
                options={[
                  { value: "ONE_MINUTE", label: "ONE_MINUTE" },
                  { value: "TWO_MINUTE", label: "TWO_MINUTE" },
                ]}
                styles={custStyle}
                placeholder="Chart Time"
                onChange={handleInputChange}
                name="chart_time"
                value={
                  inputValues?.chart_time && {
                    value: inputValues?.index_list[0]?.chart_time,
                    label: inputValues?.index_list[0]?.chart_time,
                  }
                }
              />
            </div>
          </div>
        </div>

        <div className="cust-input-second">
          <input
            name="quantity"
            className="cust-inputbtn"
            type="text"
            placeholder="Quantity"
            // value={inputValues.quantity}
            onChange={(e) =>
              setInputValues((prev) => ({
                ...prev,
                index_list:
                  prev?.index_list && prev?.index_list.length > 0
                    ? [
                        {
                          ...prev?.index_list[0],
                          quantity: parseInt(e.target.value), // Update the quantity
                        },
                      ]
                    : [{ quantity: parseInt(e.target.value) }], // Initialize index_list if it's undefined or empty
              }))
            }
          />
          <input
            name="target_profit"
            className="cust-inputbtn"
            type="text"
            placeholder="Target Profit"
            // value={inputValues.quantity}
            onChange={(e) =>
              setInputValues((prev) => ({
                ...prev,
                target_profit: parseInt(e.target.value),
              }))
            }
          />
          {/* <Select
            value={selectedInput[5]}
            styles={custStyle}
            onChange={handleSubmit}
          />
          <Select
            value={selectedInput[5]}
            styles={custStyle}
            onChange={handleSubmit}
          /> */}
        </div>
        <div className="cust-input-second">
          <input
            className="cust-inputbtn"
            type="text"
            placeholder="Amount"
            name="trading_amount"
            onChange={(e) =>
              setInputValues((prev) => ({
                ...prev,
                index_list:
                  prev?.index_list && prev?.index_list.length > 0
                    ? [
                        {
                          ...prev?.index_list[0],
                          trading_amount: parseInt(e.target.value), // Update the quantity
                        },
                      ]
                    : [{ trading_amount: parseInt(e.target.value) }], // Initialize index_list if it's undefined or empty
              }))
            }
          />
          <Select value={selectedInput[5]} styles={custStyle} />
          <Select value={selectedInput[5]} styles={custStyle} />
        </div>

        <div className="thirdddiv-btnn">
          <button
            type="button"
            id="thirdddiv-btnn1"
            className="btn btn-primary"
            onClick={submitButton}
          >
            Start Strategy
          </button>
          <button
            type="button"
            id="thirdddiv-btnn2"
            className="btn btn-primary"
            disabled={btnDisable}
            onClick={() => dispatch(stopStrategy("1"))}
          >
            Stop Strategy
          </button>
        </div>
      </div>

      {/* ----------------Buying Pre Condition ------------------ */}
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
              <input
                id="c1-13"
                type="checkbox"
                onChange={checkBoxChange}
                value={checkedCheckBox}
              />
              <label className="checkbox-label" for="c1-13">
                Single Indicator
              </label>
            </div>
            <div className="checkbox-wrapper-13">
              <input
                id="c1-13"
                type="checkbox"
                onChange={checkBoxChange}
                value={checkedCheckBox}
              />
              <label className="checkbox-label" for="c1-13">
                LTP + Candle OHLC
              </label>
            </div>
            <div className="checkbox-wrapper-13">
              <input
                id="c1-13"
                type="checkbox"
                onChange={checkBoxChange}
                value={checkedCheckBox}
              />
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
              onClick={handleSubmit1}
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
            className="cust-inputbtn buying-value"
            type="text"
            placeholder="Enter LTP = [a] * [_________]"
           
          />
        </div>
      </div>

      {/* ----------------Selling Pre Condition ------------------ */}
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
            className="cust-inputbtn selling-btn"
            type="text"
            placeholder="Enter LTP = [a] * [_________]"
          />
        </div>
      </div>
      <div className="buying-pre-condition-thirddiv">
        <div className="thirdddiv">
          <div className="thirdddiv1">
            <input
              className="cust-inputbtn"
              type="text"
              placeholder="Enter LTP"
            />
          </div>
          <div className="thirdddiv2">
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
            onClick={submitButton}
          >
            Start Amount Trading
          </button>
          <button type="button" id="thirdddiv-btnn2" className="btn">
            Start Paper Trading
          </button>
        </div>
      </div>

      {/*----------------------Modal------------------------- */}
      <div className="modal micromodal-slide" id="modal-1" aria-hidden="true">
        <div className="modal__overlay" tabIndex="-1" data-micromodal-close>
          <div
            className="modal__container"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-1-title"
          >
            {Object.keys(buyingConditionData).map((id) => (
              <>
                <header className="modal__header">
                  <h2 className="modal__title" id="modal-1-title">
                    {buyingConditionData[id]?.title}
                  </h2>
                  <button
                    className="modal__close"
                    aria-label="Close modal"
                    data-micromodal-close
                  ></button>
                </header>
                <main className="modal__content" id="modal-1-content">
                  {/* Modal Content Here */}
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    {/* <label className="multiplier-label">
                    </label> */}
                    <div className="multiplier-container" key={id}>
                      {buyingConditionData[id]?.parameters?.map((item) => (
                        <div key={item.name}>
                          {item?.type === "select" ? (
                            <select
                              className="multiplier-input"
                              name={item?.name}
                            >
                              {item?.options?.map((option) => (
                                <option
                                  key={option?.value}
                                  value={option?.value}
                                >
                                  {option?.label}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              className="multiplier-input"
                              name={item?.name}
                              type={item?.type}
                              placeholder={item?.placeholder || ""}
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* <div className="multiplier-container">
                  <label className="multiplier-label">Multiplier</label>
                  <input
                    className="multiplier-input"
                    type="number"
                    step="0.01"
                    // value={value}
                    // onChange={handleChange}
                  />
                </div>

                <div className="multiplier-container">
                  <label className="multiplier-label">Multiplier</label>
                  <input
                    className="multiplier-input"
                    type="number"
                    step="0.01"
                    // value={value}
                    // onChange={handleChange}
                  />
                </div> */}
                  </div>
                </main>
              </>
            ))}
            <footer className="modal__footer">
              <button className="modal__btn modal__btn-primary">Submit</button>
              <button className="modal__btn modal__btn-primary">OR</button>
              <button className="modal__btn modal__btn-primary">And</button>
              <button
                className="modal__btn"
                data-micromodal-close
                aria-label="Close this dialog window"
              >
                Close
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomStrategies;
