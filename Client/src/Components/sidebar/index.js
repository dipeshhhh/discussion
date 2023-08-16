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

  useEffect(() => {
    async function getQuestion() {
      await axios.get(`/subject_question/${auth}`)
        .then(res => setQuestions(res.data))
        .catch(err => console.log(err));
    }
    getQuestion()
  }, [])

  return (
    <div className='stack-index'>
      <div className='stack-index-content'>
        <Sidebar />
        <Main questions={questions} />
      </div>
    </div>
  )
}

export default Index