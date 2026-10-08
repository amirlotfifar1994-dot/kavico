/* Kavico v352 — localized non-PII post-submit context. */
(function(){'use strict';
  function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn,{once:true});else fn();}
  function language(){return (document.documentElement.lang||'fa').toLowerCase().indexOf('en')===0?'en':'fa';}
  var dict={
    fa:{
      service:{unsure:'نیاز به راهنمایی','pvd-industrial':'PVD صنعتی','pvd-decorative':'PVD تزئینی / لوکس','pvd-faucets':'PVD شیرآلات و یراق','nickel-chrome':'آبکاری نیکل‌کروم',polishing:'پولیش و پرداخت سطح'},
      part:{unknown:'نامشخص / نیاز به بررسی',flat:'تخت / ورقی / صفحه‌ای',cylindrical:'استوانه‌ای / دورانی','faucet-hardware':'شیرآلات / یراق / قطعه مونتاژی',complex:'هندسه پیچیده / حفره‌دار',ceramic:'چینی / سرامیک لعاب‌دار',other:'سایر'},
      stage:{evaluation:'بررسی امکان اجرا',prototype:'نمونه‌سازی / نمونه رنگ',quote:'استعلام برای تولید',repeat:'پروژه تکراری / تیراژ مجدد'},
      route:{'service-discovery':'نیاز به انتخاب خدمت','repeat-production':'بررسی تیراژ تکراری','sample-validation':'نمونه‌سازی / تأیید نمونه','production-quote':'بررسی برای تولید و استعلام','engineering-review':'بررسی فنی عملکرد','technical-feasibility':'امکان‌سنجی فنی'},
      quality:{high:'کامل برای ارجاع فنی',mid:'مناسب برای بررسی اولیه',low:'نیازمند تکمیل در صورت درخواست کارشناس'},source:{followup:'پیگیری Brief قبلی',service:'صفحه خدمت',article:'مقاله فنی',guide:'راهنمای فنی',compare:'صفحه مقایسه',pricing:'برآورد اولیه',portfolio:'نمونه‌کار',local:'صفحه منطقه‌ای',general:'وب‌سایت'},preferred:{phone:'تماس تلفنی',whatsapp:'واتساپ',email:'ایمیل'}
    },
    en:{
      service:{unsure:'Needs service guidance','pvd-industrial':'Industrial PVD','pvd-decorative':'Decorative / luxury PVD','pvd-faucets':'PVD for faucets & hardware','nickel-chrome':'Nickel-chrome plating',polishing:'Polishing & surface finishing'},
      part:{unknown:'Unknown / needs review',flat:'Flat / sheet / plate',cylindrical:'Cylindrical / rotational','faucet-hardware':'Faucet / hardware / assembly part',complex:'Complex / recessed geometry',ceramic:'Glazed ceramic / sanitaryware',other:'Other'},
      stage:{evaluation:'Feasibility review',prototype:'Sample / finish validation',quote:'Production quotation',repeat:'Repeat project / production batch'},
      route:{'service-discovery':'Service selection','repeat-production':'Repeat-production review','sample-validation':'Sample validation review','production-quote':'Production quote review','engineering-review':'Engineering performance review','technical-feasibility':'Technical feasibility review'},
      quality:{high:'Ready for technical routing',mid:'Suitable for initial review',low:'May need follow-up details'},source:{followup:'previous brief follow-up',service:'service page',article:'technical article',guide:'technical guide',compare:'comparison page',pricing:'initial estimate',portfolio:'portfolio',local:'local service page',general:'website'},preferred:{phone:'Phone call',whatsapp:'WhatsApp',email:'Email'}
    }
  };
  ready(function(){
    var box=document.querySelector('[data-v346-brief-context]'), routeBox=document.querySelector('[data-v347-route-box]');
    var ctx=null; try{ctx=JSON.parse(sessionStorage.getItem('kavico:lastBriefContext')||'null');if(!ctx||typeof ctx!=='object'){var receipt=JSON.parse(sessionStorage.getItem('kavico:lastBriefReceipt')||'null');if(receipt&&typeof receipt==='object'&&Date.now()-Number(receipt._ts||0)<14400000)ctx=receipt;}}catch(_e){}
    if(!ctx||typeof ctx!=='object'){if(box)box.setAttribute('hidden','');if(routeBox)routeBox.setAttribute('hidden','');return;}
    function put(scope,sel,val){var el=scope&&scope.querySelector(sel);if(el)el.textContent=String(val||'—');}
    function label(group,code){var d=dict[language()]||dict.fa;return (d[group]&&d[group][code])||code||'—';}
    function render(){
      if(box){put(box,'[data-v346-context-service]',label('service',ctx.service));put(box,'[data-v352-context-part]',label('part',ctx.part));put(box,'[data-v346-context-stage]',label('stage',ctx.stage));put(box,'[data-v346-context-quality]',label('quality',ctx.quality));put(box,'[data-v396-context-source]',label('source',ctx.sourceGroup||'general'));put(box,'[data-v396-context-preferred]',label('preferred',ctx.preferred||'phone'));box.removeAttribute('hidden');}
      if(routeBox){put(routeBox,'[data-v347-route-value]',label('route',ctx.route));routeBox.removeAttribute('hidden');}
    }
    render(); window.addEventListener('kavico:langchange',render); window.addEventListener('kavico:lang-changed',render);
    window.KAVICO_V371_THANKS_CTX=ctx;
    try{var safe={service:String(ctx.service||'unsure').slice(0,32),part:String(ctx.part||'unknown').slice(0,32),stage:String(ctx.stage||'').slice(0,32),quality:String(ctx.quality||'mid').slice(0,16),quality371:String(ctx.quality371||'').slice(0,16),route:String(ctx.route||'').slice(0,48),source:String(ctx.source||'').slice(0,120),sourceGroup:String(ctx.sourceGroup||'general').slice(0,24),preferred:String(ctx.preferred||'phone').slice(0,24),readiness:String(ctx.readiness||'').slice(0,24),followupPriority:String(ctx.followupPriority||'').slice(0,8),followupLane:String(ctx.followupLane||'').slice(0,48),qualificationBasis:String(ctx.qualificationBasis||'').slice(0,48),qualificationScore:String(ctx.qualificationScore||'').slice(0,8),leadReference:String(ctx.leadReference||'').slice(0,24),eventId:String(ctx.eventId||'').slice(0,80),contractVersion:String(ctx.contractVersion||'').slice(0,80),eventName:String(ctx.eventName||'').slice(0,80),eventOccurredAt:String(ctx.eventOccurredAt||'').slice(0,40),adminContractVersion:String(ctx.adminContractVersion||'').slice(0,80),adminMappingVersion:String(ctx.adminMappingVersion||'').slice(0,80),lifecycleStatus:String(ctx.lifecycleStatus||'submitted').slice(0,32),followupState:String(ctx.followupState||'queued').slice(0,32),assignmentQueue:String(ctx.assignmentQueue||'').slice(0,48),slaPolicyKey:String(ctx.slaPolicyKey||'').slice(0,48),nextAction:String(ctx.nextAction||'').slice(0,64),gaps:Array.isArray(ctx.gaps)?ctx.gaps.slice(0,5):[],_ts:Date.now()};sessionStorage.setItem('kavico:lastBriefReceipt',JSON.stringify(safe));sessionStorage.removeItem('kavico:lastBriefContext');}catch(_e){}
  });
})();



