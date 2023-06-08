import React, {useState, useEffect} from 'react'
import './index.css'
import Sidebar from '../sidebar/sidebar'
import Main from './mainquestion'
import axios from 'axios'
const Index = () => {

   return (
    <div className='stack-index'>
        <div className='stack-index-content'>
            <Sidebar/>
            <Main/>
        </div>
    </div>
  )
}

export default Index