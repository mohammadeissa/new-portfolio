"use client";

import Link from "next/link";
import { useTheme } from "@/component/ThemeProvider";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/project">Projects</Link>
        <Link href="/business">Business</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
      </button>
    </nav>
  );
}
