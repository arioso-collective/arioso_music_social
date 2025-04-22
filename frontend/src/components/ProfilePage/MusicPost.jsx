import React from "react";
import styles from "./MusicPost.module.css";

const MusicPost = ({ text, songTitle, onPlay }) => {
  return (
    <div className={styles.postContainer}>
      <p className={styles.textSection}>{text}</p>

      <div className={styles.songSection}>
        <strong>{songTitle}</strong>
        <button onClick={onPlay} className={styles.playButton}>
          ▶️ Play
        </button>
      </div>
    </div>
  );
};

export default MusicPost;

