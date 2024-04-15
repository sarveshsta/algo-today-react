import "./linkbroker.css";
import React from "react";
import { Link } from "react-router-dom";
import zerodhaLogo from "../../assets/Group.png";
import Navbar from "../../components/navbar/Navbar";
import HorizontalNav from "../../components/navbar/HorizontalNav";
import angelLogo from "../../assets/angel-one-logos-id-Z21xHlt.png";

const Box = ({ heading, imageUrl, altText, linkUrl }) => (
  <div className="box">
    <div className="headng-div">
      <h3 className="box-h3">{heading}</h3>
    </div>
    <div>
      <img className="box-img" src={imageUrl} alt={altText} />
    </div>
    <div className="box-btnn-div">
      <Link to={linkUrl}>
        <button type="button" className="btn btn-primary">
          Setup
        </button>
      </Link>
    </div>
  </div>
);

const LinkBroker = () => (
  <div>
    <HorizontalNav />
    <Navbar />
    <div className="container" id="linkbroker-main-container">
      <div className="row" id="linkbroker-row-div">
        <Box
          heading="Link your Broker Account with Zerodha"
          imageUrl={zerodhaLogo}
          altText="Zerodha logo"
          linkUrl="https://smartapi.angelbroking.com/publisher-login?api_key=p1X1tdVU"
        />
        <Box
          heading="Link your Broker Account with Zerodha"
          imageUrl={zerodhaLogo}
          altText="Zerodha logo"
          linkUrl="https://smartapi.angelbroking.com/publisher-login?api_key=p1X1tdVU"
        />
      </div>

      <div className="row">
        <Box
          heading={
            <>
              Link your Broker Account with <span className="angle">Angel</span>
              <span className="one">One</span>
            </>
          }
          imageUrl={angelLogo}
          altText="Angel One logo"
          linkUrl="https://angelbroking.com"
        />
        <Box
          heading={
            <>
              Link your Broker Account with <span className="angle">Angel</span>
              <span className="one">One</span>
            </>
          }
          imageUrl={angelLogo}
          altText="Angel One logo"
          linkUrl="https://angelbroking.com"
        />
      </div>
    </div>
  </div>
);
export default React.memo(LinkBroker);
