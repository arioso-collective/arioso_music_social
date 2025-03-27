import React from "react";
import styles from "./MusicPost.module.css";

const MusicPost = ({ text, song, path }) => {
  return (
    <div className={styles.postContainer}>
      <p>{text}</p>
      <div className={styles.songEmbed}>🎶 {song}
        <div className={styles.audioPlayer}>
          <audio
            src={path}
            preload="metadata"
            className={styles.audioElement}
            controls
            controlsList="noplaybackrate"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPost;
