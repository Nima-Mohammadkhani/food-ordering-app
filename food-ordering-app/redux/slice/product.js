import { createSlice } from "@reduxjs/toolkit";
import mockProducts from "@/mock/mockProduct";
const product = createSlice({
  name: "product",
  initialState: {
    productList: mockProducts,
  },
  reducers: {},
});

export const { login, logout, loadUser } = product.actions;

export default product.reducer;
