import axios from "axios";
import butterup from "butteruptoasts";
import { showToast } from "../../../utility";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// const tradeURL = "https://cf44-2405-201-302a-d836-39ab-e05c-f606-1bba.ngrok-free.app";
const tradeURL = process.env.REACT_APP_BACKEND_URL;

// Always get the latest token
const getHeaderConfig = () => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Cookies.get("accessToken")}`,
  },
});

//------------------ Banknifty Index data API---------------//
export const indexExpiryDataApi = createAsyncThunk(
  "bankniftyExpiry",
  async (index, thunkAPI) => {
    try {
      const response = await axios.get(
        `${tradeURL}/token/${index}/`,
        getHeaderConfig(),
      );
      if (response.status == 200) {
        showToast("🎉 Hooray!", response.data.message, "success");
        return response;
      } else {
        return response;
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return;
      }
      return error;
    }
  },
);

//------------------ Banknifty expiry data API---------------//
export const indexStrikePriceDataApi = createAsyncThunk(
  "bankniftyStrikePrice",
  async ({ index, expiry }) => {
    try {
      const response = await axios.get(
        `${tradeURL}/token/${index}/${expiry}/`,
        getHeaderConfig(),
      );
      if (response.status == 200) {
        showToast("🎉 Hooray!", response.data.message, "success");
        return response;
      } else {
        return response;
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return;
      }
      return error;
    }
  },
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
      };

      const res = await axios.post(`${tradeURL}/start/`, body, config);
      if (res.data.success === true) {
        showToast("🎉 Hooray!", res.data.message, "success");
        return res.data;
      } else {
        showToast("⚠️ Error", res.data.message, "error");
        return thunkAPI.rejectWithValue(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return;
      }
      showToast("⚠️ Error", error.response.data.message, "error");
      return error;
    }
  },
);

//------------------ Trade History API---------------//
export const tradeHistoryApi = createAsyncThunk(
  "tradeHistoryApi",
  async (body, thunkAPI, index) => {
    try {
      const response = await axios.get(
        `${tradeURL}/trade-details/`,
        getHeaderConfig(),
      );
      if (response.status == 200) {
        showToast(
          "🎉 Hooray!",
          "Trade History Retrieved Successfully",
          "success",
        );
        return response.data;
      } else {
        showToast("⚠️ Error", response.data.message, "error");
        return response;
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return;
      }
      showToast("⚠️ Error", error.response.data.message, "error");
      return error;
    }
  },
);

//---------Stop - Strategy API Data ----------------------//
export const stopStrategy = createAsyncThunk(
  "stopStrategy-Data",
  async (strategy_id, thunkAPI) => {
    try {
      const res = await axios.post(
        `${tradeURL}/api/strategy/stop-strategy/${strategy_id}`,
        {}, // No body, so pass an empty object
        getHeaderConfig(),
      );

      if (res.status == 200) {
        showToast("🎉 Hooray!", res.data.detail, "success");
        return res.data;
      } else {
        showToast("⚠️ Error", res.data.message, "error");
        return thunkAPI.rejectWithValue(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return;
      }
      showToast("⚠️ Error", error.response.data.message, "error");
      return error;
    }
  },
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
      if (error.response && error.response.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return;
      }
      showToast("⚠️ Error", error.response.data.message, "error");
      return error;
    }
  },
);

//---------Live API Data ----------------------//
export const getStrategyLiveData = createAsyncThunk(
  "getStrategy-Data",
  async (body, thunkAPI) => {
    try {
      const res = await axios.post(
        `${tradeURL}/strategy/live_strategy_data/`,
        body,
        getHeaderConfig(),
      );
      if (res.data.success === true) {
        showToast("🎉 Hooray!", res.data.message, "success");
        return res.data;
      } else {
        showToast("⚠️ Error", res.data.message, "error");
        return thunkAPI.rejectWithValue(res.data.message);
      }
    } catch (error) {
      showToast("⚠️ Error", error.response.data.message, "error");
      return error;
    }
  },
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
        `${tradeURL}/api/strategy/all-strategy/?is_active=true`,
        config,
      );
      if (response.status === 200) {
        showToast("🎉 Hooray!", "Strategies fetched successfully", "success");
        return response.data;
      } else {
        showToast("⚠️ Error", response.data.message, "error");
        return thunkAPI.rejectWithValue(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return;
      }
      showToast("⚠️ Error", error.response.data.message, "error");
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
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
        config,
      );
      if (res.data.success === true) {
        showToast("🎉 Hooray!", res.data.message, "success");
        return res.data;
      } else {
        showToast("⚠️ Error", res.data.message, "error");
        return thunkAPI.rejectWithValue(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.href = "/login";

        return;
      }

      showToast("⚠️ Error", error.response.data.message, "error");

      return thunkAPI.rejectWithValue(error.message);
    }
  },
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
        config,
      );
      if (response.status === 200) {
        showToast(
          "🎉 Hooray!",
          "Dropdown strategies fetched successfully",
          "success",
        );
        return response.data;
      } else {
        showToast("⚠️ Error", response.data.message, "error");
        return thunkAPI.rejectWithValue(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return;
      }
      showToast("⚠️ Error", error.response.data.message, "error");
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

//------------------ Create Subscription API ---------------//
export const createSubscription = createAsyncThunk(
  "createSubscription",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        `${tradeURL}api/subscription/create`,
        payload,
        getHeaderConfig(),
      );
      if (response.status === 200 || response.status === 201) {
        showToast("🎉 Hooray!", "Subscription created successfully", "success");
        return response.data;
      } else {
        showToast(
          "⚠️ Error",
          response.data.message || "Failed to create subscription",
          "error",
        );
        return thunkAPI.rejectWithValue(response.data.message);
      }
    } catch (error) {
      showToast("⚠️ Error", error.response.data.message, "error");
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

//------------------ Get angelonestatus Dropdown API ---------------//
export const getAngeloneStatusApi = createAsyncThunk(
  "getAngeloneStatusDropdown",
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
        `${tradeURL}/user/angelone-connection/`,
        config,
      );
      if (response.status === 200) {
        showToast("🎉 Hooray!", response.data.message, "success");
        return response.data;
      } else {
        showToast("⚠️ Error", response.data.message, "error");
        return thunkAPI.rejectWithValue(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return;
      }
      showToast("⚠️ Error", error.response.data.message, "error");
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);
//------------------ Getsubsriptionstatus Dropdown API ---------------//
export const getSubscriptionStatusApi = createAsyncThunk(
  "getSubscriptionStatusDropdown",
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
        `${tradeURL}/api/subscription/check-user-subcription/`,
        config,
      );
      if (response.status === 200) {
        showToast("🎉 Hooray!", response.data.message, "success");
        return response.data;
      } else {
        showToast("⚠️ Error", response.data.message, "error");
        return thunkAPI.rejectWithValue(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return;
      }
      showToast("⚠️ Error", error.response.data.message, "error");
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const getNseIndicesApi = createAsyncThunk(
  "getNseIndicesApi",
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
      const response = await axios.get(`${tradeURL}/nse-indices/`, config);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return;
      }
      showToast("⚠️ Error", error.response.data.message, "error");
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

//------------------ Manage Trading API ---------------//
export const managetradingApi = createAsyncThunk(
  "managetradingApi",
  async (params = {}, thunkAPI) => {
    try {
      const accessToken = Cookies.get("accessToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(
        `${tradeURL}/trades/`,

        config,
      );
      if (response.status === 200 || response.status === 201) {
        showToast(
          "🎉 Hooray!",
          response.data.message || "Trade successful",
          "success",
        );
        return response.data;
      } else {
        showToast("⚠️ Error", response.data.message || "Trade failed", "error");
        return thunkAPI.rejectWithValue(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return;
      }
      showToast(
        "⚠️ Error",
        error.response?.data?.message || error.message,
        "error",
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

//------------------ Get Day Profit API ---------------//
export const getDayprofitApi = createAsyncThunk(
  "getDayprofitApi",
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
        `${tradeURL}/dayprofit/`,
        config,
      );
      if (response.status === 200) {
        showToast(
          "🎉 Hooray!",
          response.data?.message || "Day profit fetched successfully",
          "success",
        );
        return response.data;
      } else {
        showToast(
          "⚠️ Error",
          response.data?.message || "Failed to fetch day profit",
          "error",
        );
        return thunkAPI.rejectWithValue(response.data?.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return;
      }
      showToast(
        "⚠️ Error",
        error.response?.data?.message || error.message,
        "error",
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

//------------------ Fetch Running Strategies API ---------------//
export const fetchLastStretegy = createAsyncThunk(
  "fetchRunningStretegy",
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
        `${tradeURL}/api/strategy/get_strategy_payload/`,
        config,
      );
      if (response.status === 200) {
        showToast(
          "🎉 Hooray!",
          response.data?.message || "Running strategies fetched successfully",
          "success",
        );
        return response.data;
      } else {
        showToast(
          "⚠️ Error",
          response.data?.message || "Failed to fetch running strategies",
          "error",
        );
        return thunkAPI.rejectWithValue(response.data?.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return;
      }
      showToast(
        "⚠️ Error",
        error?.response?.data?.message || error.message,
        "error",
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

//------------------ Get Strategy Status API ---------------//
export const getStrategyStatusApi = createAsyncThunk(
  "getStrategyStatusApi",
  async (strategy_id, thunkAPI) => {
    try {
      const accessToken = Cookies.get("accessToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.post(
        `${tradeURL}/api/strategy/strategy-status/${strategy_id}`,
        {},
        config,
      );
      if (response.status === 200) {
        // Avoid noisy toast here; status may be polled
        return response.data;
      } else {
        showToast(
          "⚠️ Error",
          response.data?.message || "Failed to fetch strategy status",
          "error",
        );
        return thunkAPI.rejectWithValue(response.data?.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return;
      }
      showToast(
        "⚠️ Error",
        error?.response?.data?.message || error.message,
        "error",
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
