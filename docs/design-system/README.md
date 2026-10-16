# riel design system

Sistema de diseño de riel, la plataforma de creator commerce (rielcreators.com). Es la única fuente de estilo de este proyecto: todas las pantallas cargan `riel/variables.css`, `riel/bundle.css` y `riel/theme.js`. No se usa Nocturne ni otro sistema.

Origen: paquete exportado el 25-09-2026 (`uploads/riel-design-system/`), con el brand book en `docs/brand-book.md` y la especificación completa en `docs/riel-spec.md`. Este archivo resume el sistema y agrega lo que se definió al diseñar las pantallas.

## Carácter

Herramienta de trabajo neutra, densa en datos y precisa. Cada cifra debe verse verificable. El 90% de la pantalla es superficie, tinta y líneas de 1px; el neón aparece solo en la acción principal, el ítem activo y la selección.

- Tema principal oscuro, claro completo. Selector Oscuro / Claro en el footer, se guarda en `localStorage` (`riel-theme`) y se aplica en todas las páginas.
- Rectángulos de esquinas rectas (`--radius-0`; `--radius-1` solo en avatares). Sin gradientes, sin glow, sin ilustraciones, sin sombras en la página base.
- UI en es-CL, tuteo, sentence case. "riel" siempre en minúscula. Sin emoji ni signos de exclamación.

## Archivos

- `variables.css` — tokens (color dark/light, espaciado, controles, breakpoints, fuentes) y clases tipográficas `.t-*`.
- `bundle.css` / `bundle.js` — componentes de referencia (`window.Riel`) y clases `rl-*`.
- `theme.js` — selector de tema (`[data-set-theme]`, `data-theme`, `data-theme-lock`).
- `ejemplos/` — imágenes de muestra.
- `App Shell.dc.html` (raíz) — marco común de la aplicación: header, columna, footer, menú móvil.

## Vistas y acentos

| Vista | Clase | Acento | Texto sobre acento |
|---|---|---|---|
| Creator | `rl-view-creator` | `--pink-button` (marca: `--pink`) | `--on-pink-button` |
| Seller / marketer | `rl-view-seller` | `--yellow` | `--on-accent` |

- `--positive` (verde) solo en la acción que activa o acepta: "Publicar campaña", "Aceptar postulación". Máximo una por grupo; donde hay positive no hay primary.
- `--cyan` es funcional: `--link`, `--focus`, tono info. Focus: anillo de 2px con 2px de offset.
- Una vista marca a la otra parte con un cuadrado de 8px (`rl-mark`), nunca con su botón.

## Tipografía

- Archivo (variable, peso y ancho) para todo; JetBrains Mono para cifras, handles, links cortos, IDs y fechas en tabla (`.t-figure`, `.t-data`, `rl-mono`).
- Archivo Expanded (125%) solo en `display` y `heading-1`. Un `heading-1` por pantalla, con regla de 2px `--line-strong` debajo.
- Escala: display 48/52 · heading-1 32/36 · heading-2 20/28 · heading-3 16/24 · body 14/20 · body-lg 16/24 · label 11/16 mayúsculas · caption 12/16.

## Marco de la aplicación

- Dos anchos de referencia por pantalla: escritorio 1280px y móvil 390px. El layout cambia bajo 900px.
- Columna: `max-width` 1280px (`--content-max`), centrada; margen lateral 40px escritorio, 16px móvil. Contenido 40px arriba y 64px abajo (móvil 24 / 32).
- Header de 56px, borde a borde. Marca "riel" en Archivo 800 17/24 al 125% sobre bloque `--pink`, seguida de la marca de rol y "para marketers" o "para creators".
- Navegación seller: Campañas · Colaboraciones · Notificaciones · Configuración. Creator: Campañas · Mis postulaciones · Colaboraciones · Notificaciones. Ítem activo en `--ink` con borde inferior de 2px. Destinos no construidos en `--ink-disabled`, sin enlace, con "Próximamente".
- Menú de cuenta de 240px en `--surface-raised`, borde `--line-strong`, `--shadow-overlay`. Contador de no leídas en mono 11 sobre `--pink`.
- Móvil: botón fantasma "Menú" / "Cerrar" de 44px; panel bajo el header, ítems de 56px, activo con borde izquierdo de 3px.
- Footer: "riel es una empresa ThinkFirst" a la izquierda; © y selector de tema a la derecha; 400 12/16 en `--ink-muted`.
- Resumen lateral opcional de 320px, sticky en escritorio y abajo en móvil.

## Espaciado y controles

- Espaciado: 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 (`--space-*`).
- Controles: 40px por defecto, 32px en tablas y toolbars de escritorio, 48px para la acción principal en móvil. Área táctil mínima 44px.
- Tablas: filas de 44px, padding 12px, cifras a la derecha en mono. Bajo 640px pasan a lista de cards.
- Elevación solo en capas flotantes (dropdown, popover, modal, diálogo de decisión): `--shadow-overlay` + borde `--line-strong`.

## Componentes

View, Button (primary, positive, secondary, ghost, danger), Input, Select, Tabs, Table, Modal, EmptyState, StatusBadge, StatusReason, PriceCommission, ShortLink, AccountChip, Thumb, MediaCell, CampaignCard, CreatorCard, ApplicantCard, ApplicationRow, Cover. Guía de cada uno en `uploads/riel-design-system/components/<Nombre>/README.md`.

## Reglas de contenido

- Vocabulario cerrado: Campaña, Postulación, Colaboración. Nunca "Oferta" ni un tercer término.
- CLP sin decimales con punto de miles (`$24.990`); comisión con su base ("Comisión 12% sobre $89.990"); fechas `24-09-2026` en tablas y "24 sep 2026" en texto; hora 24 h.
- Instagram y TikTok nunca se suman. "No disponible" no es cero ni error; los datos congelados muestran su fecha.
- Todo estado negativo o terminal lleva su motivo visible. Un estado se reconoce por palabra + glifo; el color refuerza. No hay tono warning.
- Fuera de alcance: ganancias, saldos, pagos y gráficos de rendimiento.

## Pendiente

Logo definitivo, set de íconos (mientras tanto, outline de trazo recto a 1,5px con terminaciones cuadradas), íconos oficiales de Instagram y TikTok (se usan las siglas IG / TT), fotos reales.
