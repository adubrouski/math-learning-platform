import React from 'react';

import { Header, Menu } from '../../components/index';
import { ToastContainer } from 'react-toastify';

const Layout = ({ children }) => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
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
    </>
  );
};

export default Layout;
