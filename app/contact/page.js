"use client";

import { useState } from "react";
import "@/styles/Contact.css";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents page reload

    const response = await fetch("http://localhost:5001/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message })
    });

    const data = await response.json();
    setStatus(data.message);
  };

  return (
    <div className="page-container">
      <h1>Contact Me</h1>

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

        <button type="submit" style={{ padding: "8px 15px" }}>Send</button>
      </form>

      {status && <p style={{ marginTop: "20px" }}>{status}</p>}
    </div>
  );
}

export default Contact;
