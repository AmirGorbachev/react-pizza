import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";

const Home = React.lazy(() =>
  import(/* webpackChunkName: "Home" */ "../pages/Home")
);
const Cart = React.lazy(() =>
  import(/* webpackChunkName: "Cart" */ "../pages/Cart")
);
const NotFound = React.lazy(() =>
  import(/* webpackChunkName: "NotFound" */ "../pages/NotFound")
);

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AppLayout />
      </Suspense>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
