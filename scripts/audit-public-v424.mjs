import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(here, '..');
const target = path.resolve(projectRoot, process.argv[2] || '.');
const isSourceRoot = target === projectRoot;
const isDist = path.basename(target) === 'dist-public';
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
function attr(tag,name){
  const m=tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`,'i'));
  return m?.[1] ?? null;
}

let localRefs=0, indexable=0, jsonLd=0, imageCount=0, standardBodyCount=0, redirectStubCount=0, webpImgSrc=0, jpgImgSrc=0, lazyPriorityLow=0;
const faArticleHeroes=new Map(); const enArticleHeroes=new Map();
for(const f of htmlFiles){
  const rel=path.relative(target,f).replaceAll('\\','/');
  const t=await readFile(f,'utf8');
  if(/kavico_v414_admin/i.test(t)) errors.push(`Public HTML references private admin: ${rel}`);
  const redirectStub=/name=["']robots["'][^>]*noindex/i.test(t) && /http-equiv=["']refresh["']/i.test(t);
  if(redirectStub) redirectStubCount++;
  if(!redirectStub){
    if(!/v420-system-core\.v420\.css/.test(t)) errors.push(`Missing v420 merged system/core stylesheet: ${rel}`);
    if(isSourceRoot && !/v419-public-runtime\.v419\.js/.test(t)) errors.push(`Missing modular v419 public runtime in source: ${rel}`);
    if(isDist && !/v424-page-runtime-[a-f0-9]{12}\.v424\.js/.test(t)) errors.push(`Missing v424 deploy page-runtime bundle: ${rel}`);
    if(!/<body\b[^>]*class=["'][^"']*\bv419-public\b/i.test(t)) errors.push(`Missing v419-public body class: ${rel}`);
    else standardBodyCount++;
  }
  const metaTags=[...t.matchAll(/<meta\b[^>]*>/gi)].map(m=>m[0]);
  const linkTags=[...t.matchAll(/<link\b[^>]*>/gi)].map(m=>m[0]);
  const metaBy=(name,value)=>metaTags.find(tag=>String(attr(tag,name)||'').toLowerCase()===value);
  const robotsTag=metaBy('name','robots');
  const noindex=robotsTag ? /noindex/i.test(attr(robotsTag,'content')||'') : false;
  const isRedirect=noindex && /http-equiv=["']refresh["']/i.test(t);
  if(!isRedirect && !metaBy('name','viewport')) errors.push(`Missing viewport meta: ${rel}`);
  const colorScheme=metaBy('name','color-scheme');
  if(!colorScheme || !/\bdark\b/i.test(attr(colorScheme,'content')||'') || !/\blight\b/i.test(attr(colorScheme,'content')||'')) errors.push(`Missing dark/light color-scheme meta: ${rel}`);
  if(!noindex){
    if(!/<a\b[^>]*class=["'][^"']*\bskip-link\b[^"']*["'][^>]*href=["']#main["']/i.test(t)) errors.push(`Missing accessible skip link: ${rel}`);
    if(!/<header\b[^>]*id=["']header["']/i.test(t)) errors.push(`Missing header shell: ${rel}`);
    if(!/<main\b[^>]*id=["']main["']/i.test(t)) errors.push(`Missing main landmark: ${rel}`);
    if(!/<nav\b[^>]*id=["']nav["']/i.test(t)) errors.push(`Missing primary nav landmark: ${rel}`);
    if(!/<button\b[^>]*id=["']themeToggle["'][^>]*aria-label=/i.test(t) && !/<button\b[^>]*aria-label=["'][^"']+["'][^>]*id=["']themeToggle["']/i.test(t)) errors.push(`Theme control missing accessible name: ${rel}`);
    if(!/<footer\b[^>]*class=["'][^"']*\bfooter\b/i.test(t)) errors.push(`Missing footer landmark: ${rel}`);
  }

  const ids=[...t.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)].map(m=>m[1]);
  const seen=new Set(); for(const id of ids){ if(seen.has(id)) errors.push(`Duplicate id ${id}: ${rel}`); seen.add(id); }

  for(const m of t.matchAll(/\b(?:href|src)\s*=\s*["']([^"']+)["']/gi)){
    const u=m[1]; if(ignorable(cleanUrl(u))) continue; localRefs++;
    if(!(await existsRef(f,u))) errors.push(`Missing local ref: ${rel} -> ${u}`);
  }
  for(const m of t.matchAll(/\bsrcset\s*=\s*["']([^"']+)["']/gi)){
    for(const item of m[1].split(',')){
      const u=item.trim().split(/\s+/)[0]; if(!u || ignorable(cleanUrl(u))) continue; localRefs++;
      if(!(await existsRef(f,u))) errors.push(`Missing srcset ref: ${rel} -> ${u}`);
    }
  }
  for(const m of t.matchAll(/<img\b[^>]*>/gi)){
    const tag=m[0]; imageCount++;
    const src=String(attr(tag,'src')||'').split('?')[0].toLowerCase();
    if(src.endsWith('.webp')) webpImgSrc++;
    if(src.endsWith('.jpg')||src.endsWith('.jpeg')) jpgImgSrc++;
    if(attr(tag,'alt')===null) errors.push(`Image missing alt: ${rel}`);
    if(!attr(tag,'width') || !attr(tag,'height')) errors.push(`Image missing intrinsic dimensions: ${rel}`);
    const loading=String(attr(tag,'loading')||'').toLowerCase();
    if(!loading) errors.push(`Image missing loading policy: ${rel}`);
    if(loading==='lazy'){
      if(String(attr(tag,'fetchpriority')||'').toLowerCase()!=='low') errors.push(`Lazy image missing low fetch priority: ${rel} -> ${attr(tag,'src')||''}`);
      else lazyPriorityLow++;
    }
  }
  const mainMatch=t.match(/<main\b[^>]*>[\s\S]*?<\/main>/i);
  if(mainMatch){
    const firstContentImage=mainMatch[0].match(/<img\b[^>]*>/i)?.[0];
    if(firstContentImage){
      if(String(attr(firstContentImage,'loading')||'').toLowerCase()!=='eager') errors.push(`First main image is not eager: ${rel}`);
      if(String(attr(firstContentImage,'fetchpriority')||'').toLowerCase()!=='high') errors.push(`First main image is not high priority: ${rel}`);
    }
  }

  if(!noindex){
    indexable++;
    const title=(t.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]||'').replace(/<[^>]+>/g,'').trim();
    if(title.length<2) errors.push(`Indexable page missing title: ${rel}`);
    const descTag=metaBy('name','description');
    if(!descTag || String(attr(descTag,'content')||'').trim().length<20) errors.push(`Indexable page missing description: ${rel}`);
    const canonical=linkTags.find(tag=>String(attr(tag,'rel')||'').toLowerCase().split(/\s+/).includes('canonical') && attr(tag,'href'));
    if(!canonical) errors.push(`Indexable page missing canonical: ${rel}`);
    const h1=(t.match(/<h1\b/gi)||[]).length; if(h1!==1) errors.push(`Indexable page H1 count ${h1}: ${rel}`);
    const ogImage=metaTags.find(tag=>String(attr(tag,'property')||'').toLowerCase()==='og:image' && attr(tag,'content'));
    if(!ogImage) errors.push(`Indexable page missing og:image: ${rel}`);
  }

  for(const m of t.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)){
    jsonLd++; try{ JSON.parse(m[1]); }catch(e){ errors.push(`Invalid JSON-LD: ${rel} (${e.message})`); }
  }

  // Article hero uniqueness by locale. Category/index pages are intentionally excluded.
  const articleMatch=rel.match(/^(en\/)?blog\/([^/]+)\/index\.html$/);
  if(articleMatch && !['decorative','industrial'].includes(articleMatch[2])){
    const images=[...t.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)].map(m=>m[1].split('?')[0]).filter(x=>!x.includes('logo'));
    if(!images.length) errors.push(`Article has no content image: ${rel}`);
    else {
      const map=articleMatch[1]?enArticleHeroes:faArticleHeroes;
      const hero=images[0]; if(map.has(hero)) errors.push(`Duplicate article hero: ${rel} and ${map.get(hero)} -> ${hero}`); else map.set(hero,rel);
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


// v417 page-experience contract retained under v418: key page families must retain their expected structural anchors.
const keyPages = {
  home: ['index.html','en/index.html'],
  services: ['services/index.html','en/services/index.html'],
  portfolio: ['portfolio/index.html','en/portfolio/index.html'],
  contact: ['contact/index.html','en/contact/index.html']
};
for (const rel of keyPages.home) {
  const t=await readFile(path.join(target,rel),'utf8');
  if(!/class=["'][^"']*\bhero-grid\b/.test(t) || !/class=["'][^"']*\bhero-media-col\b/.test(t)) errors.push(`v417 home hero anchors missing: ${rel}`);
}
for (const rel of keyPages.services) {
  const t=await readFile(path.join(target,rel),'utf8');
  const choices=(t.match(/class=["'][^"']*\bv342-service-choice\b/g)||[]).length;
  if(choices<5) errors.push(`v417 service chooser has fewer than 5 choices: ${rel}`);
}
for (const rel of keyPages.portfolio) {
  const t=await readFile(path.join(target,rel),'utf8');
  const finishes=(t.match(/class=["'][^"']*\bv340-finish-card\b/g)||[]).length;
  if(finishes<4) errors.push(`v417 portfolio showcase has fewer than 4 finish cards: ${rel}`);
}
for (const rel of keyPages.contact) {
  const t=await readFile(path.join(target,rel),'utf8');
  if(!/class=["'][^"']*\bproject-brief__form\b/.test(t)) errors.push(`v417 contact project brief missing: ${rel}`);
  const routes=(t.match(/class=["'][^"']*\bv370-router-card\b/g)||[]).length;
  if(routes<3) errors.push(`v417 contact router has fewer than 3 paths: ${rel}`);
}
const representativeArticle=await readFile(path.join(target,'blog/pvd-quote-guide/index.html'),'utf8');
if(!/class=["'][^"']*\barticle-toc\b/.test(representativeArticle)) errors.push('v417 representative article lost article TOC');
if(!/href=["']#section-1["']/.test(representativeArticle)) errors.push('v417 representative article lost section anchors');

const sw=await readFile(path.join(target,'sw.js'),'utf8');
if(!sw.includes("const VERSION = 'kavico-v424'")) errors.push('Service worker cache namespace is not v424');
if(!sw.includes('dev=424')) errors.push('Service worker dev flag is not v424');

let staleCopyright=0;
for(const f of htmlFiles){ const t=await readFile(f,'utf8'); if(t.includes('© 2025')||t.includes('© ۱۴۰۴')) staleCopyright++; }
if(staleCopyright) errors.push(`Stale copyright remains in ${staleCopyright} HTML files`);

if(isSourceRoot){
  const redir=await readFile(path.join(target,'_redirects'),'utf8');
  if(!redir.includes('/kavico_v414_admin/*')) errors.push('Defense-in-depth admin static block missing from _redirects');
  const netlify=await readFile(path.join(target,'netlify.toml'),'utf8');
  if(!/publish\s*=\s*["']dist-public["']/.test(netlify)) errors.push('Netlify publish target is not dist-public');
  if(!/build-public-deploy\.mjs/.test(netlify)) errors.push('Netlify build command does not build safe public tree');
  for (const retired of ['assets/css/bundles/v396-system.v396.css','assets/css/bundles/v419-public-core.v419.css']) {
    try { await stat(path.join(target,retired)); errors.push(`Retired v420 CSS source still present: ${retired}`); } catch {}
  }

}

const v420Css=await readFile(path.join(target,'assets/css/bundles/v435-system-core.v435.css'),'utf8');
if(!/prefers-contrast:more/.test(v420Css)) errors.push('v420 merged stylesheet lost prefers-contrast hardening');
if(!/prefers-reduced-motion:reduce/.test(v420Css)) errors.push('v420 merged stylesheet lost reduced-motion hardening');
if(isSourceRoot){
  const v419Js=await readFile(path.join(target,'assets/js/bundles/v419-public-runtime.v419.js'),'utf8');
  if(!/MutationObserver/.test(v419Js) || !/aria-current/.test(v419Js)) errors.push('v419 modular runtime lost theme/nav accessibility hardening');
}
if(isDist){
  const jsDir=path.join(target,'assets/js/bundles');
  const names=await readdir(jsDir);
  const generated=names.filter(n=>/^v424-page-runtime-[a-f0-9]{12}\.v424\.js$/.test(n));
  if(generated.length<1) errors.push('No v424 deploy page-runtime bundles found');
  const joined=(await Promise.all(generated.map(n=>readFile(path.join(jsDir,n),'utf8')))).join('\n');
  if(!/MutationObserver/.test(joined) || !/aria-current/.test(joined)) errors.push('v424 deploy bundles lost theme/nav accessibility hardening');
}

// v420 request/image/LCP contract: the three prior public layers are consolidated into one CSS and one JS request.
let preloadPages=0;
for(const f of htmlFiles){
  const rel=path.relative(target,f).replaceAll('\\','/');
  const t=await readFile(f,'utf8');
  if(/v416-public-system\.v416\.css|v417-page-experience\.v417\.css|v418-shell-accessibility-performance\.v418\.css/.test(t)) errors.push(`Superseded public CSS layer still referenced: ${rel}`);
  if(/v396-system\.v396\.css|v419-public-core\.v419\.css/.test(t)) errors.push(`Retired global CSS still referenced after v420 merge: ${rel}`);
  if(/v417-public-runtime\.v417\.js|v418-shell-runtime\.v418\.js/.test(t)) errors.push(`Superseded public JS layer still referenced: ${rel}`);
  const cssCount=(t.match(/<link\b[^>]*rel=["'][^"']*stylesheet[^"']*["'][^>]*>/gi)||[]).length;
  const jsCount=(t.match(/<script\b[^>]*src=["'][^"']+["'][^>]*>/gi)||[]).length;
  const isLegacyRedirect=/name=["']robots["'][^>]*noindex/i.test(t) && /http-equiv=["']refresh["']/i.test(t);
  if(!isLegacyRedirect && cssCount>4) errors.push(`Stylesheet request budget exceeded (${cssCount}>4): ${rel}`);
  if(!isLegacyRedirect && isSourceRoot && jsCount>4) errors.push(`Source script request budget exceeded (${jsCount}>4): ${rel}`);
  if(!isLegacyRedirect && isDist && jsCount!==1) errors.push(`Deploy script bundle count must equal 1 (${jsCount}): ${rel}`);
  if(isLegacyRedirect && (cssCount!==0 || jsCount!==0)) errors.push(`Legacy redirect loads avoidable CSS/JS (${cssCount}/${jsCount}): ${rel}`);
  const robots=(t.match(/<meta\b[^>]*name=["']robots["'][^>]*>/i)||[])[0]||'';
  const noindex=/noindex/i.test(robots);
  const main=t.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0]||'';
  const first=main.match(/<img\b[^>]*>/i)?.[0]||'';
  if(!noindex && first && /loading=["']eager["']/i.test(first) && /fetchpriority=["']high["']/i.test(first)){
    const lcpPreloadTags=[...t.matchAll(/<link\b[^>]*>/gi)].map(m=>m[0]);
    const hasHighImagePreload=lcpPreloadTags.some(tag=>String(attr(tag,'rel')||'').toLowerCase().split(/\s+/).includes('preload') && String(attr(tag,'as')||'').toLowerCase()==='image' && String(attr(tag,'fetchpriority')||'').toLowerCase()==='high');
    if(!hasHighImagePreload) errors.push(`Indexable LCP image missing preload: ${rel}`);
    else preloadPages++;
  }
}
const result={
  version:'v424', root:path.basename(target), html_files:htmlFiles.length, indexable_pages:indexable,
  local_refs_checked:localRefs, images_checked:imageCount, webp_img_src:webpImgSrc, jpg_img_src:jpgImgSrc, lazy_images_low_priority:lazyPriorityLow, json_ld_blocks:jsonLd,
  v419_baseline_body_pages:standardBodyCount, deploy_page_runtime_bundled:isDist, legacy_redirect_stubs:redirectStubCount, lcp_preload_pages:preloadPages, fa_article_heroes:faArticleHeroes.size, en_article_heroes:enArticleHeroes.size,
  errors,warnings
};
console.log(JSON.stringify(result,null,2));
if(errors.length) process.exit(1);
