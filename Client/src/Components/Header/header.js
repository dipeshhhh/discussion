import React, { useState ,useEffect } from 'react';
import './css/header.css';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

import { ToastContainer ,toast} from 'react-toastify';


const Header = () => {
  const navigate = useNavigate()
 
  const auth = sessionStorage.getItem('username')
  

  let userData =''
  
  if(auth)
  {
     userData = auth.split(',')

     window.addEventListener('beforeunload', function (e) {
     e.preventDefault();
     e.returnValue = '';
     });
  }

  const logout = () => {


       const singout = new Promise (async(res,rej)=>{
     
       const out = await axios.post('/SignOut',{userData})
       res(out)
       })
       singout.then((out)=>{           
        sessionStorage.clear('username')       
        toast.success('Logout Sucessfully')
        navigate('/auth')
       })

    
  }   
  
 

   return (

    
    <header>
      <ToastContainer
            position='top-center'
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

       <div className='header-container'>
          <div className='header-left'>      
            
          <Link to="/" >
            <img src={logo} alt="" />
          </Link>
          <h3>          </h3>
        </div>
        <div className='header-center'>
          <h1 className='header-title'><font style={{color:'#006633'}}>Discussion Forum</font></h1>
          <h2 className='header-title2'><font style={{color:'#006633'}}>ICAR (Indian Council Of Agricultural Research)</font></h2>
        </div>


        {
          auth ? 
              <div className='header-right'>
               
                     <h4>{userData[1].toUpperCase()}</h4>
                     {/* <h4>User Name</h4> */}
               
                <div className='header-right-container'>
                  <p href="#" onClick={logout} >
                    <i class="fa-solid fa-right-from-bracket"></i>  Log out
                  </p>
                </div>

              </div> 
              :
              <p></p>
            
        }
      </div>
    </header>
  );
}

export default Header;