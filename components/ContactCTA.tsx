import { Linkedin, Mail, Phone, FileDown } from "lucide-react";
import { profile } from "@/lib/data";
import { Reveal } from "./Reveal";
import { MagneticButton } from "./MagneticButton";

export function ContactCTA() {
  return (
    <section id="contact" className="relative mx-auto max-w-5xl px-4 py-28 sm:px-6">
      <Reveal className="relative overflow-hidden rounded-3xl border border-surface-border px-6 py-16 text-center sm:px-12">
        <div className="mesh-gradient absolute inset-0 opacity-60" aria-hidden />
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_20%,transparent_100%)]" aria-hidden />

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-background/60 px-4 py-1.5 text-xs font-medium text-foreground-muted">
            {profile.availability}
          </span>
          <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Building production-ready AI systems. Let&apos;s talk.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-foreground-muted">
            Open to Applied AI, AI Engineering, and Agentic AI roles where production experience and
            evaluation rigor matter as much as building the demo.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background"
            >
              <Mail size={16} /> {profile.email}
            </MagneticButton>
            <MagneticButton
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-surface-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent-blue"
            >
              <Linkedin size={16} /> LinkedIn
            </MagneticButton>
            <MagneticButton
              href={profile.resumeFile}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-surface-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent-blue"
            >
              <FileDown size={16} /> Resume
            </MagneticButton>
          </div>

          <p className="mt-6 flex items-center justify-center gap-1.5 text-sm text-foreground-subtle">
            <Phone size={13} /> {profile.phone} · {profile.location}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
