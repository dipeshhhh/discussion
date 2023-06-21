import React, {useState, useEffect} from 'react'
import './index.css'
import Sidebar from '../sidebar/sidebar'
import Main from './mainquestion'
import axios from 'axios'
const Index = () => {

  const [questiondata, setQuestionData] = useState()


  let search = window.location.search
  const params =new URLSearchParams(search)
  const id = params.get('id')

  useEffect(()=>{
    async function getQuestionDetails()
    {
      await axios.get(`/Question-detail/${id}`).then((resp) =>{
          
        
        setQuestionData(resp.data)
      })
      .catch((err)=>{
        console.log(err)
      })

    }
    getQuestionDetails()
   
  },[])


  
 

   return (
    <div className='stack-index'>
            
               
      {
        questiondata?.map((_id,index)=>(
          <>
            <div key={index}className='stack-index-content'>
            <Sidebar/>
            <Main details={_id}/>

            </div>   
       
          </>
        ))
      }
        
          
        
            
       
            
          
       
    </div>
  )
}

export default Index