riel es una plataforma de creator commerce que parte en Chile. El equipo dueño del producto o servicio —sellers y marketers de la misma marca, en una misma cuenta y vista— publica **Campañas**; los creators **postulan** para promoverlos con su audiencia; una postulación aceptada se convierte en **Colaboración**. Esta versión establece la relación de trabajo entre seller y creator: **no registra ventas ni paga a nadie**. La app vive en rielcreators.com; los links cortos tienen la forma riel.social/c/aB3xK.

El sistema es una herramienta de trabajo: neutra, densa en datos, precisa. Existe porque los creators no confían en los acuerdos con marcas, así que cada cifra debe verse verificable, no decorativa.

## Principios

- **Verificable antes que atractivo.** Toda cifra que no genera riel (seguidores, engagement) lleva fuente y fecha en `caption`: "48.300 seguidores · Instagram, al 24-09-2026". Los términos de una Campaña (precio, % de comisión, condiciones) se muestran idénticos al seller y al creator.
- **Una cifra por plataforma.** Los datos de Instagram y TikTok de un mismo creator nunca se suman ni se promedian: van lado a lado, con una escala común para que la diferencia se vea.
- **Reconectar no es un error.** Una conexión vencida no rompe nada ni borra nada: se muestra en tono neutro, con la fecha de los datos guardados y una acción "Reconectar" en `link`. Nunca rojo, íconos de alerta ni "error" (ver `AccountChip`).
- **Dato no disponible ≠ cero ≠ error.** Si una plataforma no entrega un dato (cuentas con menos de 100 seguidores no tienen datos de audiencia), se dice "No disponible" y por qué, en tono neutro. Si un dato está congelado porque la conexión venció, se muestra con su fecha y en `ink-muted`.
- **Solo lo que existe.** No se diseñan ganancias, saldos, pagos, payouts ni gráficos de rendimiento. Un espacio vacío es preferible a un número inventado.
- **Neutros primero, neón contenido.** El 90% de cada pantalla es `surface-*`, `ink`, `ink-muted` y líneas. El acento de la vista (`pink-button` creator, `yellow` seller) aparece solo en la acción principal, el ítem activo de navegación y la selección; `positive` (verde) solo en la acción que activa o acepta algo. Nunca un acento como fondo de sección.
- **Rectángulos y líneas.** Todo contenedor es un rectángulo de esquinas rectas (`radius-0`) separado con líneas de 1px (`line`, `line-strong`). Sin gradientes, sin ilustraciones, sin sombras en la página base.

## Vocabulario (no negociable)

| Término | Qué es | Dónde aparece |
|---|---|---|
| **Campaña** | Lo que publica un seller para un producto: precio, % de comisión, condiciones. | Vista seller y vista creator |
| **Postulación** | La solicitud de un creator para participar en una Campaña. | Vista creator; el seller ve "Postulaciones recibidas" |
| **Colaboración** | Una Postulación aceptada: la relación activa entre seller y creator. | Ambas vistas |

- Nunca "Oferta", "Offer", "Deal", "Trato", "Match", "Propuesta" ni un tercer término para estos objetos.
- En la UI se nombra a las partes por su cuenta ("Sagrado Beauty", "@camilarojas") en vez de por su rol, siempre que se pueda.

## Estados

| Objeto | Estado | Glifo | Tono | Motivo |
|---|---|---|---|---|
| Postulación | Enviada | □ | `status-info` | — |
| Postulación | Aceptada | ■ | `status-success` | — |
| Postulación | Rechazada | ✕ | `status-danger` si el motivo es de calce; `status-neutral` si es de la campaña | obligatorio |
| Postulación | Retirada | – | `status-neutral` | opcional |
| Postulación | Vencida | ◧ | `status-neutral` | obligatorio |
| Campaña | Borrador | – | `status-neutral` | — |
| Campaña | Activa | ■ | `status-success` | — |
| Campaña | Pausada | – | `status-neutral` | — |
| Campaña | Cerrada | ◧ | `status-neutral` | obligatorio |
| Colaboración | Activa | ■ | `status-success` | — |
| Colaboración | Finalizada | ◧ | `status-neutral` | — |
| Conexión | Conectada | ■ | `status-success` | — |
| Conexión | Vencida | ◧ | `status-neutral` | obligatorio |
| Conexión | No elegible | – | `status-neutral` | obligatorio |
| Conexión | Revocada | ✕ | `status-danger` | obligatorio |

