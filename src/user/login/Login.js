import React, { useEffect, useRef, useState } from "react";

import * as Yup from "yup";
import "../signup/signup.css";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { loginAPI } from "../features/auth/authAuthentication";
import Formcomp from "../../components/formcomponent/Formcomp";
import Formbutton from "../../components/formcomponent/Formbutton";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const auth = useSelector((state) => state?.auth?.user?.data);
  const success = auth?.success;

  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    if (success === true && isMounted.current) {
      toast.success("Login successful!");
      navigate("/dashboard");
    }
    return () => {
      isMounted.current = false;
    };
  }, [success, navigate]);
  const formik = useFormik({
    initialValues: {
      email: "",
      // otp: "",
      password: "",
      // termsCheckbox: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid Email")
        .required("Email is required"),
      // otp: Yup.string()
      //   .matches(/^[0-9]{6}$/, "Enter a valid OTP")
      //   .required("OTP is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      // termsCheckbox: Yup.boolean().oneOf(
      //   [true],
      //   "You must agree to the Terms & Conditions"
      // ),
    }),
    onSubmit: async (values) => {
      try {
        const resultAction = await dispatch(loginAPI(values)).unwrap();
        console.log(resultAction, "result");

        if (resultAction && resultAction.data && resultAction.data.data) {
          const userName = resultAction.data.data.name;
          localStorage.setItem("userName", userName); // Store username in local storage
        }
      } catch (error) {
        console.error("Login error: ", error);
      }
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
      <div
        style={{
          padding: "2.3rem",
          background: "rgba(238, 242, 242, 1)",
          height: "100vh",
        }}
      >
        <div className="signup-main-div">
          <div className="signup-firstdiv">
            <img
              className="firstdiv-image"
              src={require("../../assets/icons/upscaler-1.png")}
              alt="Algo-Today logo"
            />
            <h1 className="firstdiv-h1">Algo Today</h1>
            <h3 className="firstdiv-h3">Trade Smarter.Live Free</h3>
          </div>

          {/* -----------------Form-section------------ */}
          <div className="form-section">
            <div className="signup-seconddiv">
              <h2 className="signup-form-h2">Login</h2>
              <p className="signup-form-small-text">Glad you're back.!</p>
              <form className="form-form" onSubmit={formik.handleSubmit}>
                <Formcomp
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

                {/* <Formcomp
                  type="text"
                  placeholder="Enter OTP"
                  name="otp"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.otp}
                  maxLength="6"
                />
                {formik.touched.otp && formik.errors.otp ? (
                  <div className="error-message" style={{ color: "red" }}>
                    {formik.errors.otp}
                  </div>
                ) : null} */}

                <div style={{ position: "relative" }}>
                  <Formcomp
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "40%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      fontSize: "18px",
                      color: "#ffffff", // Ensure contrast against background
                    }}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
                {/* <span
                  onClick={togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "40%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span> */}
                {formik.touched.password && formik.errors.password ? (
                  <div className="error-message" style={{ color: "red" }}>
                    {formik.errors.password}
                  </div>
                ) : null}

                {/* <div className="login-checkbox-checkbox-section">
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
              </div> */}

                <Formbutton type="submit" text="Login" />
              </form>
              <p className="signup-form-already-registered-para">
                <Link className="linking" to="/forgotpassword">
                  Forgot Password?
                </Link>
                <Link className="linking" to="/mobile">
                  Signup
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
      </div>
    </>
  );
};
export default React.memo(Login);
