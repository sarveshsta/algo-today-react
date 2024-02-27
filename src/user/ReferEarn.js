import React from "react";
import styled from "styled-components";
import { Bounce, ToastContainer, toast } from "react-toastify";
import Navbar from "../components/navbar/Navbar";
import HorizontalNav from "../components/navbar/HorizontalNav";

const Wrapper = styled.div`
  .refer-main-div {
    width: -webkit-fill-available;
    border-radius: 25px;
    background: linear-gradient(
      90.3deg,
      rgba(255, 255, 255, 0.75) 0.06%,
      rgba(255, 255, 255, 0.45) 100%
    );
    // box-shadow: 0px 0px 158px 161px rgba(8, 7, 5, 0.1);
    box-shadow: 0px 28px 62px 0px rgba(0, 0, 0, 0.1);
    margin-left: 17%;
    padding: 2rem;
    margin-top: 1rem;
    margin-right: 1rem;
    margin-bottom: 1rem;

    .refer-sub-div {
      width: -webkit-fill-available;
      // border-bottom: 2px solid rgba(217, 217, 217, 1);

      .refer&earn-text {
        .re-text {
        }

        .re-para {
        }
      }
    }
  }

  ,
  .refer-img-section {
    display: flex;
    margin-top: 3rem;
    padding: 2rem;

    .ref-section1 {
      width: 50%;
      margin-right: 4rem;
    }

    .ref-section2 {
      width: 50%;
      align-self: center;
    }

    .ref-image {
      width: -webkit-fill-available;
    }

    .section2-input {
      border-radius: 44px;
      border: 1px solid rgba(52, 152, 219, 1);
      background: rgba(52, 152, 219, 0.25);
      width: -webkit-fill-available;
      margin: 0;
      font-size: 1.2rem;
      font-weight: 400;
      padding: 10px;
    }

    .section2-h2 {
      font-size: 20px;
      font-weight: 500;
      letter-spacing: 0em;
      text-align: left;
    }
  }

  .input-copy-div {
    display: flex;
  }

  .copy-text {
    position: absolute;
    right: 5.5rem;
    margin-top: 4px;
    background: rgba(52, 152, 219, 1);
    border-radius: 46px;
    padding: 6px;
    border: none;
    color: white;
    width: 8%;
  }

  .copy-text:before {
    content: "";
    background: linear-gradient(
      45deg,
      #ff0000,
      #ff7300,
      #fffb00,
      #48ff00,
      #00ffd5,
      #002bff,
      #7a00ff,
      #ff00c8,
      #ff0000
    );
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing 20s linear infinite;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    border-radius: 10px;
  }

  .copy-text:active {
    color: #000;
  }

  .copy-text:active:after {
    background: transparent;
  }

  .copy-text:hover:before {
    opacity: 1;
  }

  .copy-text:after {
    z-index: -1;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    // background: #111;
    left: 0;
    top: 0;
    border-radius: 10px;
  }

  @keyframes glowing {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 400% 0;
    }
    100% {
      background-position: 0 0;
    }
  }

  .refes-blue-abs-div {
    position: absolute;
    bottom: 0;
    width: 794px;
    height: 794px;
    top: 380px;
    left: 1192px;
    opacity: 0.3;
    background: rgba(52, 152, 219, 1);
    z-index: -1;
  }

  .refer-earn-text {
    border-bottom: 2px solid rgba(217, 217, 217, 1);
  }
`;

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
    <Wrapper>
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
                src={require("../assets/icons/undraw_share_link.png")}
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
    </Wrapper>
  );
};

export default React.memo(ReferEarn);
