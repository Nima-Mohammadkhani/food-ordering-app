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
      const existingItem = state.productCartList.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.productCartList.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },
    removeItemFromCart: (state, action) => {
      state.productCartList = state.productCartList.filter(
        (item) => item.id !== action.payload
      );
    },
    incrementQuantity: (state, action) => {
      const item = state.productCartList.find(
        (item) => item.id === action.payload
      );
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.productCartList.find(
        (item) => item.id === action.payload
      );
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.productCartList = state.productCartList.filter(
            (item) => item.id !== action.payload
          );
        }
      }
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  incrementQuantity,
  decrementQuantity,
} = product.actions;

export default product.reducer;
