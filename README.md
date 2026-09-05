# Portafolio — Giacomo Baldessari

Sitio personal de [Giacomo Baldessari](https://gbaldessari.com), desarrollador full stack en La Serena, Chile. Muestra plataformas web en producción para pymes y organizaciones públicas, con casos de estudio, formación y contacto (WhatsApp, correo y LinkedIn).

Desarrollado con **React**, **TypeScript** y **Vite**. En producción: [gbaldessari.com](https://gbaldessari.com).

## Qué incluye

- **Inicio**: propuesta de valor, servicios, proceso de trabajo y FAQ.
- **Proyectos**: seis casos reales (La Alpina Park, Ventas Fama, Laguna Roja, ACAMU, GP-Performance, UOCT Connect), cada uno con página de caso de estudio.
- **Sobre mí**: experiencia freelance, formación (egresado UCN), idiomas y stack.
- **Contacto**: WhatsApp, correo, LinkedIn, GitHub y descarga del CV.
- Español e inglés con rutas propias (`/` y `/en`, `/projects` y `/en/projects`, `/about` y `/en/about`, etc.).
- Tema claro/oscuro, SEO (canonical, Open Graph, JSON-LD, sitemap y `robots.txt`) y diseño responsivo.

## Requisitos

- **Node.js** 18 o superior
- **npm** (incluido con Node.js)

## Cómo correrlo en local

1. Clona el repositorio:

   ```bash
   git clone https://github.com/gbaldessari/my-portfolio.git
   cd my-portfolio
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Copia las variables de entorno:

   ```bash
   cp .env.example .env
   ```

   En Windows (PowerShell):

   ```powershell
   Copy-Item .env.example .env
   ```

   Ajusta al menos:

   | Variable | Uso |
   | --- | --- |
   | `VITE_SITE_URL` | URL del sitio sin barra final (canonical, Open Graph y sitemap). En local puede quedar el valor de ejemplo. |
   | `VITE_WHATSAPP_NUMBER` | Número de WhatsApp con código de país, solo dígitos (ej. `56912345678`). |

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

   La app queda en [http://localhost:5173](http://localhost:5173).

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo (Vite). |
| `npm run build` | Genera `public/sitemap.xml` y `public/robots.txt`, luego compila a `dist/`. |
| `npm run preview` | Sirve el build de producción en local. |
| `npm run lint` | ESLint. |

## Estructura

```text
public/
├── assets/            # Iconos, logos, capturas de proyectos y stack
├── documents/         # CV (Giacomo_Baldessari_CV.pdf)
scripts/
└── generate-sitemap.mjs
src/
├── components/        # Layout, secciones del home, UI y SEO
├── config/            # Sitio, navegación y WhatsApp
├── content/projects/  # Metadatos de los casos de estudio
├── context/           # Tema claro/oscuro
├── hooks/
├── i18n/              # Rutas ES/EN y copys (es.json, en.json)
├── pages/             # Inicio, proyectos, caso, sobre mí, contacto, 404
├── seo/
├── App.tsx
└── main.tsx
```

Los textos de la web viven en `src/i18n/locales/`. Los proyectos se definen en `src/content/projects/meta.ts` y se enriquecen con las traducciones.

## Rutas

| Español | English |
| --- | --- |
| `/` | `/en` |
| `/projects` | `/en/projects` |
| `/projects/:slug` | `/en/projects/:slug` |
| `/about` | `/en/about` |
| `/contact` | `/en/contact` |

## Tecnologías

- React 19 y React Router
- TypeScript
- Vite 6
- i18next / react-i18next
- CSS propio (sin framework de UI)

## Contacto

- **Sitio**: [gbaldessari.com](https://gbaldessari.com)
- **Correo**: [giacomo.baldessari.dev@gmail.com](mailto:giacomo.baldessari.dev@gmail.com)
- **LinkedIn**: [giacomo-baldessari](https://www.linkedin.com/in/giacomo-baldessari/)
- **GitHub**: [gbaldessari](https://github.com/gbaldessari)
