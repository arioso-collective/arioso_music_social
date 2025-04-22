import React, { useState } from "react";
import MusicPost from "./MusicPost";
import NewPostButton from "../NewPostButton";
import NewPostModal from "../NewPostModal";
import styles from "./MusicPostFeed.module.css";
import { useProfile } from "../../context/ProfileContext";

const MusicPostFeed = () => {
  const { profile } = useProfile();
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewPost = (newPost) => {
    const formattedPost = {
      id: Date.now(),
      text: newPost.text,
      song: newPost.song,
      path: "", // could be upgraded later for song preview
      username: profile.username || "Anonymous", // <-- ADD USERNAME when creating a new post
    };
    setPosts([formattedPost, ...posts]);
  };

  return (
    <div className={styles.feedContainer}>
      {[...posts, ...(profile.posts || [])].map((post) => (
        <MusicPost key={post.id} text={post.text} song={post.song} path={post.path} username={post.username} />
      ))}

      {/* Floating Button */}
      <NewPostButton onClick={() => setIsModalOpen(true)} />

      {/* Modal for New Post */}
      {isModalOpen && (
        <NewPostModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleNewPost}
        />
      )}
    </div>
  );
};

export default MusicPostFeed;
