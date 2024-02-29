import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotAPI,
  mobileAuthentication,
  otpVerificationAPI,
} from "../features/auth/authAuthentication";
import Formbutton from "../../components/formcomponent/Formbutton";
import Formcomp from "../../components/formcomponent/Formcomp";

const Forgotpassword = () => {
  const [logapicalled, setLogApiCalled] = useState(false);
  const [Otpapicalled, setOtpApiCalled] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = new FormData();

  const forAuth = useSelector((state) => state.auth.user);
  console.log("forauth** =>>", forAuth);

  const formik = useFormik({
    initialValues: {
      number: "",
      otp: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: Yup.object({
      number: Yup.string()
        .matches(/^[0-9]{10}$/, "Enter a valid Number")
        .required("Mobile Number is required"),
      otp: Yup.string()
        .matches(/^[0-9]{6}$/, "Enter a valid OTP")
        .when("number", {
          is: (number) => number && logapicalled, // Validate otp only when logapicalled is true
          then: () => Yup.string().required("OTP is required"),
        }),
      password: Yup.string()
        .matches()
        .when("otp", {
          is: (otp) => otp && Otpapicalled,
          then: () => Yup.string().required("Password is required"),
        }),
      confirmpassword: Yup.string()
        .matches()
        .when("otp", {
          is: (otp) => otp && Otpapicalled,
          then: () => Yup.string().required("Confirm Password is required"),
        }),
    }),
    onSubmit: async (values) => {
      if (!logapicalled) {
        formData.append("phone", values.number);
        try {
          await dispatch(mobileAuthentication(formData));
          if (forAuth.data && forAuth.data.success === true) {
            setLogApiCalled(true);
          }
        } catch (error) {
          console.log("mobile-error** =>>", error);
        }
      } else {
        formData.append("otp", values.otp);
        formData.append("phone", values.number);
        try {
          await dispatch(otpVerificationAPI(formData));
          setOtpApiCalled(true);
        } catch (error) {
          console.log("otp-error** =>>", error);
        }
      }
      if (Otpapicalled) {
        formData.append("password", values.password);
        formData.append("confirmpassword", values.confirmpassword);
        try {
          await dispatch(forgotAPI(formData));
          // setOtpApiCalled(true);
        } catch (error) {
          console.log("otp-error** =>>", error);
        }
      }
    },
  });

  return (
    <>
      <div
        className="forgotpass-main-section"
        style={{ padding: "2.3rem", background: "rgba(238, 242, 242, 1)" }}
      >
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
              <h2 className="signup-form-h2">Forgot Password ?</h2>
              <p className="signup-form-small-text">
                Please enter you’re email
              </p>
              <form className="form-form" onSubmit={formik.handleSubmit}>
                {/*-------------Conditionaly called the field after loginapicalled-------------------- */}
                {!logapicalled && (
                  <>
                    <Formcomp
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

                    <Formbutton type="submit" text="Reset Password" />
                  </>
                )}

                {/*-------------Conditionaly called the field after loginapicalled and not called otpapi--- */}
                {logapicalled && !Otpapicalled && (
                  <>
                    <Formcomp
                      type="text"
                      placeholder="Enter One Time Password"
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
                    <Formbutton type="submit" text="Enter OTP" />
                  </>
                )}

                {/*-------------Conditionaly called the field after otpapicalled------------- */}

                {Otpapicalled && (
                  <>
                    <Formcomp
                      type="text"
                      placeholder="password"
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
                      type="text"
                      placeholder="confirmPassword"
                      name="confirmpassword"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmpassword}
                    />
                    {formik.touched.confirmpassword &&
                    formik.errors.confirmpassword ? (
                      <div className="error-message" style={{ color: "red" }}>
                        {formik.errors.confirmpassword}
                      </div>
                    ) : null}

                    <Formbutton type="submit" text="Confirm" />
                  </>
                )}

                <p className="signup-form-already-registered-para">
                  {/* Didn't receive OTP? <span className='resend-otp-span'>Resend OTP</span> */}
                </p>

                <div className="signup-form-3-text-div">
                  <p>Terms & Conditions</p>
                  <p>Support</p>
                  <p>Customer Care</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Forgotpassword);
