import React, { useState, useEffect } from 'react'
import './css/index.css'
import Sidebar from './sidebar'
import Main from './main'
import axios from 'axios'
import Cookies from 'js-cookie';


const Index = () => {
  // ============================================== //
  // Suggestion: put the code below in another file 
  // and then import it here, so other files using 
  // this same code can import it as well. 
  // This will improve reusability.
  // ================ This Code ================== //
  const userData = Cookies.get('auth');
  let auth;
  if (userData) {
    const data = userData.split(',');
    auth = data[0];
  }
  // ============================================== //

  let [questions, setQuestions] = useState([]);
  let [status, setStatus] = useState('')

  useEffect(() => {

    let userDetails = new Promise (async(resolve,reject)=>{
      const response =  await axios.get(`/main_G/${auth}`)
      resolve(response.data)
    })
    userDetails.then(
      async function(value)
      {       
      
      if(value.status ===1)
      {
        const M_Data = await axios.get('/subject_question',{params:{id_1:value.Divisionid,id_2:auth}})        
        
        setQuestions(M_Data.data)
        setStatus(value.status)
      }
      else if (value.status === 2)
      {
              const M_Data = await axios.get('/subject_question_smd',{params:{id_1:value.Smdid}})  
       
              setQuestions(M_Data.data)
              setStatus(value.status)
      }
      else
      {
        const M_Data = await axios.get('/all_question')  
       
              setQuestions(M_Data.data)
              setStatus(value.status)
      }    
     

      },
      function(error)
      {
        console.log(error)
      }
    )
  }, [])

  return (
    <div className='stack-index'>
      <div className='stack-index-content'>
        <Sidebar />
        <Main questions={questions} status={status} />
      </div>
    </div>
  )
}

export default Index