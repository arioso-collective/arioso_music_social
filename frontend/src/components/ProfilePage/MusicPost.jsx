import React from "react";
import styles from "./MusicPost.module.css";
import Comments from "./Comments";
import Likes from "./Likes";

const MusicPost = ({ text, song, path }) => {
  return (
    <div className={styles.postContainer}>
      <p>{text}</p>
      <div className={styles.songEmbed}>🎶 {song}
        {path && (
          <div className={styles.audioPlayer}>
            <audio
              data-testid="audio-player"
              src={path}
              preload="metadata"
              className={styles.audioElement}
              controls
              controlsList="noplaybackrate"
            />
          </div>
        )}
        <div className={styles.postBottomRow}>
          <div className={styles.commentsContainer}>
            <Comments />
          </div>
          <div className={styles.likesContainer}>
            <Likes />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPost;
