# SPEC 03 — About page con formulario de contacto y envío por Resend

> **Status:** Implementado
> **Depends on:** SPEC 01 (01-pantallas-visuales-mvp.md), SPEC 02 (02-home-landing-page.md)
> **Date:** 2026-11-01
> **Objective:** Implementar la página "Acerca de" con formulario de contacto y envío de correo vía Resend, siguiendo el template exacto de references/home-about/about.jsx.

## Scope

**In:**

- Ruta `/about` como nueva página de Arcade Vault
- Página `app/about/page.tsx` con el contenido exacto del template About (sección hero "ACERCA DE", misión, 3 cards de highlights con iconos pixel SVG, divisor animado)
- Sección Contacto con formulario: nombre, correo electrónico, mensaje (exactamente como el template)
- Validación de formulario (campos requeridos, shake en invalidación)
- Envío de correo vía Resend mediante route handler en `api/contact/route.ts`
- Variable de entorno `RESEND_API_KEY` para autenticación de Resend
- Variable de entorno `RESEND_TO_EMAIL` con destinatario `fcomorales.sanchez@gmail.com`
- Notificación de éxito mediante toast al completar el envío
- Enlace "Acerca de" añadido al navbar (`components/nav.tsx`) y menú móvil
- Estilos basados en tokens CSS de `app/globals.css` (ya contiene estilos para about page)
- Todo el texto visible en español
- Se reutiliza el componente `HighlightIcon` y estructura del template

**Out of scope (para futuros specs):**

- Lógica de autenticación real (sesiones, JWT, backend REST o Supabase)
- Página "Acerca de" separada del contacto (se combinan en una sola página)
- Juegos reales jugables, canvas, input, colisiones
- Conexión a backend para usuarios registrados
- Tests automatizados (vitest)
- Editor visual, multijugador, sincronización en la nube, app móvil nativa
- Pantalla de confirmación de envío separada (solo toast)

## Data model

Nuevas estructuras en `api/contact/route.ts`:

```ts
export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export type ContactResponse = {
  success: boolean;
  message: string;
  error?: string;
};
```

No se introduce nuevo estado de cliente persistente; el formulario usa `useState` local y se reinicia tras envío exitoso.

Las claves de entorno requeridas:

- `RESEND_API_KEY` — API key de Resend (se proporciona por el usuario)
- `RESEND_TO_EMAIL` — Destinatario: `fcomorales.sanchez@gmail.com`
- `RESEND_FROM_EMAIL` — Remitente del correo (opcional, por defecto: Arcade Vault)

## Implementation plan

1. Crear `api/contact/route.ts` con route handler POST que use Resend SDK para enviar correo con los datos del formulario. Verificación: `npx tsc --noEmit` sin errores en el archivo.
2. Crear `app/about/page.tsx` con la página About siguiendo exactamente el template de `references/home-about/about.jsx`, adaptado a TypeScript/Next.js 16 y usando el route handler de contacto. Verificación: `npx tsc --noEmit` sin errores.
3. Actualizar `components/nav.tsx` para añadir enlace "Acerca de" en el navbar y menú móvil con ruta `/about`. Verificación: el enlace aparece y navega correctamente.
4. Crear archivo `.env` (o actualizar `.env.local`) con `RESEND_API_KEY`, `RESEND_TO_EMAIL` y `RESEND_FROM_EMAIL`. Verificación: archivo existe con las variables.
5. Verificación final: `npm run dev` carga `/about` sin errores de consola; `npx tsc --noEmit` sin errores; `npm run lint` sin errores; envío de formulario muestra toast de éxito.

## Acceptance criteria

- [ ] La aplicación carga en `http://localhost:3000/about` sin errores en consola.
- [ ] La ruta `/about` muestra la página Acerca de: héroe con "▸ ACERCA DE", título, misión, 3 cards de highlights, divisor animado.
- [ ] La ruta `/about` muestra la sección Contacto con formulario (nombre, correo electrónico, mensaje).
- [ ] Clic en "Acerca de" del navbar navega a `/about` y resalta el enlace activo.
- [ ] El formulario valida que los campos no estén vacíos (shake si inválido).
- [ ] Al enviar el formulario, se llama al route handler de contacto y se envía el correo vía Resend.
- [ ] Después del envío exitoso, se muestra una notificación toast de éxito.
- [ ] El correo se entrega a `fcomorales.sanchez@gmail.com`.
- [ ] `npx tsc --noEmit` no reporta errores de TypeScript.
- [ ] `npm run lint` no reporta errores.
- [ ] Todos los textos visibles están en español.
- [ ] Se siguen los estilos y colores neón del proyecto (`--cyan`, `--magenta`, `--yellow`, `--green`).

## Decisions taken and discarded

- **Sí:** Ruta `/about` para la página About. Razón: convencional y fácil de recordar.
- **Sí:** Usar route handler en `api/contact/route.ts` para Resend. Razón: separación de preocupaciones, no requiere instalar dependencias de cliente de Resend.
- **Sí:** Variables de entorno para API key y destinatario. Razón: la API key de Resend se proporciona por separado; no se hardcodea en el código.
- **Sí:** Toast de éxito en lugar de terminal-success del template. Razón: el usuario prefirió toast por simplicidad.
- **Sí:** Texto en español (todos los labels, botones, mensajes). Razón: convención del proyecto (CLAUDE.md).
- **No:** Pantalla de confirmación separada. Razón: el usuario pidió solo toast.
- **No:** Incluir lógica de autenticación. Razón: fuera del alcance de esta spec.
- **No:** Modificar `lib/data.ts`. Razón: evitar regresiones en datos ya consumidos.

## Identified risks

| Risk                                     | Mitigation                                                                               |
| ---------------------------------------- | ---------------------------------------------------------------------------------------- |
| `RESEND_API_KEY` no configurada          | El route handler devuelve error claro; el formulario muestra mensaje de error al usuario |
| Error de red al enviar con Resend        | Manejo de try/catch en route handler; toast con mensaje de error                         |
| Formulario enviado con campos inválidos  | Validación en cliente antes del envío; shake visual si falla                             |
| Pantalla About no accesible desde navbar | Se añade enlace explícito en `components/nav.tsx`                                        |

## What is **not** in this spec

- Lógica de autenticación real (sesiones, backend REST o Supabase).
- Juegos reales jugables (canvas, input, colisiones).
- Conexión a backend para usuarios registrados.
- Tests automatizados (vitest).
- Editor visual, multijugador, sincronización en la nube, app móvil nativa.
- Pantalla de confirmación de envío separada (solo toast).

---

**Estado:** `Draft`. Cambiar a `Approved` una vez re-leído.

**Próximo paso:** una vez revisada y aprobada, ejecutar `/spec-impl 03-about-page-contact-form` para implementarla.
