import React, { useState } from "react";
import styles from "./Comments.module.css";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment.trim()]);
      setNewComment("");
    }
  };

  return (
    <div className={styles.commentsContainer}>
      <h4>Comments</h4>
      <ul className={styles.commentsList}>
        {comments.map((comment, index) => (
          <li key={index} className={styles.commentItem}>{comment}</li>
        ))}
      </ul>
      <div className={styles.commentForm}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className={styles.commentInput}
        />
        <button onClick={handleAddComment} className={styles.commentButton}>
          Post
        </button>
      </div>
    </div>
  );
};

export default Comments;
