import React, { useRef, useEffect, useState } from "react";
import styles from "./MusicFooter.module.css";

const MusicFooter = ({ currentlyPlaying }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (currentlyPlaying && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch((err) => console.error("Playback failed", err));
      setIsPlaying(true);
    }
  }, [currentlyPlaying]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    setProgress(audio.currentTime);
    setDuration(audio.duration || 0);
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    const newTime = e.target.value;
    audio.currentTime = newTime;
    setProgress(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60) || 0;
    const secs = Math.floor(seconds % 60) || 0;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (!currentlyPlaying) return null; // Nothing to render if no song selected

  return (
    <div className={styles.footerContainer}>
      <audio
        ref={audioRef}
        src={currentlyPlaying.previewUrl}
        onTimeUpdate={handleTimeUpdate}
        preload="metadata"
      />

      {/* Play/Pause Button */}
      <div className={styles.leftControls}>
        <button onClick={togglePlayPause} className={styles.playPauseButton}>
          {isPlaying ? "⏸️" : "▶️"}
        </button>
      </div>

      {/* Song Info and Progress */}
      <div className={styles.centerControls}>
        <div className={styles.songInfo}>
          <strong>{currentlyPlaying.title}</strong> &nbsp;
          <span>{currentlyPlaying.artist}</span>
        </div>
        <div className={styles.progressBar}>
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

      {/* Volume */}
      <div className={styles.rightControls}>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className={styles.volumeSlider}
        />
        <span className={styles.volumeIcon}>🔊</span>
      </div>
    </div>
  );
};

export default MusicFooter;

