import React from 'react';
import './TrackItem.css';

const highlightMatch = (text, query) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="highlight">{part}</span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
};

export default function TrackItem({ track, query, searchBy = "title", onClick }) {
  return (
    <li className="result-item" onClick={onClick}>
      <img
        src={track.artworkUrl100}
        alt={`${track.trackName} album cover`}
        className="album-art"
      />
      <div className="track-info">
        <div className="track-title">
          {searchBy === "title"
            ? highlightMatch(track.trackName, query)
            : track.trackName}
        </div>
        <div className="artist-name">
          {searchBy === "artist"
            ? highlightMatch(track.artistName, query)
            : track.artistName}
        </div>
        {track.previewUrl && (
          <audio controls className="audio-player">
            <source src={track.previewUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </li>
  );
}
