import React from 'react'
import { NavLink } from 'react-router-dom'
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import AllQuestions from './AllQuestions';
import './css/main.css'


const main = ({questions,status}) => { 
 
  return (
    <div className='main'>
      <div className='main-container'>
        {
          status === 1 ?
          <>
           <div className='main-top'>
        <h2>All Questions</h2>
        <NavLink to="/add-question">
          <button>New Question</button>
          </NavLink>
        </div>

          </>
          :
          status === 2 ?
          <>
           <div className='main-top'>
        <h2>All Questions</h2>
        <NavLink to="/add-question">
          <button>New Question</button>
          </NavLink>
        </div>
          </>
          :
          <>
           <div className='main-top'>
        <h2>All Questions</h2>
        <NavLink>
          
          </NavLink>
        </div>
          </>
          
        }       
       

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
