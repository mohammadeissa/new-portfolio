"use client";

import { useEffect } from "react";

export default function AnalyticsTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("visit-logged")) return;

    sessionStorage.setItem("visit-logged", "true");

    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "visit" }),
    }).catch(() => {});
  }, []);

  return null;
}
