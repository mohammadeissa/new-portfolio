"use client";

import "./../styles/Home.css"; // we will fix path in the next step
import Image from "next/image";

export default function HomePage() {
  return (
    <main>
      {<div className="hero">
      <div className="hero-content">
        <h3 className="small-title">3+ Years of Experience</h3>

        <h1 className="hero-title">
          Mohammad Eissa <span className="highlight">Data Scientist</span>
        </h1>

        <p className="hero-text">
          I build intelligent systems using AI, data science, and sports analytics.
          My portfolio showcases work in computer vision, robotics, data modeling,
          and full-stack development.
        </p>

        <a className="resume-btn" href="/resume.pdf" download>
          Download Resume
        </a>

        <div className="social-links">
          <a href="https://github.com/mohammadeissa" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/mohammad-eissa-1a915b2a9/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>

      <div className="hero-image">
        <div className="circle-bg"></div>
        <Image
          src="/profile.png"
          alt="profile"
          width={550}
          height={550}
          style={{ borderRadius: "50%", objectFit: "cover" }}
          priority
        />
      </div>
    </div>}
    </main>
  );
}
