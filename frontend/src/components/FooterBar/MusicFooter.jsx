import { useRef, useState, useEffect } from "react";
import "./MusicFooter.css";
import sampleAudio from "../assets/Ketsa - Soul Syrup.mp3"; // Replace with your own or mock

const MusicFooter = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    setProgress(audio.currentTime);
    setDuration(audio.duration);
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    audio.currentTime = e.target.value;
    setProgress(e.target.value);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60) || 0;
    const secs = Math.floor(seconds % 60) || 0;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="music-footer">
      <audio
        ref={audioRef}
        src={sampleAudio}
        onTimeUpdate={handleTimeUpdate}
        preload="metadata"
      />

      <div className="song-info">
        <strong>Sample Song</strong>
        <p>Sample Artist</p>
      </div>

      <div className="controls">
        <button onClick={togglePlay}>{isPlaying ? "⏸️" : "▶️"}</button>

        <div className="progress-container">
          <span>{formatTime(progress)}</span>
          <input
            type="range"
            min="0"
            max={duration}
            value={progress}
            onChange={handleProgressChange}
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="volume-control">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
        🔊
      </div>
    </div>
  );
};

export default MusicFooter;
