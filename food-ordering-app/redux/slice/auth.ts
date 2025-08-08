import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthState, AuthUser } from "@/type";

const initialState: AuthState = {
  user: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
      AsyncStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      AsyncStorage.removeItem("user");
    },
    loadUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<AuthUser>>) => {
      if (!state.user) {
        state.user = action.payload as AuthUser;
      } else {
        state.user = { ...state.user, ...action.payload } as AuthUser;
      }
      AsyncStorage.setItem("user", JSON.stringify(state.user));
    },
  },
});

export const { login, logout, loadUser, updateUser } = authSlice.actions;

export default authSlice.reducer;
