"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Mesh } from "three";
import { useInView } from "framer-motion";
import { useSite } from "@/lib/providers";

const PALETTE = {
  dark: { outer: "#5b8cff", inner: "#9b7bff" },
  light: { outer: "#3763e0", inner: "#7a54e0" },
};

function Shapes({ reduceMotion, colors }: { reduceMotion: boolean; colors: { outer: string; inner: string } }) {
  const outerRef = useRef<Mesh>(null);
  const innerRef = useRef<Mesh>(null);
  const base = useRef({ x: 0.4, y: 0.6 });

  useFrame((state, delta) => {
    if (!outerRef.current || !innerRef.current) return;

    if (!reduceMotion) {
      base.current.x += delta * 0.1;
      base.current.y += delta * 0.14;
    }

    const px = state.pointer.y * 0.35;
    const py = state.pointer.x * 0.35;

    outerRef.current.rotation.x = base.current.x + px;
    outerRef.current.rotation.y = base.current.y + py;

    innerRef.current.rotation.x = -base.current.x * 1.3 - px * 0.6;
    innerRef.current.rotation.y = -base.current.y * 1.3 - py * 0.6;
  });

  return (
    <group>
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.25, 1]} />
        <meshBasicMaterial color={colors.outer} wireframe transparent opacity={0.55} />
      </mesh>
      <mesh ref={innerRef} scale={0.55}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color={colors.inner} wireframe transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

export default function HeroOrb() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { margin: "-10% 0px -10% 0px" });
  const { theme } = useSite();
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const colors = useMemo(() => (theme === "light" ? PALETTE.light : PALETTE.dark), [theme]);

  return (
    <div ref={wrapRef} className="pointer-events-none absolute -bottom-10 -left-10 h-56 w-56 sm:-bottom-14 sm:-left-14 sm:h-64 sm:w-64" aria-hidden>
      <div className="pointer-events-auto h-full w-full">
        <Canvas
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0, 4], fov: 45 }}
          frameloop={inView ? "always" : "never"}
        >
          <Shapes reduceMotion={reduceMotion} colors={colors} />
        </Canvas>
      </div>
    </div>
  );
}
