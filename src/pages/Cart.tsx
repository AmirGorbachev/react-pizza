import React from "react";
import { useSelector } from "react-redux";

import CartItems from "../components/CartList";
import Empty from "../components/CartList/Empty";
import { selectCart } from "../store/cart/selectors";

const Cart: React.FC = () => {
  const { totalItems } = useSelector(selectCart);

  return <>{totalItems > 0 ? <CartItems /> : <Empty />}</>;
};

export default Cart;
