import React, { useState } from 'react';
import styles from './NewPostModal.module.css';
import { useProfile } from "../context/ProfileContext";

const NewPostModal = ({ onClose, onSubmit }) => {
  const [text, setText] = useState("");
  const [song, setSong] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const { profile, updateProfile } = useProfile();


  const handlePostSubmit = (e) => {
    e.preventDefault();
  
    if (!selectedTrack || !text.trim()) {
      alert("Please select a song and write something!");
      return;
    }
  
    const newPost = {
      id: Date.now(), // Unique ID based on timestamp
      text: text,
      song: selectedTrack.name,
      artist: selectedTrack.artist,
      previewUrl: selectedTrack.previewUrl,
      albumArt: selectedTrack.albumArt,
    };
  
    // Update the profile context with the new post
    updateProfile((prevProfile) => ({
      ...prevProfile,
      posts: [newPost, ...prevProfile.posts], // Add new post at the top
    }));
  
    // Optionally reset form and close modal
    setText("");           // Clear text input
    setSelectedTrack(null);     // Clear selected song
    setSearchResults([]);      // Clear search results
    onClose();              // Close the modal (if you have a function for it)
  
    console.log("✅ New post added:", newPost);
  };
  
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

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to fetch Spotify token:", errorData);
        return null;
      }

      const data = await response.json();
      console.log("Successfully fetched Spotify token ✅:", data.access_token);
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
        console.error("No token available. Cannot search Spotify.");
        return;
      }

      const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=track&limit=5`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!data.tracks || !data.tracks.items) {
        console.error("No tracks found or invalid search response:", data);
        return;
      }

      const tracks = data.tracks.items.map((item) => ({
        id: item.id,
        name: item.name,
        artist: item.artists[0]?.name || "Unknown",
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

            {/* Show search results */}
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

            {/* Show selected track */}
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
          <input
            type="text"
            placeholder="Song Title"
            value={song}
            onChange={(e) => setSong(e.target.value)}
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
