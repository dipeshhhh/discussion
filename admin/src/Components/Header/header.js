import React from 'react';
import './header.css';
import logo from './logo.png';
import { Link } from 'react-router-dom';

const Header = () => {   
  return (    
    <header>
      <div className='header-container'>
        <div className='header-left'>
          <Link to="/" >
            <img src={logo} alt="" />
          </Link>
          <h3>       </h3>
        </div>
        <div className='header-center'>
          <h1 className='header-title'><font style={{color:'#006633'}}>Discussion Forum</font></h1>
          <h2 className='header-title2'><font style={{color:'#006633'}}>ICAR (Indian Council Of Agricultural Research)</font></h2>
        </div>
        <div className='header-right'>
          <font style={{color:'#006633'}}>Admin</font>
        </div>
      </div>
    </header>
  );
}

export default Header;