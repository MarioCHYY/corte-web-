"use client";

import { useEffect, useRef, useState } from "react";

const fmt = (n: number, decimals: number) =>
  n.toLocaleString("es-MX", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/** Número que cuenta desde `from` hasta `to` cuando aparece en pantalla. */
export function CountUp({
  to,
  from = 0,
  prefix = "",
  decimals = 0,
  duration = 1400,
  className = "",
}: {
  to: number;
  from?: number;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(from);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const run = () => {
      if (reduced) {
        setValue(to);
        return;
      }
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        const e = 1 - Math.pow(1 - p, 4);
        setValue(from + (to - from) * e);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, from, duration]);
  return (
    <span ref={ref} className={`tabular ${className}`}>
      {prefix}
      {fmt(value, decimals)}
    </span>
  );
}