- Un estado se reconoce por **palabra + glifo**; el color refuerza. Todo estado se lee en escala de grises.
- **Nunca un estado negativo o terminal sin su motivo al lado.** Se usa `StatusReason` con un código del vocabulario cerrado de motivos (ver su card). El motivo se lee en la lista, sin tooltip, sin clic, sin truncar. Si el seller no dio motivo, se dice: "Sagrado Beauty no indicó un motivo".
- Motivos sobre la campaña (cupo lleno, cierre anticipado) no juzgan al creator: su "Rechazada" va en tono neutral. El rojo queda para motivos de calce (audiencia, estilo).
- El motivo cambia de persona según quien lo lee: "Tu audiencia no coincide…" (creator) / "La audiencia no coincide…" (seller).
- En la card de campaña del creator, el estado que se muestra es el de **su** relación con la Campaña: disponible (sin badge, con "Postular"), Enviada, Aceptada o Cerrada. En la del seller: Borrador, Activa o Cerrada (una campaña finalizada es Cerrada).
- No hay tono warning: se evita confundirlo con `yellow`, que identifica la vista seller.

## Copy (es-CL)

- Español chileno natural, no inglés traducido. Tuteo: "Revisa", "Postula", "Tu Campaña".
- Corto: es una herramienta, no una landing. El español corre 15–25% más largo que el inglés; ningún layout depende de que el texto quepa en una línea.
- Sentence case en toda la UI. Mayúsculas solo en `label`.
- Botones con verbo y objeto: "Crear campaña", "Postular", "Aceptar postulación", "Rechazar", "Retirar postulación", "Pausar campaña", "Copiar link". Nunca "Enviar", "OK" ni "Aceptar" sin objeto.
- Sin lenguaje celebratorio ni signos de exclamación. Confirmación: "Postulación enviada a Sagrado Beauty." — no "¡Felicitaciones!".
- Errores que dicen qué pasó y qué hacer: "No pudimos guardar la campaña. Revisa tu conexión e intenta de nuevo."
- Estados vacíos informativos: "Aún no hay postulaciones. Cuando alguien postule a esta campaña, aparece aquí."
- **riel** siempre en minúscula, también al inicio de una oración. Sin emoji en la UI.

## Formatos

- **Moneda CLP, sin decimales nunca.** Punto como separador de miles: `$24.990`, `$89.990`, `$1.245.000`. Nunca `$24.990,00`, `$24,990` ni `CLP 24990`. Precios solo aparecen como precio de producto y como base de la comisión.
- **Comisión:** porcentaje entero o con coma decimal, sin espacio: `12%`, `7,5%`. Se muestra con su base: "Comisión 12% sobre $89.990". Si se calcula el monto, se redondea al peso entero.
- **Números:** punto de miles, coma decimal: `48.300 seguidores`, `4,7%`. Sin abreviaturas tipo "48K" en datos que se deben verificar.
- **Fechas:** en texto "24 sep 2026"; en tablas `24-09-2026`; hora en 24 h `14:32`. Zona horaria de Chile.
- **Cierre:** días restantes más la fecha exacta: "Cierra en 12 días · 07-10-2026", "Cierra mañana", "Cierra hoy", "Cerró el 10-09-2026". Con 3 días o menos, en negrita; nunca en rojo.
- **Cupos:** aceptados sobre el cupo: "4 de 10 cupos"; lleno: "Cupos completos".
- **Links:** handles con `@` en `data`; links cortos completos y copiables: `riel.social/c/aB3xK`.

## Contenido de ejemplo

Usar siempre contenido chileno realista, nunca lorem ipsum.

| Seller | Producto | Precio |
|---|---|---|
| Sagrado Beauty | Serum Vitamina C 30ml | $24.990 |
| Andes Outdoor | Mochila Trekking 30L | $89.990 |
| Casa Mota | Set Cerámica Artesanal | $45.000 |

Creators: @camilarojas, @matiasfuentes, @valeconlentes.

## Vistas y acentos

| Vista | Acento | Texto sobre el acento |
|---|---|---|
| Creator | botones `pink-button` (+ `-hover`, `-pressed`); marca e identidad `pink` | `on-pink-button` (blanco) |
| Seller (sellers y marketers del equipo de la marca) | `yellow` (+ `yellow-hover`, `yellow-pressed`) | `on-accent` (oscuro) |

- `pink` (neón) es el color de marca e identidad: logo, pantallas fuera de sesión, la marca cuadrada de un creator. Los botones de la vista creator usan `pink-button`, un magenta profundo con texto blanco (6:1), porque el texto oscuro sobre el pink neón no se lee bien.
- Una vista solo usa el acento de la otra parte para identificarla: en la vista seller, un creator se marca con un cuadrado `pink` de 8px junto a su handle, no con un botón rosado.
- `cyan` es funcional: `link`, `focus` y el tono `info`. No identifica a nadie ni rellena botones.

## Acción positiva

- `positive` (verde, variante `positive` de `Button`) marca las acciones que llevan algo a un estado activo o aceptado: "Publicar campaña", "Reanudar campaña", "Aceptar postulación". El verde anticipa el badge `status-success` que resulta.
- Máximo una acción `positive` por grupo; donde hay `positive` no hay `primary`.
- Todo lo demás que es principal pero no activa nada ("Crear campaña", "Postular", "Ver postulaciones") usa `primary`, el acento de la vista.
- `positive` nunca se usa para decorar ni para confirmar acciones destructivas.

