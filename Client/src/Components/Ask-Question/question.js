import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // quill css 
import './question.css'
const question = () => {
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
            <input type="text" placeholder='Add the question title' />
          </div>
        </div>
          <div className='question-option'>
          <div className='body'>
            <h3>Body</h3>
            <small>Include all the information someone would need to answer your question</small>
             <ReactQuill className='react-quill' theme='snow'/>
          </div>
        </div>

        <div className='question-option'>
          <div className='attachment'>
            <h3>Attach file if any(only PDF with 500 KB)</h3>
            <input label="File upload" type="file" placeholder="Select file..." />
          </div>
        </div>
        </div>
      </div>
      <button className='button'>Add Your Question</button>
      </div>

    </div>
  )
}

export default question