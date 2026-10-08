/* Kavico v345 — lazy map embed, only bundled on pages with #map. */
(function(){'use strict';
  function start(){var el=document.getElementById('map');if(!el||el.dataset.mapInit==='1')return;el.dataset.mapInit='1';var lat=(el.dataset.lat||'35.692132').trim(),lng=(el.dataset.lng||'50.997906').trim();var iframe=document.createElement('iframe');iframe.title=document.documentElement.lang==='en'?'Kavico workshop map':'نقشه کارگاه کاویان';iframe.loading='lazy';iframe.referrerPolicy='no-referrer-when-downgrade';iframe.className='kavico-map-iframe';iframe.allowFullscreen=true;iframe.src='https://www.google.com/maps?q='+encodeURIComponent(lat+','+lng)+'&output=embed';el.replaceChildren(iframe);el.classList.add('map-embed-ready');}
  function init(){var el=document.getElementById('map');if(!el)return;if('IntersectionObserver'in window){var io=new IntersectionObserver(function(es){if(es.some(function(e){return e.isIntersecting;})){io.disconnect();start();}},{rootMargin:'300px 0px',threshold:.01});io.observe(el);}else setTimeout(start,700);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();


/* Kavico v352 — service + part-aware brief with non-blocking guidance and non-PII routing. */
(function(){'use strict';
  function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn,{once:true});else fn();}
  function lng(){return document.documentElement.lang==='en'?'en':'fa';}
  var labels={fa:{low:'برای بررسی دقیق‌تر، چند مشخصه دیگر اضافه کنید.',mid:'برای بررسی اولیه اطلاعات خوبی دارید.',high:'Brief شما برای ارجاع فنی کامل است.',need:'تکمیل پیشنهادی: '},en:{low:'Add a few more project details for a sharper review.',mid:'You have enough detail for an initial review.',high:'Your brief is well prepared for technical routing.',need:'Recommended next: '}};
  var fieldNames={fa:{material:'جنس قطعه',dimensions:'ابعاد',quantity:'تیراژ',finish:'فینیش هدف',city:'شهر',service:'خدمت مشخص'},en:{material:'material',dimensions:'dimensions',quantity:'quantity',finish:'target finish',city:'city',service:'specific service'}};
  var profiles={
    unsure:{focus:'substrate+use+surface+target',copy:{fa:'اگر هنوز خدمت را نمی‌دانید، جنس قطعه، کاربرد، وضعیت سطح و نتیجه مورد انتظار را بنویسید.',en:'If you are unsure about the service, provide part material, use case, surface condition and the result you need.'},prompts:{fa:['جنس و کاربرد واقعی قطعه','وضعیت فعلی سطح یا پوشش قبلی','نتیجه‌ای که باید در پایان پذیرفته شود'],en:['Actual part material and use case','Current surface or previous coating','The result that must be accepted at the end']},placeholder:{fa:'کاربرد قطعه، جنس و وضعیت سطح فعلی، نتیجه مورد انتظار و هر محدودیت مهم را بنویسید.',en:'Describe part use, material/current surface, target outcome and any important constraint.'}},
    'pvd-industrial':{focus:'substrate+service-condition+masking+acceptance',copy:{fa:'برای PVD صنعتی: جنس/آلیاژ دقیق، شرایط کار، ناحیه‌های ماسک یا تلرانسی و معیار عملکرد یا آزمون مهم‌اند.',en:'For industrial PVD: exact substrate/alloy, service conditions, masked/tolerance areas and the important performance/test criterion matter most.'},prompts:{fa:['آلیاژ/زیرکار و شرایط کارکرد','نواحی ماسک، تلرانس یا تماس مکانیکی','معیار آزمون یا پذیرش عملکردی'],en:['Alloy/substrate and service conditions','Masked, tolerance or mechanical-contact areas','Performance test or acceptance criterion']},placeholder:{fa:'آلیاژ، شرایط کار، نواحی ماسک/تلرانس و معیار آزمون یا پذیرش را توضیح دهید.',en:'Describe alloy, service conditions, masked/tolerance areas and the test or acceptance criterion.'}},
    'pvd-decorative':{focus:'substrate+finish-reference+visible-surface+batch',copy:{fa:'برای PVD تزئینی: جنس و زیرسازی، نمونه مرجع رنگ/فینیش، سطح قابل‌دید و تیراژ را مشخص کنید.',en:'For decorative PVD: substrate/preparation, finish reference, visible surfaces and batch size are the key inputs.'},prompts:{fa:['مرجع رنگ/فینیش و سطح قابل‌دید','زیرکار و وضعیت پولیش/پوشش قبلی','تیراژ و میزان حساسیت به اختلاف رنگ'],en:['Color/finish reference and visible surface','Substrate and polishing/previous coating state','Batch size and sensitivity to color variation']},placeholder:{fa:'مرجع رنگ/فینیش، سطح قابل‌دید، وضعیت زیرسازی و حساسیت به اختلاف رنگ را بنویسید.',en:'Describe finish reference, visible surface, substrate preparation and sensitivity to color variation.'}},
    'pvd-faucets':{focus:'base-metal+sealing+finish-reference+cleaner',copy:{fa:'برای شیرآلات و یراق: فلز پایه و پوشش قبلی، رزوه/سطوح آب‌بندی، مرجع فینیش و شرایط شوینده/رطوبت مهم‌اند.',en:'For faucets and hardware: base metal/previous coating, threads/sealing areas, finish reference and cleaner/moisture exposure matter.'},prompts:{fa:['فلز پایه و پوشش قبلی','رزوه، آب‌بندی و نواحی غیرقابل پوشش','مرجع فینیش و شرایط رطوبت/شوینده'],en:['Base metal and previous coating','Threads, sealing and no-coat areas','Finish reference and moisture/cleaner exposure']},placeholder:{fa:'فلز پایه، پوشش قبلی، رزوه/آب‌بندی، مرجع فینیش و شرایط رطوبت یا شوینده را توضیح دهید.',en:'Describe base metal, previous coating, threads/sealing, finish reference and moisture/cleaner exposure.'}},
    'nickel-chrome':{focus:'base-metal+corrosion+previous-plating+surface-target',copy:{fa:'برای نیکل‌کروم: فلز پایه، خوردگی یا آبکاری قبلی، کیفیت سطح هدف و ابعاد/هندسه قطعه را مشخص کنید.',en:'For nickel-chrome: base metal, corrosion/previous plating, target surface quality and part geometry/dimensions are useful.'},prompts:{fa:['فلز پایه، خوردگی یا لایه قبلی','کیفیت سطح و براقیت هدف','هندسه، حفره‌ها و نقاط حساس'],en:['Base metal, corrosion or prior layer','Target surface quality and gloss','Geometry, recesses and sensitive areas']},placeholder:{fa:'فلز پایه، خوردگی/آبکاری قبلی، براقیت هدف و نقاط هندسی حساس را توضیح دهید.',en:'Describe base metal, corrosion/prior plating, target gloss and geometry-sensitive areas.'}},
    polishing:{focus:'material+defect-depth+target-finish+sensitive-edge',copy:{fa:'برای پولیش: جنس، عمق و محل عیب، فینیش هدف، لبه‌ها/نوشته‌های حساس و محدودیت برداشت ماده مهم‌اند.',en:'For polishing: material, defect depth/location, target finish, sensitive edges/markings and material-removal limits matter.'},prompts:{fa:['جنس و عمق/محل عیب سطح','فینیش هدف: آینه‌ای، ساتن یا آماده‌سازی','لبه، نوشته یا تلرانس حساس به برداشت ماده'],en:['Material and defect depth/location','Target finish: mirror, satin or preparation','Edges, markings or tolerances sensitive to material removal']},placeholder:{fa:'جنس، محل و عمق عیب، فینیش هدف و هر لبه/تلرانس حساس به برداشت ماده را بنویسید.',en:'Describe material, defect location/depth, target finish and any edge/tolerance sensitive to material removal.'}}
  };
  var priorityFields={
    unsure:['material','surface_state','project_priority'],
    'pvd-industrial':['material','surface_state','project_priority','dimensions'],
    'pvd-decorative':['material','finish','quantity','surface_state'],
    'pvd-faucets':['material','finish','surface_state','dimensions'],
    'nickel-chrome':['material','surface_state','finish','dimensions'],
    polishing:['material','surface_state','finish','dimensions']
  };
  function fieldWrap(form,name){var el=form.elements[name];return el&&el.closest?el.closest('.field'):null;}
  var routeLabels={fa:{'service-discovery':'تشخیص خدمت مناسب','repeat-production':'بررسی تکرار تولید','sample-validation':'نمونه‌سازی و اعتبارسنجی','production-quote':'بررسی استعلام تولید','engineering-review':'بررسی مهندسی','technical-feasibility':'امکان‌سنجی فنی'},en:{'service-discovery':'Service discovery','repeat-production':'Repeat-production review','sample-validation':'Sample validation','production-quote':'Production quotation review','engineering-review':'Engineering review','technical-feasibility':'Technical feasibility'}};
  ready(function(){
    var form=document.querySelector('form[name="project-brief"]');if(!form)return;var service=form.elements.service,details=form.elements.details,params;try{params=new URLSearchParams(location.search||'');}catch(_e){params=null;}var requested=params?(params.get('service')||''):'';if(service&&requested&&profiles[requested])service.value=requested;
    function hidden(name,val){var el=form.querySelector('input[name="'+name+'"]');if(el)el.value=String(val||'').slice(0,240);}var src=params?(params.get('src')||''):'';var ref='',refSafe='';try{ref=document.referrer||'';}catch(_e){}if(ref){try{var ru=new URL(ref,location.href);refSafe=(ru.origin===location.origin?ru.pathname:ru.origin);if(!src)src=(ru.origin===location.origin?ru.pathname:'external-referrer');}catch(_e){refSafe='referrer';if(!src)src='referrer';}}if(!src)src='direct';hidden('source_path',src+(requested?'?service='+encodeURIComponent(requested):''));hidden('origin_url',refSafe);hidden('origin_label',src);if(params){hidden('utm_source',params.get('utm_source')||'');hidden('utm_medium',params.get('utm_medium')||'');hidden('utm_campaign',params.get('utm_campaign')||'');}
    var meter=document.getElementById('v345-brief-meter'),bar=document.getElementById('v345-brief-bar'),status=document.getElementById('v345-brief-quality'),missing=document.getElementById('v345-brief-missing'),scoreInput=form.elements.brief_score,qualityInput=form.elements.brief_quality,routeInput=form.elements.lead_route,focusInput=form.elements.review_focus;
    var ctxBox=form.querySelector('[data-v348-service-context]'),ctxTitle=form.querySelector('[data-v348-context-title]'),ctxCopy=form.querySelector('[data-v348-context-copy]'),promptList=form.querySelector('[data-v349-prompt-list]'),routePreview=form.querySelector('[data-v349-route-preview]'),partType=form.elements.part_type,partBox=form.querySelector('[data-v351-part-context]'),partCopy=form.querySelector('[data-v351-part-copy]');
    var partHelp={unknown:{fa:'اگر هندسه مشخص نیست، عکس از چند زاویه و ابعاد کلی قطعه معمولاً برای شروع کافی است.',en:'If geometry is unclear, photos from several angles plus overall dimensions are usually enough to start.'},flat:{fa:'طول، عرض، ضخامت و سطوح هدف پوشش/پرداخت را مشخص کنید.',en:'Provide length, width, thickness and the target coated/finished faces.'},cylindrical:{fa:'قطر، طول، سطح داخلی/خارجی و نواحی رزوه یا آب‌بندی را مشخص کنید.',en:'Provide diameter, length, inside/outside target surface and any threads or sealing areas.'},'faucet-hardware':{fa:'نقاط مونتاژ، رزوه، آب‌بندی، ناحیه بدون پوشش و وضعیت پوشش قبلی مهم‌اند.',en:'Assembly points, threads, sealing/no-coat areas and previous coating state matter.'},complex:{fa:'عکس چندزاویه، حفره/شیار، نواحی سایه‌دار و نقاط حساس فیکسچر یا ماسک‌کاری را اضافه کنید.',en:'Add multi-angle photos, recesses/slots, shadowed areas and fixture/masking-sensitive points.'},ceramic:{fa:'نوع لعاب، وضعیت سطح، سطح قابل‌دید و کاربرد نهایی باید پیش از نمونه‌سازی بررسی شود.',en:'Glaze type, surface state, visible area and end use should be reviewed before sampling.'},other:{fa:'ابعاد کلی، جنس، کاربرد و عکس چندزاویه را اضافه کنید.',en:'Add overall dimensions, material, use case and multi-angle photos.'}};
    var partPriority={flat:['dimensions'],cylindrical:['dimensions','material'],'faucet-hardware':['surface_state','finish','dimensions'],complex:['dimensions','surface_state'],ceramic:['material','surface_state','finish'],other:['dimensions','material'],unknown:[]};
    var weighted=[['material',15],['dimensions',10],['quantity',15],['finish',15],['city',5],['service',10],['part_type',5],['surface_state',10],['project_priority',10],['timeline',5]];
    function has(name){var el=form.elements[name];if(!el)return false;var v=String(el.value||'').trim();if(name==='service')return v&&v!=='unsure';if(name==='surface_state')return v&&v!=='unknown';if(name==='timeline')return v&&v!=='flexible';if(name==='part_type')return v&&v!=='unknown';return!!v;}
    function route(){var svc=String((service&&service.value)||'unsure'),stage=String((form.elements.project_stage&&form.elements.project_stage.value)||''),priority=String((form.elements.project_priority&&form.elements.project_priority.value)||'');if(svc==='unsure')return'service-discovery';if(stage==='repeat')return'repeat-production';if(stage==='prototype')return'sample-validation';if(stage==='quote')return'production-quote';if(priority==='wear'||priority==='corrosion')return'engineering-review';return'technical-feasibility';}
    function updateProfile(){var key=String((service&&service.value)||'unsure'),p=profiles[key]||profiles.unsure,la=lng();if(focusInput)focusInput.value=p.focus;if(ctxTitle)ctxTitle.textContent=service&&service.selectedIndex>=0?String(service.options[service.selectedIndex].textContent||'').trim():'';if(ctxCopy){ctxCopy.textContent=p.copy[la];}if(ctxBox)ctxBox.dataset.profile=key;if(promptList){var lis=promptList.querySelectorAll('li');p.prompts[la].forEach(function(t,i){if(lis[i])lis[i].textContent=t;});}form.querySelectorAll('.v350-priority-badge,.v351-geometry-badge').forEach(function(b){b.remove();});form.querySelectorAll('.field[data-v350-priority],.field[data-v351-geometry-priority]').forEach(function(w){delete w.dataset.v350Priority;delete w.dataset.v351GeometryPriority;});(priorityFields[key]||priorityFields.unsure).forEach(function(name){var w=fieldWrap(form,name),el=form.elements[name];if(!w||!el)return;w.dataset.v350Priority='true';var lab=w.querySelector('label');if(lab){var badge=document.createElement('span');badge.className='v350-priority-badge';badge.textContent=la==='en'?'Helpful for this service':'مهم برای این خدمت';lab.appendChild(badge);}});var pt=String((partType&&partType.value)||'unknown'),ph=partHelp[pt]||partHelp.unknown;if(partCopy)partCopy.textContent=ph[la];if(partBox)partBox.dataset.partType=pt;(partPriority[pt]||[]).forEach(function(name){var w=fieldWrap(form,name),el=form.elements[name];if(!w||!el)return;w.dataset.v351GeometryPriority='true';var lab=w.querySelector('label');if(lab&&!lab.querySelector('.v351-geometry-badge')){var badge=document.createElement('span');badge.className='v351-geometry-badge';badge.textContent=la==='en'?'Helpful for this geometry':'مهم برای این هندسه';lab.appendChild(badge);}});if(focusInput)focusInput.value=p.focus+'+part:'+pt;if(details)details.placeholder=p.placeholder[la];}
    function update(){var score=0,miss=[];weighted.forEach(function(x){if(has(x[0]))score+=x[1];else if(fieldNames[lng()][x[0]])miss.push(fieldNames[lng()][x[0]]);});var q=score>=75?'high':score>=45?'mid':'low',r=route();if(scoreInput)scoreInput.value=String(score);if(qualityInput)qualityInput.value=q;if(routeInput)routeInput.value=r;if(meter){meter.setAttribute('aria-valuenow',String(score));meter.dataset.quality=q;}if(bar)bar.value=score;if(status)status.textContent=labels[lng()][q];if(missing)missing.textContent=miss.length?labels[lng()].need+miss.slice(0,3).join(lng()==='fa'?'، ':', '):'';if(routePreview)routePreview.textContent=routeLabels[lng()][r]||r;updateProfile();}
    form.addEventListener('input',update);form.addEventListener('change',update);window.addEventListener('kavico:langchange',update);window.addEventListener('kavico:lang-changed',update);
    form.addEventListener('submit',function(){update();try{function selectedCode(name){var el=form.elements[name];return el?String(el.value||'').trim():'';}var ctx={service:selectedCode('service'),part:selectedCode('part_type'),stage:selectedCode('project_stage'),quality:String((qualityInput&&qualityInput.value)||''),score:String((scoreInput&&scoreInput.value)||''),route:String((routeInput&&routeInput.value)||route()),source:String((form.elements.source_path&&form.elements.source_path.value)||''),readiness:String((form.elements.lead_readiness&&form.elements.lead_readiness.value)||''),followupPriority:String((form.elements.followup_priority&&form.elements.followup_priority.value)||''),followupLane:String((form.elements.followup_lane&&form.elements.followup_lane.value)||''),qualificationBasis:String((form.elements.qualification_basis&&form.elements.qualification_basis.value)||'')};var extra=window.KAVICO_V371_BRIEF_CONTEXT;if(extra&&typeof extra==='object'){Object.keys(extra).forEach(function(k){ctx[k]=extra[k];});}sessionStorage.setItem('kavico:lastBriefContext',JSON.stringify(ctx));}catch(_e){}});update();
  });
})();


/* v352: preferred response-method validity. Email becomes required only when the user explicitly asks for an email reply. */
(function(){'use strict';
  function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn,{once:true});else fn();}
  function isEn(){return (document.documentElement.lang||'fa').toLowerCase().indexOf('en')===0;}
  ready(function(){
    var form=document.querySelector('form[name="project-brief"]'); if(!form)return;
    var pref=form.elements.preferred_contact, email=form.elements.email, help=document.getElementById('brief_email_help');
    if(!pref||!email)return;
    function sync(){
      var need=String(pref.value||'')==='email';
      email.required=need;
      if(need) email.setAttribute('aria-required','true'); else email.removeAttribute('aria-required');
      if(help){
        help.textContent=need?(isEn()?'Because “Email” is selected as the response method, enter a valid email address.':'چون روش پاسخ «ایمیل» انتخاب شده، یک ایمیل معتبر وارد کنید.'):(isEn()?'Email is optional. If you choose “Email” as the response method, this field becomes required.':'ایمیل اختیاری است؛ اگر روش پاسخ «ایمیل» را انتخاب کنید، همین فیلد لازم می‌شود.');
      }
      if(!need && email.validity && email.validity.valueMissing) email.removeAttribute('aria-invalid');
    }
    pref.addEventListener('change',sync); window.addEventListener('kavico:langchange',sync); window.addEventListener('kavico:lang-changed',sync); sync();
  });
})();



