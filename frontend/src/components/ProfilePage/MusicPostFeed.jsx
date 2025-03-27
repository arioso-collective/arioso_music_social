import React from "react";
import MusicPost from "./MusicPost";
import styles from "./MusicPostFeed.module.css";
import { useProfile } from "../../context/ProfileContext";

// TODO: Add posts from the database
// Posts will need to be stored in the database and fetched from there

const MusicPostFeed = () => {
  const { profile } = useProfile();

  return (
    <div className={styles.feedContainer}>
      {profile.posts.map((post) => (
        <MusicPost key={post.id} text={post.text} song={post.song} path={post.path} />
      ))}
    </div>
  );
};

export default MusicPostFeed;
