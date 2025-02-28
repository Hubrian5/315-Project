import React, { useState } from "react";
import "./Thread.css";
import JohnAvatar from "./assets/John.webp";
import Post from "./components/Post";
import Reply from "./components/Reply";

function Thread() {
  const initialData = {
    id: 1,
    username: "John Balatro",
    avatar: JohnAvatar,
    content: "Hey, I was having problem with my loops in C and was wondering if anyone could take a look at what I'm doing wrong.",
    timestamp: "01/29/2025",
    likeCount: 0,
    dislikeCount: 0,
    replies: [],
  };

  const [thread, setThread] = useState(initialData);
  const [replyText, setReplyText] = useState("");
  const [userReaction, setUserReaction] = useState(null); // Track reaction for the main post

  // Handle like/dislike for the main post
  const handleLike = () => {
    if (userReaction === "like") {
      setThread((prev) => ({ ...prev, likeCount: prev.likeCount - 1 }));
      setUserReaction(null);
    } else {
      setThread((prev) => ({ ...prev, likeCount: prev.likeCount + 1 }));
      if (userReaction === "dislike") {
        setThread((prev) => ({ ...prev, dislikeCount: prev.dislikeCount - 1 }));
      }
      setUserReaction("like");
    }
  };

  const handleDislike = () => {
    if (userReaction === "dislike") {
      setThread((prev) => ({ ...prev, dislikeCount: prev.dislikeCount - 1 }));
      setUserReaction(null);
    } else {
      setThread((prev) => ({ ...prev, dislikeCount: prev.dislikeCount + 1 }));
      if (userReaction === "like") {
        setThread((prev) => ({ ...prev, likeCount: prev.likeCount - 1 }));
      }
      setUserReaction("dislike");
    }
  };

  // Handle like/dislike for replies
  const handleReplyLike = (replyId) => {
    setThread((prev) => ({
      ...prev,
      replies: prev.replies.map((reply) =>
        reply.id === replyId
          ? {
              ...reply,
              likeCount: reply.userReaction === "like" ? reply.likeCount - 1 : reply.likeCount + 1,
              dislikeCount: reply.userReaction === "dislike" ? reply.dislikeCount - 1 : reply.dislikeCount,
              userReaction: reply.userReaction === "like" ? null : "like",
            }
          : reply
      ),
    }));
  };

  const handleReplyDislike = (replyId) => {
    setThread((prev) => ({
      ...prev,
      replies: prev.replies.map((reply) =>
        reply.id === replyId
          ? {
              ...reply,
              dislikeCount: reply.userReaction === "dislike" ? reply.dislikeCount - 1 : reply.dislikeCount + 1,
              likeCount: reply.userReaction === "like" ? reply.likeCount - 1 : reply.likeCount,
              userReaction: reply.userReaction === "dislike" ? null : "dislike",
            }
          : reply
      ),
    }));
  };

  // Handle reply submission
  const handleReplySubmit = () => {
    if (replyText.trim()) {
      const newReply = {
        id: thread.replies.length + 1,
        username: "Current User",
        avatar: JohnAvatar,
        content: replyText,
        timestamp: new Date().toLocaleDateString(),
        likeCount: 0,
        dislikeCount: 0,
        userReaction: null,
      };
      setThread((prev) => ({ ...prev, replies: [...prev.replies, newReply] }));
      setReplyText("");
    }
  };

  return (
    <div className="thread-container">
      <header className="header">
        <a href="/homepage" className="banner">ThreadNet</a>
        <a href="/profile" className="profile">My Profile</a>
      </header>

      <div className="container">
        <h2>HELP LOOP PROBLEM</h2>
        <Post
          post={thread}
          onLike={handleLike}
          onDislike={handleDislike}
          userReaction={userReaction}
        />

        {/* Display replies */}
        <div className="replies">
          {thread.replies.map((reply) => (
            <Reply
              key={reply.id}
              reply={reply}
              onLike={handleReplyLike}
              onDislike={handleReplyDislike}
            />
          ))}
        </div>

        {/* Reply section */}
        <div className="reply-section">
          <h3>Reply</h3>
          <textarea
            className="reply-box"
            placeholder="Write your reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          ></textarea>
          <button className="reply-button" onClick={handleReplySubmit}>
            Post Reply
          </button>
        </div>
      </div>
    </div>
  );
}

export default Thread;