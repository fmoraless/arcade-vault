# SPEC 02 — Home page como landing de Arcade Vault

> **Status:** Aprobado
> **Depends on:** SPEC 01 (01-pantallas-visuales-mvp.md) — implementada
> **Date:** 2026-10-31
> **Objective:** Implementar la home page como landing page de Arcade Vault en `/`, diferenciada de la biblioteca (que se mueve a `/games`), con héroe, secciones de características, juegos disponibles, estadísticas, actividad en vivo, precios y CTA final, usando animaciones `reveal` del reference y componentes locales en `home/components/`.

## Scope

**In:**

- Ruta `/` como landing page (home) — reemplaza a la biblioteca actual.
- Mover la biblioteca actual de `app/page.tsx` → `app/games/page.tsx` (ruta `/games`), manteniendo su comportamiento (buscador, filtros por categoría, grid de `GameCard`).
- Navbar con 4 enlaces: Inicio, Biblioteca, Salón de la Fama, Auth (según `references/home-about/nav.jsx`). Logo apunta a Inicio.
- Héroe: eyebrow "▸ INSERTA UNA MONEDA PARA JUGAR" con cursor parpadeante, título en 3 líneas ("EL ARCADE / CLÁSICO ESTÁ / DE VUELTA"), subtítulo, dos CTAs ("EXPLORAR JUEGOS" → `/games`, "CREAR CUENTA" → `/auth`) y indicador de scroll.
- Sección "¿POR QUÉ ARCADE VAULT?" con 4 feature cards (JUEGOS CLÁSICOS, 100% GRATIS, LADDER BOARDS, SIEMPRE CRECIENDO) con iconos pixel SVG y color por tarjeta.
- Sección "JUEGOS DISPONIBLES AHORA" con mini-rail de 6 juegos en miniatura (cover CSS + título + categoría) y botón "VER TODOS LOS JUEGOS →".
- Sección de estadísticas: 3 stat blocks (12+ JUEGOS, MILES DE PARTIDAS, GLOBAL RANKING).
- Sección "ACTIVIDAD EN VIVO": ticker de últimas puntuaciones + top jugadores de hoy con link "VER SALÓN →".
- Sección "PRECIOS": plan único $0 / SIEMPRE, lista de beneficios, FAQ (3 preguntas), botón EMPEZAR GRATIS →.
- CTA final: "¿LISTO PARA JUGAR?" + botón "INSERTAR MONEDA →" + tag gratuito.
- Siluetas flotantes decorativas (`FloatingSilhouettes`) tipo pixel arcade detrás del héroe.
- Animación de aparición escalonada por sección con `reveal` + `IntersectionObserver` (del reference, no la implementación CSS existente).
- Datos propios del home en `home/data.ts` (no se modifica `lib/data.ts` para evitar regresiones).
- Todos los textos visibles en español.
- Estilos basados en tokens de `app/globals.css` (`--bg`, `--cyan`, `--magenta`, `--yellow`, `--green`, fuentes Press Start 2P + JetBrains Mono/Courier Prime).

**Out of scope (para futuros specs):**

- Página "Acerca de" (`about.jsx`) — excluida por decisión del usuario.
- Modificación de `lib/data.ts` (`GAMES`, `CATS`, `seededScores`) ni de la biblioteca ya implementada.
- Juegos reales jugables, canvas, input, colisiones.
- Lógica de autenticación real, sesiones, JWT, backend REST o Supabase.
- Conexión a backend para usuarios registrados.
- Tests automatizados (vitest).
- Editor visual, multijugador, sincronización en la nube, app móvil nativa.

## Data model

Nuevas estructuras en `home/data.ts` (independientes de `lib/data.ts`):

```ts
export type HomeFeature = {
  id: "GAMEPAD" | "FREE" | "TROPHY" | "ROCKET";
  title: string;
  desc: string;
  color: "cyan" | "magenta" | "yellow" | "green";
};

export type HomeStat = {
  number: string;
  unit: string;
  sub: string;
};

export type HomeActivityRow = {
  player: string;
  game: string;
  score: number;
  time: string;
  color: "cyan" | "magenta" | "yellow" | "green";
};

export type HomeTopPlayer = {
  rank: number;
  player: string;
  score: number;
};

export type PricingFaq = {
  q: string;
  a: string;
};

export const HOME_FEATURES: HomeFeature[]; // 4 items
export const HOME_STATS: HomeStat[]; // 3 items
export const HOME_ACTIVITY: HomeActivityRow[]; // ticker
export const HOME_TOP_PLAYERS: HomeTopPlayer[]; // top 5 hoy
export const PRICING_FAQ: PricingFaq[]; // 3 items
export const HOME_FEATURED_GAMES: Array<{
  id: string;
  title: string;
  cat: string;
  cover: string;
}>; // 6 para mini-rail
```

