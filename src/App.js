import React from 'react';
import Header from './Components/Header/header'
import Index from './Components/sidebar/index'
import Question from './Components/Ask-Question/question'
import ViewQuestion from './Components/View-Question/index'
<<<<<<< HEAD
import Auth from './Components/Signin/index'
=======
import Auth from './Components/Signin'
>>>>>>> 9c4ce04a6b224e062810fbf01e5b591f37420535
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
