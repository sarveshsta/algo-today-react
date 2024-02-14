import "./signup.css";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupAPI } from "../features/auth/authAuthentication";

const Signup = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("data :", signupAPI());
  })

  const auth = useSelector((state) => state.auth )
  console.log("state :", auth);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      otp: "",
      password: "",
      email: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Enter a valid Number")
        .required("Mobile Number is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      otp: Yup.string()
        .matches(/^[0-9]{6}$/, "Enter a valid OTP")
        .required("OTP is required"),
    }),

    onSubmit: (values) => {
      console.log("val :", values);
      dispatch(signupAPI(values))
    },
  });

  return (
    <>
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
            <h2 className="signup-form-h2">Signup</h2>
            <p className="signup-form-small-text">
              Just some details to get you in !
            </p>
            <form className="form-form" onSubmit={formik.handleSubmit}>
              <input
                className="signup-form-input"
                type="text"
                placeholder="Name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="error-message" style={{ color: "red" }}>
                  {formik.errors.name}
                </div>
              ) : null}

              <input
                className="signup-form-input"
                type="text"
                placeholder="Mobile Number"
                name="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="error-message" style={{ color: "red" }}>
                  {formik.errors.phone}
                </div>
              ) : null}

              <input
                className="signup-form-input"
                type="text"
                placeholder="Enter OTP"
                name="otp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.otp}
              />
              {formik.touched.otp && formik.errors.otp ? (
                <div className="error-message" style={{ color: "red" }}>
                  {formik.errors.otp}
                </div>
              ) : null}

              <input
                className="signup-form-input"
                type="password"
                placeholder="Password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error-message" style={{ color: "red" }}>
                  {formik.errors.password}
                </div>
              ) : null}

              <input
                className="signup-form-input"
                type="email"
                placeholder="Email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error-message" style={{ color: "red" }}>
                  {formik.errors.email}
                </div>
              ) : null}

              <button className="signup-form-button" type="submit">
                Signup
              </button>
            </form>
            <p className="signup-form-already-registered-para">
              Already registered?{" "}
              <Link className="linking" to="/login">
                {" "}
                Login{" "}
              </Link>
            </p>

            <div className="signup-form-3-text-div">
              <p>Terms & Conditions</p>
              <p>Support</p>
              <p>Customer Care</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
