import './referearn.css'
import React from "react";
import styled from "styled-components";
import Navbar from "../../components/navbar/Navbar";
import { Bounce, ToastContainer, toast } from "react-toastify";
import HorizontalNav from "../../components/navbar/HorizontalNav";

const ReferEarn = () => {

 const toastProperty = {
  position: "top-right",
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  theme: "light",
  transition: Bounce,
}

  const copyText = () => {
    const copied = document.getElementById("inp-input");
    const textarea = document.createElement("textarea");
    textarea.value = copied.innerHTML;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    toast.success("Text Copied", toastProperty);
  };

  return (
    <div>
      <ToastContainer autoClose={2000} />
      <HorizontalNav />
      <Navbar />
      <div className="refer-main-div">
        <div className="refer-sub-div">
          <div className="refer-earn-text">
            <h2 className="re-text">Refer & Earn</h2>
            <p className="re-para">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
          <div className="refer-img-section">
            <div className="ref-section1">
              <img
                className="ref-image"
                src={require("../../assets/icons/undraw_share_link.png")}
              />
            </div>
            <div className="ref-section2">
              <h2 className="section2-h2">
                when an unknown printer took a galley of type and scrambled it
                to make a type specimen book.
              </h2>
              <div className="input-copy-div">
                <h3 id="inp-input" className="section2-input">
                  https://AlgoTrading.com
                </h3>
                <button type="button" onClick={copyText} className="copy-text">
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="refes-blue-abs-div"></div> */}
    </div>
  );
};

export default React.memo(ReferEarn);
