import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { mobileAuthentication } from "../features/auth/authAuthentication";
import { useNavigate } from "react-router-dom";

const Otp = () => {
  const navigate = useNavigate()

  // const [phone, setPhone] = useState('');
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState('');

  // useEffect(() => {
  //     console.log("data2 :",  getAPIdata());
  // }, []);

  const formData = new FormData

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
      console.log("Mobile Number:", values);
        const fetchData = async () => {
          try {
            const formData = new FormData();
            formData.append('phone', values.number);

            const config = {
              method: 'post',
              url: 'https://e76d-2409-40c4-14-5f22-b084-4c0a-5f48-b84c.ngrok-free.app/request-otp/',
              headers: { 
                "Content-Type" : "application/json"
              },
              data: formData
            };
  
            const response = await axios(config);
            console.log(JSON.stringify(response.data));
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
        localStorage.setItem("phone_number", values.number)
        navigate('/newotp')
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
            <h2 className="signup-form-h2">Mobile Authorization</h2>
            <p className="signup-form-small-text">Authorize for your saftey</p>
            <form className="form-form" onSubmit={formik.handleSubmit}>
              <input
                className="signup-form-input"
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
    </>
  );
};

export default Otp;
