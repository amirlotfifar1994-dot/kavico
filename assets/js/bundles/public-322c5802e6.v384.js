/* v381 article data is loaded from articles-data-42873bea12.v381.js */
try{window.KAVIAN_ARTICLES=window.KAVIAN_ARTICLES||[];}catch(_e){}



window.addEventListener('DOMContentLoaded', function () {
  var root = document.documentElement;
  var postsGrid = document.getElementById('postsGrid');
  if (!postsGrid) return;

  var cards = Array.prototype.slice.call(postsGrid.querySelectorAll('a.card-link'));
  var featuredWrap = document.getElementById('featuredWrap');
  var search = document.getElementById('blogSearch');
  var filtersWrap = document.getElementById('blogFilters');
  var filterButtons = filtersWrap ? Array.prototype.slice.call(filtersWrap.querySelectorAll('.blog-filter')) : [];
  var countEl = document.getElementById('blogCount');
  var sortSelect = document.getElementById('blogSort');
  var sortMode = (sortSelect && sortSelect.value) || 'new';

  function currentLang() {
    return ((root.getAttribute('lang') || 'fa').toLowerCase() === 'en') ? 'en' : 'fa';
  }

  function inferTags(href) {
    var h = (href || '').toLowerCase();
    var tags = [];

    if (h.indexOf('/pvd') !== -1 || h.indexOf('pvd-') !== -1) tags.push('pvd');
    if (h.indexOf('ceramic') !== -1) tags.push('ceramic');

    if (h.indexOf('nickel') !== -1 || h.indexOf('chrome') !== -1 || h.indexOf('plating') !== -1) tags.push('plating');

    if (h.indexOf('polish') !== -1 || h.indexOf('polishing') !== -1) tags.push('polishing');



    if (h.indexOf('surface') !== -1 || h.indexOf('prep') !== -1) tags.push('surface');

    if (h.indexOf('care') !== -1 || h.indexOf('clean') !== -1 || h.indexOf('fingerprint') !== -1 || h.indexOf('durability') !== -1) tags.push('care');

    if (h.indexOf('abs') !== -1 || h.indexOf('pp') !== -1 || h.indexOf('plastic') !== -1 || h.indexOf('glass') !== -1 || h.indexOf('crystal') !== -1 || h.indexOf('zinc') !== -1 || h.indexOf('galvan') !== -1) {
      tags.push('materials');
    }

    if (h.indexOf('quality') !== -1 || h.indexOf('test') !== -1 || h.indexOf('standard') !== -1) tags.push('quality');

    if (
      h.indexOf('anodiz') !== -1 ||
      h.indexOf('ecoat') !== -1 ||
      h.indexOf('phoretic') !== -1 ||
      h.indexOf('electrophoret') !== -1 ||
      h.indexOf('nickel') !== -1 ||
      h.indexOf('chrome') !== -1 ||
      h.indexOf('powder') !== -1 ||
      h.indexOf('electrostatic') !== -1 ||
      h.indexOf('thermal') !== -1 ||
      h.indexOf('spray') !== -1 ||
      h.indexOf('other-coating-methods') !== -1
    ) tags.push('other');

    if (!tags.length) tags.push('other');

    var uniq = [];
    for (var i = 0; i < tags.length; i++) if (uniq.indexOf(tags[i]) === -1) uniq.push(tags[i]);
    return uniq;
  }

  cards.forEach(function (card) {
    var href = card.getAttribute('href') || '';
    card.dataset.tags = inferTags(href).join(',');
    try{
      var k = normHref(href);
      card.dataset.date = dateMap[k] || '';
    }catch(e){ card.dataset.date = ''; }
  });

  // --- v69: attach dates (from articles-data.js) for sorting ---
  function normHref(h){
    h = String(h||'');
    h = h.replace(/^\.\//,'').replace(/^\//,'');
    while(h.startsWith('../')) h=h.slice(3);
    h = h.replace(/index\.html$/i,'');
    if (h && !h.endsWith('/') ) h = h + '/';
    return h;
  }

  var dateMap = {};
  if (Array.isArray(window.KAVIAN_ARTICLES)){
    window.KAVIAN_ARTICLES.forEach(function(a){
      try{
        var k = normHref(a && a.path);
        if (k) dateMap[k] = String(a.date||'');
      }catch(e){}
    });
  }


  // --- Stage 9: card meta (tags + read time) ---
  var TAG_LABELS = {
    fa: {
      pvd: 'PVD',
      ceramic: 'سرامیک',
      surface: 'آماده‌سازی',
      care: 'نگهداری',
      plating: 'آبکاری',
      polishing: 'پرداخت‌کاری',
      materials: 'مواد/پلاستیک/شیشه',
      other: 'روش‌های دیگر',
      quality: 'کیفیت'
    },
    en: {
      pvd: 'PVD',
      ceramic: 'Ceramic',
      surface: 'Surface prep',
      care: 'Care',
      plating: 'Plating',
      polishing: 'Polishing',
      materials: 'Materials',
      other: 'Other',
      quality: 'Quality'
    }
  };

  function estimateReadMin(card){
    try{
      var t = card.querySelector('h3');
      var p = card.querySelector('p');
      var txt = ((t ? t.innerText : '') + ' ' + (p ? p.innerText : '')).trim();
      var words = txt ? txt.split(/\s+/).filter(Boolean).length : 0;
      var m = Math.round(words / 160);
      if (m < 3) m = 3;
      if (m > 9) m = 9;
      return m;
    }catch(e){ return 4; }
  }

  function renderMeta(card){
    if (!card || card.querySelector('.post-meta')) return;
    var body = card.querySelector('.card-body');
    if (!body) return;

    var tags = (card.dataset.tags || '').split(',').map(function(s){return s.trim();}).filter(Boolean);
    var l = currentLang();
    var min = estimateReadMin(card);

    var meta = document.createElement('div');
    meta.className = 'post-meta';

    var tagRow = document.createElement('div');
    tagRow.className = 'post-tags';
    tags.slice(0,2).forEach(function(tag){
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tag-chip';
      btn.setAttribute('data-filter', tag);
      btn.textContent = (TAG_LABELS[l] && TAG_LABELS[l][tag]) ? TAG_LABELS[l][tag] : tag;
      btn.addEventListener('click', function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        activateFilter(tag);
      });
      tagRow.appendChild(btn);
    });

    var time = document.createElement('span');
    time.className = 'read-time';
    time.setAttribute('data-l10n-fa', String(min) + ' دقیقه مطالعه');
    time.setAttribute('data-l10n-en', String(min) + ' min read');
    time.textContent = (l === 'en') ? (String(min) + ' min read') : (String(min) + ' دقیقه مطالعه');

    meta.appendChild(tagRow);
    meta.appendChild(time);

    var before = body.querySelector('.link-more') || null;
    if (before) body.insertBefore(meta, before);
    else body.appendChild(meta);
  }

  function updateMetaLabels(){
    var l = currentLang();
    document.querySelectorAll('#postsGrid .tag-chip').forEach(function(btn){
      var tag = btn.getAttribute('data-filter') || '';
      btn.textContent = (TAG_LABELS[l] && TAG_LABELS[l][tag]) ? TAG_LABELS[l][tag] : btn.textContent;
    });
    document.querySelectorAll('#postsGrid .read-time').forEach(function(el){
      el.textContent = el.getAttribute(l === 'en' ? 'data-l10n-en' : 'data-l10n-fa') || el.textContent;
    });
  }


  function updateSortLabels(){
    if (!sortSelect) return;
    var l = currentLang();
    try{
      Array.prototype.slice.call(sortSelect.options).forEach(function(opt){
        var txt = opt.getAttribute(l === 'en' ? 'data-label-en' : 'data-label-fa');
        if (txt) opt.textContent = txt;
      });
      var lbl = sortSelect.parentElement && sortSelect.parentElement.querySelector('label');
      if (lbl) lbl.textContent = (l === 'en' ? 'Sort' : 'مرتب‌سازی');
    }catch(e){}
  }

  function applyL10n() {
    var l = currentLang();

    filterButtons.forEach(function (btn) {
      btn.textContent = btn.getAttribute(l === 'en' ? 'data-label-en' : 'data-label-fa') || btn.textContent;
    });

    if (search) {
      search.setAttribute('placeholder', search.getAttribute(l === 'en' ? 'data-ph-en' : 'data-ph-fa') || search.getAttribute('placeholder') || '');
    }

    document.querySelectorAll('[data-l10n-fa][data-l10n-en]').forEach(function (el) {
      el.textContent = el.getAttribute(l === 'en' ? 'data-l10n-en' : 'data-l10n-fa') || el.textContent;
    });

    var badge = featuredWrap ? featuredWrap.querySelector('.featured-badge span') : null;
    if (badge) badge.textContent = (l === 'en') ? 'Featured' : 'پیشنهادی';
    var emptyMsg = document.getElementById('blogEmptyMsg');
    if (emptyMsg) emptyMsg.textContent = (l === 'en') ? 'No articles found.' : 'مقاله‌ای با این فیلتر پیدا نشد.';

    updateSortLabels();
  }

  try {
    var mo = new MutationObserver(function () { applyL10n(); updateMetaLabels(); setCount(lastCount || 0); });
    mo.observe(root, { attributes: true, attributeFilter: ['lang', 'dir'] });
  } catch (e) {}
  applyL10n();
  updateMetaLabels();

  var activeFilter = 'all';
  var lastCount = 0;

  function activateFilter(filter){
    var f = (filter || 'all');
    activeFilter = f;
    filterButtons.forEach(function(b){
      var bf = b.getAttribute('data-filter') || 'all';
      if (bf === f) b.classList.add('is-active');
      else b.classList.remove('is-active');
    });
    applyFilters();

    // UX: keep the active chip visible on mobile
    try{
      var activeBtn = filtersWrap ? filtersWrap.querySelector('.blog-filter.is-active') : null;
      if (activeBtn && window.innerWidth < 720) activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }catch(e){}
  }


  function normalize(str) {
    return (str || '').toString().toLowerCase().trim();
  }

  function matchesSearch(card, q) {
    if (!q) return true;
    var t = card.querySelector('h3');
    var p = card.querySelector('p');
    var title = normalize(t ? t.innerText : '');
    var lead = normalize(p ? p.innerText : '');
    return title.indexOf(q) !== -1 || lead.indexOf(q) !== -1;
  }

  function matchesFilter(card) {
    if (activeFilter === 'all') return true;
    var tags = (card.dataset.tags || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    return tags.indexOf(activeFilter) !== -1;
  }

  function setCount(n) {
    lastCount = n;
    if (!countEl) return;
    var l = currentLang();
    var tpl = countEl.getAttribute(l === 'en' ? 'data-en-template' : 'data-fa-template') || '{n}';
    countEl.textContent = tpl.replace('{n}', String(n));
  }

  function setFeatured(card) {
    if (!featuredWrap) return;
    featuredWrap.innerHTML = '';
    if (!card) {
      featuredWrap.innerHTML = '<div class="blog-empty" id="blogEmpty"><p id="blogEmptyMsg"></p></div>';
      applyL10n();
      return;
    }

    var clone = card.cloneNode(true);
    clone.classList.add('featured-card');

    var body = clone.querySelector('.card-body');
	    if (body) {
	      var badge = document.createElement('div');
	      badge.className = 'featured-badge';
	      var badgeText = document.createElement('span');
	      badgeText.textContent = currentLang() === 'en' ? 'Featured' : 'پیشنهادی';
	      badge.appendChild(badgeText);
	      body.insertBefore(badge, body.firstChild);
	    }

    featuredWrap.appendChild(clone);
  }

  function applyFilters() {
    var q = normalize(search ? search.value : '');
    var visible = [];
    cards.forEach(function (card) {
      // ensure meta exists (tags + read time)
      renderMeta(card);
      var show = matchesFilter(card) && matchesSearch(card, q);
      card.hidden = !show;
      if (show) visible.push(card);
    });

    // apply sorting
    sortMode = (sortSelect && sortSelect.value) || sortMode || 'new';
    function titleOf(card){
      var t = card.querySelector('h3');
      return normalize(t ? t.innerText : '');
    }
    function dateOf(card){
      return String((card.dataset && card.dataset.date) ? card.dataset.date : '');
    }
    visible.sort(function(a,b){
      if (sortMode === 'old') return dateOf(a).localeCompare(dateOf(b));
      if (sortMode === 'az') return titleOf(a).localeCompare(titleOf(b));
      if (sortMode === 'za') return titleOf(b).localeCompare(titleOf(a));
      return dateOf(b).localeCompare(dateOf(a));
    });
    try{
      var frag = document.createDocumentFragment();
      visible.forEach(function(c){ frag.appendChild(c); });
      postsGrid.appendChild(frag);
    }catch(e){}

    setCount(visible.length);
    setFeatured(visible[0] || null);
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      activateFilter(btn.getAttribute('data-filter') || 'all');
    });
  });

  if (sortSelect){
    sortSelect.addEventListener('change', function(){
      sortMode = sortSelect.value || 'new';
      applyFilters();
    });
  }

  if (search) {
    var __deb = (window.KavicoUtils && window.KavicoUtils.debounce) ? window.KavicoUtils.debounce : function(fn, delay){
      var t; delay = (typeof delay==='number')?delay:250;
      return function(){ var ctx=this, args=arguments; clearTimeout(t); t=setTimeout(function(){ fn.apply(ctx,args); }, delay); };
    };
    search.addEventListener('input', __deb(applyFilters, 300));
  }

  applyFilters();
});
