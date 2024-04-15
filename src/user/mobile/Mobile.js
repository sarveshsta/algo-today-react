import * as Yup from "yup";
import { useFormik } from "formik";
<<<<<<< HEAD
// import React, { useEffect } from "react";
// import { mobileAuthentication } from "../features/auth/authAuthentication";
=======
import React, { useEffect } from "react";
>>>>>>> ba8360d05838d71fa28993da6e94134f4c359410
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Formcomp from "../../components/formcomponent/Formcomp";
import { mobileAuthentication } from "../features/auth/authAuthentication";

const Mobile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mobileAuth = useSelector((store) => store?.auth?.user);
  // const mobileAuth2 = useSelector((store) => store?.auth?.user);
  // console.log("mobauth2 ==>> ", mobileAuth2);
  console.log("mobauth ==>> ", mobileAuth);

  const { status, data, } = mobileAuth || {};
  const { message } = data || {};

  const formik = useFormik({
    initialValues: {
      number: "",
    },
    validationSchema: Yup.object({
      number: Yup.string()
        .matches(/^[0-9]{10}$/, "Enter a valid Number")
        .required("Mobile Number is required"),
    }),
    onSubmit: (values) => {
<<<<<<< HEAD
      const fetchData = async () => {
        try {
          const formData = new FormData();
          formData.append("phone", values.number);
          const config = {
            method: "post",
            url: "http://13.127.232.213:8000/request-otp/",
            // url: "https://862e-2409-40c4-3030-1662-59b2-ecfe-c96d-d41.ngrok-free.app/request-otp/",
            headers: {
              "Content-Type": "application/json",
            },
            data: formData,
          };
          const response = await axios(config);
          console.log(JSON.stringify(response.data));
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
      localStorage.setItem("phone_number", values.number);
      navigate("/newotp");
=======
      const formData = new FormData();
      formData.append("phone", values.number);
      dispatch(mobileAuthentication(formData));

      if (status === 200) {
        return toast.success(message, {
          onClose: () => {
            navigate("/newotp");
          },
        });
      } else if (status === 401) {
        return toast.error(message);
      } else {
        return toast(message);
      }
>>>>>>> ba8360d05838d71fa28993da6e94134f4c359410
    },
  });

  return (
    <>
<<<<<<< HEAD
    <div style={{padding:'2.3rem', background: "rgba(238, 242, 242, 1)"}}>
      <div className="signup-main-div">
        <div className="signup-firstdiv">
          <img
            className="firstdiv-image"
            src={require("../../assets/icons/upscaler-1.png")}
            alt="Algo-Today img"
          />
          <h1 className="firstdiv-h1">Algo Today</h1>
          <h3 className="firstdiv-h3">Trade Smarter.Live Free</h3>
        </div>
=======
      <ToastContainer
        autoClose={2000}
        pauseOnFocusLoss={true}
        closeOnClick={true}
        draggable={true}
        theme="colored"
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
>>>>>>> ba8360d05838d71fa28993da6e94134f4c359410

          {/* -----------------Form-section------------ */}
          <div className="form-section">
            <div className="signup-seconddiv">
              <h2 className="signup-form-h2">Mobile Authorization</h2>
              <p className="signup-form-small-text">
                Authorize for your saftey
              </p>
              <form className="form-form" onSubmit={formik.handleSubmit}>
                <Formcomp
                   type="text"
                   placeholder="Mobile Number"
                   name="number"
                   onChange={formik.handleChange}
                   onBlur={formik.handleBlur}
                   value={formik.values.number}
                />
                {formik.touched.number && formik.errors.number? (
                  <div className="error-message" style={{ color: "red" }}>
                    {formik.errors.number}
                  </div>
                ) : null}

                <button className="signup-form-button" type="submit">
                  Send OTP
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
  );
};

export default React.memo(Mobile);
