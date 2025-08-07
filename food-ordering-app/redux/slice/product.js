import { createSlice } from "@reduxjs/toolkit";
import mockProducts from "@/mock/mockProduct";
const product = createSlice({
  name: "product",
  initialState: {
    productList: mockProducts,
    productCartList: [],
  },
  reducers: {
    addItemToCart: (state, action) => {
      state.productCartList = [...state.productCartList, action.payload];
    },
    removeItemFromCart: (state, action) => {
      state.productCartList = state.productCartList.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addItemToCart, removeItemFromCart } = product.actions;

export default product.reducer;
