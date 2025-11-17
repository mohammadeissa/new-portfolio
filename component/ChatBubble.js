"use client";

export default function ChatBubble({ isOpen, toggleOpen }) {
  return (
    <button
      onClick={toggleOpen}
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        backgroundColor: "#0070f3",
        color: "white",
        border: "none",
        boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
        fontSize: "28px",
        cursor: "pointer",
        zIndex: 9999,
      }}
    >
      {isOpen ? "×" : "💬"}
    </button>
  );
}
