import React, { useState, useEffect, useReducer } from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';
import './PasswordSettings.css';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import validator from 'validator'
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
const email = Cookies.get('auth')?.split(',')[0] || '';

function ChangePasswordSettings() {  

  const navigate = useNavigate()   
/********************Current Password Checking*********************/ 
  let password;
  const [errorMessage, setErrorMessage] = useState('')
  const [errorpmessage, setErrorPmessage] = useState('')  
  const [loading, setLoading] = useState(false);  
  const [pblock, setPblock] = useState(false)

  const handCurrent = async (e)=>{
    password = e.target.value

    console.log(password)
    try{
      const resp = await axios.post('/Signin', {
          email,
          password
      }).then((resp)=>{
          const UserName = [resp.data.userExist.email,resp.data.userExist.name]        
         if(UserName)
         {          
          setErrorMessage('Password is Correct')
          setPblock(true)
         }
      })
      }
      catch(err) {
          // setError(err.response.data.err)
          setPblock(false)
          setErrorMessage(err.response.data.err)
          setLoading(false);
      }  
  }
/****************************************************************/

const [user, setUSer] = useState({
  npassword:'',cpassword:''
})
let name, value 
const handleInput = (e)=>{ 
  name =e.target.name
  value =e.target.value
  setUSer({...user, [name]:value})}


  const handleSubmit = async (event)=> {
    const {npassword, cpassword} = user

    setLoading(true)
    event.preventDefault();
    if(!npassword || !cpassword)  
    {
      setErrorPmessage("Please Enter the New password and Confirm Password");
        setLoading(false);
    }
    else if(!validator.isStrongPassword(npassword||cpassword, { 
      minLength: 8, minLowercase: 1, 
      minUppercase: 1, minNumbers: 1, minSymbols: 1 
    }))
    {
      setErrorPmessage("Password must have combination of uppercase letters, lowercase letters, numbers, and symbols.");
        setLoading(false);
    }
    else if(npassword!=cpassword)
    {
      setErrorPmessage('New Password and Confirm Password should be same')
      setLoading(false);
    }
    else{
      setErrorPmessage('')
      if(window.confirm('Please confirm to change Current Password'))
      {

        try{
          const resp =await axios.post('/ChangePassword',
          {
              email,
              npassword
              
          }).then((resp)=>{
              toast.success('Password successfully changed')
              navigate('/')
              setLoading(false)
          })
      }
      catch(err)
      {
          toast.error(err.response.data.err)
          setLoading(false);
      }
        

      }
      else
      {
        setLoading(false);
      }
    }
  }

  return (
    <div className='us-main-section'>
      <div className='us-main-section-title'>
        Change password
      </div>

      <div className='us-main-section-body'>
        <form className='change-password-form'>

          <div className='cp-input-section'>
            <label className='cp-input-label' for='us-cp-input-1' >Current password</label>
            <input className='cp-input' disabled={pblock} autoComplete='off' id='us-cp-input-1' type='password' placeholder='Enter your Current Password' onChange={(e)=>handCurrent(e)} />
            {pblock == true ? <span style={{fontWeight: 'bold',color: 'Green', 
              }}>{errorMessage}</span> 
              : 
                    <span style={{ 
                        fontWeight: 'bold', 
                        color: 'red', 
                    }}>{errorMessage}</span>} 
          </div>

          {
            pblock==true &&
            <>
             <div className='cp-input-section'>
            <label className='cp-input-label' for='us-cp-input-2'>New password</label>
            <input className='cp-input' id='us-cp-input-2'
             type='password'
             name='npassword'
             value={user.npassword}
             onChange={handleInput}
            />
            <PasswordStrengthBar   className='cp-input' password={user.npassword} />         
          </div>

          <div className='cp-input-section'>
            <label className='cp-input-label' for='us-cp-input-3'>Confirm new password</label>
            <input className='cp-input' id='us-cp-input-3'
            type='password'
            name='cpassword'
            value={user.cpassword}
            onChange={handleInput}
            />
          <PasswordStrengthBar className='cp-input' password={user.cpassword} />           
          </div>

          <div className='cp-submit-section'>
            <div className='cp-error-message'>       
            </div>
            <button className='cp-submit-button' type='submit' onClick={handleSubmit}>Change password</button>
            { errorpmessage !== "" &&
                    <span style={{ 
                        fontWeight: 'bold', 
                        color: 'red', 
                    }}>{errorpmessage}</span>} 
          </div>
            </>

          }
         

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