import React from 'react';
import './SubjectSettings.css';

function ChangeInterestedSubjects() {
  // Need smds from backend here
  const subjectOptions = [
    {
      _id: 'someidforsampleoption1',
      name: 'samplesubjectoption1',
    },
    {
      _id: 'someidforsampleoption2',
      name: 'samplesubjectoption2',
    },
    {
      _id: 'someidforsampleoption3',
      name: 'samplesubjectoption3',
    },
    {
      _id: 'someidforsampleoption4',
      name: 'samplesubjectoption4',
    },
    {
      _id: 'someidforsampleoption5',
      name: 'samplesubjectoption5',
    },
  ]

  function handleSubmit() {

  }

  return (
    <div className='us-main-section'>
      <div className='us-main-section-title'>
        Change interested subjects
      </div>
      <div className='us-main-section-body'>
        <div className='ss-input-section'>
          <label className='ss-input-label' htmlFor='ss-current-smd'>Current interested subjects</label>
          <ul className='ss-current-subjects' id='ss-current-subjects'>
            {
              subjectOptions.map(subject => (
                <li className='ss-current-subject'>{`- ${subject.name}`}</li>
              ))
            }
          </ul>
        </div>
        <div className='ss-input-section'>
          <label className='ss-input-label' htmlFor='ss-smd-options'>New interested subjects</label>
          MultipleOptionsSelectorHere where selected subjects are already selected.
        </div>
        <div className='ss-submit-section'>
          <button className='ss-submit-button' onClick={handleSubmit}>Update subjects</button>
        </div>
      </div>
    </div>
  )
}
function ChangeSMD() {
  // Need smds from backend here
  const smdOptions = [
    {
      _id: 'someidforsampleoption1',
      name: 'samplesmdoption1',
    },
    {
      _id: 'someidforsampleoption2',
      name: 'samplesmdoption2',
    },
  ]

  function handleSubmit() {

  }

  return (
    <div className='us-main-section'>
      <div className='us-main-section-title'>
        Change SMD
      </div>
      <div className='us-main-section-body'>
        <div className='ss-input-section'>
          <label className='ss-input-label' htmlFor='ss-current-smd'>Current SMD</label>
          <p className='ss-current-smd' id='ss-current-smd'>currentSmdHere</p>
        </div>
        <div className='ss-input-section'>
          <label className='ss-input-label' htmlFor='ss-smd-options'>New SMD</label>
          <select name='ss-smd-options' id='ss-smd-options'>
            {
              smdOptions.map(smd => (
                <option value={smd._id}>{smd.name}</option>
              ))
            }
          </select>
        </div>
        <div className='ss-submit-section'>
          <button className='ss-submit-button' onClick={handleSubmit}>Update SMD</button>
        </div>
      </div>
    </div>
  )
}
function ChangeInstitute() {
  // Need smds from backend here
  const instituteOptions = [
    {
      _id: 'someidforsampleoption1',
      name: 'sampleinstituteoption1',
    },
    {
      _id: 'someidforsampleoption2',
      name: 'sampleinstituteoption2',
    },
  ]

  function handleSubmit() {

  }

  return (
    <div className='us-main-section'>
      <div className='us-main-section-title'>
        Change institute
      </div>
      <div className='us-main-section-body'>
        <div className='ss-input-section'>
          <label className='ss-input-label' htmlFor='ss-current-institute'>Current institute</label>
          <p className='ss-current-institute' id='ss-current-institute'>currentInstituteHere</p>
        </div>
        <div className='ss-input-section'>
          <label className='ss-input-label' htmlFor='ss-institute-options'>New institute</label>
          <select name='ss-institute-options' id='ss-institute-options'>
            {
              instituteOptions.map(institute => (
                <option value={institute._id}>{institute.name}</option>
              ))
            }
          </select>
        </div>
        <div className='ss-submit-section'>
          <button className='ss-submit-button' onClick={handleSubmit}>Update institute</button>
        </div>
      </div>
    </div>
  )
}

function SubjectSettings() {
  return (
    <div className='user-settings-main'>
      <ChangeInterestedSubjects />

      {/* Headquaters check here */}
      <ChangeSMD />
      <ChangeInstitute />
    </div>
  )
}

export default SubjectSettings;