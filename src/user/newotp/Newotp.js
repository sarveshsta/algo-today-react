import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Newotp = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      number: "",
    },
    validationSchema: Yup.object({
      number: Yup.string()
        .matches(/^[0-9]{6}$/, "Enter a valid OTP")
        .required("OTP is required"),
    }),
    onSubmit: (values) => {
      const fetchData = async () => {
        try {
          const formData = new FormData();
          formData.append("otp", values.number);
          formData.append("phone", localStorage.getItem("phone_number"));

          const config = {
            method: "post",
            url: "http://13.127.232.213:8000/verify-otp/",
            headers: {
              "Content-Type": "application/json",
            },
            data: formData,
          };
          const response = await axios(config);
          console.log(JSON.stringify(response.data));
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
      navigate("/signup");
    },
  });

  return (
    <>
    <div style={{padding:'2.3rem', background: "rgba(238, 242, 242, 1)"}}>
    <div className="signup-main-div">
      <div className="signup-firstdiv">
        <img
          className="firstdiv-image"
          src={require("../../assets/icons/upscaler-1.png")}
          alt="Algo-Today image"
        />
        <h1 className="firstdiv-h1">Algo Today</h1>
        <h3 className="firstdiv-h3">Trade Smarter.Live Free</h3>
      </div>

      {/* -----------------Form-section------------ */}
      <div className="form-section">
        <div className="signup-seconddiv">
          <h2 className="signup-form-h2">One Time Password</h2>
          <p className="signup-form-small-text">Your OTP</p>
          <form className="form-form" onSubmit={formik.handleSubmit}>
            <input
              className="signup-form-input"
              type="text"
              placeholder="Enter One Time Password"
              name="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.number}
            />
            {formik.touched.number && formik.errors.number ? (
              <div className="error-message" style={{ color: "red" }}>
                {formik.errors.number}
              </div>
            ) : null}

            <button className="signup-form-button" type="submit">
              Enter OTP
            </button>
          </form>

          <p className="signup-form-already-registered-para">
            {/* Didn't receive OTP? <span className='resend-otp-span'>Resend OTP</span> */}
          </p>

          <div className="signup-form-3-text-div">
            <p>Terms & Conditions</p>
            <p>Support</p>
            <p>Customer Care</p>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default Newotp;