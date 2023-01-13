import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";

const AppLayout: React.FC = () => {
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
