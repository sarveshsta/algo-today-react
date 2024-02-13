import React from "react";
import * as Yup from "yup";
import "../signup/signup.css"
import { useFormik } from "formik";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      termsCheckbox: false,
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      termsCheckbox: Yup.boolean().oneOf(
        [true],
        "You must agree to the Terms & Conditions"
      ),
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
            <h2 className="signup-form-h2">Login</h2>
            <p className="signup-form-small-text">Glad you’re back.!</p>
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

              <div className="login-checkbox-checkbox-section">
                <input
                  type="checkbox"
                  id="termsCheckbox"
                  name="termsCheckbox"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.termsCheckbox}
                />
                <label htmlFor="termsCheckbox">Remember me</label>
                {formik.touched.termsCheckbox && formik.errors.termsCheckbox ? (
                  <div className="error-message" style={{ color: "red" }}>
                    {formik.errors.termsCheckbox}
                  </div>
                ) : null}
              </div>

              <button className="signup-form-button" type="submit">
                Login
              </button>
            </form>
            <p className="signup-form-already-registered-para">
              Forgot Password?
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

export default Login;
