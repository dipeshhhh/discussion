import React from 'react'
import './css/AllQuestions.css'
import { NavLink } from 'react-router-dom'
import { Avatar } from '@mui/material';
const AllQuestions = () => {
  return (
    <div className='all-questions'> 
    <div className='all-questions-container'>
      <div className='all-questions-left'>
        <div className='all-options'>
          <div className='all-option'>
            <p>0</p>
            <span>Votes</span>
          </div>
          <div className='all-option'>
            <p>1</p>
            <span>Comments</span>
          </div>
          <div className='all-option'>
            <p>0</p>
            <small>Views</small>
          </div>
        </div>
      </div>
      <div className='question-answer'>
          <NavLink>
            This is question Title
          </NavLink>
        <div style={{width:"90%"}}>
          <div>This is Question body</div>
        </div>
        <div className='author'>
        <small>TimeStamp</small>
        <div className='author-details'>
          <Avatar/>
          <p>User Name</p>
        </div>
      </div>
      </div>
      
    </div>
    </div>
  )
}

export default AllQuestions