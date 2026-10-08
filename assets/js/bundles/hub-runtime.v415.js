/* KAVICO Hub runtime v415: locale-safe routing + progressive-enhancement support. */
/* v381 article data is loaded from articles-data-42873bea12.v381.js */
try{window.KAVIAN_ARTICLES=window.KAVIAN_ARTICLES||[];}catch(_e){}



(function(){
  function norm(p){return String(p||'').replace(/index\.html$/i,'');}
  function rootBase(){
    var r = document.documentElement.getAttribute('data-root') || '';
    return r;
  }
  function join(p){
    if (!p) return '';
    if (/^https?:/i.test(p) || p.startsWith('#')) return p;
    var clean=String(p).replace(/^\/+/, '');
    // Assets always live at the public root, including on English pages.
    if (clean.startsWith('assets/')) return (rootBase() || '../') + clean;
    // Content paths are locale-aware. v391 sent English hub cards to Persian
    // URLs and left guides/ as /hub/guides/...; v415 fixes both cases.
    if (/^(blog|guides|services|compare|tools|contact|portfolio|quality|process|faq|tehran|karaj)\//.test(clean) || /^(contact|portfolio|quality|process|faq|tehran|karaj)$/.test(clean)){
      if (currentLang()==='en') return '/en/' + clean;
      return (rootBase() || '../') + clean;
    }
    return p;
  }
  function deriveTags(p){
    var s=String(p||'').toLowerCase();
    var tags=[];
    var add=function(t){ if(tags.indexOf(t)===-1) tags.push(t); };
    if (s.includes('pvd')) add('pvd');
    if (s.includes('abs') || s.includes('pp') || s.includes('plastic')) add('plastic');
    if (s.includes('glass') || s.includes('crystal')) add('glass');
    if (s.includes('powder') || s.includes('electrostatic') || s.includes('paint')) add('painting');
    if (s.includes('plating') || s.includes('nickel') || s.includes('chrome')) add('plating');
    if (s.includes('polish') || s.includes('polishing')) add('polishing');
    if (s.includes('luxury') || s.includes('decorative')) add('decorative');
    if (s.includes('quality') || s.includes('surface') || s.includes('industrial')) add('industrial');
    if (!tags.length) add('pvd');
    return tags;
  }
  function currentLang(){
    return (document.documentElement.getAttribute('lang')||'fa').toLowerCase().startsWith('en') ? 'en' : 'fa';
  }
  function formatDate(iso){
    if (typeof window.formatISODate==='function') return window.formatISODate(iso, currentLang());
    return iso||'';
  }

  function render(){
    var grid=document.getElementById('hubGrid');
    if(!grid) return;
    var list=window.KAVIAN_ARTICLES;
    if(!Array.isArray(list) || !list.length) return;

    if (!grid.querySelector('.post-card')){
      var items=list.slice().sort(function(a,b){
        var da=(a&&a.date)?String(a.date):'';
        var db=(b&&b.date)?String(b.date):'';
        return db.localeCompare(da);
      });

      var frag=document.createDocumentFragment();
      items.forEach(function(a){
        var card=document.createElement('a');
        card.className='card card-link post-card';
        card.href=join(norm(a.path||a.href||''));
        card.setAttribute('data-tags', deriveTags(a.path||a.href||'').join(' '));
        card.setAttribute('data-date', String(a.date||''));
        card.setAttribute('data-title-fa', a.titleFa||'');
        card.setAttribute('data-title-en', a.titleEn||'');
        card.setAttribute('data-lead-fa', a.leadFa||'');
        card.setAttribute('data-lead-en', a.leadEn||'');

        var media=document.createElement('div');
        media.className='card-media zoom-wrap';
        var pic=document.createElement('picture');
        if (a.imgWebp){
          var s=document.createElement('source');
          s.type='image/webp';
          var webp=join(a.imgWebp);
          s.srcset=webp.replace(/\.webp$/i,'-480w.webp')+' 480w, '+webp.replace(/\.webp$/i,'-768w.webp')+' 768w, '+webp+' 1200w';
          s.sizes='(max-width: 679px) 88vw, (max-width: 1019px) 44vw, 380px';
          pic.appendChild(s);
        }
        var img=document.createElement('img');
        img.loading='lazy';
        img.decoding='async';
        img.setAttribute('fetchpriority','low');
        img.alt=currentLang()==='en'?(a.titleEn||'Article image'):(a.titleFa||'تصویر مقاله');
        img.width=1200; img.height=675;
        img.src=join(a.imgJpg||a.imgWebp||'');
        pic.appendChild(img);
        media.appendChild(pic);

        var body=document.createElement('div');
        body.className='card-body';
        var h3=document.createElement('h3');
        var ts=document.createElement('span');
        ts.textContent=currentLang()==='en'?(a.titleEn||''):(a.titleFa||'');
        h3.appendChild(ts);
        var p=document.createElement('p');
        var ls=document.createElement('span');
        ls.textContent=currentLang()==='en'?(a.leadEn||''):(a.leadFa||'');
        p.appendChild(ls);
        var meta=document.createElement('div');
        meta.className='mini-meta';
        var d=document.createElement('span');
        d.textContent=formatDate(a.date);
        meta.appendChild(d);
        var more=document.createElement('span');
        more.className='link-more';
        more.textContent='→';
        more.setAttribute('aria-hidden','true');
        meta.appendChild(more);

        body.appendChild(h3);
        body.appendChild(p);
        body.appendChild(meta);

        card.appendChild(media);
        card.appendChild(body);
        frag.appendChild(card);
      });
      grid.appendChild(frag);
    }

    // filters
    var chips=[].slice.call(document.querySelectorAll('.hub-filters .chip'));
    var countEl=document.querySelector('[data-hub-count]');
    var emptyEl=document.querySelector('[data-hub-empty]');
    var searchInput=document.getElementById('hubSearch');
    var sortSelect=document.getElementById('hubSort');
    var sortMode=(sortSelect && sortSelect.value)||'new';
    var query='';
    var tag='all';
    var normText=(window.KavicoUtils&&window.KavicoUtils.normalize)?window.KavicoUtils.normalize:function(s){return String(s||'').toLowerCase().trim();};

    try{
      var sp=new URLSearchParams(location.search);
      tag=sp.get('tag') || (location.hash?location.hash.slice(1):'') || 'all';
      tag=String(tag||'all').toLowerCase();
    }catch(e){}
    var allowed=['all','pvd','plastic','glass','painting','plating','polishing','industrial','decorative'];
    if(allowed.indexOf(tag)===-1) tag='all';

    function getCardText(card){
      var lang=currentLang();
      var t=card.getAttribute(lang==='en'?'data-title-en':'data-title-fa')||'';
      var l=card.getAttribute(lang==='en'?'data-lead-en':'data-lead-fa')||'';
      return normText(t+' '+l);
    }
    function updateSortLabels(){
      if(!sortSelect) return;
      var l=currentLang();
      try{
        Array.prototype.slice.call(sortSelect.options).forEach(function(opt){
          var txt=opt.getAttribute(l==='en'?'data-label-en':'data-label-fa');
          if(txt) opt.textContent=txt;
        });
        var lbl=sortSelect.parentElement&&sortSelect.parentElement.querySelector('label');
        if(lbl) lbl.textContent=(l==='en'?'Sort':'مرتب‌سازی');
      }catch(e){}
    }
    function sortCards(){
      if(!sortSelect) return;
      sortMode=sortSelect.value||'new';
      var cards=[].slice.call(grid.querySelectorAll('.post-card'));
      var l=currentLang();
      function tOf(c){return(c.getAttribute(l==='en'?'data-title-en':'data-title-fa')||'').toLowerCase();}
      function dOf(c){return String(c.getAttribute('data-date')||'');}
      cards.sort(function(a,b){
        if(sortMode==='old') return dOf(a).localeCompare(dOf(b));
        if(sortMode==='az') return tOf(a).localeCompare(tOf(b));
        if(sortMode==='za') return tOf(b).localeCompare(tOf(a));
        return dOf(b).localeCompare(dOf(a));
      });
      var frag=document.createDocumentFragment();
      cards.forEach(function(c){frag.appendChild(c);});
      grid.appendChild(frag);
    }
    function apply(activeTag){
      chips.forEach(function(btn){
        var isActive=(btn.getAttribute('data-filter')===activeTag);
        btn.classList.toggle('is-active',isActive);
        btn.setAttribute('aria-pressed',isActive?'true':'false');
      });
      var cards=[].slice.call(grid.querySelectorAll('.post-card'));
      var shown=0;
      cards.forEach(function(card){
        var tags=(card.getAttribute('data-tags')||'').split(/\s+/).filter(Boolean);
        var tagOk=(activeTag==='all')||tags.indexOf(activeTag)!==-1;
        var qOk=!query||getCardText(card).indexOf(query)!==-1;
        var show=tagOk&&qOk;
        card.hidden=!show;
        if(show) shown++;
      });
      if(countEl){
        var l=currentLang();
        var tpl=countEl.getAttribute(l==='en'?'data-en-template':'data-fa-template')||'{n}';
        countEl.textContent=tpl.replace('{n}',String(shown));
      }
      if(emptyEl) emptyEl.hidden=(shown!==0);
    }

    if(searchInput){
      var __deb=(window.KavicoUtils&&window.KavicoUtils.debounce)?window.KavicoUtils.debounce:function(fn,delay){var tt;delay=(typeof delay==='number')?delay:250;return function(){var ctx=this,args=arguments;clearTimeout(tt);tt=setTimeout(function(){fn.apply(ctx,args);},delay);};};
      searchInput.addEventListener('input',__deb(function(){query=normText(this.value||'');apply(tag);},320));
    }
    if(sortSelect){
      sortSelect.addEventListener('change',function(){sortCards();apply(tag);});
    }
    chips.forEach(function(btn){
      btn.addEventListener('click',function(){tag=(btn.getAttribute('data-filter')||'all');apply(tag);});
    });
    try{
      var mo=new MutationObserver(function(){updateSortLabels();if(sortMode==='az'||sortMode==='za')sortCards();apply(tag);});
      mo.observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
    }catch(e){}
    updateSortLabels();
    sortCards();
    apply(tag);
  }

  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', render);
  else render();
})();
