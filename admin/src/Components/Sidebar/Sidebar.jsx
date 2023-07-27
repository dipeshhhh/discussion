import React from 'react';
import { NavLink } from 'react-router-dom'
import GroupsIcon from '@mui/icons-material/Groups';
import GroupIcon from '@mui/icons-material/Group';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

import './Sidebar.css';

function Sidebar() {
  return(
    <div className="sidebar-container">
      <div classname="sidebar-options">

        <NavLink to="/admin/authenticate-users" className="sidebar-option">
          <GroupsIcon />
          <p>Authenticate Users</p>
        </NavLink>
        
        <div className="sidebar-option-category-container">
          <small className="sidebar-option-category">Manage</small>
          <NavLink to="/admin/manage-users" className="sidebar-option">
            <GroupIcon />
            <p>Users</p>
          </NavLink>
          <NavLink to="/admin/manage-questions" className="sidebar-option">
            <QuestionMarkIcon />
            <p>Questions</p>
          </NavLink>
          <NavLink to="/admin/manage-answers" className="sidebar-option">
            <QuestionAnswerIcon />
            <p>Answers</p>
          </NavLink>
          <NavLink to="/admin/manage-replies" className="sidebar-option">
            <ReplyAllIcon />
            <p>Replies</p>
          </NavLink>
        </div>
        
      </div>
    </div>
  )
}

export default Sidebar;