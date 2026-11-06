"use client";

import { useRef } from "react";

/** Una luz lima suave que sigue al cursor dentro de la portada. */
export function HeroGlow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={`relative isolate ${className}`}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || e.pointerType !== "mouse") return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--gx", `${e.clientX - r.left}px`);
        el.style.setProperty("--gy", `${e.clientY - r.top}px`);
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70 transition-opacity motion-reduce:hidden"
        style={{
          background: "radial-gradient(520px circle at var(--gx, 70%) var(--gy, 20%), rgba(198,244,50,0.12), transparent 60%)",
        }}
      />
      {children}
    </div>
  );
}
