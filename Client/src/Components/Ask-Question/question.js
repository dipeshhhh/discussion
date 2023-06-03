import React, {useState} from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // quill css 
import './question.css'
import axios from 'axios'

const Question = () => {

  const auth = sessionStorage.getItem('username')
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");  
    const [title, setTitle] =useState('')
    const [body, setBody] = useState('')
    const [file,setFile] = useState('')
    const handleQuill = (value) => {
      setBody(value)
    }

   const handleFileChange = (event) => {
       
        setFile(event.target.files[0])      
     
    };  

    const add_question = async(e) => {
      
    setLoading(true)
    e.preventDefault() 

    const data = new FormData()

    data.append('file', file)
    data.append('title',title)
    data.append('body',body)
    data.append('auth',auth)
    
    
    const fileSizeKiloBytes = file.size / 1024
    const extension = file.type.split('/').pop();
   
      if(!title || !body)
      {
          setError("Something missing");
          setLoading(false);
      }
      else if (title.length > 250)
      {
        setError("Title Character should be about 200 Characters");
        setLoading(false);
      }      
        else if(extension!='pdf')
        {
          setError("File shoud in pdf only");
          setLoading(false);
        }
        else if(fileSizeKiloBytes > 5120)
        {
          setError("File shoud be not more than 5 MB");
          setLoading(false);
        }   
     
      else
      {    
        let xyz = ``
        
        try {
          axios.post("/Question",data).then(res => {

                console.log(res)
                // alert('Post Update Successfully')
                // window.location.reload(false)
                // setLoading(false)


              })
        }
        catch (err) {
          console.log(err)
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
          <div className='attachment'>
            <h3>Attach file if any(only PDF with 5 MB)</h3>
            <input label="File upload" type="file" name='file' onChange={handleFileChange}
              placeholder="Select file..." />
          </div>
        </div>
        </div>
      </div>
      <button className='button' onClick={add_question}>
      {loading ? "Posting..." : "Post"}
        </button>
      {error !== "" && (
      <p style={{ color: "red", fontSize: "14px"}} >
          {error}
      </p>
      )}  
      </div>

    </div>
  )
}

export default Question