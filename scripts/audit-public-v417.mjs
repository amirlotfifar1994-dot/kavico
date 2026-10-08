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
function attr(tag,name){
  const m=tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`,'i'));
  return m?.[1] ?? null;
}

let localRefs=0, indexable=0, jsonLd=0, imageCount=0, standardBodyCount=0;
const faArticleHeroes=new Map(); const enArticleHeroes=new Map();
for(const f of htmlFiles){
  const rel=path.relative(target,f).replaceAll('\\','/');
  const t=await readFile(f,'utf8');
  if(/kavico_v414_admin/i.test(t)) errors.push(`Public HTML references private admin: ${rel}`);
  if(!/v417-page-experience\.v417\.css/.test(t)) errors.push(`Missing v417 public stylesheet: ${rel}`);
  if(!/v417-public-runtime\.v417\.js/.test(t)) errors.push(`Missing v417 public runtime: ${rel}`);
  if(!/<body\b[^>]*class=["'][^"']*\bv417-public\b/i.test(t)) errors.push(`Missing v417-public body class: ${rel}`);
  else standardBodyCount++;
  const metaTags=[...t.matchAll(/<meta\b[^>]*>/gi)].map(m=>m[0]);
  const linkTags=[...t.matchAll(/<link\b[^>]*>/gi)].map(m=>m[0]);
  const metaBy=(name,value)=>metaTags.find(tag=>String(attr(tag,name)||'').toLowerCase()===value);
  const robotsTag=metaBy('name','robots');
  const noindex=robotsTag ? /noindex/i.test(attr(robotsTag,'content')||'') : false;
  const isRedirect=noindex && /http-equiv=["']refresh["']/i.test(t);
  if(!isRedirect && !metaBy('name','viewport')) errors.push(`Missing viewport meta: ${rel}`);

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
    if(attr(tag,'alt')===null) errors.push(`Image missing alt: ${rel}`);
    if(!attr(tag,'width') || !attr(tag,'height')) errors.push(`Image missing intrinsic dimensions: ${rel}`);
    if(!attr(tag,'loading')) errors.push(`Image missing loading policy: ${rel}`);
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


// v417 page-experience contract: key page families must retain their expected structural anchors.
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
if(!sw.includes("const VERSION = 'kavico-v417'")) errors.push('Service worker cache namespace is not v417');
if(!sw.includes('dev=417')) errors.push('Service worker dev flag is not v417');

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

const result={
  version:'v417', root:path.basename(target), html_files:htmlFiles.length, indexable_pages:indexable,
  local_refs_checked:localRefs, images_checked:imageCount, json_ld_blocks:jsonLd,
  v417_body_pages:standardBodyCount, fa_article_heroes:faArticleHeroes.size, en_article_heroes:enArticleHeroes.size,
  errors,warnings
};
console.log(JSON.stringify(result,null,2));
if(errors.length) process.exit(1);
