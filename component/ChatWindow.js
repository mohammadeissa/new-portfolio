"use client";

import { useState } from "react";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await response.json();

      if (!data.reply) {
        setMessages([
          ...updatedMessages,
          {
            role: "assistant",
            content: "⚠️ Server error. Check backend logs.",
          },
        ]);
      } else {
        setMessages([...updatedMessages, data.reply]);
      }
    } catch (err) {
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "❌ Error: " + err.message,
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "100px",
        right: "24px",
        width: "340px",
        height: "420px",
        background: "#1e1e1e",
        borderRadius: "12px",
        border: "1px solid #444",
        padding: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        zIndex: 9998,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3 style={{ color: "white", marginBottom: "10px" }}>Portfolio Chatbot</h3>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          backgroundColor: "#111",
          borderRadius: "8px",
          padding: "10px",
          border: "1px solid #333",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.role === "user" ? "right" : "left",
              marginBottom: "8px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                background: m.role === "user" ? "#0070f3" : "#333",
                color: "white",
                padding: "8px 12px",
                borderRadius: "8px",
                whiteSpace: "pre-wrap",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}

        {loading && (
          <div style={{ color: "#aaa", marginTop: "8px" }}>Typing...</div>
        )}
      </div>

      <div style={{ display: "flex", marginTop: "12px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything…"
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #555",
            background: "#222",
            color: "white",
          }}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            marginLeft: "6px",
            padding: "8px 12px",
            background: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "6px",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
