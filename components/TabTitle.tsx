"use client";

import { useEffect } from "react";

const AWAY_MESSAGE = "Come back! 👋 — Still building AI systems here";

export function TabTitle() {
  useEffect(() => {
    const originalTitle = document.title;

    const handleVisibility = () => {
      document.title = document.hidden ? AWAY_MESSAGE : originalTitle;
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      document.title = originalTitle;
    };
  }, []);

  return null;
}
