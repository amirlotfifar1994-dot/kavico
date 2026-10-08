/* v343 compact home article dataset */
window.KAVIAN_ARTICLES=[{"path":"blog/polishing-brass-parts/index.html","imgWebp":"assets/img/blog-sample-polishing.webp","imgJpg":"assets/img/blog-sample-polishing.jpg","date":"2026-01-07","titleFa":"پرداخت‌کاری قطعات برنجی: نکات مهم برای خروجی لوکس","titleEn":"Polishing brass parts: practical tips for a premium finish","leadFa":"برنج با یک پرداخت خوب واقعاً لوکس می‌شود. با یک پرداخت بد، همان‌قدر سریع افت می‌کند.","leadEn":"Brass looks truly premium with good polishing. With poor polishing, it degrades just as fast."},{"path":"blog/mirror-vs-satin-polish/index.html","imgWebp":"assets/img/article-mirror-vs-satin-v357.webp","imgJpg":"assets/img/article-mirror-vs-satin-v357.jpg","date":"2026-01-07","titleFa":"پولیش آینه‌ای vs ساتن: کدام برای پروژه لوکس بهتر است؟","titleEn":"Mirror vs satin polish: which is better for luxury projects?","leadFa":"اگر نور محیط سخت است یا تماس زیاد دارید، ساتن معمولاً انتخاب منطقی‌تری است. اما بعضی پروژه‌ها آینه‌ای می‌خواهند.","leadEn":"If lighting is harsh or the part is high-touch, satin is often safer. But some projects truly need a mirror look."},{"path":"blog/polishing-before-pvd/index.html","imgWebp":"assets/img/article-polishing-before-pvd-v357.webp","imgJpg":"assets/img/article-polishing-before-pvd-v357.jpg","date":"2026-01-07","titleFa":"پرداخت‌کاری قبل از PVD: چرا نصف کیفیت کار همینجاست؟","titleEn":"Polishing before PVD: why half the quality is decided here","leadFa":"اگر پولیش بد باشد، بهترین پوشش هم معجزه نمی‌کند. برای فینیش لوکس، زیرکار پادشاه است.","leadEn":"If polishing is poor, even the best coating will not save it. For a premium finish, the substrate is king."},{"path":"blog/decorative-vs-hard-chrome/index.html","imgWebp":"assets/img/article-decorative-vs-hard-chrome-v357.webp","imgJpg":"assets/img/article-decorative-vs-hard-chrome-v357.jpg","date":"2026-01-07","titleFa":"کروم تزئینی vs کروم سخت: کجا کدام مناسب است؟","titleEn":"Decorative chrome vs hard chrome: which one to choose","leadFa":"هر دو اسمشان کروم است، اما هدفشان یکی نیست. اگر انتخاب اشتباه کنید، یا هزینه اضافه می‌دهید یا دوام نمی‌گیرید.","leadEn":"Same word, different goals. Pick the wrong one and you either waste budget or lose durability."},{"path":"blog/plating-defects-peeling-blisters/index.html","imgWebp":"assets/img/article-plating-defects-v357.webp","imgJpg":"assets/img/article-plating-defects-v357.jpg","date":"2026-01-07","titleFa":"عیب‌یابی آبکاری: پوسته شدن، تاول و کدرشدن کروم","titleEn":"Plating defect troubleshooting: peeling, blisters, and dull chrome","leadFa":"اگر کروم کدر شد یا آبکاری پوسته داد، قبل از تغییر وان‌ها مسیر تمیزکاری و فعال‌سازی را چک کنید.","leadEn":"If chrome turns dull or peels, check cleaning and activation before changing the entire process."},{"path":"blog/nickel-chrome-on-zamak/index.html","imgWebp":"assets/img/article-nickel-chrome-zamak-v357.webp","imgJpg":"assets/img/article-nickel-chrome-zamak-v357.jpg","date":"2026-01-07","titleFa":"نیکل-کروم روی زاماک: چالش‌ها و مسیر درست آبکاری","titleEn":"Nickel-chrome plating on zamak: challenges and a safer process","leadFa":"زاماک اگر درست آماده نشود، آبکاری را با پوسته شدن و حفره جواب می‌دهد. اینجا مسیر کم‌ریسک‌تر را می‌خوانید.","leadEn":"If zamak is not prepared properly, plating will fail with blisters and pits. Here is a lower-risk workflow."},{"path":"blog/pvd-defects-streaks-pinhole/index.html","imgWebp":"assets/img/article-pvd-defects-v357.webp","imgJpg":"assets/img/article-pvd-defects-v357.jpg","date":"2026-01-07","titleFa":"عیب‌یابی PVD: رگه، لکه و پین‌هول از کجا می‌آید؟","titleEn":"PVD defect troubleshooting: streaks, stains, and pinholes","leadFa":"قبل از اینکه همه‌چیز را گردن دستگاه بیندازید، سه چیز را چک کنید: تمیزی سطح، پولیش، و خروج گاز از قطعه.","leadEn":"Before blaming the machine, check three things: surface cleanliness, polishing, and substrate outgassing."},{"path":"blog/pvd-color-consistency-qc/index.html","imgWebp":"assets/img/article-pvd-color-consistency-v357.webp","imgJpg":"assets/img/article-pvd-color-consistency-v357.jpg","date":"2026-01-07","titleFa":"کنترل کیفیت رنگ PVD: چرا یک رنگ در دو نور متفاوت می‌شود؟","titleEn":"PVD color QC: why the same color shifts under different lighting","leadFa":"اگر مشتری زیر نور فروشگاه یک چیز می‌بیند و در خانه چیز دیگر، احتمالاً مشکل از مدیریت نور و مرجع رنگ است نه صرفاً فرآیند.","leadEn":"If the color looks different in a showroom versus a home, the issue is often lighting control and reference samples, not only the process."}];


