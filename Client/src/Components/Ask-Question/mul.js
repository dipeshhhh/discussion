import React, {useState, useEffect} from "react";
import Axios from 'axios';
import Comment from './comment'

const Mul = () => {

    const auth = sessionStorage.getItem('username')
    
    const question_id = '64be01c659426e6720e466fd'

    const [backendcomments, setBackendComments] = useState([])

    const rootComments = backendcomments.filter((backendcomment)=> !backendcomment.parentId)

    const getReplies = (commentID) =>{
        return backendcomments.filter((backendcomment)=> !backendcomment.parentId)
        .sort((a,b)=>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
    }


    useEffect(()=>{
        
        async function getAnswerDetails() {
            await Axios.get(`/Answer-detail/${question_id}`)
              .then((resp) => {
               
                setBackendComments(resp.data)
              })
              .catch((err) => {
                console.log(err);
              });
          }
          getAnswerDetails();

    },[])   
    

    return (

        <div className="comments">
      <h3 className="comments-title">Comments</h3>
      <div className="comment-form-title">Write comment</div>
      {/* <CommentForm submitLabel="Write" handleSubmit={addComment} /> */}
      <div className="comments-container">
        {rootComments.map((rootComment) => (         
         
          <Comment   key={rootComment._id} comment={rootComment}   replies={getReplies(rootComment._id)}       
          />


        ))}
      </div>
    </div>
 
    
    )
}

export default Mul









