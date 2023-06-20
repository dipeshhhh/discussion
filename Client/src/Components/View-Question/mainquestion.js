import React, {useState} from 'react'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import HistoryIcon from '@mui/icons-material/History'
import { Avatar } from '@mui/material'
import {NavLink} from 'react-router-dom'
import parse from 'html-react-parser'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // quill css 
import AttachFileIcon from '@mui/icons-material/AttachFile';
import './index.css'
import ReplyAllIcon from '@mui/icons-material/ReplyAll';


const Mainquestion = (details) => {   

  let detail = details.details

const [enable, setEnable] = useState(true)
  // let answer = detail.result

  const reply = ()=>{
    if(enable ==true)
    {
      setEnable(false)
    }
    else if(enable == false)
    {
      setEnable(true)
    }
  }  

  
  return (
    <div className='main'>
      
      <div className='main-container'>
        <div className='main-top'>
          <h2 className='main-question'></h2>
            <NavLink to='/add-question'>
              <button>Ask Question</button>
            </NavLink>
              </div>
              <div className='main-desc'>
                <div className='info'>
                  <p>{new Date(detail?.created_at).toLocaleString()}</p>   
                 <a href={'localhost:5000/upload'+detail.file} download='file'><AttachFileIcon/></a>                
                </div>
              </div>
          <div className='all-questions'>
            <div className='all-questions-container'>
              {/* <div className='all-questions-left'>
                <div className='all-options'>
                <p className="arrow">▲</p>

                <p className="arrow">0</p>

                <p className="arrow">▼</p>

                <BookmarkIcon />

                <HistoryIcon />
                </div>
              </div> */}
              <div className='question-answer'>
                <p>{parse(detail.body)}</p>
                <div className='author'>
                  <small></small>
                  <div className='auth-details'>
                  <Avatar/>
                  <p>{String(detail?.auth).split('@')[0]}</p> 
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
        <ReplyAllIcon className='icon-reply'  onClick={()=>reply()}/>
        <div className='answer' hidden={enable}>
        <div className='main-answer'>
        <h3>You can Answer</h3>
        <ReactQuill theme="snow" className='react-quill'  style={{height
        :"200px"}}/> 
      </div>

      <div className='file-attach'>
            <h3>Attach file (only PDF with 5 MB)</h3>
            <input label="File upload" type="file" name='file' 
              placeholder="Select file..." />
          </div>          
      <button style={{
          margin: "10px 0",
          maxWidth: "fit-content",
        }}>Post your Answer</button>

        </div>
        
      </div>
  )
}

export default Mainquestion