## Componentes

- Envuelve cada vista en `Riel.View` con `view="creator"` o `view="seller"` (o las clases `rl-view-creator` / `rl-view-seller`): define el acento de `Button` primario y de las marcas. Sin contenedor, el acento es `pink`.
- Formatea toda cifra con `Riel.format` (`clp`, `count`, `percent`, `date`, `dateText`); nunca formatees a mano.
- Estados solo con `StatusBadge` o `StatusReason`; términos económicos solo con `PriceCommission` o `CampaignCard`, para que seller y creator vean lo mismo.
- La comisión es la cifra que decide un creator: en `CampaignCard` destaca por tamaño (40–48px mono en `ink`) y aislamiento entre líneas, nunca por color.

## Color

- Texto: `ink` sobre `surface-*`; secundario `ink-muted`; deshabilitado `ink-disabled` (solo controles deshabilitados).
- Interacción: hover `surface-hover`, selección `surface-selected`, bordes de controles `line-strong`, divisores `line`.
- Rellenos de acción: `on-pink-button` (blanco) sobre `pink-button`; `on-accent` (oscuro) sobre `yellow`; `on-positive` sobre `positive` (oscuro en dark, blanco en light). En light, `pink` como texto solo a 24px+; `yellow` nunca como texto y con borde `line-strong` cuando es relleno.
- Focus: anillo `focus` de 2px con 2px de offset en todo elemento interactivo.
- Nunca superponer ni desplazar `pink` y `cyan` (efecto glitch), nunca glow ni gradientes.

## Tipografía

- **Archivo** (Google Fonts, variable en peso y ancho) para todo el texto; **JetBrains Mono** para cifras, handles, links cortos e IDs (`figure`, `data`).
- **Archivo Expanded** (`font-stretch: 125%`) solo en `display` y `heading-1`. `heading-2`, `heading-3` y todo el texto de UI van en ancho normal.
- Cargar Archivo con el eje de ancho: `family=Archivo:wdth,wght@100..125,400..800`.
- Un `heading-1` por pantalla, con una regla `border-bold` en `line-strong` bajo el título.
- `display` solo en onboarding y estados vacíos de primer uso.

## Layout y densidad

- Escala de espaciado estilo Tailwind: `space-1` 4 · `space-2` 8 · `space-3` 12 · `space-4` 16 · `space-5` 20 · `space-6` 24 · `space-8` 32 · `space-10` 40 · `space-12` 48 · `space-16` 64.
- Controles: `control-md` 40px por defecto; `control-sm` 32px solo en tablas y toolbars desktop; `control-lg` 48px para la acción principal en mobile. Área táctil mínima `touch-min` 44px.
- Tablas: filas de `row-dense`, celdas con padding `space-3`, cifras alineadas a la derecha en `data`. Bajo `bp-sm` las tablas pasan a lista de cards.
- Breakpoints: `bp-sm` 640 · `bp-md` 768 · `bp-lg` 1024 · `bp-xl` 1280; contenido máximo `content-max`.
- Elevación solo en capas flotantes (dropdown, popover, modal): `shadow-overlay` + borde `line-strong`.

## Imágenes

- Fotos de producto 1:1 (en la card de campaña, marco 16:10 con recorte centrado) y contenido de creators 9:16 o 4:5, recortados en rectángulos sin redondeo. Avatares cuadrados con `radius-1`.
- Sin ilustraciones ni imágenes decorativas. Texto sobre imagen solo en una banda `night` con `on-night` (formato y duración de un reel).
- En tablas, la imagen va con `Thumb` dentro de `MediaCell`: producto 1:1 a 40px, contenido 9:16 a 45px, siempre junto a un texto que identifica la fila. Sin imagen: "Sin foto" o "Sin miniatura", nunca una imagen genérica.

## Iconografía

- Verificación de cuenta: marca propia (cuadrado de 14px en `link` con check), con `aria-label`; no se reproduce el badge de la plataforma.
- Plataformas (Instagram, TikTok): se muestran como etiqueta de texto o, en `AccountChip`, como sigla mono ("IG", "TT") sobre un cuadrado `night`. Si se agregan íconos, se usan los archivos oficiales de cada plataforma según sus guías de marca, como assets del sistema; nunca redibujados.

- Set de íconos aún no definido. Mientras tanto: set outline de trazo recto con terminaciones cuadradas (p. ej. Lucide a 1.5px, square linecaps), 16/20px, en `ink` o `ink-muted`. Íconos siempre acompañan una palabra en estados y acciones.

## Logo

- Aún no existe logo. Nombre en Archivo Expanded 800, minúscula "riel", en `ink`, o en `on-accent` sobre un bloque `pink`.
