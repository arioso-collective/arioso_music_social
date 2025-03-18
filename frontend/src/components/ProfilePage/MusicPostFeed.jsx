import React from "react";
import MusicPost from "./MusicPost";
import styles from "./MusicPostFeed.module.css";

// TODO: Add posts from the database
// Posts will need to be stored in the database and fetched from there
const posts = [
  { id: 1, text: "Loving this song!", song: "Song 1" },
  { id: 2, text: "Throwback to this classic!", song: "Song 2" },
  { id: 3, text: "This is my favorite song!", song: "Song 3" },
];

const MusicPostFeed = () => {
  return (
    <div className={styles.feedContainer}>
      {posts.map((post) => (
        <MusicPost key={post.id} text={post.text} song={post.song} />
      ))}
    </div>
  );
};

export default MusicPostFeed;
