import React, { useState } from "react";
import { MdChatBubble } from "react-icons/md";
import styles from "./Comments.module.css";

const Comments = () => {
  const [showComments, setShowComments] = useState(false);
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
      <button
        className={styles.commentIconButton}
        onClick={() => setShowComments(!showComments)}
      >
        <MdChatBubble size={30} />
      </button>

      {showComments && (
        <div className={styles.commentSection}>
          <ul className={styles.commentsList}>
            {comments.map((comment, index) => (
              <li key={index} className={styles.commentItem}>
                {comment}
              </li>
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
      )}
    </div>
  );
};

export default Comments;
