import React from 'react'
import { NavLink } from 'react-router-dom'
import './css/sidebar.css'

import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';


const sidebar = ({Subject}) => {   

  
  return (
    <div className='sidebar'>
        <div className='sidebar-container'>
            <div className='sidebar-options'>               
                    <div className='link'>

                        <NavLink to="/index" className='link-tag sidebar-option'>
                            <HomeIcon />
                            <span className="link-title">Home</span>
                        </NavLink>

                        {
                            Subject.status == 1 ?

                            <>

<span className="sidebar-option-category-title">Your Subject</span>  
                        
                        <NavLink to="/index" className='link-tag sidebar-option'>
                            <PeopleIcon />
                            <span className="link-title">{Subject.Divisionid}</span>
                        </NavLink>   
                       { Subject.intrested.length>0 && <span className="sidebar-option-category-title">Your favourite Subject</span>  }
                        
                        {
                            Subject.intrested.map((resp)=>
                            <NavLink className='link-tag sidebar-option'>
                            <PeopleIcon />
                            <span className="link-title">{resp}</span>
                            </NavLink>                                
                            )

                        }                       
                            </>
                            :

                            <>

                        <span className="sidebar-option-category-title">Your SMD</span>  
                        
                        <NavLink className='link-tag sidebar-option'>
                            <PeopleIcon />
                            <span className="link-title">{Subject.Smdid}</span>
                        </NavLink>  


                            
                            </>

                            
                        }
                       

                                  

                        {/* { 
                          group.data?.map((resp)=>                          
                        <NavLink to={`/Group-Question?id=${resp}`} className='link-tag sidebar-option'>
                            <PeopleIcon />
                            <span className="link-title">{resp}</span>
                        </NavLink>                                                            
                    ) 
                                           
                } */}
                    </div>            

            </div>
        </div>
    </div>
  )
}

export default sidebar