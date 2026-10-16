// Static checks for the public site: internal links, anchors, assets, metadata, CSP safety.
// Run with `pnpm test` (node --test). No dependencies.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const PUBLIC = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return htmlFiles(p);
    return name.endsWith('.html') ? [p] : [];
  });
}

const pages = htmlFiles(PUBLIC).map((file) => ({
  file,
  url: '/' + relative(PUBLIC, file).replace(/index\.html$/, ''),
  html: readFileSync(file, 'utf8'),
}));
const byUrl = new Map(pages.map((p) => [p.url, p]));

const idsOf = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const attrs = (html, name) => [...html.matchAll(new RegExp(`\\s${name}="([^"]*)"`, 'g'))].map((m) => m[1]);

function resolveFile(path) {
  const p = join(PUBLIC, decodeURIComponent(path));
  if (path.endsWith('/')) return join(p, 'index.html');
  return p;
}

for (const page of pages) {
  test(`${page.url}: internal links and assets resolve`, () => {
    const refs = [...attrs(page.html, 'href'), ...attrs(page.html, 'src')];
    for (const ref of refs) {
      if (/^(https?:|mailto:|tel:|data:)/.test(ref)) continue;
      const [path, hash] = ref.split('#');
      const targetUrl = path === '' ? page.url : path;
      assert.ok(targetUrl.startsWith('/'), `${ref} should be root-relative`);
      assert.ok(existsSync(resolveFile(targetUrl)), `${ref} → missing file ${relative(PUBLIC, resolveFile(targetUrl))}`);
      if (hash) {
        const target = byUrl.get(targetUrl);
        assert.ok(target, `${ref} → anchor on a non-page`);
        assert.ok(idsOf(target.html).has(hash), `${ref} → no element with id="${hash}" on ${targetUrl}`);
      }
    }
  });

  test(`${page.url}: aria-controls targets exist`, () => {
    const ids = idsOf(page.html);
    for (const id of attrs(page.html, 'aria-controls')) assert.ok(ids.has(id), `aria-controls="${id}" has no target`);
  });

  test(`${page.url}: ids are unique`, () => {
    const all = [...page.html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
    const dupes = all.filter((id, i) => all.indexOf(id) !== i);
    assert.deepEqual(dupes, []);
  });

  test(`${page.url}: no inline styles or scripts (CSP: style-src/script-src 'self')`, () => {
    assert.doesNotMatch(page.html, /\sstyle="/, 'inline style attribute');
    assert.doesNotMatch(page.html, /<style[\s>]/, 'inline <style> block');
    assert.doesNotMatch(page.html, /<script(?![^>]*\ssrc=)[^>]*>/, 'inline <script>');
    assert.doesNotMatch(page.html, /\son[a-z]+="/, 'inline event handler');
  });

  test(`${page.url}: has lang, title and viewport`, () => {
    assert.match(page.html, /<html lang="es-CL"/);
    assert.match(page.html, /<title>[^<]+<\/title>/);
    assert.match(page.html, /<meta name="viewport"/);
  });

  if (page.url !== '/404.html') {
    test(`${page.url}: has description, canonical and a single h1`, () => {
      assert.match(page.html, /<meta name="description" content="[^"]{50,}"/);
      assert.ok(page.html.includes(`<link rel="canonical" href="https://riel.social${page.url}">`), 'canonical matches URL');
      assert.equal((page.html.match(/<h1[\s>]/g) || []).length, 1);
    });

    test(`${page.url}: images have alt text and dimensions`, () => {
      for (const img of page.html.match(/<img\s[^>]*>/g) || []) {
        assert.match(img, /\salt="[^"]+"/, img);
        assert.match(img, /\swidth="\d+"\s+height="\d+"/, img);
      }
    });

    test(`${page.url}: copy rules (no exclamation marks, "riel" lowercase)`, () => {
      const text = page.html.replace(/<[^>]+>/g, ' ');
      assert.doesNotMatch(text, /[!¡]/, 'exclamation mark in copy');
      assert.doesNotMatch(text, /\b(Riel|RIEL)\b/, '"riel" must be lowercase');
    });
  }
}

test('sitemap lists every public page', () => {
  const sitemap = readFileSync(join(PUBLIC, 'sitemap.xml'), 'utf8');
  for (const url of byUrl.keys()) {
    if (url === '/404.html') continue;
    assert.ok(sitemap.includes(`<loc>https://riel.social${url}</loc>`), `${url} missing from sitemap`);
  }
});
