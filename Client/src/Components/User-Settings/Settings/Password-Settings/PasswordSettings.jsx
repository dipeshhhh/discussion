import React, { useState, useEffect, useReducer } from 'react';
import './PasswordSettings.css';
import Cookies from 'js-cookie';
const currentUserEmailFromCookies = Cookies.get('auth')?.split(',')[0] || '';

function ChangePasswordSettings() {


  
  useEffect(() => {
    const fetchUserData = async () => {
      console.log(currentUserEmailFromCookies)

      // try {
      //   setIsLoading(true);
      //   const userResponse = await axios.get(`/user-details/${currentUserEmailFromCookies}`);
      //   const currentUserResponse = await axios.get(`/user-details/${currentUserEmailFromCookies}`);
      //   setUserDetails(userResponse.data);
      //   setCurrentUserDetails(currentUserResponse.data)

      //   if(userResponse.data.Hqrs ==1)
      //   {
      //     const Smd = await axios.get(`/SmdName/${userResponse.data.Smdid}`);
      //     const Inst = await axios.get(`/InstituteName/${userResponse.data.institute}`)
      //     setSmd(Smd.data)
      //     setInstitute(Inst.data)
      //   }
      //   else if (userResponse.data.Hqrs == 2)
      //   {
      //     const Smd = await axios.get(`/SmdName/${userResponse.data.Smdid}`);
      //     setSmd(Smd.data)
      //   }
      // } catch (error) {
      //   console.error('Error fetching user data:', error);
      // } finally {
      //   setIsLoading(false);
      // }
    };
    fetchUserData();
  },[]);





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
            <button className='cp-submit-button' type='submit' onClick={handleSubmit}>Change password</button>
          </div>

        </form>
      </div>

    </div>
  )
}

function PasswordSettings() {
  return (
    <div className='user-settings-main'>
      <ChangePasswordSettings />
    </div>
  )
}

export default PasswordSettings;