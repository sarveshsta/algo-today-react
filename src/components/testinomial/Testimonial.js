import React from "react";
import "./testimonial.css";

const Testimonial = () => {
  return (
    <>
      <div className="testimonial-main-div">
        <div className="testimonial-sub-div">
          <h3 className="testimonial-sub-h3">Client testimonial</h3>
        </div>
        <div className="testimonial-sub-seconddiv">
          <p className="testimonial-sub-para">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
        <div className="testimonial-Slider-div">
          <div className="this-is-the-slider">
            <div className="sliderr-container">
              <div className="sliderr-sub-container">
                <div className="img-of-slider">
                  <img
                    className="imagee"
                    src={require("../../assets/icons/Image.png")}
                  />
                </div>
                <div className="sliderr-boxof-heading">
                  <div className="sliderr-heading">
                    <h3 className="heading-h3">Esther Hills </h3>
                  </div>
                  <div className="sliderr-boxof-para">
                    <p className="paraa-p">Lead Intranet Technician</p>
                  </div>
                </div>
              </div>
              <div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Testimonial;
