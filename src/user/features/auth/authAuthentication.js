import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendUrl =
  "http://13.127.232.213:8000";
  // "https://862e-2409-40c4-3030-1662-59b2-ecfe-c96d-d41.ngrok-free.app";


//------------------ Mobile Authentication API---------------//
export const mobileAuthentication = createAsyncThunk(
  "auth/mobileauthentication",
  async (body, thunkAPI) => {
    try {
     const res = await axios
        .post(`${backendUrl}/request-otp/`, body)
        if(res.data){

        }
    } catch (error) {
      console.log("error :", error);
    }
  }
);

//-----------------------Signup API-------------------------//
export const signupAPI = createAsyncThunk('auth/signup',
  async (body, thunkAPI) => {
    try{
      const config = {
        headers: {
          "Content-Type": 'application/json'
        }
      }
      const res = await axios.post(`${backendUrl}/signup/`,body, config)
      console.log("res111: ", res);

      if (res.data) {
        console.log("res** :", res.data);
        return res.data;
      } else {
        console.log("dataapi:");
        return thunkAPI.rejectWithValue(res.data);
      }
    } catch(error){
        console.log("err :", error);
        throw error
    } 
  }
)

//--------------------------Login API-----------------------//
export const loginAPI = createAsyncThunk(
  "user/SignInUser",
  async (body, thunkAPI) => {
    try {
      const response = await axios.post(`${backendUrl}/login/`, body, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        console.log("***", response.data.success, response.data);
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);