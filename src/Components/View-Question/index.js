import React from 'react'
import './index.css'
import Sidebar from '../sidebar/sidebar'
import Main from './mainquestion'
const index = () => {
  return (
    <div className='stack-index'>
        <div className='stack-index-content'>
            <Sidebar/>
            <Main/>
        </div>
    </div>
  )
}

export default index