import React, { useMemo, useRef, useState, useEffect } from "react";
import "./homee.css";
import axios from "axios";
import * as Yup from "yup";
import Faq from "../faq/Faq";
import { useFormik } from "formik";
import Footer from "../footer/Footer";
import Mainnav from "../navbar/Mainnav";
import { BsTelephone } from "react-icons/bs";
import Progres from "../../progress/Progres";
import { FaInstagram } from "react-icons/fa";
import { RxTwitterLogo } from "react-icons/rx";
import Numberdata from "../numberdata/Numberdata";
import { MdAlternateEmail } from "react-icons/md";
import { SlSocialFacebook } from "react-icons/sl";
import MicroModal from "micromodal"; // es6 module
import Testimonial from "../testinomial/Testimonial";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Faqq, numberData } from "../../arraydata/Arraydata";
import Formcomp, { Formcomp1 } from "../formcomponent/Formcomp";

const Homee = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [progressValue, setProgressValue] = useState(0);
  const formData = new FormData();

  const navigate = useNavigate();
  const targetDivRef = useRef(null);

  useEffect(() => {
    MicroModal.init();
  });

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  // Define the validation schema using Yup
  const validationSchema = useMemo(
    () =>
      Yup.object({
        name: Yup.string().required("Name is required"),
        lastname: Yup.string().required("Last Name is required"),
        email: Yup.string()
          .matches(
            /^[a-zA-Z]+$/,
            "Email must contain only alphabetic characters"
          )
          .email("Invalid email address")
          .required("Email is required"),
        phoneNumber: Yup.string()
          .matches(/^[0-9]+$/, "Must be only digits")
          .min(10, "Must be exactly 10 digits")
          .max(10, "Must be exactly 10 digits")
          .required("Phone Number is required"),
        text: Yup.string().required("Enter a text"),
      }),
    []
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      email: "",
      phoneNumber: "",
      text: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      formData.append("name", values.name);
      formData.append("lastname", values.lastname);
      formData.append("email", values.email);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("text", values.text);

      axios
        .post("http://13.234.76.87:8000/form", formData, config)
        .then((response) => {
          if (response.data.message === "Success") {
            toast.success("Response Saved Succesfully");
          }
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            toast.error(`Server Error: ${error.response.status}`);
          } else if (error.request) {
            // The request was made but no response was received
            toast.error("Network Error: Please check your internet connection");
          } else {
            // Something happened in setting up the request that triggered an Error
            toast.error("Error: " + error.message);
          }
        });
    },
  });

  const goldClick = async () => {
    let newWidth = progressValue + 19;
    setProgressValue(newWidth);

    if (newWidth && progressValue !== 0) {
      newWidth = 0;
      setProgressValue(newWidth);
    }
  };

  const silverClick = () => {
    let newWidth = progressValue + 49;
    setProgressValue(newWidth);

    if (newWidth && progressValue !== 0) {
      newWidth = 0;
      setProgressValue(newWidth);
    }
  };

  const platinumClick = () => {
    let newWidth = progressValue + 99;
    setProgressValue(newWidth);

    if (newWidth && progressValue !== 0) {
      newWidth = 0;
      setProgressValue(newWidth);
    }
  };

  const openModal = (plan) => {
    setSelectedPlan(plan);
    setModalOpen(true);
    MicroModal.show("modal-1");
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPlan(""); // Reset the selected plan
  };

  const handleButtonClick = () => {
    // Scroll to the div
    if (targetDivRef.current) {
      targetDivRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <ToastContainer
        autoClose={2000}
        pauseOnFocusLoss={true}
        closeOnClick={true}
        draggable={true}
      />
      <div style={{ background: "#FFFFFF" }}>
        <Mainnav />
        <div className="web-home-content-main">
          <div className="web-home-content-firstdiv">
            <h2 className="homecontent-h2">
              Empower your trades with algorithmic precision
            </h2>
          </div>
          <div className="web-home-content-seconddiv">
            <p className="homecontent-para">
              Navigate the markets with confidence using our algorithmic trading
              platform, where precision meets performance. Empower your
              financial journey with data-driven decisions and seamless
              execution
            </p>
          </div>
          <div className="web-home-content-thirddiv">
            <button className="homecontent-bttn">
              <Link to="/mobile" className="linking">
                Sign Up
              </Link>
            </button>
          </div>
          <div className="blue-abso-color"></div>
          <div class="star-container"></div>
        </div>

        <div className="web-home-image-display-content">
          <div class="star-container1"></div>
          <img
            className="image-display-content"
            src={require("../../assets/icons/Content.png")}
          />
          <div class="star-container2"></div>
        </div>

        <div className="web-home-pricing-section">
          <div className="pricing-section-heading">
            <h3 className="heading-bestprice">Best Pricing</h3>
          </div>
          <div className="pricing-section-para">
            <p className="para-lorem">
              Pricing Options for Our Algorithmic Trading Platform.
            </p>
          </div>
          <div className="pricing-section-track">
            <Progres progressValue={progressValue} />
          </div>
          <div className="pricing-section-mainprice">
            <div className="pricing-gold">
              <div className="pricing-section">
                <div className="pricing-h5-div">
                  <h5 className="pricing-h5">Expert</h5>
                </div>
                <div className="pricing-h4-div">
                  <h4 className="pricing-h4" style={{ filter: "blur(10px)" }}>
                    ₹19<span className="pricing-span"> /month</span>
                  </h4>
                </div>
                <div className="pricing-para-div">
                  <p className="pricing-para">
                    All the basic features to boost your freelance career
                  </p>
                </div>
              </div>
              <div className="pricing-super-list-div">
                <div className="pricing-orderlist-div">
                  <ol className="pricing-orderlist">
                    <li className="pricing-li">
                      Access to core trading algorithms
                    </li>
                    <li className="pricing-li">
                      Access to core modifications only
                    </li>
                    <li className="pricing-li">Basic performance analytics</li>
                    <li className="pricing-li">High Security</li>
                    <li className="pricing-li">Free 50 algo coins</li>
                  </ol>
                </div>
                <div className="pricing-button-div">
                  <button
                    onClick={() => {
                      // openModal("Expert");
                      goldClick();
                      handleButtonClick();
                    }}
                    className="pricing-btnn"
                    type="button"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
            <div className="pricing-silver">
              <div className="pricing-section">
                <div className="pricing-h5-div">
                  <h5 className="pricing-h5">Gold</h5>
                </div>
                <div className="pricing-h4-div">
                  <h4 className="pricing-h4" style={{ filter: "blur(10px)" }}>
                    ₹49<span className="pricing-span"> /month</span>
                  </h4>
                </div>
                <div className="pricing-para-div">
                  <p className="pricing-para">
                    All the basic features to boost your freelance career
                  </p>
                </div>
              </div>
              <div className="pricing-super-list-div">
                <div className="pricing-orderlist-div">
                  <ol className="pricing-orderlist">
                    <li className="pricing-li">
                      Full Access to Expert Strategy
                    </li>
                    <li className="pricing-li"> All silver Plan features </li>
                    <li className="pricing-li">8 Advanced algorithms access</li>
                    <li className="pricing-li">
                      Access to better modifications in algo
                    </li>
                    <li className="pricing-li">
                      Comprehensive analytics and reporting tools
                    </li>
                    <li className="pricing-li">
                      Priority support via email and chat{" "}
                    </li>
                    <li className="pricing-li">Free 2000 algo coins </li>
                  </ol>
                </div>
                <div className="pricing-button-div">
                  <button
                    onClick={() => {
                      // openModal("Gold");
                      silverClick();
                      handleButtonClick();
                    }}
                    className="pricing-btnn"
                    type="button"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
            <div className="pricing-platinum">
              <div className="pricing-section">
                <div className="pricing-h5-div">
                  <h5 className="pricing-h5">Platinum</h5>
                </div>
                <div className="pricing-h4-div">
                  <h4 className="pricing-h4" style={{ filter: "blur(10px)" }}>
                    ₹99<span className="pricing-span"> /month</span>
                  </h4>
                </div>
                <div className="pricing-para-div">
                  <p className="pricing-para">
                    All the basic features to boost your freelance career
                  </p>
                </div>
              </div>
              <div className="pricing-super-list-div">
                <div className="pricing-orderlist-div">
                  <ol className="pricing-orderlist">
                    <li className="pricing-li">
                      Full Access to Expert Strategy
                    </li>
                    <li className="pricing-li">All Gold Plan features</li>
                    <li className="pricing-li">
                      Access to Custom algorithm development tailored to your
                      needs
                    </li>
                    <li className="pricing-li">
                      {" "}
                      Real-time market updates on mail and WhatsApp
                    </li>
                    <li className="pricing-li">
                      Dedicated account manager for personalized support{" "}
                    </li>
                    <li className="pricing-li">Free 5000 algo coins </li>
                  </ol>
                </div>
                <div className="pricing-button-div">
                  <button
                    onClick={() => {
                      // openModal("Platinum");
                      platinumClick();
                      handleButtonClick();
                    }}
                    className="pricing-btnn"
                    type="button"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="web-home-form-section">
          <div className="form-firstdiv">
            <h3 className="form-firstdiv-h3">Get in touch</h3>
            <p className="form-firstdiv-para">
              In response to high traffic, we are prioritizing support for our
              premium members. If you have already registered with AngelOne,
              please complete the form for our services, and we will reach out
              to you shortly. New AngelOne users may use referral code *JTJK*
              for direct entry into our premium group. We appreciate
              your understanding.
            </p>
          </div>
          <div className="form-seconddiv-mainform" ref={targetDivRef}>
            <div className="form-formdiv">
              <form className="formis-form" onSubmit={formik.handleSubmit}>
                <div className="formdiv-h3">
                  <h3 className="h33">Send a message</h3>
                </div>
                <div className="form-inputs-main">
                  <div className="form-firstinputs">
                    <label className="form-inputss-label">First Name</label>
                    <input
                      className="inputsss"
                      type="text"
                      name="name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                    />

                    {formik.touched.name && formik.errors.name && (
                      <p className="formik-error-message">
                        {formik.errors.name}
                      </p>
                    )}
                  </div>
                  <div className="form-firstinputs">
                    <label className="form-inputss-label">Last Name</label>
                    <Formcomp1
                      className="inputsss"
                      type="text"
                      name="lastname"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastname}
                    />
                    {formik.touched.lastname && formik.errors.lastname && (
                      <p className="formik-error-message">
                        {formik.errors.lastname}
                      </p>
                    )}
                  </div>
                </div>
                <div className="form-inputs-main">
                  <div className="form-firstinputs">
                    <label className="form-inputss-label">Phone</label>
                    <Formcomp1
                      className="inputsss"
                      type="number"
                      name="phoneNumber"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phoneNumber}
                    />
                    {formik.touched.phoneNumber &&
                      formik.errors.phoneNumber && (
                        <p className="formik-error-message">
                          {formik.errors.phoneNumber}
                        </p>
                      )}
                  </div>
                  <div className="form-firstinputs">
                    <label className="form-inputss-label">Email</label>
                    <Formcomp1
                      className="inputsss"
                      type="email"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="formik-error-message">
                        {formik.errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <textarea
                    className="form-text"
                    name="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.text}
                  />
                  {formik.touched.text && formik.errors.text && (
                    <p className="formik-error-message">{formik.errors.text}</p>
                  )}
                </div>
                <div className="batannn">
                  <button className="formm-batannn" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <div className="mapp-div">
              <div className="mapp-grid-this">
                <div className="mapp-contact-div">
                  <h3 className="mapp-contact-h3">Contact info</h3>
                </div>
                <div className="mapp-phone-div">
                  <BsTelephone className="mapp-phone-icon" />
                  <h4 className="mapp-contact-h4">+918950829103</h4>
                </div>
                <div className="mapp-email-div">
                  <MdAlternateEmail className="mapp-phone-icon" />
                  <h4 className="mapp-contact-h4">info@algotoday.com</h4>
                </div>
                <div className="mapp-social-icons">
                  <div className="mapp-social-icons-div">
                    <RxTwitterLogo className="social-icons" />
                  </div>
                  <div className="mapp-social-icons-div">
                    <SlSocialFacebook className="social-icons" />
                  </div>
                  <div className="mapp-social-icons-div">
                    <FaInstagram className="social-icons" />
                  </div>
                </div>
              </div>
              <div className="the-map">
                <div style={{ width: "100%" }}>
                  <iframe
                    width="100%"
                    // height="600"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Sky%20Corporate%20Indore+(AlgoToday)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  >
                    <a href="https://www.gps.ie/">gps devices</a>
                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Testimonial />
        <div className="blue-abso-color2"></div>
        <Faq faquiz={Faqq} />
        <Numberdata
          webdata={numberData}
          text1="Unleash the full power of data"
          para1="Everything you need to convert, engage, and retain more users."
        />
        <Footer />
      </div>

      {/*----------------------Modal Stretegy------------------------- */}
      <div class="modal micromodal-slide" id="modal-1" aria-hidden="true">
        <div class="modal__overlay" tabindex="-1" data-micromodal-close>
          <div
            class="modal__container"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-1-title"
          >
            <header class="modal__header">
              <h2 class="modal__title" id="modal-1-title">
                {selectedPlan}
              </h2>
              <button
                class="modal__close"
                aria-label="Close modal"
                data-micromodal-close
              ></button>
            </header>
            <main
              class="modal__content"
              id="modal-1-content"
              style={{ padding: "1rem" }}
            >
              <>
                {selectedPlan === "Expert" && (
                  <>
                    <div style={{ padding: "1rem" }}>
                      <div>Coming Soon ....</div>
                      <button
                        class="modal__btn modal__btn-primary"
                        onClick={() => navigate("/")}
                      >
                        Gold plan
                      </button>
                    </div>
                  </>
                )}
                {selectedPlan === "Gold" && "This is the Gold plan"}
                {selectedPlan === "Platinum" && <div>Coming Soon ....</div>}
              </>
            </main>
            <footer class="modal__footer">
              <button class="modal__btn modal__btn-primary">
                Subscribe Strategy
              </button>
              <button
                class="modal__btn"
                data-micromodal-close
                aria-label="Close this dialog window"
              >
                Close
              </button>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};
export default React.memo(Homee);
