import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { webcrypto } from 'node:crypto';

const full=await readFile(new URL('../assets/js/bundles/v432-public-runtime.v432.js',import.meta.url),'utf8');
const marker=';/* KAVICO v432 — public form abuse guard.';
const i=full.indexOf(marker);assert.ok(i>=0,'v432 form guard marker missing');
const code=full.slice(i);
function make(honeypot=''){
  const handlers={}; const globalHandlers={};
  const fields={};
  for(const n of ['form_guard_version','form_rendered_at','form_elapsed_ms','form_nonce','abuse_score','abuse_signals','company','details','name','phone'])fields[n]={value:''};
  fields.company.value=honeypot; fields.details.value='valid project details for testing'; fields.name.value='Test User'; fields.phone.value='09120001111';
  const submit={disabled:false,textContent:'Send',dataset:{},attrs:{},setAttribute(k,v){this.attrs[k]=v},removeAttribute(k){delete this.attrs[k]}};
  const form={elements:fields,dataset:{},addEventListener(k,fn){handlers[k]=fn},querySelector(sel){return sel==='button[type="submit"]'?submit:null}};
  const status={textContent:''};
  const document={readyState:'complete',documentElement:{lang:'en'},querySelector(sel){return sel==='form[name="project-brief"]'?form:null},getElementById(id){return id==='v343-form-status'?status:null},addEventListener(){}};
  const context={document,crypto:webcrypto,Date,Math,console,setTimeout,clearTimeout,CustomEvent:class{},addEventListener(k,fn){globalHandlers[k]=fn}};
  context.window=context;
  vm.createContext(context);vm.runInContext(code,context,{filename:'v432-public-runtime.v432.js'});
  return {handlers,globalHandlers,fields,form,submit,status};
}
{
  const h=make(''); assert.equal(h.fields.form_guard_version.value,'v432'); assert.ok(h.fields.form_nonce.value.length>=16);
  let prevented=0; h.handlers.submit({preventDefault(){prevented++}}); assert.equal(prevented,0,'first valid submit should proceed'); assert.equal(h.submit.disabled,true); assert.equal(h.form.dataset.v432Submitting,'true');
  h.handlers.submit({preventDefault(){prevented++}}); assert.equal(prevented,1,'second submit must be blocked'); assert.match(h.status.textContent,/already being sent/i);
}
{
  const h=make('bot-filled'); let prevented=0; h.handlers.submit({preventDefault(){prevented++}}); assert.equal(prevented,1,'honeypot submit must be blocked'); assert.equal(h.submit.disabled,false); assert.equal(h.fields.abuse_score.value,'100'); assert.match(h.fields.abuse_signals.value,/honeypot/);
}
console.log(JSON.stringify({version:'v432',first_submit:'allowed_then_locked',double_submit:'blocked',honeypot:'blocked',guard_fields:'initialized',ok:true},null,2));
