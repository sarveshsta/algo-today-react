import axios from "axios";
import butterup from "butteruptoasts";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { showToast } from "../../../utility";

const userUrl = "https://fecf-2405-201-302a-d836-8112-7fa4-2a80-f129.ngrok-free.app";
butterup.options.toastLife = 2000;

//------------------ Mobile Authentication API---------------//
export const mobileAuthentication = createAsyncThunk(
  "auth/mobileauthentication",
  async (body, thunkAPI) => {
    try {
      const res = await axios.post(`${userUrl}/request-otp/`, body, {
        headers: {
          // "ngrok-skip-browser-warning": "true"
        },
      });

      if (res.data.success === true) {
        showToast("🎉 Hooray!", res.data.message, "success");
        return res;
      } else {
        showToast("⚠️ Error", res.data.message, "error");
        return thunkAPI.rejectWithValue(res.data);
      }
    } catch (error) {
      showToast("⚠️ Error", error.message, "error");
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
          // "ngrok-skip-browser-warning": "true"
        },
      });
      if (res.data.success === true) {
        showToast("🎉 Hooray!", res.data.message, "success");
        return res;
      } else {
        showToast("⚠️ Error", res.data.message, "error");
        return thunkAPI.rejectWithValue(res.data);
      }
    } catch (error) {
      showToast("⚠️ Error", error.message, "error");
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
          // "ngrok-skip-browser-warning": "true"
        },
      });

      if (res.data.success === true) {
        showToast("🎉 Hooray!", res.data.message, "success");
        return res.data;
      } else {
        showToast("⚠️ Error", res.data.message, "error");
        return thunkAPI.rejectWithValue(res.data);
      }
    } catch (error) {
      showToast("⚠️ Error", error.response.data.message, "error");
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
          // "ngrok-skip-browser-warning": "true"
        },
      });

      if (response.data.success === true) {
        showToast("🎉 Hooray!", response.data.message, "success");
        return response;
      } else {
        showToast("⚠️ Error", response.data.message, "error");
        return thunkAPI.rejectWithValue(response);
      }
    } catch (error) {
      showToast("⚠️ Error", error.message, "error");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//----------------------Forgot-PasswordAPI------------------//
export const forgotAPI = createAsyncThunk(
  "forgotpassword",
  async (body, thunkAPI) => {
    try {
      const response = await axios.post(`${userUrl}/update-password/`, body, {
        headers: {
          // "ngrok-skip-browser-warning": "true"
        },
      });
      if (response.data.success === true) {
        showToast("🎉 Hooray!", response.data.message, "success");
        return response;
      } else {
        showToast("⚠️ Error", response.data.message, "error");
        return thunkAPI.rejectWithValue(response);
      }
    } catch (error) {
      showToast("⚠️ Error", error.message, "error");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//---------------------Logout API---------------------------//
export const logoutAPI = createAsyncThunk("logout", async (body, thunkAPI) => {
  try {
    const response = await axios.post(`${userUrl}/logout/`, body, {
      headers: {
      //  "ngrok-skip-browser-warning": "true"
      },
    });
    if (response.data.success === true) {
      showToast("🎉 Hooray!", response.data.message, "success");
      return response;
    } else {
      showToast("⚠️ Error", response.data.message, "error");
      return thunkAPI.rejectWithValue(response);
    }
  } catch (error) {
    showToast("⚠️ Error", error.message, "error");
    return thunkAPI.rejectWithValue(error);
  }
});