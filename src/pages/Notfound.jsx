import React from 'react';

const Notfound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-red-600">404</h1>
      <p className="text-xl">Page Not Found</p>
      <a href="/" className="btn btn-primary mt-4">
        Go Back Home
      </a>
    </div>
  );
};

export default Notfound;
