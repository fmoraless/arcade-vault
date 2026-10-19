# SPEC 01 — Pantallas visuales del MVP de Arcade Vault

> **Status:** Draft
> **Depends on:** Ninguna
> **Date:** 2026-10-19
> **Objective:** Desarrollar la parte visual del MVP de Arcade Vault con las pantallas de biblioteca, detalle del juego, reproductor, salón de la fama y autenticación, usando rutas de archivos de Next.js 16, componentes de React, datos mockeados y Tailwind CSS.

## Scope

**In:**

- Ruta `/` (biblioteca): hero con logo y subtítulo "INSERTA UNA MONEDA PARA JUGAR", buscador por nombre, filtros por categoría (TODOS / ARCADE / PUZZLE / SHOOTER / VERSUS), grid de tarjetas de juego con portada CSS, título, descripción, insignia "MEJOR PUNTUACIÓN" y botón "JUGAR".
- Ruta `/jugar/[id]` (detalle): portada del juego, título con neón, descripción, ficha de estadísticas (partidas, mejor global, dificultad), leaderboard lateral "MEJORES PUNTUACIONES" (top 10), botón "▶ JUGAR AHORA" (pulsante) y botón "VOLVER AL VAULT".
- Ruta `/jugar/[id]/player` (reproductor): HUD con jugador/puntuación/vidas/nivel, contenedor estilo CRT con arena animada (sin juego real), botones "PAUSA"/"REANUDAR", "FIN" y "SALIR", modal de "FIN DEL JUEGO" con puntuación final, input de iniciales, botón "GUARDAR PUNTUACIÓN" (guarda en localStorage), toast "PUNTUACIÓN GUARDADA" con efecto mecanógrafo, botones "JUGAR DE NUEVO" y "VOLVER AL VAULT".
- Ruta `/auth` (autenticación): tarjeta centrada con logo, pestañas "INICIAR SESIÓN" / "CREAR CUENTA", campos Usuario, Contraseña y (solo registro) Correo electrónico, botón "JUGAR COMO INVITADO", botones sociales Google y GitHub. Solo la parte visual; sin lógica de sesión real ni backend.
- Ruta `/salon` (salón de la fama): título "SALÓN DE LA FAMA", pestañas por juego, podio (oro/plata/bronce), tabla de top 10 con columnas "RANGO", "JUGADOR", "PUNTUACIÓN", "FECHA", marca personal del usuario si hay sesión, animación de aparición escalonada de filas, botón "VOLVER A LA BIBLIOTECA".
- Navbar fija con logo "ARCADE VAULT", enlaces "Biblioteca" y "Salón de la Fama", contador de créditos, botón "Iniciar Sesión" / usuario, menú móvil hamburguesa con panel lateral.
- Footer con copyright "© 2026 ARCADE VAULT · HECHO CON PIXELES Y NEÓN · v2.6.0".
- Datos mockeados en `lib/data.ts` (GAMES con 8 juegos, CATS, `seededScores`) portados desde `references/templates/data.jsx`.
- localStorage para puntuaciones de invitado (`av_scores`) y usuario (`av_user`), sin llamadas de red.
- Todos los textos visibles en español.
- Estilos ya definidos en `app/globals.css` (tokens `--bg`, `--cyan`, `--magenta`, `--yellow`, fuentes Press Start 2P + JetBrains Mono/Courier Prime, grid perspectiva, scanlines, ruido, botones neón, cubiertas CSS por juego).

**Out of scope (para futuros specs):**

- Lógica de autenticación real (sesiones, JWT, backend REST o Supabase).
- Juegos reales jugables (el reproductor solo muestra la arena animada de plantilla).
- Conexión a backend para usuarios registrados.
- Tests (no hay script de tests aún).
- Editor visual, multijugador, versión móvil nativa, sincronización en la nube.

## Data model

Este spec no introduce nuevas estructuras de datos; reusa el modelo de datos mockeados existente. Las estructuras viven en `lib/data.ts`:

```ts
export type Game = {
  id: string;
  title: string;
  short: string;
  long: string;
  cat: "ARCADE" | "PUZZLE" | "SHOOTER" | "VERSUS";
  cover: string;
  color: "cyan" | "magenta" | "yellow" | "green";
  best: number;
  plays: string;
};

export const GAMES: Game[]; // 8 juegos (mismos datos de data.jsx)
export const CATS: string[]; // ["TODOS", "ARCADE", "PUZZLE", "SHOOTER", "VERSUS"]
export function seededScores(seed: number, count?: number): Array<{
  rank: number;
  name: string;
  score: number;
  date: string;
}>;
```

El estado de sesión y puntuaciones de invitado se lee/escribe en localStorage con las claves `av_user` y `av_scores` (ya usadas por el template). No hay nuevo schema de base de datos.

## Implementation plan