/* Kavico v341 — homepage-only features extracted from app.features.js */
// === v64: Page features chunk (loaded only where needed) ===
// --- Homepage: latest articles carousel ---
(function(){
  // Fallback: ensure kavicoJoin exists even if core bundle failed to load
  window.kavicoJoin = window.kavicoJoin || function(p){
    try{
      const dr = document.documentElement.getAttribute('data-root') || './';
      const root = new URL(dr, location.href).toString();
      return new URL(String(p||''), root).toString();
    }catch(e){
      return String(p||'');
    }
	  };
	  var kavicoJoin = window.kavicoJoin;
	  function safeLocalPath(p){
	    return (window.KavicoUtils && window.KavicoUtils.safeLocalPath) ? window.KavicoUtils.safeLocalPath(p, '#') : String(p||'').replace(/index\.html$/i,'');
	  }
	  function safeAssetPath(p){
	    var s = safeLocalPath(p);
	    if (s === '#') return '';
	    /* Asset paths in the article data are root-relative-without-slash
	       ("assets/img/x.webp"). On /en/ they resolved against /en/ and 404'd
	       (image gaps in the English slider); join against data-root instead. */
	    try{ if (!/^(?:\/|[a-z][a-z0-9+.-]*:)/i.test(s)) s = kavicoJoin(s); }catch(_e){}
	    return s;
	  }
	  function escHTML(s){
	    return (window.KavicoUtils && window.KavicoUtils.escapeHTML) ? window.KavicoUtils.escapeHTML(s) : String(s||'').replace(/[&<>"'`]/g, function(ch){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','`':'&#96;'})[ch] || ch; });
	  }


  // ---- Price estimator moved to assets/js/pricing-page.js (v62) ----
// ---- Removed in v62: Knowledge hub filters (handled by hub-page.js) ----
// --- Homepage: render latest articles (carousel) ---
(function(){
  function normalizePath(p){
    if (!p) return '#';
	    return safeLocalPath(p);
  }

  // Only run on pages that have the track
  var trackEl = document.getElementById('latestArticlesGrid');
  if (!trackEl) return;

  function currentLang(){
    var lang = (document.documentElement.getAttribute('lang') || 'fa').toLowerCase();
    return (lang.indexOf('en') === 0) ? 'en' : 'fa';
  }

  function pickText(item, kind, lang){
    try{
      if (!item) return '';
      if (kind === 'title') return (lang === 'en' ? (item.titleEn || '') : (item.titleFa || ''));
      if (kind === 'lead')  return (lang === 'en' ? (item.leadEn  || '') : (item.leadFa  || ''));
      return '';
    }catch(_e){ return ''; }
  }

  function buildDots(dotsEl, count){
    if (!dotsEl) return [];
    dotsEl.innerHTML = '';
    var btns = [];
    for (var i=0;i<count;i++){
      var b = document.createElement('button');
      b.className = 'articlesDot' + (i===0 ? ' is-active' : '');
      b.type = 'button';
      b.setAttribute('data-slide', String(i));
      b.setAttribute('role','tab');
      b.setAttribute('aria-current', i===0 ? 'true' : 'false');
      b.setAttribute('tabindex', i===0 ? '0' : '-1');
      // a11y label is updated after i18n runs; keep a safe default
      b.setAttribute('aria-label', (currentLang()==='en' ? ('Slide ' + (i+1)) : ('اسلاید ' + (i+1))));
      dotsEl.appendChild(b);
      btns.push(b);
    }
    return btns;
  }

  function initCarousel(){
    var wrap = document.querySelector('.articlesCarousel[data-carousel="latestArticles"]');
    if (!wrap) return;

    // If this carousel is re-initialized (e.g., on language change), clean up old timers/listeners first
    try{
      if (wrap.__latestArticlesCleanup) wrap.__latestArticlesCleanup();
    }catch(_e){}
    wrap.__latestArticlesCleanup = null;


    var prev = wrap.querySelector('.articlesNav.prev');
    var next = wrap.querySelector('.articlesNav.next');
    var dotsEl = document.getElementById('latestArticlesDots');

    var slides = Array.prototype.slice.call(trackEl.children);
    var count = slides.length;
    if (!count) return;

    var idx = 0;               // page index
    var pages = 1;
    var perView = 1;
	    var stepPx = 0;

    var timer = null;
    var autoplayMs = 6500;
    var prefersReduced = false;

    try{
      prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }catch(_e){}

    function getPerView(){
      try{
        if (window.matchMedia && window.matchMedia('(min-width: 1020px)').matches) return 3;
        if (window.matchMedia && window.matchMedia('(min-width: 680px)').matches) return 2;
      }catch(_e){}
      return 1;
    }

    function recalc(){
      perView = getPerView();
      pages = Math.max(1, Math.ceil(count / perView));
    }

    function markActive(){
      slides.forEach(function(s,k){
        var start = idx * perView;
        var end = start + perView - 1;
        s.classList.toggle('is-active', (k >= start && k <= end));
      });
    }

    function rebuildDots(){
      recalc();
      var dots = buildDots(dotsEl, pages);
      // overwrite labels for "page" semantics
      dots.forEach(function(d,k){
        try{
          var l = (document.documentElement.getAttribute('lang')||'fa').toLowerCase();
          var isEn = l.indexOf('en')===0;
          d.setAttribute('aria-label', isEn ? ('Page ' + (k+1) + ' of ' + pages) : ('صفحه ' + (k+1) + ' از ' + pages));
        }catch(_e){}
      });
      return dots;
    }

    var dots = rebuildDots();

	    function measureStep(){
	      try{
	        if (!slides || !slides.length) return 0;
	        var first = slides[0];
	        var cs = window.getComputedStyle ? window.getComputedStyle(trackEl) : null;
	        var gap = 0;
	        if (cs){
	          gap = parseFloat(cs.gap || cs.columnGap || cs.rowGap || '0') || 0;
	        }
	        var w = (first.getBoundingClientRect && first.getBoundingClientRect().width) || first.offsetWidth || 0;
	        stepPx = (w + gap) || 0;
	      }catch(_e){ stepPx = 0; }
	      return stepPx;
	    }

	    function setActive(i){
	      recalc();
	      idx = Math.max(0, Math.min(pages - 1, i));
	      measureStep();

	      // Track shift direction must respect document direction.
	      // In RTL, advancing pages should move the track to the right (positive translate),
	      // while in LTR it should move left (negative translate).
	      var dir = (document.documentElement.getAttribute('dir') || 'rtl').toLowerCase();
	      var sign = (dir === 'rtl') ? 1 : -1;
	      // Move by full "pages" (perView cards). Using px avoids drift with gap/padding.
	      if (stepPx > 0){
	        var offset = idx * perView * stepPx * sign;
	        if (window.KavicoMotion) window.KavicoMotion.setTransform(trackEl, 'translate3d(' + offset + 'px,0,0)');
	      }else{
	        var x = sign * (idx * 100);
	        if (window.KavicoMotion) window.KavicoMotion.setTransform(trackEl, 'translateX(' + x + '%)');
	      }

      markActive();

      dots.forEach(function(d,k){
        var active = (k === idx);
        d.classList.toggle('is-active', active);
        d.setAttribute('aria-current', active ? 'true' : 'false');
        d.setAttribute('tabindex', active ? '0' : '-1');
      });
    }

    function go(delta){ setActive(idx + delta); }

    function stop(){
      if (timer){ clearInterval(timer); timer=null; }
    }
    function start(){
      if (prefersReduced) return;
      stop();
      timer = setInterval(function(){ go(1); }, autoplayMs);
    }

    // controls (named handlers so we can safely remove them on re-init)
    function onPrevClick(){ stop(); go(-1); start(); }
    function onNextClick(){ stop(); go(1); start(); }

    // In RTL, some browsers can retarget click when a parent uses pointer capture.
    // Stop swipe handlers from ever seeing pointerdown from the controls.
    function onControlPointerDown(e){
      try{ if (e && e.stopPropagation) e.stopPropagation(); }catch(_e){}
    }

    if (prev) prev.addEventListener('click', onPrevClick);
    if (next) next.addEventListener('click', onNextClick);
    if (prev) prev.addEventListener('pointerdown', onControlPointerDown);
    if (next) next.addEventListener('pointerdown', onControlPointerDown);

    function onDotsClick(e){
      var t = e.target && e.target.closest ? e.target.closest('button[data-slide]') : null;
      if (!t) return;
      var n = parseInt(t.getAttribute('data-slide') || '0', 10);
      stop(); setActive(n); start();
    }
    if (dotsEl){
      dotsEl.addEventListener('click', onDotsClick);
      dotsEl.addEventListener('pointerdown', onControlPointerDown);
    }

    // Keyboard on wrapper
    function onKeydown(e){
      var k = e.key;
      if (k !== 'ArrowLeft' && k !== 'ArrowRight' && k !== 'Home' && k !== 'End') return;
      e.preventDefault();

      var dir = (document.documentElement.getAttribute('dir') || 'rtl').toLowerCase();
      var leftIsPrev = (dir === 'rtl') ? false : true; // rtl reverses semantics

      if (k === 'Home') { stop(); setActive(0); start(); return; }
      if (k === 'End')  { stop(); setActive(pages-1); start(); return; }

      if (k === 'ArrowLeft')  { stop(); go(leftIsPrev ? -1 : 1); start(); }
      if (k === 'ArrowRight') { stop(); go(leftIsPrev ? 1 : -1); start(); }
    }
    wrap.addEventListener('keydown', onKeydown);

    // Swipe / drag
    var down = false, startX = 0, lastX = 0;
    var pointerId = null;

    function isControlTarget(e){
      try{
        var t = e && e.target;
        if (!t) return false;
        if (t.closest) return !!t.closest('.articlesNav, .articlesDots, .articlesDot');
      }catch(_e){}
      return false;
    }

    function onDown(e){
      // Clicking nav/dots should never be hijacked by the swipe handler.
      // On some browsers (and more often in RTL), pointer capture can cause
      // button clicks to be retargeted to the wrapper, making the buttons feel
      // "dead". We simply skip swipe handling for control targets.
      if (isControlTarget(e)) return;
      /* Do NOT capture on pointerdown: with capture set, Chromium retargets the
         eventual click to `wrap`, so article links inside the cards never
         navigate. Capture only once the gesture is clearly a drag (onMove). */
      pointerId = e.pointerId;
      captured = false;
      dragged = false;
      down = true;
      startX = e.clientX || 0;
      lastX = startX;
      stop();
    }
    var captured = false, dragged = false;
    function onMove(e){
      if (!down) return;
      lastX = e.clientX || lastX;
      if (!captured && Math.abs(lastX - startX) > 10){
        captured = true; dragged = true;
        try{ wrap.setPointerCapture(pointerId); }catch(_e){}
      }
    }
    wrap.addEventListener('click', function(e){
      if (dragged){ e.preventDefault(); e.stopPropagation(); dragged = false; }
    }, true);
    function onUp(){
      if (!down) return;
      down = false;
      var dx = (lastX - startX);
	      if (Math.abs(dx) > 42){
	        // Keep physical gesture consistent in both directions:
	        // swipe right => previous, swipe left => next.
	        go(dx > 0 ? -1 : 1);
	      }
      start();
      try{
        if (pointerId != null) wrap.releasePointerCapture(pointerId);
      }catch(_e){}
      pointerId = null;
    }

    wrap.addEventListener('pointerdown', onDown, { passive: true });
    wrap.addEventListener('pointermove', onMove, { passive: true });
    wrap.addEventListener('pointerup', onUp, { passive: true });
    wrap.addEventListener('pointercancel', onUp, { passive: true });

    // Pause on hover/focus
    wrap.addEventListener('mouseenter', stop);
    wrap.addEventListener('mouseleave', start);
    wrap.addEventListener('focusin', stop);
    wrap.addEventListener('focusout', start);

    // Update dots/pages on resize (named handler so we can remove it on re-init)
    var rAF = 0;
    function onResize(){
      cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(function(){
        var oldPages = pages;
        dots = rebuildDots();
        if (idx >= pages) idx = pages - 1;
        // keep active page clamped
        setActive(idx);
      });
    }
    window.addEventListener('resize', onResize, { passive: true });

    // Cleanup hook (used when carousel re-renders)
    wrap.__latestArticlesCleanup = function(){
      try{ stop(); }catch(_e){}
      try{ cancelAnimationFrame(rAF); }catch(_e){}
      try{ if (prev) prev.removeEventListener('click', onPrevClick); }catch(_e){}
      try{ if (next) next.removeEventListener('click', onNextClick); }catch(_e){}
      try{ if (prev) prev.removeEventListener('pointerdown', onControlPointerDown); }catch(_e){}
      try{ if (next) next.removeEventListener('pointerdown', onControlPointerDown); }catch(_e){}
      try{ if (dotsEl) dotsEl.removeEventListener('click', onDotsClick); }catch(_e){}
      try{ if (dotsEl) dotsEl.removeEventListener('pointerdown', onControlPointerDown); }catch(_e){}
      try{ wrap.removeEventListener('keydown', onKeydown); }catch(_e){}

      try{ wrap.removeEventListener('pointerdown', onDown); }catch(_e){}
      try{ wrap.removeEventListener('pointermove', onMove); }catch(_e){}
      try{ wrap.removeEventListener('pointerup', onUp); }catch(_e){}
      try{ wrap.removeEventListener('pointercancel', onUp); }catch(_e){}

      try{ wrap.removeEventListener('mouseenter', stop); }catch(_e){}
      try{ wrap.removeEventListener('mouseleave', start); }catch(_e){}
      try{ wrap.removeEventListener('focusin', stop); }catch(_e){}
      try{ wrap.removeEventListener('focusout', start); }catch(_e){}

      try{ window.removeEventListener('resize', onResize); }catch(_e){}
      wrap.__latestArticlesCleanup = null;
    };

    // Hide controls if not needed
    recalc();
    if (pages <= 1){
      if (prev) prev.setAttribute('hidden','');
      if (next) next.setAttribute('hidden','');
      if (dotsEl) dotsEl.setAttribute('hidden','');
    }

    setActive(0);
    start();
  }

  function renderLatestArticles(){
    // If articles data hasn't loaded yet, retry briefly (order differs across pages)
    if (!Array.isArray(window.KAVIAN_ARTICLES) || !window.KAVIAN_ARTICLES.length){
      // In FA (RTL) the i18n payload can be heavier, and on slower devices deferred
      // scripts might not hydrate instantly. Be a little more patient before giving up.
      renderLatestArticles.__tries = (renderLatestArticles.__tries||0) + 1;
      if (renderLatestArticles.__tries <= 80){
        setTimeout(renderLatestArticles, 120);
      } else {
        try{ var emptyEl = document.getElementById('latestArticlesEmpty'); if (emptyEl) emptyEl.hidden = false; }catch(e){}
      }
      return;
    }
    var list = window.KAVIAN_ARTICLES;
    var emptyEl = document.getElementById('latestArticlesEmpty');

    if (!Array.isArray(list) || !list.length){
      if (emptyEl) emptyEl.hidden = false;
      return;
    }
    if (emptyEl) emptyEl.hidden = true;

    var lang = currentLang();

    var items = list.slice().sort(function(a,b){
      var da = (a && a.date) ? String(a.date) : '';
      var db = (b && b.date) ? String(b.date) : '';
      return db.localeCompare(da);
    }).slice(0,6); // more slides => feels like a real slider

    trackEl.innerHTML = '';
    trackEl.classList.add('articlesTrack--js');

    items.forEach(function(item){
	      var href = normalizePath(item.path);

      var slide = document.createElement('article');
      slide.className = 'article-card article-slide';
      slide.setAttribute('role','listitem');

      var link = document.createElement('a');
      link.href = href;
      link.className = 'article-link';

      var media = document.createElement('div');
      media.className = 'article-media';

      var picture = document.createElement('picture');
	      if (safeAssetPath(item.imgWebp)){
	        var srcW = document.createElement('source');
	        srcW.type = 'image/webp';
	        var webpPath = safeAssetPath(item.imgWebp);
	        srcW.srcset = webpPath.replace(/\.webp$/i,'-480w.webp') + ' 480w, ' + webpPath.replace(/\.webp$/i,'-768w.webp') + ' 768w, ' + webpPath + ' 1200w';
	        srcW.sizes = '(max-width: 679px) 88vw, (max-width: 1019px) 44vw, 380px';
	        picture.appendChild(srcW);
	      }
      var img = document.createElement('img');
      img.loading = 'lazy';
      img.decoding = 'async';
      img.setAttribute('fetchpriority','low');
      img.alt = pickText(item,'title',lang) || (lang==='en' ? 'Article' : 'مقاله');
	      img.src = safeAssetPath(item.imgJpg) || safeAssetPath(item.imgWebp) || '';
      picture.appendChild(img);
      media.appendChild(picture);

      var body = document.createElement('div');
      body.className = 'article-body';

      var h3 = document.createElement('h3');
      h3.className = 'article-title';
      var tSpan = document.createElement('span');
      tSpan.textContent = pickText(item,'title',lang);
      h3.appendChild(tSpan);

      var p = document.createElement('p');
      p.className = 'article-lead';
      var lSpan = document.createElement('span');
      lSpan.textContent = pickText(item,'lead',lang);
      p.appendChild(lSpan);

      var meta = document.createElement('div');
      meta.className = 'article-meta';
      var more = document.createElement('span');
      more.className = 'article-more';
      more.textContent = (lang==='en' ? 'Read' : 'مطالعه');
      meta.appendChild(more);
      var arrow = document.createElement('span');
      arrow.textContent = '↗';
      arrow.setAttribute('aria-hidden','true');
      meta.appendChild(arrow);

      body.appendChild(h3);
      body.appendChild(p);
      body.appendChild(meta);

      link.appendChild(media);
      link.appendChild(body);
      slide.appendChild(link);

      trackEl.appendChild(slide);
    });

    // translate injected nodes
    initCarousel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderLatestArticles, { once: true });
  } else {
    renderLatestArticles();
  }

  // Extra safety: if something delayed article hydration, try once more after full load.
  try{
    window.addEventListener('load', function(){
      try{
        if (trackEl && (!trackEl.children || trackEl.children.length === 0)){
          renderLatestArticles.__tries = 0;
          renderLatestArticles();
        }
      }catch(_e){}
    }, { once: true });
  }catch(_e){}

  // Re-render on language toggle so titles/descriptions update
  try{ window.addEventListener('kavico:langchange', function(){ try{ renderLatestArticles.__tries = 0; renderLatestArticles(); }catch(e){} }); }catch(e){}
})();
})();


// v382: client-side public dictionaries retired; static FA/EN HTML is authoritative.

/* ===== Kavico v28: Draggable Before/After (split reveal via clip-path + subtle wavy divider) ===== */
(() => {
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  const wavePath = (xPct) => {
    const x = xPct;
    const A = 2.2;   // subtle wave amplitude (a bit more visible)
    const steps = 44;
    let d = `M ${x} 0`;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const y = 100 * t;
      const w = Math.sin(t * Math.PI * 4) * A;
      d += ` L ${x + w} ${y}`;
    }
    return d;
  };

  const init = (el) => {
    const fxPath = el.querySelector(".ba__wavePath");
    const handle = el.querySelector(".ba__handle");
    if (!fxPath) return;

    
// v48: Shared stage so both images pan/zoom together (and always fill)
const beforeImg = el.querySelector(".ba__img--before");
const afterWrap = el.querySelector(".ba__after");
if (beforeImg && afterWrap) {
  let stage = el.querySelector(".ba__stage");
  if (!stage) {
    stage = document.createElement("div");
    stage.className = "ba__stage";
    // Put stage behind FX/handle
    el.insertBefore(stage, el.firstChild);
    stage.appendChild(beforeImg);
    stage.appendChild(afterWrap);
  }
}

let isDown = false;
    let pos = 50;

    const render = () => {
      el.setAttribute("data-ba-pos", String(Math.round(pos)));
      fxPath.setAttribute("d", wavePath(pos));
      if (handle) handle.setAttribute("aria-valuenow", String(Math.round(pos)));
    };

    const setFromEvent = (e) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      pos = clamp(x, 0, 100);
      render();
    };

    const onDown = (e) => { window.dispatchEvent(new Event('ba:active'));
      isDown = true;
      el.classList.add("is-dragging");
      try { if (el.setPointerCapture) el.setPointerCapture(e.pointerId); } catch (_) {}
      setFromEvent(e);
      if (e.cancelable) e.preventDefault();
    };

    const onMove = (e) => {
      if (!isDown) return;
      setFromEvent(e);
      if (e.cancelable) e.preventDefault();
    };

    const onUp = () => { window.dispatchEvent(new Event('ba:idle'));
      isDown = false;
      el.classList.remove("is-dragging");
    };

    const onKey = (e) => {
      const step = e.shiftKey ? 10 : 2;
      const k = e.key;
      if (k === "ArrowLeft" || k === "ArrowDown") pos = clamp(pos - step, 0, 100);
      if (k === "ArrowRight" || k === "ArrowUp") pos = clamp(pos + step, 0, 100);
      if (k === "Home") pos = 0;
      if (k === "End") pos = 100;
      if (k === "ArrowLeft" || k === "ArrowRight" || k === "ArrowUp" || k === "ArrowDown" || k === "Home" || k === "End") {
        e.preventDefault();
        e.stopPropagation();
      }
      render();
    };

    el.addEventListener("pointerdown", onDown, { passive: false });
    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });
    if (handle) handle.addEventListener("keydown", onKey);

    el.addEventListener("click", (e) => {
      if (isDown) return;
      setFromEvent(e);
    });

    render();
  };

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".ba").forEach(init);
  });
})();


