import React from 'react'
import './css/header.css'
import logo from  '../images/logo.png'
import MarkEmail from '@mui/icons-material/MarkEmailUnread';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';
const header = () => {
  return (
    <header>
      <div className='header-container'>
        <div className='header-left'>
          <img src={logo} alt="" />
          <h3>ICAR Discussions</h3>
        </div>
        <div className='header-centre'>
          <div className='header-search-container'>
          <SearchIcon/>
          <input type="text" placeholder='Search message'/>
          </div>
        </div>
        <div className='header-right'>
          <div className='header-right-container'>
          
           <MarkEmail/>
           <Avatar/>
     
          </div>
        </div>
      </div>
    </header>
  )
}

export default header