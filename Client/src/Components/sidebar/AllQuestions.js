import React from 'react'
import './css/AllQuestions.css'
import { NavLink } from 'react-router-dom'
import { Avatar } from '@mui/material';
import parse from 'html-react-parser'
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react'
import axios from 'axios';



const AllQuestions = ({question}) => {

 

 

  let result = (question.result).map((resp)=>{
      return resp
  })

  function truncate(str, n)
  {
    return str.length > n ? str.substr(0, n-1)+ '...': str
  }

  

  
  
  const auth = sessionStorage.getItem('username')
  const [userdetail , setUserDetail] = useState('')  

  useEffect(()=>{
    async function getUser()
    {
      await axios.get(`/user-detail/${auth}`).then((res)=>{
        
      //  console.log(res.data) 
      setUserDetail(res.data)
      }).catch((err)=>{
        console.log(err)
      })
    }
    getUser()
  },[]) 
 
  var status
  if(userdetail.status===2)
  {
    status = userdetail.status
  }  
  
  const handeDelete = async (e)=>{
  
    if(window.confirm('Please enter to confirm'))
    {
      
        axios.get(`/deletepost/${e}`).then((resp)=>{                  
        window.location.reload(false)        
        }) 
    }    
  }
   
  
    

  return (

    
    
    <div className='all-questions'> 
   {
    result.map((data)=>
     
    <div className='all-questions-container'>
      <div className='all-questions-left'>
        <div className='all-options'>
          
          {/* <div className='all-option'>
            <p>1</p>
            <span>Reply</span>
          </div> */}
          {/* <div className='all-option'>
            <p>0</p>
            <small>Views</small>
          </div> */}
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
        {
          status?
          <DeleteIcon  className='react-button' onClick={(e)=>{handeDelete(data._id)}}/>
          :
          <p></p>
        }
        
        
      
        
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