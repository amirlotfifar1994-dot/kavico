/* legacy-redirect.v335.js - CSP migration: external redirect helper for noindex legacy aliases. */
(function(){
  try{
    var canonical=document.querySelector('link[rel="canonical"]');
    var target=canonical && canonical.href;
    if(!target) return;
    var q=location.search||'';
    var h=location.hash||'';
    location.replace(target+q+h);
  }catch(e){}
})();
