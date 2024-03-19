import { createSlice } from "@reduxjs/toolkit";
import { getBankniftyDataApi } from "./custAuthentication";

const initialState = {
  loading: false,
  error: "",
  bankNifty: [],
  Nifty: [],
  message: "",
  token: "",
  data: [],
};

const indexSlice = createSlice({
  name: "indexData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //----------------- Banknifty data case -----------------------//
    builder.addCase(getBankniftyDataApi.pending, (state, action) => {
      // console.log("getBankniftyDataApi.pending** =>", action.payload);
      state.loading = true;
      state.error = action.payload;
    });
    builder.addCase(getBankniftyDataApi.fulfilled, (state, action) => {
      // console.log("getBankniftyDataApi.fulfilled** =>", action.payload);
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getBankniftyDataApi.rejected, (state, action) => {
      // console.log("getBankniftyDataApi.rejected** =>", action.payload);
      state.loading = false;
      state.error = action.error;
      state.data = [];
    });
  },
});
export default indexSlice.reducer;
