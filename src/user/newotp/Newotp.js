import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { otpVerificationAPI } from "../features/auth/authAuthentication";
import Formbutton from "../../components/formcomponent/Formbutton";
import Formcomp from "../../components/formcomponent/Formcomp";

const Newotp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = new FormData();

  const otpState = useSelector((store) => store?.auth?.user);
  console.log("otp** =>",otpState);
  const { status, data } = otpState || {};

  const formik = useFormik({
    initialValues: {
      number: "",
    },
    validationSchema: Yup.object({
      number: Yup.string()
        .matches(/^[0-9]{6}$/, "Enter a valid OTP")
        .required("OTP is required"),
    }),
    onSubmit: (values) => {
      const getItem = localStorage.getItem("authdetail");
      const parseData = JSON.parse(getItem);
      const { otp, phone } = parseData;
      formData.append("phone", phone);
      formData.append("otp", otp);

<<<<<<< HEAD
          const config = {
            method: "post",
            // url: "https://862e-2409-40c4-3030-1662-59b2-ecfe-c96d-d41.ngrok-free.app/verify-otp/",
            url: "http://13.127.232.213:8000/verify-otp/",
            headers: {
              "Content-Type": "application/json",
            },
            data: formData,
          };

          const response = await axios(config);
          // console.log(JSON.stringify(response.data));
          if (response.status === 200) {
            const { otp } = response.data.otp;
            if (otp === values.number) {
              localStorage.setItem("otp", values.number);
              navigate("/signup");
            } else {
              // OTP does not match
              alert("OTP does not match");
            }
          } else {
            // Handle non-200 status codes
            console.error("Failed to verify OTP");
          }
        }
        catch (error) {
          console.error(error);
        }
      };
      fetchData();
      localStorage.setItem("otp", values.number);
      navigate("/signup");
=======
      dispatch(otpVerificationAPI(formData));
      
      toast.success("Login Succesfull", {
        onClose: () => {
          navigate("/signup");
        },
      });
>>>>>>> ba8360d05838d71fa28993da6e94134f4c359410
    },
  });

  return (
    <>
<<<<<<< HEAD
=======
      <ToastContainer
        autoClose={3000}
        pauseOnFocusLoss={true}
        closeOnClick={true}
        draggable={true}
        theme="colored"
      />
>>>>>>> ba8360d05838d71fa28993da6e94134f4c359410
      <div style={{ padding: "2.3rem", background: "rgba(238, 242, 242, 1)" }}>
        <div className="signup-main-div">
          <div className="signup-firstdiv">
            <img
              className="firstdiv-image"
              src={require("../../assets/icons/upscaler-1.png")}
<<<<<<< HEAD
              alt="Algo-Today img"
=======
              alt="Algo-Today image"
>>>>>>> ba8360d05838d71fa28993da6e94134f4c359410
            />
            <h1 className="firstdiv-h1">Algo Today</h1>
            <h3 className="firstdiv-h3">Trade Smarter.Live Free</h3>
          </div>

          {/* -----------------Form-section------------ */}
          <div className="form-section">
            <div className="signup-seconddiv">
              <h2 className="signup-form-h2">One Time Password</h2>
              <p className="signup-form-small-text">Your OTP</p>
              <form className="form-form" onSubmit={formik.handleSubmit}>
<<<<<<< HEAD
                <input
                  className="signup-form-input"
                  type="text"
                  placeholder="Enter One Time Password"
                  name="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.number}
                />
=======
               <Formcomp
                   type="text"
                   placeholder="Enter One Time Password"
                   name="number"
                   onChange={formik.handleChange}
                   onBlur={formik.handleBlur}
                   value={formik.values.number}
               />
>>>>>>> ba8360d05838d71fa28993da6e94134f4c359410
                {formik.touched.number && formik.errors.number ? (
                  <div className="error-message" style={{ color: "red" }}>
                    {formik.errors.number}
                  </div>
                ) : null}

<<<<<<< HEAD
                <button className="signup-form-button" type="submit">
                  Enter OTP
                </button>
=======
                 <Formbutton type="submit" text="Enter OTP" />
>>>>>>> ba8360d05838d71fa28993da6e94134f4c359410
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

export default React.memo(Newotp);
