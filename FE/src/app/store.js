import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { apiURL } from "../Context/constant";
import { AuthApi } from "./AuthApi";

const rootReducer = {};
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthApi.middleware),
});
export default store;
