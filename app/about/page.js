"use client";
import "@/styles/About.css";

export default function ProjectPage() {
  return (
    <main>
      <div className="about-hero">
        <div className="about-copy">
          <p className="eyebrow">About Mohammad</p>
          <h1>
            How I Got Here: <br />
            <span className="accent">Numbers, Swimming, Fear,</span> And The Weird Path In Between
          </h1>
          <p className="lede">
            I’m a data scientist in training, a competitive swimmer, and someone who figured out confidence by breaking
            things, fixing them, and jumping in anyway.
          </p>
          <div className="about-tags">
            <span>Data Science</span>
            <span>Swimming</span>
            <span>Boston Based</span>
            <span>Learning In Public</span>
          </div>
        </div>

        <div className="about-portrait">
          <div className="photo-frame">
            <img src="/Swimmer.JPG" alt="Mohammad swimming in competition" />
          </div>
          <div className="badge">
            <div className="badge-dot" />
            <div>
              <p className="badge-title">Built through reps</p>
              <p className="badge-sub">Code, swim, repeat.</p>
            </div>
          </div>
        </div>
      </div>

      <section className="about-body">
        <article className="story-card">
          <h3>Not Your Stereotypical “Born Coder”</h3>
          <p>
            People think everyone in tech was born writing code at age 5. Not me. Numbers made sense when life didn’t,
            but programming was a mess at first. I wasn’t hacking calculators—I was wondering why my loop kept crashing
            everything.
          </p>
          <p>
            I graduated valedictorian back home, moved to the U.S. to swim, and suddenly I was just another student in
            a fast lane. Swimming was the plan—train, compete, climb. Life had edits: the plan didn’t play out like the
            script.
          </p>
        </article>

        <article className="story-card">
          <h3>Pivoting Without Letting Go</h3>
          <p>
            I moved near Boston for a reset and refused to choose between the pool and the classroom. Grind school.
            Keep swimming. No excuses. No safety nets.
          </p>
          <p>
            Fear? It’s loud and annoying. My answer was to drown it out—skydiving without hesitation, jumping from
            heights other people photograph, not leap from. Maybe not the textbook strategy, but fear gets quiet when it
            realizes you won’t listen.
          </p>
        </article>

        <article className="story-card highlight">
          <h3>Confidence From Failing Forward</h3>
          <p>
            Confidence didn’t come from easy wins—it came from stumbles. Swimming wasn’t cinematic. Coding wasn’t
            natural. Moving countries was lonely. But rebuilding yourself is a skill. That’s what data science is to me:
            break a messy problem down, find the pattern, rebuild, improve, repeat.
          </p>
          <p className="quote">
            “Fear leaves you alone when it realizes you’re not scared of it anymore.”
          </p>
        </article>

        <article className="story-card">
          <h3>Where I Am Now</h3>
          <p>
            Today, I’m studying what I love, training harder than ever, and getting better at code every day. Success
            doesn’t require a perfect path—just refusing to let fear, failure, or uncertainty pick your ending.
          </p>
          <p>
            Regrets about the chaos? Short answer: none. Long answer: I’ll save it for the next blog post.
          </p>
        </article>
      </section>
    </main>
  );
}
