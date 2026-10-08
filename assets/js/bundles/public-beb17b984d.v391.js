/* Kavico v343 guide-only related content features */
(function(){
window.kavicoJoin=window.kavicoJoin||function(p){try{var dr=document.documentElement.getAttribute('data-root')||'./';var root=new URL(dr,location.href).toString();return new URL(String(p||''),root).toString();}catch(e){return String(p||'');}};
function safeLocalPath(p){return(window.KavicoUtils&&window.KavicoUtils.safeLocalPath)?window.KavicoUtils.safeLocalPath(p,'#'):String(p||'').replace(/index\.html$/i,'');}
function safeAssetPath(p){var s=safeLocalPath(p);return s==='#'?'':s;}
function escHTML(s){return(window.KavicoUtils&&window.KavicoUtils.escapeHTML)?window.KavicoUtils.escapeHTML(s):String(s||'').replace(/[&<>"'`]/g,function(ch){return({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','`':'&#96;'})[ch]||ch;});}
// --- v65: Upgrade blog/related grids to a pro slider (based on blog-slider.html) ---
function enhanceBlogSliders(root){
  try{
    var scope = root || document;
    var grids = Array.prototype.slice.call(scope.querySelectorAll('.posts-grid, .related-posts-grid'));
    if (!grids.length) return;

    grids.forEach(function(grid){
      try{
        if (!grid || grid.__kavSliderReady) return;
        if (grid.closest && grid.closest('.kavBlogSlider')) return;

        // Don't convert the main blog listing into a slider.
        // Users want to scan a grid, not play "find the next button" for 20+ posts.
        if (grid.id === 'postsGrid' || grid.getAttribute('data-no-slider') === 'true') return;

        var cards = Array.prototype.slice.call(grid.children).filter(function(n){ return n && n.nodeType === 1; });
        if (cards.length <= 3) return; // keep grid when small

        // Build slider shell (progressive enhancement)
        var wrap = document.createElement('div');
        wrap.className = 'kavBlogSlider';
        wrap.setAttribute('data-slider','blog');

        var viewport = document.createElement('div');
        viewport.className = 'kavBlogViewport';

        var controls = document.createElement('div');
        controls.className = 'kavBlogControls';

        var prev = document.createElement('button');
        prev.type = 'button';
        prev.className = 'kavBlogNav prev';
        prev.setAttribute('aria-label', (document.documentElement.lang||'fa').toLowerCase().startsWith('en') ? 'Previous' : 'قبلی');
        prev.innerHTML = '<span aria-hidden="true">‹</span>';

        var next = document.createElement('button');
        next.type = 'button';
        next.className = 'kavBlogNav next';
        next.setAttribute('aria-label', (document.documentElement.lang||'fa').toLowerCase().startsWith('en') ? 'Next' : 'بعدی');
        next.innerHTML = '<span aria-hidden="true">›</span>';

        var dots = document.createElement('div');
        dots.className = 'kavBlogDots';

        controls.appendChild(prev);
        controls.appendChild(next);

        // Replace grid with wrap
        var parent = grid.parentNode;
        parent.insertBefore(wrap, grid);
        viewport.appendChild(grid);
        wrap.appendChild(viewport);
        wrap.appendChild(controls);
        wrap.appendChild(dots);

        // Turn the grid into a track
        grid.classList.add('kavBlogTrack');
        grid.__kavSliderReady = true;

        // Slider runtime
        (function initKavBlogSlider(){
          var idx = 0;
          var perView = 1;
          var pages = 1;
          var stepPx = 0;
          var down = false, startX = 0, lastX = 0;

          function getPerView(){
            try{
              if (window.matchMedia && window.matchMedia('(min-width: 1020px)').matches) return 3;
              if (window.matchMedia && window.matchMedia('(min-width: 680px)').matches) return 2;
            }catch(_e){}
            return 1;
          }

          function recalc(){
            perView = getPerView();
            cards = Array.prototype.slice.call(grid.children).filter(function(n){ return n && n.nodeType === 1; });
            pages = Math.max(1, Math.ceil(cards.length / perView));
          }

          function measureStep(){
            try{
              if (!cards || !cards.length) return 0;
              var first = cards[0];
              var cs = window.getComputedStyle ? window.getComputedStyle(grid) : null;
              var gap = cs ? (parseFloat(cs.gap || cs.columnGap || cs.rowGap || '0') || 0) : 0;
              var w = (first.getBoundingClientRect && first.getBoundingClientRect().width) || first.offsetWidth || 0;
              stepPx = (w + gap) || 0;
            }catch(_e){ stepPx = 0; }
            return stepPx;
          }

          function buildDots(){
            dots.innerHTML = '';
            for (var i=0;i<pages;i++){
              var b = document.createElement('button');
              b.type = 'button';
              b.className = 'kavBlogDot' + (i===0 ? ' is-active' : '');
              b.setAttribute('data-slide', String(i));
              b.setAttribute('aria-current', i===0 ? 'true' : 'false');
              b.setAttribute('aria-label', (document.documentElement.lang||'fa').toLowerCase().startsWith('en') ? ('Page ' + (i+1)) : ('صفحه ' + (i+1)));
              dots.appendChild(b);
            }
          }

          function setActive(i){
            recalc();
            idx = Math.max(0, Math.min(pages - 1, i));
            measureStep();

            // Same rationale as homepage carousel: respect document direction.
            var dir = (document.documentElement.getAttribute('dir') || 'rtl').toLowerCase();
            var sign = (dir === 'rtl') ? 1 : -1;
            if (stepPx > 0){
              var offset = idx * perView * stepPx * sign;
              if (window.KavicoMotion) window.KavicoMotion.setTransform(grid, 'translate3d(' + offset + 'px,0,0)');
            }else{
              if (window.KavicoMotion) window.KavicoMotion.setTransform(grid, 'translateX(' + (sign * (idx * 100)) + '%)');
            }

            var btns = Array.prototype.slice.call(dots.querySelectorAll('button[data-slide]'));
            btns.forEach(function(d,k){
              var active = (k === idx);
              d.classList.toggle('is-active', active);
              d.setAttribute('aria-current', active ? 'true' : 'false');
            });

            try{ prev.disabled = (idx <= 0); next.disabled = (idx >= pages - 1); }catch(_e){}
          }

          function go(delta){ setActive(idx + delta); }

          function onPrev(){ go(-1); }
          function onNext(){ go(1); }
          function onDotsClick(e){
            var t = e.target && e.target.closest ? e.target.closest('button[data-slide]') : null;
            if (!t) return;
            var n = parseInt(t.getAttribute('data-slide') || '0', 10);
            setActive(n);
          }

          function isControlTarget(e){
            try{
              var t = e && e.target;
              if (!t) return false;
              if (t.closest) return !!t.closest('.kavBlogNav, .kavBlogDots, .kavBlogDot');
            }catch(_e){}
            return false;
          }

          function onDown(e){
            // Clicking controls shouldn't start a swipe gesture (esp. in RTL)
            if (isControlTarget(e)) return;
            down = true; startX = e.clientX || 0; lastX = startX;
          }
          function onMove(e){ if (!down) return; lastX = e.clientX || lastX; }
          function onUp(){
            if (!down) return;
            down = false;
            var dx = (lastX - startX);
            if (Math.abs(dx) > 42){ go(dx > 0 ? -1 : 1); }
          }

          var rAF = 0;
          function onResize(){
            cancelAnimationFrame(rAF);
            rAF = requestAnimationFrame(function(){
              recalc();
              buildDots();
              if (idx >= pages) idx = pages - 1;
              setActive(idx);
            });
          }

          prev.addEventListener('click', onPrev);
          next.addEventListener('click', onNext);
          dots.addEventListener('click', onDotsClick);
          wrap.addEventListener('pointerdown', onDown, {passive:true});
          wrap.addEventListener('pointermove', onMove, {passive:true});
          wrap.addEventListener('pointerup', onUp, {passive:true});
          wrap.addEventListener('pointercancel', onUp, {passive:true});
          window.addEventListener('resize', onResize, {passive:true});

          recalc();
          buildDots();
          setActive(0);

          // When only one page, hide controls
          if (pages <= 1){
            try{ controls.hidden = true; dots.hidden = true; }catch(_e){}
          }
        })();

      }catch(_e){}
    });
  }catch(_e){}
}

document.addEventListener('DOMContentLoaded', function(){
  // let other renderers populate first
  setTimeout(function(){ enhanceBlogSliders(document); }, 60);
});

// --- v54: Guides pages related posts (cluster support) ---
function renderGuideRelated(){
  const grids = Array.from(document.querySelectorAll('.related-posts-grid[data-related-for]'));
  if (!grids.length) return;
  const items = Array.isArray(window.KAVIAN_ARTICLES) ? window.KAVIAN_ARTICLES : [];
  if (!items.length) return;
  const root = (window.__KAVICO_ROOT || document.documentElement.getAttribute('data-root') || './');

  // Fallback text: keep related cards readable even if i18n JSON cannot be fetched (e.g., file:// preview)
  const lang = (document.documentElement.getAttribute('lang') || 'fa').toLowerCase().startsWith('en') ? 'en' : 'fa';
  const pickText = (a, kind)=>{
    if (!a) return '';
    if (kind === 'title') return (lang === 'en' ? (a.titleEn || '') : (a.titleFa || ''));
    if (kind === 'lead')  return (lang === 'en' ? (a.leadEn  || '') : (a.leadFa  || ''));
    return '';
  };

  function pickFn(slug){
    const s = String(slug||'').toLowerCase();
    if (s === 'pvd-coating') return (a)=>/\bpvd\b|pvd-/i.test(a.path);
    if (s === 'nickel-chrome-plating') return (a)=>/(nickel|chrome|plating)/i.test(a.path);
    if (s === 'polishing') return (a)=>/(polish|polishing)/i.test(a.path);
    return ()=>false;
  }

	  function cardHTML(a){
	    const href = root + safeLocalPath(a.path);
	    const imgWebp = safeAssetPath(a.imgWebp) ? root + safeAssetPath(a.imgWebp) : '';
	    const imgJpg = safeAssetPath(a.imgJpg) ? root + safeAssetPath(a.imgJpg) : '';
			    const title = pickText(a,'title');
	    const lead = pickText(a,'lead');
	    return `
	<a class="post-card" href="${escHTML(href)}">
	  <div class="post-card-media">
	    <picture>
	      ${imgWebp ? `<source type="image/webp" srcset="${escHTML(imgWebp.replace(/\.webp$/i,'-480w.webp'))} 480w, ${escHTML(imgWebp.replace(/\.webp$/i,'-768w.webp'))} 768w, ${escHTML(imgWebp)} 1200w" sizes="(max-width: 679px) 88vw, (max-width: 1019px) 44vw, 380px">` : ``}
	      <img loading="lazy" decoding="async" src="${escHTML(imgJpg || imgWebp)}" alt="${escHTML(title || (lang==='en'?'Article':'مقاله'))}" />
	    </picture>
	  </div>
	  <div class="post-card-content">
	    <h3 class="post-title">${escHTML(title)}</h3>
	    <p class="post-excerpt">${escHTML(lead)}</p>
	    <span class="post-cta">${lang==='en'?'Read more':'مطالعه'}</span>
	  </div>
	</a>`;
  }

  grids.forEach((grid)=>{
    const slug = grid.getAttribute('data-related-for');
    const pick = pickFn(slug);
    const picks = items.filter(pick).slice(0, 6);
    if (!picks.length) return;
    grid.innerHTML = picks.map(cardHTML).join('');
    try{ if (typeof ensurePostCardButtons === 'function') ensurePostCardButtons(); }catch(e){}
	    try{ enhanceBlogSliders(grid.parentElement || document); }catch(e){}
  });
}
document.addEventListener('DOMContentLoaded', renderGuideRelated);

})();


/* Kavico v353 — FAQ accordion/search with category-group visibility. */
(function(){'use strict';function init(){var items=Array.from(document.querySelectorAll('.faq-item'));if(!items.length)return;items.forEach(function(item){var q=item.querySelector('.faq-q');if(!q)return;q.setAttribute('aria-expanded',item.classList.contains('open')?'true':'false');q.addEventListener('click',function(){var will=!item.classList.contains('open');items.forEach(function(i){i.classList.remove('open');var b=i.querySelector('.faq-q');if(b)b.setAttribute('aria-expanded','false');});if(will){item.classList.add('open');q.setAttribute('aria-expanded','true');}});});}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();})();
