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

  const [ssmd, setSsmd] = useState([]);
  const [institute, setInstitute] = useState('');
  const [group, setGroup] = useState('');
  const [mainG, setMainG] = useState('');
  const [detail, setDetail] = useState('');
  const [smd, setSmd] = useState('');

  useEffect(() => {
    let userDetails = new Promise(async (resolve, reject) => {
      const response = await axios.get(`/user-detail/${auth}`);
      resolve(response.data);
    });

    userDetails.then(
      async function (value) {
        async function getGroup() {
          await axios
            .get(`/group/${auth}`)
            .then(res => {
              // console.log('Group: ',res.data);
              setGroup(res)
            })
            .catch(err => console.error(err));
        }
        async function getMain() {
          await axios
            .get(`/MainGroup/${auth}`)
            .then(res => {
              // console.log('MainG: ',res.data);
              setMainG(res.data)
            })
            .catch(err => console.error(err));
        }
        getGroup();
        getMain();
        setDetail(value);

        if (value.Hqrs == 1) {
          if (value.status == 1) {
            const Inst_Name = await axios.get(`/InstituteName/${value.institute}`);
            // console.log('Institute: ',Inst_Name);
            setInstitute(Inst_Name.data);
          }
          else if (value.status == 2 || value.status == 3) {
            const Smd_Name = await axios.get(`/SmdName/${value.Smdid}`);
            // console.log('Smd1 : ',Smd_Name.data);
            setSmd(Smd_Name.data);

          }
        }
        else if (value.Hqrs == 2) {
          const Smd_Name = await axios.get(`/SmdName/${value.Smdid}`);
          // console.log('Smd2 : ',Smd_Name.data);
          setSmd(Smd_Name.data);
        }
      },
      function (error) {
        console.error(error);
      }
    );
  }, []); 

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
          <SidebarOption title='Home' icon={<HomeIcon />} />
        </div>

        {
          detail.Hqrs == 1 &&

          (
            detail.status == 1 ?
              <>
                <div className='sidebar-option-category-container'>
                  <small className="sidebar-option-category">Institute</small>
                  <SidebarOption title={institute.name} icon={<PeopleIcon />} />
                </div>

                <div className='sidebar-option-category-container'>
                  <small className="sidebar-option-category">Main Discipline</small>
                  <SidebarOption title={mainG.name} icon={<PeopleIcon />} />
                </div>           
                <div className='sidebar-option-category-container'>
                  <small className="sidebar-option-category">Interested Disciplines</small>
                  {group.data?.map((resp) =>
                    <SidebarOption title={resp.name} icon={<PeopleIcon />} key={resp.name} />
                  )}
                </div>
              </>
              :
              <>
                <div className='sidebar-option-category-container'>
                  <small className="sidebar-option-category">SMD</small>
                  <SidebarOption title={smd.name} icon={<PeopleIcon />} />
                </div>

                <div className='sidebar-option-category-container'>
                  <small className="sidebar-option-category">Main Discipline</small>
                  <SidebarOption title={mainG.name} icon={<PeopleIcon />} />
                </div>

                <div className='sidebar-option-category-container'>
                  <small className="sidebar-option-category">Interested Disciplines</small>
                  {group.data?.map((resp) =>
                    <SidebarOption title={resp.name} icon={<PeopleIcon />} key={resp.name} />
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
                <small className="sidebar-option-category">SMD</small>
                <SidebarOption title={smd.name} icon={<PeopleIcon />} />
              </div>

              <div className='sidebar-option-category-container'>
                <small className="sidebar-option-category">Main Discipline</small>
                <SidebarOption title={mainG.name} icon={<PeopleIcon />} />
              </div>

              <div className='sidebar-option-category-container'>
                <small className="sidebar-option-category">Interested Disciplines</small>
                {group.data?.map((resp) =>
                  <SidebarOption title={resp.name} icon={<PeopleIcon />} key={resp.name} />
                )}
              </div>
            </>
                      )
        }
      </div>
    </div>
  )
}

function SidebarOption({ title, icon }) {
  return (
    <NavLink to={`/?subject=${encodeURI(title)}`} className='sidebar-option'>
      {icon}
      <p>{title}</p>
    </NavLink>
  )
}

export default sidebar
