import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth";
import productReducer from "./slice/product";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
});
