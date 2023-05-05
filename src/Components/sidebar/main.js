import React from 'react'
import { NavLink } from 'react-router-dom'
import FilterListIcon from '@mui/icons-material/FilterList';
import AllQuestions from './AllQuestions';
import './css/main.css'
const main = () => {
  return (
    <div className='main'>
      <div className='main-container'>
      <div className='main-top'>
        <h2>All Questions</h2>
        <NavLink>
          <button>New Question</button>
          </NavLink>
        </div>
        <div className='main-dec'>
          <p>All Questions</p>
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
        <div className='question'>
              <AllQuestions/>
            </div>
        </div>
        
      </div>
    </div>
  )
}

export default main