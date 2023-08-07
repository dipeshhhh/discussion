import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import parse from 'html-react-parser';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import FileDownload from 'js-file-download';
import Axios from 'axios';
import { Document, Page, PDFViewer } from '@react-pdf/renderer';
import Reply from './Reply';
import './index.css';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HistoryIcon from '@mui/icons-material/History';
import { Avatar } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CancelIcon from '@mui/icons-material/Cancel';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Cookies from 'js-cookie';

const Mainquestion = (details) => {
  const navigate = useNavigate();
  let detail = details.details;
  const question_id = detail._id;

  // NEED: Replies from database
  const replies = [
    {
      _id: "someId",
      replied_to: "64c013b493b6f8d6e655d2b1",
      text: "This is reply body text",
      auth: "Author of this reply",
      created_at: "2023-07-26T17:49:54.625+00:00",
      replies: [
        // Nested replies for the first reply (if any)
        {
          _id: "nestedReplyId1",
          replied_to: "someId", // ID of the parent reply
          text: "This is a nested reply",
          auth: "Author of the nested reply",
          created_at: "2023-07-26T17:49:54.625+00:00",
          replies: [] // More nested replies can be added here
        },
        {
          _id: "nestedReplyId1",
          replied_to: "someId", // ID of the parent reply
          text: "This is a nested reply",
          auth: "Author of the nested reply",
          created_at: "2023-07-26T17:49:54.625+00:00",
          replies: [] // More nested replies can be added here
        },
      ],
    },
    {
      _id: "someOtherId",
      replied_to: "64c02eee93b6f8d6e655d32b",
      text: "This is another reply",
      auth: "Author of this reply",
      created_at: "2023-07-26T17:49:54.625+00:00",
      replies: [],
    },
  ];
  

  /**********Comment Fetch through question id***********/

  const [answerdata, setAnswerData] = useState();

  useEffect(() => {
    async function getAnswerDetails() {
      await Axios.get(`/Answer-detail/${question_id}`)
        .then((resp) => {
          setAnswerData(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getAnswerDetails();
  }, []);

  /*******************************************************/

  /**********************Answer Attachment download******************************/

  const downloadanswer = (e) => {
    Axios({
      url: `/A_download/${e}`,
      method: 'GET',
      responseType: 'blob',
    }).then((resp) => {
      FileDownload(resp.data, 'file.pdf');
    });
  };

  const userData = Cookies.get('auth')
  let auth =''
  if(userData)
  {
    const data = userData.split(',')
    auth = data[0]  
  }
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [body, setBody] = useState('');
  const [file, setFile] = useState('');
  const [bthidden, setBthidden] = useState(false);
  const handleQuill = (value) => {
    setBody(value);
  };

  /*************code Handle the file uploading file*******************/
  const handleFileChange = (event) => {
    event.preventDefault();

    const files = event.target.files[0];

    if (files.size / 1024 > 5120 || files.type.split('/').pop() !== 'pdf') {
      setBthidden(true);
      setError('Please upload file as per the specified criteria');
    } else {
      setError('');
      setBthidden(false);
      setFile(event.target.files[0]);
    }
  };

  /***********************************************/

  /* Handle the answer button for Comment */
  const answer = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();

    data.append('file', file);
    data.append('body', body);
    data.append('auth', auth);
    data.append('question_id', question_id);

    if (!body) {
      setError('Please fill in the Body Part');
      setLoading(false);
    } else {
      if (window.confirm('Please click to confirm Comment')) {
        Axios.post('/Answer', data).then((res) => {
          if (res) {
            toast.success('Comment Successful');
            window.location.reload(false);
          }
        });
      }
    }
  };

  /***********************************/

  // Reply button code for hide and unhide
  const [enable, setEnable] = useState(true);
  const reply = () => {
    if (enable === true) {
      setEnable(false);
    } else if (enable === false) {
      setEnable(true);
    }
  };

  // Here's the code for downloading Post Attachment
  const download = (e) => {
    Axios({
      url: `/Q_download/${e}`,
      method: 'GET',
      responseType: 'blob',
    }).then((resp) => {
      FileDownload(resp.data, 'file.pdf');
    });
  };

  /***********************************/

  // Code to toggle replies visibility
  const [showReplies, setShowReplies] = useState({});
  const toggleReplies = (answerId) => {
    setShowReplies((prevState) => ({
      ...prevState,
      [answerId]: !prevState[answerId],
    }));
  };
  /***********************************/
  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2 className="main-question">{detail?.title}</h2>
          <h2 className="main-question"></h2>
          <NavLink to="/add-question">
            <button>Ask Question</button>
          </NavLink>
        </div>
        <div className="main-desc">
          <div className="info">
            <p>on {new Date(detail?.created_at).toLocaleString().replace(/,/g, ' at ')}</p>

          {
            detail.file ?

            <a onClick={(e) => download(detail._id)}>
            <FileDownloadIcon />
          </a>
            :
            <></>

          }          

           
          </div>
        </div>
        <div className="all-questions">
          <div className="all-questions-container">
            <div className="question-answer">
              <p>{parse(detail.body)}</p>             

              <div className="author">
                <small></small>
                <div className="auth-details">
                  <Avatar />
                  <p>{String(detail?.auth).split('@')[0]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>        
        <div>
          <div className={ enable ? "icon-reply" : "icon-reply red-colored"} onClick={() => reply()}>
            { enable ? <ReplyAllIcon /> : <CancelIcon />}
            <p>{ enable ? "Answer" : "Cancel" }</p>
          </div>
          <div className="answer" hidden={enable}>
            <div className="main-answer">
              <h3>You can Answer</h3>
              <ReactQuill
                theme="snow"
                value={body}
                onChange={handleQuill}
                className="react-quill"
                style={{ height: '200px' }}
              />
            </div>
            <div className="file-attach">
              <h3>Attach file (only PDF with 5 MB)</h3>
              <input
                label="File upload"
                type="file"
                name="file"
                onChange={handleFileChange}
                placeholder="Select file..."
              />
            </div>
            <button
              hidden={bthidden}
              onClick={answer}
              style={{
                margin: '10px 0',
                maxWidth: 'fit-content',
              }}
            >
              {loading ? 'Commenting...' : 'Post Comment'}
            </button>
            {error !== '' && (
              <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>
            )}
          </div>
        </div>
        <div className="all-questions">
          <p>Number of Comments</p>
          {answerdata?.map((resp) => (
            <div key={resp._id}>
              <div className="all-questions-container">
                <div className="all-questions-left">
                  <div className="all-options">
                    <p className="arrow">▲</p>
                    <p className="arrow">0</p>
                    <p className="arrow">▼</p>
                    <BookmarkIcon />
                    <HistoryIcon />
                  </div>
                </div>
                <div className="question-answer">
                  {parse(resp.body)}
                  <div 
                    className="answer-reply-buttons"
                    onClick={() => toggleReplies(resp._id)}
                  >
                    <small className="answer-reply-button">
                      {showReplies[resp._id] ? "Hide replies" : "Show replies"}
                    </small>
                    <small className="answer-reply-button">Reply</small>
                  </div>
                  <div className="author">
                    {resp?.file ? (
                      <a onClick={(e) => downloadanswer(resp?._id)}>
                        <AttachFileIcon />
                      </a>
                    ) : (
                      <></>
                    )}
                    <small>on {new Date(resp?.created_at).toLocaleString().replace(/,/g, ' at ')}</small>
                    <div className="auth-details">
                      <Avatar />
                      <p>{String(resp?.auth).split('@')[0]}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div 
                id={"replies-to-"+resp?._id} 
                className={`replies-container ${showReplies[resp._id] ? "active" : ""}`}
              >
                {replies.filter((reply)=>{
                  return(reply.replied_to == resp._id)
                  }).map((reply)=>{
                    return(
                      <Reply
                        key = {reply._id}
                        id = {reply._id}
                        text = {reply.text}
                        created_at = {reply.created_at}
                        auth = {reply.auth}
                        replies = {reply.replies}
                      />
                    )
                  })
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mainquestion;
