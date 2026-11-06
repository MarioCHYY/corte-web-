import type { Metadata } from "next";
import Link from "next/link";
import { CorteLogo } from "@/components/brand/Logo";
import { Icon } from "@/components/icons";
import { InstallGuide } from "@/components/pwa/InstallGuide";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Instalar en tu celular",
  description: "Cómo agregar corte a la pantalla de inicio de tu iPhone o Android, sin tienda de apps.",
};

export default function InstallPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 pt-6 sm:px-6">
      <div className="flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-mute hover:text-paper">
          <Icon name="chevronLeft" className="h-4 w-4" /> Inicio
        </Link>
        <CorteLogo className="h-7 w-auto" />
      </div>
      <h1 className="mt-6 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">Instala corte en tu celular</h1>
      <p className="mt-3 max-w-xl text-lg text-paper/70">
        No necesitas App Store ni Play Store: se instala desde el navegador en menos de un minuto y queda con su ícono, como cualquier app.
      </p>
      <div className="mt-10">
        <InstallGuide appUrl={SITE.appUrl} />
      </div>
    </main>
  );
}
