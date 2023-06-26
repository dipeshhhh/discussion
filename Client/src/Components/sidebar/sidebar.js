import React from 'react'
import { NavLink } from 'react-router-dom'
import './css/sidebar.css'
import parse from 'html-react-parser'

import HomeIcon from '@mui/icons-material/Home';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import TagIcon from '@mui/icons-material/Tag';
import PeopleIcon from '@mui/icons-material/People';
import ExploreIcon from '@mui/icons-material/Explore';

const sidebar = () => {
  return (
    <div className='sidebar'>
        <div className='sidebar-container'>
            <div className='sidebar-options'>

                {/* <div className='link-tag sidebar-option'>
                    <HomeIcon />
                    <NavLink to="/" className="link-tag">Home</NavLink>
                </div> */}
                {/* <div> */}
                    {/* <NavLink href="">PUBLIC</NavLink> */}
                    <div className='link'>

                        <NavLink to="/" className='link-tag sidebar-option'>
                            <HomeIcon />
                            <span className="link-title">Home</span>
                        </NavLink>

                        <span className="sidebar-option-category-title">PUBLIC</span>

                        <NavLink href="" className='link-tag sidebar-option'>
                            {/* <PublicIcon/> */}
                            <QuestionAnswerIcon />
                            <span className="link-title">Questions</span>
                        </NavLink>

                        <NavLink href="" className='link-tag sidebar-option'>
                            <TagIcon />
                            <span className="link-title">Tag</span>
                        </NavLink> 

                        <NavLink href="" className='link-tag sidebar-option'>
                            <PeopleIcon />
                            <span className="link-title">Users</span>
                        </NavLink>

                        <NavLink href="" className='link-tag sidebar-option'>                   
                            {/* <StarsIcon/> */}
                            <i class="fa-sharp fa-regular fa-star-shooting"></i>
                            <ExploreIcon />
                            <span className="link-title">Explore Collections</span>
                        </NavLink>
                        {/* <div className='tags'>
                            <p className='sidebar-option'>Tag</p>
                            <p className='sidebar-option'> Users</p>                            
                        </div> */}     

                    </div>

                {/* </div> */}
                {/* <div className='sidebar-option' > */}
                   {/* <div className='link'> */}
                        {/* <div className='link-tag'> */}
                            {/* <StarsIcon/> */}
                            {/* <i class="fa-sharp fa-regular fa-star-shooting"></i> */}
                            {/* <ExploreIcon /> */}
                            {/* <NavLink href="">Explore Collections</NavLink> */}
                        {/* </div> */}
                    {/* </div> */}
                {/* </div>  */}

            </div>
        </div>
    </div>
  )
}

export default sidebar