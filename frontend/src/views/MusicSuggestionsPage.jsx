import { useState } from "react";
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
      // Step 1: Ask GPT to give a list of real songs for the request
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
  
      // Step 2: Show GPT's response as a single message
      //setMessages((prev) => [...prev, { sender: "bot", text: gptReply }]);
  
      // Step 3: Parse list of songs from GPT response
      const songLines = gptReply
        .split("\n")
        .map(line => line.replace(/^\d+\.\s*/, "").trim())
        .filter(line => line.toLowerCase().includes(" by "));
  
      // Step 4: For each song, search iTunes and show preview
        for (const song of songLines) {
          const encoded = encodeURIComponent(song);
          const res = await fetch(`https://itunes.apple.com/search?term=${encoded}&media=music&limit=1`);
          if (!res.ok) continue;
        
          const data = await res.json();
          const track = data.results[0];
        
          if (track && track.previewUrl) {
            const musicMsg = {
              sender: "bot",
              text: `${track.trackName} by ${track.artistName}`,
              previewUrl: track.previewUrl,
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
        <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}
        {msg.previewUrl && (
          <div className="audio-preview">
            <audio controls src={msg.previewUrl}>
              Your browser does not support the audio element.
            </audio>
          </div>
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
