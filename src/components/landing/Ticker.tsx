import { Icon, type IconName } from "@/components/icons";

/** Cinta de cargos que pasa como un estado de cuenta en vivo. */
const ITEMS: { icon: IconName; label: string; who: string; amount: string; tone?: "lime" | "coral" }[] = [
  { icon: "home", label: "Luz CFE", who: "entre 4", amount: "$900" },
  { icon: "card", label: "Celular, 3 de 6", who: "Beto", amount: "$1,000" },
  { icon: "arrowUpRight", label: "Mario depositó", who: "a Perla", amount: "$1,100", tone: "lime" },
  { icon: "card", label: "Súper", who: "entre 4", amount: "$2,340" },
  { icon: "gift", label: "Perfume para mamá", who: "Carlos", amount: "$1,200" },
  { icon: "cash", label: "Pizzas del viernes", who: "pagó Mario", amount: "$450" },
  { icon: "card", label: "Refri, 1 de 12", who: "Mario y Beto", amount: "$1,000" },
  { icon: "home", label: "Internet", who: "entre 4", amount: "$599" },
  { icon: "arrowUpRight", label: "Beto depositó", who: "a Perla", amount: "$1,300", tone: "lime" },
  { icon: "home", label: "Agua", who: "entre 4", amount: "$350" },
];

export function Ticker() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="ticker relative overflow-hidden border-y border-line py-4" aria-hidden>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
      <ul className="ticker-track flex w-max gap-3">
        {row.map((it, i) => (
          <li key={i} className="flex items-center gap-3 rounded-full border border-line bg-slate-2 py-2 pl-2 pr-4 text-sm">
            <span className={`flex h-7 w-7 items-center justify-center rounded-full ${it.tone === "lime" ? "bg-lime text-ink" : "bg-slate text-paper/80"}`}>
              <Icon name={it.icon} className="h-4 w-4" size={16} />
            </span>
            <span className="whitespace-nowrap font-medium">{it.label}</span>
            <span className="whitespace-nowrap text-mute">{it.who}</span>
            <span className={`whitespace-nowrap font-display font-bold tabular ${it.tone === "lime" ? "text-lime" : ""}`}>{it.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
