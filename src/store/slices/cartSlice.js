import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalItems += 1;
      state.totalPrice += action.payload.price;
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.totalItems -= action.payload.count;
      state.totalPrice -= action.payload.count * action.payload.price;
    },
    incCount: (state, action) => {
      state.items.find((item) => item.id === action.payload.id).count += 1;
      state.totalItems += 1;
      state.totalPrice += action.payload.price;
    },
    decCount: (state, action) => {
      const itemCart = state.items.find(
        (item) => item.id === action.payload.id
      );

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
    clearItems: (state, action) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state) => state.cart;

export const { addItem, removeItem, incCount, decCount, clearItems } =
  cartSlice.actions;

export default cartSlice.reducer;
