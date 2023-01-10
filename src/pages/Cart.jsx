import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { clearItems } from "../store/slices/cartSlice";
import CartItems from "../components/CartItems";
import Empty from "../components/CartItems/Empty";

function Cart() {
  const dispatch = useDispatch();
  const totalItems = useSelector((state) => state.cart.totalItems);

  const onClickClear = () => {
    dispatch(clearItems());
  };

  return <>{totalItems > 0 ? <CartItems /> : <Empty />}</>;
}

export default Cart;
