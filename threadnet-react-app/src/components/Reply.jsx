import React from "react";
import LikeDislikeButtons from "./LikeDislikeButtons";

function Reply({ reply, onLike, onDislike, userReaction, onDelete }) {
  return (
    <div className="reply">
      <div className="reply-sidebar">
        <img src={reply.avatar} alt={reply.username} className="avatar" />
        <div className="reply-username">{reply.username}</div>
      </div>
      <div className="reply-content">
        <div className="reply-header">
          <span className="timestamp">{reply.timestamp}</span>
        </div>
        <p>{reply.content}</p>
        <div className="reply-actions">
          <LikeDislikeButtons
            likeCount={reply.likeCount}
            dislikeCount={reply.dislikeCount}
            onLike={onLike}
            onDislike={onDislike}
            userReaction={userReaction}
          />
          <button className="reply-button">Reply</button>
          <button className="quote-button">Reply with Quote</button>
          <button className="delete-button" onClick={onDelete}>🗑️ Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Reply;