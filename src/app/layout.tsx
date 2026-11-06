import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE } from "@/lib/site";

const inter = localFont({
  variable: "--font-inter",
  display: "swap",
  src: [
    { path: "./fonts/inter-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/inter-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/inter-latin-600-normal.woff2", weight: "600" },
  ],
});

const grotesk = localFont({
  variable: "--font-grotesk",
  display: "swap",
  src: [
    { path: "./fonts/space-grotesk-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/space-grotesk-latin-700-normal.woff2", weight: "700" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.siteUrl),
  title: { default: "corte · Gastos compartidos, a tiempo", template: "%s · corte" },
  description:
    "Reparte gastos con tu familia o roomies y controla la tarjeta compartida: fecha de corte, fecha límite y meses sin intereses.",
};

export const viewport: Viewport = {
  themeColor: "#121417",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-MX" className={`${inter.variable} ${grotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
