import React, {useState,useEffect} from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // quill css 
import './question.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'

const Question = () => {

  const navigate = useNavigate()

  const auth = sessionStorage.getItem('username')
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');  
  const [title, setTitle] =useState('')
  const [group,setGroup] = useState('')
  const [groupid,setGroupid] = useState('')
  const [body, setBody] = useState('')
  const [file,setFile] = useState('')
  const handleQuill = (value) => {
      setBody(value)
    }

  useEffect(()=>{
      async function getGroup()
      {
        await axios.get(`/group/${auth}`).then((res)=>{
           
          
        setGroupid(res)
      
        }).catch((err)=>{
          console.log(err)
        })
      }
      getGroup()
    },[])     
   

   const handleFileChange = (event) => {
       
        setFile(event.target.files[0])      
     
    };  

    const add_question = async(e) => {
      
    e.preventDefault() 
    setLoading(true)

    const data = new FormData()

    data.append('file', file)
    data.append('title',title)
    data.append('body',body)
    data.append('auth',auth)
    data.append('group',group)
     
    if(!title || !body || !group)
      {       
        setError("Something missing");
        setLoading(false);
      }      
      else if (title.length > 250)
      {
      console.log('missing')
      setError("Title Character should be about 200 Characters");
      setLoading(false);
      }
      else if(body.length >1500)
      {
        setError("Body Character should be about 1500 Characters");
      setLoading(false);
      }
    
      else if (!file)
      {      
        setError("Please attach the file");

        setLoading(false);
      }
      else if(file.type.split('/').pop()!='pdf')
        {

          setError("Please upload file in pdf format");
          setLoading(false);
          
        }
        else if (file.size/1024 > 5120) 
        {          
          setError("Please Upload file less than 5MB");
          setLoading(false);
        }        
     
      else
      {   
        if(window.confirm('Please confirm for Post'))
        {

          try {
            axios.post("/Question",data).then(res => {
  
                  console.log(res)
                  toast.success('Post uploaded sucessfully')
                  navigate('/')
                  setLoading(false)
  
                })
          }
          catch (err) {
            console.log(err)
            setLoading(false);
          }
          
        }
        else 
        {
          setLoading(false);
        } 
    
      }
    } 


  return (

    
    <div className='add-question'>
      <div className='add-question-container'>
      <div className='head-title'>
        <h1>Ask a Question</h1>
      </div>
      <div className='question-container'>
        <div className='question-options'>
         <div className='question-option'>
          <div className='title'>
            <h3>Title</h3>
            <small>Be specific and imagine you're asking a question to Group Member</small>
            <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)}
             
            placeholder='Add the question title' />
          </div>
        </div>
          <div className='question-option'>
          <div className='body'>
            <h3>Body</h3>
            <small>Include all the information someone would need to answer your question</small>
             <ReactQuill value={body} onChange={handleQuill} className='react-quill'theme='snow'/>
             </div>
        </div>
        <div className='question-option'>
          <div className='group'>
            <h3>Groups</h3>
            <small>Please Select the group</small>
            <select value={group} onChange={(e)=>setGroup(e.target.value)}>
            <option value=''>--Select Group--</option>
            {
                groupid.data?.map((resp)=>
                <option value={resp._id}>{resp.name}</option>
                )
            }                       
          
            </select>          
             
          
          </div>
        </div>


        <div className='question-option'>
          <div className='attachment'>
            <h3>Attach file (only PDF with 5 MB)</h3>
            <input label="File upload" type="file" name='file' onChange={handleFileChange}
              placeholder="Select file..." />
          </div>
        </div>
        {error !== "" && (
      <p style={{ color: "red", fontSize: "14px"}} >
          {error}
      </p>
      )}    
        </div>
      </div>
      <button className='button' onClick={add_question}>
      {loading ? "Posting..." : "Post"}     
        </button>  
      </div>
        {/* {error !== "" && (
      <p style={{ color: "red", fontSize: "14px"}} >
          {error}
      </p>
      )}     */}
    </div>
  )
}

export default Question