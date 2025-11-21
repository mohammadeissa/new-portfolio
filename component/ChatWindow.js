"use client";

import { useState } from "react";

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello, I am the chat assistant for Mohammad's website. If you have any questions about Mohammad or his work, I can assist with that! I also serve as a normal chatbot so feel free to ask me anything else as well!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const startTime = typeof performance !== "undefined" ? performance.now() : null;
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

      // fire and forget analytics
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "message", question: userMessage.content }),
      }).catch(() => {});

      if (startTime !== null) {
        const responseTimeMs = performance.now() - startTime;
        fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "responseTime", responseTimeMs }),
        }).catch(() => {});
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
    <>
      <div
        style={{
          position: "fixed",
          bottom: "96px",
          right: "24px",
          width: "360px",
          height: "480px",
          background: "linear-gradient(160deg, #0b1220 0%, #0f1a2f 100%)",
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.06)",
          padding: "0",
          boxShadow: "0 16px 60px rgba(0,0,0,0.35)",
          zIndex: 9998,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          backdropFilter: "blur(6px)",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #10192e 0%, #15213b 100%)",
            padding: "12px 14px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "12px",
              background:
                "linear-gradient(140deg, #0ea5e9 0%, #22d3ee 40%, #0ea5e9 100%)",
              display: "grid",
              placeItems: "center",
              color: "#0b1220",
              fontWeight: 700,
              letterSpacing: -0.5,
              boxShadow: "0 8px 20px rgba(14,165,233,0.35)",
            }}
          >
            AI
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span style={{ color: "white", fontWeight: 600, fontSize: "15px" }}>
              Mohammad&apos;s Assistant
            </span>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px" }}>
              Here to help with portfolio questions
            </span>
          </div>
          <div style={{ marginLeft: "auto", color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>
            Live
          </div>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "14px",
            background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0))",
          }}
        >
          {messages.map((m, i) => {
            const isUser = m.role === "user";
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: isUser ? "flex-end" : "flex-start",
                  marginBottom: "10px",
                  gap: "8px",
                }}
              >
                {!isUser && (
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "10px",
                      background:
                        "linear-gradient(140deg, #0ea5e9 0%, #22d3ee 40%, #0ea5e9 100%)",
                      display: "grid",
                      placeItems: "center",
                      color: "#0b1220",
                      fontWeight: 700,
                      fontSize: "12px",
                      flexShrink: 0,
                    }}
                  >
                    AI
                  </div>
                )}
                <div
                  style={{
                    maxWidth: "78%",
                    background: isUser
                      ? "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)"
                      : "rgba(255,255,255,0.06)",
                    color: isUser ? "#0c1729" : "white",
                    padding: "10px 12px",
                    borderRadius: isUser
                      ? "16px 6px 18px 16px"
                      : "10px 14px 14px 6px",
                    border: isUser
                      ? "1px solid rgba(255,255,255,0.15)"
                      : "1px solid rgba(255,255,255,0.07)",
                    boxShadow: isUser
                      ? "0 10px 30px rgba(14,165,233,0.25)"
                      : "0 10px 30px rgba(0,0,0,0.35)",
                    whiteSpace: "pre-wrap",
                    lineHeight: 1.45,
                    fontSize: "14px",
                    letterSpacing: "0.1px",
                  }}
                >
                  {m.content}
                </div>
              </div>
            );
          })}

          {loading && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "10px",
                  background:
                    "linear-gradient(140deg, #0ea5e9 0%, #22d3ee 40%, #0ea5e9 100%)",
                  display: "grid",
                  placeItems: "center",
                  color: "#0b1220",
                  fontWeight: 700,
                  fontSize: "12px",
                  flexShrink: 0,
                }}
              >
                AI
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: "12px",
                  padding: "10px 12px",
                  border: "1px solid rgba(255,255,255,0.07)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                }}
              >
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          )}
        </div>

        <div
          style={{
            padding: "12px 14px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            background: "linear-gradient(135deg, #0c1729 0%, #0f1e36 100%)",
            display: "flex",
            gap: "10px",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything…"
            style={{
              flex: 1,
              padding: "12px 14px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.04)",
              color: "white",
              outline: "none",
              fontSize: "14px",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            style={{
              minWidth: "82px",
              padding: "12px 14px",
              background: loading
                ? "linear-gradient(135deg, #0f172a 0%, #0f172a 100%)"
                : "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
              color: loading ? "rgba(255,255,255,0.5)" : "#0c1729",
              border: "none",
              borderRadius: "12px",
              fontWeight: 700,
              letterSpacing: "0.2px",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: loading
                ? "none"
                : "0 10px 30px rgba(14,165,233,0.35)",
              transition: "transform 0.08s ease, box-shadow 0.08s ease",
            }}
          >
            {loading ? "Typing…" : "Send"}
          </button>
        </div>
      </div>

      <style jsx>{`
        .typing-dot {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 50%;
          display: inline-block;
          animation: pulse 1.2s infinite ease-in-out;
        }
        .typing-dot:nth-child(2) {
          animation-delay: 0.15s;
        }
        .typing-dot:nth-child(3) {
          animation-delay: 0.3s;
        }
        @keyframes pulse {
          0% {
            transform: translateY(0);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-3px);
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 0.4;
          }
        }
      `}</style>
    </>
  );
}
