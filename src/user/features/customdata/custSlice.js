import { createSlice } from "@reduxjs/toolkit";
import {
  getBankniftyDataApi,
  getStrategyDataApi,
  tradeHistoryApi,
} from "./custAuthentication";

const initialState = {
  loading: false,
  error: "",
  bankNifty: [],
  Nifty: [],
  message: "",
  token: "",
  data: [],
  strategy: null,
  tradeHistory: [],
};

const indexSlice = createSlice({
  name: "indexData",
  initialState,
  reducers: {
    // clearState: () => {
    //   [...initialState]
    // }
  },
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
      state.Nifty = action.payload.data.data.filter((item) => {
        if (item.expiry === "2024-03-13") {
          if (
            item.symbol === "BANKNIFTY13MAR2452500CE" ||
            item.symbol === "BANKNIFTY13MAR2452500PE"
          ) {
            return item;
          }
        }
      });
    });
    builder.addCase(getBankniftyDataApi.rejected, (state, action) => {
      // console.log("getBankniftyDataApi.rejected** =>", action.payload);
      state.loading = false;
      state.error = action.error;
      state.data = [];
    });

    //-------------------------Strategy Case------------------//
    builder.addCase(getStrategyDataApi.pending, (state, action) => {
      // console.log("Strategy-1", action.payload);
      state.loading = true;
      state.error = action.payload;
    });
    builder.addCase(getStrategyDataApi.fulfilled, (state, action) => {
      // console.log("Strategy-2", action.payload);
      state.loading = false;
      state.strategy = action.payload;
    });
    builder.addCase(getStrategyDataApi.rejected, (state, action) => {
      // console.log("Strategy-3", action.payload);
      state.loading = false;
      state.error = action.error;
      state.strategy = null;
    });

    //-------------------------Trade History Case------------------//
    builder.addCase(tradeHistoryApi.pending, (state, action) => {
      // console.log("tradeHistoryApi :", action.payload);
      state.loading = true;
      state.error = action.payload;
    });
    builder.addCase(tradeHistoryApi.fulfilled, (state, action) => {
      // console.log("tradeHistoryApi :", action.payload);
      state.loading = false;
      state.tradeHistory = action.payload;
    });
    builder.addCase(tradeHistoryApi.rejected, (state, action) => {
      // console.log("tradeHistoryApi :", action.payload);
      state.loading = false;
      state.error = action.error;
      state.tradeHistory = null;
    });
  },
});
export default indexSlice.reducer;
