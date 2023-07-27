import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { Avatar } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import "./css/UserContainer.css";

// This is a sample array of json objects,
// ! WARNING: Keep the const name 'users', or change it everywhere in this code ;)
// NEED: Requests from database
const users = [ // ( Find users with 'status == 0' )?
  { 
    _id: "someId",
    name: "User's Name",
    email: "user@email.com",
    smdid: "CROP SCIENCES",
    Divisionid: "Genetics & Plant Breeding",
    Group: ["CROP SCIENCES"]
  },
  { 
    _id: "someOtherId",
    name: "Other user's Name",
    email: "user2@email.com",
    smdid: "CROP SCIENCES",
    Divisionid: "Genetics & Plant Breeding",
    Group: ["CROP SCIENCES"]
  },
]

function User(props){
  function handleApproval(){
    // Handle approving request here
  }
  function handleRejection(){
    // Handle rejecting request here
  }
  return(
    <div className="user-container" key={props.key}>
      <div className="user-profile-picture-container">
        {/* must be 120px X 120px */}
        { props.profilePicture ? <img src={props.profilePicture} className="user-profile-picture" /> : <Avatar className="user-profile-picture" /> }
      </div>
      <div className="user-info-container">
        <p className="user-info">Name: {props.name}</p>
        <p className="user-info">Email: {props.email}</p>
        <p className="user-info">Smdid: {props.smdid}</p>
        <p className="user-info">Division: {props.Divisionid}</p>
        <p className="user-info">
          Groups: 
          {
            props.Group.map((group) => {
              return <span> {group}, </span>;
            })
          }
        </p>
      </div>
      <div className="admin-buttons">
        <CheckIcon 
          className="admin-button approve-button"
          onClick={()=>{handleApproval()}}
          onMouseEnter={(event)=>{event.target.parentElement.parentElement.style.backgroundColor = "var(--primary-faded-color)";}}
          onMouseLeave={(event)=>{event.target.parentElement.parentElement.style.backgroundColor = "white";}}
        />
        <div className="flex-grow"></div>
        <ClearIcon 
          className="admin-button reject-button"
          onClick={()=>{handleRejection()}}
          onMouseEnter={(event)=>{event.target.parentElement.parentElement.style.backgroundColor = "var(--red-crayola-bright-faded)";}}
          onMouseLeave={(event)=>{event.target.parentElement.parentElement.style.backgroundColor = "white";}}
        />
      </div>
    </div>
  )
}

function AuthenticateUsers() {
  return(
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <Sidebar />
      <div className="users-main-container">
        <div className="search-bar-container">
          <SearchBar placeholder="Search users" />
        </div>
        <div className="users-container">
          {users.map((user)=>{
            return(
              <User
                key={user._id} 
                name={user.name}
                email={user.email}
                smdid={user.smdid}
                Divisionid={user.Divisionid}
                Group={user.Group}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AuthenticateUsers;