import React, { useState, useEffect } from "react";
import "./Thread.css";
import Post from "./components/Post";
import Reply from "./components/Reply";
import JohnAvatar from "./assets/John.webp"; // Import John's avatar
import JaneAvatar from "./assets/Jane.jpg"; // Import Jane's avatar

function Thread() {
  const [thread, setThread] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [userReaction, setUserReaction] = useState(null);

  // Fetch the thread by ID when the component mounts
  useEffect(() => {
    const fetchThread = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/threads/67d39bf428871793c477dbd4");
        if (!response.ok) {
          throw new Error("Failed to fetch thread");
        }
        const data = await response.json();
        console.log("Fetched thread data:", data); // Debugging
        setThread(data);
      } catch (error) {
        console.error("Error fetching thread:", error);
      }
    };

    fetchThread();
  }, []);

  // Show a loading message while fetching the thread
  if (!thread) {
    return <div>Loading...</div>;
  }

// Handle like for the main post
const handleLike = async () => {
  try {
    let newLikeCount = thread.likeCount;
    let newDislikeCount = thread.dislikeCount;

    if (userReaction === "like") {
      // If the user already liked the post, remove the like
      newLikeCount -= 1;
      setUserReaction(null); // Reset user reaction
    } else {
      // If the user is liking the post, remove any existing dislike
      if (userReaction === "dislike") {
        newDislikeCount -= 1;
      }
      newLikeCount += 1;
      setUserReaction("like"); // Set user reaction to like
    }

    // Send the update to the server
    const response = await fetch(`http://localhost:5000/api/threads/${thread._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likeCount: newLikeCount,
        dislikeCount: newDislikeCount,
      }),
    });

    const updatedThread = await response.json();
    setThread(updatedThread);
  } catch (error) {
    console.error("Error updating like:", error);
  }
};

// Handle dislike for the main post
const handleDislike = async () => {
  try {
    let newLikeCount = thread.likeCount;
    let newDislikeCount = thread.dislikeCount;

    if (userReaction === "dislike") {
      // If the user already disliked the post, remove the dislike
      newDislikeCount -= 1;
      setUserReaction(null); // Reset user reaction
    } else {
      // If the user is disliking the post, remove any existing like
      if (userReaction === "like") {
        newLikeCount -= 1;
      }
      newDislikeCount += 1;
      setUserReaction("dislike"); // Set user reaction to dislike
    }

    // Send the update to the server
    const response = await fetch(`http://localhost:5000/api/threads/${thread._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likeCount: newLikeCount,
        dislikeCount: newDislikeCount,
      }),
    });

    const updatedThread = await response.json();
    setThread(updatedThread);
  } catch (error) {
    console.error("Error updating dislike:", error);
  }
};

  // Handle reply submission
  const handleReplySubmit = async () => {
    if (replyText.trim()) {
      try {
        const response = await fetch(`http://localhost:5000/api/threads/${thread._id}/replies`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "Current User",
            avatar: "https://example.com/current_user_avatar.webp", // Replace with actual avatar URL
            content: replyText,
            timestamp: new Date().toISOString(),
            likeCount: 0,
            dislikeCount: 0,
          }),
        });
        const updatedThread = await response.json();
        setThread(updatedThread);
        setReplyText("");
      } catch (error) {
        console.error("Error submitting reply:", error);
      }
    }
  };

// Handle like for replies
const handleReplyLike = async (replyId) => {
  try {
    const reply = thread.replies.find((reply) => reply._id === replyId);
    if (!reply) {
      console.error("Reply not found");
      return;
    }

    let newLikeCount = reply.likeCount;
    let newDislikeCount = reply.dislikeCount;

    if (reply.userReaction === "like") {
      // If the user already liked the reply, remove the like
      newLikeCount -= 1;
      reply.userReaction = null; // Reset user reaction
    } else {
      // If the user is liking the reply, remove any existing dislike
      if (reply.userReaction === "dislike") {
        newDislikeCount -= 1;
      }
      newLikeCount += 1;
      reply.userReaction = "like"; // Set user reaction to like
    }

    // Send the update to the server
    const response = await fetch(`http://localhost:5000/api/threads/${thread._id}/replies/${replyId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likeCount: newLikeCount,
        dislikeCount: newDislikeCount,
        userReaction: reply.userReaction, // Send the updated userReaction
      }),
    });

    const updatedThread = await response.json();
    setThread(updatedThread);
  } catch (error) {
    console.error("Error updating reply like:", error);
  }
};

// Handle dislike for replies
const handleReplyDislike = async (replyId) => {
  try {
    const reply = thread.replies.find((reply) => reply._id === replyId);
    if (!reply) {
      console.error("Reply not found");
      return;
    }

    let newLikeCount = reply.likeCount;
    let newDislikeCount = reply.dislikeCount;

    if (reply.userReaction === "dislike") {
      // If the user already disliked the reply, remove the dislike
      newDislikeCount -= 1;
      reply.userReaction = null; // Reset user reaction
    } else {
      // If the user is disliking the reply, remove any existing like
      if (reply.userReaction === "like") {
        newLikeCount -= 1;
      }
      newDislikeCount += 1;
      reply.userReaction = "dislike"; // Set user reaction to dislike
    }

    // Send the update to the server
    const response = await fetch(`http://localhost:5000/api/threads/${thread._id}/replies/${replyId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likeCount: newLikeCount,
        dislikeCount: newDislikeCount,
        userReaction: reply.userReaction, // Send the updated userReaction
      }),
    });

    const updatedThread = await response.json();
    setThread(updatedThread);
  } catch (error) {
    console.error("Error updating reply dislike:", error);
  }
};

  return (
    <div className="thread-container">
      <header className="header">
        <a href="/homepage" className="banner">ThreadNet</a>
        <a href="/profile" className="profile">My Profile</a>
      </header>

      <div className="container">
        <h2>{thread.title}</h2>
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
      key={reply._id} // Use _id for MongoDB documents
      reply={reply}
      onLike={() => handleReplyLike(reply._id)}
      onDislike={() => handleReplyDislike(reply._id)}
      userReaction={reply.userReaction} // Pass userReaction to Reply component
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