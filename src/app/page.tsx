import type { Metadata } from "next";
import Link from "next/link";
import { CorteIcon, CorteLogo } from "@/components/brand/Logo";
import { Icon, type IconName } from "@/components/icons";
import { CutoffRuler } from "@/components/landing/CutoffRuler";
import { MsiDemo } from "@/components/landing/MsiDemo";
import { SettleDiagram } from "@/components/landing/SettleDiagram";
import { appLink } from "@/lib/site";
import { AutoVideo } from "@/components/landing/AutoVideo";
import { PhoneGallery } from "@/components/landing/PhoneGallery";
import { ProblemDemo } from "@/components/landing/ProblemDemo";
import { InstallGuide } from "@/components/pwa/InstallGuide";
import { SITE } from "@/lib/site";
import { Ticker } from "@/components/landing/Ticker";
import { CountUp } from "@/components/motion/CountUp";
import { HeroGlow } from "@/components/motion/HeroGlow";
import { Reveal } from "@/components/motion/Reveal";
import { stagger } from "@/components/motion/stagger";

export const metadata: Metadata = {
  title: { absolute: "corte: la tarjeta de todos en casa, sin enredos" },
  description:
    "Reparte los gastos de la casa y controla la tarjeta que usan todos: en qué corte cae cada compra, los meses sin intereses y cuánto le toca depositar a cada quien antes de la fecha límite.",
};

// ---------------------------------------------------------------------------
// Contenido
// ---------------------------------------------------------------------------

const STEPS = [
  { title: "Crea el grupo de tu casa", body: "Agrega a todos por nombre, aunque no tengan cuenta. Luego les mandas un link para que entren." },
  { title: "Da de alta la tarjeta", body: "Quién es el titular, qué día corta y cuántos días da el banco para pagar. Viene en el estado de cuenta." },
  { title: "Registra lo que se compra", body: "Si es de todos, de una persona o un regalo, y si fue de contado o a meses. Toma unos segundos." },
  { title: "Cada quien ve su parte", body: "Cuánto depositarle al titular, antes de qué día y qué viene en los próximos meses." },
];

const MORE: { icon: IconName; title: string; body: string }[] = [
  { icon: "users", title: "Personas sin cuenta", body: "La abuela también entra en las cuentas aunque nunca abra la app." },
  { icon: "card", title: "Varias tarjetas", body: "Cada una con su titular, su día de corte y sus días para pagar." },
  { icon: "gift", title: "Regalos", body: "Se le cobra a quien regala, aunque la compra salga en otra tarjeta." },
  { icon: "file", title: "Compara con el banco", body: "Escribe el total del estado de cuenta y corte te dice si falta registrar algo." },
  { icon: "cash", title: "Gastos en efectivo", body: "La pizza que pagó Mario también entra en los saldos del grupo." },
  { icon: "download", title: "Tus datos son tuyos", body: "Descárgalos cuando quieras o elimina tu cuenta desde la app." },
];

type Mark = "yes" | "no" | "manual";
const COMPARE: { row: string; chat: Mark; sheet: Mark; apps: Mark; corte: Mark }[] = [
  { row: "Divide gastos entre varias personas", chat: "manual", sheet: "manual", apps: "yes", corte: "yes" },
  { row: "Sabe en qué corte cae cada compra", chat: "no", sheet: "manual", apps: "no", corte: "yes" },
  { row: "Arma el calendario de meses sin intereses", chat: "no", sheet: "manual", apps: "no", corte: "yes" },
  { row: "Dice cuánto depositarle al titular en cada corte", chat: "manual", sheet: "manual", apps: "no", corte: "yes" },
  { row: "Cada quien lo ve desde su celular", chat: "yes", sheet: "manual", apps: "yes", corte: "yes" },
];

const PRIVACY: { icon: IconName; title: string; body: string }[] = [
  { icon: "card", title: "Nunca pedimos tu tarjeta", body: "Ni el número, ni el CVV, ni tu NIP. Solo, si quieres, los últimos 4 dígitos." },
  { icon: "bank", title: "No se conecta a tu banco", body: "Los montos los registran ustedes. corte no mueve dinero." },
  { icon: "ban", title: "Sin anuncios", body: "No vendemos tus datos ni los usamos para publicidad." },
  { icon: "lock", title: "Tu grupo es privado", body: "Solo lo ven las personas que invitas." },
];

