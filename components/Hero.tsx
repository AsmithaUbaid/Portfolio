"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Linkedin, Mail, MapPin } from "lucide-react";
import { profile, heroFacts } from "@/lib/data";
import { MetricCard } from "./MetricCard";
import { MagneticButton } from "./MagneticButton";

const keywords = ["LLM applications", "RAG pipelines", "agentic workflows", "eval-driven AI systems"];

const headlineWords = profile.headline.split(" ");

function RotatingKeyword() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % keywords.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-block h-[1.4em] min-w-[13ch] align-bottom overflow-hidden text-left">
      {keywords.map((word, i) => (
        <motion.span
          key={word}
          className="absolute inset-0 text-gradient"
          initial={false}
          animate={{
            y: i === index ? 0 : i < index ? "-100%" : "100%",
            opacity: i === index ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-16"
    >
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_80%_60%_at_50%_10%,#000_40%,transparent_100%)]" />
      <div className="mesh-gradient absolute inset-0" aria-hidden />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface/60 px-4 py-1.5 text-xs font-medium text-foreground-muted"
        >
          <MapPin size={12} className="text-accent-cyan" />
          {profile.location} · {profile.availability}
        </motion.div>

        <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              className="mr-3 inline-block"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted"
        >
          Building <RotatingKeyword /> — grounded in 3+ years of production
          backend engineering at Palo Alto Networks.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground-subtle"
        >
          {profile.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <MagneticButton
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background shadow-lg shadow-black/10 transition-transform"
          >
            View AI Systems <ArrowRight size={16} />
          </MagneticButton>
          <MagneticButton
            href={profile.resumeFile}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-surface-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent-blue"
          >
            Download Resume
          </MagneticButton>
          <MagneticButton
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-surface-border p-3 text-foreground-muted transition-colors hover:border-accent-blue hover:text-foreground"
          >
            <Linkedin size={16} />
            <span className="sr-only">LinkedIn</span>
          </MagneticButton>
          <MagneticButton
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-surface-border p-3 text-foreground-muted transition-colors hover:border-accent-blue hover:text-foreground"
          >
            <Mail size={16} />
            <span className="sr-only">Email</span>
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
        >
          {heroFacts.map((fact) => (
            <MetricCard key={fact.label} value={fact.value} suffix={fact.suffix} label={fact.label} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