/* home-coatings-compare.v2.js - Kavico Home A/B Coatings Compare (bilingual) */
(function(){
  const root = document.getElementById('coatingsCompare');
  if(!root) return;

  const currentLang = () => {
    const l = (document.documentElement.getAttribute('lang') || 'fa').toLowerCase();
    return l.startsWith('en') ? 'en' : 'fa';
  };
  const t = (fa, en) => (currentLang()==='en' ? en : fa);

  
  function pill(text, color){
    const span = document.createElement('span');
    span.className = 'cmp-pill';
    if(color){ span.setAttribute('data-pill-tone', color); }
    const dot = document.createElement('span');
    dot.className = 'dot';
    span.appendChild(dot);
    const t = document.createElement('span');
    t.textContent = text;
    span.appendChild(t);
    return span;
  }
const data = {
    gold: {
      key: 'gold',
      titleFa: 'طلایی (PVD)',        titleEn: 'Gold (PVD)',
      badgeFa: 'فینیش دکوراتیو گرم',
      accent: '#f7d26a',      badgeEn: 'Warm decorative finish',
      gradient: 'linear-gradient(135deg,#8a6b17,#f7d26a 45%,#b18a2a)',
      image: 'url("../../img/article-pvd-colors-v357.webp")',
      bestForFa: 'شیرآلات، یراق‌آلات دکوراتیو، قطعات نمایشی',
      bestForEn: 'Faucets, decorative hardware, showcase parts',
      feelFa: 'درخشان و چشمگیر، مناسب سبک‌های لوکس',
      feelEn: 'Bright, eye‑catching, luxury vibe',
      durabilityFa: 'وابسته به زیرکار، آماده‌سازی و شرایط استفاده',
      durabilityEn: 'Depends on substrate, preparation, and service conditions',
      careFa: 'دستمال نرم + شوینده ملایم، پرهیز از اسکاچ زبر',
      careEn: 'Soft cloth + mild cleaner; avoid abrasive pads',
      leadTimeFa: 'پس از بررسی قطعه و تیراژ',
      leadTimeEn: 'Confirmed after reviewing the part and batch size',
      ctaPrimary: { href: 'services/decorative-pvd/', labelFa: 'جزئیات PVD', labelEn: 'PVD details' },
      ctaSecondary:{ href: 'portfolio/', labelFa: 'مشاهده نمونه‌کارها', labelEn: 'View portfolio' }
    },
    smoke: {
      key: 'smoke',
      titleFa: 'دودی (PVD)',        titleEn: 'Smoke / gunmetal (PVD)',
      badgeFa: 'فینیش تیره و مدرن',
      accent: '#7d8790',        badgeEn: 'Dark modern finish',
      gradient: 'linear-gradient(135deg,#111827,#6b7280 45%,#0b1220)',
      image: 'url("../../img/blog-compare.webp")',
      bestForFa: 'شیرآلات مدرن، فضاهای مینیمال، اکسسوری‌های تیره',
      bestForEn: 'Modern faucets, minimal spaces, dark accessories',
      feelFa: 'کنتراست بالا، ظاهر مدرن و صنعتی',
      feelEn: 'High contrast, modern/industrial look',
      durabilityFa: 'وابسته به زیرکار، آماده‌سازی و شرایط استفاده',
      durabilityEn: 'Depends on substrate, preparation, and service conditions',
      careFa: 'تمیزکاری منظم برای جلوگیری از لکه آب',
      careEn: 'Regular wipe to prevent water spots',
      leadTimeFa: 'پس از بررسی قطعه و تیراژ',
      leadTimeEn: 'Confirmed after reviewing the part and batch size',
      ctaPrimary: { href: 'services/decorative-pvd/', labelFa: 'جزئیات PVD', labelEn: 'PVD details' },
      ctaSecondary:{ href: 'contact/#project-brief', labelFa: 'ارسال مشخصات', labelEn: 'Send project details' }
    },
    rosegold: {
      key: 'rosegold',
      titleFa: 'رزگلد (PVD)',       titleEn: 'Rose gold (PVD)',
      badgeFa: 'فینیش گرم دکوراتیو',
      accent: '#ffb4a1',       badgeEn: 'Warm decorative finish',
      gradient: 'linear-gradient(135deg,#7a2d2c,#ffb4a1 45%,#8b3a3a)',
      image: 'url("../../img/blog-luxury-pvd.webp")',
      bestForFa: 'اکسسوری حمام و آشپزخانه، دستگیره‌ها، دکور',
      bestForEn: 'Bath/kitchen accessories, handles, décor',
      feelFa: 'گرم و ترند، مناسب ترکیب با سنگ و چوب',
      feelEn: 'Warm & trendy; pairs well with stone/wood',
      durabilityFa: 'وابسته به زیرکار، آماده‌سازی و شرایط استفاده',
      durabilityEn: 'Depends on substrate, preparation, and service conditions',
      careFa: 'پرهیز از مواد اسیدی قوی و سفیدکننده‌ها',
      careEn: 'Avoid strong acids and bleach',
      leadTimeFa: 'پس از بررسی قطعه و تیراژ',
      leadTimeEn: 'Confirmed after reviewing the part and batch size',
      ctaPrimary: { href: 'services/decorative-pvd/', labelFa: 'جزئیات PVD', labelEn: 'PVD details' },
      ctaSecondary:{ href: 'portfolio/', labelFa: 'مشاهده نمونه‌کارها', labelEn: 'View portfolio' }
    },
    silver: {
      key: 'silver',
      titleFa: 'نقره‌ای (نیکل/کروم)', titleEn: 'Silver (Nickel/Chrome)',
      badgeFa: 'فینیش فلزی کلاسیک',
      accent: '#cbd5e1',    badgeEn: 'Classic metallic finish',
      gradient: 'linear-gradient(135deg,#9ca3af,#f3f4f6 45%,#6b7280)',
      image: 'url("../../img/blog-nickel-chrome.webp")',
      bestForFa: 'قطعات مصرفی، شیرآلات کلاسیک، قطعات صنعتی',
      bestForEn: 'Everyday parts, classic faucets, industrial parts',
      feelFa: 'تمیز و کلاسیک، هماهنگ با اکثر فضاها',
      feelEn: 'Clean & classic; matches most spaces',
      durabilityFa: 'وابسته به زیرکار، ساختار آبکاری و شرایط استفاده',
      durabilityEn: 'Depends on substrate, plating stack, and service conditions',
      careFa: 'شوینده ملایم، خشک‌کردن بعد از شستشو',
      careEn: 'Mild cleaner; dry after washing',
      leadTimeFa: 'پس از بررسی قطعه و تیراژ',
      leadTimeEn: 'Confirmed after reviewing the part and batch size',
      ctaPrimary: { href: 'services/nickel-chrome-plating/', labelFa: 'جزئیات نیکل/کروم', labelEn: 'Nickel/Chrome details' },
      ctaSecondary:{ href: 'contact/#project-brief', labelFa: 'ارسال مشخصات', labelEn: 'Send project details' }
    }
  };

  const selectA = root.querySelector('#coatA');
  const selectB = root.querySelector('#coatB');
  const cardA = root.querySelector('[data-card="A"]');
  const cardB = root.querySelector('[data-card="B"]');
  const table = root.querySelector('#coatCompareTable');
  const tableWrap = table.closest('.compareTableWrap') || root.querySelector('.compareTableWrap');

  if(!selectA || !selectB || !cardA || !cardB || !table) return;

  const getText = (item, key) => item[(currentLang()==='en' ? key + 'En' : key + 'Fa')] || '';

  function fillCard(el, item){
    el.setAttribute('data-coat', item.key || '');

    const titleEl = el.querySelector('[data-title]');
    const badgeEl = el.querySelector('[data-badge]');
    const bestEl  = el.querySelector('[data-bestfor]');
    const feelEl  = el.querySelector('[data-feel]');

    if(titleEl) titleEl.textContent = getText(item,'title');
    if(badgeEl) badgeEl.textContent = getText(item,'badge');
    if(bestEl)  bestEl.textContent  = getText(item,'bestFor');
    if(feelEl)  feelEl.textContent  = getText(item,'feel');

    const pills = el.querySelector('[data-pills]');
    if(pills){
      pills.innerHTML = '';
      const pill = (txt) => {
        const s = document.createElement('span');
        s.className = 'comparePill';
        s.textContent = txt;
        return s;
      };
      pills.appendChild(pill(t('دوام: ','Durability: ') + getText(item,'durability')));
      pills.appendChild(pill(t('نگهداری: ','Care: ') + getText(item,'care')));
      pills.appendChild(pill(t('زمان تحویل: ','Lead time: ') + getText(item,'leadTime')));
    }

    const cta1 = el.querySelector('[data-cta-primary]');
    const cta2 = el.querySelector('[data-cta-secondary]');
    if(cta1){
      cta1.setAttribute('href', item.ctaPrimary.href);
      cta1.textContent = t(item.ctaPrimary.labelFa, item.ctaPrimary.labelEn);
    }
    if(cta2){
      cta2.setAttribute('href', item.ctaSecondary.href);
      cta2.textContent = t(item.ctaSecondary.labelFa, item.ctaSecondary.labelEn);
    }

    // short preview swap animation (CSS-driven)
    try{
      el.classList.remove('is-switching');
      void el.offsetWidth;
      el.classList.add('is-switching');
      clearTimeout(el.__swT);
      el.__swT = setTimeout(function(){ el.classList.remove('is-switching'); }, 520);
    }catch(e){}
  }

  function updateTable(a,b){
    const rows = [
      [t('بهترین کاربرد','Best for'), getText(a,'bestFor'), getText(b,'bestFor')],
      [t('حس ظاهری','Look & feel'), getText(a,'feel'), getText(b,'feel')],
      [t('دوام','Durability'), getText(a,'durability'), getText(b,'durability')],
      [t('نگهداری','Care'), getText(a,'care'), getText(b,'care')],
      [t('زمان تحویل','Lead time'), getText(a,'leadTime'), getText(b,'leadTime')]
    ];
    const tbody = table.querySelector('tbody');
    if(!tbody) return;
    tbody.innerHTML = '';

    
    if (tableWrap) { tableWrap.classList.add('is-ready'); }
rows.forEach(r => {
      const tr = document.createElement('tr');
      const th = document.createElement('th'); th.textContent = r[0];
      const td1 = document.createElement('td'); td1.appendChild(pill(String(r[1]||''), a.key));
      const td2 = document.createElement('td'); td2.appendChild(pill(String(r[2]||''), b.key));

      if(String(r[1]).trim() !== String(r[2]).trim()){
        td1.classList.add('is-diff');
        td2.classList.add('is-diff');
      }

      tr.appendChild(th); tr.appendChild(td1); tr.appendChild(td2);
      tbody.appendChild(tr);
    });
  }

  function apply(){
    const a = data[selectA.value] || data.gold;
    const b = data[selectB.value] || data.smoke;
    fillCard(cardA, a);
    fillCard(cardB, b);
    updateTable(a,b);
  }

  selectA.addEventListener('change', apply);
  selectB.addEventListener('change', apply);

  // Re-apply on language toggle (app.min dispatches a custom event)
  window.addEventListener('kavico:langchange', apply);
  window.addEventListener('kavico:i18n-applied', apply);

  apply();
})();