/* Kavico v371 — source-aware prefill, low-information soft gate, and non-PII follow-up context. */
(function(){'use strict';
  function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn,{once:true});else fn();}
  function isEn(){return (document.documentElement.lang||'fa').toLowerCase().indexOf('en')===0;}
  function cleanSource(v){return String(v||'').trim().toLowerCase().replace(/^en-/,'').slice(0,120);}
  function sourceGroup(src){src=cleanSource(src);if(src.indexOf('thanks-')===0)return'followup';if(src.indexOf('services-')===0)return'service';if(src.indexOf('blog-')===0)return'article';if(src.indexOf('guides-')===0||src==='guide'||src==='guides')return'guide';if(src.indexOf('compare-')===0||src==='compare')return'compare';if(src.indexOf('tools-pricing')===0)return'pricing';if(src.indexOf('portfolio')===0)return'portfolio';if(src.indexOf('tehran')>=0||src.indexOf('karaj')>=0)return'local';return'general';}
  function inferService(src){src=cleanSource(src);var rules=[
    ['pvd-industrial',/(services-pvd-coating|guides-pvd-coating|blog-pvd-coating$|blog-pvd-on-zinc|blog-conductive-vs-insulative|blog-pvd-defects)/],
    ['pvd-decorative',/(services-decorative-pvd|blog-pvd-colors|blog-decor-color-match|blog-matte-vs-gloss|blog-pvd-care|blog-fingerprint|blog-pvd-color-consistency|blog-pvd-color-durability)/],
    ['pvd-faucets',/(services-pvd-faucets|blog-pvd-faucets)/],
    ['nickel-chrome',/(services-nickel-chrome-plating|guides-nickel-chrome-plating|blog-traditional-plating-nickel-chrome|blog-plating-defects-peeling-blisters)/],
    ['polishing',/(services-polishing|guides-polishing|blog-polishing-before-pvd|blog-mirror-vs-satin-polish|blog-polishing-brass-parts)/]
  ];for(var i=0;i<rules.length;i++)if(rules[i][1].test(src))return rules[i][0];return'';}
  var groupLabels={fa:{followup:'پیگیری Brief قبلی',service:'صفحه خدمت',article:'مقاله فنی',guide:'راهنمای فنی',compare:'صفحه مقایسه',pricing:'برآورد اولیه',portfolio:'نمونه‌کار',local:'صفحه خدمات منطقه‌ای',general:'صفحه قبلی'},en:{followup:'previous brief follow-up',service:'service page',article:'technical article',guide:'technical guide',compare:'comparison page',pricing:'initial estimate',portfolio:'portfolio',local:'local service page',general:'previous page'}};
  var gapLabels={fa:{material:'جنس قطعه',dimensions:'ابعاد تقریبی',quantity:'تیراژ',finish:'فینیش هدف',surface_state:'وضعیت فعلی سطح',part_type:'نوع/هندسه قطعه',project_priority:'اولویت اصلی',details:'شرح روشن‌تر پروژه'},en:{material:'part material',dimensions:'approximate dimensions',quantity:'batch size',finish:'target finish',surface_state:'current surface state',part_type:'part geometry',project_priority:'main priority',details:'a clearer project description'}};
  ready(function(){
    var form=document.querySelector('form[name="project-brief"]');if(!form)return;var params;try{params=new URLSearchParams(location.search||'');}catch(_e){params=null;}
    var service=form.elements.service,stage=form.elements.project_stage,details=form.elements.details,src=cleanSource(params?(params.get('src')||''):'');var explicit=String(params?(params.get('service')||''):'').trim(),stageParam=String(params?(params.get('stage')||''):'').trim(), inferred=!explicit?inferService(src):'';var prefilled=!!(explicit&&service&&String(service.value||'')===explicit);
    if(service&&!explicit&&inferred&&String(service.value||'unsure')==='unsure'){service.value=inferred;prefilled=true;service.dispatchEvent(new Event('change',{bubbles:true}));}
    if(stage&&String(stage.value||'')===''&&/^(evaluation|prototype|quote|repeat)$/.test(stageParam)){stage.value=stageParam;prefilled=true;stage.dispatchEvent(new Event('change',{bubbles:true}));}
    else if(stage&&String(stage.value||'')===''&&((params&&params.get('from')==='pricing')||sourceGroup(src)==='pricing')){stage.value='quote';prefilled=true;stage.dispatchEvent(new Event('change',{bubbles:true}));}
    var origin=document.querySelector('[data-v371-origin-context]'),originCopy=document.querySelector('[data-v371-origin-copy]');
    function renderOrigin(){if(!origin||!src){if(origin)origin.hidden=true;return;}var en=isEn(),g=sourceGroup(src),lab=(groupLabels[en?'en':'fa']||groupLabels.fa)[g]||src;origin.hidden=false;if(originCopy)originCopy.textContent=en?('This brief was opened from a '+lab+'. Relevant fields may be preselected, and you can change every selection before sending.'):('این Brief از '+lab+' باز شده است. بعضی انتخاب‌های مرتبط ممکن است از قبل تنظیم شوند و همه آن‌ها قبل از ارسال قابل تغییرند.');}
    renderOrigin();window.addEventListener('kavico:langchange',renderOrigin);window.addEventListener('kavico:lang-changed',renderOrigin);
    function hidden396(name,val){var el=form.elements[name];if(el)el.value=String(val||'').slice(0,120);}hidden396('source_group',sourceGroup(src));hidden396('source_prefilled',prefilled?'1':'0');hidden396('conversion_locale',isEn()?'en':'fa');
    if(details){details.minLength=20;details.setAttribute('aria-describedby',((details.getAttribute('aria-describedby')||'')+' v371-details-help').trim());}
    var gate=document.getElementById('v371-submit-gate'),gateCopy=document.getElementById('v371-submit-gate-copy'),completeBtn=gate&&gate.querySelector('[data-v371-complete]'),sendBtn=gate&&gate.querySelector('[data-v371-send-anyway]'),submitBtn=form.querySelector('button[type="submit"]');var allowLow=false;
    function meaningful(name){var el=form.elements[name];if(!el)return false;var v=String(el.value||'').trim();if(name==='surface_state'||name==='part_type')return v&&v!=='unknown';return!!v;}
    function gapCodes(){var a=[];['material','dimensions','quantity','finish','surface_state','part_type','project_priority'].forEach(function(n){if(!meaningful(n))a.push(n);});if(!details||String(details.value||'').trim().length<40)a.push('details');return a;}
    function factCount(){var c=0;['material','dimensions','quantity','finish','surface_state','part_type','project_priority'].forEach(function(n){if(meaningful(n))c++;});if(details&&String(details.value||'').trim().length>=40)c++;return c;}
    function quality(){var s=parseInt(String((form.elements.brief_score&&form.elements.brief_score.value)||'0'),10)||0,c=factCount();return c>=5&&s>=65?'high':c>=2&&s>=25?'mid':'low';}
    function firstGap(){var gs=gapCodes();for(var i=0;i<gs.length;i++){var el=gs[i]==='details'?details:form.elements[gs[i]];if(el)return el;}return details||service;}
    function extraContext(){return{v:'371',gaps:gapCodes().slice(0,5),facts:String(factCount()),quality371:quality(),sourceGroup:sourceGroup(src),prefilled:prefilled?'1':'0',preferred:String((form.elements.preferred_contact&&form.elements.preferred_contact.value)||'').slice(0,24)};}
    function syncContext(){window.KAVICO_V371_BRIEF_CONTEXT=extraContext();}
    function renderGate(){if(!gateCopy)return;var gs=gapCodes(),names=gapLabels[isEn()?'en':'fa'],top=gs.slice(0,3).map(function(x){return names[x]||x;});gateCopy.textContent=isEn()?('The brief is still light on project facts. Adding '+top.join(', ')+' can reduce follow-up. You can complete those fields now or send the current information for an initial review.'):('Brief هنوز اطلاعات فنی کمی دارد. افزودن '+top.join('، ')+' معمولاً رفت‌وبرگشت بررسی را کمتر می‌کند. می‌توانید همین حالا تکمیل کنید یا اطلاعات فعلی را برای بررسی اولیه بفرستید.');}
    function validateDetails(){if(!details)return true;var n=String(details.value||'').trim().length,txt=n>=20?'':(isEn()?'Please add at least 20 characters describing the part, project goal, or current surface.':'حداقل ۲۰ کاراکتر درباره قطعه، هدف پروژه یا وضعیت فعلی سطح بنویسید.');details.setCustomValidity(txt);return!txt;}
    form.addEventListener('input',function(){allowLow=false;if(gate)gate.hidden=true;validateDetails();syncContext();});form.addEventListener('change',function(){allowLow=false;if(gate)gate.hidden=true;syncContext();});
    if(completeBtn)completeBtn.addEventListener('click',function(){if(gate)gate.hidden=true;var el=firstGap();if(el){try{el.scrollIntoView({behavior:'smooth',block:'center'});}catch(_e){}setTimeout(function(){try{el.focus({preventScroll:true});}catch(_e){}},220);}});
    if(sendBtn)sendBtn.addEventListener('click',function(){allowLow=true;if(gate)gate.hidden=true;syncContext();if(form.requestSubmit)form.requestSubmit(submitBtn);else submitBtn.click();});
    form.addEventListener('submit',function(ev){validateDetails();syncContext();if(!details.checkValidity())return;var low=quality()==='low';if(low&&!allowLow){ev.preventDefault();ev.stopImmediatePropagation();renderGate();if(gate){gate.hidden=false;try{gate.scrollIntoView({behavior:'smooth',block:'center'});}catch(_e){}gate.focus&&gate.focus();}return;}},true);
    syncContext();
  });
})();


