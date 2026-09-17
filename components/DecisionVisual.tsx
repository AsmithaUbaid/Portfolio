"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Lock, Unlock, CheckCircle2, Circle } from "lucide-react";
import type { DecisionVisual as DecisionVisualType } from "@/lib/data";

function Chip({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <span
      className={`whitespace-nowrap rounded-lg border px-2.5 py-1.5 text-xs font-medium ${
        muted ? "border-surface-border/60 text-foreground-subtle" : "border-accent-blue/40 bg-accent-blue/5 text-foreground"
      }`}
    >
      {children}
    </span>
  );
}

function Arrow() {
  return <ArrowRight size={13} className="shrink-0 text-foreground-subtle" aria-hidden />;
}

function Toggle({
  optionA,
  optionB,
  active,
  onChange,
}: {
  optionA: string;
  optionB: string;
  active: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="inline-flex rounded-full border border-surface-border p-0.5 text-xs">
      <button
        onClick={() => onChange(false)}
        aria-pressed={!active}
        className={`rounded-full px-3 py-1.5 font-medium transition-colors ${
          !active ? "bg-foreground text-background" : "text-foreground-muted"
        }`}
      >
        {optionA}
      </button>
      <button
        onClick={() => onChange(true)}
        aria-pressed={active}
        className={`rounded-full px-3 py-1.5 font-medium transition-colors ${
          active ? "bg-foreground text-background" : "text-foreground-muted"
        }`}
      >
        {optionB}
      </button>
    </div>
  );
}

