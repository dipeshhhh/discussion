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

function Reply({ id, text, created_at, auth, replies }) {
  const [expanded, setExpanded] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [body, setBody] = useState('');
  const [file, setFile] = useState('');
  const [bthidden, setBthidden] = useState(false);
  const [enable, setEnable] = useState(true);
  
  const replyToReplyToggle = () => {
    if (enable === true) {
      setEnable(false);
    } else if (enable === false) {
      setEnable(true);
    }
  };

  const toggleExpand = () => {
    setExpanded((prevState) => !prevState);
  };

  const handleQuill = (value) => {
    setBody(value);
  };
  
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

  const answer = async (e) => {
    // Handle Reply submission here

    console.log("I was clicked");
    e.preventDefault();

    // setLoading(true);

    // const data = new FormData();

    // data.append('file', file);
    // data.append('body', body);
    // data.append('auth', auth);
    // data.append('question_id', question_id);

    // if (!body) {
    //   setError('Please fill in the Body Part');
    //   setLoading(false);
    // } else {
    //   if (window.confirm('Please click to confirm Comment')) {
    //     Axios.post('/Answer', data).then((res) => {
    //       if (res) {
    //         toast.success('Comment Successful');
    //         window.location.reload(false);
    //       }
    //     });
    //   }
    // }
  };

  return (
    <div className="reply">
      <div className="reply-body">
        <div className="reply-buttons">
          {replies.length > 0 && (
            <p className={`option-icon expand ${expanded ? "active" : ""}`} onClick={toggleExpand}>
              <ExpandLessIcon />
            </p>
          )}
          {replies.length > 0 && (
            <p className={`option-icon expand ${!expanded ? "active" : ""}`} onClick={toggleExpand}>
              <ExpandMoreIcon />
            </p>
          )}
          <p onClick={replyToReplyToggle} className="option-icon">
            { enable ? <ReplyIcon /> : <CancelIcon />}
          </p>
        </div>
        <div className="reply-text" style={{"margin-bottom": "16px", "overflow-wrap":"break-word"}}>
          {parse(text)}
        </div>
        <div className='author'>
          <small>on {new Date(created_at).toLocaleString().replace(/,/g, ' at ')}</small>
          <div className='author-details'>
            <Avatar />
            <p>{String(auth).split('@')[0]}</p>
          </div>
        </div>
      </div>
      {/* Below part is to handle nested replies */}
      {expanded && (
        <div className="replies">
          {replies.map((reply) => (
            <Reply
              key={reply._id}
              text={reply.text}
              created_at={reply.created_at}
              auth={reply.auth}
              replies={reply.replies} // Recursively pass nested replies
            />
          ))}
        </div>
      )}
      {/* This part below is to reply to the reply, NEED: backend for it */}
      <div id={"write-reply-to-"+id}>
        <div className="answer" hidden={enable}>
          <div className="main-answer">
            <h3>You can Reply</h3>
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
            {loading ? 'Replying...' : 'Post Reply'}
          </button>
          {error !== '' && (
            <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Reply;
