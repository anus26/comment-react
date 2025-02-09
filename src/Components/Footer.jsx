import React, { useState } from 'react'
import { FaLinkedin } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const Footer = () => {
const navigate=useNavigate()
const [hover,setHover]=useState(false)
const pages=['post','login']
  return (
<div className='Footer'>
<footer className="footer footer-center bg-base-200 text-base-content rounded p-10">
  <nav className="grid grid-flow-col gap-4"  >
    {
        pages.map((page)=>{
            return(
               <button key={page} onClick={()=>navigate(`/${page}`)} className='link link-hover text-lg'>
                {page.charAt(0).toUpperCase()+page.slice(1)}
                </button>
            )
        })
    }
  </nav>
  <nav>
    <div className="grid grid-flow-col gap-4" >
        <div className='relative flex items-center justify-center w-16 h-16' onMouseEnter={()=>(true) } onMouseLeave={()=>(false)}>
            <div className='absolute w-16 h-16 rounded-full border-4 border-blue-500 transition-all duration-300 ${
              hover ?  "scale-125 opacity-100": "scale-0 opacity-0"
            }'>
      <a href="https://www.linkedin.com/in/anus-raza-553b682b7/">
      <FaLinkedin size={40}target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 transition duration-200" />
      </a>
      </div>
      </div>
   
    </div>
  </nav>
  <aside>
    <p>Copyright © {new Date().getFullYear()} - Simple Bloging App</p>
  </aside>
</footer>
</div>
  )
}

export default Footer