import { createSlice } from "@reduxjs/toolkit";
import { signupAPI } from "./authAuthentication";
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
        state.loading = true;
        state.error = true
       })
       builder.addCase(loginAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload 
       })
       builder.addCase(loginAPI.rejected, (state, action) => {
       state.loading = false;
       state.error = true
       })
    }
})
export default authSlice.reducer