import crypto from 'node:crypto';
import { allowedReturnTo,verifyBrowserOrigin,clientIp,fingerprint,payloadFromEntries,signedHeaders } from './_lead-bridge-core.mjs';

const html=(status,message)=>new Response(`<!doctype html><meta charset="utf-8"><meta name="robots" content="noindex"><title>KAVICO</title><p>${message}</p>`,{status,headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff','referrer-policy':'no-referrer'}});
export default async function handler(request){
  if(request.method!=='POST')return html(405,'Method not allowed.');
  const secret=process.env.KAVICO_INGEST_HMAC_SECRET||'',fpSecret=process.env.KAVICO_BRIDGE_FINGERPRINT_SECRET||secret,adminUrl=process.env.KAVICO_ADMIN_INGEST_URL||'';
  if(secret.length<32||fpSecret.length<32||!adminUrl)return html(503,'Submission service is temporarily unavailable.');
  const originCheck=verifyBrowserOrigin(request,process.env.KAVICO_PUBLIC_ALLOWED_ORIGINS||'');if(!originCheck.ok)return html(403,'Submission origin is not allowed.');
  let form;try{form=await request.formData()}catch{return html(400,'Invalid form submission.');}
  const entries=[...form.entries()];const returnTo=allowedReturnTo(form.get('bridge_return_to'));
  const requestId=`br_${crypto.randomUUID()}`,ip=clientIp(request),ua=String(request.headers.get('user-agent')||'');
  const payload=payloadFromEntries(entries,{sourceOrigin:originCheck.origin||new URL(request.url).origin,networkFingerprint:fingerprint(ip,fpSecret),userAgentFingerprint:fingerprint(ua,fpSecret),requestId});
  const raw=Buffer.from(JSON.stringify(payload));
  let target;try{target=new URL(adminUrl)}catch{return html(503,'Submission service is temporarily unavailable.');}
  if(target.protocol!=='https:'&&!/^(?:localhost|127\.0\.0\.1)$/.test(target.hostname))return html(503,'Submission service is temporarily unavailable.');
  let response;try{response=await fetch(target,{method:'POST',headers:signedHeaders(raw,secret),body:raw,redirect:'manual',signal:AbortSignal.timeout(8000)})}catch{return html(503,'Submission service is temporarily unavailable.');}
  if([201,202,409].includes(response.status))return Response.redirect(new URL(returnTo,request.url),303);
  return html(response.status>=500?503:400,'Submission could not be accepted. Please try again.');
}
