import { createBrowserRouter } from "react-router-dom";

import AppLayout from "../components/AppLayout";

import Home from "../pages/Home";
import Cart from "../pages/Cart";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
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