/* KAVICO v395 — essential brief progress. Non-blocking: mirrors only the four existing required fields. */
(function(){'use strict';
  function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn,{once:true});else fn();}
  function en(){return (document.documentElement.lang||'fa').toLowerCase().indexOf('en')===0;}
  ready(function(){
    var form=document.querySelector('form[name="project-brief"]');if(!form)return;form.setAttribute('data-brief-version','395');
    var names=['name','phone','project_stage','details'];var labels=en()?['Name','Phone','Project stage','Project details']:['نام','شماره تماس','مرحله پروژه','توضیحات پروژه'];
    var minNote=form.querySelector('.v370-minimum-note');if(!minNote)return;
    var box=document.createElement('div');box.className='v395-essential-progress';box.setAttribute('data-v395-essential-progress','');
    box.innerHTML='<div class="v395-essential-progress__head"><span>'+(en()?'Essential details':'اطلاعات ضروری')+'</span><strong data-v395-progress-text aria-live="polite"></strong></div><progress max="4" value="0" aria-label="'+(en()?'Essential project brief completion':'تکمیل اطلاعات ضروری پروژه')+'"></progress><div class="v395-essential-progress__items"></div><div class="v395-essential-progress__foot"><p class="v395-essential-progress__status" data-v395-progress-status></p><button class="btn btn-ghost btn-sm v395-essential-progress__next" type="button" data-v395-next-required></button></div>';
    minNote.insertAdjacentElement('afterend',box);
    var items=box.querySelector('.v395-essential-progress__items');names.forEach(function(n,i){var sp=document.createElement('span');sp.className='v395-essential-progress__item';sp.setAttribute('data-v395-field',n);sp.textContent=labels[i];items.appendChild(sp);var el=form.elements[n];if(el)el.setAttribute('data-v395-essential','1');});
    var progress=box.querySelector('progress'),text=box.querySelector('[data-v395-progress-text]'),status=box.querySelector('[data-v395-progress-status]'),next=box.querySelector('[data-v395-next-required]');
    function ok(name){var el=form.elements[name];if(!el)return false;var v=String(el.value||'').trim();if(name==='details')return v.length>=20;if(name==='phone')return v.length>=7;if(name==='name')return v.length>=2;if(name==='project_stage')return !!v;return el.checkValidity?el.checkValidity():!!v;}
    function sync(){var done=0,first=null;names.forEach(function(n){var yes=ok(n);if(yes)done++;else if(!first)first=form.elements[n];var chip=box.querySelector('[data-v395-field="'+n+'"]');if(chip)chip.classList.toggle('is-complete',yes);});progress.value=done;text.textContent=en()?(done+' of 4 ready'):(done+' از ۴ تکمیل');var all=done===4;status.textContent=all?(en()?'Minimum information is ready. Optional details can still improve the technical review.':'حداقل اطلاعات آماده است؛ فیلدهای اختیاری می‌توانند بررسی فنی را دقیق‌تر کنند.'):(en()?'Complete the required items first; optional fields can be added afterwards.':'ابتدا موارد ضروری را کامل کنید؛ جزئیات تکمیلی را می‌توانید بعد از آن اضافه کنید.');next.disabled=all;next.textContent=all?(en()?'Essential details ready':'اطلاعات ضروری کامل است'):(en()?'Go to next required item':'ادامه با مورد ضروری بعدی');next.dataset.target=first&&first.name?first.name:'';}
    next.addEventListener('click',function(){var n=next.dataset.target,el=n&&form.elements[n];if(!el)return;try{el.scrollIntoView({behavior:'smooth',block:'center'});}catch(_e){el.scrollIntoView();}setTimeout(function(){try{el.focus({preventScroll:true});}catch(_e){el.focus();}},260);});
    form.addEventListener('input',sync);form.addEventListener('change',sync);sync();
  });
})();


