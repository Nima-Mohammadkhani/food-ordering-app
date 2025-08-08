import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import mockProducts from "@/mock/mockProduct";
import { Product, CartItem, ProductState } from "@/type";

const initialState: ProductState = {
  productList: mockProducts as unknown as Product[],
  productCartList: [],
};

const product = createSlice({
  name: "product",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.productCartList.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const newItem: CartItem = { ...action.payload, quantity: 1 } as CartItem;
        state.productCartList.push(newItem);
      }
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      state.productCartList = state.productCartList.filter(
        (item) => item.id !== action.payload
      );
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.productCartList.find(
        (item) => item.id === action.payload
      );
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
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
