import React, { useEffect, useState } from 'react';
import './css/AllQuestions.css';
import { NavLink } from 'react-router-dom';
import { Avatar } from '@mui/material';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import HistoryIcon from '@mui/icons-material/History';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import { Document, Page, PDFViewer } from '@react-pdf/renderer';
import parse from 'html-react-parser';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const AllQuestions = ({ question }) => {
  let result = question.result.map((resp) => {
    // return resp;
    return { ...resp, isAttachmentHidden: true };
  });

  result.reverse();

  function truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  const auth = sessionStorage.getItem('username');
  const [userdetail, setUserDetail] = useState('');

  useEffect(() => {
    async function getUser() {
      await axios
        .get(`/user-detail/${auth}`)
        .then((res) => {
          setUserDetail(res.data);
        }).catch((err) => {          
          console.log(err);
        });        
    }    
    getUser();
  }, []);
  
  var status;
  if (userdetail.status === 2) {
    status = userdetail.status;
  }
  const handeDelete = async (e) => {
    if (window.confirm('Please enter to confirm')) {
      axios.get(`/deletepost/${e}`).then((resp) => {
        window.location.reload(false);
      });
    }
  };

  // Code for viewing pdf attachment
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [resultState, setResult] = useState(result);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offSet) {
    setPageNumber((prevPageNumber) => prevPageNumber + offSet);
  }

  function changePageBack() {
    changePage(-1);
  }

  function changePageNext() {
    changePage(+1);
  }

  return (
    <div className='all-questions'>
      {resultState.map((data, index) => (
        <div className='all-questions-container' key={data._id}>
          <div className='all-questions-left'>
            <div className='all-options'>
              <p className='option-icon expand'>
                <ExpandLessIcon />
              </p>
              <p className='option-icon expand active'>
                <ExpandMoreIcon />
              </p>
              {/* <AttachFileIcon className='option-icon' /> */}
              <AttachFileIcon
                className='option-icon'
                onClick={() => {
                  const updatedResult = [...resultState];
                  updatedResult[index].isAttachmentHidden = !updatedResult[index].isAttachmentHidden;
                  setResult(updatedResult);
                }}
              />
            </div>
          </div>

          <div className='question-answer'>
            <NavLink to={`/view-question?id=${data._id}`}>{data?.title}</NavLink>
            <div style={{ width: '90%', marginBottom: '16px' }}>
              <div>{parse(truncate(data.body, 200))}</div>
            </div>

            <div className={data.isAttachmentHidden ? 'view-pdf' : 'view-pdf active'}>
              <center>
                <PDFViewer>
                  <Document file='./bash.pdf' onLoadSuccess={onDocumentLoadSuccess}>
                    <Page height='A4' pageNumber={pageNumber} />
                  </Document>
                </PDFViewer>
                <p>
                  Page {pageNumber} of {numPages}
                </p>
                {pageNumber > 1 && <button onClick={changePageBack}>Previous Page</button>}
                {pageNumber < numPages && <button onClick={changePageNext}>Next Page</button>}
              </center>
            </div>

            <div className='author'>
              {status ? (
                <DeleteIcon className='react-button' onClick={(e) => { handeDelete(data._id) }} />
              ) : (
                <p></p>
              )}
              <small>on {new Date(data?.created_at).toLocaleString().replace(/,/g, ' at ')}</small>
              <div className='author-details'>
                <Avatar />
                <p>{String(data?.auth).split('@')[0]}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllQuestions;
