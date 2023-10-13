import React, { useState, useEffect, useReducer } from 'react';
import Cookies from 'js-cookie';
import './SubjectSettings.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import axios from 'axios'
import SelectMul from 'react-dropdown-select'

function Change() {

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [smd, setSmd] = useState('')
  const [smd1, setSmd1] = useState('')
  const [subject2, setSubject2] = useState([])
  const [subject1, setSubject1] = useState([])
  const [subjects, setSubjects] = useState([])
  const [smds, setSmds] = useState([])
  const [inst, setInst] = useState('')
  const [inst1, setInst1] = useState('')
  const [insts, setInsts] = useState([])
  const [hsmd, setHsmd] = useState(false)
  const [hinst, setHinst] = useState(false)
  const auth = Cookies.get('auth')?.split(',')[0] || '';

  /*****************User All Detail Fetch Here*******************/
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`/user-details/${auth}`);
        setUserDetails(userResponse.data);

        const subject = await axios.get(`/group/${auth}`)
        const subjects = await axios.get('/subject')
        setSubjects(subjects.data)
        setSubject1(subject.data)
        setSubject2(userResponse.data.intrested)

        if ((userResponse.data.Hqrs == 1) && (userResponse.data.status == 1 || userResponse.data.status == 2 || userResponse.data.status == 3)) {
          const Inst = await axios.get(`/InstituteName/${userResponse.data.institute}`);
          const Insts = await axios.get('/institute');
          setInsts(Insts.data)
          setInst1(Inst.data)
          setHinst(true)
        }
        else if (userResponse.data.Hqrs == 2) {
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
  }, []);
  /*****************************************************************/

  /***********Handle SMD************/
  const handleSMD = async (e) => {
    if (!e.target.value) {
      setSmd('')
    }
    else {
      setSmd(e.target.value)
    }
  }

  const SubmitSMD = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    if (!smd) {
      toast.error('Please Select SMD')
      setIsLoading(false)
    }
    else if (smd === smd1._id) {
      toast.error('SMD should be diffrent')
      setIsLoading(false)
    }
    else {
      if (window.confirm('Are you Sure to update Your SMD')) {
        try {
          const data = await axios.post('/updateSMD', { smd, smd1, auth })
          if (data) {
            toast.success('SMD Updated successfully')
            navigate('/')
            setIsLoading(false)
          }
        }
        catch (err) {
          toast.error(err.response.data.err)
          setIsLoading(false);
        }
      }
      else {
        setIsLoading(false);
      }
    }
  }
  /***********************************/

  /********************Handle Institute************************/

  const handleinstitute = (e) => {
    const INST = new Promise((res, rej) => {
      res(e._id)
    })
    INST.then(
      async function (value) {
        const data = await axios.get(`/SMD/${value}`)
        setSmd(data.data._id)
        setInst(value)
        console.log(value)
      }
    )
  }

  const Submitinst = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    if (!inst) {
      toast.error('Please Select SMD')
      setIsLoading(false)
    }
    else if (inst === inst1._id) {
      toast.error('Selected Institute should be diffrent from Current Institute')
      setIsLoading(false)
    }
    else {
      if (window.confirm('Are you Sure to update Your Institute')) {
        try {
          const data = await axios.post('/updateInstitute', { smd, inst, inst1, auth })
          if (data) {
            toast.success('Institute Updated successfully')
            navigate('/')
            setIsLoading(false)
          }
        }
        catch (err) {
          toast.error(err.response.data.err)
          setIsLoading(false);
        }
      }
      else {
        setIsLoading(false);
      }

    }
  }
  /*************************************************************/
  let subject = []
  const [values, setValues] = useState([])
  values.map((resp) => {
    subject.push(resp._id)
  })

  const handleSubmit = async (e) => {

    e.preventDefault()
    setIsLoading(true)
    if (subject.length < 1) {
      toast.error('Please Select Intrested Subject')
      setIsLoading(false)
    }
    else if (subject.includes(userDetails.Divisionid)) {
      toast.error('You should Select different subject from main Subject')
      setIsLoading(false)
    }
    else if (subject.length > 4) {
      toast.error('You should Select only 4 Subject')
      setIsLoading(false)
    }
    else {
      if (window.confirm('Are you Sure to update Your Intrested Subject')) {
        try {
          const data = await axios.post('/updateSubject', { subject, subject2, auth })

          if (data) {
            toast.success('Intrested Subject Updated successfully')
            navigate('/')
            setIsLoading(false)
          }
        }
        catch (err) {
          toast.error(err.response.data.err)
          setIsLoading(false);
        }

      }
      else {
        setIsLoading(false);
      }
    }
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
              subject1.map(subject => (
                <li className='ss-current-subject'>{`- ${subject.name}`}</li>
              ))
            }
          </ul>
        </div>
        <div className='ss-input-section'>
          <label className='ss-input-label' htmlFor='ss-smd-options'>Select new interested subjects to override all previously interested subjects</label>
          {
            <SelectMul
              name='select'
              options={values.length > 3 ? values : subjects}
              labelField='name'
              valueField='name'
              multi
              onChange={values =>
                setValues(values)
              }
              className='ss-select-input'
            />}
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
                <select name='ss-smd-options' id='ss-smd-options' onChange={(e) => handleSMD(e)}>
                  <option value=''>Select SMD</option>
                  {
                    smds.map((res) =>
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
                <p className='ss-current-institute' id='ss-current-institute'>{inst1.name}</p>
              </div>
              <div className='ss-input-section'>
                <label className='ss-input-label' htmlFor='ss-institute-options'>New institute</label>
                <Select
                  placeholder="Select Institute"
                  onChange={handleinstitute}
                  getOptionLabel={option => {
                    return option.name;
                  }}
                  getOptionValue={option => {
                    return option._id;
                  }}
                  options={insts}
                  className='ss-select-input'
                />

              </div>
              <div className='ss-submit-section'>
                <button className='ss-submit-button' onClick={Submitinst}>Update institute</button>
              </div>
            </div>
          </>
        )
      }



    </div>
  )
}

export default Change;