/* Kavico v371 — non-PII post-submit next-step guidance. */
(function(){'use strict';
  function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn,{once:true});else fn();}
  function en(){return (document.documentElement.lang||'fa').toLowerCase().indexOf('en')===0;}
  var gaps={fa:{material:'جنس قطعه',dimensions:'ابعاد تقریبی',quantity:'تیراژ',finish:'فینیش هدف',surface_state:'وضعیت فعلی سطح',part_type:'نوع/هندسه قطعه',project_priority:'اولویت پروژه',details:'شرح دقیق‌تر پروژه'},en:{material:'part material',dimensions:'approximate dimensions',quantity:'batch size',finish:'target finish',surface_state:'current surface state',part_type:'part geometry',project_priority:'project priority',details:'more project detail'}};
  var routeHint={fa:{'service-discovery':'اگر هنوز فرآیند مشخص نیست، عکس قطعه همراه با جنس، کاربرد و وضعیت فعلی سطح بیشترین کمک را می‌کند.','sample-validation':'اگر نمونه رنگ یا فینیش مرجع دارید، همراه عکس قطعه ارسال کنید تا مسیر نمونه‌سازی دقیق‌تر شود.','production-quote':'برای بررسی استعلام تولید، تیراژ، ابعاد و فینیش هدف را آماده نگه دارید.','repeat-production':'برای تیراژ تکراری، مرجع سفارش یا نمونه قبلی و هر تغییر جدید را مشخص کنید.','engineering-review':'شرایط کارکرد، ناحیه تماس/سایش و معیار پذیرش عملکردی را آماده نگه دارید.','technical-feasibility':'عکس چندزاویه و مشخصات زیرکار معمولاً قدم بعدی بررسی را سریع‌تر می‌کند.'},en:{'service-discovery':'If the process is still unclear, photos plus material, use case and current surface state are the most useful next inputs.','sample-validation':'If you have a color or finish reference, send it with part photos to sharpen the sampling route.','production-quote':'For production quotation review, keep batch size, dimensions and target finish ready.','repeat-production':'For repeat production, identify the previous order/reference sample and any changes to the new batch.','engineering-review':'Keep service conditions, contact/wear zones and the performance acceptance criterion ready.','technical-feasibility':'Multi-angle photos and substrate details usually speed up the next feasibility step.'}};
  ready(function(){var box=document.querySelector('[data-v371-followup]');if(!box)return;var ctx=window.KAVICO_V371_THANKS_CTX||null;if(!ctx||typeof ctx!=='object'){box.hidden=true;return;}var title=box.querySelector('[data-v371-followup-title]'),copy=box.querySelector('[data-v371-followup-copy]'),list=box.querySelector('[data-v371-followup-gaps]'),chip=box.querySelector('[data-v371-followup-chip]');
    function render(){var isen=en(),q=String(ctx.quality371||ctx.quality||'mid'),arr=Array.isArray(ctx.gaps)?ctx.gaps:[],labs=gaps[isen?'en':'fa'];if(chip)chip.textContent=q==='high'?(isen?'Well-prepared brief':'Brief آماده بررسی'):q==='mid'?(isen?'Ready for initial review':'مناسب بررسی اولیه'):(isen?'Initial review — details may be requested':'بررسی اولیه — احتمال تکمیل اطلاعات');if(title)title.textContent=isen?'Your most useful next step':'مفیدترین قدم بعدی برای پروژه شما';var base=(routeHint[isen?'en':'fa']||{})[String(ctx.route||'')]||'';if(copy)copy.textContent=base;if(list){list.replaceChildren();arr.slice(0,3).forEach(function(code){var li=document.createElement('li');li.textContent=labs[code]||code;list.appendChild(li);});list.hidden=!arr.length;}box.hidden=false;}
    render();window.addEventListener('kavico:langchange',render);window.addEventListener('kavico:lang-changed',render);
  });
})();


