/* Kavico v347 — lightweight service-page orientation / scrollspy. */
(function(){'use strict';
  function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn,{once:true});else fn();}
  ready(function(){
    var rail=document.querySelector('[data-v347-service-rail]'); if(!rail)return;
    var links=Array.from(rail.querySelectorAll('a[data-v347-target]'));
    var items=links.map(function(a){return {a:a,id:a.getAttribute('data-v347-target'),el:document.getElementById(a.getAttribute('data-v347-target'))};}).filter(function(x){return x.el;});
    if(!items.length)return;
    function activate(id){
      items.forEach(function(x){
        if(x.id===id){x.a.setAttribute('aria-current','location');try{var rm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;x.a.scrollIntoView({block:'nearest',inline:'center',behavior:rm?'auto':'smooth'});}catch(_e){}}
        else x.a.removeAttribute('aria-current');
      });
    }
    links.forEach(function(a){if(!document.getElementById(a.getAttribute('data-v347-target')))a.hidden=true;});
    if('IntersectionObserver'in window){
      var io=new IntersectionObserver(function(entries){
        var visible=entries.filter(function(e){return e.isIntersecting;}).sort(function(a,b){return b.intersectionRatio-a.intersectionRatio;});
        if(visible[0])activate(visible[0].target.id);
      },{rootMargin:'-28% 0px -58% 0px',threshold:[0,.05,.2,.5]});
      items.forEach(function(x){io.observe(x.el);});
    }
    var hash=(location.hash||'').replace('#',''); if(items.some(function(x){return x.id===hash;}))activate(hash); else activate(items[0].id);
  });
})();
