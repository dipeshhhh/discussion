import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AllQuestions from './AllQuestions';
import axios from 'axios';
import './css/main.css';

import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


const main = ({ questions, status, currentUserEmail }) => {
  const allQuestions = [...questions]
  const [isSmdVisible, setSmdVisibility] = useState(false);
  const [isDivisionVisible, setDivisionVisibility] = useState(false);
  const [selectedSmd, setSelectedSmd] = useState('All');
  const [selectedDivisionOption, setSelectedDivisionOption] = useState('All');
  const [selectedQuestions, setSelectedQuestions] = useState(null);

  const [smds, setSmds] = useState('')
  const [divisionOptions, setDivisionOptions] = useState([]);

  useEffect(() => {
    async function getDivisionOptions() {
      axios.get(`/user-detail/${currentUserEmail}`)
        .then(userDetails => {
          axios.get(`/get-division/${currentUserEmail}`)
            .then(resp => {
              if (userDetails.data.status == 3) {
                setSmds(resp);
              }
              else {
                const tempDivisionOptions = ['All']
                resp.data.forEach(division => {
                  tempDivisionOptions.push(division.name);
                })
                setDivisionOptions(tempDivisionOptions);
              }
            })
            .catch(err => console.error(err))
        })
        .catch(err => console.error(err))
    }
    getDivisionOptions();
  }, []);
  useEffect(() => {
    setSelectedDivisionOption(divisionOptions[0])
    if (selectedSmd.toLowerCase() == 'all') {
      setSelectedQuestions(allQuestions)
    }
  }, [selectedSmd]);
  useEffect(() => {
    async function getSelectedQuestions() {
      if (selectedDivisionOption.toLowerCase() == 'all') {
        setSelectedQuestions(allQuestions)
      }
      else {
        axios.get(`selected-questions-division/${encodeURIComponent(selectedDivisionOption)}/${currentUserEmail}`)
          .then(resp => {
            setSelectedQuestions(resp.data);
          })
      }
    }
    getSelectedQuestions();
  }, [selectedDivisionOption]);

  function handleDivisionOptions(divisions) {
    setDivisionOptions(divisions);
  }
  function toggleSmdVisibility() {
    setSmdVisibility(!isSmdVisible);
  }
  function toggleDivisionVisibility() {
    setDivisionVisibility(!isDivisionVisible);
  }
  function handleSelectedSmd(smd) {
    setSelectedSmd(smd);
  }
  function handleSelectedDivisionOption(division) {
    setSelectedDivisionOption(division);
  }

  return (
    <div className='main'>
      <div className='main-container'>

        <div className='main-top'>
          <div className='main-top-one'>
            <h2>All Questions</h2>

            {((status === 1) || (status === 2)) &&
              <NavLink to="/add-question">
                <button>New Question</button>
              </NavLink>
            }
          </div>
          <div className='main-top-two'>
            <div className="options-container-box">
              {(status === 3) &&
                <div className="option-selector">
                  <div className="option-selector-title">
                    -SMD:
                  </div>
                  <div className="selected-option" onClick={() => {
                    toggleSmdVisibility();
                    setDivisionVisibility(false);
                  }}>
                    <span>{selectedSmd}</span>
                    {isSmdVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </div>
                  <div className={isSmdVisible ? "options-container active" : "options-container"}>
                    {/* SUGGESTION: Add 'All' option as well to select all types of SMDs and Division */}
                    {smds.data?.map((smd) => {
                      return (
                        <span
                          key={smd._id}
                          className="option"
                          onClick={() => {
                            handleSelectedSmd(smd.name);
                            handleDivisionOptions(['All', ...smd.division]);
                            // handleSelectedDivisionOption('');
                            setSmdVisibility(false);
                          }}
                        >
                          {smd.name}
                        </span>
                      )
                    })}
                  </div>
                </div>
              }
              <div className="option-selector">
                <div className="option-selector-title">
                  Subject:
                </div>
                <div className="selected-option" onClick={() => {
                  toggleDivisionVisibility();
                  setSmdVisibility(false);
                }}>
                  <span>{selectedDivisionOption}</span>
                  {isDivisionVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </div>
                <div className={isDivisionVisible ? "options-container active" : "options-container"}>
                  {
                    divisionOptions.map((divisionOption) => {
                      return (
                        <span
                          key={divisionOption}
                          className="option"
                          onClick={() => {
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
          </div>
        </div>


        <div className='questions'>

          <div className='question'>

            {selectedQuestions ? <AllQuestions question={selectedQuestions} currentUserEmail={currentUserEmail} /> : 'Loading...'}

          </div>

        </div>

      </div>
    </div>
  )
}

export default main