/* KAVICO v396 — non-PII receipt handoff for WhatsApp and follow-up brief. */
(function(){'use strict';
  function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn,{once:true});else fn();}
  function en(){return (document.documentElement.lang||'fa').toLowerCase().indexOf('en')===0;}
  var faService={unsure:'نیاز به راهنمایی','pvd-industrial':'PVD صنعتی','pvd-decorative':'PVD تزئینی / لوکس','pvd-faucets':'PVD شیرآلات و یراق','nickel-chrome':'آبکاری نیکل‌کروم',polishing:'پولیش و پرداخت سطح'};
  var enService={unsure:'service guidance','pvd-industrial':'industrial PVD','pvd-decorative':'decorative PVD','pvd-faucets':'PVD for faucets / hardware','nickel-chrome':'nickel-chrome plating',polishing:'polishing / surface finishing'};
  var faStage={evaluation:'امکان‌سنجی',prototype:'نمونه‌سازی / نمونه رنگ',quote:'استعلام تولید',repeat:'تیراژ تکراری'};
  var enStage={evaluation:'feasibility review',prototype:'sample / finish validation',quote:'production quotation',repeat:'repeat production'};
  ready(function(){var ctx=window.KAVICO_V371_THANKS_CTX||null;if(!ctx||typeof ctx!=='object')return;var isEn=en(),service=String(ctx.service||'unsure'),stage=String(ctx.stage||''),route=String(ctx.route||''),gaps=Array.isArray(ctx.gaps)?ctx.gaps.slice(0,3):[];var msg;if(isEn){msg='Hello, I have submitted a KAVICO project brief for '+(enService[service]||'technical review')+'.';if(stage)msg+=' Project stage: '+(enStage[stage]||stage)+'.';msg+=' I am sending related photos/reference material to complete the review.';}else{msg='سلام، Brief پروژه '+(faService[service]||'برای بررسی فنی')+' را در سایت کاویان ارسال کردم.';if(stage)msg+=' مرحله پروژه: '+(faStage[stage]||stage)+'.';msg+=' برای تکمیل بررسی، عکس یا مرجع مرتبط را ارسال می‌کنم.';}var wa='https://wa.me/989125460799?text='+encodeURIComponent(msg);document.querySelectorAll('[data-v396-thanks-wa],.project-brief__success a[href*="wa.me/989125460799"]').forEach(function(a){a.href=wa;});
    var follow=document.querySelector('[data-v396-thanks-brief]');if(follow){var base=isEn?'/en/contact/':'/contact/';var q=new URLSearchParams();q.set('src','thanks-followup');if(service)q.set('service',service);if(/^(evaluation|prototype|quote|repeat)$/.test(stage))q.set('stage',stage);follow.href=base+'?'+q.toString()+'#project-brief';follow.textContent=isEn?'Send an additional / updated brief':'ارسال Brief تکمیلی / اصلاح‌شده';}
  });
})();