const FAQ = [
  {
    q: "¿Cuánto cuesta?",
    a: "Nada. corte es gratis.",
  },
  {
    q: "¿Necesito darle a corte los datos de mi tarjeta?",
    a: "No. Solo el nombre de la tarjeta, quién es el titular, el día de corte y los días para pagar. Los últimos 4 dígitos son opcionales y solo sirven para reconocerla.",
  },
  {
    q: "¿Y si en mi casa no usamos una tarjeta compartida?",
    a: "corte también funciona como una app normal de gastos compartidos: registras quién pagó qué y te dice quién le debe a quién.",
  },
  {
    q: "¿Todos tienen que crear cuenta?",
    a: "No. Puedes agregar a las personas por nombre y llevar sus cuentas tú. Si después se unen, eligen su nombre y ven todo lo que ya tenían.",
  },
  {
    q: "¿Qué pasa con las compras que se hacen justo el día de corte?",
    a: "Entran en ese mismo estado de cuenta. Las del día siguiente ya se van al próximo. corte lo calcula solo con la fecha de cada compra.",
  },
  {
    q: "¿Puedo usarlo desde el celular?",
    a: "Sí. corte funciona en el navegador de cualquier celular o computadora, sin instalar nada.",
  },
];

// ---------------------------------------------------------------------------
// Página
// ---------------------------------------------------------------------------

