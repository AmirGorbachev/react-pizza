import React from "react";
import { RouterProvider } from "react-router-dom";

import "./styles/app.scss";
import router from "./router/router";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
