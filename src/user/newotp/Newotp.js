import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { otpVerificationAPI } from "../features/auth/authAuthentication";
import Formbutton from "../../components/formcomponent/Formbutton";
import Formcomp from "../../components/formcomponent/Formcomp";
import { Circles } from "react-loader-spinner";

const Newotp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = new FormData();

  const otpState = useSelector((store) => store?.auth?.user?.data);
  const { message, success } = otpState || {};

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
      const getItem = localStorage.getItem("authdetail");
      const parseData = JSON.parse(getItem);
      const { otp, phone } = parseData;
      formData.append("phone", phone);
      formData.append("otp", otp);
      dispatch(otpVerificationAPI(formData));

      if (success === true) {
        setTimeout(() => {
          navigate("/signup");
        }, 3000);
      }
    },
  });

  return (
    <>
      <ToastContainer
        autoClose={3000}
        pauseOnFocusLoss={true}
        closeOnClick={true}
        draggable={true}
        theme="colored"
      />

      <div style={{ padding: "2.3rem", background: "rgba(238, 242, 242, 1)" }}>
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
                <Formcomp
                  type="text"
                  placeholder="Enter OTP"
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

                <Formbutton type="submit" text="Verify OTP" />
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

export default React.memo(Newotp);
