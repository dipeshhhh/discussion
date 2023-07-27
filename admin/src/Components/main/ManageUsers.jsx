import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "./css/UserContainer.css";

// This is a sample array of json objects,
// ! WARNING: Keep the const name 'users', or change it everywhere in this code ;)
// NEED: Registered users from Database
const users = [ // ( Find users with 'status == 1' )?
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
  function handleDelete(){
    // Handle user deletion here
  }
  function handleEdit(){
    // Handle user timeout (temporary ban) here
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
        <EditIcon
          className="admin-button edit-button"
          onClick={()=>{handleEdit()}}
          onMouseEnter={(event)=>{event.target.parentElement.parentElement.style.backgroundColor = "var(--orange-peel-faded)";}}
          onMouseLeave={(event)=>{event.target.parentElement.parentElement.style.backgroundColor = "white";}}
        />
        <div className="flex-grow"></div>
        <DeleteIcon 
          className="admin-button reject-button"
          onClick={()=>{handleDelete()}}
          onMouseEnter={(event)=>{event.target.parentElement.parentElement.style.backgroundColor = "var(--red-crayola-bright-faded)";}}
          onMouseLeave={(event)=>{event.target.parentElement.parentElement.style.backgroundColor = "white";}}
        />
      </div>
    </div>
  )
}

function ManageUsers() {
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

export default ManageUsers;