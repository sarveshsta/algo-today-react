import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

   const userUrl = "http://65.0.101.156:8080"

//------------------ Mobile Authentication API---------------//
export const mobileAuthentication = createAsyncThunk(
  "auth/mobileauthentication",
  async (body, thunkAPI) => {
    try {
      const res = await axios.post(`${userUrl}/request-otp/`, body, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (res) {
        console.log("ressss",res);
        return res;
      } else {
        return thunkAPI.rejectWithValue(res.data);
      }
    } catch (error) {
      console.log("res-err** -=>", error);
      return error;
    }
  }
);

//------------------ OTP Verification API---------------//
export const otpVerificationAPI = createAsyncThunk(
  "auth/otpverification",
  async (body, thunkAPI) => {
    try {
      const res = await axios.post(`${userUrl}/verify-otp/`, body, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (res) {
        return res;
      } else {
        return thunkAPI.rejectWithValue(res.data);
      }
    } catch (error) {
      return error;
    }
  }
);

//-----------------------Signup API-------------------------//
export const signupAPI = createAsyncThunk(
  "auth/signup",
  async (body, thunkAPI) => {
    try {
      const res = await axios.post(`${userUrl}/signup/`, body, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (res.data) {
        console.log("ressss",res.data);
        return res.data;
      } else {
        return thunkAPI.rejectWithValue(res.data);
      }
    } catch (error) {
      return error;
    }
  }
);

//--------------------------Login API-----------------------//
export const loginAPI = createAsyncThunk(
  "user/Login",
  async (body, thunkAPI) => {
    try {
      const response = await axios.post(`${userUrl}/login/`, body, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.data) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//----------------------Forgot-PasswordAPI------------------//
export const forgotAPI = createAsyncThunk(
  "forgotpassword",
  async (body, thunkAPI) => {
    try {
      const response = await axios.post(
        `${userUrl}/update-password/`,
        body,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//---------------------Logout API---------------------------//
export const logoutAPI = createAsyncThunk("logout", async (body, thunkAPI) => {
  try {
    const response = await axios.post(`${userUrl}/logout/`, body, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (response.data) {
      return response;
    } else {
      return thunkAPI.rejectWithValue(response);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
