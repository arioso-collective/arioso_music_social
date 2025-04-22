import React, { useState, useEffect } from "react";
import { MdChatBubble } from "react-icons/md";
import styles from "./Comments.module.css";

const Comments = ({ postUrl }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const token = localStorage.getItem("token");

  const fetchComments = async () => {
    console.log("💬 postUrl received by Comments:", postUrl);
    try {
      const res = await fetch(`http://localhost:5001/api/get_comment/${postUrl}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setComments(data);
      } else {
        console.error("Unexpected comment format", data);
      }
    } catch (err) {
      console.error("Failed to load comments", err);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    try {
      const res = await fetch(`http://localhost:5001/api/create_comment/${postUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ comment: newComment })
      });

      const data = await res.json();

      if (res.ok) {
        setComments([{ comment: newComment, createdAt: new Date().toISOString() }, ...comments]);
        setNewComment("");
      } else {
        console.error("Failed to post comment", data.error || data);
      }
    } catch (err) {
      console.error("Error creating comment", err);
    }
  };

  useEffect(() => {
    if (showComments && postUrl) {
      fetchComments();
    }
  }, [showComments, postUrl]);
  

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
            {comments.map((c, index) => (
              <li key={index} className={styles.commentItem}>
                {c.comment}
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
