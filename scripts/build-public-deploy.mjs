import { cp, mkdir, rm, stat, readFile, writeFile, readdir, unlink } from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const out = path.join(root, 'dist-public');

const publicDirs = [
  'about','assets','blog','compare','contact','en','faq','guide','guides','hub','icons',
  'karaj','offline','portfolio','process','quality','services','tehran','tools'
];
const publicFiles = [
  '404.html','_headers','_redirects','apple-touch-icon.png','favicon-16x16.png',
  'favicon-32x32.png','favicon.ico','index.html','logo.png','logo.svg','og-image.jpg',
  'robots.txt','site.webmanifest','sitemap.xml','sw.js','twitter-image.jpg'
];

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
for (const name of [...publicDirs, ...publicFiles]) {
  const src = path.join(root, name);
  try { await stat(src); } catch { throw new Error(`Required public path missing: ${name}`); }
  await cp(src, path.join(out, name), { recursive: true, force: true });
}

// v434 deploy-only JS bundling with Subresource Integrity.
// All public external scripts are classic `defer` scripts. Concatenating each page's exact
// document order preserves deferred execution order while reducing Production requests.
const htmlFiles=[];
async function walkHtml(dir){
  for(const ent of await readdir(dir,{withFileTypes:true})){
    const p=path.join(dir,ent.name);
    if(ent.isDirectory()) await walkHtml(p);
    else if(ent.isFile() && ent.name.endsWith('.html')) htmlFiles.push(p);
  }
}
await walkHtml(out);
const bundleDir=path.join(out,'assets','js','bundles');
await mkdir(bundleDir,{recursive:true});
const generated=new Set();
let bundledPages=0, originalScriptRefs=0;
function clean(u){ return String(u||'').split('#')[0].split('?')[0]; }
function resolveLocal(from,u){
  const c=clean(u);
  if(!c || /^(?:https?:|\/\/|data:|blob:)/i.test(c)) return null;
  return c.startsWith('/') ? path.join(out,c.replace(/^\/+/,'')) : path.resolve(path.dirname(from),c);
}

async function replaceAsync(str,re,fn){
  const matches=[...str.matchAll(re)];
  if(!matches.length) return str;
  const replacements=await Promise.all(matches.map(m=>fn(m[0],...m.slice(1))));
  let outStr='',last=0;
  for(let i=0;i<matches.length;i++){const m=matches[i];outStr+=str.slice(last,m.index)+replacements[i];last=m.index+m[0].length;}
  return outStr+str.slice(last);
}
for(const f of htmlFiles){
  let html=await readFile(f,'utf8');
  const tags=[...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>\s*<\/script>/gi)];
  if(!tags.length) continue;
  const parts=[];
  for(const m of tags){
    const full=m[0];
    if(!/\bdefer(?:\s|=|>|\/)/i.test(full) || /\basync(?:\s|=|>|\/)/i.test(full)) throw new Error(`v434 bundler requires classic defer-only scripts: ${path.relative(out,f)}`);
    const srcPath=resolveLocal(f,m[1]);
    if(!srcPath) throw new Error(`v434 bundler refuses external/non-local script: ${m[1]} in ${path.relative(out,f)}`);
    const st=await stat(srcPath).catch(()=>null);
    if(!st?.isFile()) throw new Error(`v434 bundler missing script: ${m[1]} in ${path.relative(out,f)}`);
    parts.push(await readFile(srcPath));
  }
  originalScriptRefs += tags.length;
  const body=Buffer.concat(parts.flatMap((b,i)=>i?[Buffer.from('\n;\n'),b]:[b]));
  const hash=crypto.createHash('sha256').update(body).digest('hex').slice(0,12);
  const file=`v434-page-runtime-${hash}.v434.js`;
  const dst=path.join(bundleDir,file);
  try { await stat(dst); } catch { await writeFile(dst,body); }
  generated.add(file);
  // Put the single deferred bundle at the first external script location, remove the rest.
  let seen=false;
  html=html.replace(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>\s*<\/script>/gi,(full)=>{
    if(seen) return '';
    seen=true;
    const sri=crypto.createHash('sha384').update(body).digest('base64');
    return `<script defer integrity="sha384-${sri}" src="/assets/js/bundles/${file}"></script>`;
  });
  await writeFile(f,html);
  bundledPages++;
}
// No public inline/runtime code dynamically loads these legacy JS bundle filenames.
// Production keeps only generated page-family bundles; modular originals remain in Source.
for(const ent of await readdir(bundleDir,{withFileTypes:true})){
  if(!ent.isFile() || !ent.name.endsWith('.js')) continue;
  if(!generated.has(ent.name)) await unlink(path.join(bundleDir,ent.name));
}
// Legacy redirect runtime is retained in Source for lineage only; v419+ redirect stubs carry zero runtime.
await unlink(path.join(out,'assets','js','legacy-redirect-24a8773909.v384.js')).catch(()=>{});

