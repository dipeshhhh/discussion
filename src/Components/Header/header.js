import React, { useState } from 'react';
import './css/header.css';
import logo from '../images/logo.png';
import InboxIcon from '@mui/icons-material/Inbox';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  const [showIcons, setShowIcons] = useState(false);

  const handlePageChange = () => {
    setShowIcons(true);
  };

  return (
    <header>
      <div className='header-container'>
        <div className='header-left'>
          <Link to="/" onClick={handlePageChange}>
            <img src={logo} alt="" />
          </Link>
          <h3>          </h3>
        </div>
        <div className='header-center'>
          <h1 className='header-title'>Discussion Forum</h1>
          <h2 className='header-title2'>ICAR (Indian Council Of Agricultural Research)</h2>
        </div>
        <div className='header-right'>
          {showIcons && (
            <div className='header-right-container'>
              <Avatar />
              <InboxIcon />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;