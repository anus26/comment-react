// src/utils/getCookie.js
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

  
