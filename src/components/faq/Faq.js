import React, { useState } from "react";
import "./faq.css";

const Faq = ({ faquiz }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    console.log("index :: ", index);
    setActiveIndex((prevIndex) => {
      console.log("prevv :: ", prevIndex);

      return prevIndex === index ? null : index;
    });
  };

  return (
    <>
      <div className="faq-firsrdiv">
        <h3 className="faq-h3">F.A.Q</h3>
        <p className="faq-para">
          Here are some answers to your most frequently asked questions!
          Couldn’t get your answer here? Contact us. We’re ready to help you
          today!
        </p>
      </div>
      <div className="faq-containt-box">
        {faquiz.map((item, index) => (
          <React.Fragment>
            <div className="faq-griding-here">
              <div
                className="faq-inner-box"
                onClick={() => handleToggle(index)}
                aria-expanded={index == activeIndex ? "true" : "false"}
              >
                <div className="wanna-flex-this-icon">
                  <h3 className="faq-h33">{item.question}</h3>
                  <h5 className="faq-h55">
                    {index == activeIndex ? "-" : "+"}
                  </h5>
                </div>
                {index == activeIndex && (
                  <p className="faq-paraa">{item.answer}</p>
                )}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default React.memo(Faq);
