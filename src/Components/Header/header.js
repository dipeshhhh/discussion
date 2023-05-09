import React from 'react'
import './css/header.css'
import logo from  '../images/logo.png'
import InboxIcon from '@mui/icons-material/Inbox';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
const header = () => {
  return (
    <header>
      <div className='header-container'>
        <div className='header-left'>
        <Link to="/">
          <img src={logo} alt="" />
          </Link>
          <h3>ICAR Discussions</h3>
                 
        </div>
        <div className='header-centre'>
          
        </div>
        <div className='header-right'>
          <div className='header-right-container'>
           <Avatar/>
           <InboxIcon/>
          </div>
        </div>
      </div>
    </header>
  )
}

export default header