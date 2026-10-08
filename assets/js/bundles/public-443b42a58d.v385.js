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
