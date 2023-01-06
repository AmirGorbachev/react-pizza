import { Outlet } from "react-router-dom";

import Header from "./Header";

function AppLayout() {
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
}

export default AppLayout;
