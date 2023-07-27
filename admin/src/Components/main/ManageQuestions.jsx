import React from "react";
import parse from 'html-react-parser';
import Sidebar from "../Sidebar/Sidebar";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { Avatar } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './css/ManageQuestionsAnswers.css';

// NEED: questions from database
const questions=[
  {
    _id: "someQuestionId",
    title: "This is a question title",
    body: "This is the question body",
    auth: "Author",
    subject: "Genetics & Plant Breeding",
    member: [],
    created_at: "2023-07-25T18:25:39.322+00:00"
  },
  {
    _id: "someQuestionId2",
    title: "This is a question title",
    body: "This is the question body",
    auth: "Author",
    subject: "Genetics & Plant Breeding",
    member: [],
    created_at: "2023-07-25T18:25:39.322+00:00"
  },
]

function Question(props){
  function handleDelete(){
    // Handle user deletion here
  }
  function handleEdit(){
    // Handle user timeout (temporary ban) here
  }
  function truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) + '...' : str;
  }
  return(
    <div className="main-question-answer-body" key={props._id}>
      <div className='question-answer'>
        <span to={`/view-question?id=${props._id}`}>{props.title}</span>
        <div style={{ width: '90%', marginBottom: '16px' }}>
          <div>{parse(truncate(props.body, 200))}</div>
        </div>
        <div className='author'>
          <small>on {new Date(props.created_at).toLocaleString().replace(/,/g, ' at ')}</small>
          <div className='author-details'>
            <Avatar className='profile-picture' />
            <p>{String(props.auth).split('@')[0]}</p>
          </div>
        </div>
      </div>
      <div className="admin-buttons-short">
        <EditIcon
          className="admin-button edit-button"
          onClick={()=>{handleEdit()}}
          onMouseEnter={(event)=>{event.target.parentElement.parentElement.style.backgroundColor = "var(--orange-peel-faded)";}}
          onMouseLeave={(event)=>{event.target.parentElement.parentElement.style.backgroundColor = "white";}}
        />
        <div className="flex-grow">
        </div>
        <DeleteIcon 
          className="admin-button reject-button"
          onClick={()=>{handleDelete()}}
          onMouseEnter={(event)=>{event.target.parentElement.parentElement.style.backgroundColor = "var(--red-crayola-bright-faded)";}}
          onMouseLeave={(event)=>{event.target.parentElement.parentElement.style.backgroundColor = "white";}}
        />
      </div>
    </div>
  )
}


function ManageQuestions() {
  return(
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <Sidebar />
      <div className="manage-question-answer-container">
        <div className="search-bar-container">
          <SearchBar placeholder="Search questions" />
        </div>
        <div className="question-answer-container">
          {questions.map((question) => {
            return(
              <Question
                key = {question._id}
                title = {question.title}
                body = {question.body}
                auth = {question.auth}
                subject = {question.subject}
                created_at = {question.created_at}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ManageQuestions;