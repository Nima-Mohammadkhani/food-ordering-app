import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      AsyncStorage.setItem("user", JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.user = null;
      AsyncStorage.removeItem("user")
    },
    loadUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, loadUser } = authSlice.actions;

export default authSlice.reducer;
