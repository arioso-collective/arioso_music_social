// src/views/MusicSearchPage.jsx

import { useState, useEffect } from "react";

function MusicSearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length >= 2) {
        searchMusic(query);
      } else {
        setResults([]);
      }
    }, 300); // debounce delay

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const searchMusic = async (term) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=music&limit=10`
      );
      const data = await res.json();
      setResults(data.results);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Music Search</h2>
      <input
        type="text"
        placeholder="Search for music..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded"
      />

      {loading && <p className="mt-4">Loading...</p>}

      {!loading && results.length > 0 && (
        <ul className="mt-6 space-y-4">
          {results.map((track) => (
            <li key={track.trackId} className="border-b pb-3">
              <div className="font-semibold">{track.trackName}</div>
              <div className="text-sm text-gray-600">{track.artistName}</div>
              {track.previewUrl && (
                <audio controls className="mt-2">
                  <source src={track.previewUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MusicSearchPage;
