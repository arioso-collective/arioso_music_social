import React, { useState } from "react";
import MusicPost from "./MusicPost";
import styles from "./MusicPostFeed.module.css";
import { useProfile } from "../../context/ProfileContext";

const MusicPostFeed = () => {
  const { profile } = useProfile();
  const [posts, setPosts] = useState([]);
  const [newText, setNewText] = useState("");
  const [newSong, setNewSong] = useState("");
  const [newPath, setNewPath] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newText.trim() || !newSong.trim()) return; // Require text and song

    const newPost = {
      id: Date.now(),
      text: newText,
      song: newSong,
      path: newPath || "", // optional audio preview
    };

    setPosts([newPost, ...posts]);
    setNewText("");
    setNewSong("");
    setNewPath("");
  };

  return (
    <div className={styles.feedContainer}>
      {/* Post Creation Form */}
      <form className={styles.newPostForm} onSubmit={handleSubmit}>
        <textarea
          placeholder="Share your thoughts about music..."
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          rows="3"
        />
        <input
          type="text"
          placeholder="Song name (e.g., Blinding Lights)"
          value={newSong}
          onChange={(e) => setNewSong(e.target.value)}
        />
        <input
          type="text"
          placeholder="Optional: Song preview URL"
          value={newPath}
          onChange={(e) => setNewPath(e.target.value)}
        />
        <button type="submit" disabled={!newText.trim() || !newSong.trim()}>
          Post
        </button>
      </form>

      {/* Feed of Posts */}
      {[...posts, ...(profile.posts || [])].map((post) => (
        <MusicPost key={post.id} text={post.text} song={post.song} path={post.path} />
      ))}
    </div>
  );
};

export default MusicPostFeed;
