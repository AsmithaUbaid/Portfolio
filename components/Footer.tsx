import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-col items-center justify-between gap-3 border-t border-surface-border pt-8 text-xs text-foreground-subtle sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name}. Built with Next.js &amp; Framer Motion.</p>
        <p>{profile.location}</p>
      </div>
    </footer>
  );
}
