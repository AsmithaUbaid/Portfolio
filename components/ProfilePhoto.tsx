"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function ProfilePhoto({
  src,
  alt,
  variant = "hero",
  priority = false,
  delay = 0,
}: {
  src: string;
  alt: string;
  variant?: "hero" | "compact";
  priority?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 18, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);

  const canTilt = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !canTilt()) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isHero = variant === "hero";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={isHero ? "relative mx-auto w-full max-w-[280px] sm:max-w-sm" : "relative w-24 shrink-0 sm:w-28"}
    >
      <div
        aria-hidden
        className={`photo-glow absolute opacity-60 ${isHero ? "-inset-5 rounded-[2.5rem]" : "-inset-3 rounded-full"}`}
      />
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ perspective: 800 }}
        className="relative"
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className={`glass relative overflow-hidden border border-surface-border ${
            isHero ? "aspect-[4/5] rounded-[2rem]" : "aspect-square rounded-full"
          }`}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={isHero ? "(min-width: 1024px) 380px, 60vw" : "112px"}
            className="object-cover"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