/* KAVICO v396 — source-aware channel handoff. No PII is written to the URL or session context. */
(function(){'use strict';
  function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn,{once:true});else fn();}
  function en(){return (document.documentElement.lang||'fa').toLowerCase().indexOf('en')===0;}
  function clean(v){return String(v||'').trim().toLowerCase().replace(/^en-/,'').slice(0,120);}
  function group(src){src=clean(src);if(src.indexOf('thanks-')===0)return'followup';if(src.indexOf('services-')===0)return'service';if(src.indexOf('blog-')===0)return'article';if(src.indexOf('guides-')===0)return'guide';if(src.indexOf('compare')===0)return'compare';if(src.indexOf('portfolio')===0)return'portfolio';if(src.indexOf('tehran')>=0||src.indexOf('karaj')>=0)return'local';return'general';}
  var faService={unsure:'نیاز به راهنمایی','pvd-industrial':'PVD صنعتی','pvd-decorative':'PVD تزئینی / لوکس','pvd-faucets':'PVD شیرآلات و یراق','nickel-chrome':'آبکاری نیکل‌کروم',polishing:'پولیش و پرداخت سطح'};
  var enService={unsure:'service guidance','pvd-industrial':'industrial PVD','pvd-decorative':'decorative PVD','pvd-faucets':'PVD for faucets / hardware','nickel-chrome':'nickel-chrome plating',polishing:'polishing / surface finishing'};
  var faStage={evaluation:'امکان‌سنجی',prototype:'نمونه‌سازی / نمونه رنگ',quote:'استعلام تولید',repeat:'تیراژ تکراری'};
  var enStage={evaluation:'feasibility review',prototype:'sample / finish validation',quote:'production quotation',repeat:'repeat production'};
  var faGroup={followup:'پیگیری Brief قبلی',service:'صفحه خدمت',article:'مقاله فنی',guide:'راهنمای فنی',compare:'مقایسه',portfolio:'نمونه‌کار',local:'صفحه منطقه‌ای',general:'وب‌سایت'};
  var enGroup={followup:'a previous brief follow-up',service:'a service page',article:'a technical article',guide:'a technical guide',compare:'a comparison page',portfolio:'the portfolio',local:'a local service page',general:'the website'};
  ready(function(){var form=document.querySelector('form[name="project-brief"]');if(!form)return;var params;try{params=new URLSearchParams(location.search||'');}catch(_e){params=null;}var src=clean(params?(params.get('src')||''):'');
    function label(map,val,fallback){return map[val]||fallback||val||'';}
    function sync(){var service=String((form.elements.service&&form.elements.service.value)||'unsure'),stage=String((form.elements.project_stage&&form.elements.project_stage.value)||''),g=group(src),isEn=en();var msg;if(isEn){msg='Hello, I would like to send project photos/details for '+label(enService,service,'technical review')+'.';if(stage)msg+=' Project stage: '+label(enStage,stage,stage)+'.';msg+=' I opened the brief from '+label(enGroup,g,'the website')+'.';}else{msg='سلام، می‌خواهم عکس و مشخصات پروژه برای '+label(faService,service,'بررسی فنی')+' را ارسال کنم.';if(stage)msg+=' مرحله پروژه: '+label(faStage,stage,stage)+'.';msg+=' مسیر ورود: '+label(faGroup,g,'وب‌سایت')+'.';}var href='https://wa.me/989125460799?text='+encodeURIComponent(msg);form.querySelectorAll('a.v370-form-whatsapp,a[data-v370-channel="whatsapp"]').forEach(function(a){a.href=href;});}
    form.addEventListener('change',sync);sync();
  });
})();


