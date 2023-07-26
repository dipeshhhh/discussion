import React, { useState } from "react";
import Comment from "./comment";
import { debounce } from "./utils";

export default function Comments() {
  let [commentInput, setCommentInput] = useState("");
  let [comments, setComments] = useState([
    {
      id: 1,
      display: "c1",
      children: [
        {
          id: 2,
          display: "c11",
          children: []
        },
        {
          id: 3,
          display: "c12",
          children: []
        }
      ]
    }
  ]);

  function addReply(commentId, replyText) {
    let commentsWithNewReply = [...comments];
    insertComment(commentsWithNewReply, commentId, replyText);
    setComments(commentsWithNewReply);
  }

  function newComment(text) {
    return {
      id: new Date().getTime(),
      display: text,
      children: []
    };
  }

  function insertComment(comments, parentId, text) {
    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      if (comment.id === parentId) {
        comment.children.unshift(newComment(text));
      }
    }

    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      insertComment(comment.children, parentId, text);
    }
  }

  return (
    <>
      <div className="comment-input-box">
        <textarea
          rows="4"
          cols="50"
          value={commentInput}
          onChange={(e) => {
            debounce(setCommentInput(e.target.value));
          }}
        />
        <br />
        <button
          onClick={() => {
            setComments([newComment(commentInput), ...comments]);
            setCommentInput("");
          }}
        >
          Submit
        </button>
      </div>
      <ul>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} addReply={addReply} />
        ))}
      </ul>
    </>
  );
}
