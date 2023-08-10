import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie';


const PrivateComponent = () => {
            
   const auth = Cookies.get('auth')

  return auth?<Outlet/>: <Navigate to='/Signin'/>
  
}

export default PrivateComponent