/* KAVICO v396 — mobile Quick Brief. Optional technical fields collapse only with JS; desktop and no-JS remain fully visible. */
(function(){'use strict';
  function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn,{once:true});else fn();}
  function en(){return (document.documentElement.lang||'fa').toLowerCase().indexOf('en')===0;}
  ready(function(){var form=document.querySelector('form[name="project-brief"]');if(!form)return;var names=['material','dimensions','part_type','quantity','city','surface_state','project_priority','timeline','finish'];var marked=[];
    names.forEach(function(n){var el=form.elements[n];if(!el)return;var wrap=el.closest('.field');if(wrap){wrap.classList.add('v396-optional-detail');marked.push(wrap);}});
    ['.v349-brief-guidance','.v350-brief-priority-help','.v351-part-context'].forEach(function(sel){var el=form.querySelector(sel);if(el){el.classList.add('v396-optional-detail');marked.push(el);}});
    if(!marked.length)return;var anchor=form.querySelector('[data-v395-essential-progress]')||form.querySelector('.v370-minimum-note');if(!anchor)return;var row=document.createElement('div');row.className='v396-quick-brief';row.innerHTML='<button class="btn btn-ghost btn-sm v396-optional-toggle" type="button" aria-expanded="false"><span data-v396-toggle-label></span><small></small></button><p></p>';anchor.insertAdjacentElement('afterend',row);var btn=row.querySelector('button'),lab=row.querySelector('[data-v396-toggle-label]'),small=row.querySelector('small'),note=row.querySelector('p');var expanded=false;
    function copy(){lab.textContent=expanded?(en()?'Hide optional technical details':'پنهان‌کردن جزئیات فنی اختیاری'):(en()?'Add optional technical details':'افزودن جزئیات فنی اختیاری');small.textContent=en()?'9 optional fields':'۹ فیلد اختیاری';note.textContent=en()?'The four essential fields remain visible. Expand this section when material, dimensions, batch size or finish details are available.':'چهار مورد ضروری همیشه دیده می‌شوند. اگر جنس، ابعاد، تیراژ یا فینیش را می‌دانید این بخش را باز کنید.';}
    function set(v){expanded=!!v;form.classList.toggle('v396-optional-expanded',expanded);form.classList.toggle('v396-optional-collapsed',!expanded);btn.setAttribute('aria-expanded',expanded?'true':'false');copy();}
    btn.addEventListener('click',function(){set(!expanded);if(expanded){var first=form.querySelector('.v396-optional-detail input,.v396-optional-detail select,.v396-optional-detail textarea');if(first)setTimeout(function(){try{first.focus({preventScroll:true});}catch(_e){}},80);}});
    var complete=form.querySelector('[data-v371-complete]');if(complete)complete.addEventListener('click',function(){set(true);},true);
    form.addEventListener('invalid',function(ev){if(ev.target&&ev.target.closest&&ev.target.closest('.v396-optional-detail'))set(true);},true);
    set(false);window.addEventListener('kavico:langchange',copy);window.addEventListener('kavico:lang-changed',copy);
  });
})();