/* KAVICO v397 — show routing readiness while keeping internal priority codes out of customer-facing UI. */
(function(){'use strict';
  function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn,{once:true});else fn();}
  function isEn(){return (document.documentElement.lang||'fa').toLowerCase().indexOf('en')===0;}
  var labels={fa:{ready:'آماده ارجاع فنی',reviewable:'قابل بررسی اولیه',discovery:'نیازمند تکمیل یا انتخاب مسیر'},en:{ready:'Ready for technical routing',reviewable:'Ready for initial review',discovery:'Needs more detail or route selection'}};
  ready(function(){
    var ctx=window.KAVICO_V371_THANKS_CTX||null;if(!ctx||typeof ctx!=='object')return;
    var el=document.querySelector('[data-v397-context-readiness]');
    function render(){if(el){var lang=isEn()?'en':'fa',code=String(ctx.readiness||'reviewable');el.textContent=(labels[lang]&&labels[lang][code])||labels[lang].reviewable;}}
    render();window.addEventListener('kavico:langchange',render);window.addEventListener('kavico:lang-changed',render);
    try{var r=JSON.parse(sessionStorage.getItem('kavico:lastBriefReceipt')||'null');if(r&&typeof r==='object'){r.readiness=String(ctx.readiness||'').slice(0,24);r.followupPriority=String(ctx.followupPriority||'').slice(0,8);r.followupLane=String(ctx.followupLane||'').slice(0,48);r.qualificationBasis=String(ctx.qualificationBasis||'').slice(0,48);sessionStorage.setItem('kavico:lastBriefReceipt',JSON.stringify(r));}}catch(_e){}
  });
})();



