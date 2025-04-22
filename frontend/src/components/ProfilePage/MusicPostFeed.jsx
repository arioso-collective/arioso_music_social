import React, { useState } from "react";
import MusicPost from "./MusicPost";
import NewPostButton from "../NewPostButton";
import NewPostModal from "../NewPostModal";
import styles from "./MusicPostFeed.module.css";

const MusicPostFeed = ({ profile }) => {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!profile) return <div>Loading feed...</div>;

  const handleNewPost = async (newPost) => {
    const token = localStorage.getItem("token");
    const url = newPost.song.replace(/\s+/g, "-").toLowerCase(); // create slug

    const backendPost = {
      caption: newPost.text,
      musicID: newPost.song,
      url
    };

    try {
      const response = await fetch("http://localhost:5001/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(backendPost)
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Failed to create post:", data.error || data);
        return;
      }

      const newFeedPost = {
        id: data.post_id,
        caption: newPost.text,
        musicID: newPost.song,
        url // use the same URL
      };

      setPosts([newFeedPost, ...posts]);
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <div className={styles.feedContainer}>
      {[...posts, ...(profile.posts || [])].map((post, index) => (
        <MusicPost
          key={post.id || post.postId || index}
          text={post.caption}
          song={post.musicID}
          path={post.url}
        />
      ))}

      <NewPostButton onClick={() => setIsModalOpen(true)} />

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
