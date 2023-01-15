import React from "react";
import { useSelector } from "react-redux";

import { selectCart } from "../store/slices/cartSlice";
import CartItems from "../components/CartList";
import Empty from "../components/CartList/Empty";

const Cart: React.FC = () => {
  const { totalItems } = useSelector(selectCart);

  return <>{totalItems > 0 ? <CartItems /> : <Empty />}</>;
};

export default Cart;