function AgentVsWorkflow() {
  const [agent, setAgent] = useState(false);
  return (
    <div>
      <Toggle optionA="Workflow" optionB="Agent" active={agent} onChange={setAgent} />
      <div className="mt-5 flex min-h-[92px] items-center">
        <AnimatePresence mode="wait">
          {!agent ? (
            <motion.div
              key="workflow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-wrap items-center gap-2"
            >
              <Chip>Input</Chip>
              <Arrow />
              <Chip>Process</Chip>
              <Arrow />
              <Chip>Gate</Chip>
              <Arrow />
              <Chip>Output</Chip>
            </motion.div>
          ) : (
            <motion.div
              key="agent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative flex h-[92px] w-full items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute h-20 w-20 rounded-full border border-dashed border-accent-violet/40"
                aria-hidden
              />
              <div className="absolute">
                <Chip>Agent</Chip>
              </div>
              <div className="absolute -top-1 left-1/2 -translate-x-1/2">
                <Chip muted>Plan</Chip>
              </div>
              <div className="absolute bottom-0 left-0">
                <Chip muted>Tool</Chip>
              </div>
              <div className="absolute bottom-0 right-0">
                <Chip muted>Observe</Chip>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function RagToggle() {
  const [rag, setRag] = useState(true);
  return (
    <div>
      <Toggle optionA="No RAG" optionB="RAG on" active={rag} onChange={setRag} />
      <motion.div layout className="mt-5 flex min-h-[40px] flex-wrap items-center gap-2">
        <Chip>Query</Chip>
        <Arrow />
        <AnimatePresence>
          {rag && (
            <motion.span
              key="retrieval"
              layout
              initial={{ opacity: 0, width: 0, scale: 0.8 }}
              animate={{ opacity: 1, width: "auto", scale: 1 }}
              exit={{ opacity: 0, width: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <Chip>Retrieval</Chip>
              <Arrow />
            </motion.span>
          )}
        </AnimatePresence>
        <Chip>Model</Chip>
        <Arrow />
        <Chip>Answer</Chip>
      </motion.div>
    </div>
  );
}

function ModelTradeoff() {
  const [big, setBig] = useState(false);
  const small = { accuracy: 45, latency: 85, cost: 90 };
  const large = { accuracy: 90, latency: 35, cost: 25 };
  const values = big ? large : small;
  const bars: { label: string; key: keyof typeof values }[] = [
    { label: "Accuracy", key: "accuracy" },
    { label: "Speed", key: "latency" },
    { label: "Cost efficiency", key: "cost" },
  ];
  return (
    <div>
      <Toggle optionA="Smaller, cheaper model" optionB="Larger, higher-accuracy model" active={big} onChange={setBig} />
      <div className="mt-5 space-y-2.5">
        {bars.map((b) => (
          <div key={b.key} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-xs text-foreground-subtle">{b.label}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-border/60">
              <motion.div
                animate={{ width: `${values[b.key]}%` }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-cyan"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Seesaw() {
  const [value, setValue] = useState(50);
  const label = value < 40 ? "Cost-optimized" : value > 60 ? "Accuracy-optimized" : "Balanced";
  const tilt = (value - 50) / 4;
  return (
    <div>
      <div className="flex h-16 items-center justify-center">
        <motion.div
          animate={{ rotate: tilt }}
          transition={{ duration: 0.3 }}
          className="relative h-1 w-40 rounded-full bg-surface-border"
        >
          <span className="absolute -left-1 -top-2.5 text-[10px] text-foreground-subtle">Cost</span>
          <span className="absolute -right-1 -top-2.5 text-[10px] text-foreground-subtle">Accuracy</span>
          <motion.span
            animate={{ left: `${value}%` }}
            transition={{ duration: 0.3 }}
            className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-blue"
          />
        </motion.div>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        aria-label="Weight between cost and accuracy"
        className="mt-2 w-full accent-[var(--accent-blue)]"
      />
      <p className="mt-2 text-center text-xs font-medium text-accent-blue">{label}</p>
    </div>
  );
}

function Gate() {
  const [threshold, setThreshold] = useState(65);
  const caseConfidence = 72;
  const open = caseConfidence >= threshold;
  return (
    <div>
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ color: open ? "var(--accent-cyan)" : "var(--foreground-subtle)" }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-current"
        >
          {open ? <Unlock size={16} /> : <Lock size={16} />}
        </motion.div>
        <div className="text-xs">
          <div className="font-medium text-foreground">
            {open ? "Auto-executed" : "Escalated to human"}
          </div>
          <div className="text-foreground-subtle">Case confidence: {caseConfidence}%</div>
        </div>
      </div>
      <label className="mt-4 block text-xs text-foreground-subtle" htmlFor="threshold-slider">
        Confidence threshold: {threshold}%
      </label>
      <input
        id="threshold-slider"
        type="range"
        min={0}
        max={100}
        value={threshold}
        onChange={(e) => setThreshold(Number(e.target.value))}
        className="mt-1.5 w-full accent-[var(--accent-blue)]"
      />
    </div>
  );
}

const CHECKLIST_ITEMS = ["Macro-F1", "Risk recall", "Retrieval Recall@K", "Latency", "Cost"];

function Checklist() {
  const [checked, setChecked] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setChecked(CHECKLIST_ITEMS.length);
      return;
    }
    const id = setInterval(() => {
      setChecked((c) => (c >= CHECKLIST_ITEMS.length ? 0 : c + 1));
    }, 700);
    return () => clearInterval(id);
  }, []);

  return (
    <ul className="space-y-2">
      {CHECKLIST_ITEMS.map((item, i) => (
        <li key={item} className="flex items-center gap-2.5 text-sm">
          {i < checked ? (
            <CheckCircle2 size={15} className="shrink-0 text-accent-cyan" />
          ) : (
            <Circle size={15} className="shrink-0 text-foreground-subtle/40" />
          )}
          <span className={i < checked ? "text-foreground" : "text-foreground-subtle"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function DecisionVisual({ variant }: { variant: DecisionVisualType }) {
  switch (variant) {
    case "agent-vs-workflow":
      return <AgentVsWorkflow />;
    case "rag-toggle":
      return <RagToggle />;
    case "model-tradeoff":
      return <ModelTradeoff />;
    case "seesaw":
      return <Seesaw />;
    case "gate":
      return <Gate />;
    case "checklist":
      return <Checklist />;
    default:
      return null;
  }
}
