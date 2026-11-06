"use client";

import { useEffect, useRef, useState } from "react";
import { CorteIcon } from "@/components/brand/Logo";
import { Icon } from "@/components/icons";

/**
 * El chat de la casa se reproduce mensaje por mensaje (con "escribiendo…") y,
 * al terminar, el estado de cuenta de corte resuelve cada renglón.
 */

const CHAT = [
  { who: "Perla", me: true, text: "Ya llegó el estado de cuenta. Beto 1,300, Carlos 1,500 y Mario 1,100" },
  { who: "Beto", text: "¿El celular ya va en la mensualidad 2 o en la 3?" },
  { who: "Carlos", text: "El perfume lo compré el 6, ¿no entraba hasta el otro mes?" },
  { who: "Mario", text: "¿La luz se dividió entre 3 o entre 4?" },
  { who: "Perla", me: true, text: "Ya no sé. Nada más deposítenme antes del 25 porfa, que si no me cobran intereses" },
];

const STATEMENT = [
  { name: "Mario", detail: "Audífonos y su parte de la luz", amount: 1100, paid: true, color: "#F9A8D4" },
  { name: "Beto", detail: "Celular, mensualidad 2 de 6, y luz", amount: 1300, paid: false, color: "#C4B5FD" },
  { name: "Carlos", detail: "Su parte de la luz (el perfume va en diciembre)", amount: 225, paid: false, color: "#FDBA74" },
];

const money = (n: number) => "$" + n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function ProblemDemo() {
  const ref = useRef<HTMLDivElement>(null);
  // shown: mensajes visibles; typing: índice que se está "escribiendo"; rows: renglones de corte resueltos
  const [state, setState] = useState({ shown: 0, typing: -1, rows: 0, started: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));
    const play = () => {
      if (reduced) {
        setState({ shown: CHAT.length, typing: -1, rows: STATEMENT.length + 1, started: true });
        return;
      }
      setState((s) => ({ ...s, started: true }));
      let t = 300;
      CHAT.forEach((_, i) => {
        at(t, () => setState((s) => ({ ...s, typing: i })));
        t += 750;
        at(t, () => setState((s) => ({ ...s, typing: -1, shown: i + 1 })));
        t += 450;
      });
      t += 300;
      for (let r = 1; r <= STATEMENT.length + 1; r++) {
        at(t, () => setState((s) => ({ ...s, rows: r })));
        t += 380;
      }
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  const resolvedPending = STATEMENT.slice(0, state.rows).reduce((a, p) => a + (p.paid ? 0 : p.amount), 0);

  return (
    <div ref={ref} className="mt-12 grid gap-6 lg:grid-cols-2">
      {/* Chat */}
      <figure className="flex min-h-[420px] flex-col rounded-[28px] bg-[#e4e4de] p-5 sm:p-6">
        <figcaption className="mb-4 flex items-center justify-between text-sm">
          <span className="font-semibold">Casa</span>
          <span className="text-ink/50">{state.typing >= 0 ? `${CHAT[state.typing].who} está escribiendo…` : "4 personas"}</span>
        </figcaption>
        <ul className="space-y-2.5">
          {CHAT.map((m, i) => {
            const visible = i < state.shown;
            const typing = i === state.typing;
            if (!visible && !typing) return null;
            return (
              <li key={i} className={`flex ${m.me ? "justify-end" : "justify-start"}`}>
                <div
                  className={`cell-in max-w-[85%] rounded-2xl px-4 py-2.5 text-[15px] leading-snug ${m.me ? "rounded-br-md bg-ink text-paper" : "rounded-bl-md bg-white text-ink"}`}
                >
                  {!m.me && <p className="text-xs font-semibold text-ink/50">{m.who}</p>}
                  {typing ? (
                    <span className="flex gap-1 py-1.5" aria-label="escribiendo">
                      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-current" />
                      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-current" />
                      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-current" />
                    </span>
                  ) : (
                    m.text
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </figure>

      {/* Con corte */}
      <figure
        className={`rounded-[28px] bg-ink p-5 text-paper transition-[box-shadow,transform] duration-700 sm:p-6 ${
          state.rows > STATEMENT.length ? "shadow-[0_30px_80px_-30px_rgba(198,244,50,0.45)]" : ""
        }`}
      >
        <figcaption className="flex items-center gap-3">
          <CorteIcon className="h-9 w-9" />
          <span>
            <span className="block font-semibold">Tarjeta de Perla, corte del 5 de noviembre</span>
            <span className="block text-sm text-mute">Pagar antes del 25 de noviembre sin intereses</span>
          </span>
        </figcaption>
        <ul className="mt-4 divide-y divide-line">
          {STATEMENT.map((p, i) => {
            const done = i < state.rows;
            return (
              <li key={p.name} className="flex items-center gap-3 py-3.5">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display font-bold text-ink transition-transform duration-500"
                  style={{ background: p.color, transform: done ? "scale(1)" : "scale(0.85)" }}
                >
                  {p.name[0]}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{p.name}</span>
                  <span className={`block text-sm transition-colors duration-500 ${done ? "text-mute" : "text-mute/40"}`}>
                    {done ? p.detail : "Calculando…"}
                  </span>
                </span>
                <span className="text-right">
                  <span className={`block font-display font-bold tabular transition-opacity duration-500 ${done ? "opacity-100" : "opacity-20"}`}>
                    {done ? money(p.amount) : "$—"}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-medium transition-all duration-500 ${done ? "opacity-100" : "opacity-0"} ${p.paid ? "text-lime" : "text-coral"}`}
                  >
                    {p.paid && <Icon name="check" className="h-3 w-3" size={12} strokeWidth={3} />}
                    {p.paid ? "Pagado" : "Pendiente"}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
        <p
          className={`mt-3 rounded-xl px-4 py-3 text-sm transition-all duration-700 ${
            state.rows > STATEMENT.length ? "bg-coral/10 text-coral opacity-100" : "bg-coral/0 text-coral opacity-0"
          }`}
        >
          Faltan {money(resolvedPending)} para cubrir el total sin intereses.
        </p>
      </figure>
    </div>
  );
}
