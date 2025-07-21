import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Formcomp from "../../components/formcomponent/Formcomp";
import Formbutton from "../../components/formcomponent/Formbutton";
import {
  forgotAPI,
  emailAuthentication,
  otpEmailVerificationAPI,
} from "../features/auth/authAuthentication";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const Forgotpassword = () => {
  const [logapicalled, setLogApiCalled] = useState(false);
  const [Otpapicalled, setOtpApiCalled] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = new FormData();

  const forAuth = useSelector((state) => state?.auth?.user);
  

  const handleSubmit = useCallback(
    async (values) => {
      if (!logapicalled) {
        formData.append("email", values.email);
        try {
          dispatch(emailAuthentication(formData));
          setLogApiCalled(true);
        } catch (error) {
        }
      } else if (!Otpapicalled) {
        formData.append("otp", values.otp);
        formData.append("email", values.email);
        try {
          dispatch(otpEmailVerificationAPI(formData));
          setOtpApiCalled(true);
        } catch (error) {
        }
      } else {
        const data = {
          email: values.email,
          // otp: values.otp,
          password: values.password,
        };
        try {
          const response = await dispatch(forgotAPI(data)).unwrap();
          if (response.success === true) {
            console.log("Password Update successful");
            navigate("/login");
          }
        } catch (error) {
        }
      }
    },
    [dispatch, formData, logapicalled, Otpapicalled]
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Enter Valid Email"
        )
        .email("Invalid email address")
        .required("Email is required"),
      otp: Yup.string()
        .matches(/^[0-9]{6}$/, "Enter a valid OTP")
        .when("email", {
          is: (email) => email && logapicalled, // Validate otp only when logapicalled is true
          then: () => Yup.string().required("OTP is required"),
        }),
      password: Yup.string()
        .matches(/^[a-zA-Z]+$/, "No Number, i am Sorry")
        .when("otp", {
          is: (otp) => otp && Otpapicalled,
          then: () => Yup.string().required("Password is required"),
        }),
      confirmpassword: Yup.string()
        .matches(/^[a-zA-Z]+$/, "No Number, i am Sorry")
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .when("otp", {
          is: (otp) => otp && Otpapicalled,
          then: () => Yup.string().required("Confirm Password is required"),
        }),
    }),
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (forAuth?.data) {
      // toast.success(forAuth.data.message);
    } else if (forAuth?.data && logapicalled) {
      // toast.success(forAuth.data.message);
    } else if (forAuth?.data && logapicalled && Otpapicalled) {
      // toast.success(forAuth.data.message);
    }
  }, [forAuth?.data, logapicalled, Otpapicalled]);

  return (
    <>
      <ToastContainer
        autoClose={2000}
        pauseOnFocusLoss={true}
        closeOnClick={true}
        draggable={true}
      />
      <div
        className="forgotpass-main-section"
        style={{ padding: "2.3rem", background: "rgba(238, 242, 242, 1)", height: "100vh" }}
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
                Please enter Details
              </p>
              <form className="form-form" onSubmit={formik.handleSubmit}>
                {/*-------------Conditionaly called the field after loginapicalled-------------------- */}
                {!logapicalled && (
                  <>
                    <Formcomp
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                      value={formik?.values?.email}
                    />
                    {formik?.touched?.email && formik?.errors?.email ? (
                      <div className="error-message" style={{ color: "red" }}>
                        {formik?.errors?.email}
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
