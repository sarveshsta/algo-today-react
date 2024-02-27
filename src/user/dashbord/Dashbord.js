import React from "react";
import "./dashbord.css";
import Shape from "../../components/shape/Shape";
import Navbar from "../../components/navbar/Navbar";
import Indices from "../../components/indices/Indices";
import Stockgla from "../../components/topgla/Stockgla";
import Strategy from "../../components/strategy/Strategy";
import HorizontalNav from "../../components/navbar/HorizontalNav";
import Yourstrategy from "../../components/boxstrategy/Yourstrategy";

const Dashbord = () => {
  return (
    <div className="Container">
    <HorizontalNav/>
      {/* <Shape /> */}
      <Navbar />
      <Indices />
      <Strategy />
      <Stockgla />
      <Yourstrategy/>
    </div>
  );
};

export default React.memo(Dashbord);
