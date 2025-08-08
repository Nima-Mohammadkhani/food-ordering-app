import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth";
import productReducer from "./slice/product";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
