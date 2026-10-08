import crypto from 'node:crypto';
export const allowedReturnTo=v=>String(v||'').startsWith('/en/')?'/en/contact/thanks/':'/contact/thanks/';
export function parseOrigins(v){return String(v||'').split(',').map(x=>x.trim().replace(/\/+$/,'')).filter(Boolean)}
export function requestOrigin(request){const o=request.headers.get('origin');if(o){try{return new URL(o).origin}catch{}}const r=request.headers.get('referer');if(r){try{return new URL(r).origin}catch{}}return ''}
export function verifyBrowserOrigin(request,configured=''){
  const allowed=parseOrigins(configured),origin=requestOrigin(request),fetchSite=String(request.headers.get('sec-fetch-site')||'').toLowerCase(),self=new URL(request.url).origin;
  const list=allowed.length?allowed:[self];
  if(origin)return {ok:list.includes(origin.replace(/\/+$/,'')),origin};
  return {ok:fetchSite==='same-origin'||fetchSite==='same-site',origin:''};
}
export function clientIp(request){const cf=request.headers.get('cf-connecting-ip'),nf=request.headers.get('x-nf-client-connection-ip'),xf=request.headers.get('x-forwarded-for');return String(cf||nf||(xf?xf.split(',')[0]:'')||'').trim()}
export function fingerprint(value,secret){if(!value||!secret)return '';return crypto.createHmac('sha256',secret).update(String(value)).digest('hex')}
export function payloadFromEntries(entries,{sourceOrigin='',networkFingerprint='',userAgentFingerprint='',requestId='',now=new Date().toISOString()}={}){
  const payload={};for(const [k,v] of entries){if(typeof v==='string')payload[k]=v}
  payload.bridge_source_origin=sourceOrigin;payload.network_fingerprint=networkFingerprint;payload.user_agent_fingerprint=userAgentFingerprint;payload.bridge_request_id=requestId;payload.bridge_received_at=now;
  if(!payload.event_id)payload.event_id=`evt_pub_${crypto.randomUUID()}`;
  if(!payload.lead_reference)payload.lead_reference=`KVC-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
  if(!payload.event_occurred_at)payload.event_occurred_at=now;
  return payload;
}
export function signedHeaders(raw,secret,{timestamp=Math.floor(Date.now()/1000),nonce=crypto.randomBytes(18).toString('base64url')}={}){const sig=crypto.createHmac('sha256',secret).update(`${timestamp}.${nonce}.`).update(raw).digest('hex');return {'content-type':'application/json','x-kavico-timestamp':String(timestamp),'x-kavico-nonce':nonce,'x-kavico-signature':`v1=${sig}`}}
