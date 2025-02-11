import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Search, Bell } from "lucide-react"; 
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showInput, setShowInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  
  const pages = ["login", "register", "post", "logout"];

  const handleSearch = () => {
    const matchPage = pages.find((page) =>
      page.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (matchPage) {
      navigate(`/${matchPage}`);
    } else {
      alert("No matching page found!"); 
    }
  };

  return (
    <>
      <nav className="bg-base-200 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          
          <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <a
            className={`text-xl font-bold cursor-pointer ${
              location.pathname === "/" ? "text-blue-600" : "text-gray-900"
            }`}
            onClick={() => navigate("/")}
          >
            Simple Blogging App
          </a>

       
          <div className="flex items-center space-x-4">
         
            {showInput && (
              <div className="flex items-center border rounded-lg px-2">
                <input
                  type="text"
                  className="input input-bordered border-none outline-none w-40"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-primary ml-2" onClick={handleSearch}>
                  Go
                </button>
              </div>
            )}

          
            <button className="text-gray-700" onClick={() => setShowInput(!showInput)}>
              <Search size={22} />
            </button>
           

            <button className="text-gray-700 relative">
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                2
              </span>
            </button>
          </div>
        </div>
        

        
        {isOpen && (
          <div className="md:hidden bg-base-100 p-4 space-y-3">
            {pages.map((page) => (
              <a
                key={page}
                className={`block text-lg capitalize ${
                  location.pathname === `/${page}` ? "text-blue-600 font-bold" : "text-gray-900"
                }`}
                onClick={() => {
                  navigate(`/${page}`);
                  setIsOpen(false); 
                }}
              >
                {page}
              </a>
            ))}
          </div>
        )}
        

      
        <div className="hidden md:flex justify-center space-x-6 text-gray-900 p-3">
          {pages.map((page) => (
            <a
              key={page}
              className={`cursor-pointer text-lg capitalize ${
                location.pathname === `/${page}` ? "text-blue-600 font-bold" : "text-gray-900"
              }`}
              onClick={() => navigate(`/${page}`)}
            >
              {page}
            </a>
          ))}
        </div>
        
      </nav>
    </>
  );
};

export default Navbar;
