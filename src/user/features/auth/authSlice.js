import { createSlice } from "@reduxjs/toolkit";
import { mobileAuthentication, signupAPI } from "./authAuthentication";
import { loginAPI } from "./authAuthentication";

const initialState = {
    loading: false,
    error:"",
    user: "",
    message:"",
    token:"",
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {},
    extraReducers:(builder) => {
      //-----------------mobileAuthentication---------------//
      builder.addCase(mobileAuthentication.pending, (state, action) => {
        state.loading = true;
      })
      builder.addCase(mobileAuthentication.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
            builder.addCase(mobileAuthentication.rejected, (state, action) => {
             state.loading = true;
             state.error = action.error;
      })
  
       //------------------Signupcase------------------------// 
       builder.addCase( signupAPI.pending, (state, action) => {
            console.log("pendin-action :", action);
            state.loading = true
       })
       builder.addCase(signupAPI.fulfilled, (state, action) => {
        console.log("payload :", action.payload);
        state.loading = false
        state.user = action.payload
       })
       builder.addCase(signupAPI.rejected, (state, action) => {
        console.log("rejected-action :", action);
        state.error = action.payload
       })

       //----------------------login case--------------------//
       builder.addCase(loginAPI.pending, (state, action)  => {
        console.log("pendin-action :", action);
        state.loading = true;
       })
       builder.addCase(loginAPI.fulfilled, (state, action) => {
        console.log("fullfieled-action :", action);
        state.loading = false;
        state.user = action.payload 
       })
       builder.addCase(loginAPI.rejected, (state, action) => {
        console.log("rejected-action :", action);
       state.loading = false;
       state.error = action.payload
       })
    }
})
export default authSlice.reducer