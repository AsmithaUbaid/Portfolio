"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { howIThink } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";
import { Stagger, StaggerItem } from "./Reveal";
import { DecisionVisual } from "./DecisionVisual";

export function HowIThink() {
  const [activeId, setActiveId] = useState<string>(howIThink[0].id);
  const active = howIThink.find((d) => d.id === activeId) ?? howIThink[0];

  return (
    <section id="decision-lab" className="relative mx-auto max-w-6xl px-4 py-28 sm:px-6">
      <SectionHeader
        eyebrow="Engineering Decision Lab"
        title="Engineering judgment, not just API calls."
        description="Select a question and interact with the visual — grounded in real trade-offs from the AI systems above."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)]">
        <Stagger className="flex flex-col">
          {howIThink.map((card) => (
            <StaggerItem key={card.id}>
              <button
                onClick={() => setActiveId(card.id)}
                aria-pressed={activeId === card.id}
                className={`w-full border-t border-surface-border py-4 text-left transition-colors first:border-t-0 ${
                  activeId === card.id ? "text-foreground" : "text-foreground-muted hover:text-foreground"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-sm font-medium leading-snug">{card.question}</span>
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
              className="border-l-2 border-accent-blue/60 pl-6"
            >
              <div className="rounded-2xl bg-surface/40 p-5">
                <DecisionVisual variant={active.visual} />
              </div>
              <p className="mt-6 text-lg font-medium leading-snug text-foreground">
                {active.shortAnswer}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-foreground-muted">{active.reasoning}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
