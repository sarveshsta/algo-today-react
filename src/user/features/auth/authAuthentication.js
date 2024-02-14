import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendUrl =
  "http://13.127.232.213:8000";

export const mobileAuthentication = createAsyncThunk(
  "auth/mobileauthentication",
  async () => {
    try {
      await axios
        .post(`${backendUrl}/request-otp/`)
        .then((data) => console.log("data :", data.data));
    } catch (error) {
      console.log("error :", error);
    }
  }
);

export const signupAPI = createAsyncThunk('auth/signup',
  async (body, thunkAPI) => {
    try{
      const config = {
        headers: {
          "Content-Type": 'application/json'
        }
      }
      const res = await axios.post(`${backendUrl}/signup/`,body, config )
      console.log("res: ", res);

      if (res.data.success) {
        console.log("res** :", res.data.success);
        return res.data;
      } else {
        console.log("dataapi :");
        return thunkAPI.rejectWithValue(res.data);
      }
    } catch(error){
        console.log("err :", error);
        throw error
    } 
  }
)