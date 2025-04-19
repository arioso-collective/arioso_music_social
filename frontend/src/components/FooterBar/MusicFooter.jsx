import { useRef, useState, useEffect } from "react";
import "./MusicFooter.css";
//import soulSyrup from '../../assets/Ketsa - Soul Syrup.mp3'; // Replace with your own or mock

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTFIY_CLIENT_SECRET;

const MusicFooter = () => {
  const audioRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackInfo, setTrackInfo] = useState({ title: "", artist: "", image: "" });
  const [loading, setLoading] = useState(true);

  // 1️⃣ Fetch Spotify token
  const fetchToken = async () => {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
  
    const credentials = btoa(`${clientId}:${clientSecret}`);
  
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`,
      },
      body: 'grant_type=client_credentials'
    });
  
    const data = await response.json();
    console.log("Fetched Token Response:", data); // ✅ Add this
  
    if (!data.access_token) {
      throw new Error("Failed to fetch Spotify token");
    }
  
    return data.access_token;
  };  

  // 2️⃣ Fetch song preview
  const fetchTrackPreview = async (token, trackName) => {
    const query = encodeURIComponent(trackName);
    const res = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    const data = await res.json();
    console.log("Spotify API Response (raw):", data);  // <-- ADD THIS 🔥
  
    if (!data.tracks) {
      console.error("No tracks found!", data);
      setLoading(false);
      return;
    }
  
    const track = data.tracks.items[0];
    if (track && track.preview_url) {
      setPreviewUrl(track.preview_url);
      setTrackInfo({
        title: track.name,
        artist: track.artists[0].name,
        image: track.album.images[0].url,
      });
    } else {
      setPreviewUrl(null);
    }
    setLoading(false);
  };
  

  useEffect(() => {
    const initSpotify = async () => {
      try {
        const token = await fetchToken();
        await fetchTrackPreview(token, "Shape of You"); // you can make this dynamic later
      } catch (error) {
        console.error("Error fetching track:", error);
        setLoading(false);
      }
    };

    initSpotify();
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (loading) {
    return <div className="music-footer">Loading song preview...</div>;
  }

  if (!previewUrl) {
    return <div className="music-footer">No preview available for this song.</div>;
  }

  return (
    <div className="music-footer">
      <audio ref={audioRef} src={previewUrl} />

      <div className="left-controls">
        <button onClick={togglePlay}>
          {isPlaying ? "⏸️" : "▶️"}
        </button>
      </div>

      <div className="center-info">
        <div className="song-info horizontal">
          <strong>{trackInfo.title}</strong>
          <span className="separator"></span>
          <p>{trackInfo.artist}</p>
        </div>
      </div>

      <div className="volume-control">
        {/* Your existing volume logic can stay */}
      </div>
    </div>
  );
};

export default MusicFooter;
