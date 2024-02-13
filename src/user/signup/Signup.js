import "./signup.css";
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

const Signup = () => {

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
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
                placeholder="Username"
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="error-message" style={{ color: "red" }}>
                  {formik.errors.username}
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
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="error-message" style={{ color: "red" }}>
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
              <button className="signup-form-button" type="submit">
                Signup
              </button>
            </form>
            <p className="signup-form-already-registered-para">
              Already registered? <Link className="linking" to='/login'> Login </Link>
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
