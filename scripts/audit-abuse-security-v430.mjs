import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(here,'..');
const target=path.resolve(root,process.argv[2]||'.');
const isDist=path.basename(target)==='dist-public';
const errors=[];
function attrs(tag){const o={};for(const m of tag.matchAll(/\b([\w:-]+)(?:\s*=\s*["']([^"']*)["'])?/g))o[m[1].toLowerCase()]=m[2]??'';return o}
function hasInput(html,name,value=null){const re=new RegExp(`<input\\b[^>]*\\bname=["']${name}["'][^>]*>`,'i');const m=html.match(re);if(!m)return false;if(value===null)return true;return attrs(m[0]).value===value}

const forms=[['contact/index.html','/contact/thanks/'],['en/contact/index.html','/en/contact/thanks/']];
let formsVerified=0,guardFieldsVerified=0,honeyVerified=0,runtimeGuardVerified=0;
for(const [rel,action] of forms){
  const p=path.join(target,rel);const html=await readFile(p,'utf8');
  const formTag=html.match(/<form\b[^>]*\bname=["']project-brief["'][^>]*>/i)?.[0]||'';
  const a=attrs(formTag);
  if(!formTag)errors.push(`project brief form missing: ${rel}`);
  if((a.method||'').toUpperCase()!=='POST')errors.push(`project brief must POST: ${rel}`);
  if(a.action!=='/.netlify/functions/lead-bridge')errors.push(`lead bridge action drift: ${rel} -> ${a.action||'(missing)'}`);
  if(a['data-netlify']||a['netlify-honeypot'])errors.push(`legacy Netlify Forms binding must be removed: ${rel}`);
  if(!new RegExp(`name=[\"']bridge_return_to[\"'][^>]*value=[\"']${action}[\"']|value=[\"']${action}[\"'][^>]*name=[\"']bridge_return_to[\"']`,'i').test(html))errors.push(`bridge return path missing: ${rel}`);
  if(a['data-brief-version']!=='427')errors.push(`data-brief-version must be 427: ${rel}`);
  const guardFields=['form_guard_version','form_rendered_at','form_elapsed_ms','form_nonce','abuse_score','abuse_signals'];
  let ok=true;for(const n of guardFields)if(!hasInput(html,n)){errors.push(`form guard field missing: ${rel} -> ${n}`);ok=false}
  if(!hasInput(html,'form_guard_version','v430')){errors.push(`form_guard_version drift: ${rel}`);ok=false}
  if(ok)guardFieldsVerified++;
  const hp=html.match(/<input\b[^>]*\bname=["']company["'][^>]*>/i)?.[0]||''; const hpa=attrs(hp);
  if(!hp||hpa.autocomplete!=='off'||hpa.tabindex!=='-1')errors.push(`honeypot input hardening missing: ${rel}`);else honeyVerified++;
  if(isDist){
    const scriptSrcs=[...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)].map(m=>m[1]);
    if(scriptSrcs.length!==1)errors.push(`dist real form page must have one bundled runtime: ${rel} (${scriptSrcs.length})`);
    if(scriptSrcs[0]){
      const sp=path.join(target,scriptSrcs[0].replace(/^\/+/,''));
      try{const js=await readFile(sp,'utf8');if(!js.includes('KAVICO v430 — public form abuse guard'))errors.push(`bundled v430 form guard missing: ${rel}`);else runtimeGuardVerified++}catch{errors.push(`bundled runtime missing: ${rel}`)}
    }
  }else{
    if(!/v430-public-runtime\.v430\.js/i.test(html))errors.push(`v430 public runtime missing: ${rel}`);else runtimeGuardVerified++;
  }
  formsVerified++;
}

const headers=await readFile(path.join(target,'_headers'),'utf8');
const requiredHeaders=[
  'Cross-Origin-Opener-Policy: same-origin',
  'Cross-Origin-Resource-Policy: same-origin',
  'Origin-Agent-Cluster: ?1',
  'X-Permitted-Cross-Domain-Policies: none',
  'X-Content-Type-Options: nosniff',
  'Referrer-Policy: strict-origin-when-cross-origin'
];
for(const h of requiredHeaders)if(!headers.includes(h))errors.push(`security header missing: ${h}`);
const pp=headers.match(/^\s*Permissions-Policy:\s*(.+)$/mi)?.[1]||'';
for(const f of ['accelerometer=()','autoplay=()','browsing-topics=()','camera=()','display-capture=()','geolocation=()','gyroscope=()','magnetometer=()','microphone=()','midi=()','payment=()','publickey-credentials-get=()','usb=()','xr-spatial-tracking=()'])if(!pp.includes(f))errors.push(`Permissions-Policy missing: ${f}`);

const sw=await readFile(path.join(target,'sw.js'),'utf8');
const swChecks=[
  ["const DEV_MODE = IS_LOCAL_DEV || /\\bdev=430\\b/.test(SEARCH);",'SW dev flag'],
  ["const VERSION = 'kavico-v430';",'SW cache version'],
  ['navigationPreload.enable()','navigation preload enable'],
  ['event.preloadResponse','navigation preload consumption'],
  ["req.headers.get('Range')",'Range cache bypass'],
  ["req.headers.get('Authorization')",'Authorization cache bypass'],
  ['if(url.search) return false;','query cache bypass'],
  ['res.status === 200','partial/non-200 cache rejection'],
  ["ct.startsWith('image/')",'image MIME cache check'],
  ["cc.includes",'']
];
for(const [needle,label] of swChecks){if(label&& !sw.includes(needle))errors.push(`service worker hardening missing: ${label}`)}
if(!/no-store\|private/.test(sw) && !/no-store\|private/.test(sw.replace(/\\b/g,'')))errors.push('service worker must reject no-store/private responses');
if(!sw.includes("url.pathname.startsWith('/api/')")||!sw.includes("url.pathname.startsWith('/.netlify/functions/')"))errors.push('service worker write/API bypass missing');

// Authoritative private ingestion replay/dedupe must remain present and tested by admin suite.
let adminIngestDedupe=isDist ? 'not-in-public-deploy' : false;
if(!isDist){
  const leadsPath=path.join(target,'kavico_v430_admin','server','leads.mjs');
  try{
    const leads=await readFile(leadsPath,'utf8');
    adminIngestDedupe=leads.includes("SELECT event_id FROM ingest_events WHERE event_id=?") && leads.includes('lead_reference already exists');
    if(!adminIngestDedupe)errors.push('private ingestion duplicate event/reference protection missing');
  }catch{errors.push('private admin leads ingestion source missing')}
}else{
  try{await stat(path.join(target,'kavico_v430_admin'));errors.push('private admin leaked into public deploy')}catch{}
}

if(!isDist){for(const rel of ['netlify/functions/lead-bridge.mjs','netlify/functions/_lead-bridge-core.mjs']){try{await stat(path.join(target,rel))}catch{errors.push(`lead bridge source missing: ${rel}`)}}const nt=await readFile(path.join(target,'netlify.toml'),'utf8');if(!/\[functions\][\s\S]*directory\s*=\s*["']netlify\/functions["']/i.test(nt))errors.push('Netlify functions directory is not configured');}
const result={version:'v430',target:isDist?'dist-public':'source',forms_verified:formsVerified,guard_field_sets_verified:guardFieldsVerified,honeypots_verified:honeyVerified,runtime_guards_verified:runtimeGuardVerified,permissions_policy_length:pp.length,security_headers_verified:requiredHeaders.length,admin_ingest_dedupe_contract:adminIngestDedupe,client_guard_scope:'advisory-abuse-signals + accidental-double-submit; server ingestion remains authoritative',errors};
console.log(JSON.stringify(result,null,2));if(errors.length)process.exit(1);
