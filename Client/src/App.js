import React from 'react';
import Header from './Components/Header/header'
import Index from './Components/sidebar/index'
import Question from './Components/Ask-Question/question'
import Comment from './Components/Ask-Question/comment';
import Comments from './Components/View-Question/comments'
import GroupQuestion from './Components/Group-Question/index'
import ViewQuestion from './Components/View-Question/index'
import Auth from './Components/Signin/index'
import './App.css';
import Errorpage from './Components/Error/errorpage';
import {Routes, Route, Redirect} from 'react-router-dom'
import PrivateComponent from './Components/PrivateComponent';

function App() {   

  return (    
  <>

   <div className='App'>
   <Header/>
   
    <Routes>
      <Route element={<PrivateComponent/>}>
      <Route exact path='/index' element={<Index/>}></Route>
      <Route exact path='/add-question' element={<Question/>}></Route>
      <Route exact path='/view-question' element={<ViewQuestion/>}></Route>
      <Route exact path='/comment' element={<Comment/>}></Route>
      <Route exact path='/group-question' element={<GroupQuestion/>}></Route>
      <Route exact path='*' element={<Errorpage/>}></Route>
      <Route exact path='/comments' element={<Comments/>}></Route>
      </Route>
          
     <Route exact path='/auth' element={<Auth/>}></Route>
  
    </Routes>
    </div>
  
   </>
  );
}

export default App;
