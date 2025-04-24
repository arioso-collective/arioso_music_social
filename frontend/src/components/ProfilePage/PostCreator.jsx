import React, { useState } from "react";
import MusicSearchPage from "./MusicSearchPage";
import MusicPost from "./MusicPost";

const PostCreator = () => {
  const [text, setText] = useState("");
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const handleSongSelect = (track) => {
    setSelectedTrack(track);
    setShowSearch(false);
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your post..."
      />
      <button onClick={() => setShowSearch(true)}>Add Music</button>

      {showSearch && <MusicSearchPage onSongSelect={handleSongSelect} />}

      {selectedTrack && (
        <div>
          <h3>Selected Song:</h3>
          <p><strong>{selectedTrack.trackName}</strong> by {selectedTrack.artistName}</p>
          <audio src={selectedTrack.previewUrl} controls />
        </div>
      )}

      <h3>Post Preview:</h3>
      <MusicPost
        text={text}
        song={selectedTrack?.trackName || ""}
        path={selectedTrack?.previewUrl || ""}
      />
    </div>
  );
};

export default PostCreator;
