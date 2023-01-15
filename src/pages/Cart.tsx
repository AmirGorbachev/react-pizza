import React from "react";
import { useSelector } from "react-redux";

import { selectCart } from "../store/cart/selectors";

import { Empty, CartList } from "../components";

const Cart: React.FC = () => {
  const { totalItems } = useSelector(selectCart);

  return <>{totalItems > 0 ? <CartList /> : <Empty />}</>;
};

export default Cart;
