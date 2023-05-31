import React, {useState} from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // quill css 
import './question.css'
const Question = () => {

  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  const [post_question, setQuestion] = useState({
    title:'',content:'',document:''
    })

    let name, value 
    const handlequestion = (e)=>{
       
        name =e.target.name
        value =e.target.value

        setQuestion({...post_question, [name]:value})
    }

    const add_question = async(e) => {
      e.preventDefault()
      console.log(post_question)
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
            <input type="text" name='title' 
             value={post_question.title}
             onChange={handlequestion}
            placeholder='Add the question title' />
          </div>
        </div>
          <div className='question-option'>
          <div className='body'>
            <h3>Body</h3>
            <small>Include all the information someone would need to answer your question</small>
             <ReactQuill className='react-quill' name='content'
            value={post_question.content}
            onChange={handlequestion}
             theme='snow'/>
          </div>
        </div>

        <div className='question-option'>
          <div className='attachment'>
            <h3>Attach file if any(only PDF with 5 MB)</h3>
            <input label="File upload" type="file" name='document' 
              value={post_question.document}
              onChange={handlequestion}
            placeholder="Select file..." />
          </div>
        </div>
        </div>
      </div>
      <button className='button' onClick={add_question}>Add Your Question</button>
      </div>

    </div>
  )
}

export default Question