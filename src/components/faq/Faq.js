import "./faq.css";
import React, { useState } from "react";

const Faq = ({ faquiz }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <>
      <div className="faq-firsrdiv">
        <h3 className="faq-h3">F.A.Q</h3>
        <p className="faq-para">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
      <div className="faq-containt-box">
        {faquiz.map((item, index) => (
          <>
            <div key={index} className="faq-griding-here">
              <div
                className="faq-inner-box"
                onClick={() => handleToggle(index)}
                aria-expanded={index === activeIndex ? "true" : "false"}
              >
                <div className="wanna-flex-this-icon">
                  <h3 className="faq-h33">{item.question}</h3>
                  <h5 className="faq-h55">{activeIndex ? "-" : "+"}</h5>
                </div>
                {index === activeIndex && (
                  <p className="faq-paraa">{item.answer}</p>
                )}
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};
export default Faq;
