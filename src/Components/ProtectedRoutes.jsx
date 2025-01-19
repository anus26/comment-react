import React from "react";
import { Navigate } from "react-router-dom";



export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

export const storeTokenInLocalStorage = (token) => {
  localStorage.setItem('accessToken', token);
};

export const retrieveTokenFromLocalStorage = () => {
  return localStorage.getItem('accessToken');
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem('accessToken');
};

const ProtectedRoute = ({ children }) => {
  const token = retrieveTokenFromLocalStorage(); // Check local storage for token

  if (!token) {
    console.log("No access token found, redirecting to login.");
    return <Navigate to="/login" />; // Redirect to login if no token
  }

  console.log("Access token found, rendering child component.");
  return children; // Render protected component if token exists
};

export default ProtectedRoute;

