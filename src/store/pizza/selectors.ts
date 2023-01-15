import { RootState } from "..";

export const selectPizza = (state: RootState) => state.pizza;
export const selectPizzaByID = (id: number | string) => (state: RootState) =>
  state.cart.items.find((item) => item.id === id);
