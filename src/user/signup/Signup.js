import "./signup.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Formcomp from "../../components/formcomponent/Formcomp";
import { signupAPI } from "../features/auth/authAuthentication";
import Formbutton from "../../components/formcomponent/Formbutton";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  const signupMessage = auth?.user;  
  const { message, success } = signupMessage || {};

  const dd = JSON.parse(localStorage.getItem('authdetail'));
  const {otp, phone} = dd
  

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      otp: "",
      password: "",
      email: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[a-zA-Z0-9@#]+$/, "Please Fill Correctly")
        .required("Name is required"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Enter a valid Number")
        .required("Mobile Number is required"),
      otp: Yup.string()
        .matches(/^[0-9]{6}$/, "Enter a valid OTP")
        .required("OTP is required"),
      password: Yup.string()
        .matches(/^[a-zA-Z0-9@#.]+$/, "Enter Valid Password")
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      email: Yup.string()
        .matches(/^[a-zA-Z0-9@#]+$/, "Enter Valid Email")
        .email("Invalid email address")
        .required("Email is required"),
    }),

    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("phone", phone);
      formData.append("otp", otp);
      formData.append("password", values.password);
      formData.append("email", values.email);
      dispatch(signupAPI(formData));

      if(success === true){
        setTimeout(() => {
          navigate("/login")
        },3000)
      }
    },
  });
  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };
  
  return (
    <>
      <div className="signup-main-div">
        <div className="signup-firstdiv">
          <img
            className="firstdiv-image"
            src={require("../../assets/icons/upscaler-1.png")}
            alt="Algo-Today-img"
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
              <Formcomp
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

              <Formcomp
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

              <Formcomp
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

              <Formcomp
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

              <Formbutton type="submit" text="Signup" />
            </form>
            <p className="signup-form-already-registered-para">
              Already registered?{" "}
              <Link className="linking" to="/login">
                Login
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

export default React.memo(Signup);
