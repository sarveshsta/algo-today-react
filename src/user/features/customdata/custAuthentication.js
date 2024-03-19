import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURLL = "http://15.206.153.177:8000";

// const backendURLL = "http://13.127.232.213:8000";


const headerconfig = {
  headers: {
      Accept: "application/json",
    'Content-Type': 'application/json',
  },
};

//------------------ Banknifty data API---------------//
export const getBankniftyDataApi = createAsyncThunk(
  "bankniftyindex",
  async (body, thunkAPI) => {
    try {
      const response = await axios.get(
        `${backendURLL}/tokens/BANKNIFTY`,
        body,
        // headerconfig
      );
      if (response.data) {
        return response;
      } else {
        return response.status;
      }
    } catch (error) {
      return error
    }
  }
);