/* KAVICO v397 — project-only lead qualification metadata for future CRM/admin routing. No personal fields affect the score. */
(function(){'use strict';
  function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn,{once:true});else fn();}
  function val(form,name){var el=form.elements[name];return el?String(el.value||'').trim():'';}
  function set(form,name,value){var el=form.elements[name];if(el)el.value=String(value||'').slice(0,80);}
  ready(function(){
    var form=document.querySelector('form[name="project-brief"]');if(!form)return;
    function qualify(){
      var projectWeights=[['material',15],['dimensions',10],['quantity',15],['finish',15],['service',10],['part_type',5],['surface_state',10],['project_priority',10],['timeline',5],['details',5]],score=0;
      function projectHas(name){var v=val(form,name);if(name==='service')return!!v&&v!=='unsure';if(name==='surface_state')return!!v&&v!=='unknown';if(name==='timeline')return!!v&&v!=='flexible';if(name==='part_type')return!!v&&v!=='unknown';return!!v;}
      projectWeights.forEach(function(x){if(projectHas(x[0]))score+=x[1];});
      var service=val(form,'service'),stage=val(form,'project_stage'),timeline=val(form,'timeline'),risk=val(form,'project_priority'),route=val(form,'lead_route');
      var readiness=(score>=75&&service&&service!=='unsure'&&stage)?'ready':((score>=45&&stage)?'reviewable':'discovery');
      var q=score;
      if(stage==='repeat')q+=25;else if(stage==='quote')q+=20;else if(stage==='prototype')q+=10;
      if(timeline==='under-2w')q+=15;else if(timeline==='2-4w')q+=8;
      if(risk==='wear'||risk==='corrosion')q+=5;
      if(!service||service==='unsure')q-=10;
      var priority=q>=105?'p1':q>=75?'p2':'p3';
      var lane={'service-discovery':'discovery','repeat-production':'repeat-production','sample-validation':'sample-validation','production-quote':'production-quote','engineering-review':'engineering-review','technical-feasibility':'technical-feasibility'}[route]||'technical-review';
      set(form,'lead_readiness',readiness);set(form,'followup_priority',priority);set(form,'followup_lane',lane);set(form,'qualification_basis','project-context-v398');set(form,'qualification_score',String(Math.max(0,q)));
      return {readiness:readiness,followupPriority:priority,followupLane:lane,qualificationBasis:'project-context-v398',qualificationScore:String(Math.max(0,q))};
    }
    form.addEventListener('input',qualify);form.addEventListener('change',qualify);
    form.addEventListener('submit',function(){var meta=qualify();try{var ctx=JSON.parse(sessionStorage.getItem('kavico:lastBriefContext')||'null');if(ctx&&typeof ctx==='object'){Object.keys(meta).forEach(function(k){ctx[k]=meta[k];});sessionStorage.setItem('kavico:lastBriefContext',JSON.stringify(ctx));}}catch(_e){}});
    qualify();
  });
})();



