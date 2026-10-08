// Prepares a copy of the built site (dist-public/) to be served from a sub-path,
// as GitHub Pages does for project sites (https://<user>.github.io/<repo>/).
//
// The site is authored for a domain root: pages use root-absolute links ("/en/...")
// and the language switcher works on paths starting with "/en/". This script
//   1. patches the few JS sites that read or emit root paths (locale navigator,
//      contact link helper, nav highlighting) so they understand the base path,
//   2. prefixes every root-absolute URL in the HTML with the base path and updates
//      the Subresource Integrity hashes of the JS files it changed (otherwise the
//      browser blocks them),
//   3. keeps the preview out of search engines (robots.txt Disallow, no sitemap).
// It fails loudly if a patch no longer applies, so a changed runtime cannot
// silently ship a broken preview.
//
// Usage: node scripts/prepare-pages-base.mjs <dist-dir> <base>      e.g. dist-public /kavico
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const [distArg, baseArg] = process.argv.slice(2);
if (!distArg || !/^\/[a-z0-9-]+$/i.test(baseArg || '')) {
  console.error('Usage: node scripts/prepare-pages-base.mjs <dist-dir> </base-path>');
  process.exit(1);
}
const dist = path.resolve(distArg);
const BASE = baseArg;
const walk = (d, out = []) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); e.isDirectory() ? walk(p, out) : out.push(p); } return out; };
const files = walk(dist);
const sri = (buf) => 'sha384-' + crypto.createHash('sha384').update(buf).digest('base64');

// ---- 1. JS patches ---------------------------------------------------------
const patches = [
  { name: 'locale cleanPath strips base', find: "function cleanPath(p){ p=String(p||'/');", repl: `function cleanPath(p){ p=String(p||'/').replace(/^\\${BASE}(?=\\/|$)/,'');`, perNavigator: true },
  { name: 'language toggle target', find: "return target+(location.search||'')+(location.hash||'');", repl: `return '${BASE}'+target+(location.search||'')+(location.hash||'');`, perNavigator: true },
  { name: 'english anchor rewrite', find: "a.setAttribute('href',u.pathname+u.search+u.hash);", repl: `a.setAttribute('href','${BASE}'+u.pathname+u.search+u.hash);`, perNavigator: true },
  { name: 'legacy ?lang redirect', find: "location.replace(target+(q?'?'+q:'')+(u.hash||''));", repl: `location.replace('${BASE}'+target+(q?'?'+q:'')+(u.hash||''));`, perNavigator: true },
  { name: 'contact link helper', find: "function contactHref(src){return (isEn()?", repl: `function contactHref(src){return '${BASE}'+(isEn()?`, perNavigator: false },
  { name: 'nav fallback ignores home prefix', find: "const p = norm(url.pathname);\n        if(!p || p === '/') return;", repl: `const p = norm(url.pathname);\n        if(!p || p === '/' || p === '${BASE}') return;`, perNavigator: false },
];
const counts = Object.fromEntries(patches.map((p) => [p.name, 0]));
const sriMap = new Map();
let navigators = 0;
for (const f of files.filter((x) => /\/assets\/js\/bundles\/.*\.js$/.test(x.split(path.sep).join('/')))) {
  const original = fs.readFileSync(f);
  let t = original.toString('utf8');
  if (t.includes('Kavico v363 static locale navigator')) navigators++;
  let changed = false;
  for (const p of patches) if (t.includes(p.find)) { t = t.split(p.find).join(p.repl); counts[p.name]++; changed = true; }
  if (changed) {
    const out = Buffer.from(t, 'utf8');
    fs.writeFileSync(f, out);
    sriMap.set(sri(original), sri(out));
  }
}
const problems = [];
if (!navigators) problems.push('no locale navigator found in any bundle');
for (const p of patches) {
  if (p.perNavigator && counts[p.name] !== navigators) problems.push(`patch "${p.name}" applied to ${counts[p.name]} bundles, expected ${navigators}`);
  if (!p.perNavigator && counts[p.name] === 0) problems.push(`patch "${p.name}" matched nothing`);
}

