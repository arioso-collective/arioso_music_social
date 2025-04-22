import { useState } from "react";
import TrackItem from "./TrackItem"; // Make sure path is correct
import "./MusicSuggestionsPage.css";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

export default function MusicSuggestionsPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      // Step 1: Get GPT song list
      const gptRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `List 5 real song titles with artist names that are perfect for: "${input}". Respond with just the list.`,
            },
          ],
        }),
      });

      const gptData = await gptRes.json();
      const gptReply = gptData.choices[0].message.content.trim();

      // Step 3: Parse songs and fetch previews
      const songLines = gptReply
        .split("\n")
        .map((line) => line.replace(/^\d+\.\s*/, "").trim())
        .filter((line) => line.toLowerCase().includes(" by "));

      for (const song of songLines) {
        const encoded = encodeURIComponent(song);
        const res = await fetch(`https://itunes.apple.com/search?term=${encoded}&media=music&limit=1`);
        if (!res.ok) continue;

        const data = await res.json();
        const track = data.results[0];

        if (track && track.previewUrl) {
          const musicMsg = {
            sender: "bot",
            type: "track",
            track: {
              trackName: track.trackName,
              artistName: track.artistName,
              previewUrl: track.previewUrl,
              artworkUrl100: track.artworkUrl100,
            },
          };
          setMessages((prev) => [...prev, musicMsg]);
        }
      }
    } catch (err) {
      console.error("Error in sendMessage:", err);
      setMessages((prev) => [...prev, { sender: "bot", text: "Oops! Something went wrong." }]);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <div className="chat-container">
      <h2>🎵 Music Suggestions</h2>

      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.sender}`}>
            {msg.type === "track" ? (
              <TrackItem track={msg.track} query={input} searchBy="title" />
            ) : (
              <p>{msg.text}</p>
            )}
          </div>
        ))}
        {loading && <div className="chat-message bot">Bot is thinking...</div>}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask for music like 'chill beats for studying'"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
