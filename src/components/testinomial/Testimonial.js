import "./testimonial.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import React, { useEffect, useRef, useState } from "react";
import { sliderData } from "../../arraydata/Arraydata";

const Testimonial = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState();
  const sliderContentRef = useRef(null);

  useEffect(() => {
    const totalSlides = sliderContentRef.current.children.length;
    setTotalSlides(totalSlides);
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000); // Change 5000 to adjust the auto-slide interval
    return () => clearInterval(interval); // Cleanup function to clear interval
  }, [currentSlide]);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? totalSlides - 1 : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === totalSlides - 1 ? 0 : prevSlide + 1
    );
  };

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
            {sliderData.map((item) => (
              <>
                <div
                  className="sliderr-container"
                  ref={sliderContentRef}
                  style={{ transform: `translateX(${currentSlide * 50}%)` }}
                >
                  <div className="sliderr-sub-container">
                    <div className="img-of-slider">{item.img}</div>
                    <div className="sliderr-boxof-heading">
                      <div className="sliderr-heading">
                        <h3 className="heading-h3">{item.text1}</h3>
                      </div>
                      <div className="sliderr-boxof-para">
                        <p className="paraa-p">{item.para1}</p>
                      </div>
                    </div>
                  </div>
                  <div className="sliderr-sub-container2">
                    <p className="sliderr-sub-container2-para">{item.para2}</p>
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="slider-arrows">
            <IoIosArrowBack className="arrows" onClick={handlePrevSlide} />
            <IoIosArrowForward className="arrows" onClick={handleNextSlide} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Testimonial;
