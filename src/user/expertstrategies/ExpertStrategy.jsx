import "../customstrategies/customstrategies.css";
import Select from "react-select";
import Navbar from "../../components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Newshape from "../../components/shape/custshape/Newshape";
import HorizontalNav from "../../components/navbar/HorizontalNav";
import React, { useCallback, useEffect, useState, useRef } from "react";
import Orangenewshape from "../../components/shape/custshape/Orangenewshape";
import { Stretegies } from "./Stretegies.jsx";
import {
  getBankniftyDataApi,
  indexExpiryDataApi,
  indexStrikePriceDataApi,
  stopStrategy,
  getStrategiesDropdownApi,
  startStrategyApi,
  fetchLastStretegy,
  getStrategyStatusApi,
} from "../features/customdata/custAuthentication";
import { useNavigate } from "react-router-dom";
import MicroModal from "micromodal"; // es6 module
import { Circles } from "react-loader-spinner";
import { LogViewer } from "./liveLogs";
import "./ExpertStrategy.css";
import { showToast } from "../../utility";

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

export function ExpertStrategy() {
  const [checkedCheckBox, setCheckedCheckBox] = useState(false);
  const [selectedInput, setSelectedInput] = useState("");
  const [btnDisable, setBtnDisable] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [strategyOptions, setStrategyOptions] = useState([]);
  const [isStrategyRunning, setIsStrategyRunning] = useState(false);
  const [starting, setStarting] = useState(false);
  const [preloading, setPreloading] = useState(false);
  const isMounted = useRef(true);
  const [showLogsModal, setShowLogsModal] = useState(false);
  const [preselectedStrategyId, setPreselectedStrategyId] = useState(null);

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
    (state) => state?.index?.indexExpiryDataApi.data || [],
  );
  let StrikData = useSelector(
    (state) => state?.index?.indexStrikePriceDataApi || [],
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

  // Preload last strategy and, if running, populate fields
  useEffect(() => {
    let cancelled = false;
    setPreloading(true);
    dispatch(fetchLastStretegy())
      .then(async (action) => {
        if (!isMounted.current || cancelled) return;
        const payload = action?.payload;
        if (!payload) return;
        // Only proceed when API indicates success
        if (payload?.success !== true) return;
        const raw = payload?.data || payload;
        // If API returns an object with { detail: "No strategy payload..." }, skip
        if (!raw || (raw && raw.detail)) return;

        const mappedStrategyId = raw.strategy_id || raw.strategy || "";
        if (!mappedStrategyId) return;
        const statusAction = await dispatch(getStrategyStatusApi(mappedStrategyId));
        const statusPayload = statusAction?.payload;
        const isRunning = statusPayload?.is_running ?? statusPayload?.data?.is_running ?? false;
        if (isRunning) {
          setPreselectedStrategyId(mappedStrategyId);
          const mappedIndex = raw.index || raw.index_name || "";
          const mappedExpiry = raw.expiry || "";
          const mappedStrike = (raw.strike_price ?? raw.strike) || 0;
          const mappedOption = raw.option_type || raw.option || "";
          const mappedCandle = raw.candle_duration || raw.chart_time || "";
          const mappedQty = raw.quantity || 0;
          const mappedTradeAmt = raw.trade_amount || raw.trading_amount || 0;
          const mappedTarget = raw.target_profit || 0;

          setInputValues((prev) => ({
            ...prev,
            strategy_id: mappedStrategyId,
            target_profit: parseInt(mappedTarget) || 0,
            index_list: [
              {
                index: mappedIndex,
                strike_price: typeof mappedStrike === "string" ? parseFloat(mappedStrike) : mappedStrike,
                expiry: mappedExpiry,
                option: mappedOption,
                chart_time: mappedCandle,
                quantity: parseInt(mappedQty) || 0,
                trading_amount: parseInt(mappedTradeAmt) || 0,
              },
            ],
          }));
          setIsStrategyRunning(true);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled && isMounted.current) setPreloading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [dispatch]);

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
        }),
      );
    }
  }, [inputValues?.index_list[0]?.index, inputValues?.index_list[0]?.expiry]);

  const submitButton = useCallback(() => {
    const firstIndex = inputValues.index_list[0] || {};
    // Basic validation to prevent bad payloads
    if (!inputValues.strategy_id) {
      showToast("⚠️ Error", "Please select a strategy", "error");
      return;
    }
    if (!firstIndex.index) {
      showToast("⚠️ Error", "Please select index", "error");
      return;
    }
    if (!firstIndex.expiry) {
      showToast("⚠️ Error", "Please select expiry", "error");
      return;
    }
    if (firstIndex.strike_price === undefined || firstIndex.strike_price === null || firstIndex.strike_price === "") {
      showToast("⚠️ Error", "Please select strike price", "error");
      return;
    }
    if (!firstIndex.option) {
      showToast("⚠️ Error", "Please select option type (CE/PE)", "error");
      return;
    }
    if (!firstIndex.chart_time) {
      showToast("⚠️ Error", "Please select chart time", "error");
      return;
    }
    if (!firstIndex.quantity || Number(firstIndex.quantity) <= 0) {
      showToast("⚠️ Error", "Please enter a valid quantity", "error");
      return;
    }
    if (!firstIndex.trading_amount || Number(firstIndex.trading_amount) <= 0) {
      showToast("⚠️ Error", "Please enter a valid trading amount", "error");
      return;
    }
    if (!inputValues.target_profit || Number(inputValues.target_profit) <= 0) {
      showToast("⚠️ Error", "Please enter a valid target profit", "error");
      return;
    }
    setStarting(true);
    const payload = {
      strategy_id: inputValues.strategy_id,
      index: firstIndex.index,
      expiry: firstIndex.expiry,
      strike_price: Number(firstIndex.strike_price) / 100,
      option_type: firstIndex.option,
      quantity: firstIndex.quantity,
      trade_amount: firstIndex.trading_amount,
      target_profit: inputValues.target_profit,
      candle_duration: firstIndex.chart_time,
    };
    dispatch(startStrategyApi(payload))
      .then((action) => {
        if (!isMounted.current) return;
        setStarting(false);
        if (action.payload && action.payload.success) {
          setIsStrategyRunning(true);
        }
      })
      .catch(() => {
        if (isMounted.current) setStarting(false);
      });
  }, [inputValues]);

  const handleStopStrategy = useCallback(() => {
    dispatch(stopStrategy(inputValues.strategy_id)).then((action) => {
      if (!isMounted.current) return;
      if (action.payload && action.payload.success) {
        setIsStrategyRunning(false);
        setShowLogsModal(false); // Hide logs modal if open
      }
    });
  }, [inputValues.strategy_id]);

  useEffect(() => {
    if (
      getStrategy?.message ===
      "Live strategy data fetched from WebSocket successfully"
    ) {
      if (isMounted.current) setBtnDisable(false);
    }
  }, [getStrategy?.message]);

  useEffect(() => {
    dispatch(getStrategiesDropdownApi()).then((action) => {
      if (!isMounted.current) return;
      if (action.payload && Array.isArray(action.payload.data)) {
        setStrategyOptions(
          action.payload.data.map((strategy) => ({
            value: strategy.id,
            label: strategy.name,
          })),
        );
        if (preselectedStrategyId) {
          const found = action.payload.data
            .map((s) => ({ value: s.id, label: s.name }))
            .find((o) => String(o.value) === String(preselectedStrategyId));
          if (found) setSelectedStrategy(found);
        }
      }
    });
  }, [dispatch, preselectedStrategyId]);

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
        index === self.findIndex((t) => t.label === item.label),
    );
  const finalSortedData = sortedIndexData?.map(({ value, label }) => ({
    value,
    label,
  }));

  return (
    <>
      {(starting || preloading) && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(255,255,255,0.7)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
                  { value: "FINNIFTY", label: "FINNIFTY" },
                  { value: "MIDCPNIFTY", label: "MIDCPNIFTY" },
                ]}
                styles={custStyle}
                onChange={handleInputChange}
                placeholder="Index"
                name="index"
                value={
                  inputValues?.index_list?.[0]?.index
                    ? {
                        value: inputValues.index_list[0].index,
                        label: inputValues.index_list[0].index,
                      }
                    : null
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
                  inputValues?.index_list?.[0]?.expiry
                    ? {
                        value: inputValues?.index_list[0]?.expiry,
                        label: inputValues?.index_list[0]?.expiry,
                      }
                    : null
                }
              />
            </div>
            <div className="select-container">
              <Select
                options={StrikData?.map((item) => ({
                  value: parseInt(item?.strike_price),
                  label: parseInt(item?.strike_price) / 100,
                }))}
                styles={custStyle}
                onChange={handleInputChange}
                placeholder="Strike Price"
                name="strike_price"
                value={
                  inputValues?.index_list?.[0]?.strike_price || inputValues?.index_list?.[0]?.strike_price === 0
                    ? {
                        value: inputValues?.index_list[0]?.strike_price,
                        label:
                          (typeof inputValues?.index_list[0]?.strike_price === "number"
                            ? inputValues?.index_list[0]?.strike_price
                            : parseFloat(inputValues?.index_list[0]?.strike_price)) / 100,
                      }
                    : null
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
                  inputValues?.index_list?.[0]?.option
                    ? {
                        value: inputValues?.index_list[0]?.option,
                        label: inputValues?.index_list[0]?.option,
                      }
                    : null
                }
              />
            </div>
            <div className="select-container">
              <Select
                options={[
                  { value: "ONE_MINUTE", label: "ONE_MINUTE" },
                  { value: "THREE_MINUTE", label: "THREE_MINUTE" },
                  { value: "FIVE_MINUTE", label: "FIVE_MINUTE" },
                  { value: "FIFTEEN_MINUTE", label: "FIFTEEN_MINUTE" },
                ]}
                styles={custStyle}
                placeholder="Chart Time"
                onChange={handleInputChange}
                name="chart_time"
                value={
                  inputValues?.index_list?.[0]?.chart_time
                    ? {
                        value: inputValues?.index_list[0]?.chart_time,
                        label: inputValues?.index_list[0]?.chart_time,
                      }
                    : null
                }
              />
            </div>
            <input
              name="quantity"
              className="cust-inputbtn"
              type="text"
              placeholder="Number of lots"
              value={
                inputValues?.index_list?.[0]?.quantity !== undefined && inputValues?.index_list?.[0]?.quantity !== null
                  ? inputValues?.index_list?.[0]?.quantity
                  : ""
              }
              onChange={(e) => {
                const { value } = e.target;
                // Allow empty and digits only for quantity
                if (value === "" || /^\d+$/.test(value)) {
                  setInputValues((prev) => ({
                    ...prev,
                    index_list:
                      prev?.index_list && prev?.index_list.length > 0
                        ? [
                            {
                              ...prev?.index_list[0],
                              quantity: value === "" ? "" : parseInt(value, 10),
                            },
                          ]
                        : [{ quantity: value === "" ? "" : parseInt(value, 10) }],
                  }));
                }
              }}
            />
            <input
              name="target_profit"
              className="cust-inputbtn"
              type="text"
              placeholder="Target Profit"
              value={
                inputValues?.target_profit !== undefined && inputValues?.target_profit !== null
                  ? inputValues?.target_profit
                  : ""
              }
              onChange={(e) => {
                const { value } = e.target;
                // Allow empty, digits, and one decimal point
                if (value === "" || /^\d*\.?\d*$/.test(value)) {
                  setInputValues((prev) => ({
                    ...prev,
                    target_profit: value === "" ? "" : parseFloat(value),
                  }));
                }
              }}
            />
            <input
              className="cust-inputbtn"
              type="text"
              placeholder="Trading Amount"
              name="trading_amount"
              value={
                inputValues?.index_list?.[0]?.trading_amount !== undefined && inputValues?.index_list?.[0]?.trading_amount !== null
                  ? inputValues?.index_list?.[0]?.trading_amount
                  : ""
              }
              onChange={(e) => {
                const { value } = e.target;
                // Allow empty, digits, and one decimal point
                if (value === "" || /^\d*\.?\d*$/.test(value)) {
                  setInputValues((prev) => ({
                    ...prev,
                    index_list:
                      prev?.index_list && prev?.index_list.length > 0
                        ? [
                            {
                              ...prev?.index_list[0],
                              trading_amount:
                                value === "" ? "" : parseFloat(value),
                            },
                          ]
                        : [
                            {
                              trading_amount:
                                value === "" ? "" : parseFloat(value),
                            },
                          ],
                  }));
                }
              }}
            />
          </div>
          <div className="thirdddiv-btnn" style={{ display: "flex", gap: 12 }}>
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
            {/* See Logs button, only show when strategy is running */}
            {isStrategyRunning && (
              <button
                type="button"
                id="thirdddiv-btnn3"
                className="btn btn-primary"
                onClick={() => setShowLogsModal(true)}
                style={{ marginLeft: 0 }}
              >
                See Logs
              </button>
            )}
          </div>

          {showLogsModal && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "rgba(0, 0, 0, 0.5)",
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Cross button */}
              <button
                onClick={() => setShowLogsModal(false)}
                style={{
                  position: "absolute",
                  top: 24,
                  right: 32,
                  background: "#000000",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  width: 44,
                  height: 44,
                  lineHeight: 1,
                  fontSize: 28,
                  cursor: "pointer",
                  zIndex: 10001,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
                  paddingBottom: "5px",
                }}
                aria-label="Close logs"
              >
                &times;
              </button>
              <div
                style={{
                  width: "100vw",
                  height: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LogViewer />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* New container for all strategies grid */}
      <div
        className="customstrategies-main-container"
        style={{ textAlign: "left" }}
      >
        <Stretegies />
      </div>
    </>
  );
}
