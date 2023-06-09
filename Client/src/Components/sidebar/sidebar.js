import React from 'react'
import { NavLink } from 'react-router-dom'
import './css/sidebar.css'
import parse from 'html-react-parser'
const sidebar = () => {
  return (
    <div className='sidebar'>
        <div className='sidebar-container'>
            <div className='sidebar-options'>
                <div className='sidebar-option'>
                    <NavLink to="/">Home</NavLink>
                </div>
                <div className='sidebar-option'>
                    <NavLink href="">PUBLIC</NavLink>
                    <div className='link'>
                    <div className='link-tag'>
                        {/* <PublicIcon/> */}
                        <NavLink href="">Questions</NavLink>

                    </div>
                    <div className='tags'>
                        <p>Tag</p>
                        <p>Users</p>
                     
                    </div>
                    
                    </div>
                </div>
                <div className='sidebar-option' >
                   <div className='link'>
                   <div className='link-tag'>
                   
                       {/* <StarsIcon/> */}
                       <i class="fa-sharp fa-regular fa-star-shooting"></i>
                        <NavLink href="">Explore Colletions</NavLink>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    </div>
  )
}

export default sidebar