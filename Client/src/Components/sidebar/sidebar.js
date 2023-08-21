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

  const [group, setGroup] = useState('');
  const [mainG, setMainG]= useState('');
  const [detail, setDetail] = useState('')



  useEffect(() => {

    async function getUser() {
      await axios.get(`/user-detail/${auth}`)
        .then(res => setDetail(res.data))
        .catch(err => console.log(err));
    }
    getUser();
    
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
              detail.status ==1 ?
              <>
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
                  <p>{group.Smdid}</p>
                </NavLink>
              </div>

              </>
            }
             
       
       

        {/* {
          group.data?.map((resp) => (
            <NavLink to={`/Group-Question?id=${resp}`} className='link-tag sidebar-option'>
              <PeopleIcon />
              <span className="link-title">{resp}</span>
            </NavLink>
          )
        } */}
      </div>
    </div>
  )
}

export default sidebar