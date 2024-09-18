import React from "react";
import "./numberdata.css";

// Helper function to calculate the maximum width of datano values
const calculateMaxWidth = (webdata) => {
  let maxWidth = 0;
  webdata?.forEach((item) => {
    const width = item.datano.toString().length;
    if (width > maxWidth) {
      maxWidth = width;
    }
  });
  return maxWidth;
};

// Component for rendering individual data items
const DataItem = ({ datano, value, maxWidth }) => {
  return (
    <div className="numberdataa-seconddiv-div">
      <div className="seconddiv-div-number" style={{ width: `${maxWidth}` }}>
        <h5 className="div-number-h5">{datano}</h5>
      </div>
      <div className="seconddiv-div-text">
        <p className="div-text-para">{value}</p>
      </div>
    </div>
  );
};

// Main Numberdata component
const Numberdata = ({ webdata, text1, para1 }) => {
  // Calculate the maximum width of datano values
  const maxWidth = calculateMaxWidth(webdata);

  return (
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
        {webdata?.map((item, index) => (
          <DataItem key={index} datano={item.datano} value={item.value} maxWidth={maxWidth} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Numberdata);
