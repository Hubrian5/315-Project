import React from "react";
import LikeDislikeButtons from "./LikeDislikeButtons";

function Post({ post, onLike, onDislike, userReaction }) {
  return (
    <div className="post">
      <div className="post-sidebar">
        <img src={post.avatar} alt={post.username} className="avatar" />
        <div className="post-username">{post.username}</div>
      </div>
      <div className="post-content">
        <div className="post-header">
          <span className="timestamp">{post.timestamp}</span>
        </div>
        <p>{post.content}</p>
        <div className="post-actions">
          <LikeDislikeButtons
            likeCount={post.likeCount}
            dislikeCount={post.dislikeCount}
            onLike={onLike}
            onDislike={onDislike}
            userReaction={userReaction}
          />
          {/* <button className="reply-button">Reply</button> */}
          <button className="quote-button">Reply with Quote</button>
          <button className="edit-button">✏️ Edit</button>
          <button className="delete-button">🗑️ Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Post;