import React from "react";
import "./opendemate.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import HorizontalNav from "../../components/navbar/HorizontalNav";

const OpenDemat = () => {
  return (
    <>
      <HorizontalNav />
      <Navbar />
      <div id="opendemate-container-first" className="container">
        <h1 className="text-center ml-4 open-demat-heading" >
          Open Your Demate Account with the Given Brokers
        </h1>
      </div>

      <div className="container text-center mt-3">
        <p className="embark-para">
          "Embark on a revolutionary journey into the world of trading with
          AlgoToday, your gateway to financial freedom. Our platform not only
          offers the convenience of automated trading but also empowers you to
          shape your trading destiny by allowing customization of strategies".
        </p>
      </div>

      <div className="d-flex mt-3" id="wanna-flex-this-div">
        <div className="m-2 p-2 max-w-xs shadow mb-5 bg-white rounded w-100">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Automate Your Own Strategy:
          </h2>
          <p className="text-gray-700 text-center">
            At AlgoToday, we understand that every trader is unique, and trading
            strategies should reflect individual preferences and market
            insights. With our user-friendly interface, you have the power to
            automate your own trading strategy effortlessly. Whether you're a
            seasoned trader with a well-defined approach or a novice exploring
            strategies, AlgoToday provides the tools to turn your vision into
            reality.
          </p>
        </div>

        <div className="m-2 p-2 max-w-xs shadow mb-5 bg-white rounded w-100">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Predefined Strategies for Instant Success
          </h2>
          <p className="text-gray-700 text-center">
            For those seeking a quick start or inspiration, AlgoToday offers a
            range of predefined strategies crafted by experts. These strategies
            are meticulously designed to adapt to market conditions, harnessing
            the power of cutting-edge algorithms. Choose from our library of
            strategies to align with your financial goals and risk tolerance,
            giving you the flexibility to trade confidently and strategically.
          </p>
        </div>

        <div className="m-2 p-2 max-w-xs shadow mb-5 bg-white rounded w-100">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Trade Smarter with Algorithmic Precision
          </h2>
          <p className="text-gray-700 text-center">
            AlgoToday's advanced algorithms empower you to trade smarter by
            analyzing market data with precision and executing trades at optimal
            moments. The platform's real-time adaptability ensures that your
            strategies stay relevant in the ever-evolving market landscape.
            Imagine having a dedicated trading companion working around the
            clock to secure opportunities and mitigate risks, allowing you to
            focus on the bigger picture.
          </p>
        </div>
      </div>

      <div className="container text-center">
        <Link to="/">
          <button
            className="btn btn-primary we"
            type="submit"
            style={{ marginRight: "-15vw" }}
          >
            Register Now
          </button>
        </Link>
      </div>

      <div className="container text-center mt-5">
        <h1 className="text-center ml-4" style={{ marginLeft: "10%" }}>
          {" "}
          Our Next Must-Have: Download Instantly!{" "}
        </h1>
        <p className="embark-para">
          "Supercharge your trading experience! Open your Demat account with any
          broker through our exclusive referral links. Unlock personalized
          benefits such as reduced fees, bonus trades, and cash rewards—each
          tailored to the referral policy of the respective broker. Seize the
          opportunity for a more rewarding trading journey!"
        </p>
      </div>

      <div className="firstLink">
        <div
          id="firstLink-firstdiv"
          className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <Link to="https://zerodha.com/open-account?c=SSA146">
            <img
              id="firstLink-firstdiv-firstimg"
              className="w-full h-48 object-cover object-center"
              src={require("../../assets/icons/zerodha img.png")}
              alt="Zerodha"
            />
            <div className="px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Zerodha
              </h2>
              <p className="text-gray-700 text-base">
                Open Your Account with Zerodha
              </p>
            </div>
          </Link>
        </div>

        <div
          id="firstLink-seconddiv"
          className="max-w-xs  bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <Link to="https://angel-one.onelink.me/Wjgr/8rxhm6bt">
            <img
              id="firstLink-firstdiv-seconddiv"
              className="w-full h-48 object-cover object-center"
              src={require("../../assets/icons/angel img.webp")}
              alt="Card Image"
            />
            <div className="px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Angel Broking
              </h2>
              <p className="text-gray-700 text-base">
                Open Your Account with Angel Broking
              </p>
            </div>
          </Link>
        </div>

        <div
          id="firstLink-thirddiv"
          className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <Link to="https://KotakSecurities.ref-r.com/c/i/32531/100378123?r=wa">
            <img
              id="firstLink-firstdiv-thirdimg"
              className="w-full h-48 object-cover object-center"
              src={require("../../assets/icons/kotak securities.webp")}
              alt="Card Image"
            />
            <div className="px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Kotak Securities
              </h2>
              <p className="text-gray-700 text-base">
                Open Your Account with Kotak Securities
              </p>
            </div>
          </Link>
        </div>

        <div
          id="firstLink-fourthdiv"
          className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <Link to="https://5paisa.page.link/WaaBDpoGUdbVhcY7A">
            <img
              id="firstLink-firstdiv-fourthimg"
              className="w-full h-48 object-cover object-center"
              src={require("../../assets/icons/5 pAISA IMG.png")}
              alt="Card Image"
            />
            <div className="px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                5 Paisa
              </h2>
              <p className="text-gray-700 text-base">
                Open Your Account with 5 Paisa
              </p>
            </div>
          </Link>
        </div>
      </div>

      <div className="d-flex mt-4" id="wanna-flex-this-div">
        <div className="m-2 p-2 max-w-xs shadow mb-5 bg-white rounded w-100">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Step into a World of Possibilities: <Link> Register Now </Link>
          </h2>
          <p className="text-gray-700 text-center">
            "Register with us for exclusive updates and stay ahead in the
            financial game! We promise to keep you informed about upcoming
            developments without unnecessary disturbances. Your peace of mind is
            important to us – minimal calls, minimal messages, but maximum
            value. Join us for a hassle-free and informative experience.
            Register now!".
          </p>
        </div>
      </div>

      <div className="container text-center">
        <Link to="/">
          <button
            className="btn btn-primary we"
            type="submit"
            style={{ marginRight: "-15vw" }}
          >
            Register Now
          </button>
        </Link>
      </div>
    </>
  );
};

export default React.memo(OpenDemat);
