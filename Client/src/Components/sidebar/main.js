import React from 'react'
import { NavLink } from 'react-router-dom'
import FilterListIcon from '@mui/icons-material/FilterList';

import AllQuestions from './AllQuestions';
import './css/main.css'


const main = ({questions}) => {
 
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
        {/* <div className='questions'>
          {questions.map((_q,index)=> (<>
          <div key= {index} className='question'>
            
            <AllQuestions question={_q}/>
          
        
              
            
             </div>
             </> ))}
        </div> */}

        <div className='questions'>
         
          <div className='question'>
            
            <AllQuestions question={questions}/>            
            
             </div>
           
        </div>
        
      </div>
    </div>
  )
}

export default main