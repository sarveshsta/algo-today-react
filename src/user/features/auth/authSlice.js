import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    mobileNumber: '',
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {},
    extraReducers:(builder) => {
      
    }
})
export default authSlice.reducer