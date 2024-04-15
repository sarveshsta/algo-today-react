import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import indexSlice from './features/customdata/custSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    index: indexSlice,
  },
});
