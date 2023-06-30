import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AllQuestions from './AllQuestions';
import './css/main.css'


const main = ({questions}) => {
  
  const [isGroupHidden, setGroupHidden] = useState(true);
  const toggleGroup = () => {
      setGroupHidden(!isGroupHidden);
    }

  return (
    <div className='main'>
      <div className='main-container'>
      <div className='main-top'>
        <h2>All Questions</h2>
        <NavLink to="/add-question">
          <button>New Question</button>
          </NavLink>
        </div>
        <div className='main-dec'>

          <div className='group-selector'> {/* NOTE: go through this section of the code */}
            <div className='selected-group-icon-name' onClick={toggleGroup}>
              <div className='expand-group-icons'>
                {/* ONCLICK: add/remove 'active' in these icon's class and in 'selected-group' div's class upon clicking on 'group-selector' to show/hide the appropriate icon and the group list*/}
                <ExpandMoreIcon className={ isGroupHidden ? 'expand-group-icon active' : 'expand-group-icon'} />
                <ExpandLessIcon className={ !isGroupHidden ? 'expand-group-icon active' : 'expand-group-icon'} />

                {/* add 'active' class when new notification is there, remove 'active' class when notification is seen by the user */}
                {/* Optional: if you want to show no. of notification you can insert them in here, but you will need to change it's foreground color in css */}
                {/* <span className='badge'>0</span> */}
                <span className='badge active'>0</span>
              </div>

              <span className='selected-group'>
                {/* Name of the group that is selected (user's first group name by default) */}
                {/* 'Crop Sciences' for example */}
                Crop Sciences
              </span>
            </div>
            
            {/* ADD/REMOVE 'active' class in this div ('group-list' div) to see it */}
            <div className={ !isGroupHidden ? 'group-list active' : 'group-list'}>
            {/* <div className='group-list active'> */}
              {/* Add all the group the user is in here */}
              {/* 'Crop Sciences', 'Horticulture' and 'Animal Sciences' for example */}
              <span className='group-list-item'>Crop Sciences<span className='badge list-badge'>0</span></span>
              <span className='group-list-item'>Horticulture<span className='badge list-badge active'>0</span></span>
              <span className='group-list-item'>Animal Sciences<span className='badge list-badge active'>0</span>
              </span>
            </div>
          </div>

          <p></p>
        <div className='main-filter'>
          <div className='main-tabs'>
            <div className='main-tab'>
              <NavLink>
                Newest
              </NavLink>
            </div>
            <div className='main-tab'>
              <NavLink>
                Active
              </NavLink>
            </div>
            <div className='main-tab'>
              <NavLink>
                More
              </NavLink>
            </div>
          </div>
          <div className='main-filter-item'>
          <FilterListIcon/>
            <NavLink>
              Filter
            </NavLink>
          </div>
        </div>
        </div>
        <div className='questions'>
          {questions.map((_q,index)=> (<>
          <div key= {index} className='question'>
            
            <AllQuestions question={_q}/>
          
        
              
            
             </div>
             </> ))}
        </div>
        
      </div>
    </div>
  )
}

export default main