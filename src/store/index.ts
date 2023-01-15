import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import cartReduser from "./slices/cartSlice";
import pizzaReduser from "./slices/pizzaSlice";

const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReduser,
    pizza: pizzaReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
