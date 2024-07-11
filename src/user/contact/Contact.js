import axios from "axios";
import * as Yup from "yup";
import { Faqq } from "../../arraydata/Arraydata";
import { Link } from "react-router-dom";
import { BsTelephone } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { RxTwitterLogo } from "react-icons/rx";
import React, { useMemo, useRef, useState } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { SlSocialFacebook } from "react-icons/sl";
import { ToastContainer, toast } from "react-toastify";
import { Formik, useFormik } from "formik";
import Mainnav from "../../components/navbar/Mainnav";
import Faq from "../../components/faq/Faq";
import Footer from "../../components/footer/Footer";

const Contact = () => {
  const formData = new FormData();

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

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

  return (
    <>
      <div>
        <Mainnav />
        <div className="web-home-form-section">
          <div className="form-firstdiv">
            <h3 className="form-firstdiv-h3">Get in touch</h3>
            <p className="form-firstdiv-para">
              Let’s get in touch! Tell us about you and what’s on your mind.
              AlgoToday is here to help you.
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
        <Faq faquiz={Faqq} />
        <div style={{ marginTop: "1rem" }}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default React.memo(Contact);
