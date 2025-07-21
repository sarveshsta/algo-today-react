import axios from "axios";
import butterup from "butteruptoasts";
import { showToast } from "../../../utility";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// const tradeURL = "https://cf44-2405-201-302a-d836-39ab-e05c-f606-1bba.ngrok-free.app";
 const tradeURL =process.env.REACT_APP_BACKEND_URL ;

const token = Cookies.get("accessToken");
const headerconfig = {
  headers: {
  // "ngrok-skip-browser-warning": "69420",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    
  },
};

//------------------ Banknifty Index data API---------------//
export const indexExpiryDataApi = createAsyncThunk(
  "bankniftyExpiry",
  async (index, thunkAPI) => {
    try {
      const response = await axios.get(`${tradeURL}/token/${index}/`, {
        headers: headerconfig.headers,
      });
      if (response.status == 200) {
        showToast("🎉 Hooray!", response.data.message, "success");
        return response;
      } else {
        return response;
      }
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return;
      }
      return error;
    }
  }
);

//------------------ Banknifty expiry data API---------------//
export const indexStrikePriceDataApi = createAsyncThunk(
  "bankniftyStrikePrice",
  async ({ index, expiry }) => {
    try {
      const response = await axios.get(
        `${tradeURL}/token/${index}/${expiry}/`,
        { headers: headerconfig.headers }
      );
      if (response.status == 200) {
        showToast("🎉 Hooray!", response.data.message, "success");
        return response;
      } else {
        return response;
      }
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return;
      }
      return error;
    }
  }
);

//---------Strategy API Data ----------------------//
export const getStrategyDataApi = createAsyncThunk(
  "getStrategy-Data",
  async (body, thunkAPI) => {
    try {
      const accessToken = Cookies.get("accessToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        // If cross-origin cookies or credentials are involved:

      };
      console.log(accessToken, "accessToken");
  
      const res = await axios.post(
        `${tradeURL}/start/`,
        body,
        config
      );
      console.log("res", res);
      if (res.data.success === true) {
        showToast("🎉 Hooray!", res.data.message, "success");
        return res.data;
      } else {
        showToast("⚠️ Error", res.data.message, "error");
        return thunkAPI.rejectWithValue(res.data.message);
      }
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return;
      }
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
      const response = await axios.get(`${tradeURL}/trade-details/`, { headers: headerconfig.headers });
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
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return;
      }
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
      const res = await axios.post(
        `${tradeURL}/api/strategy/stop-strategy/${strategy_id}`,
        {}, // No body, so pass an empty object
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
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return;
      }
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
      const res = await axios.post(`${tradeURL}/tokens/tradingdata/`, body);
      if (res.status == 200) {
        showToast("🎉 Hooray!", res.data.detail, "success");
        return res.data;
      } else {
        showToast("⚠️ Error", res.data.message, "error");
        return thunkAPI.rejectWithValue(res.data.message);
      }
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return;
      }
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

//------------------ Get All Strategies API ---------------//
export const getAllStrategiesApi = createAsyncThunk(
  "getAllStrategies",
  async (params = {}, thunkAPI) => {
    try {
      const accessToken = Cookies.get("accessToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        params,
      };
      const response = await axios.get(
        `${tradeURL}/api/strategy/all-strategy/`,
        config
      );
      if (response.status === 200) {
        showToast("🎉 Hooray!", "Strategies fetched successfully", "success");
        return response.data;
      } else {
        showToast("⚠️ Error", response.data.message, "error");
        return thunkAPI.rejectWithValue(response.data.message);
      }
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return;
      }
      showToast("⚠️ Error", error.message, "error");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//------------------ Start Strategy API ---------------//
export const startStrategyApi = createAsyncThunk(
  "startStrategyApi",
  async (body, thunkAPI) => {
    try {
      const accessToken = Cookies.get("accessToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const res = await axios.post(
        `${tradeURL}/api/strategy/start-strategy/`,
        body,
        config
      );
      if (res.data.success === true) {
        showToast("🎉 Hooray!", res.data.message, "success");
        return res.data;
      } else {
        showToast("⚠️ Error", res.data.message, "error");
        return thunkAPI.rejectWithValue(res.data.message);
      }
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return;
      }
      showToast("⚠️ Error", error.message, "error");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//------------------ Get Strategies Dropdown API ---------------//
export const getStrategiesDropdownApi = createAsyncThunk(
  "getStrategiesDropdown",
  async (params = {}, thunkAPI) => {
    try {
      const accessToken = Cookies.get("accessToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        params,
      };
      const response = await axios.get(
        `${tradeURL}/api/strategy/strategies-dropdown/`,
        config
      );
      if (response.status === 200) {
        showToast("🎉 Hooray!", "Dropdown strategies fetched successfully", "success");
        return response.data;
      } else {
        showToast("⚠️ Error", response.data.message, "error");
        return thunkAPI.rejectWithValue(response.data.message);
      }
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return;
      }
      showToast("⚠️ Error", error.message, "error");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//------------------ Create Subscription API ---------------//
export const createSubscription = createAsyncThunk(
  "createSubscription",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(`${tradeURL}api/subscription/create`, payload, { headers: headerconfig.headers });
      if (response.status === 200 || response.status === 201) {
        showToast("🎉 Hooray!", "Subscription created successfully", "success");
        return response.data;
      } else {
        showToast("⚠️ Error", response.data.message || "Failed to create subscription", "error");
        return thunkAPI.rejectWithValue(response.data.message);
      }
    } catch (error) {
      showToast("⚠️ Error", error.message, "error");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


