import React, {useState, useEffect} from 'react'
import './css/index.css'
import Sidebar from './sidebar'
import Main from './main'
import axios from 'axios'


const Index = () => {

  let [questions, setQuestions] = useState([])
  const auth = sessionStorage.getItem('username')
  useEffect(()=>{
    async function getQuestion()
    {
      await axios.get(`/Question/${auth}`).then((res)=>{
        
        // console.log(res.data)
        setQuestions(res.data)
      }).catch((err)=>{
        console.log(err)
      })
    }
    getQuestion()
  },[])

  const [group, setGroup] = useState('')

  useEffect(()=>{
    async function getGroup()
    {
      await axios.get(`/group/${auth}`).then((res)=>{        
         
          setGroup(res.data)
        
      }).catch((err)=>{
        console.log(err)
      })
    }
    getGroup()
  },[])  
  
  return (
    <div className='stack-index'>

        <div className='stack-index-content'>
            <Sidebar group={group}/>
            <Main questions= {questions} />
        </div>
    </div>
  )
}

export default Index