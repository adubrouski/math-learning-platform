import React from 'react';

import { Header, Menu } from '../index';
import { ToastContainer } from 'react-toastify';

const Layout = ({ children }) => {
  return (
    <div className="wrapper">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
      <div className="container">
        <Header />
        <div className="content-wrapper">
          <Menu />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
