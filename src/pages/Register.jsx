import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';

const Register = () => {
  const email = useRef();
  const password = useRef();
  const name = useRef();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate=useNavigate()

  const Submit = async (event) => {
    
    event.preventDefault();

    const formData = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("https://comment-eta-bay.vercel.app/api/v1/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json();
        toast.error(errData.error || 'Registration failed');
      }

      const data = await response.json();
      toast.success('Registration successful!');
      navigate('/login')
      console.log('Register successful:', data);
     
    } catch (err) {
      setError(err.message);
      toast.error('something error registran')
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
            <label className="input input-bordered m-4 flex gap-8">
              <input type="text" className="grow" placeholder="Name" ref={name} />
            </label>
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
   
        </div>
      </div>
    </>
  );
};

export default Register;
