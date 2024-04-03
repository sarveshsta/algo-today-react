import './numberdata.css'
import React from "react";

const Numberdata = ({ webdata, text1, para1 }) => {
  return (
    <>
      <div className="numberdataa-main">
        <div className="numberdataa-firstdiv">
          <div className="numberdataa-firstdiv-h3div">
            <h3 className="numberdataa-h3div-h3">{text1}</h3>
          </div>
          <div className="numberdataa-firstdiv-paradiv">
            <p className="numberdataa-paradiv-para">{para1}</p>
          </div>
        </div>
        <div className="numberdataa-seconddiv">
          {webdata.map((item, index) => (
            <>
              <div className="numberdataa-seconddiv-div" key={index}>
                <div className="seconddiv-div-number">
                  <h5 className="div-number-h5">{item.datano}</h5>
                </div>
                <div className="seconddiv-div-text">
                  <p className="div-text-para">{item.value}</p>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default React.memo(Numberdata);
