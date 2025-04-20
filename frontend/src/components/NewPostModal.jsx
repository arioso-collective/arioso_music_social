import React, { useState } from 'react';
import styles from './NewPostModal.module.css';

const NewPostModal = ({ onClose, onSubmit }) => {
  const [text, setText] = useState("");
  const [song, setSong] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || !song.trim()) return;
    onSubmit({ text, song });
    setText("");
    setSong("");
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Create a New Post</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Share your thoughts..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="4"
          />
          <input
            type="text"
            placeholder="Song Title"
            value={song}
            onChange={(e) => setSong(e.target.value)}
          />
          <div className={styles.modalButtons}>
            <button type="submit">Post</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPostModal;
