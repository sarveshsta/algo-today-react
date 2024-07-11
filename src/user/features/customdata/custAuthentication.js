import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const tradeURL = 'http://65.0.101.156:8000'; 

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
      const response = await axios.get(
        `${tradeURL}/tokens/NIFTY`
      );
      if (response) {
        return response;
      } else {
        return response;
      }
    } catch (error) {
      console.log("error :: ",error);
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
        `${tradeURL}/strategy/start_strategy`, body,headerconfig
      );
      if (res) {
        // console.log("strategy-res:",res);
        return res.data;
      } else {
        return thunkAPI.rejectWithValue(res.data);
      }
    } catch (error) {
      // console.log("getStrategy** =>", error);
      return error;
    }
  }
);
