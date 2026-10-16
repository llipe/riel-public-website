---
name: runbook-deploy-cloudflare-pages
trigger: The public site (riel.social) needs to be published, set up for the first time, or rolled back.
owner: riel web (ThinkFirst)
last_verified: <not yet run end to end against production>
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

1. `pnpm install`
2. `pnpm exec wrangler login`
3. `pnpm run deploy` — uploads `public/` to the `riel-public-website` project
   as a production deployment.

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
