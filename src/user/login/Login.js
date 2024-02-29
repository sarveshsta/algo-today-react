import React from "react";
import * as Yup from "yup";
import "../signup/signup.css";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { loginAPI } from "../features/auth/authAuthentication";
import Formbutton from "../../components/formcomponent/Formbutton";
import Formcomp from "../../components/formcomponent/Formcomp";

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth?.user);
  console.log("loginAuth", auth);
  const { status, data } = auth || {};

  const formik = useFormik({
    initialValues: {
      phone: "",
      otp: "",
      password: "",
      // termsCheckbox: false,
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Enter a valid Number")
        .required("Mobile Number is required"),
      otp: Yup.string()
        .matches(/^[0-9]{6}$/, "Enter a valid OTP")
        .required("OTP is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      // termsCheckbox: Yup.boolean().oneOf(
      //   [true],
      //   "You must agree to the Terms & Conditions"
      // ),
    }),
    onSubmit: (values) => {
      dispatch(loginAPI(values));

      // if (status === 400) {
      //   toast.error(data.message);
      // } else if (status === 200) {
      //   toast.success(data.message);
      // }
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
              <h2 className="signup-form-h2">Login</h2>
              <p className="signup-form-small-text">Glad you’re back.!</p>
              <form className="form-form" onSubmit={formik.handleSubmit}>
              
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

                <Formbutton type="submit" text="Login"/>
              </form>
              <p className="signup-form-already-registered-para">
                <Link className="linking" to="/forgotpassword">
                  {" "}
                  Forgot Password?{" "}
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
