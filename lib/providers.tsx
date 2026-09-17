"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MotionConfig } from "framer-motion";

type Theme = "dark" | "light";
type ViewMode = "full" | "recruiter";

type SiteContextValue = {
  theme: Theme;
  toggleTheme: () => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [viewMode, setViewModeState] = useState<ViewMode>("full");

  useEffect(() => {
    try {
      const storedTheme = window.localStorage.getItem("theme") as Theme | null;
      const initialTheme: Theme = storedTheme === "light" ? "light" : "dark";
      setTheme(initialTheme);
      document.documentElement.setAttribute("data-theme", initialTheme);

      const storedMode = window.localStorage.getItem("viewMode") as ViewMode | null;
      if (storedMode) setViewModeState(storedMode);
    } catch {
      // ignore storage access errors (private browsing, etc.)
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        window.localStorage.setItem("theme", next);
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const setViewMode = useCallback((mode: ViewMode) => {
    setViewModeState(mode);
    try {
      window.localStorage.setItem("viewMode", mode);
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo(
    () => ({ theme, toggleTheme, viewMode, setViewMode }),
    [theme, toggleTheme, viewMode, setViewMode]
  );

  return (
    <SiteContext.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}
