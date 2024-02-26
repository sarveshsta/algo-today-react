import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { mobileAuthentication } from "../features/auth/authAuthentication";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const Mobile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mobileAuth = useSelector((store) => store?.auth?.user?.data);
  console.log("moboobfbffd => ", mobileAuth);
  const { message, success } = mobileAuth || {};

  const formik = useFormik({
    initialValues: {
      number: "",
    },
    validationSchema: Yup.object({
      number: Yup.string()
        .matches(/^[0-9]{10}$/, "Enter a valid Number")
        .required("Mobile Number is required"),
    }),
    onSubmit: (values) => {
      console.log("val-mobile :", values);
      const formData = new FormData();
      formData.append("phone", values.number);

      // Retrieve the 'phone' value from FormData
      const phoneValue = formData.get("phone");
      // Now you can use 'phoneValue' as a regular string
      console.log("phphph = ", phoneValue);

      dispatch(mobileAuthentication(formData));
    },
  });

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
  }, [message]);

  return (
    <>
      <ToastContainer autoClose={2000} />
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
              <h2 className="signup-form-h2">Mobile Authorization</h2>
              <p className="signup-form-small-text">
                Authorize for your saftey
              </p>
              <form className="form-form" onSubmit={formik.handleSubmit}>
                <input
                  className="signup-form-input"
                  type="text"
                  placeholder="Mobile Number"
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
                  Send OTP
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

export default Mobile;
