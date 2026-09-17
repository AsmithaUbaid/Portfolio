"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
}

export function MetricCard({
  value,
  suffix,
  label,
}: {
  value: string;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const numeric = parseInt(value, 10);
  const isNumeric = !Number.isNaN(numeric);
  const animated = useCountUp(isNumeric ? numeric : 0, inView && isNumeric);

  return (
    <div ref={ref} className="min-w-0">
      <div className="text-[1.9rem] font-semibold leading-none tracking-tight text-foreground sm:text-4xl">
        {isNumeric ? animated : value}
        <span className="text-gradient">{suffix}</span>
      </div>
      <div className="mt-2.5 text-xs leading-snug text-foreground-muted">{label}</div>
    </div>
  );
}
