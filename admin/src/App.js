import React from 'react';
import AuthenticateUsers from "./Components/main/AuthenticateUsers";
import ManageUsers from "./Components/main/ManageUsers";
import ManageQuestions from "./Components/main/ManageQuestions";
import ManageAnswers from "./Components/main/ManageAnswers";
import ManageReplies from "./Components/main/ManageReplies";
import Header from './Components/Header/header';
import Errorpage from './Components/Error/errorpage';
import {Routes, Route, Redirect, BrowserRouter as Router} from 'react-router-dom';


function App() {
  return (
    <div className="app" style={{display: 'flex', flexDirection: 'column'}}>
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<AuthenticateUsers/>}></Route>
          <Route exact path='/admin/authenticate-users' element={<AuthenticateUsers/>}></Route>        
          <Route exact path='/admin/manage-users' element={<ManageUsers/>}></Route>        
          <Route exact path='/admin/manage-questions' element={<ManageQuestions/>}></Route>        
          <Route exact path='/admin/manage-answers' element={<ManageAnswers/>}></Route>        
          <Route exact path='/admin/manage-replies' element={<ManageReplies/>}></Route>        
          <Route exact path='*' element={<Errorpage/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
