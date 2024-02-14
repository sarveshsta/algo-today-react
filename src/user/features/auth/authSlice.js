import { createSlice } from "@reduxjs/toolkit";
import { signupAPI } from "./authAuthentication";

const initialState = {
    loading: false,
    error: false,
    user: '',
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {},
    extraReducers:(builder) => {
       builder.addCase( signupAPI.pending, (state, action) => {
            state.loading = true
       })
       builder.addCase(signupAPI.fulfilled, (state, action) => {
        console.log("payload", action.payload);
        state.loading = false
        state.user = action.payload
       })
       builder.addCase(signupAPI.rejected, (state, action) => {
        state.error = true
       })
    }
})
export default authSlice.reducer