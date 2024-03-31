import "./footer.css";
import React from "react";
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { RxTwitterLogo } from "react-icons/rx";

const Footer = () => {
  return (
    <>
      <div className="mainfooter">
        <div className="footer-subb1">
          <div id="first-footer" className="footer-content-div">
            <div className="algo-img-footer">
              <img
                src={require("../../assets/icons/upscaler-1.png")}
                alt="image"
                className="logooo-imagee"
              />
            </div>
            <div className="footer-paraa">
              <p className="paa-para">
                Lorem Ipsum has been the industry's <br/>
                 standard dummy text ever since the 1500s, <br/>
                 when an unknown printer took a galley of <br/>
                 type and scrambled it to make a type <br/>
                 specimen book.
              </p>
            </div>
            <div className="footer-icons-show">
              <div className="footer-icn"><RxTwitterLogo /></div>
              <div className="footer-icn"><FiFacebook /></div>
              <div className="footer-icn"><FaInstagram /></div>
            </div>
          </div>
          <div className="footer-content-div">
            <div>
              <h4 id="comp-blue-col" className="footer-firstof-h4">Company</h4>
            </div>
            <div>
              <h4 className="footer-firstof-h4">About</h4>
            </div>
            <div>
              <h4 className="footer-firstof-h4">Features</h4>
            </div>
            <div>
              <h4 className="footer-firstof-h4">Works</h4>
            </div>
            <div>
              <h4 className="footer-firstof-h4">Career</h4>
            </div>
          </div>
          <div className="footer-content-div">
            <div>
              <h4 id="help-blue-col" className="footer-firstof-h4">Help</h4>
            </div>
            <div>
              <h4 className="footer-firstof-h4">CustomerSupport</h4>
            </div>
            <div>
              <h4 className="footer-firstof-h4">DeliveryDetails</h4>
            </div>
            <div>
              <h4 className="footer-firstof-h4">Terms & Conditions</h4>
            </div>
            <div>
              <h4 className="footer-firstof-h4">PrivacyPolicy</h4>
            </div>
          </div>
          <div className="footer-content-div">
            <div>
              <h4 id="res-blue-col"  className="footer-firstof-h4">Resources</h4>
            </div>
            <div>
              <h4 className="footer-firstof-h4">FreeeBooks</h4>
            </div>
            <div>
              <h4 className="footer-firstof-h4">Development Tutorial</h4>
            </div>
            <div>
              <h4 className="footer-firstof-h4">HowtoBlog</h4>
            </div>
            <div>
              <h4 className="footer-firstof-h4">YoutubePlaylist</h4>
            </div>
          </div>
          <div className="footer-content-div">
            <div>
              <h4 id="inst-blue-col" className="footer-firstof-h4">Install App</h4>
            </div>
            <div><img className="store-img" src={require('../../assets/icons/App Store.png')} /></div>
            <div><img className="store-img" src={require('../../assets/icons/Play Store.png')} /></div>
          </div>
        </div>
        <div className="footer-subb2">
          <h5 className="footer-firstof-h5">© Copyright 2022, All Rights Reserved by Algo Today</h5>
        </div>
      </div>
    </>
  );
};

export default Footer;
