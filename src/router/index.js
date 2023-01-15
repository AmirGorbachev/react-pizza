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
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Cart />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
