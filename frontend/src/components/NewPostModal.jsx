import React, { useState } from 'react';
import styles from './NewPostModal.module.css';
import MusicSearchPage from '/Users/juluissaelias/arioso/frontend/src/views/MusicSearchPage.jsx';

const NewPostModal = ({ onClose, onSubmit }) => {
  const [text, setText] = useState("");
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || !selectedTrack) return;
  
    const token = localStorage.getItem("token");
  
    const postData = {
      caption: text,
      url: selectedTrack.previewUrl,              // preview audio URL
      musicID: selectedTrack.trackId.toString(),  // unique music identifier
      song: selectedTrack.trackName,              // 🎵 song title
      artist: selectedTrack.artistName            // 🎤 artist name
    };
    ;
  
    try {
      const res = await fetch("http://localhost:5001/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData), // ✅ THIS LINE IS FIXED
      });
  
      const data = await res.json();
      if (res.ok) {
        console.log("✅ Post saved:", data);
        onSubmit(postData);
        setText("");
        setSelectedTrack(null);
        onClose();
      } else {
        console.error("❌ Backend error:", data.error);
      }
    } catch (err) {
      console.error("❌ Network error:", err);
    }
  };
  

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Create a New Post</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Share your thoughts..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="4"
          />
          
          {selectedTrack ? (
            <div className={styles.selectedTrack}>
              <p><strong>{selectedTrack.trackName}</strong> by {selectedTrack.artistName}</p>
              <audio controls src={selectedTrack.previewUrl} />
              <button type="button" onClick={() => setSelectedTrack(null)}>Remove Song</button>
            </div>
          ) : (
            <button type="button" onClick={() => setShowSearch(true)}>
              Search & Select Song
            </button>
          )}

          {showSearch && (
            <div className={styles.searchWrapper}>
              <MusicSearchPage
                onSongSelect={(track) => {
                  setSelectedTrack(track);
                  setShowSearch(false);
                }}
              />
            </div>
          )}

          <div className={styles.modalButtons}>
            <button type="submit">Post</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPostModal;
