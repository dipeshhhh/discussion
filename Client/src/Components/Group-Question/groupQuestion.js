import React, { useEffect, useState } from 'react';
import './css/group.css';
import { NavLink } from 'react-router-dom';
import { Avatar } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import parse from 'html-react-parser';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const GroupQuestion = () => {


    

  // useEffect(()=>{
  //   async function getQuestion(){
  //     await axios
  //     .get(`/group-question/${id}`)
  //     .then((res) => {
  //       console.log(res)
  //     }).catch((err) => {          
  //       console.log(err);
  //     }); 
  //   }
  //   getQuestion()
  // },[])

//   let result = question.result.map((resp) => {
//     // return resp;
//     return { ...resp, isAttachmentHidden: true };
//   });

//   result.reverse();

//   function truncate(str, n) {
//     return str.length > n ? str.substr(0, n - 1) + '...' : str;
//   }

//   const auth = sessionStorage.getItem('username');
//   const [userdetail, setUserDetail] = useState('');

//   useEffect(() => {
//     async function getUser() {
//       await axios
//         .get(`/user-detail/${auth}`)
//         .then((res) => {
//           setUserDetail(res.data);
//         }).catch((err) => {          
//           console.log(err);
//         });        
//     }    
//     getUser();
//   }, []);
  
//   var status;
//   if (userdetail.status === 2) {
//     status = userdetail.status;
//   }
//   const handeDelete = async (e) => {
//     if (window.confirm('Please enter to confirm')) {
//       axios.get(`/deletepost/${e}`).then((resp) => {
//         window.location.reload(false);
//       });
//     }
//   };
  
  return (
    <div className='all-questions'>      
        <div className='all-questions-container'>
          <div className='all-questions-left'>
            <div className='all-options'>
              <p className='option-icon expand'>
                <ExpandLessIcon />
              </p>
              <p className='option-icon expand active'>
                <ExpandMoreIcon />
              </p>
                           
            </div>
          </div>

          <div className='question-answer'>
            <NavLink> </NavLink>
            <div style={{ width: '90%', marginBottom: '16px' }}>
              <div></div>
            </div>           

            <div className='author'>
              
             <small>on </small>
              <div className='author-details'>
                <Avatar />
               <p></p>
              </div>
            </div>
          </div>
        </div>
      
    </div>
  );
};

export default GroupQuestion;
