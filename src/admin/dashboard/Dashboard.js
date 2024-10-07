import "./dashboard.css";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { GrHomeRounded } from "react-icons/gr";
import { IoIosCloseCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import ReactModal from "react-modal";
import MicroModal from "micromodal"; // es6 module

const userlistData = [
  {
    userimg: require("../../assets/icons/IMG_0399.jpg"),
    username: "Aman Jain(ALGO124)",
    stra1: "Expert Streategies",
    stra2: "Custom Streategies",
    coinbala: "Coin Balance",
    currestatus: "Current Status",
    Expir: "Expires on",
  },
  {
    userimg: require("../../assets/icons/IMG_0399.jpg"),
    username: "Aman Jain(ALGO124)",
    stra1: "Expert Streategies",
    stra2: "Custom Streategies",
    coinbala: "Coin Balance",
    currestatus: "Current Status",
    Expir: "Expires on",
  },
  {
    userimg: require("../../assets/icons/IMG_0399.jpg"),
    username: "Aman Jain(ALGO124)",
    stra1: "Expert Streategies",
    stra2: "Custom Streategies",
    coinbala: "Coin Balance",
    currestatus: "Current Status",
    Expir: "Expires on",
  },
  {
    userimg: require("../../assets/icons/IMG_0399.jpg"),
    username: "Aman Jain(ALGO124)",
    stra1: "Expert Streategies",
    stra2: "Custom Streategies",
    coinbala: "Coin Balance",
    currestatus: "Current Status",
    Expir: "Expires on",
  },
  {
    userimg: require("../../assets/icons/IMG_0399.jpg"),
    username: "Aman Jain(ALGO124)",
    stra1: "Expert Streategies",
    stra2: "Custom Streategies",
    coinbala: "Coin Balance",
    currestatus: "Current Status",
    Expir: "Expires on",
  },
  {
    userimg: require("../../assets/icons/IMG_0399.jpg"),
    username: "Aman Jain(ALGO124)",
    stra1: "Expert Streategies",
    stra2: "Custom Streategies",
    coinbala: "Coin Balance",
    currestatus: "Current Status",
    Expir: "Expires on",
  },
  {
    userimg: require("../../assets/icons/IMG_0399.jpg"),
    username: "Aman Jain(ALGO124)",
    stra1: "Expert Streategies",
    stra2: "Custom Streategies",
    coinbala: "Coin Balance",
    currestatus: "Current Status",
    Expir: "Expires on",
  },
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

const customStyles = {
  content: {
    // top: '50%',
    // left: '50%',
    // right: 'auto',
    // bottom: 'auto',
    // // marginRight: '-50%',
    // // transform: 'translate(-50%, -50%)',
  },
};

const Dashboard = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [isKeyPressed, setIsKeyPressed] = useState(false);
  const [showEmail, setShowWEmail] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const [toggle, setToggle] = useState(false);

  const [maxContentOnPage, setMaxContentOnPage] = useState(6);
  const [page, setPage] = useState(1);

  const handleToggle = () => {
    setToggle(true);
  };

  const handleKeyPress = (event) => {
    setIsKeyPressed(!!event.target.value);
  };

  const closeWindow = () => {
    if (toggle) {
      setToggle(false);
    }
  };

  const belliconClick = () => {
    setShowNotification(true);

    if (showNotification) {
      setShowNotification(false);
    }

    setTimeout(() => {
      setShowNotification(false);
    }, 6000);
  };

  const emailIconClick = () => {
    setShowWEmail(true);

    if (showEmail) {
      setShowWEmail(false);
    }

    setTimeout(() => {
      setShowWEmail(false);
    }, 6000);
  };

  const loadMore = () => {
    // setPage(page + maxContentOnPage);
    setMaxContentOnPage(maxContentOnPage + page);
  };

  const iconClick = () => {
    setToggleModal(true);
  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setToggleModal(true);
  }

  useEffect(() => {
    MicroModal.init();
  });

  return (
    <>
      <div className="admin-dashbord">
        {/*------------------------------Vertical-admin-nav----------------------------- */}
        <div className={`hamburger-icon`} onClick={handleToggle}>
          <FaBars />
        </div>

        <div
          id="admin-dashboard-nav"
          className={`${toggle ? "block" : "verticle-navbar"}`}
          onClick={closeWindow}
        >
          <div className="close-btn">
            <IoIosCloseCircle />
          </div>

          <div className="logo">
            <img
              className="logo-img"
              src={require("../../assets/icons/upscaler-2-2x 1.png")}
            />
            <h2 className="dashbord-nav-h2">ALGO Today</h2>
          </div>

          <div className="dashbord-horiz"></div>

          {/* <div className="nav-ul"> */}
          <ul id="admin-dash-ul-nav" className={`ul-list`}>
            <div className="iconhome">
              <GrHomeRounded color="white" />
              <li className="vertnav-ul-li" id="home">
                <Link
                  // to="/"
                  style={{ textDecorationLine: "none", color: "white" }}
                >
                  <span className="link-text">Home</span>
                </Link>
              </li>
            </div>
            <div>
              <li className="vertnav-ul-li" id="wallet">
                <img
                  className="iconimg"
                  src={require("../../assets/icons/Vector2.png")}
                  alt="vector"
                />
                <Link
                  // to="/wallet"
                  style={{ textDecorationLine: "none", color: "white" }}
                >
                  <span className="link-text">Wallet</span>
                </Link>
              </li>
            </div>
            <div>
              <li className="vertnav-ul-li" id="cust">
                <img
                  className="iconimg"
                  src={require("../../assets/icons/Group 48096030.png")}
                  alt="vector"
                />
                <Link
                  // to="/custom"
                  style={{ textDecorationLine: "none", color: "white" }}
                >
                  <span className="link-text">CustomStrategies</span>
                </Link>
              </li>
            </div>
            <div>
              <li className="vertnav-ul-li" id="mantrad">
                <img
                  className="iconimg"
                  src={require("../../assets/icons/Group 48096029.png")}
                  alt="vector"
                />
                <Link
                  // to="/managetrading"
                  style={{ textDecorationLine: "none", color: "white" }}
                  // onClick={iconClick}
                  data-micromodal-trigger="modal-1"
                >
                  <span className="link-text">Edit Streategies</span>
                </Link>
              </li>
            </div>
          </ul>
          {/* </div> */}
        </div>

        {/*------------------------------Horizontal-admin-nav----------------------------- */}
        <div className="admin-dash-horizontal-nav-maindiv">
          <div className="dash-horizontal-nav-subdiv">
            <ul className="dash-horizontal-nav-ul">
              <div className="dash-horizontal-nav-divofli">
                <li className="dash-horizontal-nav-li">
                  {!isKeyPressed && (
                    <CiSearch
                      className={`horizontal-nav-li-icon ${
                        isKeyPressed ? "icon-hidden" : ""
                      }`}
                    />
                  )}
                  <input
                    className={`dash-hori-inp`}
                    type="search"
                    placeholder="Search..."
                    onChange={handleKeyPress}
                  />
                </li>
                <div className="waana-flex-this-li">
                  <li className="dash-horizontal-nav-li">
                    {/* <h5 className="email-top-number-show">7</h5> */}
                    <LuMail
                      className={`dash-hori-icon ${
                        showEmail ? "bg-color" : ""
                      }`}
                      onClick={emailIconClick}
                    />
                  </li>
                  <li className="dash-horizontal-nav-li">
                    {/* <h5 className="email-top-number-show2">3</h5> */}
                    <IoNotificationsOutline
                      className={`dash-hori-icon ${
                        showNotification ? "bg-color" : ""
                      }`}
                      onClick={belliconClick}
                    />
                  </li>
                </div>
              </div>
              <div className="dash-horizontal-nav-2nddiv">
                <div className="dash-horizontal-nav-imgdiv">
                  <img
                    src={require("../../assets/icons/IMG_0399.jpg")}
                    className="dash-nav-img"
                  />
                </div>
                <div className="dash-horizontal-nav-txtdiv">
                  <h3 className="dash-horizontal-nav-txt">Aman Jain</h3>
                  <p className="dash-horizontal-nav-para">Admin</p>
                </div>
              </div>
            </ul>
          </div>
        </div>

        {/*------------------------------Dashboard-User-List----------------------------- */}
        <div className="dashbord-userlist-div">
          <div className="userlist-main-div">
            <ul className="userlist-ui">
              <div className="userlist-div">
                <div className="userlist-li-div">
                  <li className="li-list">All User</li>
                </div>
                <div className="userlist-li-div">
                  <li className="li-list">Inactive</li>
                </div>
                <div className="userlist-li-div">
                  <li className="li-list">Active</li>
                </div>
                <div className="userlist-li-div">
                  <li className="li-list">Low Coins</li>
                </div>
                <div className="userlist-li-div">
                  <li className="li-list">Expiry Date</li>
                </div>
              </div>
              <div className="userlist-input-search-div">
                {!isKeyPressed && (
                  <CiSearch
                    className={`userlist-search-icon ${
                      isKeyPressed ? "icon-hidden" : ""
                    }`}
                  />
                )}
                <input
                  className="userlist-input-search"
                  type="search"
                  placeholder="Search user, coin, broker amt...."
                  onChange={handleKeyPress}
                />
              </div>
            </ul>
          </div>
          <div className="wanna-grid-user-list">
            <div className="user-list">
              {userlistData?.slice(0, maxContentOnPage)?.map((item, index) => {
                const {
                  userimg,
                  username,
                  stra1,
                  stra2,
                  coinbala,
                  currestatus,
                  Expir,
                } = item;
                return (
                  <>
                    <div className="wanna-flex-do-it" key={index}>
                      <div className="user-list-div1">
                        <img className="list-div1-img" src={userimg} />
                      </div>
                      <div className="user-list-div2">
                        <div className="user-list-div2-subdiv1">
                          <h3 className="subdiv1-h3">{username}</h3>
                        </div>
                        <div className="user-list-div2-subdiv2">
                          <div className="div2-subdiv2-1">
                            <h3 id="h3-1-subdiv" className="subdiv2-h3">
                              {stra1}
                            </h3>
                            <h4 id="h4-1-subdiv" className="subdiv2-h4">
                              {Expir}
                            </h4>
                          </div>
                          <div className="div2-subdiv2-2">
                            <h3 id="h3-2-subdiv" className="subdiv2-h3">
                              {stra2}
                            </h3>
                            <h4 id="h4-2-subdiv" className="subdiv2-h4">
                              {Expir}
                            </h4>
                          </div>
                          <div className="div2-subdiv2-3">
                            <h3 id="h3-3-subdiv" className="subdiv2-h3">
                              {coinbala}
                            </h3>
                            <h4 id="h4-3-subdiv" className="subdiv2-h4">
                              {Expir}
                            </h4>
                          </div>
                          <div className="div2-subdiv2-4">
                            <h3 id="h3-4-subdiv" className="subdiv2-h3">
                              {currestatus}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>

          {/*------------------------------Pagination-thingss----------------------------- */}
          {userlistData.length >= maxContentOnPage && (
            <div className="pagination-main-div">
              <div className="pagination-1stdiv">
                <div className="firstdiv-ofh3">
                  <h3 className="ofh3">Results per Page</h3>
                </div>
                <div className="seconddiv-ofh4">
                  <h4 className="ofh4">{maxContentOnPage}</h4>
                </div>
              </div>
              <div className="pagination-2nddiv">
                <button className="page-more-button" onClick={loadMore}>
                  See More
                </button>
              </div>
              <div className="pagination-3rddiv"></div>
            </div>
          )}
        </div>
      </div>

      {/*-----------------------Notification pop-up------------------------ */}
      {showNotification && (
        <div className="icon-notification-div">This is Notification Pop-Up</div>
      )}

      {/*-----------------------Email pop-up------------------------ */}
      {showEmail && (
        <div className="icon-notification-div">
          This is Email Notification Pop-Up
        </div>
      )}

      {/*----------------------Modal Edit------------------------- */}
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
                Edit Strategy
              </h2>
              <button
                class="modal__close"
                aria-label="Close modal"
                data-micromodal-close
              ></button>
            </header>
            <main class="modal__content" id="modal-1-content">
              <>
                <div className="admin-strategies-main-container">
                  <div className="algo-trading-container">
                    <div className="main-div-admin-edit-input">
                      <div className="admin-edit-input">
                        <input
                          className="cust-inputbtn"
                          type="text"
                          placeholder="Trace Candle"
                          name="Trace Candle"
                          // value={inputValues.quantity}
                          // onChange={(e) =>
                          //   setInputValues((prev) => ({
                          //     ...prev,
                          //     target_profit: parseInt(e.target.value),
                          //   }))
                          // }
                        />
                      </div>

                      <div className="admin-edit-input">
                        <input
                          className="cust-inputbtn"
                          type="text"
                          placeholder="Close"
                          name="Close"
                          // value={inputValues.quantity}
                          // onChange={(e) =>
                          //   setInputValues((prev) => ({
                          //     ...prev,
                          //     target_profit: parseInt(e.target.value),
                          //   }))
                          // }
                        />
                      </div>

                      <div className="admin-edit-input">
                        <input
                          className="cust-inputbtn"
                          type="text"
                          placeholder="High"
                          name="High"
                          // value={inputValues.quantity}
                          // onChange={(e) =>
                          //   setInputValues((prev) => ({
                          //     ...prev,
                          //     target_profit: parseInt(e.target.value),
                          //   }))
                          // }
                        />
                      </div>

                      <div className="admin-edit-input">
                        <input
                          className="cust-inputbtn"
                          type="text"
                          placeholder="Low"
                          name="Low"
                          // value={inputValues.quantity}
                          // onChange={(e) =>
                          //   setInputValues((prev) => ({
                          //     ...prev,
                          //     target_profit: parseInt(e.target.value),
                          //   }))
                          // }
                        />
                      </div>

                      <div className="admin-edit-input">
                        <input
                          className="cust-inputbtn"
                          type="text"
                          placeholder="Open"
                          name="Open"
                          // value={inputValues.quantity}
                          // onChange={(e) =>
                          //   setInputValues((prev) => ({
                          //     ...prev,
                          //     target_profit: parseInt(e.target.value),
                          //   }))
                          // }
                        />
                      </div>

                      <div className="admin-edit-input">
                        <input
                          name="Buying Multiplier"
                          className="cust-inputbtn"
                          type="text"
                          placeholder="Buying Multiplier"
                        />
                      </div>

                      <div className="admin-edit-input">
                        <input
                          name="stop_loss_multiplier"
                          className="cust-inputbtn"
                          type="text"
                          placeholder="Stop Loss Multiplier"
                        />
                      </div>

                      <div className="admin-edit-input">
                        <input
                          className="cust-inputbtn"
                          type="text"
                          placeholder="Sl Low Multiplier"
                          name="Sl Low Multiplier"
                        />
                      </div>

                      <div className="admin-edit-input">
                        <input
                          className="cust-inputbtn"
                          type="text"
                          placeholder="Sl Low Multiplier 2"
                          name="sl_low_multiplier_2"
                        />
                      </div>

                      <div className="admin-edit-input">
                        <input
                          className="cust-inputbtn"
                          type="text"
                          placeholder="Trail Sl 1"
                          name="trail_sl_1"
                        />
                      </div>

                      <div className="admin-edit-input">
                        <input
                          className="cust-inputbtn"
                          type="text"
                          placeholder="Trail Sl 2"
                          name="trail_sl_2"
                        />
                      </div>

                      <div className="admin-edit-input">
                        <input
                          className="cust-inputbtn"
                          type="text"
                          placeholder="Modify Stop Loss 1"
                          name="modify_stop_loss_1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </main>
            <footer class="modal__footer">
              <button
                class="modal__btn modal__btn-primary"
                // onClick={() => dispatch(stopStrategy(getStrategy?.strategy_id))}
              >
                Modify Strategy
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
export default React.memo(Dashboard);
