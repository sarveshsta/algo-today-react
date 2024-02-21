import React from "react";
import styled from "styled-components";
import Navbar from "../components/navbar/Navbar";
import HorizontalNav from "../components/navbar/HorizontalNav";

const Wrapper = styled.div`
 
   .refer-main-div {
    width: -webkit-fill-available;
height: 757px;
border-radius: 25px;
background: linear-gradient(90.3deg, rgba(255, 255, 255, 0.75) 0.06%, rgba(255, 255, 255, 0.45) 100%);
box-shadow: 0px 28px 62px 0px rgba(0, 0, 0, 0.1);
margin-left: 17%;
border: 2px solid black;
padding: 2rem;
     .refer-sub-div{
      width: -webkit-fill-available;
        border: 2px solid green
     }
   },
`;

const ReferEarn = () => {
  return (
    <Wrapper>
      <HorizontalNav />
      <Navbar />
      <div className="refer-main-div">
        <div className="refer-sub-div"></div>
      </div>
    </Wrapper>
  );
};

export default ReferEarn;
