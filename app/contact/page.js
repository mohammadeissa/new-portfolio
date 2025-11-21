"use client";

import { useState } from "react";
import "@/styles/Contact.css";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents page reload

    setSending(true);
    setStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to send message");
      }

      setStatus(data.message || "Message sent!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus(err.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="page-container">
      <h1 className="contact-title">Contact Me</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto", textAlign: "left" }}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
          required
        />

        <label>Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", height: "80px" }}
          required
        />

        <button className="contact-button" type="submit" disabled={sending} style={{ padding: "10px 16px" }}>
          {sending ? "Sending..." : "Send"}
        </button>
      </form>

      {status && <p className="contact-status" style={{ marginTop: "20px" }}>{status}</p>}
    </div>
  );
}

export default Contact;
