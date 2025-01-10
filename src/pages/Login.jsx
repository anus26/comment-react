import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      const response = await fetch(`http://localhost:4000/api/v1/longin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: "include", // Include cookies in the request
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Registration failed');
      }

      const data = await response.json();
          // Save tokens to cookies
          document.cookie = `accessToken=${data.accessToken}; Path=/`;

          document.cookie = `refreshToken=${data.refreshToken}; Path=/; Secure; HttpOnly; SameSite=Strict;`;
          
          setSuccess('Login successful!');
          navigate('/post')
          console.log('Login successful:', data);
    
    } catch (err) {
      setError(err.message);
      console.log('Network error:', err.message);
    } finally {
      setLoading(false);
    }
   

  };
 

  return (
    <>
      <div className="flex-wrap justify-center p-10 m-14 gap-20">
        <h1>Register</h1>
        <div className="gap-20">
          
          <form onSubmit={Submit}>
           
            <label className="input input-bordered m-4 flex items-center gap-2">
              <input type="email" className="grow" placeholder="Email" ref={email} />
            </label>
            <label className="input input-bordered m-4 flex items-center gap-2">
              <input type="password" className="grow" placeholder="Password" ref={password} />
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
