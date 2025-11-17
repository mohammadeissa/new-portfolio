"use client";

import "@/styles/Projects.css";

export default function ProjectsPage() {
  return (
    <main className="projects-container">
      <h1 className="projects-title">Projects</h1>

      <div className="projects-grid">

        <div className="project-card">
          <h3>EPC Carbon Credit Algorithm</h3>
          <p>
            A baseline estimation algorithm that calculates carbon savings for 
            UK homeowners using EPC data — with potential integration with JP Morgan.
          </p>

          <div className="project-tech">
            <span className="tech-pill">Python</span>
            <span className="tech-pill">Pandas</span>
            <span className="tech-pill">API</span>
          </div>

          <a className="project-link" href="#">
            Learn More →
          </a>
        </div>

        {/* Add more project-card blocks here */}

      </div>
    </main>
  );
}
