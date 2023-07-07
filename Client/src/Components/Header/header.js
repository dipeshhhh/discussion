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
  // console.log(auth)
  const logout = () => {
        sessionStorage.clear('username')       
        toast.success('Logout Sucessfully')
        navigate('/auth')
  }   
  
  const [userdetail , setUserDetail] = useState('')

  useEffect(()=>{
    async function getUser()
    {
      await axios.get(`/user-detail/${auth}`).then((res)=>{
        
       
        setUserDetail(res.data)
      }).catch((err)=>{
        console.log(err)
      })
    }
    getUser()
  },[]) 

  // const user = userdetail[0]
  
  console.log(userdetail.name)

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
               
                     <h4>{userdetail.name}</h4>
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