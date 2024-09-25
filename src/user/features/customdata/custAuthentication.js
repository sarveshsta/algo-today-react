import axios from "axios";
// import { toast } from "react-toastify";
import butterup from "butteruptoasts";
import { createAsyncThunk } from "@reduxjs/toolkit";

const tradeURL =
  "http://ec2-65-0-101-156.ap-south-1.compute.amazonaws.com:8000";
const tradeURL2 =
  "https://4968-2405-201-301d-f0e6-81ed-73f-d109-465.ngrok-free.app/";

const headerconfig = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

//------------------ Banknifty data API---------------//
export const getBankniftyDataApi = createAsyncThunk(
  "bankniftyindex",
  async (body, thunkAPI, index) => {
    try {
      const response = await axios.get(`${tradeURL}/tokens/${index}`);
      if (response) {
        return response;
      } else {
        return response;
      }
    } catch (error) {
      console.log("error :: ", error);
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
        `${tradeURL}/strategy/start_strategy`,
        body,
        headerconfig
      );
      if (res.data.success === true) {
        butterup.toast({
          title: "🎉 Hooray!",
          message: res.data.message,
          location: "top-right",
          icon: true,
          dismissable: true,
          type: "success",
        });
        return res.data;
      } else {
        butterup.toast({
          title: "⚠️ Error",
          message: res.data.message,
          location: "top-right",
          icon: true,
          dismissable: true,
          type: "error",
        });
        return thunkAPI.rejectWithValue(res.data.message);
      }
    } catch (error) {
      butterup.toast({
        title: "⚠️ Error",
        message: error.message,
        location: "top-right",
        icon: true,
        dismissable: true,
        type: "error",
      });
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
        `http://ec2-65-0-101-156.ap-south-1.compute.amazonaws.com:8000/tokens/trades_details/`
      );console.log("response :", response);
      
      if (response.status == 200) {
        butterup.toast({
          title: "🎉 Hooray!",
          message: "Trade History Retrieved Successfully",
          location: "top-right",
          icon: true,
          dismissable: true,
          type: "success",
        });
        return response.data;
      } else {
        butterup.toast({
          title: "⚠️ Error",
          message: response.data.message,
          location: "top-right",
          icon: true,
          dismissable: true,
          type: "error",
        });
        return response;
      }
    } catch (error) {
      butterup.toast({
        title: "⚠️ Error",
        message: error.message,
        location: "top-right",
        icon: true,
        dismissable: true,
        type: "error",
      });
      return error;
    }
  }
);

export const stopStrategy = createAsyncThunk(
  "stopStrategy-Data",
  async (strategy_id, thunkAPI) => {
    try {
      const res = await axios.get(
        `${tradeURL}/strategy/stop_strategy/${strategy_id}`,
        headerconfig
      );
      
      if (res.status == 200) {
        butterup.toast({
          title: "🎉 Hooray!",
          message: res.data.detail,
          location: "top-right",
          icon: true,
          dismissable: true,
          type: "success",
        });
        return res.data;
      } else {
        butterup.toast({
          title: "⚠️ Error",
          message: res.data.message,
          location: "top-right",
          icon: true,
          dismissable: true,
          type: "error",
        });
        return thunkAPI.rejectWithValue(res.data.message);
      }
    } catch (error) {
      butterup.toast({
        title: "⚠️ Error",
        message: error.message,
        location: "top-right",
        icon: true,
        dismissable: true,
        type: "error",
      });
      return error;
    }
  }
);
