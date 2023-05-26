import React, { useEffect } from 'react';
import './css/header.css';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'


const Header = () => {
  const navigate = useNavigate()
 
  const auth = sessionStorage.getItem('username')
  console.log(auth.name)
  const logout = () => {
        sessionStorage.clear('username')
        navigate('/auth')
  }   



   return (
    <header>
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
                <h4>User Name</h4>
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