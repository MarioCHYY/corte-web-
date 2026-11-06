# corte · sitio promocional

La página que presenta corte: portada con la regla del corte interactiva, cómo funciona, funciones, comparación, privacidad, preguntas frecuentes, centro de ayuda, aviso de privacidad y términos.

Es un sitio **100% estático** (Next.js con `output: "export"`): no necesita base de datos ni servidor. `npm run build` genera la carpeta `out/` y esa carpeta se puede subir a cualquier hosting.

La app (registro, grupos, cuentas) es otro proyecto. Los botones de "Crear cuenta" y "Entrar" de este sitio mandan a la dirección que pongas en `NEXT_PUBLIC_APP_URL`.

## Verlo en tu computadora

```bash
npm install
npm run dev          # http://localhost:3001
```

Para ver exactamente lo que se va a publicar:

```bash
npm run build        # genera out/
npm run preview      # sirve out/ en http://localhost:3001
```

## Configuración

Copia `.env.example` como `.env.local` (o ponlas en el panel de tu hosting):

| Variable | Para qué |
|---|---|
| `NEXT_PUBLIC_APP_URL` | Dirección de la app. Ej. `https://app.corte.mx`. Los botones de crear cuenta y entrar van ahí. |
| `NEXT_PUBLIC_SITE_URL` | Dirección pública de este sitio. Sirve para la imagen que sale al compartir el link. En Vercel se detecta sola. |

El correo de contacto y el nombre del responsable están en `src/lib/site.ts`.

## Publicarlo

### Opción A: Vercel (recomendada)

1. Sube esta carpeta a un repositorio de GitHub.
2. En [vercel.com](https://vercel.com) → **Add New → Project** → elige el repositorio.
3. Vercel detecta Next.js solo. En **Environment Variables** agrega `NEXT_PUBLIC_APP_URL`.
4. **Deploy**. Te da un link tipo `https://corte-web.vercel.app`.

### Opción B: Netlify arrastrando la carpeta

1. Corre `npm run build`.
2. Entra a [app.netlify.com/drop](https://app.netlify.com/drop) y arrastra la carpeta **`out`**.
3. Listo, te da un link. (Si cambias algo, vuelve a hacer build y arrastrar.)

### Opción C: Netlify conectado a GitHub

Ya incluye `netlify.toml`: conecta el repositorio y Netlify usa `npm run build` y publica `out/`.

## Estructura

```
src/app/                 páginas: portada, ayuda, privacidad, términos
src/components/landing/  regla del corte, demo de meses sin intereses, diagrama de saldos
src/components/          logo, íconos, piezas compartidas
src/lib/domain/          la misma lógica de cortes y mensualidades que usa la app
src/lib/site.ts          datos del sitio y dirección de la app
```
