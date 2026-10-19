# CLAUDE.md

Este archivo proporciona orientación a Claude Code cuando se trabaja en este repositorio.

## Proyecto

ARCADE VAULT es un portal retro de videojuego, construido con Next.js 16 (App Router), React 19, TypeScript y Tailwind CSS v4. Es una aplicación estática-first con interacción cliente; las puntuaciones de invitados se guardan en `localStorage` y el README indica dónde conectar un backend (REST API o Supabase) para usuarios registrados — hoy no hay servidor.

## Arquitectura

- **Router**: `app/layout.tsx` es la raíz (usa `next/font/google`, importa `globals.css`, `<html lang="es">`); `app/page.tsx` es la página principal/biblioteca, que actualmente está en estado de plantilla y debe expandirse para cumplir el spec del README. Más pantallas (detalle, autenticación, salón de la fama) pueden añadirse como rutas nuevas bajo `app/`.
- **Estilo**: `app/globals.css` define tokens oscuros personalizados (por ejemplo `--background: #0a0a0f`, `--foreground`) y estilos globales; las clases van directamente en los elementos JSX. La configuración de Tailwind v4 y la regla Turbopack para `*.css` vienen en `next.config.ts`.
- **Tipos**: TypeScript estricto; alias `@/*` -> `./*` (tsconfig).
- **Lint**: ESLint flat config (`eslint.config.mjs`) heredando `eslint-config-next` (core-web-vitals + typescript), ignorando `.next/`, `out/`, `build/`.

## Comandos

- `npm run dev` — Servidor de desarrollo (Turbopack por defecto en Next 16).
- `npm run lint` — Linter ESLint.
- `npx tsc --noEmit` — Comprobación de tipos.
- `npm run build` — Build de producción.
- `npm run start` — Servir producción.

(No hay script de tests todavía; si se necesitan tests, añada `"test": "vitest"` en package.json.)

## Espec y Convenciones

Todo texto visible (etiquetas, botones, mensajes, navegación, campos de formulario, descripciones) debe estar en español. Palabras clave: ARCADE VAULT; estados: Biblioteca, Salón de la Fama, Iniciar Sesión, PUNTUACIÓN GUARDADA, GAME OVER, PAUSA, SALIR.
Diseño: fondo #0a0a0f, neones #00f5ff, #ff006e, #f5ff00; texturas pixel/scanline; fuentes "Press Start 2P" + "Courier Prime" (el layout actual usa Geist/Geist_Mono — coordínese con el README al completar). Efectos CRT, grid de perspectiva animado, aparición escalonada al cargar puntuaciones.
Almacenamiento: `localStorage` para puntuaciones de invitado; `useState` para autenticación; sin llamadas de red hoy.

## Notas y Consideraciones

- El README es la especificación autoritaria para la página principal; desarrola progresivamente: biblioteca → detalle → juego → autenticación → salón.
- Evite valores de color hardcodeados: prefiera los tokens CSS en `globals.css`.
- Mantenga una pantalla por página y saque la lógica fuera del layout hasta que sea necesario.