/* KAVICO v398 — versioned non-PII conversion event contract for Netlify/CRM/analytics adapters. */
(function(){'use strict';
  function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn,{once:true});else fn();}
  function val(form,name){var el=form.elements[name];return el?String(el.value||'').trim():'';}
  function set(form,name,value,max){var el=form.elements[name];if(el)el.value=String(value==null?'':value).slice(0,max||2000);}
  function uuid(){try{if(window.crypto&&typeof window.crypto.randomUUID==='function')return window.crypto.randomUUID();}catch(_e){}var a=[];for(var i=0;i<32;i++)a.push(Math.floor(Math.random()*16).toString(16));return a.slice(0,8).join('')+'-'+a.slice(8,12).join('')+'-4'+a.slice(13,16).join('')+'-a'+a.slice(17,20).join('')+'-'+a.slice(20,32).join('');}
  function makeRef(){var x=uuid().replace(/[^a-f0-9]/gi,'').toUpperCase().slice(0,12).padEnd(12,'0');return 'KVC-'+x.slice(0,4)+'-'+x.slice(4,8)+'-'+x.slice(8,12);}
  function validRef(v){return /^KVC-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}$/.test(String(v||''));}
  function safeEnum(v,allowed,fallback){v=String(v||'');return allowed.indexOf(v)>=0?v:fallback;}
  ready(function(){
    var form=document.querySelector('form[name="project-brief"]');if(!form)return;
    var CONTRACT='kavico.lead-conversion.v1',SCHEMA='/assets/contracts/lead-conversion.v1.schema.json';
    var params;try{params=new URLSearchParams(location.search||'');}catch(_e){params=null;}
    var ref=params?String(params.get('ref')||''):'';var src=params?String(params.get('src')||''):'';
    if(!(src.indexOf('thanks-followup')===0&&validRef(ref)))ref='';
    if(!ref){try{var r=JSON.parse(sessionStorage.getItem('kavico:lastBriefReceipt')||'null');if(src.indexOf('thanks-followup')===0&&r&&validRef(r.leadReference))ref=r.leadReference;}catch(_e){}}
    if(!ref)ref=makeRef();
    set(form,'event_contract_version',CONTRACT,80);set(form,'event_schema',SCHEMA,160);set(form,'event_name','project_brief_submitted',80);set(form,'lead_reference',ref,40);
    function buildEvent(){
      var id='evt_'+uuid(),occurred=new Date().toISOString();
      var payload={
        contract_version:CONTRACT,event_name:'project_brief_submitted',event_id:id,lead_reference:ref,occurred_at:occurred,
        locale:safeEnum(val(form,'conversion_locale'),['fa','en'],document.documentElement.lang&&document.documentElement.lang.toLowerCase().indexOf('en')===0?'en':'fa'),
        service:safeEnum(val(form,'service'),['unsure','pvd-industrial','pvd-decorative','pvd-faucets','nickel-chrome','polishing'],'unsure'),
        stage:safeEnum(val(form,'project_stage'),['evaluation','prototype','quote','repeat'],'evaluation'),
        route:safeEnum(val(form,'lead_route'),['service-discovery','repeat-production','sample-validation','production-quote','engineering-review','technical-feasibility'],'service-discovery'),
        readiness:safeEnum(val(form,'lead_readiness'),['ready','reviewable','discovery'],'discovery'),
        priority:safeEnum(val(form,'followup_priority'),['p1','p2','p3'],'p3'),
        lane:safeEnum(val(form,'followup_lane'),['discovery','repeat-production','sample-validation','production-quote','engineering-review','technical-feasibility','technical-review'],'technical-review'),
        qualification_basis:String(val(form,'qualification_basis')||'project-context-v398').slice(0,48),
        qualification_score:Math.max(0,Math.min(200,parseInt(val(form,'qualification_score')||'0',10)||0)),
        source_group:safeEnum(val(form,'source_group'),['followup','service','article','guide','compare','pricing','portfolio','local','general'],'general'),
        source_prefilled:val(form,'source_prefilled')==='1',preferred_response:safeEnum(val(form,'preferred_contact'),['phone','whatsapp','email'],'phone')
      };
      set(form,'event_id',id,80);set(form,'event_occurred_at',occurred,40);set(form,'conversion_event',JSON.stringify(payload),2000);
      try{var ctx=JSON.parse(sessionStorage.getItem('kavico:lastBriefContext')||'null');if(!ctx||typeof ctx!=='object')ctx={};ctx.leadReference=ref;ctx.eventId=id;ctx.contractVersion=CONTRACT;ctx.eventName=payload.event_name;ctx.eventOccurredAt=occurred;ctx.qualificationScore=String(payload.qualification_score);sessionStorage.setItem('kavico:lastBriefContext',JSON.stringify(ctx));}catch(_e){}
      try{window.dispatchEvent(new CustomEvent('kavico:conversion',{detail:payload}));}catch(_e){}
      return payload;
    }
    window.KAVICO_LEAD_CONTRACT={version:CONTRACT,schema:SCHEMA,leadReference:ref,buildEvent:buildEvent};
    form.addEventListener('submit',buildEvent);
  });
})();