1. Crear `lib/data.ts` con `GAMES`, `CATS` y `seededScores` portados de `references/templates/data.jsx` a TypeScript estricto. Verificación: `npx tsc --noEmit` no reporta errores en el archivo.
2. Crear `components/nav.tsx` con el componente `Nav` (logo, enlaces Biblioteca/Salón, contador de créditos, botón Iniciar Sesión o usuario, menú móvil). Usa `next/navigation` (`usePathname`, `useRouter`). Verificación: navegar entre rutas resalta el enlace activo.
3. Crear `components/game-card.tsx` con `GameCard` (portada, categoría, título, descripción, insignia mejor puntuación, botón JUGAR con efecto tilt al pasar el mouse). Verificación: la tarjeta se renderiza con datos de un juego y el clic navega a `/jugar/[id]`.
4. Reescribir `app/page.tsx` como biblioteca: hero, buscador, chips de categoría, grid de `GameCard`, estado vacío si no hay resultados, footer. Verificación: `npm run dev` carga la home y muestra los 8 juegos.
5. Crear `app/jugar/[id]/page.tsx` como detalle: portada, título, descripción, stats strip, leaderboard lateral (top 10 con `seededScores`), botones JUGAR AHORA y VOLVER AL VAULT. Verificación: abrir `/jugar/bloque-buster` muestra el detalle correcto.
6. Crear `app/jugar/[id]/player/page.tsx` como reproductor: HUD, contenedor CRT con arena animada, botones PAUSA/FIN/SALIR, modal de game over con guardado en localStorage y toast mecanógrafo. Verificación: iniciar una partida, pulsar FIN, guardar puntuación y ver "PUNTUACIÓN GUARDADA".
7. Crear `app/auth/page.tsx` como pantalla de autenticación visual: tarjeta centrada, pestañas login/registro, campos, botón invitado, botones sociales. Sin lógica de sesión. Verificación: la pantalla se renderiza y cambiar de pestaña muestra/oculta el campo de correo.
8. Crear `app/salon/page.tsx` como salón de la fama: título, pestañas por juego, podio top 3, tabla escalonada de top 10, marca personal si hay usuario, botón volver. Verificación: las filas aparecen con animación `rise` y el podio muestra oro/plata/bronce.
9. Ajustar `app/layout.tsx` como root layout: `<html lang="es">`, fuentes Google, `globals.css`, `av-bg`, `av-noise`, `Nav` global, `{children}`, footer. Verificación: todas las páginas heredan el navbar y el fondo CRT.

## Acceptance criteria

- [ ] La aplicación carga en `http://localhost:3000` sin errores en consola.
- [ ] La ruta `/` muestra la biblioteca con los 8 juegos, buscador y filtros funcionales.
- [ ] Pulsar "JUGAR" en una tarjeta navega a `/jugar/[id]` y muestra el detalle del juego.
- [ ] Pulsar "▶ JUGAR AHORA" navega a `/jugar/[id]/player` y muestra el HUD y el CRT.
- [ ] En el reproductor, pulsar "FIN" abre el modal "FIN DEL JUEGO" con puntuación final.
- [ ] Guardar puntuación desde invitado escribe en localStorage (`av_scores`) y muestra el toast "PUNTUACIÓN GUARDADA".
- [ ] La ruta `/salon` muestra podio top 3 y tabla de top 10 con animación de filas.
- [ ] La ruta `/auth` renderiza tarjeta de login/registro con todos los campos y botones.
- [ ] El navbar está presente en todas las rutas y el enlace activo se resalta en neón cyan.
- [ ] `npx tsc --noEmit` no reporta errores de TypeScript.
- [ ] `npm run lint` no reporta errores.
- [ ] Todos los textos visibles están en español.

## Decisions taken and discarded

- **Sí:** Rutas de archivos de Next.js (`app/jugar/[id]/page.tsx`) en lugar de hash-router. Razón: es idiomático en Next 16 App Router y da URLs limpias indexables.
- **Sí:** Componentes en `components/` y datos en `lib/data.ts`. Razón: separa presentación de datos y sigue la recomendación de arquitectura del proyecto.
- **Sí:** `lib/data.ts` en TypeScript, port de `data.jsx`. Razón: mantiene los mismos 8 juegos y `seededScores` determinista con tipado estricto.
- **Sí:** `localStorage` para `av_scores` y `av_user`. Razón: ya está definido en CLAUDE.md y el template; no hay servidor hoy.
- **No:** Autenticación real (backend, sesiones, JWT). Razón: el usuario la excluyó de este spec; solo la pantalla visual de auth.
- **No:** Juegos reales jugables. Razón: el spec es solo la parte visual; el reproductor muestra la arena animada de plantilla.
- **No:** Tests con vitest. Razón: no hay script de tests; se añadiría en otro spec si es necesario.

## Identified risks

| Risk | Mitigation |
|------|------------|
| `localStorage` bloqueado en modo privado | Lectura/escritura envuelta en try/catch; la app sigue funcionando sin persistir |
| Cambio de schema de datos mockeados | `seededScores` es determinista por seed; si el formato cambia, solo `lib/data.ts` se toca |
| Rutas dinámicas `[id]` con id inexistente | `GameDetail` devuelve `null` si no encuentra el juego; se muestra 404 suave o se redirige a biblioteca |

## What is **not** in this spec

- Lógica de autenticación real (sesiones, backend REST o Supabase). Va en otro spec.
- Juegos reales jugables (canvas, input, colisiones). Va en otro spec.
- Editor visual, multijugador, sincronización en la nube, app móvil nativa.
- Tests automatizados (vitest); se añadiría en un spec separado si se decide.