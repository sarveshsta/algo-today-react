import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendUrl = "http://13.127.232.213:8000";

// const config = {
//   headers: {
//     "Content-type": "application/json",
//   },
// };

//------------------ Mobile Authentication API---------------//
export const mobileAuthentication = createAsyncThunk(
  "auth/mobileauthentication",
  async (body, thunkAPI) => {
    try {
      const res = await axios.post(`${backendUrl}/request-otp/`, body, {
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
      const res = await axios.post(`${backendUrl}/verify-otp/`, body, {
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
      const res = await axios.post(`${backendUrl}/signup/`, body, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (res.data) {
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
      const response = await axios.post(`${backendUrl}/login/`, body, {
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
        `${backendUrl}/update-password/`,
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
    const response = await axios.post(`${backendUrl}/logout/`, body, {
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

//------------------ Banknifty data API---------------//
export const getBankniftyDataApi = createAsyncThunk(
  "bankniftyindexdata",
  async (body, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://4e21-2405-201-301d-f84d-9125-5eba-99a0-17c3.ngrok-free.app/tokens/BANKNIFTY",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        console.log("res** =>>", response);
        return response;
      } else {
        return response;
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);
