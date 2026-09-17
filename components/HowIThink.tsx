"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Brain, Plus } from "lucide-react";
import { howIThink } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";
import { Stagger, StaggerItem } from "./Reveal";

export function HowIThink() {
  const [activeId, setActiveId] = useState<string>(howIThink[0].id);
  const active = howIThink.find((d) => d.id === activeId) ?? howIThink[0];

  return (
    <section id="ai-systems" className="relative mx-auto max-w-6xl px-4 py-28 sm:px-6">
      <SectionHeader
        eyebrow="How I Think"
        title="Engineering judgment, not just API calls."
        description="Select a question to see the trade-off reasoning behind it — grounded in decisions from the AI systems above."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <Stagger className="flex flex-col gap-3">
          {howIThink.map((card) => (
            <StaggerItem key={card.id}>
              <button
                onClick={() => setActiveId(card.id)}
                aria-pressed={activeId === card.id}
                className={`w-full rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${
                  activeId === card.id
                    ? "border-accent-blue bg-accent-blue/10"
                    : "border-surface-border bg-surface/40 hover:border-accent-blue/40"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-sm font-medium leading-snug text-foreground">
                    {card.question}
                  </span>
                  <Plus
                    size={16}
                    className={`mt-0.5 shrink-0 transition-transform duration-300 ${
                      activeId === card.id ? "rotate-45 text-accent-blue" : "text-foreground-subtle"
                    }`}
                  />
                </div>
              </button>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-3xl p-7 sm:p-8"
            >
              <div className="flex items-center gap-2 text-accent-cyan">
                <Brain size={18} />
                <span className="text-xs font-semibold uppercase tracking-wide">My take</span>
              </div>
              <p className="mt-4 text-lg font-medium leading-snug text-foreground">
                {active.shortAnswer}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
                {active.reasoning}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
