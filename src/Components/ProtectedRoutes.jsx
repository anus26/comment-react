import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute= () => {
    const token=localStorage.getItem("accessToken")
    if (!token) {
        return <Navigate  to="/login"/>
        
    }
    return   children
  return (
    <div>PrivateRoutes</div>
  )
}

export default ProtectedRoute