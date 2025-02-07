import React from 'react';
import ResponsiveAppBar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Outlet />
      <Footer/>
    </>
  );
};

export default Layout;
