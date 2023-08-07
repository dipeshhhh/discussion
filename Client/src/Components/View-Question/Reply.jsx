import React, { useState } from "react";
import parse from 'html-react-parser';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Avatar } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ReplyIcon from '@mui/icons-material/Reply';
import CancelIcon from '@mui/icons-material/Cancel';
import "./index.css";

function Reply({ id, body, created_at, auth, replies }) {
  const [expanded, setExpanded] = useState(false);

  const [loadingReply, setLoadingReply] = useState(false);
  const [errorReply, setErrorReply] = useState('');
  const [bodyReply, setBodyReply] = useState('');
  const [fileReply, setFileReply] = useState('');
  const [bthiddenReply, setBthiddenReply] = useState(false);
  const [enableReply, setEnableReply] = useState(true);
  
  const replyToReplyToggle = () => {
    setEnableReply(!enableReply);
  };

  const toggleExpand = () => {
    setExpanded((prevState) => !prevState);
  };

  const handleQuill = (value) => {
    setBodyReply(value);
  };
  
  const handleFileChange = (event) => {
    event.preventDefault();

    const files = event.target.files[0];

    if (files.size / 1024 > 5120 || files.type.split('/').pop() !== 'pdf') {
      setBthiddenReply(true);
      setErrorReply('Please upload file as per the specified criteria');
    } else {
      setErrorReply('');
      setBthiddenReply(false);
      setFileReply(event.target.files[0]);
    }
  };

  const replyBackend = async (e) => {
    // Handle Reply submission here

  };

  return (
    <div className="main-reply-box" key={id}>
      <div
        className="left-bar" 
        onClick={ replies.length > 0 ? ()=>{toggleExpand()} : ()=>{}}
      >
      </div>
      <div className="reply">
        <div className="gray-reply-box">
          <div className="reply-box">
            <div className="reply-buttons">
              {replies.length > 0 && (
                <p className={`option-icon expand active`} onClick={toggleExpand}>
                  {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </p>
              )}
              <p onClick={replyToReplyToggle} className="option-icon">
                { enableReply ? <ReplyIcon /> : <CancelIcon />}
              </p>
            </div>
            <div className="reply-body" style={{"margin-bottom": "16px", "overflow-wrap":"break-word"}}>
              {parse(body)}
            </div>
            <div className='author reply-author'>
              <small>on {new Date(created_at).toLocaleString().replace(/,/g, ' at ')}</small>
              <div className='author-details'>
                <Avatar />
                <p>{String(auth).split('@')[0]}</p>
              </div>
            </div>
          </div>
        </div>
        {/* This part below is to reply to the reply, NEED: backend for it */}
        <div id={"write-reply-to-"+id} className={enableReply ? "write-reply-box" : "write-reply-box active"}>
          <div className="answer">
            <div className="main-answer">
              <h3>You can Reply</h3>
              <ReactQuill
                theme="snow"
                value={bodyReply}
                onChange={handleQuill}
                className="react-quill"
                style={{ height: '200px' }}
              />
            </div>
            <div className="file-attach">
              {/* <h3>Attach file (only PDF with 5 MB)</h3>
              <input
                label="File upload"
                type="file"
                name="file"
                onChange={handleFileChange}
                placeholder="Select file..."
              /> */}
            </div>
            <button
              hidden={bthiddenReply}
              onClick={replyBackend}
              style={{
                margin: '10px 0',
                maxWidth: 'fit-content',
              }}
            >
              {loadingReply ? 'Replying...' : 'Post Reply'}
            </button>
            {errorReply !== '' && (
              <p style={{ color: 'red', fontSize: '14px' }}>{errorReply}</p>
            )}
          </div>
        </div>
        {/* Below part is to handle nested replies */}
        {expanded && (
          <div className="replies">
            {replies.map((reply) => (
              <Reply
                key={reply._id}
                body={reply.body}
                created_at={reply.created_at}
                auth={reply.auth}
                replies={reply.replies} // Recursively pass nested replies
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Reply;
