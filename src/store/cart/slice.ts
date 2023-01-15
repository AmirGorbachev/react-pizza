import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartSliceState } from "./types";

const initialState: CartSliceState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    fillItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.totalItems = action.payload.reduce(
        (acc, item) => acc + item.count,
        0
      );
      state.totalPrice = action.payload.reduce(
        (acc, item) => acc + item.price * item.count,
        0
      );
    },
    addItem: (state, action: PayloadAction<CartItem>) => {
      const itemCart = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (itemCart) {
        itemCart.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalItems += 1;
      state.totalPrice += action.payload.price;
    },
    removeItem: (state, action: PayloadAction<CartItem>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.totalItems -= action.payload.count;
      state.totalPrice -= action.payload.count * action.payload.price;
    },
    incCount: (state, action: PayloadAction<CartItem>) => {
      const itemCart = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (!itemCart) {
        return;
      }

      itemCart.count += 1;
      state.totalItems += 1;
      state.totalPrice += action.payload.price;
    },
    decCount: (state, action: PayloadAction<CartItem>) => {
      const itemCart = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (!itemCart) {
        return;
      }

      if (itemCart.count === 1) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        itemCart.count -= 1;
      }

      state.totalItems -= 1;
      state.totalPrice -= action.payload.price;
    },
    clearItems: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  fillItems,
  addItem,
  removeItem,
  incCount,
  decCount,
  clearItems,
} = cartSlice.actions;

export default cartSlice.reducer;
