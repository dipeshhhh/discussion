import React from 'react';
import SubjectQuestion from "./Components/main/SubjectQuestion";
import ManageQuestions from "./Components/main/ManageQuestions";
import ManageAnswers from "./Components/main/ManageAnswers";
import ManageReplies from "./Components/main/ManageReplies";
import Header from './Components/Header/header';
import Signin from './Components/Signin/Signin'
import Errorpage from './Components/Error/errorpage';
import {Routes, Route, Redirect, BrowserRouter as Router} from 'react-router-dom';
import PrivateComponent from './Components/PrivateComponent';


function App() {
  return (
    <div className="app" style={{display: 'flex', flexDirection: 'column'}}>
      <Router>
        <Header />
        <Routes>
        <Route element={<PrivateComponent/>}>
          <Route exact path='/' element={<SubjectQuestion/>}></Route>
          <Route exact path='/subject-questions' element={<SubjectQuestion/>}></Route>              
          <Route exact path='/manage-questions' element={<ManageQuestions/>}></Route>        
          <Route exact path='/manage-answers' element={<ManageAnswers/>}></Route>        
          <Route exact path='/manage-replies' element={<ManageReplies/>}></Route>        
          <Route exact path='*' element={<Errorpage/>}></Route>
          </Route>
          <Route exact path='/Signin' element={<Signin/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
