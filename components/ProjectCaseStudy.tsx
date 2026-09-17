"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Target, Sparkles, Wrench, LineChart, Scale, Trophy } from "lucide-react";
import type { Project } from "@/lib/data";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { Reveal } from "./Reveal";

function SubBlock({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent-blue">
        {icon}
        {title}
      </div>
      <div className="mt-2 text-sm leading-relaxed text-foreground-muted">{children}</div>
    </div>
  );
}

export function ProjectCaseStudy({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <Reveal delay={index * 0.05} className="glass overflow-hidden rounded-3xl">
      <button
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="flex w-full flex-col gap-4 p-6 text-left sm:p-8"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            {project.featured && (
              <span className="mb-2 inline-block rounded-full bg-accent-blue/15 px-2.5 py-0.5 text-[11px] font-medium text-accent-blue">
                Featured
              </span>
            )}
            <h3 className="text-xl font-semibold text-foreground sm:text-2xl">{project.name}</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground-muted">
              {project.oneLiner}
            </p>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="shrink-0 rounded-full border border-surface-border p-2 text-foreground-muted"
          >
            <ChevronDown size={16} />
          </motion.div>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-surface-border px-2.5 py-1 text-xs text-foreground-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-surface-border px-6 pb-8 pt-6 sm:px-8">
              <div className="grid gap-8 lg:grid-cols-2">
                <SubBlock icon={<Target size={14} />} title="Problem">
                  {project.problem}
                </SubBlock>
                <SubBlock icon={<Sparkles size={14} />} title="Why AI">
                  {project.whyAI}
                </SubBlock>
              </div>

              <div className="mt-8">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent-blue">
                  <LineChart size={14} />
                  Architecture
                </div>
                <p className="mt-2 mb-4 text-sm text-foreground-subtle">
                  Interactive — click a node to see what it does.
                </p>
                <ArchitectureDiagram nodes={project.diagram.nodes} edges={project.diagram.edges} />
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-2">
                <SubBlock icon={<Wrench size={14} />} title="My Contribution">
                  {project.contribution}
                </SubBlock>

                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent-blue">
                    <LineChart size={14} />
                    Evaluation
                  </div>
                  <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {project.evaluation.map((e) => (
                      <div
                        key={e.label}
                        className="rounded-xl border border-surface-border px-3.5 py-2.5"
                      >
                        <div className="text-xs text-foreground-subtle">{e.label}</div>
                        <div className="mt-0.5 text-sm font-medium text-foreground">{e.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent-blue">
                  <Scale size={14} />
                  Trade-offs
                </div>
                <div className="mt-3 space-y-3">
                  {project.tradeoffs.map((t) => (
                    <div
                      key={t.decision}
                      className="rounded-xl border border-surface-border px-4 py-3"
                    >
                      <div className="text-sm font-medium text-foreground">{t.decision}</div>
                      <div className="mt-1 text-sm leading-relaxed text-foreground-muted">
                        {t.reasoning}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-accent-blue/25 bg-accent-blue/5 px-5 py-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent-blue">
                  <Trophy size={14} />
                  Result
                </div>
                <p className="mt-2 text-sm leading-relaxed text-foreground">{project.result}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  );
}
