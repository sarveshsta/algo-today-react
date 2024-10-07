import "./yourstrategy.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MicroModal from "micromodal"; // es6 module
import { StrategyBox } from "../mystreategy/Strategyboxx";
import { strategiesData } from "../../arraydata/Arraydata";


const YourStrategy = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [stretegyInputs, setStretegyInputs] = useState({
    user_id: "",
    trace_candle: 0,
    close: "",
    high: "",
    low: "",
    open: "",
    buying_multiplier: 0,
    stop_loss_multiplier: 0,
    sl_low_multiplier_1: 0,
    sl_low_multiplier_2: 0,
    trail_sl_1: 0,
    trail_sl_2: 0,
    modify_stop_loss_1: 0,
    modify_stop_loss_2: 0,
  });

  useEffect(() => {
    MicroModal.init();
  });

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStrategy(null);
  };

  const handleStrategyChange = (e) => {
    const { name, value, type } = e.target;
    setStretegyInputs((prevState) => ({
      ...prevState,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  console.log(" stretegyInputs :",stretegyInputs);
  

  const handleSubscribe = (id) => {
    setSelectedStrategy(strategiesData[id]);
    setIsModalOpen(true);
  };
  return (
    <>
      <div className="MainBox">
        {Object.keys(strategiesData).map((id) => {
          return (
            <StrategyBox
              key={id}
              id={id}
              title={strategiesData[id].title}
              buttonText="Subscribe"
              dataModal="modal-1"
              onSubscribe={() => handleSubscribe(id)}
            />
          );
        })}
      </div>

      {/*----------------------Modal Stretegy------------------------- */}
      <div class="modal micromodal-slide" id="modal-1" aria-hidden="true">
        <div class="modal__overlay" tabindex="-1" data-micromodal-close>
          <div
            class="modal__container"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-1-title"
          >
            <header class="modal__header">
              <h2 class="modal__title" id="modal-1-title">
                Strategy
              </h2>
              <button
                class="modal__close"
                aria-label="Close modal"
                data-micromodal-close
              ></button>
            </header>
            <main class="modal__content" id="modal-1-content">
              <>
                {selectedStrategy && (
                  <div className="admin-strategies-main-container">
                    <div className="algo-trading-container">
                      <div className="main-div-admin-edit-input">

                      {selectedStrategy.parameters.map((param) => (
                          <div className="admin-edit-input" key={param.name}>
                            <input
                              className="cust-inputbtn"
                              type={param.type}
                              placeholder={param.placeholder}
                              name={param.name}
                              onChange={handleStrategyChange}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            </main>
            <footer class="modal__footer">
              <button
                class="modal__btn modal__btn-primary"
                // onClick={() => dispatch(stopStrategy(getStrategy?.strategy_id))}
              >
                Subscribe Strategy
              </button>
              <button
                class="modal__btn"
                data-micromodal-close
                aria-label="Close this dialog window"
              >
                Close
              </button>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};
export default YourStrategy;
