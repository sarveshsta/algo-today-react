import "./homee.css";
import React from "react";
import * as Yup from "yup";
import Faq from "../faq/Faq";
import { useFormik } from "formik";
import Mainnav from "../navbar/Mainnav";
import { Link } from "react-router-dom";
import { BsTelephone } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { RxTwitterLogo } from "react-icons/rx";
import Numberdata from "../numberdata/Numberdata";
import { MdAlternateEmail } from "react-icons/md";
import { SlSocialFacebook } from "react-icons/sl";
import Testimonial from "../testinomial/Testimonial";
import { Faqq, numberData } from "../../arraydata/Arraydata";
import Footer from "../footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Homee = () => {
  const formData = new FormData();
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits")
      .required("Phone Number is required"),
    text: Yup.string().required("Enter a text"),
  });

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
      console.log("vallsld", values);
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
            alert(`Server Error: ${error.response.status}`);
          } else if (error.request) {
            // The request was made but no response was received
            alert("Network Error: Please check your internet connection");
          } else {
            // Something happened in setting up the request that triggered an Error
            alert("Error: " + error.message);
          }
        });
    },
  });

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
              <Link to="/signup" className="linking">
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
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
          <div className="pricing-section-track">
            <progress className="progress-barr" value={0} max={100} />
          </div>
          <div className="pricing-section-mainprice">
            <div className="pricing-gold">
              <div className="pricing-section">
                <div className="pricing-h5-div">
                  <h5 className="pricing-h5">Gold</h5>
                </div>
                <div className="pricing-h4-div">
                  <h4 className="pricing-h4">
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
                      Full Access to Expert Strategy
                    </li>
                    <li className="pricing-li">Make your Own strategy</li>
                    <li className="pricing-li">Unlimited Trade</li>
                    <li className="pricing-li">High Security</li>
                    <li className="pricing-li">Free 50 algo coins</li>
                  </ol>
                </div>
                <div className="pricing-button-div">
                  <button className="pricing-btnn" type="button">
                    {" "}
                    Get 14 Days Free Trial
                  </button>
                </div>
              </div>
            </div>
            <div className="pricing-silver">
              <div className="pricing-section">
                <div className="pricing-h5-div">
                  <h5 className="pricing-h5">Silver</h5>
                </div>
                <div className="pricing-h4-div">
                  <h4 className="pricing-h4">
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
                    <li className="pricing-li">Make your Own strategy</li>
                    <li className="pricing-li">Unlimited Trade</li>
                    <li className="pricing-li">High Security</li>
                    <li className="pricing-li">Free 50 algo coins</li>
                  </ol>
                </div>
                <div className="pricing-button-div">
                  <button className="pricing-btnn" type="button">
                    {" "}
                    Get 14 Days Free Trial
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
                  <h4 className="pricing-h4">
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
                    <li className="pricing-li">Make your Own strategy</li>
                    <li className="pricing-li">Unlimited Trade</li>
                    <li className="pricing-li">High Security</li>
                    <li className="pricing-li">Free 50 algo coins</li>
                  </ol>
                </div>
                <div className="pricing-button-div">
                  <button className="pricing-btnn" type="button">
                    {" "}
                    Get 14 Days Free Trial
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
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
          <div className="form-seconddiv-mainform">
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
                    <input
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
                    <input
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
                    <input
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
              <div className="mapp-contact-div">
                <h3 className="mapp-contact-h3">Contact info</h3>
              </div>
              <div className="mapp-phone-div">
                <BsTelephone className="mapp-phone-icon" />
                <h4 className="mapp-contact-h4">+918950829103</h4>
              </div>
              <div className="mapp-email-div">
                <MdAlternateEmail className="mapp-phone-icon" />
                <h4 className="mapp-contact-h4">Support@algotoday.com</h4>
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
              <div></div>
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
    </>
  );
};
export default Homee;
