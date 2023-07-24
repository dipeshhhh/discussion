import React from 'react'

const Comment = ({comment, replies}) => {
   
console.log(replies)
  return (

<div className='comment'>
 <div className='comment-image-container'>
    <img src='' />
 </div>
 <div className='comment-right-part'>
    <div className='comment-content'>
        <div className='comment-author'>{comment.auth}</div>
        <div>{comment.created_at}</div>
    </div>
    <div className='comment-text'>{comment.body}</div>
 </div>

</div>
  

  )
}

export default Comment