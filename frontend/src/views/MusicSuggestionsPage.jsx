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
      // Step 1: Get search term from GPT
      const searchTermRes = await fetch("https://api.openai.com/v1/chat/completions", {
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
              content: `Extract just the most relevant search term (like artist, genre, or mood) from: "${input}". Respond with only the term.`,
            },
          ],
        }),
      });
  
      const searchTermData = await searchTermRes.json();
      let searchTerm = searchTermData.choices[0].message.content.trim();
  
      console.log("🎯 Raw GPT search term:", searchTerm);
  
      // Sanitize and fallback
      searchTerm = searchTerm.replace(/["'`:.]/g, "").trim();
      if (searchTerm.length === 0 || searchTerm.split(" ").length > 6) {
        console.log("⚠️ GPT search term invalid, falling back to user input.");
        searchTerm = input;
      }
  
      // Step 2: GPT fun intro line
      const introRes = await fetch("https://api.openai.com/v1/chat/completions", {
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
              content: `Write a fun sentence to introduce a playlist based on: "${input}"`,
            },
          ],
        }),
      });
  
      const introData = await introRes.json();
      const introText = introData.choices[0].message.content.trim();
      setMessages((prev) => [...prev, { sender: "bot", text: introText }]);
  
      // Step 3: Use search term for iTunes
      const encodedTerm = encodeURIComponent(searchTerm);
      const musicRes = await fetch(`https://itunes.apple.com/search?term=${encodedTerm}&media=music&limit=5`);
  
      if (!musicRes.ok) throw new Error("iTunes API failed");
      const musicData = await musicRes.json();
  
      console.log("🎶 iTunes results:", musicData);
  
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
      console.error("🔥 Error during sendMessage:", err);
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
