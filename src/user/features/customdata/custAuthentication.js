import axios from "axios";
import butterup from "butteruptoasts";
import { showToast } from "../../../utility";
import { createAsyncThunk } from "@reduxjs/toolkit";

const tradeURL = "https://cf44-2405-201-302a-d836-39ab-e05c-f606-1bba.ngrok-free.app";

const headerconfig = {
  headers: {
    "ngrok-skip-browser-warning": "true",
    // "Content-Type": "application/json",  
  },
};

//------------------ Banknifty Index data API---------------//
export const indexExpiryDataApi = createAsyncThunk(
  "bankniftyExpiry",
  async (index, thunkAPI, ) => {
    try {
      const response = await axios.get(`${tradeURL}/tokens/${index}/`,{ headers: headerconfig.headers });
      if (response.status == 200) {
        showToast("🎉 Hooray!", response.data.message, "success");
        return response;
      } else {
        return response;
      }
    } catch (error) {
      return error;
    }
  }
);

//------------------ Banknifty expiry data API---------------//
export const indexStrikePriceDataApi = createAsyncThunk(
  "bankniftyStrikePrice",
  async ({ index, expiry }) => {
    try {
      const response = await axios.get(`${tradeURL}/tokens/${index}/${expiry}/`,{ headers: headerconfig.headers });
      if (response.status == 200) {
        showToast("🎉 Hooray!", response.data.message, "success");
        return response;
      } else {
        return response;
      }
    } catch (error) {
      return error;
    }
  }
);


//---------Strategy API Data ----------------------//
export const getStrategyDataApi = createAsyncThunk(
  "getStrategy-Data",
  async (body, thunkAPI) => {
    try {
      const res = await axios.post(
        `${tradeURL}/strategy/live_strategy_data/`,
        body,
        { headers: headerconfig.headers }
      );
      console.log("res", res)
      if (res.data.success === true) {
        showToast("🎉 Hooray!", res.data.message, "success");
        return res.data;
      } else {
        showToast("⚠️ Error", res.data.message, "error");
        return thunkAPI.rejectWithValue(res.data.message);
      }
    } catch (error) {
      showToast("⚠️ Error", error.message, "error");
      return error;
    }
  }
);

//------------------ Trade History API---------------//
export const tradeHistoryApi = createAsyncThunk(
  "tradeHistoryApi",
  async (body, thunkAPI, index) => {
    try {
      const response = await axios.get(
        `${tradeURL}/tokens/trades_details/`
      );
      if (response.status == 200) {
        showToast(
          "🎉 Hooray!",
          "Trade History Retrieved Successfully",
          "success"
        );
        return response.data;
      } else {
        showToast("⚠️ Error", response.data.message, "error");
        return response;
      }
    } catch (error) {
      showToast("⚠️ Error", error.message, "error");
      return error;
    }
  }
);

//---------Stop - Strategy API Data ----------------------//
export const stopStrategy = createAsyncThunk(
  "stopStrategy-Data",
  async (strategy_id, thunkAPI) => {
    try {
      const res = await axios.get(
        `${tradeURL}/strategy/stop_strategy/${strategy_id}/`,
        { headers: headerconfig.headers }
      );

      if (res.status == 200) {
        showToast("🎉 Hooray!", res.data.detail, "success");
        return res.data;
      } else {
        showToast("⚠️ Error", res.data.message, "error");
        return thunkAPI.rejectWithValue(res.data.message);
      }
    } catch (error) {
      showToast("⚠️ Error", error.message, "error");
      return error;
    }
  }
);

// ---------Trading API Data ---------------------- //
export const tradingData = createAsyncThunk(
  "Trading-Data",
  async (body, thunkAPI) => {
    try {
      const res = await axios.post(
        `${tradeURL}/tokens/tradingdata/`, body,
      );
      if (res.status == 200) {
        showToast("🎉 Hooray!", res.data.detail, "success");
        return res.data;
      } else {
        showToast("⚠️ Error", res.data.message, "error");
        return thunkAPI.rejectWithValue(res.data.message);
      }
    } catch (error) {
      showToast("⚠️ Error", error.message, "error");
      return error;
    }
  }
);

//---------Live API Data ----------------------//
export const getStrategyLiveData = createAsyncThunk(
  "getStrategy-Data",
  async (body, thunkAPI) => {
    try {
      const res = await axios.post(
        `${tradeURL}/strategy/live_strategy_data/`,
        body,
        { headers: headerconfig.headers }
      );
      if (res.data.success === true) {
        showToast("🎉 Hooray!", res.data.message, "success");
        return res.data;
      } else {
        showToast("⚠️ Error", res.data.message, "error");
        return thunkAPI.rejectWithValue(res.data.message);
      }
    } catch (error) {
      showToast("⚠️ Error", error.message, "error");
      return error;
    }
  }
);