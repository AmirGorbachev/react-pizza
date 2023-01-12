import React from "react";
import { useSelector } from "react-redux";

import { selectCart } from "../store/slices/cartSlice";
import CartItems from "../components/CartItems";
import Empty from "../components/CartItems/Empty";

function Cart() {
  const { totalItems } = useSelector(selectCart);

  return <>{totalItems > 0 ? <CartItems /> : <Empty />}</>;
}

export default Cart;
