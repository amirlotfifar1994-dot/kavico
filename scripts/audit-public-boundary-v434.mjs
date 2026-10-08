import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const here=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(here,'..');
const target=path.resolve(root,process.argv[2]||'.');
const isDist=path.basename(target)==='dist-public';
const errors=[];
const allowedContracts=new Set(['lead-conversion.v1.schema.json','lead-admin-export.v1.schema.json','lead-lifecycle.v1.json']);
const internalFormFields=['admin_manifest_version','admin_manifest_url','admin_model_version','admin_ingestion_contract_version','admin_ui_contract_version','admin_kpi_contract_version'];
const sharedFields=['event_contract_version','event_schema','admin_contract_version','admin_export_schema','lifecycle_mapping_version','admin_export'];

function attr(tag,n){return tag.match(new RegExp(`\\b${n}\\s*=\\s*["']([^"']+)["']`,'i'))?.[1]??''}
function clean(u){return String(u||'').split('#')[0].split('?')[0]}
function local(from,u){u=clean(u);if(!u||/^(?:https?:|\/\/|data:|blob:)/i.test(u))return null;return u.startsWith('/')?path.join(target,u.replace(/^\/+/,'')):path.resolve(path.dirname(from),u)}
async function digest(p){return 'sha384-'+crypto.createHash('sha384').update(await readFile(p)).digest('base64')}

for(const rel of ['contact/index.html','en/contact/index.html']){
  const p=path.join(target,rel); const t=await readFile(p,'utf8');
  for(const n of internalFormFields) if(new RegExp(`\\bname=["']${n}["']`,'i').test(t)) errors.push(`internal admin form metadata exposed: ${rel} -> ${n}`);
  for(const n of sharedFields) if(!new RegExp(`\\bname=["']${n}["']`,'i').test(t)) errors.push(`required public lead bridge field missing: ${rel} -> ${n}`);
}

const headers=await readFile(path.join(target,'_headers'),'utf8');
if(!/\/assets\/contracts\/\*[\s\S]*X-Robots-Tag:\s*noindex,\s*nofollow,\s*noarchive/i.test(headers)) errors.push('shared contracts lack noindex/noarchive header policy');

const contractsDir=path.join(target,'assets','contracts');
const contractNames=(await readdir(contractsDir,{withFileTypes:true})).filter(x=>x.isFile()).map(x=>x.name).sort();
if(isDist){
  const extras=contractNames.filter(n=>!allowedContracts.has(n));
  const missing=[...allowedContracts].filter(n=>!contractNames.includes(n));
  if(extras.length) errors.push(`private/internal contracts leaked into deploy: ${extras.join(', ')}`);
  if(missing.length) errors.push(`shared public contracts missing from deploy: ${missing.join(', ')}`);
}else{
  const sourceExpected=['lead-admin-data-model.v1.schema.json','lead-admin-export.v1.schema.json','lead-admin-ingestion.v1.json','lead-admin-kpi.v1.json','lead-admin-manifest.v1.json','lead-admin-ui.v1.json','lead-conversion.v1.schema.json','lead-lifecycle.v1.json'];
  const missing=sourceExpected.filter(n=>!contractNames.includes(n));
  if(missing.length) errors.push(`source lineage contracts missing: ${missing.join(', ')}`);
}

let sriStyles=0,sriScripts=0;
if(isDist){
  const html=[];
  async function walk(d){for(const e of await readdir(d,{withFileTypes:true})){const p=path.join(d,e.name);if(e.isDirectory())await walk(p);else if(e.isFile()&&e.name.endsWith('.html'))html.push(p)}}
  await walk(target);
  for(const f of html){
    const t=await readFile(f,'utf8');
    const redirect=/http-equiv=["']refresh["']/i.test(t)&&/noindex/i.test(t);
    if(redirect) continue;
    for(const m of t.matchAll(/<link\b[^>]*>/gi)){
      const tag=m[0]; if(!/\brel=["'][^"']*stylesheet[^"']*["']/i.test(tag)) continue;
      const href=attr(tag,'href'), integ=attr(tag,'integrity'); const p=local(f,href); if(!p) continue;
      if(!integ){errors.push(`stylesheet missing SRI: ${path.relative(target,f)} -> ${href}`);continue}
      try{if(integ!==await digest(p))errors.push(`stylesheet SRI mismatch: ${path.relative(target,f)} -> ${href}`);else sriStyles++}catch{errors.push(`stylesheet missing for SRI: ${path.relative(target,f)} -> ${href}`)}
    }
    for(const m of t.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>\s*<\/script>/gi)){
      const tag=m[0],src=m[1],integ=attr(tag,'integrity'); const p=local(f,src); if(!p) continue;
      if(!integ){errors.push(`script missing SRI: ${path.relative(target,f)} -> ${src}`);continue}
      try{if(integ!==await digest(p))errors.push(`script SRI mismatch: ${path.relative(target,f)} -> ${src}`);else sriScripts++}catch{errors.push(`script missing for SRI: ${path.relative(target,f)} -> ${src}`)}
    }
  }
}
const result={version:'v434',target:isDist?'dist-public':'source',public_contracts:isDist?contractNames:[...allowedContracts].sort(),source_contract_count:contractNames.length,sri_stylesheets_verified:sriStyles,sri_scripts_verified:sriScripts,errors};
console.log(JSON.stringify(result,null,2)); if(errors.length)process.exit(1);
