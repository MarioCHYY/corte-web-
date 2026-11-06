/**
 * Datos del sitio. Cámbialos antes de publicar.
 * Las variables NEXT_PUBLIC_* se ponen en un archivo .env o en el panel del hosting.
 */
export const SITE = {
  name: "corte",
  /** Persona o empresa responsable de los datos */
  owner: "Mario Bencomo",
  /** Correo para dudas y solicitudes de privacidad (pon uno real antes de publicar) */
  contactEmail: "privacidad@ejemplo.com",
  /** Fecha de la última actualización de los documentos legales */
  legalUpdated: "5 de noviembre de 2026",
  /** Dirección donde vive la app (registro, entrar, grupos) */
  appUrl: (process.env.NEXT_PUBLIC_APP_URL || (process.env.VERCEL ? "https://app.corte.mariobencomodev.com" : "http://localhost:3000")).replace(/\/$/, ""),
  /** Dirección pública de este sitio, para las imágenes al compartir el link */
  siteUrl: (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
    "http://localhost:3001"
  ).replace(/\/$/, ""),
};

/** Link a una pantalla de la app, por ejemplo appLink("/registro"). */
export const appLink = (path: string) => SITE.appUrl + path;
