---
name: runbook-deploy-cloudflare-pages
trigger: The public site (riel.social) needs to be published, set up for the first time, or rolled back.
owner: riel web (ThinkFirst)
last_verified: 2026-10-16 (production deploy of main 703987a via CLI; riel.social verified)
related: ["public/_headers", "public/_redirects", "package.json"]
---

# Deploy the public site to Cloudflare Pages

Publishes `public/` as the static site at `riel.social`. There is no build step:
Cloudflare serves the files as they are. Blast radius: the marketing site only;
`app.riel.social` is a separate deployment and is not touched.

## Current setup

| Item                  | Value                                                                    |
| --------------------- | ------------------------------------------------------------------------ |
| Cloudflare account    | `felipe@thinkfirst.tech`                                                 |
| Pages project         | `riel-public-website` (Direct Upload: deploys come from the CLI, not Git) |
| Production branch     | `main`                                                                   |
| Production URLs       | `https://riel.social` (custom domain), `https://riel-public-website.pages.dev` |
| Preview URLs          | `https://<branch>.riel-public-website.pages.dev`                         |
| `www.riel.social`     | Not configured. The hostname does not resolve (see Open items).          |
| First production deploy | 2026-10-16, `main` at `703987a`                                        |

Pushing or merging to `main` does **not** deploy anything. Run the production
deploy below after every merge you want live.

`X-Robots-Tag: noindex` is sent on every `*.pages.dev` hostname (including the
production `riel-public-website.pages.dev` alias) so only `riel.social` is
indexed. `riel.social` itself must not send it.

## Preconditions

- Logged in to wrangler with access to the `felipe@thinkfirst.tech` account:
  `pnpm exec wrangler whoami`.
- On `main`, up to date with `origin/main`, with a clean working tree. Production
  must match what is merged on GitHub; never deploy production from a feature
  branch.
- `pnpm install` done and `pnpm run validate` passes.

## Steps

### Preview a branch (optional, before merging)

1. `git switch <branch>`
2. `pnpm run deploy:preview` — uploads `public/` as a preview of the current
   branch. Reversible: previews never affect production.
3. Open `https://<branch>.riel-public-website.pages.dev`. Branch names are
   slugified (`feat/static-site` → `feat-static-site`).

### Deploy production

1. `git switch main && git pull --ff-only`
2. `git status --short` — must print nothing.
3. `pnpm run validate`
4. `pnpm run deploy` — uploads `public/` as the production (`main`) deployment
   and records the commit hash and message in the Deployments tab. Reversible
   through Rollback below.

### Set up from scratch (only if the project is lost)

1. `pnpm exec wrangler pages project create riel-public-website --production-branch main --force`.
   wrangler 4.151+ delegates `pages` commands to "Pages on Workers", and that
   fails for a plain folder. `--force` creates a classic Pages project. Use it
   only for this one command and never on deploys.
2. Deploy production as above. A new project's `*.pages.dev` certificate took
   about 80 seconds to issue after the first deploy (TLS handshake failure
   until then).
3. Dashboard → Workers & Pages → `riel-public-website` → Custom domains →
   **Set up a custom domain** → `riel.social`. Accept replacing the existing
   DNS record when prompted. Certificate activation takes a few minutes.

### Switch to Git-triggered deploys (optional)

Cloudflare cannot convert a Direct Upload project to Git integration. To deploy
on every merge instead:

1. Create a new Pages project with **Connect to Git** → `llipe/riel-public-website`:
   framework preset **None**, build command **empty**, output directory
   **`public`**, production branch **`main`**.
2. Check its `*.pages.dev` URL, then move the `riel.social` custom domain from
   `riel-public-website` to the new project. Expect a few minutes of
   certificate re-issuance.
3. Update this runbook and the `deploy` scripts in `package.json`.

## Verification

```sh
B=https://riel.social
for u in / /marcas/ /creators/ /sitemap.xml; do curl -s -o /dev/null -w "%{http_code} $u\n" $B$u; done
# 200 for each
curl -sI $B/marcas | grep -iE '^HTTP|^location'
# HTTP/2 308, location: /marcas/
curl -s -o /dev/null -w "%{http_code}\n" $B/no-existe
# 404 (served from public/404.html)
curl -sI $B/ | grep -ic x-robots-tag
# 0 — riel.social must be indexable
curl -sI $B/ | grep -i content-security-policy
# the CSP from public/_headers
curl -sI https://riel-public-website.pages.dev/ | grep -i x-robots-tag
# x-robots-tag: noindex
```

Then open `/`, `/marcas/` and `/creators/` at phone and desktop widths, hover
"Para marcas" / "Para creators" in the header, and check the browser console
shows no CSP violations. CSS/JS are served with `max-age=0, must-revalidate`, so
a hard refresh is not needed to see a new deploy.

## Rollback

Reversible. Dashboard → Workers & Pages → `riel-public-website` → Deployments →
pick the last good **production** deployment → **Rollback to this deployment**.
Then revert the bad commit on `main` through a PR so the next deploy does not
reintroduce it.

## Open items

- **Watermarked photos are live.** The photos in `public/assets/img/` are Envato
  Elements watermarked previews. The site owner chose to launch with them on
  2026-10-16. Replace them with licensed downloads using the same filenames
  (cropped to 4:5 or 9:16), merge, and deploy production.
- **`www.riel.social` does not resolve.** Add it as a second custom domain on
  the project, or add a proxied DNS record plus a Redirect Rule
  `www.riel.social/*` → `https://riel.social/${1}` (301).

## Escalation

Whoever owns the Cloudflare account for `riel.social` (`felipe@thinkfirst.tech`).
Collect the deployment ID (Deployments tab), the failing URL, and the output of
the Verification commands.