/* KAVICO v399 — non-PII CRM/admin export mapping. Public site emits only the initial submitted/queued state. */
(function(){'use strict';
  function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn,{once:true});else fn();}
  function val(form,name){var el=form.elements[name];return el?String(el.value||'').trim():'';}
  function set(form,name,value,max){var el=form.elements[name];if(el)el.value=String(value==null?'':value).slice(0,max||2400);}
  function safe(v,allowed,fallback){v=String(v||'');return allowed.indexOf(v)>=0?v:fallback;}
  ready(function(){
    var form=document.querySelector('form[name="project-brief"]');if(!form)return;
    var CONTRACT='kavico.lead-admin-export.v1',SCHEMA='/assets/contracts/lead-admin-export.v1.schema.json',MAPPING='kavico.lead-lifecycle.v1';
    set(form,'admin_contract_version',CONTRACT,80);set(form,'admin_export_schema',SCHEMA,160);set(form,'lifecycle_mapping_version',MAPPING,80);set(form,'lifecycle_status','submitted',32);set(form,'followup_state','queued',32);
    function derive(base){
      base=base&&typeof base==='object'?base:{};
      var lane=safe(base.lane||val(form,'followup_lane'),['discovery','repeat-production','sample-validation','production-quote','engineering-review','technical-feasibility','technical-review'],'technical-review');
      var priority=safe(base.priority||val(form,'followup_priority'),['p1','p2','p3'],'p3');
      var readiness=safe(base.readiness||val(form,'lead_readiness'),['ready','reviewable','discovery'],'discovery');
      var queue={'discovery':'lead-discovery','repeat-production':'repeat-production','sample-validation':'sample-validation','production-quote':'commercial-estimation','engineering-review':'technical-engineering','technical-feasibility':'technical-engineering','technical-review':'technical-engineering'}[lane]||'technical-engineering';
      var sla={'p1':'priority-review','p2':'standard-review','p3':'discovery-review'}[priority]||'discovery-review';
      var action=readiness==='discovery'?'request-project-context':({'repeat-production':'review-repeat-production','sample-validation':'review-sample-requirements','production-quote':'prepare-commercial-review','engineering-review':'review-technical-feasibility','technical-feasibility':'review-technical-feasibility','technical-review':'review-technical-feasibility','discovery':'triage-brief'}[lane]||'triage-brief');
      return {lane:lane,priority:priority,readiness:readiness,assignmentQueue:queue,slaPolicyKey:sla,nextAction:action};
    }
    function build(base){
      var d=derive(base),score=parseInt(base&&base.qualification_score!=null?base.qualification_score:val(form,'qualification_score')||'0',10)||0;
      var payload={
        contract_version:CONTRACT,event_name:'lead_submitted',source_contract_version:'kavico.lead-conversion.v1',mapping_version:MAPPING,
        event_id:String((base&&base.event_id)||val(form,'event_id')||'').slice(0,80),lead_reference:String((base&&base.lead_reference)||val(form,'lead_reference')||'').slice(0,40),occurred_at:String((base&&base.occurred_at)||val(form,'event_occurred_at')||new Date().toISOString()).slice(0,40),
        lifecycle_status:'submitted',followup_state:'queued',assignment_queue:d.assignmentQueue,sla_policy_key:d.slaPolicyKey,next_action:d.nextAction,
        readiness:d.readiness,priority:d.priority,lane:d.lane,
        route:safe((base&&base.route)||val(form,'lead_route'),['service-discovery','repeat-production','sample-validation','production-quote','engineering-review','technical-feasibility'],'service-discovery'),
        service:safe((base&&base.service)||val(form,'service'),['unsure','pvd-industrial','pvd-decorative','pvd-faucets','nickel-chrome','polishing'],'unsure'),
        stage:safe((base&&base.stage)||val(form,'project_stage'),['evaluation','prototype','quote','repeat'],'evaluation'),
        qualification_score:Math.max(0,Math.min(200,score)),
        source_group:safe((base&&base.source_group)||val(form,'source_group'),['followup','service','article','guide','compare','pricing','portfolio','local','general'],'general'),
        preferred_response:safe((base&&base.preferred_response)||val(form,'preferred_contact'),['phone','whatsapp','email'],'phone'),
        export_basis:'lead-conversion-v1+project-context-v398+admin-routing-v399'
      };
      set(form,'lifecycle_status',payload.lifecycle_status,32);set(form,'followup_state',payload.followup_state,32);set(form,'assignment_queue',payload.assignment_queue,48);set(form,'sla_policy_key',payload.sla_policy_key,48);set(form,'next_action',payload.next_action,64);set(form,'admin_export',JSON.stringify(payload),2400);
      try{var ctx=JSON.parse(sessionStorage.getItem('kavico:lastBriefContext')||'null');if(!ctx||typeof ctx!=='object')ctx={};ctx.adminContractVersion=CONTRACT;ctx.adminMappingVersion=MAPPING;ctx.lifecycleStatus=payload.lifecycle_status;ctx.followupState=payload.followup_state;ctx.assignmentQueue=payload.assignment_queue;ctx.slaPolicyKey=payload.sla_policy_key;ctx.nextAction=payload.next_action;sessionStorage.setItem('kavico:lastBriefContext',JSON.stringify(ctx));}catch(_e){}
      try{window.dispatchEvent(new CustomEvent('kavico:lead-admin-export',{detail:payload}));}catch(_e){}
      return payload;
    }
    window.KAVICO_ADMIN_EXPORT={version:CONTRACT,schema:SCHEMA,mapping:MAPPING,build:build};
    window.addEventListener('kavico:conversion',function(ev){build(ev&&ev.detail);});
    form.addEventListener('submit',function(){if(!val(form,'admin_export')){var base=null;try{base=JSON.parse(val(form,'conversion_event')||'null');}catch(_e){}build(base);}});
  });
})();
