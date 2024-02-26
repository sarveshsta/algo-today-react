import { createSlice } from "@reduxjs/toolkit";
import { loginAPI } from "./authAuthentication";
import {
  mobileAuthentication,
  otpVerificationAPI,
  signupAPI,
} from "./authAuthentication";

const initialState = {
  loading: false,
  error: "",
  user: null,
  message: "",
  token: "",
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
      console.log("mobauth :", action.payload);
      state.loading = false;
      state.user = action.payload;
      if (action.payload.status === 200) {
        const localSavePayload = {
          otp: action?.payload?.data?.data?.otp,
          phone: JSON.parse(action?.payload?.config?.data),
        };
        localStorage.setItem("authdetail",JSON.stringify(localSavePayload).replace(/\\"/g, '"')
        );
      }
    });
    builder.addCase(mobileAuthentication.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error;
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
      state.error = action.payload;
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
      state.error = action.payload;
    });
  },
});
export default authSlice.reducer;
