import { useState, useEffect } from "react";
import TrackItem from "./TrackItem"; 
import './MusicSearchPage.css';

function MusicSearchPage({onSongSelect}) {
  const [query, setQuery] = useState("");
  const [searchBy, setSearchBy] = useState("title"); // "title" or "artist"
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length >= 1) {
        searchMusic(query);
      } else {
        setResults([]);
      }
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [query, searchBy]);

  const searchMusic = async (term) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=music&limit=100`
      );
      const data = await res.json();

      const filtered = data.results.filter((track) => {
        const field = searchBy === "title" ? track.trackName : track.artistName;
        return field && field.toLowerCase().includes(term.toLowerCase());
      });

      setResults(filtered);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setLoading(false);
    }
  };

  const highlightMatch = (text, query) => {
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

  return (
    <div className="music-search-container">
      <h2 className="music-search-title">Search Music</h2>

      <div className="search-controls">
        <select
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
          className="search-dropdown"
        >
          <option value="title">Search by Title</option>
          <option value="artist">Search by Artist</option>
        </select>

        <input
          type="text"
          placeholder={`Search for music by ${searchBy}...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {loading && <p className="status-text">Loading...</p>}

      {!loading && results.length > 0 && (
      <div className="scrollable-results">
        <ul className="results-list">
          {results.map((track) => (
            <TrackItem
              key={track.trackId}
              track={track}
              query={query}
              searchBy={searchBy}
              onClick={() => onSongSelect(track)} 
            />
          ))}
        </ul>
      </div>
    )}


      {!loading && query.length >= 2 && results.length === 0 && (
        <p className="status-text">No results found.</p>
      )}
    </div>
  );
}

export default MusicSearchPage;
