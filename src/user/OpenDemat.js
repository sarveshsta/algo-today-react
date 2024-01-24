import React from "react";
import Navbar from "../components/navbar/Navbar";
import HorizontalNav from "../components/navbar/HorizontalNav";
import "./opendemate.css";
import { Link } from "react-router-dom";

const OpenDemat = () => {
  return (
    <>
      <HorizontalNav />
      <Navbar />
      <div id="opendemate-container-first" className="container">
        <h1 className="text-center ml-4">
          Open Your Demate Account with the Given Brokers
        </h1>
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
              src={require("../assets/icons/zerodha img.png")}
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
              src={require("../assets/icons/angel img.webp")}
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
              src={require("../assets/icons/kotak securities.webp")}
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
              src={require("../assets/icons/5 pAISA IMG.png")}
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
    </>
  );
};

export default OpenDemat;
