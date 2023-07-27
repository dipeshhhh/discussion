import React, { useState, useRef } from "react";

export default function Comment({ comment, addReply }) {
  const [replyText, setReplyText] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);
  const inputEl = useRef(null);

  return (
    <li key={comment.id}>
      {comment.display}
      {!showReplyBox && (
        <button
          type="button"
          className="ml-3 mr-3"
          onClick={() => {
            setShowReplyBox(true);

            // This is to make the ref available
            setTimeout(() => inputEl.current.focus());
          }}
        >
          Reply
        </button>
      )}
      {showReplyBox && (
        <>
          <br />
          <textarea
            ref={inputEl}
            onChange={(e) => {
              setReplyText(e.target.value);
            }}
            type="text"
          />
          <br />
          <button
            type="button"
            onClick={() => {
              addReply(comment.id, replyText);
              setShowReplyBox(false);
              setReplyText("");
            }}
          >
            save
          </button>
          <button
            type="button"
            onClick={() => {
              setShowReplyBox(false);
              setReplyText("");
            }}
          >
            cancel
          </button>
        </>
      )}
      {comment.children.length > 0 && (
        <ul>
          {comment.children.map((childComment) => (
            <Comment
              key={childComment.id}
              comment={childComment}
              addReply={addReply}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
