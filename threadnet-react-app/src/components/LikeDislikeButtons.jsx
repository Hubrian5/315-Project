import React from "react";

function LikeDislikeButtons({ likeCount, dislikeCount, onLike, onDislike, userReaction }) {
  return (
    <>
      <button
        className={`like-button ${userReaction === "like" ? "active" : ""}`}
        onClick={onLike}
      >
        👍 Like <span className="like-count">{likeCount}</span>
      </button>
      <button
        className={`dislike-button ${userReaction === "dislike" ? "active" : ""}`}
        onClick={onDislike}
      >
        👎 Dislike <span className="dislike-count">{dislikeCount}</span>
      </button>
    </>
  );
}

export default LikeDislikeButtons;