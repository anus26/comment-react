import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCookie } from '../utils/index.jsx'; // Create this utility function



const ProtectedRoute = ({ children }) => {


  const token = getCookie('accessToken'); // Retrieve token from cookies
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
