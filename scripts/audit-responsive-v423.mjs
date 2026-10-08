import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(here,'..');
const target=path.resolve(root,process.argv[2]||'.');
const skip=new Set(['kavico_v414_admin','dist-public','node_modules','.git','scripts']);
const html=[]; const errors=[];
async function walk(d){for(const e of await readdir(d,{withFileTypes:true})){if(e.isDirectory()&&skip.has(e.name))continue;const p=path.join(d,e.name);if(e.isDirectory())await walk(p);else if(e.isFile()&&e.name.endsWith('.html'))html.push(p)}}
await walk(target);
function attr(tag,n){return tag.match(new RegExp(`\\b${n}\\s*=\\s*["']([^"']*)["']`,'i'))?.[1]??null}
function local(from,u){if(!u||/^(?:https?:|data:|blob:|\/\/)/i.test(u))return null;u=u.split('?')[0].split('#')[0];return u.startsWith('/')?path.join(target,u.replace(/^\/+/,'')):path.resolve(path.dirname(from),u)}
async function isFile(p){try{return (await stat(p)).isFile()}catch{return false}}
let imageTags=0,srcsetTags=0,eligible=0,covered=0,smallerWebpRemaining=0,lcpResponsive=0,lcpResponsivePreload=0;
for(const f of html){const t=await readFile(f,'utf8');const rel=path.relative(target,f).replaceAll('\\','/');const imgs=[...t.matchAll(/<img\b[^>]*>/gi)].map(m=>m[0]);
 for(const tag of imgs){imageTags++;const src=attr(tag,'src');const p=local(f,src);if(!p||!(await isFile(p)))continue;const ext=path.extname(p).toLowerCase();const st=await stat(p);
   const ss=attr(tag,'srcset'); if(ss)srcsetTags++;
   if(['.jpg','.jpeg','.png'].includes(ext)){const wp=p.slice(0,-ext.length)+'.webp';if(await isFile(wp)){const wst=await stat(wp);if(wst.size<st.size){smallerWebpRemaining++;errors.push(`Smaller same-stem WebP still unused: ${rel} -> ${src}`)}}}
   if(ext==='.webp'){
     const stem=p.slice(0,-ext.length);let variants=0;for(const w of [480,640,768,960,1280])if(await isFile(`${stem}-${w}w.webp`))variants++;
     if(variants){eligible++;if(ss&&attr(tag,'sizes'))covered++;else errors.push(`Responsive variant asset lacks srcset/sizes: ${rel} -> ${src}`)}
   }
   const isLcp=/loading=["']eager["']/i.test(tag)&&/fetchpriority=["']high["']/i.test(tag);
   if(isLcp&&ss){lcpResponsive++;const preloads=[...t.matchAll(/<link\b[^>]*>/gi)].map(m=>m[0]).filter(x=>/rel=["']preload["']/i.test(x)&&/as=["']image["']/i.test(x)&&/fetchpriority=["']high["']/i.test(x));if(preloads.some(x=>attr(x,'imagesrcset')&&attr(x,'imagesizes')))lcpResponsivePreload++;else errors.push(`Responsive LCP missing responsive preload: ${rel}`)}
 }
}
const result={version:'v423',html_files:html.length,image_tags:imageTags,srcset_tags:srcsetTags,responsive_eligible_tags:eligible,responsive_covered_tags:covered,responsive_coverage_pct:eligible?Number((covered*100/eligible).toFixed(2)):100,smaller_webp_opportunities_remaining:smallerWebpRemaining,responsive_lcp_images:lcpResponsive,responsive_lcp_preloads:lcpResponsivePreload,errors};
console.log(JSON.stringify(result,null,2));if(errors.length)process.exit(1);