/* KAVICO v398 — customer-safe request reference and contract handoff. */
(function(){'use strict';
  function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn,{once:true});else fn();}
  function validRef(v){return /^KVC-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}$/.test(String(v||''));}
  ready(function(){
    var ctx=window.KAVICO_V371_THANKS_CTX||null;if(!ctx||typeof ctx!=='object')return;var canonical=(document.querySelector('link[rel=\"canonical\"]')||{}).href||'https://kavico.ir/';
    var ref=String(ctx.leadReference||'');if(!validRef(ref)){try{var r=JSON.parse(sessionStorage.getItem('kavico:lastBriefReceipt')||'null');if(r&&validRef(r.leadReference))ref=r.leadReference;}catch(_e){}}
    if(!validRef(ref))return;
    document.querySelectorAll('[data-v398-context-reference]').forEach(function(el){el.textContent=ref;});
    document.querySelectorAll('[data-v396-thanks-wa]').forEach(function(a){try{var u=new URL(a.href);var text=u.searchParams.get('text')||'';var isEn=(document.documentElement.lang||'fa').toLowerCase().indexOf('en')===0;var line=isEn?'Request reference: '+ref:'شناسه درخواست: '+ref;if(text.indexOf(ref)<0)u.searchParams.set('text',text+'\n'+line);a.href=u.toString();}catch(_e){}});
    document.querySelectorAll('[data-v396-thanks-brief]').forEach(function(a){try{var u=new URL(a.getAttribute('href')||a.href,canonical);u.searchParams.set('ref',ref);a.href=u.pathname+'?'+u.searchParams.toString()+u.hash;}catch(_e){}});
    try{var r=JSON.parse(sessionStorage.getItem('kavico:lastBriefReceipt')||'null');if(!r||typeof r!=='object')r={};r.leadReference=ref;r.eventId=String(ctx.eventId||r.eventId||'').slice(0,80);r.contractVersion=String(ctx.contractVersion||r.contractVersion||'kavico.lead-conversion.v1').slice(0,80);r.eventName=String(ctx.eventName||r.eventName||'project_brief_submitted').slice(0,80);r.eventOccurredAt=String(ctx.eventOccurredAt||r.eventOccurredAt||'').slice(0,40);r.qualificationScore=String(ctx.qualificationScore||r.qualificationScore||'').slice(0,8);r._ts=Date.now();sessionStorage.setItem('kavico:lastBriefReceipt',JSON.stringify(r));}catch(_e){}
  });
})();


/* KAVICO v399 — customer-safe lifecycle status. Internal queue/priority/SLA codes remain hidden. */
(function(){'use strict';
  function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn,{once:true});else fn();}
  function isEn(){return (document.documentElement.lang||'fa').toLowerCase().indexOf('en')===0;}
  var labels={fa:{submitted:'ثبت شده برای بررسی اولیه',triaged:'در حال بررسی اولیه','awaiting-information':'منتظر اطلاعات تکمیلی','technical-review':'در بررسی فنی','commercial-review':'در بررسی تجاری','sample-validation':'در بررسی نمونه','repeat-production-review':'در بررسی تیراژ تکراری'},en:{submitted:'Submitted for initial review',triaged:'In initial review','awaiting-information':'Waiting for additional information','technical-review':'In technical review','commercial-review':'In commercial review','sample-validation':'In sample review','repeat-production-review':'In repeat-production review'}};
  ready(function(){var ctx=window.KAVICO_V371_THANKS_CTX||null;if(!ctx||typeof ctx!=='object')return;var el=document.querySelector('[data-v399-context-lifecycle]');if(!el)return;
    function render(){var lang=isEn()?'en':'fa',code=String(ctx.lifecycleStatus||'submitted');el.textContent=(labels[lang]&&labels[lang][code])||(lang==='en'?'Submitted for initial review':'ثبت شده برای بررسی اولیه');}
    render();window.addEventListener('kavico:langchange',render);window.addEventListener('kavico:lang-changed',render);
    try{var r=JSON.parse(sessionStorage.getItem('kavico:lastBriefReceipt')||'null');if(r&&typeof r==='object'){r.adminContractVersion=String(ctx.adminContractVersion||r.adminContractVersion||'kavico.lead-admin-export.v1').slice(0,80);r.adminMappingVersion=String(ctx.adminMappingVersion||r.adminMappingVersion||'kavico.lead-lifecycle.v1').slice(0,80);r.lifecycleStatus=String(ctx.lifecycleStatus||r.lifecycleStatus||'submitted').slice(0,32);r.followupState=String(ctx.followupState||r.followupState||'queued').slice(0,32);r.assignmentQueue=String(ctx.assignmentQueue||r.assignmentQueue||'').slice(0,48);r.slaPolicyKey=String(ctx.slaPolicyKey||r.slaPolicyKey||'').slice(0,48);r.nextAction=String(ctx.nextAction||r.nextAction||'').slice(0,64);sessionStorage.setItem('kavico:lastBriefReceipt',JSON.stringify(r));}}catch(_e){}
  });
})();
