import "../customstrategies/customstrategies.css";
import Select from "react-select";
import Navbar from "../../components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Newshape from "../../components/shape/custshape/Newshape";
import HorizontalNav from "../../components/navbar/HorizontalNav";
import React, { useCallback, useEffect, useState, useRef } from "react";
import Orangenewshape from "../../components/shape/custshape/Orangenewshape";
import {Stretegies} from "./Stretegies.jsx"
import {
  getBankniftyDataApi,
  indexExpiryDataApi,
  indexStrikePriceDataApi,
  stopStrategy,
  getStrategiesDropdownApi,
  startStrategyApi,
} from "../features/customdata/custAuthentication";
import { useNavigate } from "react-router-dom";
import MicroModal from "micromodal"; // es6 module
import { Circles } from "react-loader-spinner";

import "./ExpertStrategy.css";


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
  // const tradeURL ="http://ec2-65-0-101-156.ap-south-1.compute.amazonaws.com:8000";  


export function ExpertStrategy(){
  const [checkedCheckBox, setCheckedCheckBox] = useState(false);
  const [selectedInput, setSelectedInput] = useState("");
  const [btnDisable, setBtnDisable] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [strategyOptions, setStrategyOptions] = useState([]);
  const [isStrategyRunning, setIsStrategyRunning] = useState(false);
  const [starting, setStarting] = useState(false);
  const isMounted = useRef(true);

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


  

  let IndexData = useSelector(
    (state) => state?.index?.indexExpiryDataApi.data || []
  );
  let StrikData = useSelector(
    (state) => state?.index?.indexStrikePriceDataApi || []
  );

  useEffect(() => {
    MicroModal.init({
      onShow: () => {},
      onClose: () => setIsModalOpen(false),
      disableScroll: true,
      awaitCloseAnimation: true,
    });
    return () => {
      isMounted.current = false;
    };
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
    setStarting(true);
    const firstIndex = inputValues.index_list[0] || {};
    const payload = {
      strategy_id: inputValues.strategy_id,
      index: firstIndex.index,
      expiry: firstIndex.expiry,
      strike_price: firstIndex.strike_price,
      option_type: firstIndex.option,
      quantity: firstIndex.quantity,
      trade_amount: firstIndex.trading_amount,
      target_profit: inputValues.target_profit,
      candle_duration: firstIndex.chart_time,
    };
    dispatch(startStrategyApi(payload)).then((action) => {
      if (!isMounted.current) return;
      setStarting(false);
      if (action.payload && action.payload.success) {
        setIsStrategyRunning(true);
      }
    }).catch(() => { if (isMounted.current) setStarting(false); });
  }, [inputValues]);

  const handleStopStrategy = useCallback(() => {
    dispatch(stopStrategy(inputValues.strategy_id)).then((action) => {
      if (!isMounted.current) return;
      if (action.payload && action.payload.success) {
        setIsStrategyRunning(false);
      }
    });
  }, [inputValues.strategy_id]);

  useEffect(() => {
    if (getStrategy?.message === "Live strategy data fetched from WebSocket successfully") {
      if (isMounted.current) setBtnDisable(false);
    }
  }, [getStrategy?.message]);

  useEffect(() => {
    dispatch(getStrategiesDropdownApi()).then((action) => {
      if (!isMounted.current) return;
      if (
        action.payload &&
        Array.isArray(action.payload.data)
      ) {
        setStrategyOptions(
          action.payload.data.map((strategy) => ({
            value: strategy.id,
            label: strategy.name,
          }))
        );
      }
    });
  }, [dispatch]);

  // When a strategy is selected, update inputValues.strategy_id
  const handleStrategyChange = (selected) => {
    setSelectedStrategy(selected);
    setInputValues((prev) => ({
      ...prev,
      strategy_id: selected ? selected.value : "",
    }));
  };

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
        <>
        {starting && (
          <div style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(255,255,255,0.7)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Circles color="#3399cc" height={80} width={80} />
          </div>
        )}
           <HorizontalNav />
      <Orangenewshape />
      <Newshape />
      <Navbar />
      {/* <Shape/> */}
      <div className="customstrategies-main-container">
        <div className="algo-trading-container">
          <h3>Expert Algo-Trading Strategy</h3>

          <div className="expert-strategy-form-row">
            <div className="select-container expert-strategy-dropdown-container">
              <Select
                options={strategyOptions}
                value={selectedStrategy}
                onChange={handleStrategyChange}
                placeholder="Select Strategy"
                styles={custStyle}
                className="expert-strategy-dropdown"
              />
            </div>
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
                  { value: "THREE_MINUTE", label: "THREE_MINUTE" },
                  { value: "FIVE_MINUTE", label: "FIVE_MINUTE" },
                  { value: "FIFTEEN_MINUTE", label: "FIFTEEN_MINUTE" },
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
            <input
              name="quantity"
              className="cust-inputbtn"
              type="text"
              placeholder="Number of lots"
              onChange={(e) =>
                setInputValues((prev) => ({
                  ...prev,
                  index_list:
                    prev?.index_list && prev?.index_list.length > 0
                      ? [
                          {
                            ...prev?.index_list[0],
                            quantity: parseInt(e.target.value),
                          },
                        ]
                      : [{ quantity: parseInt(e.target.value) }],
                }))
              }
            />
            <input
              name="target_profit"
              className="cust-inputbtn"
              type="text"
              placeholder="Target Profit"
              onChange={(e) =>
                setInputValues((prev) => ({
                  ...prev,
                  target_profit: parseInt(e.target.value),
                }))
              }
            />
            <input
              className="cust-inputbtn"
              type="text"
              placeholder="Trading Amount"
              name="trading_amount"
              onChange={(e) =>
                setInputValues((prev) => ({
                  ...prev,
                  index_list:
                    prev?.index_list && prev?.index_list.length > 0
                      ? [
                          {
                            ...prev?.index_list[0],
                            trading_amount: parseInt(e.target.value),
                          },
                        ]
                      : [{ trading_amount: parseInt(e.target.value) }],
                }))
              }
            />
          </div>
          <div className="thirdddiv-btnn">
            <button
              type="button"
              id="thirdddiv-btnn1"
              className="btn btn-primary"
              onClick={submitButton}
              disabled={isStrategyRunning}
            >
              Start Strategy
            </button>
            <button
              type="button"
              id="thirdddiv-btnn2"
              className="btn btn-primary"
              disabled={!isStrategyRunning}
              onClick={handleStopStrategy}
            >
              Stop Strategy
            </button>
          </div>
        </div>
      </div>
      {/* New container for all strategies grid */}
     <div className="customstrategies-main-container" style={{ textAlign: "left" }}>
<Stretegies/>
     </div>
        </>
    )
}