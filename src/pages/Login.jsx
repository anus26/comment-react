import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storeTokenInLocalStorage } from '../Components/ProtectedRoutes';
import toast from 'react-hot-toast';
const Login = () => {
 
  const email = useRef();
  const password = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate=useNavigate()
  
  const Submit = async (event) => {
    event.preventDefault();
  
    const formData = {
      email: email.current.value,
      password: password.current.value,
    };
  
    setLoading(true);
    setError(null);
    setSuccess(null);
  
    try {
      const response = await fetch(`https://comment-eta-bay.vercel.app/api/v1/login`, {
         method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
  
        credentials: 'include', // Include cookies in the request
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errData = await response.json();
      toast.success('login failed!')
      }
  
      const data = await response.json();
  
      // Save tokens to cookies and local storage
      document.cookie = `accessToken=${data.accessToken}; Path=/; Secure; SameSite=Strict`;
      document.cookie = `refreshToken=${data.refreshToken}; Path=/; Secure;  SameSite=None`;
  
      storeTokenInLocalStorage( data.accessToken);
      
toast.success('Successfully login!')
      navigate('/post');
    } catch (err) {
      setError(err.message);
      console.log('Error during login:', err.message);
    } finally {
      setLoading(false);
    }
  };
  
 

  return (
    <>
      <div className="flex-wrap justify-center p-10 m-14 gap-20">
        <h1>Login</h1>
        <div className="gap-20">
          
          <form onSubmit={Submit}>
           
            <label className="input input-bordered m-4 flex items-center gap-2">
              <input type="email" className="grow" placeholder="Email" ref={email} autoComplete='current-email' />
            </label>
            <label className="input input-bordered m-4 flex items-center gap-2">
              <input type="password" className="grow" placeholder="Password" ref={password}   autoComplete="current-password"  />
            </label>
            <button
              type="submit"
              className="btn btn-neutral"
              disabled={loading}>
              {loading ? 'Submitting...' : 'Register'}
            </button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {success && <p className="text-green-500 mt-4">{success}</p>}
        </div>
      </div>
    </>
  );
};

export default Login;