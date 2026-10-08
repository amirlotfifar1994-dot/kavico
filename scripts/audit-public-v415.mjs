import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(here, '..');
const target = path.resolve(projectRoot, process.argv[2] || '.');
const isSourceRoot = target === projectRoot;
const skipDirs = new Set(['kavico_v414_admin','dist-public','node_modules','.git','scripts']);
const errors=[]; const warnings=[]; const htmlFiles=[];

async function walk(dir){
  for (const ent of await readdir(dir,{withFileTypes:true})){
    if (ent.isDirectory() && skipDirs.has(ent.name)) continue;
    const p=path.join(dir,ent.name);
    if(ent.isDirectory()) await walk(p);
    else if(ent.isFile() && ent.name.endsWith('.html')) htmlFiles.push(p);
  }
}
await walk(target);

function cleanUrl(u){ return String(u||'').trim().replace(/&amp;/g,'&').split('#')[0].split('?')[0]; }
function ignorable(u){ return !u || /^(?:https?:|mailto:|tel:|data:|javascript:|blob:|#)/i.test(u); }
async function existsRef(from,u){
  u=cleanUrl(u); if(ignorable(u)) return true;
  if(u.startsWith('/api/') || u.startsWith('/.netlify/')) return true;
  let p=u.startsWith('/')?path.join(target,u.replace(/^\/+/,'')):path.resolve(path.dirname(from),u);
  try { const s=await stat(p); if(s.isDirectory()) await stat(path.join(p,'index.html')); return true; } catch { return false; }
}

let localRefs=0;
for(const f of htmlFiles){
  const t=await readFile(f,'utf8');
  if(/kavico_v414_admin/i.test(t)) errors.push(`Public HTML references private admin: ${path.relative(target,f)}`);
  for(const m of t.matchAll(/\b(?:href|src)\s*=\s*["']([^"']+)["']/gi)){
    const u=m[1]; if(ignorable(cleanUrl(u))) continue; localRefs++;
    if(!(await existsRef(f,u))) errors.push(`Missing local ref: ${path.relative(target,f)} -> ${u}`);
  }
  for(const m of t.matchAll(/\bsrcset\s*=\s*["']([^"']+)["']/gi)){
    for(const item of m[1].split(',')){
      const u=item.trim().split(/\s+/)[0]; if(!u || ignorable(cleanUrl(u))) continue; localRefs++;
      if(!(await existsRef(f,u))) errors.push(`Missing srcset ref: ${path.relative(target,f)} -> ${u}`);
    }
  }
}

const faHub=await readFile(path.join(target,'hub/index.html'),'utf8');
const enHub=await readFile(path.join(target,'en/hub/index.html'),'utf8');
const cardCount=(s)=>(s.match(/class=["'][^"']*\bpost-card\b[^"']*["']/g)||[]).length;
if(cardCount(faHub)<38) errors.push(`FA hub static cards < 38 (${cardCount(faHub)})`);
if(cardCount(enHub)<38) errors.push(`EN hub static cards < 38 (${cardCount(enHub)})`);
if(/<a[^>]+href=["'][^"']+["'][^>]*>\s*\/blog\//i.test(faHub+enHub)) errors.push('Raw /blog/... labels remain in hub clusters');
if(/class=["'][^"']*post-card[^"']*["'][^>]+href=["']\/blog\//i.test(enHub)) errors.push('English hub card links to Persian /blog/');
if(!/href=["']\.\.\/guides\//.test(faHub)) errors.push('FA hub has no corrected ../guides/ card route');
if(!/href=["']\/en\/guides\//.test(enHub)) errors.push('EN hub has no corrected /en/guides/ card route');

const sw=await readFile(path.join(target,'sw.js'),'utf8');
if(!sw.includes("const VERSION = 'kavico-v415'")) errors.push('Service worker cache namespace is not v415');
if(!sw.includes('dev=415')) errors.push('Service worker dev flag is not v415');

let staleCopyright=0;
for(const f of htmlFiles){ const t=await readFile(f,'utf8'); if(t.includes('© 2025')||t.includes('© ۱۴۰۴')) staleCopyright++; }
if(staleCopyright) errors.push(`Stale copyright remains in ${staleCopyright} HTML files`);

if(isSourceRoot){
  const redir=await readFile(path.join(target,'_redirects'),'utf8');
  if(!redir.includes('/kavico_v414_admin/*')) errors.push('Defense-in-depth admin static block missing from _redirects');
  const netlify=await readFile(path.join(target,'netlify.toml'),'utf8');
  if(!/publish\s*=\s*["']dist-public["']/.test(netlify)) errors.push('Netlify publish target is not dist-public');
  if(!/build-public-deploy\.mjs/.test(netlify)) errors.push('Netlify build command does not build safe public tree');
}

const result={version:'v415',root:path.basename(target),html_files:htmlFiles.length,local_refs_checked:localRefs,errors,warnings};
console.log(JSON.stringify(result,null,2));
if(errors.length) process.exit(1);
