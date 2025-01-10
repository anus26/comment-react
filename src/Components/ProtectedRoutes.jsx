import React from "react";
import { Navigate } from "react-router-dom";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const ProtectedRoute = ({ children }) => {
  const token = getCookie("accessToken"); // Fetch the access token from cookies

  if (!token) {
    console.log("No access token found, redirecting to login.");
    return <Navigate to="/login" />;
  }

  console.log("Access token found, rendering child component.");
  return children; // Render the child component if the token exists
};

export default ProtectedRoute;

