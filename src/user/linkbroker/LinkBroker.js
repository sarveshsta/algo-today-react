import "./linkbroker.css";
import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import Navbar from "../../components/navbar/Navbar";
import HorizontalNav from "../../components/navbar/HorizontalNav";
import angelLogo from "../../assets/angel-one-logos-id-Z21xHlt.png";

import { Box } from "./Box";

const LinkBroker = () => (
  <div>
    <HorizontalNav />
    <Navbar />
    <div className="container" id="linkbroker-main-container">
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
      </div>
    </div>
  </div>
);

export default React.memo(LinkBroker);
