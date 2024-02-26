import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendUrl = "http://13.127.232.213:8000";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

//------------------ Mobile Authentication API---------------//
export const mobileAuthentication = createAsyncThunk(
  "auth/mobileauthentication",
  async (body, thunkAPI) => {
    try {
      const res = await axios.post(`${backendUrl}/request-otp/`, body, config);

      if (res.data) {
        return res;
      } else {
        console.log("No data in res, API not called");
      }
    } catch (error) {
      console.log("error :", error);
    }
  }
);

//------------------ OTP Verification API---------------//
export const otpVerificationAPI = createAsyncThunk(
  "auth/otpverification",
  async (body, thunkAPI) => {
    try {
      const res = await axios.post(`${backendUrl}/verify-otp/`, body, config);

      if (res.data) {
        return res;
      } else {
        console.log("No data in res, API not called");
      }
    } catch (error) {
      console.log("error :", error);
    }
  }
);

//-----------------------Signup API-------------------------//
export const signupAPI = createAsyncThunk(
  "auth/signup",
  async (body, thunkAPI) => {
    try {
      const res = await axios.post(`${backendUrl}/signup/`, body, config);
      console.log("res111: ", res);

      if (res.data) {
        console.log("res** :", res.data);
        return res.data;
      } else {
        console.log("dataapi:");
        return thunkAPI.rejectWithValue(res.data);
      }
    } catch (error) {
      console.log("err :", error);
      throw error;
    }
  }
);

//--------------------------Login API-----------------------//
export const loginAPI = createAsyncThunk(
  "user/Login",
  async (body, thunkAPI) => {
    try {
      const response = await axios.post(`${backendUrl}/login/`, body, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.data) {
        console.log("***", response.data);
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
