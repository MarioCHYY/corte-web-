"use client";

import { useEffect, useRef } from "react";

/**
 * Marca su contenedor con data-in cuando entra en pantalla (una sola vez).
 * Los hijos con data-r="…" se animan con las reglas .rv de globals.css.
 */
export function Reveal({
  as: Tag = "div",
  className = "",
  threshold = 0.18,
  children,
  ...rest
}: {
  as?: "div" | "section" | "ol" | "ul" | "figure" | "article";
  className?: string;
  threshold?: number;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.setAttribute("data-in", "");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.setAttribute("data-in", "");
            io.disconnect();
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  const Comp = Tag as React.ElementType;
  return (
    <Comp ref={ref} className={`rv ${className}`} {...rest}>
      {children}
    </Comp>
  );
}
