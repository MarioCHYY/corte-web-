import { Reveal } from "@/components/motion/Reveal";
import { stagger } from "@/components/motion/stagger";

/** Pantallas reales de la app dentro de marcos de celular. */
const SCREENS = [
  { src: "/screens/resumen.webp", title: "Resumen", body: "Cuánto le debes al titular este corte y para cuándo." },
  { src: "/screens/corte.webp", title: "Estado de cuenta", body: "Lo que le toca a cada quien, con sus mensualidades." },
  { src: "/screens/gasto.webp", title: "Agregar gasto", body: "Contado o a meses, y entre quiénes se divide." },
  { src: "/screens/movimientos.webp", title: "Movimientos", body: "Todos los gastos y depósitos, mes por mes." },
  { src: "/screens/cuenta.webp", title: "Mi cuenta", body: "Perfil, seguridad, privacidad y ayuda." },
];

const LIFT = ["lg:translate-y-10", "lg:translate-y-4", "lg:-translate-y-2", "lg:translate-y-4", "lg:translate-y-10"];

export function PhoneGallery() {
  return (
    <Reveal
      as="ul"
      className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-8 pt-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-0"
    >
      {SCREENS.map((s, i) => (
        <li key={s.src} className={`w-[62%] shrink-0 snap-center sm:w-[38%] lg:w-auto ${LIFT[i]}`}>
          <div data-r="zoom" style={stagger(i)}>
          <div className="group rounded-[34px] bg-black p-2 shadow-2xl shadow-black/60 ring-1 ring-line transition duration-500 hover:-translate-y-2 hover:ring-lime/50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.src}
              alt={`Pantalla de ${s.title} en corte`}
              width={585}
              height={1266}
              loading="lazy"
              className="block w-full rounded-[27px]"
            />
          </div>
          <p className="mt-4 font-semibold">{s.title}</p>
          <p className="text-sm text-paper/60">{s.body}</p>
          </div>
        </li>
      ))}
    </Reveal>
  );
}