// ---- 2. HTML ---------------------------------------------------------------
const rooted = (u) => /^\/(?!\/)/.test(u);
const fix = (u) => (rooted(u) ? BASE + u : u);
let htmlFiles = 0, urlsFixed = 0, sriFixed = 0;
for (const f of files.filter((x) => x.endsWith('.html'))) {
  let t = fs.readFileSync(f, 'utf8');
  t = t.replace(/\b(href|src|action|poster|data-src)=(["'])(\/(?!\/)[^"']*)\2/g, (m, a, q, u) => { urlsFixed++; return `${a}=${q}${BASE}${u}${q}`; });
  t = t.replace(/\b(srcset|imagesrcset)=(["'])([^"']*)\2/g, (m, a, q, v) => {
    const out = v.split(',').map((item) => { const s = item.trim(); if (!s) return item; const [u, ...rest] = s.split(/\s+/); if (!rooted(u)) return item; urlsFixed++; return [fix(u), ...rest].join(' '); }).join(', ');
    return `${a}=${q}${out}${q}`;
  });
  t = t.replace(/\bdata-root=(["'])\/\1/g, `data-root="${BASE}/"`);
  for (const [from, to] of sriMap) if (t.includes(from)) { t = t.split(from).join(to); sriFixed++; }
  fs.writeFileSync(f, t);
  htmlFiles++;
}

// ---- 3. keep the preview out of search engines ------------------------------
fs.writeFileSync(path.join(dist, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
fs.rmSync(path.join(dist, 'sitemap.xml'), { force: true });
fs.writeFileSync(path.join(dist, '.nojekyll'), '');

// ---- 4. verify --------------------------------------------------------------
let leftovers = 0; const sample = [];
const present = new Set();
for (const f of files.filter((x) => x.endsWith('.html'))) {
  const t = fs.readFileSync(f, 'utf8');
  for (const m of t.matchAll(/\b(?:href|src|action|poster|data-src)=(["'])(\/(?!\/)[^"']*)\1/g)) {
    if (!m[2].startsWith(BASE + '/') && m[2] !== BASE) { leftovers++; if (sample.length < 5) sample.push(`${path.relative(dist, f)} -> ${m[2]}`); }
  }
  for (const m of t.matchAll(/integrity="(sha384-[^"]+)"/g)) present.add(m[1]);
}
if (leftovers) problems.push(`${leftovers} root-absolute URLs left in HTML, e.g. ${sample.join('; ')}`);
// every <script integrity> must match the file now on disk
let sriChecked = 0;
for (const f of files.filter((x) => x.endsWith('.html'))) {
  const t = fs.readFileSync(f, 'utf8');
  for (const m of t.matchAll(/<script\b[^>]*\bsrc="([^"]+)"[^>]*\bintegrity="([^"]+)"|<script\b[^>]*\bintegrity="([^"]+)"[^>]*\bsrc="([^"]+)"/g)) {
    const src = m[1] || m[4], want = m[2] || m[3];
    const rel = src.startsWith(BASE + '/') ? src.slice(BASE.length) : src;
    const file = path.join(dist, rel.split('?')[0]);
    if (!fs.existsSync(file)) continue;
    sriChecked++;
    if (sri(fs.readFileSync(file)) !== want) { problems.push(`SRI mismatch: ${path.relative(dist, f)} -> ${src}`); break; }
  }
}

console.log(`base ${BASE}: ${htmlFiles} html files, ${urlsFixed} URLs prefixed, ${navigators} runtime bundles patched, ${sriFixed} integrity hashes updated, ${sriChecked} script integrity checks passed`);
for (const [k, v] of Object.entries(counts)) console.log(`  patch ${k}: ${v} bundle(s)`);
if (problems.length) { console.error('PROBLEMS:\n - ' + problems.slice(0, 10).join('\n - ')); process.exit(1); }
console.log('ok');
