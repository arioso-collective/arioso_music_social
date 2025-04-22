import React, { useState } from 'react';
import styles from './NewPostModal.module.css';
import { useProfile } from "../context/ProfileContext";

const NewPostModal = ({ onClose }) => {
  const { profile, updateProfile } = useProfile();
  const [text, setText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);

  const fetchSpotifyToken = async () => {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      console.error("Client ID or Client Secret is missing!");
      return null;
    }

    const credentials = btoa(`${clientId}:${clientSecret}`); // Base64 encode

    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${credentials}`,
        },
        body: "grant_type=client_credentials",
      });

      const data = await response.json();
      return data.access_token;
    } catch (err) {
      console.error("Error fetching Spotify token:", err);
      return null;
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      const token = await fetchSpotifyToken();
      if (!token) {
        console.error("No token available.");
        return;
      }

      const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=track&limit=5`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      const tracks = data.tracks.items.map((item) => ({
        id: item.id,
        name: item.name,
        artist: item.artists.map(a => a.name).join(", "),
        previewUrl: item.preview_url,
        albumArt: item.album?.images?.[0]?.url || "",
      }));

      setSearchResults(tracks);
    } catch (err) {
      console.error("Error searching Spotify:", err);
    }
  };

  const handleSelectTrack = (track) => {
    setSelectedTrack(track);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();

    if (!selectedTrack || !text.trim()) {
      alert("Please select a song and write something!");
      return;
    }

    const newPost = {
      id: Date.now(),
      text: text,
      song: selectedTrack.name,
      artist: selectedTrack.artist,
      previewUrl: selectedTrack.previewUrl,
      albumArt: selectedTrack.albumArt,
    };

    updateProfile({
      posts: [newPost, ...profile.posts],
    });

    setText("");
    setSearchTerm("");
    setSearchResults([]);
    setSelectedTrack(null);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Create a New Post</h2>
        <form onSubmit={handlePostSubmit}>
          <div className="song-search-section">
            <input
              type="text"
              placeholder="Search for a song..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="button" onClick={handleSearch}>Search</button>

            <div className="search-results">
              {searchResults.map((track) => (
                <div
                  key={track.id}
                  className="search-result-item"
                  onClick={() => handleSelectTrack(track)}
                >
                  {track.name} by {track.artist}
                </div>
              ))}
            </div>

            {selectedTrack && (
              <div className="selected-track">
                Selected: <strong>{selectedTrack.name}</strong> by {selectedTrack.artist}
              </div>
            )}
          </div>
          <textarea
            placeholder="Share your thoughts..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="4"
          />
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