export default function Home() {
  const primaryHref = appLink("/registro");
  const primaryLabel = "Crear cuenta gratis";

  return (
    <main className="flex-1 overflow-x-clip">
      {/* ---------- Navegación ---------- */}
      <header className="sticky top-0 z-40 border-b border-transparent bg-ink/80 backdrop-blur supports-[backdrop-filter]:bg-ink/70">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-4 sm:px-6">
          <Link href="/" aria-label="corte, inicio">
            <CorteLogo className="h-8 w-auto" />
          </Link>
          <nav className="hidden flex-1 gap-6 text-sm text-paper/70 md:flex">
            <a href="#como-funciona" className="hover:text-paper">
              Cómo funciona
            </a>
            <a href="#funciones" className="hover:text-paper">
              Funciones
            </a>
            <a href="#instalar" className="hover:text-paper">
              Instalar
            </a>
            <a href="#privacidad" className="hover:text-paper">
              Privacidad
            </a>
            <a href="#preguntas" className="hover:text-paper">
              Preguntas
            </a>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <a href={appLink("/entrar")} className="rounded-xl px-3 py-2 text-sm font-medium text-paper/80 hover:text-paper">
              Entrar
            </a>
            <a href={primaryHref} className="lift rounded-xl bg-lime px-4 py-2 text-sm font-semibold text-ink hover:bg-lime-dim">
              Crear cuenta
            </a>
          </div>
        </div>
      </header>

      {/* ---------- Portada ---------- */}
      <HeroGlow>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pt-20">
        <div className="grid items-end gap-8 lg:grid-cols-[1.25fr_1fr]">
          <h1 className="font-display text-[44px] font-bold leading-[0.98] tracking-[-0.035em] sm:text-7xl lg:text-[84px]">
            {"La tarjeta es de una. Las compras son de todos.".split(" ").map((w, i) => (
              <span key={i} className="word-in" style={stagger(i)}>
                {w}
                {"\u00a0"}
              </span>
            ))}
          </h1>
          <div className="lg:pb-3">
            <p className="fade-up text-lg leading-relaxed text-paper/75" style={stagger(1)}>
              corte reparte los gastos de la casa, sabe en qué estado de cuenta cae cada compra y le dice a cada quien cuánto depositar
              antes de la fecha límite. Sin hojas de cálculo y sin intereses.
            </p>
            <div className="fade-up mt-6 flex flex-wrap gap-3" style={stagger(2)}>
              <a href={primaryHref} className="lift rounded-xl bg-lime px-5 py-3 font-semibold text-ink hover:bg-lime-dim">
                {primaryLabel}
              </a>
              <a href="#como-funciona" className="rounded-xl border border-line px-5 py-3 font-medium text-paper transition hover:border-mute/60">
                Ver cómo funciona
              </a>
            </div>
          </div>
        </div>
        <div className="fade-up mt-14" style={stagger(3)}>
          <CutoffRuler />
        </div>
      </section>
      </HeroGlow>

      <Ticker />

      {/* ---------- Video del logo ---------- */}
      <Reveal as="section" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div data-r="zoom" className="relative overflow-hidden rounded-[32px] border border-line bg-black shadow-[0_40px_120px_-40px_rgba(198,244,50,0.35)]">
          <AutoVideo src="/video/corte-intro.mp4" poster="/video/corte-intro.jpg" label="Animación del logo de corte" className="block aspect-video w-full" />
        </div>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <p data-r style={stagger(1)} className="max-w-xl text-lg text-paper/70">
            La tarjeta se parte en dos: lo que ya entró en este corte y lo que se va al siguiente. De ahí viene el nombre.
          </p>
          <a data-r style={stagger(2)} href="#recorrido" className="lift rounded-xl border border-line px-5 py-3 font-medium hover:border-mute/60">
            Ver el recorrido de la app
          </a>
        </div>
      </Reveal>

      {/* ---------- El problema ---------- */}
      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <Reveal>
<div data-r><h2 className="max-w-3xl font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-6xl">
            Así se cobra hoy la tarjeta en muchas casas.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-ink/70">
            Una persona recibe el estado de cuenta, hace las cuentas a mano y persigue a todos por el chat. Cada mes.
          </p></div>
</Reveal>
          <ProblemDemo />
        </div>
      </section>

      {/* ---------- Cómo funciona ---------- */}
      <section id="como-funciona" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28">
        <Reveal>
          <h2 data-r className="max-w-2xl font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-5xl">
            Se configura una vez. Después solo registras.
          </h2>
        </Reveal>
        <Reveal as="ol" className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          <span className="grow-x absolute left-5 top-5 hidden h-0.5 w-[calc(100%-2.5rem)] rounded-full bg-gradient-to-r from-lime via-lime/60 to-line md:block" aria-hidden />
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative">
              <span
                data-r="pop"
                style={stagger(i * 3 + 1)}
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-lime font-display text-lg font-bold text-ink ring-8 ring-ink"
              >
                {i + 1}
              </span>
              <div data-r style={stagger(i * 3 + 2)}>
                <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-paper/70">{s.body}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </section>

      {/* ---------- Funciones ---------- */}
      <section id="funciones" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto max-w-6xl space-y-24 px-4 py-20 sm:px-6 sm:space-y-32 sm:py-28">
          <Reveal className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div data-r="left">
              <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-5xl">Meses sin intereses que no se olvidan.</h2>
              <p className="mt-4 text-lg leading-relaxed text-paper/70">
                Registras la compra una vez. corte pone cada mensualidad en su corte, la reparte entre quienes la compraron y te avisa cuánto falta
                para terminar.
              </p>
            </div>
            <div data-r="right" style={stagger(2)}>
              <MsiDemo />
            </div>
          </Reveal>

          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div className="order-2 lg:order-1">
              <SettleDiagram />
            </div>
            <Reveal className="order-1 lg:order-2">
              <div data-r="right">
              <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-5xl">Quedar a mano con menos transferencias.</h2>
              <p className="mt-4 text-lg leading-relaxed text-paper/70">
                Gastos en efectivo, pagos con tarjeta, depósitos y regalos: corte junta todo y te dice el número mínimo de pagos para que el grupo
                quede en ceros.
              </p>
              <p className="mt-6 flex items-baseline gap-3">
                <CountUp from={6} to={2} duration={1800} className="font-display text-6xl font-bold text-lime" />
                <span className="text-mute">transferencias en lugar de 6</span>
              </p>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <h2 data-r className="max-w-2xl font-display text-3xl font-bold leading-tight tracking-[-0.02em] sm:text-4xl">Y lo que pide una casa de verdad.</h2>
            <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {MORE.map((f, i) => (
                <li key={f.title} data-r style={stagger(i + 1)} className="group flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate text-lime transition duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-lime group-hover:text-ink">
                    <Icon name={f.icon} />
                  </span>
                  <span>
                    <span className="block font-semibold">{f.title}</span>
                    <span className="mt-1 block leading-relaxed text-paper/65">{f.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---------- Comparación ---------- */}
      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <Reveal>
          <h2 data-r className="max-w-3xl font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-5xl">
            Hecho para la forma en que se usa la tarjeta en México.
          </h2>
          </Reveal>
          <p className="mt-4 max-w-2xl text-lg text-ink/70">
            Las apps de gastos compartidos dividen bien la cuenta del restaurante, pero no saben qué es una fecha de corte ni unos meses sin
            intereses.
          </p>
          {/* En celular: una lista por función */}
          <Reveal as="ul" className="mt-10 space-y-3 md:hidden">
            {COMPARE.map((r, i) => (
              <li key={r.row} data-r style={stagger(i)} className="rounded-2xl bg-white p-4">
                <p className="font-semibold">{r.row}</p>
                <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                  <dt className="font-display font-bold">corte</dt>
                  <dd>
                    <MarkCell mark={r.corte} />
                  </dd>
                  {(
                    [
                      ["Apps de gastos", r.apps],
                      ["Hoja de cálculo", r.sheet],
                      ["Chat y notas", r.chat],
                    ] as const
                  ).map(([label, m]) => (
                    <div key={label} className="contents">
                      <dt className="text-ink/60">{label}</dt>
                      <dd>
                        <MarkCell mark={m} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </Reveal>
          <Reveal className="mt-10 hidden md:block">
            <table className="w-full border-separate border-spacing-0 text-left">
              <thead>
                <tr className="text-sm text-ink/60">
                  <th className="w-[38%] pb-4 font-medium" scope="col">
                    <span className="sr-only">Función</span>
                  </th>
                  <th className="pb-4 font-medium" scope="col">
                    Chat y notas
                  </th>
                  <th className="pb-4 font-medium" scope="col">
                    Hoja de cálculo
                  </th>
                  <th className="pb-4 font-medium" scope="col">
                    Apps de gastos
                  </th>
                  <th className="rounded-t-2xl bg-ink pb-4 pt-4 text-center font-display text-base font-bold text-paper" scope="col">
                    corte
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((r, i) => (
                  <tr key={r.row}>
                    <th scope="row" className="border-t border-ink/10 py-4 pr-4 font-medium">
                      {r.row}
                    </th>
                    {(["chat", "sheet", "apps"] as const).map((k) => (
                      <td key={k} className="border-t border-ink/10 py-4">
                        <MarkCell mark={r[k]} />
                      </td>
                    ))}
                    <td className={`bg-ink py-4 text-center ${i === COMPARE.length - 1 ? "rounded-b-2xl" : ""}`}>
                      <span data-r="pop" style={stagger(i * 2 + 3)} className="inline-block">
                        <MarkCell mark={r.corte} highlight />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {/* ---------- Privacidad ---------- */}
      <section id="privacidad" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div data-r>
            <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-5xl">Las cuentas de tu casa se quedan en tu casa.</h2>
            <p className="mt-4 text-lg leading-relaxed text-paper/70">
              corte guarda lo necesario para hacer las cuentas y nada más.{" "}
              <Link href="/privacidad" className="text-lime underline-offset-4 hover:underline">
                Lee el aviso de privacidad
              </Link>
              .
            </p>
            </div>
          </Reveal>
          <Reveal as="ul" className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
            {PRIVACY.map((p, i) => (
              <li key={p.title} className="bg-ink p-6">
                <div data-r style={stagger(i)}>
                <Icon name={p.icon} className="h-6 w-6 text-lime" size={24} />
                <p className="mt-4 font-semibold">{p.title}</p>
                <p className="mt-1 text-paper/65">{p.body}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- En el celular ---------- */}
      <section className="border-y border-line bg-slate-2">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-5xl">Cada quien ve lo suyo, desde su celular.</h2>
            <Reveal as="ul" className="mt-8 space-y-5">
              {[
                ["Les mandas un link", "Entran con su cuenta de Google o su correo y eligen su nombre."],
                ["Ven cuánto les toca", "Lo de este corte, para cuándo, y las mensualidades que vienen."],
                ["El titular ve quién ya pagó", "Y cuánto falta para cubrir el total sin intereses."],
              ].map(([t, b], i) => (
                <li key={t} data-r="left" style={stagger(i + 1)} className="flex gap-4">
                  <Icon name="check" className="mt-1 h-5 w-5 text-lime" strokeWidth={2.4} />
                  <span>
                    <span className="block font-semibold">{t}</span>
                    <span className="block text-paper/65">{b}</span>
                  </span>
                </li>
              ))}
            </Reveal>
          </div>
          <PhoneMock />
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <Reveal>
            <h3 data-r className="font-display text-2xl font-bold sm:text-3xl">
              Así se ve cada pantalla
            </h3>
          </Reveal>
          <div className="mt-8">
            <PhoneGallery />
          </div>
        </div>
      </section>

      {/* ---------- Instalar ---------- */}
      <section id="instalar" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28">
        <Reveal className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <h2 data-r className="font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-5xl">
            Instálala en tu pantalla de inicio, sin tienda de apps.
          </h2>
          <p data-r style={stagger(1)} className="text-lg leading-relaxed text-paper/70">
            corte se instala desde el navegador en menos de un minuto. Queda con su ícono y se abre a pantalla completa, como cualquier app.
          </p>
        </Reveal>
        <div className="mt-10">
          <InstallGuide appUrl={SITE.appUrl} />
        </div>
      </section>

      {/* ---------- Recorrido ---------- */}
      <section id="recorrido" className="scroll-mt-20 border-t border-line bg-slate-2">
        <Reveal className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 data-r className="max-w-2xl font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-5xl">
              Mira toda la app en tres minutos.
            </h2>
            <p data-r style={stagger(1)} className="max-w-sm text-paper/65">
              Desde crear la cuenta hasta registrar un depósito, con la app real funcionando.
            </p>
          </div>
          <div data-r="zoom" style={stagger(2)} className="mt-10 overflow-hidden rounded-[28px] border border-line bg-black">
            <video
              src="/video/recorrido.mp4"
              poster="/video/recorrido.jpg"
              controls
              preload="none"
              playsInline
              className="block aspect-video w-full"
              aria-label="Recorrido completo por la app corte"
            />
          </div>
        </Reveal>
      </section>

      {/* ---------- Preguntas ---------- */}
      <section id="preguntas" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28">
        <Reveal>
          <h2 data-r className="font-display text-4xl font-bold tracking-[-0.03em] sm:text-5xl">Preguntas frecuentes</h2>
        </Reveal>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center gap-4 text-lg font-semibold">
                <span className="flex-1">{f.q}</span>
                <Icon name="chevronRight" className="h-5 w-5 text-mute transition group-open:rotate-90" />
              </summary>
              <p className="mt-3 max-w-2xl leading-relaxed text-paper/70">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-6 text-paper/65">
          ¿Tienes otra duda?{" "}
          <Link href="/ayuda" className="text-lime underline-offset-4 hover:underline">
            Visita el centro de ayuda
          </Link>
          .
        </p>
      </section>

      {/* ---------- Llamado final ---------- */}
      <Reveal as="section" className="px-4 pb-20 sm:px-6">
        <div data-r="zoom" className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-lime px-6 py-16 text-ink sm:px-14 sm:py-20">
          <CorteIcon variant="light" className="slow-spin pointer-events-none absolute -right-10 -top-6 h-64 w-64 opacity-10 sm:h-96 sm:w-96" />
          <h2 className="relative max-w-2xl font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-6xl">
            Que el próximo corte se pague completo y a tiempo.
          </h2>
          <p className="relative mt-4 max-w-xl text-lg text-ink/75">Crea el grupo de tu casa en un par de minutos. Es gratis.</p>
          <div className="relative mt-8 flex flex-wrap gap-3">
            <a href={primaryHref} className="lift rounded-xl bg-ink px-6 py-3.5 font-semibold text-paper hover:bg-slate">
              {primaryLabel}
            </a>
            <a href={appLink("/entrar")} className="rounded-xl border border-ink/25 px-6 py-3.5 font-semibold text-ink transition hover:bg-ink/5">
              Ya tengo cuenta
            </a>
          </div>
        </div>
      </Reveal>

      {/* ---------- Pie ---------- */}
      <footer className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <CorteLogo className="h-8 w-auto" />
            <p className="mt-3 max-w-xs text-sm text-mute">Gastos compartidos, a tiempo. Hecho en México.</p>
          </div>
          <FooterCol
            title="Producto"
            links={[
              ["Cómo funciona", "#como-funciona"],
              ["Funciones", "#funciones"],
              ["Instalar en tu celular", "/instalar"],
              ["Ver el recorrido", "#recorrido"],
              ["Preguntas", "#preguntas"],
            ]}
          />
          <FooterCol
            title="Cuenta"
            links={[
              ["Entrar", appLink("/entrar")],
              ["Crear cuenta", appLink("/registro")],
            ]}
          />
          <FooterCol
            title="Ayuda y legal"
            links={[
              ["Centro de ayuda", "/ayuda"],
              ["Aviso de privacidad", "/privacidad"],
              ["Términos y condiciones", "/terminos"],
            ]}
          />
        </div>
      </footer>
    </main>
  );
}

// ---------------------------------------------------------------------------
// Piezas
// ---------------------------------------------------------------------------

function MarkCell({ mark, highlight }: { mark: Mark; highlight?: boolean }) {
  if (mark === "yes") {
    return (
      <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${highlight ? "text-lime" : "text-ink"}`}>
        <Icon name="check" className="h-4 w-4" size={16} strokeWidth={2.6} />
        Sí
      </span>
    );
  }
  if (mark === "manual") return <span className="text-sm text-ink/60">A mano</span>;
  return <span className="text-sm text-ink/40">No</span>;
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p className="text-sm font-semibold">{title}</p>
      <ul className="mt-3 space-y-2 text-sm text-mute">
        {links.map(([label, href]) => (
          <li key={href}>
            {href.startsWith("#") || href.startsWith("http") ? (
              <a href={href} className="hover:text-paper">
                {label}
              </a>
            ) : (
              <Link href={href} className="hover:text-paper">
                {label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PhoneMock() {
  return (
    <div className="relative mx-auto w-full max-w-[320px]" aria-hidden>
      {[
        { who: "Beto", text: "le depositó $1,300 a Perla", d: "0s", c: "#C4B5FD" },
        { who: "Carlos", text: "agregó Perfume para mamá", d: "4.5s", c: "#FDBA74" },
      ].map((t) => (
        <div
          key={t.who}
          className="toast-cycle absolute -left-6 top-24 z-10 flex w-[270px] items-center gap-3 rounded-2xl border border-line bg-slate/95 px-3.5 py-3 opacity-0 shadow-2xl shadow-black/60 backdrop-blur sm:-left-16"
          style={{ "--d": t.d } as React.CSSProperties}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold text-ink" style={{ background: t.c }}>
            {t.who[0]}
          </span>
          <span className="text-sm leading-tight">
            <b>{t.who}</b> {t.text}
            <span className="block text-xs text-mute">corte, ahora</span>
          </span>
        </div>
      ))}
      <div className="float rounded-[44px] bg-black p-3 shadow-2xl shadow-black/60 ring-1 ring-line">
        <div className="overflow-hidden rounded-[34px] bg-ink">
          <div className="flex items-center justify-between px-5 pb-3 pt-4">
            <CorteIcon className="h-6 w-6" />
            <span className="text-sm font-semibold">Casa</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#C4B5FD] text-xs font-bold text-ink">B</span>
          </div>
          <div className="px-4 pb-6">
            <div className="rounded-2xl border border-line bg-slate-2 p-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold">Tarjeta de Perla</span>
                <span className="rounded-full bg-coral/15 px-2 py-0.5 font-semibold text-coral">faltan 4 días</span>
              </div>
              <p className="mt-3 text-xs text-mute">Le debes a Perla</p>
              <p className="font-display text-3xl font-bold tabular">$1,300.00</p>
              <p className="text-xs text-mute">antes del 25 de noviembre</p>
              <div className="mt-3 rounded-xl bg-lime py-2 text-center text-sm font-semibold text-ink">Registrar mi depósito</div>
            </div>
            <p className="mb-2 mt-5 text-xs font-semibold text-mute">Lo que viene para ti</p>
            <ul className="divide-y divide-line rounded-2xl border border-line bg-slate-2 text-xs">
              {[
                ["25 de diciembre", "$1,500.00"],
                ["25 de enero", "$1,500.00"],
                ["25 de febrero", "$1,500.00"],
              ].map(([d, a]) => (
                <li key={d} className="flex justify-between px-3 py-2.5">
                  <span className="text-paper/80">Antes del {d}</span>
                  <span className="font-semibold tabular">{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
