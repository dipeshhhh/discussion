import React, { useState, useEffect, useReducer } from 'react';
import './PasswordSettings.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import validator from 'validator'
import { ToastContainer, toast } from 'react-toastify';
const email = Cookies.get('auth')?.split(',')[0] || '';

function ChangePasswordSettings() {  
/********************Current Password Checking*********************/ 
  let password;
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false);  
  const [pblock, setPblock] = useState(false)
  const [npblock, setNpblock] = useState(false)
  const [cpblock, setCpblock] = useState(false)

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

  setUSer({...user, [name]:value})
  Validationnpassword(user.npassword)
  Validationcpassword(user.cpassword)
}


const Validationnpassword = (value)=>{
  if (validator.isStrongPassword(value, { 
    minLength: 8, minLowercase: 1, 
    minUppercase: 1, minNumbers: 1, minSymbols: 1 
  })) { 
    setNpblock(true)
    setErrorMessage('sabchangahai')
  }  
   else { 
    setNpblock(false)
    setErrorMessage('Kuch thik hi nahi hai') 
  }
}
const Validationcpassword = (value)=>{
  if (validator.isStrongPassword(value, { 
    minLength: 8, minLowercase: 1, 
    minUppercase: 1, minNumbers: 1, minSymbols: 1 
  })) { 
    setCpblock(true)
    setErrorMessage('sabchangahai')
  }  
   else { 
    setCpblock(false)
    setErrorMessage('Kuch thik hi nahi hai') 
  }
}

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
            {npblock == true ? <span style={{fontWeight: 'bold',color: 'Green', 
              }}>{errorMessage}</span> 
              : 
                    <span style={{ 
                        fontWeight: 'bold', 
                        color: 'red', 
                    }}>{errorMessage}</span>} 
          </div>

          <div className='cp-input-section'>
            <label className='cp-input-label' for='us-cp-input-3'>Confirm new password</label>
            <input className='cp-input' id='us-cp-input-3'
            type='password'
            name='cpassword'
            value={user.cpassword}
            onChange={handleInput}
            />
            {cpblock == true ? <span style={{fontWeight: 'bold',color: 'Green', 
              }}>{errorMessage}</span> 
              : 
                    <span style={{ 
                        fontWeight: 'bold', 
                        color: 'red', 
                    }}>{errorMessage}</span>} 
          </div>

          <div className='cp-submit-section'>
            <div className='cp-error-message'>This is an error</div>
            <button className='cp-submit-button' type='submit' onClick={handleSubmit}>Change password</button>
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