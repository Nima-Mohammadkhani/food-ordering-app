import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth";
import productReducer from "./slice/product";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";

const productPersistConfig = {
  key: "product",
  storage: AsyncStorage,
  whitelist: ["productCartList", "activeOrder"],
};

const persistedProductReducer = persistReducer(productPersistConfig, productReducer);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: persistedProductReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
