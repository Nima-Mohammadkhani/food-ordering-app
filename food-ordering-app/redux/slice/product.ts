import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import mockProducts from "@/mock/mockProduct";
import { Product, CartItem, ProductState, Order } from "@/type";

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
        const newItem: CartItem = {
          ...action.payload,
          quantity: 1,
        } as CartItem;
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
    clearCart: (state) => {
      state.productCartList = [];
    },
    createOrderFromCart: (
      state,
      action: PayloadAction<{ discountPercent?: number } | undefined>
    ) => {
      const discountPercent = action?.payload?.discountPercent ?? 0;
      const cartItems = state.productCartList.filter(
        (it) => it.status !== "delivering"
      );
      if (cartItems.length === 0) {
        return;
      }
      const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const discountAmount = +(subtotal * (discountPercent / 100)).toFixed(2);
      const total = +(subtotal - discountAmount).toFixed(2);
      const order: Order = {
        items: cartItems.map((it) => ({ ...it, status: "delivering" })),
        subtotal,
        discountPercent,
        discountAmount,
        total,
        status: "delivering",
        createdAt: Date.now(),
      };
      state.activeOrder = order;
      state.productCartList = state.productCartList.map((it) => {
        const paid = cartItems.find((c) => c.id === it.id);
        return paid ? { ...it, status: "delivering" } : it;
      });
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  createOrderFromCart,
} = product.actions;

export default product.reducer;
