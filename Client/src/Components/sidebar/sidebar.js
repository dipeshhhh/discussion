import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './css/sidebar.css';

import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';


const sidebar = () => {
  const userData = Cookies.get('auth');
  let auth;
  if (userData) {
    const data = userData.split(',');
    auth = data[0];
  }

  const [ssmd, setSsmd] = useState([])
  const [institute, setInstitute] = useState('')
  const [group, setGroup] = useState('');
  const [mainG, setMainG]= useState('');
  const [detail, setDetail] = useState('')
  const [smd, setSmd] = useState('')



  useEffect(() => {


    let userDetails = new Promise (async(resolve,reject)=>{
      const response =  await axios.get(`/user-detail/${auth}`)  
      resolve(response.data)
    })

    userDetails.then(
      
      async function(value)
      {
        async function getGroup() {
          await axios.get(`/group/${auth}`)
            .then(res => setGroup(res))
            .catch(err => console.log(err));
        }
        async function getMain(){
          await axios.get(`/MainGroup/${auth}`)
          .then(res => setMainG(res.data))
            .catch(err => console.log(err));
        }   
          getGroup();
          getMain(); 
          setDetail(value)  

        if(value.Hqrs == 1)
        {
          if(value.status == 1)
        {
          const Inst_Name = await axios.get(`/InstituteName/${value.institute}`)      
          setInstitute(Inst_Name.data)      
        }
        else if(value.status == 2 || value.status == 3)
        {
          const Smd_Name = await axios.get(`/SmdName/${value.Smdid}`)         
          setSmd(Smd_Name.data)

        } 
             }
        else if(value.Hqrs == 2)
        {      
          const Smd_Name = await axios.get(`/SmdName/${value.Smdid}`)         
          setSmd(Smd_Name.data)

        }       

      },
      function(error)
      {
        console.log(error)
      }
    ) 
  }, [])

  return (
    <div className='sidebar-container'>
      <div className='sidebar-options'>

      {/*
      
      "sidebar-options" structure: 
      ---------------------------------<=="sidebar-options"
      |                               |
      |  ,,,,,,,,,,,,,,,,,,,,,,,,,,,<=="sidebar-option-category-container"
      |  | ----------------------- |  |
      |  | |Title for category 1 |<=="sidebar-option-category"
      |  | ----------------------- |  |
      |  | ----------------------- |  |
      |  | | sidebar-option 1    |<=="sidebar-option"
      |  | ----------------------- |  |
      |  | ----------------------- |  |
      |  | | sidebar-option 2    | |  |
      |  | ----------------------- |  |
      |  | ...                     |  |
      |  | ...                     |  |
      |  | ----------------------- |  |
      |  | | sidebar-option n    | |  |
      |  | ----------------------- |  |
      |  ```````````````````````````  |
      |  ,,,,,,,,,,,,,,,,,,,,,,,,,,,  |
      |  | ----------------------- |  |
      |  | |Title for category 2 | |  |
      |  | ----------------------- |  |
      |  | ...                     |  |
      |  | ...                     |  |
      |  | ----------------------- |  |
      |  | | sidebar-option n    | |  |
      |  | ----------------------- |  |
      |  ```````````````````````````  |
      |  ...                          |
      |  ...                          |
      |  ,,,,,,,,,,,,,,,,,,,,,,,,,,,  |
      |  | ----------------------- |  |
      |  | |Title for category n | |  |
      |  | ----------------------- |  |
      |  | ...                     |  |
      |  | ...                     |  |
      |  | ----------------------- |  |
      |  | | sidebar-option n    | |  |
      |  | ----------------------- |  |
      |  ```````````````````````````  |
      |                               |
      ---------------------------------

      */}

        <div className='sidebar-option-category-container'>
          <NavLink to="/index" className='sidebar-option'>
            <HomeIcon />
            <p>Home</p>
          </NavLink>
        </div>
        {
          detail.Hqrs == 1 && 
                      
          (
            detail.status ==1 ?
              <>
              <div className='sidebar-option-category-container'>
                <small className="sidebar-option-category">Your Institute</small>
                <NavLink className='sidebar-option'>
                  <PeopleIcon />
                  <p>{institute.name}</p>
                </NavLink>
              </div>
               <div className='sidebar-option-category-container'>
                <small className="sidebar-option-category">Your Subject</small>
                <NavLink to='/index' className='sidebar-option'>
                  <PeopleIcon />
                  <p>{mainG.name}</p>
                </NavLink>
              </div>
                  <div className='sidebar-option-category-container'>
                  <small className="sidebar-option-category">Your favourite subject</small>
                  {group.data?.map((resp) =>
                    <NavLink className='sidebar-option'>
                      <PeopleIcon />
                      <p>{resp.name}</p>
                    </NavLink>
                  )}
                </div>
              </>
              :              
              <>              
              <div className='sidebar-option-category-container'>
                <small className="sidebar-option-category">Your SMD</small>
                <NavLink className='sidebar-option'>
                  <PeopleIcon />
                  <p>{smd.name}</p>
                </NavLink>
              </div>
              <div className='sidebar-option-category-container'>
                <small className="sidebar-option-category">Your Subject</small>
                <NavLink to='/index' className='sidebar-option'>
                  <PeopleIcon />
                  <p>{mainG.name}</p>
                </NavLink>
              </div>
                           <div className='sidebar-option-category-container'>
                  <small className="sidebar-option-category">Your favourite subject</small>
                  {group.data?.map((resp) =>
                    <NavLink className='sidebar-option'>
                      <PeopleIcon />
                      <p>{resp.name}</p>
                    </NavLink>
                  )}
                </div>
              </>             
             )
              
        }
        {          
          detail.Hqrs == 2 &&
          (        
           <>
           <div className='sidebar-option-category-container'>
                <small className="sidebar-option-category">Your SMD</small>
                <NavLink className='sidebar-option'>
                  <PeopleIcon />
                  <p>{smd.name}</p>
                </NavLink>
              </div>
              <div className='sidebar-option-category-container'>
                <small className="sidebar-option-category">Your Subject</small>
                <NavLink to='/index' className='sidebar-option'>
                  <PeopleIcon />
                  <p>{mainG.name}</p>
                </NavLink>
              </div>

                           <div className='sidebar-option-category-container'>
                  <small className="sidebar-option-category">Your favourite subject</small>
                  {group.data?.map((resp) =>
                    <NavLink className='sidebar-option'>
                      <PeopleIcon />
                      <p>{resp.name}</p>
                    </NavLink>
                  )}
                </div>
           </>

          )
        }                
      </div>
    </div>
  )
}

export default sidebar
