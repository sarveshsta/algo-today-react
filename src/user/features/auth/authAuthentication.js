import axios from "axios";
import butterup from "butteruptoasts";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { showToast } from "../../../utility";
import Cookies from 'js-cookie';



// const userUrl = "http://localhost:5000";
const userUrl = process.env.REACT_APP_BACKEND_URL;

butterup.options.toastLife = 2000;

//------------------ Mobile Authentication API---------------//
export const mobileAuthentication = createAsyncThunk(
  "auth/mobileauthentication",
  async (body, thunkAPI) => {
    try {
      const res = await axios.post(`${userUrl}/request-otp/`, body);

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

//------------------ Email Authentication API---------------//
export const emailAuthentication = createAsyncThunk(
  "auth/mobileauthentication",
  async (body, thunkAPI) => {
    try {
      const res = await axios.post(`${userUrl}/request-email-otp/`, body);

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
      const res = await axios.post(`${userUrl}/verify-otp/`, body);
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

//------------------Email  OTP Verification API---------------//
export const otpEmailVerificationAPI = createAsyncThunk(
  "auth/otpverification",
  async (body, thunkAPI) => {
    try {
      const res = await axios.post(`${userUrl}/verify-email-otp/`, body);
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

//-----------------------Regsiter API-------------------------//
export const registerAPI = createAsyncThunk(
  "auth/signup",
  async (body, thunkAPI) => {
    try {
      const res = await axios.post(`${userUrl}/register/`, body);

      if (res.data.success === true) {
        Cookies.set("accessToken", res.data.data.access, { secure: true, sameSite: "Strict" });
        Cookies.set("refreshToken", res.data.data.refresh, { secure: true, sameSite: "Strict" });
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
//-----------------------Signup API-------------------------//
export const signupAPI = createAsyncThunk(
  "auth/signup",
  async (body, thunkAPI) => {
    try {
      const res = await axios.post(`${userUrl}/signup/`, body);

      if (res.data.success === true) {
        Cookies.set("accessToken", res.data.data.access, { secure: true, sameSite: "Strict" });
        Cookies.set("refreshToken", res.data.data.refresh, { secure: true, sameSite: "Strict" });
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
      const response = await axios.post(`${userUrl}/login/`, body);
      console.log(response.data, "response")
      if (response.data.success === true) {
        Cookies.set("accessToken", response.data.data.access, { secure: true, sameSite: "Strict" });
        Cookies.set("refreshToken", response.data.data.refresh, { secure: true, sameSite: "Strict" });
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
      const response = await axios.post(`${userUrl}/update-password/`, body);
      if (response.data.success === true) {
        showToast("🎉 Hooray!", response.data.message, "success");
        return response.data;
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
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      showToast("⚠️ Error", "No access token found.", "error");
      return thunkAPI.rejectWithValue({ message: "Access token missing." });
    }

    const response = await axios.post(`${userUrl}/logout/`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.data.success === true) {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      showToast("🎉 Hooray!", response.data.message, "success");
     
      return response.data;
    } else {
      showToast("⚠️ Error", response.data.message, "error");
      return thunkAPI.rejectWithValue(response);
    }
  } catch (error) {
    showToast("⚠️ Error", error.message, "error");
    return thunkAPI.rejectWithValue(error);
  }
});


//---------------------userInfo API---------------------------//
export const userInfo = createAsyncThunk("auth/userInfo", async ( thunkAPI) => {
  
  try {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      showToast("⚠️ Error", "No access token found.", "error");
      return thunkAPI.rejectWithValue({ message: "Access token missing." });
    }

    const response = await axios.get(`${userUrl}/user-info/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.data.success === true) {
      
      showToast("🎉 Hooray!", response.data.message, "success");
     
      return response.data;
    } else {
      showToast("⚠️ Error", response.data.message, "error");
      return thunkAPI.rejectWithValue(response);
    }
  } catch (error) {
    showToast("⚠️ Error", error.message, "error");
    return thunkAPI.rejectWithValue(error);
  }
});

//------------------ Request Phone OTP API ---------------//
export const requestPhoneOtpAPI = createAsyncThunk(
  "auth/requestPhoneOtpAPI",
  async (body, thunkAPI) => {
    try {
      const accessToken = Cookies.get("accessToken");
      const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
      const res = await axios.post(`${userUrl}/request-phone-otp/`, body, { headers });
      if (res.data.success === true) {
        showToast("🎉 Hooray!", res.data.message, "success");
        return res;
      } else {
        showToast("⚠️ Error", res.data.message, "error");
        return thunkAPI.rejectWithValue(res.data);
      }
    } catch (error) {
      showToast("⚠️ Error", error.message, "error");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//------------------ Verify Phone OTP API ---------------//
export const verifyPhoneOtpAPI = createAsyncThunk(
  "auth/verifyPhoneOtpAPI",
  async (body, thunkAPI) => {
    try {
      const accessToken = Cookies.get("accessToken");
      const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
      const res = await axios.post(`${userUrl}/verify-phone-otp/`, body, { headers });
      if (res.data.success === true) {
        showToast("🎉 Hooray!", res.data.message, "success");
        return res;
      } else {
        showToast("⚠️ Error", res.data.message, "error");
        return thunkAPI.rejectWithValue(res.data);
      }
    } catch (error) {
      showToast("⚠️ Error", error.message, "error");
      return thunkAPI.rejectWithValue(error);
    }
  }
);


