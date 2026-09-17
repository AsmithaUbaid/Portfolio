"use client";

import { Sparkles } from "lucide-react";
import type { Project } from "@/lib/data";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { Reveal, Stagger, StaggerItem } from "./Reveal";

export function ProjectCaseStudy({ project, index }: { project: Project; index: number }) {
  return (
    <div className={index > 0 ? "border-t border-surface-border pt-20" : ""}>
      <Reveal className="flex flex-wrap items-start justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-foreground-subtle/50">
              {String(index + 1).padStart(2, "0")}
            </span>
            {project.featured && (
              <span className="rounded-full bg-accent-blue/12 px-2.5 py-0.5 text-[11px] font-medium text-accent-blue">
                Featured system
              </span>
            )}
          </div>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {project.name}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-foreground-muted">{project.oneLiner}</p>
        </div>
        <div className="flex flex-wrap gap-2 sm:justify-end">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-surface-border px-2.5 py-1 text-xs text-foreground-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-5">
        <Reveal delay={0.05} className="lg:col-span-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-accent-blue">Problem</span>
          <p className="mt-2 text-base leading-relaxed text-foreground">{project.problem}</p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-2">
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-accent-blue">
            <Sparkles size={13} /> Why AI
          </span>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{project.whyAI}</p>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-12">
        <span className="text-xs font-semibold uppercase tracking-wide text-accent-blue">Architecture</span>
        <p className="mt-2 mb-5 max-w-2xl text-sm leading-relaxed text-foreground-muted">
          {project.contribution}
        </p>
        <ArchitectureDiagram nodes={project.diagram.nodes} edges={project.diagram.edges} />
      </Reveal>

      <Reveal delay={0.05} className="mt-14">
        <span className="text-xs font-semibold uppercase tracking-wide text-accent-blue">Evaluation</span>
        <Stagger className="mt-4 flex flex-wrap gap-x-10 gap-y-5">
          {project.evaluation.map((e) => (
            <StaggerItem key={e.label} y={12} className="min-w-[140px]">
              <div className="text-lg font-semibold leading-tight text-foreground sm:text-xl">
                {e.value}
              </div>
              <div className="mt-1 text-xs text-foreground-subtle">{e.label}</div>
            </StaggerItem>
          ))}
        </Stagger>
      </Reveal>

      <Reveal delay={0.05} className="mt-14">
        <span className="text-xs font-semibold uppercase tracking-wide text-accent-blue">Trade-offs</span>
        <div className="mt-4 divide-y divide-surface-border border-y border-surface-border">
          {project.tradeoffs.map((t) => (
            <div key={t.decision} className="grid gap-1.5 py-4 sm:grid-cols-[1fr_1.6fr] sm:gap-8">
              <div className="text-sm font-medium text-foreground">{t.decision}</div>
              <div className="text-sm leading-relaxed text-foreground-muted">{t.reasoning}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.05} className="mt-12 border-l-2 border-accent-blue pl-6">
        <span className="text-xs font-semibold uppercase tracking-wide text-accent-blue">Result</span>
        <p className="mt-2 max-w-2xl text-lg leading-relaxed text-foreground">{project.result}</p>
      </Reveal>
    </div>
  );
}
