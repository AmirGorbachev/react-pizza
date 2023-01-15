import { RouterProvider } from "react-router-dom";

import "./styles/app.scss";
import router from "./router";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
