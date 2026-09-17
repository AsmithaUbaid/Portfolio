"use client";

import { useEffect, useRef } from "react";
import { useSite } from "@/lib/providers";

type Node = { x: number; y: number; vx: number; vy: number };

const PALETTES = {
  dark: { node: "91, 140, 255", link: "120, 140, 200", accent: "76, 224, 210" },
  light: { node: "55, 99, 224", link: "90, 110, 170", accent: "15, 156, 142" },
};

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useSite();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const palette = theme === "light" ? PALETTES.light : PALETTES.dark;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    let raf = 0;
    let visible = true;

    const LINK_DIST = 150;
    const MOUSE_RADIUS = 180;

    function sizeCanvas() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seedNodes() {
      const density = Math.min(64, Math.max(24, Math.floor((width * height) / 22000)));
      nodes = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
      }));
    }

    function drawFrame() {
      ctx!.clearRect(0, 0, width, height);

      for (const n of nodes) {
        if (!reduceMotion) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
          n.x = Math.max(0, Math.min(width, n.x));
          n.y = Math.max(0, Math.min(height, n.y));

          if (mouse.active) {
            const dx = n.x - mouse.x;
            const dy = n.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < MOUSE_RADIUS && dist > 0.01) {
              const force = (1 - dist / MOUSE_RADIUS) * 0.03;
              n.vx += (dx / dist) * force;
              n.vy += (dy / dist) * force;
            }
          }
          n.vx *= 0.985;
          n.vy *= 0.985;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINK_DIST) {
            const nearMouse = mouse.active && Math.hypot((a.x + b.x) / 2 - mouse.x, (a.y + b.y) / 2 - mouse.y) < MOUSE_RADIUS;
            const baseAlpha = (1 - dist / LINK_DIST) * (nearMouse ? 0.32 : 0.14);
            ctx!.strokeStyle = `rgba(${nearMouse ? palette.accent : palette.link}, ${baseAlpha})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx!.fillStyle = `rgba(${palette.node}, 0.55)`;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (!reduceMotion && visible) {
        raf = requestAnimationFrame(drawFrame);
      }
    }

    function handleMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }
    function handleLeave() {
      mouse.active = false;
    }
    function handleResize() {
      sizeCanvas();
      seedNodes();
      if (reduceMotion) drawFrame();
    }

    sizeCanvas();
    seedNodes();
    drawFrame();

    const parent = canvas.parentElement;
    parent?.addEventListener("mousemove", handleMove);
    parent?.addEventListener("mouseleave", handleLeave);
    window.addEventListener("resize", handleResize);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !reduceMotion && !raf) {
          raf = requestAnimationFrame(drawFrame);
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      parent?.removeEventListener("mousemove", handleMove);
      parent?.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("resize", handleResize);
      io.disconnect();
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
    />
  );
}
