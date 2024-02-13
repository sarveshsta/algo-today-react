import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendUrl =
  "https://aee2-2409-40c4-14-5f22-b084-4c0a-5f48-b84c.ngrok-free.app";

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
