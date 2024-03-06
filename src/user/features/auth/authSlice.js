import { createSlice } from "@reduxjs/toolkit";
import {
  getBankniftyDataApi,
  mobileAuthentication,
  otpVerificationAPI,
  signupAPI,
} from "./authAuthentication";
import { 
  forgotAPI, 
  loginAPI, 
  logoutAPI 
} from "./authAuthentication";

const initialState = {
  loading: false,
  error: "",
  user: "",
  message: "",
  token: "",
  data:[]
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //-----------------mobileAuthentication case---------------//
    builder.addCase(mobileAuthentication.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(mobileAuthentication.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      if (action.payload.status === 200) {
        const localSavePayload = {
          otp: action?.payload?.data?.data?.otp,
          ...JSON.parse(action?.payload?.config?.data),
        };
        localStorage.setItem(
          "authdetail",
          JSON.stringify(localSavePayload).replace(/\\"/g, '"')
        );
      }
    });
    builder.addCase(mobileAuthentication.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error;
      state.user = action.payload;
    });

    //-----------------OTP Verification case---------------//
    builder.addCase(otpVerificationAPI.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(otpVerificationAPI.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(otpVerificationAPI.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error;
    });

    //------------------Signup case------------------------//
    builder.addCase(signupAPI.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(signupAPI.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(signupAPI.rejected, (state, action) => {
      state.error = action.error;
      state.user = action.payload;
    });

    //----------------------login case--------------------//
    builder.addCase(loginAPI.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginAPI.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(loginAPI.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.user = action.payload;
    });

    //-----------------forgotpassword case---------------//
    builder.addCase(forgotAPI.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
    builder.addCase(forgotAPI.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(forgotAPI.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.user = action.payload;
    });

    //-----------------logout case-----------------------//
    builder.addCase(logoutAPI.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
    builder.addCase(logoutAPI.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      if (action.payload.status === 200) {
        localStorage.removeItem("authdetail");
      }
    });
    builder.addCase(logoutAPI.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.user = action.payload;
    });

    //----------------- Banknifty data case -----------------------//
    builder.addCase(getBankniftyDataApi.pending, (state, action) => {
      console.log("getBankniftyDataApi.pending** =>",action);
      state.loading = true;
      state.error = action.payload;
    });
    builder.addCase(getBankniftyDataApi.fulfilled, (state, action) => {
      console.log("getBankniftyDataApi.fulfilled** =>",action.payload);
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getBankniftyDataApi.rejected, (state, action) => {
      console.log("getBankniftyDataApi.rejected** =>",action);
      state.loading = false;
      state.error = action.error;
      state.data = action.payload;
    });
  },
});
export default authSlice.reducer;
