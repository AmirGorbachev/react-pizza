import { CartItem } from "../store/cart/types";

export const persistedState = {
  getCartItems: () => {
    const data = localStorage.getItem("cart");
    const items = data ? JSON.parse(data) : [];

    return items as CartItem[];
  },
  setCartItems: (items: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(items));
  },
};
