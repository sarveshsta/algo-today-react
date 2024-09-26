import axios from "axios";
import butterup from "butteruptoasts";
import { createAsyncThunk } from "@reduxjs/toolkit";

const userUrl = "http://ec2-65-0-101-156.ap-south-1.compute.amazonaws.com:8080";
butterup.options.toastLife = 2000;

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

      if (res.data.success === true) {
        butterup.toast({
          title: "🎉 Hooray!",
          message: res.data.message,
          location: "top-right",
          icon: true,
          dismissable: true,
          type: "success",
        });
        return res;
      } else {
        butterup.toast({
          title: "⚠️ Error",
          message: res.data.message,
          location: "top-right",
          icon: true,
          dismissable: true,
          type: "error",
        });
        return thunkAPI.rejectWithValue(res.data);
      }
    } catch (error) {
      butterup.toast({
        title: "⚠️ Error",
        message: error.message,
        location: "top-right",
        icon: true,
        dismissable: true,
        type: "error",
      });
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
      if (res.data.success === true) {
        butterup.toast({
          title: "🎉 Hooray!",
          message: res.data.message,
          location: "top-right",
          icon: true,
          dismissable: true,
          type: "success",
        });
        return res;
      } else {
        butterup.toast({
          title: "⚠️ Error",
          message: res.data.message,
          location: "top-right",
          icon: true,
          dismissable: true,
          type: "error",
        });
        return thunkAPI.rejectWithValue(res.data);
      }
    } catch (error) {
      butterup.toast({
        title: "⚠️ Error",
        message: error.message,
        location: "top-right",
        icon: true,
        dismissable: true,
        type: "error",
      });
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

      if (res.data.success === true) {
        butterup.toast({
          title: "🎉 Hooray!",
          message: res.data.message,
          location: "top-right",
          icon: true,
          dismissable: true,
          type: "success",
        });
        return res.data;
      } else {
        butterup.toast({
          title: "⚠️ Error",
          message: res.data.message,
          location: "top-right",
          icon: true,
          dismissable: true,
          type: "error",
        });
        return thunkAPI.rejectWithValue(res.data);
      }
    } catch (error) {
      butterup.toast({
        title: "⚠️ Error",
        message: error.response.data.message,
        location: "top-right",
        icon: true,
        dismissable: true,
        type: "error",
      });
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

      if (response.data.success === true) {
        butterup.toast({
          title: "🎉 Hooray!",
          message: response.data.message,
          location: "top-right",
          icon: true,
          dismissable: true,
          type: "success",
        });
        return response;
      } else {
        butterup.toast({
          title: "⚠️ Error",
          message: response.data.message,
          location: "top-right",
          icon: true,
          dismissable: true,
          type: "error",
        });
        return thunkAPI.rejectWithValue(response);
      }
    } catch (error) {
      butterup.toast({
        title: "⚠️ Error",
        message: error.message,
        location: "top-right",
        icon: true,
        dismissable: true,
        type: "error",
      });
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
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.data.success === true) {
        butterup.toast({
          title: "🎉 Hooray!",
          message: response.data.message,
          location: "top-right",
          icon: true,
          dismissable: true,
          type: "success",
        });
        return response;
      } else {
        butterup.toast({
          title: "⚠️ Error",
          message: response.data.message,
          location: "top-right",
          icon: true,
          dismissable: true,
          type: "error",
        });
        return thunkAPI.rejectWithValue(response);
      }
    } catch (error) {
      butterup.toast({
        title: "⚠️ Error",
        message: error.message,
        location: "top-right",
        icon: true,
        dismissable: true,
        type: "error",
      });
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
    if (response.data.success === true) {
      butterup.toast({
        title: "🎉 Hooray!",
        message: response.data.message,
        location: "top-right",
        icon: true,
        dismissable: true,
        type: "success",
      });
      return response;
    } else {
      butterup.toast({
        title: "⚠️ Error",
        message: response.data.message,
        location: "top-right",
        icon: true,
        dismissable: true,
        type: "error",
      });
      return thunkAPI.rejectWithValue(response);
    }
  } catch (error) {
    butterup.toast({
      title: "⚠️ Error",
      message: error.message,
      location: "top-right",
      icon: true,
      dismissable: true,
      type: "error",
    });
    return thunkAPI.rejectWithValue(error);
  }
});
