"use client";

import { useState } from "react";

export default function Chatbot() {
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

      if (!response.ok) {
        // backend returned an error like 500
        const errorText = await response.text();
        throw new Error(errorText || "Server Error");
      }

      const data = await response.json();

      // if backend failed to return a message
      if (!data || !data.reply || !data.reply.content) {
        const errorBotMessage = {
          role: "assistant",
          content:
            "⚠️ Something went wrong on the server. Check your API key or backend logs.",
        };
        setMessages([...updatedMessages, errorBotMessage]);
      } else {
        // normal bot message
        setMessages([...updatedMessages, data.reply]);
      }
    } catch (error) {
      // network or server failure
      const errorBotMessage = {
        role: "assistant",
        content:
          "❌ Error: " +
          error.message +
          "\nCheck your `.env.local`, API key, and terminal logs.",
      };
      setMessages([...updatedMessages, errorBotMessage]);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 16,
        borderRadius: 12,
        maxWidth: 500,
        margin: "40px auto",
      }}
    >
      <h2>💬 Portfolio Chatbot</h2>

      <div
        style={{
          height: 300,
          overflowY: "auto",
          border: "1px solid #ddd",
          padding: 12,
          marginBottom: 10,
          borderRadius: 8,
        }}
      >
        {messages
          .filter((m) => m && m.role && m.content) // prevent undefined crash
          .map((m, i) => (
            <div
              key={i}
              style={{
                textAlign: m.role === "user" ? "right" : "left",
                margin: "8px 0",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  background: m.role === "user" ? "#0070f3" : "#eee",
                  color: m.role === "user" ? "white" : "black",
                  padding: "8px 12px",
                  borderRadius: 8,
                  whiteSpace: "pre-wrap",
                }}
              >
                {m.content}
              </div>
            </div>
          ))}

        {loading && (
          <div style={{ textAlign: "left", margin: "8px 0" }}>
            <div
              style={{
                display: "inline-block",
                background: "#eee",
                padding: "8px 12px",
                borderRadius: 8,
              }}
            >
              Typing...
            </div>
          </div>
        )}
      </div>

      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            width: "75%",
            padding: 8,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
          placeholder="Ask me anything..."
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            marginLeft: 8,
            padding: "8px 16px",
            background: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: 6,
            opacity: loading ? 0.5 : 1,
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
