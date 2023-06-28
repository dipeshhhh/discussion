import React, {useState, useEffect} from 'react'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import HistoryIcon from '@mui/icons-material/History'
import { Avatar } from '@mui/material'
import {NavLink} from 'react-router-dom'
import parse from 'html-react-parser'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // quill css 
import AttachFileIcon from '@mui/icons-material/AttachFile'
import './index.css'
import ReplyAllIcon from '@mui/icons-material/ReplyAll'
import FileDownload from 'js-file-download'
import Axios from 'axios'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'

const Mainquestion = (details) => {   

  const navigate = useNavigate()

  let detail = details.details  
  const question_id = detail._id

  /**********Comment Fetch through question id***********/
  
  const [answerdata, setAnswerData] = useState()

  useEffect(()=>{
    async function getAnswerDetails()
    {
      await Axios.get(`/Answer-detail/${question_id}`).then((resp) =>{          
             
        setAnswerData(resp.data)
      })
      .catch((err)=>{
        console.log(err)
      })

    }
    getAnswerDetails()
   
  },[]) 
  

/*******************************************************/
  const auth = sessionStorage.getItem('username')
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');  
  const [body, setBody] = useState('')
  const [file,setFile] = useState('')
  const handleQuill = (value) => {
    setBody(value)
  }


    /*************code Handle the file uploading file*******************/  
  const handleFileChange = (event) => {
    event.preventDefault()
    setLoading(true)
    
    if(event)
    {
      const files = event.target.files[0]
   
    if(files.size/1024 > 5120 || files.type.split('/').pop()!='pdf')
    {
      setError("Please upload file as per above creteria");
      setLoading(false)
    }
    else
    {
      // const reader = new FileReader()

      // reader.addEventListener('load', ()=>{
      //   localStorage.setItem('document',reader.result)
      // })

      // reader.readAsDataURL(files)      
     
      setFile(event.target.files[0])
    } } }   
    
    // const downloadfile = ()=>{
    //   FileDownload(localStorage.getItem('document'),'file.pdf')
    // }

  /***********************************************/ 
  /* Handle the answer button for Comment*/
      const answer = async (e)=>{  
      e.preventDefault()
      setLoading(true)
    
      const data = new FormData()
    
        data.append('file', file)
        data.append('body',body)
        data.append('auth',auth)
        data.append('question_id',question_id)
    
        if(!body)
        {
          setError("Please fill the Body Part");
          setLoading(false)
        }
        else {
          if (window.confirm('Please click to confirm Comment')) {
            Axios.post('/Answer', data).then((res) => {

              if (res) {
                toast.success('Comment Successfully')
                window.location.reload(false)
              }
            })

          }


        }
    
       }

    /***********************************/   
    

  //Reply button code for hide and unhide
const [enable, setEnable] = useState(true)
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

  //Here the code for download Post Attachment
  const download = (e) =>{  
   Axios({
    url:`/Q_download/${e}`,
    method:'GET',
    responseType:'blob'
   }).then((resp)=>{
      
    FileDownload(resp.data,'file.pdf')    
  })
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
                  <a onClick={(e)=>download(detail._id)}><AttachFileIcon/></a>             
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
          
          <div className="reply-button" onClick={()=>reply()}>
            {/* <ReplyAllIcon onClick={()=>reply()}/> Answer */}
            <ReplyAllIcon className='icon-reply'/> Answer
          </div>
          <div className='answer' hidden={enable}>
            <div className='main-answer'>
              <h3>You can Answer</h3>
              <ReactQuill theme="snow" value={body} onChange={handleQuill} className='react-quill'  style={{height
              :"200px"}}/> 
            </div>

            <div className='file-attach'>
              <h3>Attach file (only PDF with 5 MB)</h3>
              <input label="File upload" type="file" name='file' onChange={handleFileChange} 
                placeholder="Select file..." />
    
              {
                localStorage.getItem('img')
                ?
                <PictureAsPdfIcon/>
                :
                <></>
              }  
            
            </div>          
            <button onClick={answer} style={{
                margin: "10px 0",
                maxWidth: "fit-content",
              }}>
                {loading ? "Commenting..." : "Post Comment"}
              </button>       
              {error !== "" && (
                <p style={{ color: "red", fontSize: "14px" }} >
                  {error}
                </p>
              )} 

          </div>

          <div className='all-questions'>
            <p>Number of Comments</p>
            {
              answerdata?.map((resp)=>

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
             {parse(resp.body)}
                <div className='author'>
                  <small>on {new Date(resp?.created_at).toLocaleString().replace(/,/g, ' at ')}</small>
                  <div className='auth-details'>
                  <Avatar/>
                  <p>{String(resp?.auth).split('@')[0]}</p>
                  </div>
                </div>
              </div>
            </div>
             )
            }   
          </div>
        </div>
        {/* Previous answer icon and body position here */}        
      </div>
  )
}

export default Mainquestion