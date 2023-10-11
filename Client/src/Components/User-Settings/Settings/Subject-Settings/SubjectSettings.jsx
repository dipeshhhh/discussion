import React, { useState, useEffect, useReducer } from 'react';
import Cookies from 'js-cookie';
import './SubjectSettings.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

function Change() {

  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [smd, setSmd] = useState('')
  const [smd1, setSmd1] = useState('')
  const [smds, setSmds] = useState([])
  const [hsmd, setHsmd] = useState(false)
  const [hinst, setHinst] = useState(false)
  const currentUserEmailFromCookies = Cookies.get('auth')?.split(',')[0] || '';

  /*****************User All Detail Fetch Here*******************/
  useEffect(() => {
    const fetchUserData = async () => {
        try {       
        const userResponse = await axios.get(`/user-details/${currentUserEmailFromCookies}`);       
        setUserDetails(userResponse.data);
        if((userResponse.data.Hqrs ==1) && (userResponse.data.status ==1 || userResponse.data.status ==2 || userResponse.data.status ==3))
        { 

          setHinst(true)          
        }        
        else if(userResponse.data.Hqrs ==2)
        {
          const Smd = await axios.get(`/SmdName/${userResponse.data.Smdid}`);
          const Smds = await axios.get('/smddetail')
          setSmds(Smds.data)
          setSmd1(Smd.data)
          setHsmd(true)
        }
       
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  },[]);  
 /*****************************************************************/


 /***********Handle SMD************/
 const handleSMD = async(e)=>{
      if(!e.target.value)
      {
        const Smd = await axios.get(`/SmdName/${userDetails.Smdid}`);
        setSmd(Smd.data)                
      }
      else
      {
        const Smd = await axios.get(`/SmdName/${e.target.value}`);        
        setSmd(Smd.data)        
      }
 } 

 const SubmitSMD = async (e)=>{
    e.preventDefault()
    setIsLoading(true)  
    if(!smd)
    {
      toast.error('Please Select SMD')
      setIsLoading(false)
    }
    else if(smd._id === smd1._id)
    {
      toast.error('SMD should be diffrent')
      setIsLoading(false)
    }
    else
    {
      if(window.confirm('Are you Sure to update Your SMD'))
      {        
        try{
            const data = await axios.post('/updateSMD',{smd,smd1})
            console.log(data)
      }
      catch(err)
      {
          toast.error(err.response.data.err)
          setIsLoading(false);
      } 
      }
      else
      {
       setIsLoading(false);
      }  

    }
 }

 /***********************************/


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

  function handleSubmit(e) {   
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
      {
        hsmd == true && 
        (
        <>
          <div className='us-main-section-title'>
        Change SMD
      </div>
      <div className='us-main-section-body'>
        <div className='ss-input-section'>
          <label className='ss-input-label' htmlFor='ss-current-smd'>Current SMD</label>
          <p className='ss-current-smd' id='ss-current-smd'>{smd1.name}</p>
        </div>
        <div className='ss-input-section'>
          <label className='ss-input-label' htmlFor='ss-smd-options'>New SMD</label>        
          <select name='ss-smd-options' id='ss-smd-options' onChange={(e)=>handleSMD(e)}>
          <option value=''>Select SMD</option>         
          {
            smds.map((res)=>            
            <option value={res._id}>{res.name}</option>
            )
          }
          </select>
        </div>
        <div className='ss-submit-section'>
          <button className='ss-submit-button' onClick={SubmitSMD}>Update SMD</button>
        </div>
      </div>          
          </>
        )
      }

    {
      hinst == true && 
      (
        <>
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
          <option>Option 1</option>
           <option>Option 2</option>
          </select>
        </div>
        <div className='ss-submit-section'>
          <button className='ss-submit-button' onClick={handleSubmit}>Update institute</button>
        </div>
      </div>
        </>
      )
    }


      
    </div>
  )
}

export default Change;