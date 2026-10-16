---
name: runbook-deploy-cloudflare-pages
trigger: The public site (riel.social) needs to be published, set up for the first time, or rolled back.
owner: riel web (ThinkFirst)
last_verified: 2026-10-16 (preview deploy via CLI; production not yet run)
related: ["public/_headers", "public/_redirects", "package.json"]
---

# Deploy the public site to Cloudflare Pages

Publishes `public/` as the static site at `riel.social`. There is no build step:
Cloudflare serves the files as they are. Blast radius: the marketing site only;
`app.riel.social` is a separate deployment and is not touched.

## Preconditions

- A Cloudflare account that holds the `riel.social` zone (DNS on Cloudflare).
- Write access to the GitHub repo `llipe/riel-public-website`.
- `pnpm run validate` passes on the commit being deployed.
- **Before the first production launch:** the photos in `public/assets/img/`
  are Envato Elements watermarked previews. License them (and replace with the
  clean downloads) or swap in other images. Do not launch with the watermarks.

## Steps

### First-time setup (Git integration — recommended)

1. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git →
   select `llipe/riel-public-website`.
2. Build settings:
   - Framework preset: **None**
   - Build command: *(leave empty)*
   - Build output directory: **`public`**
   - Production branch: **`main`**
3. Save and deploy. Every push to `main` deploys production; every other branch
   gets a preview URL (`<branch>.<project>.pages.dev`, served with
   `X-Robots-Tag: noindex`).
4. Project → Custom domains → add **`riel.social`**. Cloudflare creates the
   DNS record when the zone is in the same account. Optionally add
   **`www.riel.social`** and a Redirect Rule (zone → Rules → Redirect Rules)
   `www.riel.social/*` → `https://riel.social/${1}` (301).

### Routine deploy

1. Merge the PR into `main`. Cloudflare deploys automatically.

### Manual deploy (no Git integration)

The Pages project `riel-public-website` already exists in the
`felipe@thinkfirst.tech` Cloudflare account (created 2026-10-16, production
branch `main`).

1. `pnpm install`
2. `pnpm exec wrangler login`
3. Preview of the current branch: `pnpm run deploy:preview` →
   `https://<branch>.riel-public-website.pages.dev` (noindex).
4. Production: `pnpm run deploy` — uploads `public/` as the `main` branch.

Note: wrangler 4.151+ delegates `pages` commands to "Pages on Workers". Creating
a classic Pages project from the CLI needed `wrangler pages project create
<name> --production-branch main --force`; once the project exists, plain
`wrangler pages deploy` works and `--force` must not be passed. A brand-new
project's `*.pages.dev` TLS certificate took about 80 seconds to issue after the
first deployment (TLS handshake failure until then).

## Verification

```sh
curl -sI https://riel.social/ | grep -iE '^HTTP|content-security-policy'
# HTTP/2 200 and the CSP from public/_headers
curl -sI https://riel.social/marcas | grep -iE '^HTTP|location'
# HTTP/2 308, location: /marcas/
curl -sI https://riel.social/no-existe | head -1
# HTTP/2 404 (served from public/404.html)
```

Then open `/`, `/marcas/` and `/creators/` at phone and desktop widths and
check the browser console shows no CSP violations.

## Rollback

Reversible. Cloudflare dashboard → the Pages project → Deployments → pick the
last good deployment → **Rollback to this deployment**. Alternatively revert
the commit on `main` and let it redeploy.

## Escalation

Whoever owns the Cloudflare account for `riel.social`. Collect the deployment
ID, the failing URL, and the `curl -sI` output above.
