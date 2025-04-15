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
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: input }],
        }),
      });
  
      const data = await res.json();
      const botReply = data.choices[0].message.content.trim();
  
      const botMsg = { sender: "bot", text: botReply };
      setMessages((prev) => [...prev, botMsg]);
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