## Implementation plan

1. Crear `home/data.ts` con `HOME_FEATURES`, `HOME_STATS`, `HOME_ACTIVITY`, `HOME_TOP_PLAYERS`, `PRICING_FAQ`, `HOME_FEATURED_GAMES` con datos en español. Verificación: `npx tsc --noEmit` sin errores en el archivo.
2. Crear `home/components/useReveal.ts` con el hook `useReveal()` basado en `IntersectionObserver` (threshold 0.12) que añade la clase `in` a elementos `.reveal`.
3. Crear `home/components/FloatingSilhouettes.tsx` con las 8 siluetas pixel SVG decorativas del reference.
4. Crear componentes de sección en `home/components/`: `HomeHero.tsx`, `FeatureGrid.tsx`, `MiniRail.tsx`, `HomeStats.tsx`, `ActivityLive.tsx`, `PricingSection.tsx`, `FinalCta.tsx`.
5. Reescribir `app/page.tsx` como landing page que compone todas las secciones.
6. Crear `app/games/page.tsx` con la lógica de biblioteca actual (buscador, filtros, grid de `GameCard`, estado vacío) movida desde `app/page.tsx`.
7. Actualizar `components/nav.tsx` para añadir enlace "Inicio" (activo en `/`), mantener "Biblioteca", "Salón de la Fama" y "Iniciar Sesión", y que el logo apunte a `/`.
8. Verificación final: `npm run dev` carga `/`, `/games`, `/salon`, `/auth` sin errores de consola; `npx tsc --noEmit` sin errores; `npm run lint` sin errores.

## Acceptance criteria

- [ ] La aplicación carga en `http://localhost:3000` sin errores en consola.
- [ ] La ruta `/` muestra la landing: héroe con "INSERTA UNA MONEDA PARA JUGAR", título en 3 líneas, dos CTAs, 4 secciones de contenido, stats, actividad, precios y CTA final.
- [ ] Cada sección tiene la clase `reveal` y aparece con animación escalonada al hacer scroll (IntersectionObserver).
- [ ] Clic en "EXPLORAR JUEGOS" navega a `/games`.
- [ ] Clic en "CREAR CUENTA" navega a `/auth`.
- [ ] La ruta `/games` muestra la biblioteca con buscador, filtros por categoría y grid de juegos (mismo comportamiento que la home anterior).
- [ ] El navbar muestra "Inicio" activo en `/` y "Biblioteca" activo en `/games`; el logo navega a `/`.
- [ ] `npx tsc --noEmit` no reporta errores de TypeScript.
- [ ] `npm run lint` no reporta errores.
- [ ] Todos los textos visibles están en español.
- [ ] Los datos de `lib/data.ts` no se modifican (sin regresiones en la biblioteca).

## Decisions taken and discarded

- **Sí:** Landing en `/` y biblioteca en `/games`. Razón: separa claramente la landing de marketing del catálogo jugable, coherente con el diseño de referencia.
- **Sí:** Datos propios en `home/data.ts`, no tocar `lib/data.ts`. Razón: evitar regresiones en la biblioteca y el salón ya implementados (SPEC 01).
- **Sí:** Componentes específicos del home en `home/components/`. Razón: son componentes de la landing, no reutilizables en otras pantallas.
- **Sí:** Animación `reveal` con `IntersectionObserver` del reference. Razón: coincide con el diseño de referencia y da aparición escalonada al cargar.
- **No:** Página "Acerca de". Razón: excluida por el usuario de esta spec.
- **No:** Modificar `lib/data.ts`. Razón: evitar regresiones en datos ya consumidos por biblioteca, detalle, reproductor y salón.

## Identified risks

| Risk                                                                | Mitigation                                                                                            |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `IntersectionObserver` no disponible en SSR (Next.js)               | El hook `useReveal` usa `useEffect` y verifica `typeof window !== "undefined"` antes de observar.     |
| IDs de juegos en el mini-rail que no coincidan con rutas existentes | Usar IDs reales de `GAMES` o navegar al clic hacia `/games` (biblioteca) en lugar de detalle directo. |
| Doble render de siluetas SVG en cliente/servidor                    | Las siluetas son puramente decorativas y estáticas; se renderizan igual en ambos entornos.            |

## What is **not** in this spec

- Página "Acerca de" y formulario de contacto (`about.jsx`).
- Lógica de autenticación real, juegos jugables, backend, tests, multijugador, sincronización en la nube.

---

**Estado:** `Draft`. Cambiar a `Approved` una vez re-leído.

**Próximo paso:** una vez revisada y aprobada, ejecutar `/spec-impl 02-home-landing-page` para implementarla.
