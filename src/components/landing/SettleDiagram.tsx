import { Reveal } from "@/components/motion/Reveal";

/**
 * Antes: cada quien le paga a cada quien (6 transferencias).
 * Después: corte las simplifica a lo mínimo (2 transferencias).
 */
const PEOPLE = [
  { name: "Perla", x: 60, y: 40, color: "#FF5C5C" },
  { name: "Mario", x: 220, y: 40, color: "#F9A8D4" },
  { name: "Beto", x: 60, y: 170, color: "#C4B5FD" },
  { name: "Carlos", x: 220, y: 170, color: "#FDBA74" },
];

function Nodes() {
  return (
    <>
      {PEOPLE.map((p) => (
        <g key={p.name}>
          <circle cx={p.x} cy={p.y} r="20" fill={p.color} />
          <text x={p.x} y={p.y + 6} textAnchor="middle" fontSize="16" fontWeight="700" fill="#121417" fontFamily="var(--font-grotesk)">
            {p.name[0]}
          </text>
          <text x={p.x} y={p.y + (p.y < 100 ? -28 : 40)} textAnchor="middle" fontSize="12" fill="#9aa0a8">
            {p.name}
          </text>
        </g>
      ))}
    </>
  );
}

function Arrow({ from, to, color, label, i = 0 }: { from: number; to: number; color: string; label?: string; i?: number }) {
  const a = PEOPLE[from];
  const b = PEOPLE[to];
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const x1 = a.x + ux * 26;
  const y1 = a.y + uy * 26;
  const x2 = b.x - ux * 30;
  const y2 = b.y - uy * 30;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth="2"
        pathLength={1}
        className="draw"
        style={{ "--i": i } as React.CSSProperties}
      />
      <path
        d={`M${x2 - ux * 9 - uy * 5} ${y2 - uy * 9 + ux * 5} L${x2} ${y2} L${x2 - ux * 9 + uy * 5} ${y2 - uy * 9 - ux * 5}z`}
        fill={color}
        className="fade-late"
        style={{ "--i": i } as React.CSSProperties}
      />
      {label && (
        <text
          x={(x1 + x2) / 2 + uy * 14}
          y={(y1 + y2) / 2 - ux * 14 + 4}
          textAnchor="middle"
          fontSize="12"
          fontWeight="600"
          fill={color}
          className="fade-late"
          style={{ "--i": i } as React.CSSProperties}
        >
          {label}
        </text>
      )}
    </g>
  );
}

export function SettleDiagram() {
  return (
    <Reveal className="grid gap-4 sm:grid-cols-2">
      <figure className="rounded-3xl border border-line bg-slate-2 p-4">
        <svg viewBox="0 0 280 220" className="w-full" role="img" aria-label="Seis transferencias cruzadas entre cuatro personas">
          <Arrow from={1} to={0} color="#5b6068" i={0} />
          <Arrow from={2} to={0} color="#5b6068" i={1} />
          <Arrow from={3} to={0} color="#5b6068" i={2} />
          <Arrow from={2} to={1} color="#5b6068" i={3} />
          <Arrow from={3} to={1} color="#5b6068" i={4} />
          <Arrow from={3} to={2} color="#5b6068" i={5} />
          <Nodes />
        </svg>
        <figcaption className="mt-2 text-sm text-mute">Sin corte: 6 transferencias y nadie sabe si ya quedó.</figcaption>
      </figure>
      <figure className="rounded-3xl border border-lime/40 bg-slate-2 p-4">
        <svg viewBox="0 0 280 220" className="w-full" role="img" aria-label="Dos transferencias: Beto y Carlos le pagan a Perla">
          <Arrow from={2} to={0} color="#C6F432" label="$3,520" i={7} />
          <Arrow from={3} to={0} color="#C6F432" label="$2,500" i={8} />
          <Nodes />
        </svg>
        <figcaption className="mt-2 text-sm text-mute">Con corte: 2 transferencias y todos a mano.</figcaption>
      </figure>
    </Reveal>
  );
}
