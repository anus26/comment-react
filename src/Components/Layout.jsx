import React from 'react';
import ResponsiveAppBar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

import { Toaster } from "react-hot-toast";
const Layout = () => {
  return (
    <>
<Toaster/>
      <ResponsiveAppBar />
      <Outlet />
      <Footer/>
    </>
  );
};

export default Layout;
