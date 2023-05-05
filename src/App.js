import React from 'react';
import Header from './Components/Header/header'
import Index from './Components/sidebar/index'
import './App.css';
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
   <>
   <div className='App'>
   <Header/>
    <Routes>
     <Route exact path='/' element={<Index/>}></Route>
    </Routes> 
    </div>
  
   </>
  );
}

export default App;
