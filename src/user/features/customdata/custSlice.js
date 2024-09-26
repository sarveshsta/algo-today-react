import { createSlice } from "@reduxjs/toolkit";
import {
  getBankniftyDataApi,
  getStrategyDataApi,
  stopStrategy,
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
  stop_strategy:[],
};

const indexSlice = createSlice({
  name: "indexData",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    //----------------- Banknifty data case -----------------------//
    builder.addCase(getBankniftyDataApi.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
    builder.addCase(getBankniftyDataApi.fulfilled, (state, action) => {
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
      state.loading = false;
      state.error = action.error;
      state.data = [];
    });

    //------------------------- Start Strategy Case------------------//
    builder.addCase(getStrategyDataApi.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
    builder.addCase(getStrategyDataApi.fulfilled, (state, action) => {
      state.loading = false;
      state.strategy = action.payload;
    });
    builder.addCase(getStrategyDataApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.strategy = null;
    });

    //------------------------- Stop Strategy Case------------------//
    builder.addCase(stopStrategy.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
    builder.addCase(stopStrategy.fulfilled, (state, action) => {
      state.loading = false;
      state.stop_strategy = action.payload;
    });
    builder.addCase(stopStrategy.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.stop_strategy = null;
    });

    //-------------------------Trade History Case------------------//
    builder.addCase(tradeHistoryApi.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
    builder.addCase(tradeHistoryApi.fulfilled, (state, action) => {
      state.loading = false;
      state.tradeHistory = action.payload;
    });
    builder.addCase(tradeHistoryApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.tradeHistory = null;
    });
  },
});
export default indexSlice.reducer;
