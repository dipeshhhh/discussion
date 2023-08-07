import React, { useState, useEffect } from "react";
import parse from 'html-react-parser';
import Sidebar from "../Sidebar/Sidebar";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { Avatar } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import './css/ManageQuestionsAnswers.css';
import axios from 'axios'

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
// NEED: SMDs from database
// const smds=[
//   {
//     "_id": "someId",
//     "name": "All",
//     "division": [],
//   },
//   {
//     "_id": "6487539f30cc72e9c608aaef",
//     "name": "CROP SCIENCES",
//     "division": [
//       "Genetics & Plant Breeding",
//       "Economic Botany and Plant Genetic Resources",
//       "Seed Science and Technology",
//       "Plant Pathology",
//       "Nematology",
//       "Agricultural Entomology",
//       "Plant Biochemistry",
//       "Plant Physiology",
//       "Agricultural Biotechnology",
//       "Agricultural Microsbiology"
//     ]
//   },
//   {
//     "_id": "6487539f30cc72e9c608aaf0",
//     "name": "HORTICULTURE",
//     "division": [
//       "Vegetable Science",
//       "Fruit Science",
//       "Floriculture and Landscaping",
//       "Spices, Plantation and Medicinal and Aromatic Plants"
//     ]
//   }
// ]

function Question(props){
  function handleDelete(){
    // Handle question deletion here
  }
  function handleEdit(){
    // Handle question edit here
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

const [smds, setSmds] = useState('')

      useEffect(()=>{

          axios.get('/SMD').then((resp)=>{
            setSmds(resp)
          })

      },[])

  const [isSmdVisible, setSmdVisibility] = useState(false);
  function toggleSmdVisibility() {
    setSmdVisibility(!isSmdVisible);
  }  
  const [isDivisionVisible, setDivisionVisibility] = useState(false);
  function toggleDivisionVisibility() {
    setDivisionVisibility(!isDivisionVisible);
  }
  
  const [selectedSmd, setSelectedSmd] = useState('All');
  function handleSelectSmd(smd) {
    setSelectedSmd(smd);

    console.log(selectedSmd)
  }
  const [selectedDivisionOption, setSelectedDivisionOption] = useState('-');
  function handleSelectedDivisionOption(division){
    setSelectedDivisionOption(division);

    console.log(selectedDivisionOption)
  }

  const [divisionOptions, setDivisionOptions] = useState([]);
  function handleDivisionOptions(divisions) {
    setDivisionOptions(divisions);
  }

  return(
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <Sidebar />
      <div className="manage-question-answer-container">
        <div className="search-bar-container">
          <SearchBar placeholder="Search questions" />
        </div>
        <div className="options-container-box">
          <div className="option-selector">
            <div className="option-selector-title">
              -SMD:
            </div>
            <div className="selected-option" onClick={()=>{
              toggleSmdVisibility();
              setDivisionVisibility(false);
            }}>
              <span>{selectedSmd}</span>
              {isSmdVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
            <div className={isSmdVisible ? "options-container active" : "options-container"}>
              {smds.data?.map((smd)=>{
                return(
                  <span
                    key={smd._id}
                    className="option"
                    onClick={()=>{
                      handleSelectSmd(smd.name);
                      handleDivisionOptions(smd.division);
                      handleSelectedDivisionOption('-');
                      setSmdVisibility(false);
                      }}
                  >
                    {smd.name}
                  </span>
                )
              })}
            </div>
          </div>
          <div className="option-selector">
            <div className="option-selector-title">
              -Division:
            </div>
            <div className="selected-option" onClick={()=>{
              toggleDivisionVisibility();
              setSmdVisibility(false);
            }}>
              <span>{selectedDivisionOption}</span>
              {isDivisionVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
            <div className={isDivisionVisible ? "options-container active" : "options-container"}>
              {
                divisionOptions.map((divisionOption)=>{
                  return(
                    <span
                      key={divisionOption}
                      className="option"
                      onClick={()=>{
                        handleSelectedDivisionOption(divisionOption);
                        setDivisionVisibility(false);
                      }}
                    >{divisionOption}</span>
                  )
                })
              }
            </div>
          </div>
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