"use client";

import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X, FileDown } from "lucide-react";
import { useSite } from "@/lib/providers";
import { profile } from "@/lib/data";

const links = [
  { href: "#home", label: "Home" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "AI Systems" },
  { href: "#decision-lab", label: "Decision Lab" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const { theme, toggleTheme, viewMode, setViewMode } = useSite();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <nav
          className={`flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${
            scrolled ? "glass shadow-lg shadow-black/10" : "bg-transparent"
          }`}
          aria-label="Primary"
        >
          <a
            href="#home"
            className="text-sm font-semibold tracking-tight text-foreground"
          >
            Asmitha U
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-3.5 py-2 text-sm text-foreground-muted transition-colors hover:bg-surface hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              onClick={() => setViewMode(viewMode === "recruiter" ? "full" : "recruiter")}
              className="rounded-full border border-surface-border px-3.5 py-2 text-xs font-medium text-foreground-muted transition-colors hover:border-accent-blue hover:text-foreground"
              aria-pressed={viewMode === "recruiter"}
            >
              {viewMode === "recruiter" ? "Exit Recruiter View" : "Recruiter View"}
            </button>
            <a
              href={profile.resumeFile}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-2 text-xs font-medium text-background transition-transform hover:scale-[1.03]"
            >
              <FileDown size={14} /> Resume
            </a>
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="rounded-full border border-surface-border p-2 text-foreground-muted transition-colors hover:border-accent-blue hover:text-foreground"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          <button
            className="rounded-full border border-surface-border p-2 text-foreground lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>

        {open && (
          <div className="glass mt-2 rounded-2xl p-4 lg:hidden">
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm text-foreground-muted hover:bg-surface hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center gap-2 border-t border-surface-border pt-3">
              <button
                onClick={() => setViewMode(viewMode === "recruiter" ? "full" : "recruiter")}
                className="flex-1 rounded-full border border-surface-border px-3 py-2 text-xs font-medium text-foreground-muted"
              >
                {viewMode === "recruiter" ? "Exit Recruiter View" : "Recruiter View"}
              </button>
              <a
                href={profile.resumeFile}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-full bg-foreground px-3 py-2 text-center text-xs font-medium text-background"
              >
                Resume
              </a>
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="rounded-full border border-surface-border p-2 text-foreground-muted"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
