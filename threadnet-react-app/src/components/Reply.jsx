import React from "react";
import LikeDislikeButtons from "./LikeDislikeButtons";

function Reply({ reply, onLike, onDislike }) {
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
            onLike={() => onLike(reply.id)}
            onDislike={() => onDislike(reply.id)}
            userReaction={reply.userReaction}
          />
          <button className="reply-button">Reply</button>
          <button className="quote-button">Reply with Quote</button>
        </div>
      </div>
    </div>
  );
}

export default Reply;