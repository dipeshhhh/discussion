import React from 'react';
import './PasswordSettings.css';

function ChangePasswordSettings() {
  function handleSubmit(event) {
    event.preventDefault();
  }
  
  return (
      <div className='us-main-section'>
        <div className='us-main-section-title'>
          Change password
        </div>
        
        <div className='us-main-section-body'>
          <form className='change-password-form'>

            <div className='cp-input-section'>
              <label className='cp-input-label' for='us-cp-input-1'>Current password</label>
              <input className='cp-input' id='us-cp-input-1' type='password' />
            </div>

            <div className='cp-input-section'>
              <label className='cp-input-label' for='us-cp-input-2'>New password</label>
              <input className='cp-input' id='us-cp-input-2' type='password' />
            </div>

            <div className='cp-input-section'>
              <label className='cp-input-label' for='us-cp-input-3'>Confirm new password</label>
              <input className='cp-input' id='us-cp-input-3' type='password' />
            </div>

            <div className='cp-submit-section'>
              <div className='cp-error-message'>This is an error</div>
              <button className='cp-submit-button' type='submit' onClick={handleSubmit}>Change Password</button>
            </div>

          </form>
        </div>

      </div>
  )
}

function PasswordSettings() {
  return(
    <div className='user-settings-main'>
      <ChangePasswordSettings />
    </div>
  ) 
}

export default PasswordSettings;