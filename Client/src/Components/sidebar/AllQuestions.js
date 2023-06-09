import React from 'react'
import './css/AllQuestions.css'
import { NavLink } from 'react-router-dom'
import { Avatar } from '@mui/material';
import parse from 'html-react-parser'

const AllQuestions = ({question}) => {

  let result = (question.result).map((resp)=>{
      return resp
  })

  function truncate(str, n)
  {
    return str.length > n ? str.substr(0, n-1)+ '...': str
  }

  
    
  
    

  return (

    
    
    <div className='all-questions'> 
   {
    result.map((data)=>
     
    <div className='all-questions-container'>
      <div className='all-questions-left'>
        <div className='all-options'>
          
          <div className='all-option'>
            <p>1</p>
            <span>Reply</span>
          </div>
          <div className='all-option'>
            <p>0</p>
            <small>Views</small>
          </div>
        </div>
      </div>
        
     
      <div className='question-answer'>
          <NavLink to={`/view-question?id=${data._id}`}>
           {data?.title}
            
          </NavLink>
        <div style={{width:"90%"}}>
          <div>{parse(truncate(data.body, 200))}</div>
        </div>
        <div className='author'>
        <small>{new Date(data?.created_at).toLocaleString()}</small>
        <div className='author-details'>
          <Avatar/>
          <p>{String(data?.auth).split('@')[0]}</p>
        </div>
      </div>
      </div>
     
    
    </div>
    )
}
    </div>
  )
}

export default AllQuestions