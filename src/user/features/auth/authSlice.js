import { createSlice } from "@reduxjs/toolkit";
import {
  mobileAuthentication,
  otpVerificationAPI,
  signupAPI,
  forgotAPI,
  loginAPI,
  logoutAPI,
} from "./authAuthentication";

const initialState = {
  loading: false,
  error: "",
  user: "",
  message: "",
  token: "",
  data: [],
  status: "",
  statusText:"",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser : () => {

    },
    deleteUser : () => {
      
    },
    updateUser : () => {
      
    },
    storageLocal: () => {

    },
  },
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
      console.log("logout-pending", action.payload);
      state.loading = true;
      state.error = action.payload;
    });
    builder.addCase(logoutAPI.fulfilled, (state, action) => {
      console.log("logout-fulfilled", action.payload);
      state.loading = false;
      state.user = action.payload;
      if (action.payload.status === 200) {
        localStorage.removeItem("authdetail");
      }
    });
    builder.addCase(logoutAPI.rejected, (state, action) => {
      console.log("logout-rejected", action.payload);
      state.loading = false;
      state.error = action.error;
      state.user = action.payload;
    });
  },
});
export default authSlice.reducer;
