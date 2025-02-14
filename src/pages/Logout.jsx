import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Logout = () => {
const navigate=useNavigate()

const handlelogout = async (event) => {
    event.preventDefault();
  
    try {
      await fetch('https://comment-eta-bay.vercel.app/api/v1/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
      });
  
      console.log('Cookies deleted. User logged out.');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  return (
 <>
 <div>
    <h1>Logout</h1>
    <button onClick={handlelogout} className='btn btn-danger'>Logout</button>
 </div>
 </>
  )
}

export default Logout