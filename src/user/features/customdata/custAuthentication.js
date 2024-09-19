import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const tradeURL = "http://ec2-65-0-101-156.ap-south-1.compute.amazonaws.com:8000";
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
      console.log("res : ", res);
      if(res.data.success === true){
        alert(res.data.message)
        toast.success(res.data.message)
        return res.data;
      }else {
        toast.error(res.data.message)
        return thunkAPI.rejectWithValue(res.data.message);
      }
    } catch (error) {
      // console.log("getStrategy** =>", error);
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
      );
      if (response.status == 200) {
        return response.data;
      } else {
        return response;
      }
    } catch (error) {
      // console.log("error-trade :: ", error);
      return error;
    }
  }
);
