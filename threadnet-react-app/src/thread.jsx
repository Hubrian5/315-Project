import { useState } from "react";
import "./Thread.css";
import JohnAvatar from "./assets/John.webp";

function Thread() {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  const handleLike = () => setLikeCount(likeCount + 1);
  const handleDislike = () => setDislikeCount(dislikeCount + 1);

  return (
    <div className="thread-container">
      <header className="header">
        <a href="/" className="banner">ThreadNet</a>
        <a href="/profile" className="profile">My Profile</a>
      </header>

      <div className="container">
        <h2>HELP LOOP PROBLEM</h2>
        <div className="post">
          <div className="post-sidebar">
            <img src={JohnAvatar} alt="John Balatro" className="avatar" />
            <div className="post-username">John Balatro</div>
          </div>
          <div className="post-content">
            <div className="post-header">
              <span className="timestamp">Posted on 01/29/2025</span>
            </div>
            <p>
              Hey, I was having problem with my loops in C and was wondering if anyone could take a look at what I'm doing wrong.
            </p>
            <div className="post-actions">
              <button className="like-button" onClick={handleLike}>
                👍 Like <span className="like-count">{likeCount}</span>
              </button>
              <button className="dislike-button" onClick={handleDislike}>
                👎 Dislike <span className="dislike-count">{dislikeCount}</span>
              </button>
              <button className="reply-button">Reply</button>
              <button className="quote-button">Reply with Quote</button>
              <button className="edit-button">✏️ Edit</button>
              <button className="delete-button">🗑️ Delete</button>
            </div>
          </div>
        </div>

        <div className="reply-section">
          <h3>Reply</h3>
          <textarea className="reply-box" placeholder="Write your reply..."></textarea>
          <button className="reply-button">Post Reply</button>
        </div>
      </div>
    </div>
  );
}

export default Thread;