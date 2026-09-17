"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { experience } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

function TimelineEntry({
  entry,
  index,
}: {
  entry: (typeof experience)[number];
  index: number;
}) {
  return (
    <Reveal delay={index * 0.05} className="relative pl-10 sm:pl-14">
      <span
        className="absolute left-[7px] top-2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent-blue bg-background sm:left-[11px]"
        aria-hidden
      />
      <div className="glass rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-lg font-semibold text-foreground">{entry.role}</h3>
          <span className="text-xs font-medium uppercase tracking-wide text-foreground-subtle">
            {entry.start} – {entry.end}
          </span>
        </div>
        <p className="mt-1 text-sm font-medium text-accent-blue">{entry.company}</p>
        <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{entry.summary}</p>
        <ul className="mt-4 space-y-2.5">
          {entry.highlights.map((h) => (
            <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-foreground">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-cyan" aria-hidden />
              {h}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-surface-border px-2.5 py-1 text-xs text-foreground-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative mx-auto max-w-5xl px-4 py-28 sm:px-6">
      <SectionHeader
        eyebrow="Career"
        title="Three years of production engineering, one company, growing scope."
        description="From intern to Staff Engineer at Palo Alto Networks — shipping distributed backend systems, owning production incidents, and now applying that same rigor to AI systems."
      />

      <div ref={containerRef} className="relative mt-14">
        <div
          className="absolute left-[7px] top-2 bottom-2 w-px bg-surface-border sm:left-[11px]"
          aria-hidden
        />
        <motion.div
          className="absolute left-[7px] top-2 w-px bg-gradient-to-b from-accent-blue via-accent-violet to-accent-cyan sm:left-[11px]"
          style={{ height: lineHeight }}
          aria-hidden
        />
        <div className="space-y-8">
          {experience.map((entry, i) => (
            <TimelineEntry key={entry.role + entry.start} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
