import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(here,'..');
const target=path.resolve(root,process.argv[2]||'.');
const isDist=path.basename(target)==='dist-public';
const skip=new Set(['kavico_v427_admin','dist-public','node_modules','.git','scripts']);
const html=[]; const errors=[];
async function walk(d){for(const e of await readdir(d,{withFileTypes:true})){if(e.isDirectory()&&skip.has(e.name))continue;const p=path.join(d,e.name);if(e.isDirectory())await walk(p);else if(e.isFile()&&e.name.endsWith('.html'))html.push(p)}}
await walk(target);
function attr(tag,n){return tag.match(new RegExp(`\\b${n}\\s*=\\s*["']([^"']*)["']`,'i'))?.[1]??''}
let preloadTags=0,duplicatePreloads=0,fontPreloads=0,imagePreloads=0;
for(const f of html){const t=await readFile(f,'utf8');const seen=new Set();for(const m of t.matchAll(/<link\\b[^>]*>/gi)){const tag=m[0];if(!/\\brel=["'][^"']*\\bpreload\\b/i.test(tag))continue;preloadTags++;const as=attr(tag,'as').toLowerCase();if(as==='font')fontPreloads++;if(as==='image')imagePreloads++;const k=[as,attr(tag,'href'),attr(tag,'imagesrcset'),attr(tag,'imagesizes'),attr(tag,'fetchpriority').toLowerCase(),attr(tag,'type').toLowerCase(),attr(tag,'crossorigin')].join('|');if(seen.has(k)){duplicatePreloads++;errors.push(`duplicate preload: ${path.relative(target,f)} -> ${attr(tag,'href')}`)}seen.add(k)}}
let prunableLegacyRasters=0,prunableBytes=0;
if(isDist){
  const textExt=new Set(['.html','.css','.js','.json','.webmanifest','.xml','.txt']); let corpus='';
  async function collect(d){for(const e of await readdir(d,{withFileTypes:true})){const p=path.join(d,e.name);if(e.isDirectory())await collect(p);else if(e.isFile()&&textExt.has(path.extname(e.name).toLowerCase()))corpus+='\\n'+await readFile(p,'utf8')}} await collect(target);
  const imgDir=path.join(target,'assets','img');
  for(const e of await readdir(imgDir,{withFileTypes:true})){if(!e.isFile()||!/\\.(?:jpe?g|png)$/i.test(e.name)||corpus.includes(e.name))continue;const ext=path.extname(e.name),stem=e.name.slice(0,-ext.length);let modern=false;for(const n of [`${stem}.webp`,`${stem}.avif`]){try{const st=await stat(path.join(imgDir,n));if(st.isFile()&&corpus.includes(n)){modern=true;break}}catch{}}if(modern){prunableLegacyRasters++;const st=await stat(path.join(imgDir,e.name));prunableBytes+=st.size;errors.push(`unreachable legacy raster remains in deploy: ${e.name}`)}}
}
if(!isDist){
  const version=(await readFile(path.join(root,'VERSION'),'utf8')).trim(); const full=(await readFile(path.join(root,'FULL_PROJECT_VERSION'),'utf8')).trim(); const pkg=JSON.parse(await readFile(path.join(root,'package.json'),'utf8'));
  const sw=await readFile(path.join(root,'sw.js'),'utf8');
  if(version!=='v427')errors.push(`VERSION drift: ${version}`); if(full!=='KAVICO_v427_FULL_PROJECT')errors.push(`FULL_PROJECT_VERSION drift: ${full}`); if(pkg.version!=='4.27.0')errors.push(`package version drift: ${pkg.version}`); if(!sw.includes("const VERSION = 'kavico-v427'")||!sw.includes('dev=427'))errors.push('service worker version drift');
  const cov=JSON.parse(await readFile(path.join(root,'CSS_COVERAGE_REPORT_V423.json'),'utf8')); if(cov.selector_pruning_applied!==false||cov.browser_coverage_status!=='blocked_by_environment')errors.push('CSS coverage safety report contract mismatch');
}
const result={version:'v427',target:isDist?'dist-public':'source',html_files:html.length,preload_tags:preloadTags,image_preloads:imagePreloads,font_preloads:fontPreloads,duplicate_preloads:duplicatePreloads,deploy_prunable_legacy_rasters_remaining:prunableLegacyRasters,deploy_prunable_bytes_remaining:prunableBytes,errors};console.log(JSON.stringify(result,null,2));if(errors.length)process.exit(1);
