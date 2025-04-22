import React from "react";
import styles from "./MusicPost.module.css";

const MusicPost = ({ text, song, onPlay }) => {
  return (
    <div className={styles.postContainer}>
      <p>{text}</p>

      <div className={styles.songInfo}>
        <img src={song.albumArt} alt="Album cover" className={styles.albumArt} />
        <div className={styles.songDetails}>
          <strong>{song.title}</strong> by {song.artist}
        </div>
        <button onClick={onPlay} className={styles.playButton}>▶️ Play</button>
      </div>
    </div>
  );
};

export default MusicPost;

