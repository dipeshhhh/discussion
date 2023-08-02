import React, {useState} from 'react'

export const Comment = ({comment}) => {

    const [input, setInput] = useState('')

   const onAddcomment = ()=>{

   }

   console.log(comment)

  return (
    <div>
        <div>
            {
                comment.id === 1 ? (

                    <>
                    <input type="text"
            placeholder='type.....'
            value={input}
            onChange={(e)=>{setInput(e.target.value)}}
            />
            <div onClick={onAddcomment}>Comment</div>
                    </>

                ) :
                (
                    <span style={{wordWrap:'break-word'}}>{comment.name}</span>
                )
            }
            
        </div>
            {
                comment?.items?.map((cmnt)=>{
                   return <Comment key={cmnt.id} comment={cmnt}/>
                })
        }         

    </div>
  )
  
}

export default Comment