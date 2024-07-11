import "../components/navbar/Navbar";
import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import HorizontalNav from "../components/navbar/HorizontalNav";
import Headerr from "../components/formcomponent/Headerr";
import Dropdownstrategies from "./Dropdownstrategies";


const Mystrategies = () => {
  const [showBtnOnClick, setShowBtnOnClick] = useState(true);

  return (
    <>
      <Navbar />
      <HorizontalNav showBtnOnClick={showBtnOnClick} />
      <Headerr headText="Strategy-1" />
      <Dropdownstrategies/>
    </>
  );
};

export default React.memo(Mystrategies);
