import { CartItem } from "../store/cart/types";
import { PizzaItem } from "../store/pizza/types";

export const persistedState = {
  getCartItems: () => {
    const data = localStorage.getItem("cart");
    const items = data ? JSON.parse(data) : [];

    return items as CartItem[];
  },
  setCartItems: (items: PizzaItem[]) => {
    localStorage.setItem("cart", JSON.stringify(items));
  },
};
