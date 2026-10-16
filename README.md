# riel public website

The public marketing site for riel at **riel.social**, with two audiences:
brands (`/marcas/`) and creators (`/creators/`). Every call to action goes to
the app at `app.riel.social`.

It is a plain static site (HTML, CSS and a little vanilla JS) with no framework
and no build step. Cloudflare Pages serves `public/` as is.

## Structure

```
public/                    ← deployed as the site root
  index.html               ← Home
  marcas/index.html        ← For brands   (riel.social/marcas/)
  creators/index.html      ← For creators (riel.social/creators/)
  404.html
  assets/css/riel/         ← riel design system tokens + components (from the design export)
  assets/css/site.css      ← site layout and sections
  assets/js/theme-init.js  ← applies the saved light/dark theme before paint
  assets/js/site.js        ← header dropdowns, mobile menu, FAQ, theme switch
  assets/img/              ← photos, cropped to their display ratio
  _headers, _redirects     ← Cloudflare Pages config (security headers, redirects)
tests/site.test.mjs        ← link, anchor, asset, metadata and CSP checks
docs/design-system/        ← riel design system README and brand book (reference)
docs/runbooks/             ← deploy procedure
```

The header, footer and mobile bar are repeated in each page, since there is no
templating. When you change one, change all three pages; `pnpm test` catches
broken links and anchors.

## Develop

```sh
pnpm install
pnpm run dev        # wrangler pages dev: http://localhost:8788, applies _headers and _redirects
pnpm run validate   # html-validate + node tests
```

## Rules the pages follow

- Source design: the Claude Design project "riel public website" (Home, Marcas,
  Creators). Each screen has a mobile (390px) and a desktop (1280px) version,
  and the layout switches at 900px.
- Light theme is the default. The footer switch stores the choice in
  `localStorage` (`riel-theme`).
- No inline styles or scripts: the CSP in `public/_headers` only allows `'self'`
  (plus Google Fonts and Cloudflare Web Analytics).
- Copy is es-CL, uses tú and sentence case, writes "riel" in lowercase, and has
  no exclamation marks or emoji. The vocabulary is closed: Campaña, Postulación,
  Colaboración.
- No invented numbers or testimonials. The "already working with riel" sections
  are in the HTML with `hidden` until there is real, authorized content.

## Deploy

See [docs/runbooks/deploy-cloudflare-pages.md](docs/runbooks/deploy-cloudflare-pages.md).
