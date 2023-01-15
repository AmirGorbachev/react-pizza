import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { Header } from "../components";
import { selectCart } from "../store/cart/selectors";
import { fillItems } from "../store/cart/slice";
import { persistedState } from "../utils/persistedState";

const AppLayout: React.FC = () => {
  const dispatch = useDispatch();
  const { items, totalItems } = useSelector(selectCart);
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    const cartItems = persistedState.getCartItems();

    dispatch(fillItems(cartItems));
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      persistedState.setCartItems(items);
      // const cartItems = persistedState.getCartItems();

      // console.log(items);
      // console.log(cartItems[0]?.count);
    }

    isMounted.current = true;
  }, [items, totalItems]);

  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
