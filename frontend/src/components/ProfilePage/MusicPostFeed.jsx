import React, { useState } from "react";
import MusicPost from "./MusicPost";
import NewPostButton from "../NewPostButton";
import NewPostModal from "../NewPostModal";
import styles from "./MusicPostFeed.module.css";
import { useProfile } from "../../context/ProfileContext";
import MusicFooter from "../FooterBar/MusicFooter";

const MusicPostFeed = () => {
  const { profile } = useProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  return (
    <div className={styles.feedContainer}>
      {(profile.posts || []).map((post) => (
        <MusicPost 
          key={post.id}
          text={post.text}
          song={post.song}
          onPlay={() => setCurrentlyPlaying(post.song)} 
        />
      ))}

      <MusicFooter currentlyPlaying={currentlyPlaying} />

      <NewPostButton onClick={() => setIsModalOpen(true)} />

      {isModalOpen && (
        <NewPostModal
          onClose={() => setIsModalOpen(false)}
          // ❗ REMOVE onSubmit, NewPostModal updates ProfileContext itself now
        />
      )}
    </div>
  );
};

export default MusicPostFeed;

