import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './user-settings.css';

import SettingsSidebar from './Sidebar/SettingsSidebar';

import Errorpage from '../Error/errorpage';
import PasswordSettings from './Settings/Password-Settings/PasswordSettings';
import SubjectSettings from './Settings/Subject-Settings/SubjectSettings';
import WorkSetting from './Settings/work-Location-Settings/work-location';

function UserSettings() {
  return (
    <div className='user-settings-main-container'>
      <SettingsSidebar />
      <Routes>
        {/* Current default setting page: password page (Change later) */}
        <Route exact path='/' element={<PasswordSettings />} />
        <Route exact path='*' element={<Errorpage />} />
        <Route exact path='/password' element={<PasswordSettings />} />
        <Route exact path='/subject' element={<SubjectSettings />} />
        <Route exact path='/work-place' element={<WorkSetting/>} />
        {/* Add more pages here */}
      </Routes>
    </div>
  )

}

export default UserSettings;