import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Logout = () => {
const navigate=useNavigate()


    const handlelogout=async(event)=>{
        event.preventDefault()
        const response = await fetch('http://localhost:4000/api/v1/logout', {  
        method:POST,
        // include cokies
        credentials:"include",
    })
        if (response.ok) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem("user")
            navigate("/Login")
            console.log("logout successfully");
            
            
        }else{
            console.log("error");
            
        }

    }
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