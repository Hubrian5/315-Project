import React from "react";
import LikeDislikeButtons from "./LikeDislikeButtons";

function Reply({ reply, onLike, onDislike, userReaction, onDelete, onReply, onQuoteReply}) {
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
        <div className="reply-message">
          {reply.content.includes("said:") ? (
            <>
              <div className="quote-box">
                <p className="quote-author">{reply.content.split(' said:')[0]} said:</p>
                <div className="quote-content">
                  "{reply.content.split(' said:')[1].trim()}"
                </div>
              </div>
              <p>{reply.content.split(' said:')[1].trim()}</p>
            </>
          ) : (
            <p>{reply.content}</p>
          )}
        </div>
        <div className="reply-actions">
          <LikeDislikeButtons
            likeCount={reply.likeCount}
            dislikeCount={reply.dislikeCount}
            onLike={onLike}
            onDislike={onDislike}
            userReaction={userReaction}
          />
          <button className="reply-button" onClick={() => onReply(reply.username)}>Reply</button>
          <button className="quote-button" onClick={() => onQuoteReply(reply.username, reply.content)}>Reply with Quote</button>
          <button className="delete-button" onClick={onDelete}>🗑️ Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Reply;