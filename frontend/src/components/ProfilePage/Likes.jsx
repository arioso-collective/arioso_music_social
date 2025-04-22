import React, { useState } from "react";
import styles from "./Likes.module.css";

const Likes = ({ initialLikes = 0 }) => {
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  const handleLikeToggle = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className={styles.likesContainer}>
      <button onClick={handleLikeToggle} className={styles.likeButton}>
        {liked ? "❤️" : "💜"}
      </button>
      <span>{likeCount} likes</span>
    </div>
  );
};

export default Likes;
