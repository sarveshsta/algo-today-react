import React from 'react'
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';

const Forgotpassword = () => {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      newPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .matches(/^[0-9]{6}$/, "Enter New Password")
        .required("Password Is Required"),
    }),
    onSubmit: (values) => {
      console.log("val :", values);
    }
  
  })

  return (
    <>
    <div className='forgotpass-main-section' style={{padding:'2.3rem', background: "rgba(238, 242, 242, 1)"}}>
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
          <p className="signup-form-small-text">Please enter you’re email</p>
          <form className="form-form" onSubmit={formik.handleSubmit}>
            <input
              className="signup-form-input"
              type="text"
              placeholder="Enter your Email"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div className="error-message" style={{ color: "red" }}>
                {formik.errors.newPassword}
              </div>
            ) : null}

            <button className="signup-form-button" type="submit">
              Reset Password
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
  )
}

export default React.memo(Forgotpassword)