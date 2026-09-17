"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experience, type ExperienceEntry } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";
import { Stagger, StaggerItem } from "./Reveal";

function TimelineEntry({ entry, index }: { entry: ExperienceEntry; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { margin: "-35% 0px -45% 0px" });

  return (
    <div
      ref={ref}
      className="grid gap-4 border-t border-surface-border py-12 first:border-t-0 first:pt-0 sm:grid-cols-[220px_1fr] sm:gap-12 sm:py-16"
    >
      <div className="sm:sticky sm:top-32 sm:self-start">
        <motion.span
          animate={{ color: active ? "var(--accent-blue)" : "var(--foreground-subtle)" }}
          transition={{ duration: 0.4 }}
          className="text-xs font-medium uppercase tracking-wide"
        >
          {entry.start} — {entry.end}
        </motion.span>
        <motion.h3
          animate={{ color: active ? "var(--foreground)" : "var(--foreground-muted)" }}
          transition={{ duration: 0.4 }}
          className="mt-2 text-xl font-semibold leading-snug sm:text-2xl"
        >
          {entry.role}
        </motion.h3>
        <p className="mt-1 text-sm text-foreground-subtle">{entry.company}</p>
        <span className="mt-4 inline-block text-2xl font-semibold text-foreground-subtle/40">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="relative pl-7">
        <div className="absolute left-0 top-2 bottom-2 w-px bg-surface-border" aria-hidden />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: active ? 1 : 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "top" }}
          className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-accent-blue via-accent-violet to-accent-cyan"
          aria-hidden
        />
        <motion.span
          animate={{
            backgroundColor: active ? "var(--accent-blue)" : "var(--background)",
            borderColor: active ? "var(--accent-blue)" : "var(--surface-border)",
          }}
          transition={{ duration: 0.4 }}
          className="absolute -left-[5px] top-2 h-[11px] w-[11px] rounded-full border-2"
          aria-hidden
        />

        <p className="text-base leading-relaxed text-foreground-muted">{entry.summary}</p>

        <Stagger className="mt-5 space-y-3">
          {entry.highlights.map((h) => (
            <StaggerItem key={h} y={12}>
              <p className="text-sm leading-relaxed text-foreground">{h}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Stagger className="mt-6 flex flex-wrap gap-2" stagger={0.04}>
          {entry.tags.map((tag) => (
            <StaggerItem key={tag} y={8}>
              <span className="rounded-full border border-surface-border px-2.5 py-1 text-xs text-foreground-muted">
                {tag}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </div>
  );
}

export function ExperienceTimeline() {
  return (
    <section id="experience" className="relative mx-auto max-w-5xl px-4 py-28 sm:px-6">
      <SectionHeader
        eyebrow="Career"
        title="Three years of production engineering, one company, growing scope."
        description="From intern to Staff Engineer at Palo Alto Networks — shipping distributed backend systems, owning production incidents, and now applying that same rigor to AI systems."
      />

      <div className="mt-8">
        {experience.map((entry, i) => (
          <TimelineEntry key={entry.role + entry.start} entry={entry} index={i} />
        ))}
      </div>
    </section>
  );
}
