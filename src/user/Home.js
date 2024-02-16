import "../user/home.css";
import axios from "axios";
import * as Yup from "yup";
import Select from "react-select";
import { useFormik } from "formik";
import Navbar from "../components/navbar/Navbar";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HorizontalNav from "../components/navbar/HorizontalNav";

const Home = () => {
  const [selectedState, setSelectedState] = useState(null);
  const navigate = useNavigate();
  const formData = new FormData();

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits")
      .required("Phone Number is required"),
    city: Yup.string().required("City is required"),
    state: Yup.object().shape({
      label: Yup.string().required("State is require"),
      value: Yup.string().required("State is require"),
    }),
  });

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      city: "",
      state: { value: "", label: "" },
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("val", values)

      // Add form data to FormData
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("city", values.city);
      formData.append("state", values.state.value);

      axios
        .post("http://13.234.76.87:8000/form", formData, config)
        .then((response) => {
          console.log("res", response.data);
        })
        .catch((error) => {
          console.log("err", error);
        });
        navigate("/opendemate");
    },
  });

  const stateOptions = [
    { value: "Andhra Pradesh", label: "Andhra Pradesh" },
    { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
    { value: "Assam", label: "Assam" },
    { value: "Bihar", label: "Bihar" },
    { value: "Chhattisgarh", label: "Chhattisgarh" },
    { value: "Goa", label: "Goa" },
    { value: "Gujarat", label: "Gujarat" },
    { value: "Haryana", label: "Haryana" },
    { value: "Himachal Pradesh", label: "Himachal Pradesh" },
    { value: "Jharkhand", label: "Jharkhand" },
    { value: "Karnataka", label: "Karnataka" },
    { value: "Kerala", label: "Kerala" },
    { value: "Madhya Pradesh", label: "Madhya Pradesh" },
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Manipur", label: "Manipur" },
    { value: "Meghalaya", label: "Meghalaya" },
    { value: "Mizoram", label: "Mizoram" },
    { value: "Nagaland", label: "Nagaland" },
    { value: "Odisha", label: "Odisha" },
    { value: "Punjab", label: "Punjab" },
    { value: "Rajasthan", label: "Rajasthan" },
    { value: "Sikkim", label: "Sikkim" },
    { value: "Tamil Nadu", label: "Tamil Nadu" },
    { value: "Telangana", label: "Telangana" },
    { value: "Tripura", label: "Tripura" },
    { value: "Uttar Pradesh", label: "Uttar Pradesh" },
    { value: "Uttarakhand", label: "Uttarakhand" },
    { value: "West Bengal", label: "West Bengal" },

    // Union Territories
    {
      value: "Andaman and Nicobar Islands",
      label: "Andaman and Nicobar Islands",
    },
    { value: "Chandigarh", label: "Chandigarh" },
    {
      value: "Dadra and Nagar Haveli and Daman and Diu",
      label: "Dadra and Nagar Haveli and Daman and Diu",
    },
    { value: "Lakshadweep", label: "Lakshadweep" },
    { value: "Delhi", label: "Delhi" },
    { value: "Puducherry", label: "Puducherry" },
  ];

  const handleChange = (selectedOption) => {
    setSelectedState(selectedOption);
    formik.setFieldValue("state", selectedOption);
  };

  return (
    <>
      <HorizontalNav />
      <Navbar />
      <div className="home-main-div">
        <div
          id="heading-div"
          className="container text-center p-0 border-solid border-2 border-black mt-4"
        >
          <h1 id="heading" className="home-heading">
            {" "}
            Algotoday
          </h1>
          <Link to="/mobile"><button id="signup-button-home" type="button" class="btn btn-primary">Signup</button></Link>
        </div>

        <div
          id="para-div"
          className="container text-center border-solid border-2 border-black mt-4"
        >
          <p id="para" className="home-para">
            Algotoday empowers traders with the ability to craft personalized
            strategies or choose from an array of meticulously designed
            pre-defined strategies. The platform's strength lies in its
            commitment to educating users, emphasizing the art of targeting and
            harnessing the compounding effects that lead to sustained success.
          </p>
        </div>

        <div
          id="form-main-div"
          className="container text-center ml-7 mt-4 mb-2"
        >
          <div
            id="form-div"
            className="max-w-md mx-auto my-8 p-6 bg-white shadow-md rounded-md"
          >
            <div
              className="w-full max-w-xs"
              style={{
                height: "-webkit-fill-available",
              }}
            >
              <form
                className="bg-white shadow-md px-8 pt-6 pb-8"
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <h2>Registration Form</h2>
                </div>
                <div className="mb-3">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    name="name"
                    placeholder="Enter your Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="formik-error-message">{formik.errors.name}</p>
                  )}
                </div>
                <div className="mb-6">
                  <input
                    className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="formik-error-message">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <input
                    className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="text"
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phoneNumber}
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <p className="formik-error-message">
                      {formik.errors.phoneNumber}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <input
                    className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="city"
                    type="text"
                    name="city"
                    placeholder="Enter your City"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.city}
                  />
                  {formik.touched.city && formik.errors.city && (
                    <p className="formik-error-message">{formik.errors.city}</p>
                  )}
                </div>
                <div
                  className="mb-6"
                  style={{ display: "flex", marginBottom: "8px", justifyContent: "center"
                  }}
                >
                  <Select
                    value={selectedState}
                    onChange={handleChange}
                    options={stateOptions}
                    placeholder="Select a state"
                  />
                  {formik.touched.state && formik.errors.state && (
                    <p className="formik-error-message">
                      {formik.errors.state.label}
                    </p>
                  )}
                </div>
                <div className="d-flex justify-content-around p-1">
                  <Link to="/opendemate" style={{ textDecoration: "none" }}>
                    <h3 className="h3-link-skip">SKIP</h3>
                  </Link>
                  <button className="btn btn-primary se" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