/* home-animations.v1.js - Quick Start + Coatings Compare micro-animations */
(function(){
  'use strict';
  var body = document.body;
  if(!body || body.getAttribute('data-page') !== 'home') return;

  var reduce = false;
  try{ reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){}

  var targets = [];
  try{
    targets = targets
      .concat([].slice.call(document.querySelectorAll('#start .start-card')))
      .concat([].slice.call(document.querySelectorAll('#coatingsCompare .compareCard')))
      .concat([].slice.call(document.querySelectorAll('#coatingsCompare .compareTableWrap')));
  }catch(e){}

  if(!targets.length) return;

  // mark + stagger delays
  targets.forEach(function(el, i){
    el.classList.add('reveal-item');
    var d = Math.min(i, 8);
    el.classList.add('reveal-delay-' + d);
  });

  if(reduce || !('IntersectionObserver' in window)){
    targets.forEach(function(el){ el.classList.add('is-visible'); });
    return;
  }

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(ent){
      if(ent.isIntersecting){
        ent.target.classList.add('is-visible');
        io.unobserve(ent.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -10% 0px' });

  targets.forEach(function(el){ io.observe(el); });
})();


/* Kavico v345 — carousel runtime loaded only on pages that contain slider markup. */
(function(){'use strict';
  function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn,{once:true});else fn();}
  function reduced(){try{return matchMedia('(prefers-reduced-motion: reduce)').matches;}catch(_e){return false;}}
  function init(container){
    var track=container.querySelector('.slider-track'); if(!track)return;
    var slides=Array.from(track.querySelectorAll('.slide')); if(!slides.length)return;
    var prev=container.querySelector('.slider-nav.prev'),next=container.querySelector('.slider-nav.next');
    function rtl(){try{return getComputedStyle(track).direction==='rtl';}catch(_e){return document.documentElement.dir==='rtl';}}
    function firstIndex(){var r=track.getBoundingClientRect(),edge=rtl()?r.right:r.left,best=0,dist=Infinity;slides.forEach(function(s,i){var x=s.getBoundingClientRect(),e=rtl()?x.right:x.left,d=Math.abs(e-edge);if(d<dist){dist=d;best=i;}});return best;}
    function disabled(btn,val){if(!btn)return;btn.disabled=!!val;btn.classList.toggle('is-disabled',!!val);btn.setAttribute('aria-disabled',val?'true':'false');}
    function sync(){var i=firstIndex();disabled(prev,i<=0);disabled(next,i>=slides.length-1);slides.forEach(function(s,n){s.classList.toggle('is-center',n===i);});}
    function go(step){var i=Math.max(0,Math.min(slides.length-1,firstIndex()+step));try{track.scrollTo({left:slides[i].offsetLeft,behavior:reduced()?'auto':'smooth'});}catch(_e){track.scrollLeft=slides[i].offsetLeft;}track.dataset.pauseUntil=String(Date.now()+4500);setTimeout(sync,180);}
    if(prev)prev.addEventListener('click',function(e){e.preventDefault();if(!prev.disabled)go(-1);});
    if(next)next.addEventListener('click',function(e){e.preventDefault();if(!next.disabled)go(1);});
    var raf=0;track.addEventListener('scroll',function(){if(!raf)raf=requestAnimationFrame(function(){raf=0;sync();});},{passive:true});window.addEventListener('resize',sync,{passive:true});
    var down=false,startX=0,startScroll=0;
    track.addEventListener('pointerdown',function(e){if(e.pointerType==='mouse'&&e.button!==0)return;down=true;startX=e.clientX;startScroll=track.scrollLeft;track.classList.add('active');track.dataset.pauseUntil=String(Date.now()+5000);try{track.setPointerCapture(e.pointerId);}catch(_e){};});
    track.addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-startX;if(Math.abs(dx)>4)track.scrollLeft=startScroll-dx;});
    function end(){down=false;track.classList.remove('active');} track.addEventListener('pointerup',end);track.addEventListener('pointercancel',end);
    sync();setTimeout(sync,300);
    if(track.classList.contains('ceramic-slider')&&!reduced()&&window.matchMedia&&window.matchMedia('(hover:hover) and (pointer:fine)').matches){
      var timer=setInterval(function(){if(document.hidden||Date.now()<Number(track.dataset.pauseUntil||0))return;var i=firstIndex();go(i>=slides.length-1?-i:1);},6500);
      window.addEventListener('pagehide',function(){clearInterval(timer);},{once:true});
    }
  }
  ready(function(){document.querySelectorAll('.slider-container').forEach(init);});
})();


