import React from 'react';
import Header from './Components/Header/header'
import Index from './Components/sidebar/index'
import Question from './Components/Ask-Question/question'
import ViewQuestion from './Components/View-Question/index'
import Auth from './Components/Signin/index'
import './App.css';
import Errorpage from './Components/Error/errorpage';
import {Routes, Route, Redirect} from 'react-router-dom'



function App() {
   
  

  return (
  <>
   <div className='App'>
   <Header/>
    <Routes>
     <Route exact path='/' element={<Index/>}></Route>
     <Route exact path='/add-question' element={<Question/>}></Route>
     <Route exact path='/view-question' element={<ViewQuestion/>}></Route>
     <Route exact path='/auth' element={<Auth/>}></Route>
     <Route exact path='*' element={<Errorpage/>}></Route>
    </Routes> 
    </div>
  
   </>
  );
}

export default App;
