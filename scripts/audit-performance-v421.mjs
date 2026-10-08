import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(here,'..');
const target=path.resolve(root,process.argv[2]||'.');
const isDist=path.basename(target)==='dist-public';
const skip=new Set(['kavico_v414_admin','dist-public','node_modules','.git','scripts']);
const html=[];
async function walk(d){for(const e of await readdir(d,{withFileTypes:true})){if(e.isDirectory()&&skip.has(e.name))continue;const p=path.join(d,e.name);if(e.isDirectory())await walk(p);else if(e.isFile()&&e.name.endsWith('.html'))html.push(p)}}
await walk(target);
const clean=u=>String(u||'').split('#')[0].split('?')[0];
const local=(from,u)=>{u=clean(u);if(!u||/^(?:https?:|data:|blob:|mailto:|tel:|javascript:|#)/i.test(u))return null;return u.startsWith('/')?path.join(target,u.replace(/^\/+/,'')):path.resolve(path.dirname(from),u)};
let indexable=0,redirects=0,lcpPreloads=0,maxCss=0,maxJs=0,totalCssRefs=0,totalJsRefs=0,totalHtmlBytes=0;
let depBytes=0; const errors=[]; const uniqueDeps=new Set();
for(const f of html){const t=await readFile(f,'utf8');totalHtmlBytes+=Buffer.byteLength(t);const noindex=/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(t)||/<meta\b[^>]*content=["'][^"']*noindex[^"']*["'][^>]*name=["']robots["']/i.test(t);const redir=noindex&&/http-equiv=["']refresh["']/i.test(t);if(redir)redirects++;if(!noindex)indexable++;
 const css=[...t.matchAll(/<link\b[^>]*href=["']([^"']+)["'][^>]*rel=["'][^"']*stylesheet[^"']*["'][^>]*>|<link\b[^>]*rel=["'][^"']*stylesheet[^"']*["'][^>]*href=["']([^"']+)["'][^>]*>/gi)].map(m=>m[1]||m[2]);
 const js=[...t.matchAll(/<script\b[^>]*src=["']([^"']+)["'][^>]*>/gi)].map(m=>m[1]);
 totalCssRefs+=css.length; totalJsRefs+=js.length; maxCss=Math.max(maxCss,css.length);maxJs=Math.max(maxJs,js.length);
 if(redir&&(css.length||js.length))errors.push(`redirect carries CSS/JS: ${path.relative(target,f)}`);
 if(!redir&&css.length>4)errors.push(`CSS request budget >4: ${path.relative(target,f)} (${css.length})`);
 if(!redir&&!isDist&&js.length>4)errors.push(`Source JS request budget >4: ${path.relative(target,f)} (${js.length})`);
 if(!redir&&isDist&&js.length!==1)errors.push(`Deploy JS bundle count must be 1: ${path.relative(target,f)} (${js.length})`);
 for(const u of [...css,...js]){const p=local(f,u);if(!p)continue;try{const s=await stat(p);depBytes+=s.size;uniqueDeps.add(p)}catch{errors.push(`missing dependency ${u} from ${path.relative(target,f)}`)}}
 const main=t.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0]||'';
 const first=main.match(/<img\b[^>]*>/i)?.[0]||'';
 const highFirst=/loading=["']eager["']/i.test(first)&&/fetchpriority=["']high["']/i.test(first);
 const preloadTags=[...t.matchAll(/<link\b[^>]*>/gi)].map(m=>m[0]);
 const hasLcpPreload=preloadTags.some(tag=>/rel=["']preload["']/i.test(tag)&&/as=["']image["']/i.test(tag)&&/fetchpriority=["']high["']/i.test(tag));
 if(!noindex&&highFirst){if(hasLcpPreload)lcpPreloads++;else errors.push(`missing LCP preload: ${path.relative(target,f)}`)}
 if(/v416-public-system\.v416\.css|v417-page-experience\.v417\.css|v418-shell-accessibility-performance\.v418\.css|v417-public-runtime\.v417\.js|v418-shell-runtime\.v418\.js/.test(t))errors.push(`superseded layer reference: ${path.relative(target,f)}`);
}
const obsolete=['assets/css/bundles/v416-public-system.v416.css','assets/css/bundles/v417-page-experience.v417.css','assets/css/bundles/v418-shell-accessibility-performance.v418.css','assets/js/bundles/v417-public-runtime.v417.js','assets/js/bundles/v418-shell-runtime.v418.js','assets/js/bundles/public-c6711806ea.v391.js','assets/css/bundles/v396-system.v396.css','assets/css/bundles/v419-public-core.v419.css'];
for(const r of obsolete){try{await stat(path.join(target,r));errors.push(`obsolete deploy asset still present: ${r}`)}catch{}}
const result={version:'v421',html_files:html.length,indexable_pages:indexable,legacy_redirect_stubs:redirects,lcp_preload_pages:lcpPreloads,max_stylesheets_per_page:maxCss,max_scripts_per_page:maxJs,total_stylesheet_references:totalCssRefs,total_script_references:totalJsRefs,public_html_bytes:totalHtmlBytes,aggregate_static_css_js_reference_bytes:depBytes,unique_static_css_js_dependencies:uniqueDeps.size,request_contract:isDist?'v421 deploy: <=4 CSS, exactly one deferred page-runtime JS, redirects zero CSS/JS':'v421 source: merged global CSS, modular deferred JS <=4, redirects zero CSS/JS',errors};
console.log(JSON.stringify(result,null,2));if(errors.length)process.exit(1);
