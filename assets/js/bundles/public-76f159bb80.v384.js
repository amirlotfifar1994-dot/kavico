/* Kavico v343 article-only features extracted from legacy app.features.js */
/* Article TOC: build from headings + smooth scroll + i18n sync */
(function(){
  function normText(t){
    return (t || '').replace(/\s+/g, ' ').trim();
  }

  function isEn(){
    try{
      return (document.documentElement.getAttribute('lang') || 'fa').toLowerCase().indexOf('en') === 0;
    }catch(_e){ return false; }
  }

  function ensureTOCShell(articleBody){
    var toc = document.querySelector('.article-toc[data-toc="article"]');
    if (toc) return toc;
    if (!articleBody) return null;

    // Progressive enhancement: inject a minimal TOC container.
    toc = document.createElement('details');
    toc.className = 'article-toc';
    toc.setAttribute('data-toc','article');

    try{
      // Open by default on desktop (better UX), closed on mobile.
      toc.open = !!(window.matchMedia && window.matchMedia('(min-width: 900px)').matches);
    }catch(_e){}

    var summary = document.createElement('summary');
    summary.className = 'toc-summary';
    summary.textContent = isEn() ? 'Table of contents' : 'فهرست مطالب';
    toc.appendChild(summary);

    var ol = document.createElement('ol');
    ol.className = 'toc-list';
    ol.setAttribute('data-toc-list','');
    toc.appendChild(ol);

    // Insert as the first thing in the article body.
    articleBody.insertBefore(toc, articleBody.firstChild);
    return toc;
  }

  function buildArticleTOC(){
    var scope = document.querySelector('.article-body');
    if(!scope) return;

    var headings = Array.prototype.slice.call(scope.querySelectorAll('h2, h3'))
      .filter(function(h){ return h && (h.id || normText(h.textContent)) && !h.closest('.article-toc'); });

    // If headings are too few, hide any existing TOC and bail.
    if (headings.length < 2){
      var old = document.querySelector('.article-toc[data-toc="article"]');
      if (old) old.hidden = true;
      return;
    }

    var toc = ensureTOCShell(scope);
    if(!toc) return;
    toc.hidden = false;

    // Keep summary text in sync with language toggles.
    try{
      var s = toc.querySelector('summary');
      if (s) s.textContent = isEn() ? 'Table of contents' : 'فهرست مطالب';
    }catch(_e){}

    var list = toc.querySelector('[data-toc-list]') || toc.querySelector('.toc-list');
    if(!list) return;

    // Assign stable ids if missing
    var seq = 1;
    headings.forEach(function(h){
      if(!h.id){
        h.id = 'section-' + (seq++);
      }
    });

    // Rebuild list (so it matches current language)
    list.innerHTML = '';
    var count = 0;

    headings.forEach(function(h){
      var text = normText(h.textContent);
      if(!text) return;

      var li = document.createElement('li');
      var a  = document.createElement('a');
      a.setAttribute('href', '#' + h.id);
      a.textContent = text;
      li.appendChild(a);
      list.appendChild(li);
      count++;
    });

    // Hide TOC if it would be silly (0/1 item)
    toc.hidden = (count < 2);
  }

  function updateReadTime(){
    var article = document.querySelector('.article');
    if (!article) return;
    var body = article.querySelector('.article-body');
    var meta = article.querySelector('.article-header .article-meta');
    if (!body || !meta) return;

    var txt = normText(body.textContent || '');
    if (!txt) return;

    // Rough estimate: 190 wpm works decently for both fa/en.
    var words = txt.split(/\s+/).filter(Boolean).length;
    var minutes = Math.max(1, Math.ceil(words / 190));

    var el = meta.querySelector('[data-readtime]');
    if (!el){
      el = document.createElement('span');
      el.className = 'meta-item meta-readtime';
      el.setAttribute('data-readtime','');
      meta.appendChild(el);
    }
    el.textContent = isEn() ? ('Reading time: ' + minutes + ' min') : ('زمان مطالعه: ' + minutes + ' دقیقه');
  }

  function smoothScrollToHash(hash){
    if(!hash || hash.length < 2) return;
    var id = '';
    try{ id = decodeURIComponent(hash.slice(1)); }catch(e){ id = hash.slice(1); }
    if(!id) return;

    var el = document.getElementById(id);
    if(!el) return;

    var header = document.querySelector('header.header, .header, header');
    var offset = header ? (Math.ceil(header.getBoundingClientRect().height) + 12) : 0;

    try{
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if(offset){
        window.setTimeout(function(){ window.scrollBy(0, -offset); }, 0);
      }
    }catch(e){
      location.hash = '#' + id;
    }
  }

  function wireTOCClicks(){
    document.addEventListener('click', function(e){
      var a = e.target && e.target.closest ? e.target.closest('.article-toc a[href^="#"]') : null;
      if(!a) return;

      var href = a.getAttribute('href') || '';
      if(href.charAt(0) !== '#') return;

      e.preventDefault();

      // Update URL without a hard jump
      try{
        if(history && history.pushState){
          history.pushState(null, '', href);
        }else{
          location.hash = href;
        }
      }catch(_e){}

      smoothScrollToHash(href);
    }, { passive: false });
  }

  function init(){
    buildArticleTOC();
    updateReadTime();
    wireTOCClicks();

    // If page opened with a hash, respect it (with header offset)
    if(location && location.hash){
      window.setTimeout(function(){ smoothScrollToHash(location.hash); }, 60);
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  }else{
    init();
  }

  // Rebuild on language updates so TOC text follows headings
  window.addEventListener('kavico:langchange', function(){ window.setTimeout(function(){ buildArticleTOC(); updateReadTime(); }, 80); });
  window.addEventListener('kavico:i18n-applied', function(){ window.setTimeout(function(){ buildArticleTOC(); updateReadTime(); }, 0); });
})();



// --- v48: Related cards: add CTA button + keep it translated ---
(function(){
  // v63: feature gating - only run where post cards exist
  if (!document.querySelector('.posts-grid .post-card')) return;
  function ensurePostCardButtons(){
    try{
      var cards = document.querySelectorAll('.posts-grid .post-card');
      if (!cards || !cards.length) return;
      cards.forEach(function(card){
        if (!card || card.querySelector('.post-card-btn')) return;
        var inner = card.querySelector('.post-card-inner') || card;
        var footer = document.createElement('div');
        footer.className = 'post-card-footer';
        var btn = document.createElement('span');
        btn.className = 'post-card-btn';
        btn.textContent = (document.documentElement.lang||'fa').toLowerCase().indexOf('en')===0 ? 'Read article' : 'مطالعه مقاله';
        footer.appendChild(btn);
        inner.appendChild(footer);
      });
    }catch(e){}
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ensurePostCardButtons);
  } else {
    ensurePostCardButtons();
  }

  // If language changes, text inside the CTA should translate too
  try{ window.addEventListener('kavico:i18n-applied', ensurePostCardButtons); }catch(e){}
})();





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
