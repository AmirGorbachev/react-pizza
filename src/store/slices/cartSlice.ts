import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export type CartItem = {
  id: number | string;
  title: string;
  price: number;
  count: number;
  imageUrl: string;
  size?: number;
  type?: number;
};

interface CartSliceState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

const initialState: CartSliceState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
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

export const selectCart = (state: RootState) => state.cart;

export const { addItem, removeItem, incCount, decCount, clearItems } =
  cartSlice.actions;

export default cartSlice.reducer;