/* Kavico v345 — lazy map embed, only bundled on pages with #map. */
(function(){'use strict';
  function start(){var el=document.getElementById('map');if(!el||el.dataset.mapInit==='1')return;el.dataset.mapInit='1';var lat=(el.dataset.lat||'35.692132').trim(),lng=(el.dataset.lng||'50.997906').trim();var iframe=document.createElement('iframe');iframe.title=document.documentElement.lang==='en'?'Kavico workshop map':'نقشه کارگاه کاویان';iframe.loading='lazy';iframe.referrerPolicy='no-referrer-when-downgrade';iframe.className='kavico-map-iframe';iframe.allowFullscreen=true;iframe.src='https://www.google.com/maps?q='+encodeURIComponent(lat+','+lng)+'&output=embed';el.replaceChildren(iframe);el.classList.add('map-embed-ready');}
  function init(){var el=document.getElementById('map');if(!el)return;if('IntersectionObserver'in window){var io=new IntersectionObserver(function(es){if(es.some(function(e){return e.isIntersecting;})){io.disconnect();start();}},{rootMargin:'300px 0px',threshold:.01});io.observe(el);}else setTimeout(start,700);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();


/* Kavico v345 — home stats only. */
(function(){'use strict';function init(){var stats=Array.from(document.querySelectorAll('.stat-num[data-target]'));if(!stats.length)return;var reduced=false;try{reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;}catch(_e){}function fa(n){if(document.documentElement.lang==='en')return String(n);return String(n).replace(/\d/g,function(x){return '۰۱۲۳۴۵۶۷۸۹'[Number(x)];});}function run(){stats.forEach(function(el){var target=parseInt(el.dataset.target||'0',10);if(reduced){el.textContent=fa(target);return;}var start=performance.now(),dur=900;function tick(now){var p=Math.min(1,(now-start)/dur),v=Math.round(target*(1-Math.pow(1-p,3)));el.textContent=fa(v);if(p<1)requestAnimationFrame(tick);}requestAnimationFrame(tick);});}var section=document.getElementById('stats');if(section&&'IntersectionObserver'in window){var io=new IntersectionObserver(function(es){if(es.some(function(e){return e.isIntersecting;})){io.disconnect();run();}},{threshold:.2});io.observe(section);}else run();}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();})();


/* Kavico v345 — scroll-to-top only where the control exists. */
(function(){'use strict';function init(){var b=document.getElementById('scrollTop');if(!b)return;var tick=false;function sync(){tick=false;b.classList.toggle('hide',(window.scrollY||0)<=500);}window.addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(sync);}},{passive:true});b.addEventListener('click',function(){var r=false;try{r=matchMedia('(prefers-reduced-motion: reduce)').matches;}catch(_e){}window.scrollTo({top:0,behavior:r?'auto':'smooth'});});sync();}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();})();


/* Kavico v353 — FAQ accordion/search with category-group visibility. */
(function(){'use strict';function init(){var items=Array.from(document.querySelectorAll('.faq-item'));if(!items.length)return;items.forEach(function(item){var q=item.querySelector('.faq-q');if(!q)return;q.setAttribute('aria-expanded',item.classList.contains('open')?'true':'false');q.addEventListener('click',function(){var will=!item.classList.contains('open');items.forEach(function(i){i.classList.remove('open');var b=i.querySelector('.faq-q');if(b)b.setAttribute('aria-expanded','false');});if(will){item.classList.add('open');q.setAttribute('aria-expanded','true');}});});}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();})();
