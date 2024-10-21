import { createSlice } from "@reduxjs/toolkit";
import {
  getBankniftyDataApi,
  getStrategyDataApi,
  stopStrategy,
  tradeHistoryApi,
  indexExpiryDataApi,
  indexStrikePriceDataApi,
  tradingData,
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
  stop_strategy: [],
  indexExpiryDataApi: [],
  indexStrikePriceDataApi: [],
  isConnected: false,
  socketmessage: [],
  tradingData: [],
};

const indexSlice = createSlice({
  name: "indexData",
  initialState,
  reducers: {
    setConnection(state, action) {
      state.isConnected = action.payload;
    },
    setMessage(state, action) {
      state.socketmessage = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // ----------------- Banknifty expiry data case -----------------------//
    builder.addCase(indexExpiryDataApi.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
    builder.addCase(indexExpiryDataApi.fulfilled, (state, action) => {
      state.loading = false;
      state.indexExpiryDataApi = action.payload.data;
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
    builder.addCase(indexExpiryDataApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.data = [];
    });

    // ----------------- Banknifty strike price data case -----------------------//
    builder.addCase(indexStrikePriceDataApi.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
    builder.addCase(indexStrikePriceDataApi.fulfilled, (state, action) => {
      state.loading = false;
      state.indexStrikePriceDataApi = action.payload.data.data;
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
    builder.addCase(indexStrikePriceDataApi.rejected, (state, action) => {
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

    // -------------------------Trading Data Case------------------//
    builder.addCase(tradingData.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
    builder.addCase(tradingData.fulfilled, (state, action) => {
      state.loading = false;
      state.tradingData = action.payload;
    });
    builder.addCase(tradingData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.tradingData = null;
    });
  },
});

export const { setConnection, setMessage, setError } = indexSlice.actions;
export default indexSlice.reducer;
