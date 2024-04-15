import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

<<<<<<< HEAD
const backendUrl =
  "http://13.127.232.213:8000";
  // "https://862e-2409-40c4-3030-1662-59b2-ecfe-c96d-d41.ngrok-free.app";
=======
>>>>>>> ba8360d05838d71fa28993da6e94134f4c359410

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
export const logoutAPI = createAsyncThunk("logout", 
 async (body, thunkAPI) => {
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
