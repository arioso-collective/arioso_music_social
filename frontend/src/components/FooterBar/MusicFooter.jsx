import { useRef, useState, useEffect } from "react";
import styles from "./MusicFooter.module.css";
//import soulSyrup from '../../assets/Ketsa - Soul Syrup.mp3'; // Replace with your own or mock


const MusicFooter = ({ currentlyPlaying }) => {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (currentlyPlaying && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch((err) => {
        console.error("Playback failed:", err);
      });
    }
  }, [currentlyPlaying]);

  if (!currentlyPlaying) {
    return null; // Don't show footer if nothing playing
  }

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
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60) || 0;
    const secs = Math.floor(seconds % 60) || 0;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className={styles.musicFooter}>
      {/* Song Meta: Album Art + Info */}
      <div className={styles.leftSection}>
        <img src={currentlyPlaying.albumArt} alt="Album" className={styles.albumArt} />
        <div className={styles.songDetails}>
          <div className={styles.songTitle}>{currentlyPlaying.title}</div>
          <div className={styles.songArtist}>{currentlyPlaying.artist}</div>
        </div>
      </div>
  
      {/* Progress Bar */}
      <div className={styles.centerSection}>
        <div className={styles.progressContainer}>
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
  
      {/* Volume Control */}
      <div className={styles.rightSection}>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
        <span className={styles.volumeIcon}>🔊</span>
      </div>
  
      {/* Hidden Audio Tag */}
      <audio
        ref={audioRef}
        src={currentlyPlaying.previewUrl}
        onTimeUpdate={handleTimeUpdate}
        preload="metadata"
      />

    </div>
  );
  
};

export default MusicFooter;
