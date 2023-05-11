import React from 'react';
import Header from './Components/Header/header'
import Index from './Components/sidebar/index'
import Question from './Components/Ask-Question/question'
import ViewQuestion from './Components/View-Question/index'
import Auth from './Components/Signin'
import './App.css';
import {Routes, Route, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { selectUser } from './features/userSlice';

function App() {
  const user = useSelector(selectUser)
  // const dispatch = useDispatch()

  return (
  <>
   <div className='App'>
   <Header/>
    <Routes>
     <Route exact path='/' element={<Index/>}></Route>
     <Route exact path='/add-question' element={<Question/>}></Route>
     <Route exact path='/view-question' element={<ViewQuestion/>}></Route>
     <Route exact path='/auth' element={<Auth/>}></Route>
    </Routes> 
    </div>
  
   </>
  );
}

export default App;
