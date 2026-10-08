import assert from 'node:assert/strict';import crypto from 'node:crypto';
import {allowedReturnTo,verifyBrowserOrigin,fingerprint,payloadFromEntries,signedHeaders} from '../netlify/functions/_lead-bridge-core.mjs';
const req=(origin='https://kavico.example')=>new Request('https://kavico.example/.netlify/functions/lead-bridge',{method:'POST',headers:{origin,'sec-fetch-site':'same-origin'}});
assert.equal(verifyBrowserOrigin(req(),'https://kavico.example').ok,true);assert.equal(verifyBrowserOrigin(req('https://evil.example'),'https://kavico.example').ok,false);
assert.equal(allowedReturnTo('/en/contact/thanks/'),'/en/contact/thanks/');assert.equal(allowedReturnTo('https://evil.example/'),'/contact/thanks/');
const secret='s'.repeat(40),fp=fingerprint('203.0.113.9',secret);assert.match(fp,/^[a-f0-9]{64}$/);
const payload=payloadFromEntries([['name','Test'],['phone','09120000000'],['details','bridge test'],['project_stage','quote']],{sourceOrigin:'https://kavico.example',networkFingerprint:fp,requestId:'br_test',now:'2026-08-19T00:00:00.000Z'});assert.ok(payload.event_id&&payload.lead_reference);assert.equal(payload.bridge_source_origin,'https://kavico.example');
const raw=Buffer.from(JSON.stringify(payload)),h=signedHeaders(raw,secret,{timestamp:1700000000,nonce:'abcdefghijklmnop'});const expected='v1='+crypto.createHmac('sha256',secret).update('1700000000.abcdefghijklmnop.').update(raw).digest('hex');assert.equal(h['x-kavico-signature'],expected);
console.log(JSON.stringify({ok:true,version:'v433',origin:true,fingerprint:true,hmac:true,return_path:true}));
