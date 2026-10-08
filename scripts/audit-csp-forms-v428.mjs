import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const here=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(here,'..');
const target=path.resolve(root,process.argv[2]||'.');
const isDist=path.basename(target)==='dist-public';
const errors=[];
const EXPECTED_BOOTSTRAP_HASH='sha256-qDEfxglHGecIXyI3ij+MmNU1TNUsMXGK0rAUBOZ2M5k=';

async function walkHtml(dir,out=[]){for(const e of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory()){if(e.name==='kavico_v428_admin'||e.name==='node_modules'||(!isDist&&e.name==='dist-public'))continue;await walkHtml(p,out)}else if(e.isFile()&&e.name.endsWith('.html'))out.push(p)}return out}
function attrs(tag){const o={};for(const m of tag.matchAll(/\b([\w:-]+)(?:\s*=\s*["']([^"']*)["'])?/g))o[m[1].toLowerCase()]=m[2]??'';return o}
function norm(s){return String(s||'').trim()}
function sha256b64(s){return 'sha256-'+crypto.createHash('sha256').update(s).digest('base64')}

const html=await walkHtml(target);
let inlineClassic=0,jsonLd=0,inlineEvents=0,inlineStyles=0,bootstrapHashMatches=0;
for(const f of html){
  const t=await readFile(f,'utf8'); const rel=path.relative(target,f).replaceAll(path.sep,'/');
  for(const m of t.matchAll(/<([a-z][\w:-]*)\b([^>]*)>/gi)){
    const a=attrs(m[0]);
    if(Object.keys(a).some(k=>/^on[a-z]+$/i.test(k))){inlineEvents++;errors.push(`inline event handler: ${rel}`)}
    if('style' in a){inlineStyles++;errors.push(`inline style attribute: ${rel}`)}
  }
  for(const m of t.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)){
    const a=attrs(m[0].slice(0,m[0].indexOf('>')+1)); const body=m[2];
    if(a.src) continue;
    const type=(a.type||'').toLowerCase();
    if(type==='application/ld+json'){
      jsonLd++;
      try{JSON.parse(body)}catch{errors.push(`invalid JSON-LD: ${rel}`)}
      continue;
    }
    if(!norm(body)) continue;
    inlineClassic++;
    const h=sha256b64(body);
    if(h===EXPECTED_BOOTSTRAP_HASH) bootstrapHashMatches++;
    else errors.push(`unexpected executable inline script/hash in ${rel}: ${h}`);
  }
}
if(inlineClassic!==132)errors.push(`expected 132 executable inline theme bootstraps, found ${inlineClassic}`);
if(bootstrapHashMatches!==inlineClassic)errors.push(`theme bootstrap hash coverage mismatch ${bootstrapHashMatches}/${inlineClassic}`);
if(jsonLd!==132)errors.push(`expected 132 JSON-LD blocks, found ${jsonLd}`);
if(inlineEvents)errors.push(`inline event attributes present: ${inlineEvents}`);
if(inlineStyles)errors.push(`inline style attributes present: ${inlineStyles}`);

const headers=await readFile(path.join(target,'_headers'),'utf8');
const csp=headers.match(/^\s*Content-Security-Policy:\s*(.+)$/mi)?.[1]||'';
if(!csp)errors.push('missing Content-Security-Policy header');
const required=["default-src 'self'","base-uri 'self'","object-src 'none'","style-src 'self'","style-src-attr 'none'",`script-src 'self' '${EXPECTED_BOOTSTRAP_HASH}'`,"script-src-attr 'none'","connect-src 'self'","worker-src 'self'","form-action 'self'","frame-ancestors 'none'","upgrade-insecure-requests"];
for(const r of required)if(!csp.includes(r))errors.push(`CSP directive missing/incorrect: ${r}`);
if(/'unsafe-inline'|'unsafe-eval'|\bhttps?:\s*\*/i.test(csp))errors.push('CSP contains unsafe-inline/unsafe-eval/wildcard network source');
const hashes=[...csp.matchAll(/'sha256-[^']+'/g)].map(m=>m[0]);
if(hashes.length!==1)errors.push(`CSP should contain exactly one executable inline hash, found ${hashes.length}`);
if(csp.length>700)errors.push(`CSP unexpectedly large: ${csp.length} chars`);

const forms=[
  ['contact/index.html','/contact/thanks/'],
  ['en/contact/index.html','/en/contact/thanks/']
];
for(const [rel,action] of forms){
  const t=await readFile(path.join(target,rel),'utf8');
  const fm=t.match(/<form\b[^>]*\bname=["']project-brief["'][^>]*>/i)?.[0]||t.match(/<form\b[^>]*>/i)?.[0]||'';
  const a=attrs(fm);
  if((a.method||'').toUpperCase()!=='POST')errors.push(`project brief must POST: ${rel}`);
  if(a.action!=='/.netlify/functions/lead-bridge')errors.push(`project brief bridge action drift: ${rel} -> ${a.action||'(missing)'}`);
  if(a['data-netlify']||a['netlify-honeypot'])errors.push(`legacy Netlify Forms binding must be absent: ${rel}`);
  if(!new RegExp(`name=[\"']bridge_return_to[\"'][^>]*value=[\"']${action}[\"']|value=[\"']${action}[\"'][^>]*name=[\"']bridge_return_to[\"']`,'i').test(t))errors.push(`bridge return path missing: ${rel}`);
  if((a['accept-charset']||'').toUpperCase()!=='UTF-8')errors.push(`UTF-8 form charset missing: ${rel}`);
  if(/\btarget\s*=/.test(fm))errors.push(`form target must remain same browsing context: ${rel}`);
  if(!/name=["']form-name["'][^>]*value=["']project-brief["']/i.test(t) && !/value=["']project-brief["'][^>]*name=["']form-name["']/i.test(t))errors.push(`form-name hidden field missing: ${rel}`);
  if(!/name=["']company["']/i.test(t))errors.push(`honeypot input missing: ${rel}`);
  for(const n of ['name','phone','project_stage','details']) if(!new RegExp(`\\bname=["']${n}["']`,'i').test(t))errors.push(`required submission field missing: ${rel} -> ${n}`);
}

// No public JS may post lead data to a remote/origin-external URL. Static same-origin Netlify POST remains authoritative.
let externalSubmitHints=0;
async function walkJs(dir){for(const e of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())await walkJs(p);else if(e.isFile()&&/\.js$/i.test(e.name)){const t=await readFile(p,'utf8');if(/fetch\s*\(\s*["']https?:\/\//i.test(t)||/XMLHttpRequest[\s\S]{0,300}https?:\/\//i.test(t))externalSubmitHints++}}}
await walkJs(path.join(target,'assets','js'));
if(externalSubmitHints)errors.push(`public JS contains external submission/network endpoint hints: ${externalSubmitHints}`);

const result={version:'v428',target:isDist?'dist-public':'source',html_files:html.length,inline_executable_scripts:inlineClassic,theme_bootstrap_hash_matches:bootstrapHashMatches,json_ld_blocks:jsonLd,inline_event_attributes:inlineEvents,inline_style_attributes:inlineStyles,csp_length:csp.length,csp_sha256_hashes:hashes.length,forms_verified:forms.length,external_submission_hints:externalSubmitHints,errors};
console.log(JSON.stringify(result,null,2));if(errors.length)process.exit(1);
