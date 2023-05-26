import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateComponent = () => {
  
  const auth = sessionStorage.getItem('username')
  return auth?<Outlet/>: <Navigate to='/auth'/>
   
}

export default PrivateComponent