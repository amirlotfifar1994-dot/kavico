// Turns one source picture into the full image set the site expects:
//   <base>.webp/.avif/.jpg (1200w) + <base>-{480,768,960}w.webp/.avif
// Usage:  node scripts/import-article-image.mjs <source-image> <base-name> [--out <dir>]
// Needs sharp (not a project dependency):  npm i --no-save sharp
import fs from 'node:fs';
import path from 'node:path';

let sharp;
try { sharp = (await import('sharp')).default; }
catch { console.error('sharp is not installed. Run: npm i --no-save sharp'); process.exit(1); }

const args = process.argv.slice(2);
const outIdx = args.indexOf('--out');
const outDir = path.resolve(outIdx >= 0 ? args.splice(outIdx, 2)[1] : 'assets/img');
const [src, base] = args;
if (!src || !base || !/^[a-z0-9][a-z0-9-]*$/.test(base)) {
  console.error('Usage: node scripts/import-article-image.mjs <source-image> <base-name> [--out <dir>]\n  base-name: lowercase letters, digits, dashes (e.g. article-plating-defects-v358)');
  process.exit(1);
}
fs.mkdirSync(outDir, { recursive: true });

const RATIO = 16 / 9;
const meta = await sharp(src).metadata();
if (meta.width < 1200 || meta.width / meta.height < 1.3) {
  console.warn(`warning: source is ${meta.width}x${meta.height}; it will be cropped to 16:9 and 1200px wide.`);
}
const hero = await sharp(src).rotate().resize(1200, Math.round(1200 / RATIO), { fit: 'cover', position: 'attention' }).toBuffer();
const at = (w) => sharp(hero).resize(w, Math.round(w / RATIO));
const write = async (name, pipeline) => { await pipeline.toFile(path.join(outDir, name)); console.log('wrote', name); };

await write(`${base}.webp`, sharp(hero).webp({ quality: 80 }));
await write(`${base}.avif`, sharp(hero).avif({ quality: 55 }));
await write(`${base}.jpg`, sharp(hero).jpeg({ quality: 82, mozjpeg: true }));
for (const w of [480, 768, 960]) {
  await write(`${base}-${w}w.webp`, at(w).webp({ quality: 78 }));
  await write(`${base}-${w}w.avif`, at(w).avif({ quality: 52 }));
}
console.log(`done: ${base} (1200x675 + 480/768/960 variants) in ${outDir}`);
