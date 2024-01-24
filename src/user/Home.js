import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import HorizontalNav from "../components/navbar/HorizontalNav";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as XLSX from "xlsx"; // Import xlsx library
import "../user/home.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  // const [userData, setUserData] = useState();

  const navigate = useNavigate();
  const formData = new FormData();

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
  });

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      // Add any other headers as needed
    },
  };

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      city: "",
      state: "",
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      //  setUserData(values)
      navigate("/opendemate");

      // Add form data to FormData
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("city", values.city);
      formData.append("state", values.state);

      axios
        .post(
          "https://9fc1-2405-201-301d-f83a-6d09-6298-c8eb-486d.ngrok-free.app/form",
          formData,
          config
        )
        .then((response) => {
          console.log("res", response.data);
        })
        .catch((error) => {
          console.error("err", error);
        });
    },
  });

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

        <div id="form-main-div" className="container text-center ml-7 mt-4">
          <div
            id="form-div"
            className="max-w-md mx-auto my-8 p-6 bg-white shadow-md rounded-md"
          >
            <div
              className="w-full max-w-xs"
              style={{
                // border: "2px solid red",
                height: "-webkit-fill-available",
              }}
            >
              <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-3"
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <h2>Registration Form</h2>
                </div>
                <div className="mb-3">
                  {/* <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="username"
                >
                  Name
                </label> */}
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
                </div>
                <div className="mb-6">
                  {/* <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="password"
                >
                  Email
                </label> */}
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
                </div>
                <div className="mb-6">
                  {/* <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="password"
                >
                  PhoneNumber
                </label> */}
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
                </div>
                <div className="mb-6">
                  {/* <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="password"
                >
                  PhoneNumber
                </label> */}
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
                </div>
                <div className="mb-6">
                  {/* <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="password"
                >
                  PhoneNumber
                </label> */}
                  <input
                    className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="state"
                    type="text"
                    name="state"
                    placeholder="Enter your State"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.state}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button className="btn btn-primary" type="submit">
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
