import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import cartReduser from "./slices/cartSlice";
import pizzaReduser from "./slices/pizzaSlice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReduser,
    pizza: pizzaReduser,
  },
});
