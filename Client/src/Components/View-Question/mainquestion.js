import React from 'react'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import HistoryIcon from '@mui/icons-material/History'
import { Avatar } from '@mui/material'
import {NavLink} from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // quill css 




import './index.css'

const Mainquestion = (details) => {

  
  
  
  
  
 
  
  return (
    <div className='main'>
      
      <div className='main-container'>
        <div className='main-top'>
          <h2 className='main-question'>This is question title</h2>
            <NavLink to='/add-question'>
              <button>Ask Question</button>
            </NavLink>
              </div>
              <div className='main-desc'>
                <div className='info'>
                  <p>Timestamp</p>
                  <p>Active <span>today</span></p>
                  <p>Viewed <span>43 times</span></p>
                </div>
              </div>
          <div className='all-questions'>
            <div className='all-questions-container'>
              <div className='all-questions-left'>
                <div className='all-options'>
                <p className="arrow">▲</p>

                <p className="arrow">0</p>

                <p className="arrow">▼</p>

                <BookmarkIcon />

                <HistoryIcon />
                </div>
              </div>
              <div className='question-answer'>
                <p>This is quetion body</p>
                <div className='author'>
                  <small>Asked "Timestamp"</small>
                  <div className='auth-details'>
                  <Avatar/>
                  <p>Author Name</p> 
                  </div>
                </div>
                <div className='comments'>
                    <div className='comment'>
                      <p>These are comment which put by group members
                        <span>User Name</span>
                        <small>Timestamp</small>
                      </p>
                    </div>
                    
                </div>
              </div>
            </div>
          </div>
          <div className='all-questions'>
            <p>Number of Comments</p> 
            <div className='all-questions-container'>
            <div className='all-questions-left'>
                <div className='all-options'>
                <p className="arrow">▲</p>

                <p className="arrow">0</p>

                <p className="arrow">▼</p>

                <BookmarkIcon />

                <HistoryIcon />
                </div>
              </div>
            
              <div className='question-anser'>
             dsfsdfsdfsdfsdfsdfsdfsdfsd
                <div className='author'>
                  <small>asked "Timestamp"</small>
                  <div className='auth-details'>
                  <Avatar/>
                  <p>Author Name</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='main-answer'>
        <h3>Your Answer</h3>
        <ReactQuill theme="snow" className='react-quill'  style={{height
        :"200px"}}/> 
      </div>
      <button style={{
          marginTop: "100px",
          maxWidth: "fit-content",
        }}>Post your Comment</button>
      </div>
  )
}

export default Mainquestion