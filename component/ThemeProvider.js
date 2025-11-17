"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      return;
    }

    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    setTheme(prefersDark ? "dark" : "light");
  }, []);

  // Apply theme to the document and persist
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