// v434 deploy-only legacy-raster hygiene.
// Delete only an unreferenced JPG/JPEG/PNG when a same-stem WebP/AVIF exists AND is referenced
// somewhere in the final public text tree. Source files remain intact for provenance/rollback.
async function collectTextCorpus(dir){
  const exts=new Set(['.html','.css','.js','.json','.webmanifest','.xml','.txt']);
  let corpus='';
  async function walk(d){
    for(const ent of await readdir(d,{withFileTypes:true})){
      const p=path.join(d,ent.name);
      if(ent.isDirectory()) await walk(p);
      else if(ent.isFile() && exts.has(path.extname(ent.name).toLowerCase())) corpus += '\n' + await readFile(p,'utf8');
    }
  }
  await walk(dir); return corpus;
}
const corpus=await collectTextCorpus(out);
const imgDir=path.join(out,'assets','img');
let prunedRasterCount=0, prunedRasterBytes=0;
for(const ent of await readdir(imgDir,{withFileTypes:true})){
  if(!ent.isFile() || !/\.(?:jpe?g|png)$/i.test(ent.name)) continue;
  if(corpus.includes(ent.name)) continue;
  const ext=path.extname(ent.name); const stem=ent.name.slice(0,-ext.length);
  const modern=[`${stem}.webp`,`${stem}.avif`];
  let modernReferenced=false;
  for(const name of modern){
    try{ const st=await stat(path.join(imgDir,name)); if(st.isFile() && corpus.includes(name)){ modernReferenced=true; break; } }catch{}
  }
  if(!modernReferenced) continue;
  const p=path.join(imgDir,ent.name); const st=await stat(p); prunedRasterBytes+=st.size; prunedRasterCount++; await unlink(p);
}
console.log(`v434 deploy hygiene: pruned ${prunedRasterCount} unreachable legacy raster fallbacks (${prunedRasterBytes} bytes); Source retained.`);



// v434 public/private contract boundary.
// Source retains the complete historical contract set. Public deploy exposes only the
// three contracts required by the browser-to-lead bridge; private admin model/governance
// contracts remain available only inside kavico_v434_admin.
const publicContractAllowlist=new Set([
  'lead-conversion.v1.schema.json',
  'lead-admin-export.v1.schema.json',
  'lead-lifecycle.v1.json'
]);
const publicContractsDir=path.join(out,'assets','contracts');
for(const ent of await readdir(publicContractsDir,{withFileTypes:true})){
  if(ent.isFile() && !publicContractAllowlist.has(ent.name)) await unlink(path.join(publicContractsDir,ent.name));
}

// Add SRI to every local stylesheet in the deploy HTML. Scripts are already collapsed to
// a single generated v434 runtime with SHA-384 integrity above. Source HTML remains modular.
for(const f of htmlFiles){
  let html=await readFile(f,'utf8');
  html=await replaceAsync(html,/<link\b[^>]*\brel=["'][^"']*stylesheet[^"']*["'][^>]*>/gi,async(full)=>{
    if(/\bintegrity=["']/i.test(full)) return full;
    const href=full.match(/\bhref=["']([^"']+)["']/i)?.[1];
    const cssPath=resolveLocal(f,href);
    if(!cssPath) return full;
    const st=await stat(cssPath).catch(()=>null); if(!st?.isFile()) return full;
    const sri='sha384-'+crypto.createHash('sha384').update(await readFile(cssPath)).digest('base64');
    return full.replace(/>$/,` integrity="${sri}">`);
  });
  await writeFile(f,html);
}

console.log(`Public deploy tree built at ${out}`);
console.log(`v434 JS bundling: ${bundledPages} pages, ${originalScriptRefs} source script refs -> ${bundledPages} deploy refs, ${generated.size} deterministic bundles.`);
console.log(`Excluded by design: private admin, QA/provenance, source manifests, scripts, root package metadata.`);
