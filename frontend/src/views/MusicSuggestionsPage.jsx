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
      // 1. Get GPT response
      const gptRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: input }],
        }),
      });
  
      const gptData = await gptRes.json();
      const gptReply = gptData.choices[0].message.content.trim();
  
      // 2. Show GPT reply
      const botMsg = { sender: "bot", text: gptReply };
      setMessages((prev) => [...prev, botMsg]);
  
      // 3. Use original input to search iTunes
      const searchTerm = encodeURIComponent(input);
      const musicRes = await fetch(`https://itunes.apple.com/search?term=${searchTerm}&media=music&limit=5`);
      const musicData = await musicRes.json();
  
      // 4. Show top 5 song previews
      if (musicData.results.length > 0) {
        musicData.results.forEach((track) => {
          const musicMsg = {
            sender: "bot",
            text: `${track.trackName} by ${track.artistName}`,
            previewUrl: track.previewUrl,
          };
          setMessages((prev) => [...prev, musicMsg]);
        });
      } else {
        setMessages((prev) => [...prev, { sender: "bot", text: "No matching tracks found on iTunes." }]);
      }
  
    } catch (err) {
      console.error("Fetch error:", err);
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
