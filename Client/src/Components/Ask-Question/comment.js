import React, { useState, useEffect } from 'react'


/**********Dummy comments*********/
interface Comment {

  body: String,
  comment: Array<Comment>
}

const dummyComments : Array<Comment> = 
[
  {
    body: 'This is my first comment',
    comments:[]
  },
  {
    body: 'This is my second comment',
    comments:[]
  },
  {
    body: 'This is my third comment',
    comments:[]
  },
  {
    body:'This is my Fourth comment',
    comments:[]
  }
]

export default function Home ()  {
   
  const [comments, setComments] = useState(dummyComments)
  

  const onComment = (newComment:Comment)=>{
    
    setComments(prev => [newComment, ...prev])
   
  }
  return (

 <div className="">

<span className=''>
React Nested comment
</span>
<CommentInput onComment={onComment}/>

<div>
  {
    comments.map((comment)=>
    (
       <CommentItem comment={comment}/>
    )

    )
  }
</div>
 </div>

  )
}


const CommentItem = ({comment}) =>{

  const [isReplying, setIsReplying]=useState(false)

  const [comments,setComments] = useState(comment.comments)



  const onComment =(newComment, Comment) =>{

    setComments(prev => [newComment, ...prev])
  }

  return(
    <div><span>{comment.body}</span>
    {
      isReplying ? (<button onClick={ ()=> setIsReplying(false)}>Cancel</button>) : (<button onClick={ () => setIsReplying(true)}>Reply</button>)
    }
    {
      isReplying &&
      (<CommentInput onComment={onComment}/>)
      }
      {
    comments.map((comment)=>
    (
       <CommentItem comment={comment}/>
    )

    )
  }
    </div>
  )
}

interface CommentInputProps {
  onComment:(newComment: Comment) => void
}

const CommentInput = ({onComment}: CommentInputProps) =>{

  const [commentBody, setCommentBody] = useState('')

 

  return(
    <div>
       <input type="" value={commentBody} onChange={event => setCommentBody(event.target.value)} />
    
    <button onClick={()=> {
      onComment({body: commentBody, comments:[]});
      setCommentBody('')
    } 
  }>comment</button>

    </div>
   
  )

}
