/* KAVICO v419 consolidated runtime: v417 + v418. */
;/* KAVICO v417 — lightweight public experience runtime.
   Progressive enhancement only: pages remain fully usable without JavaScript. */
(() => {
  'use strict';
  const body = document.body;
  if (!body || !body.classList.contains('v417-public')) return;

  const isArticle = body.classList.contains('page-article');
  if (isArticle) {
    const updateReadingProgress = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - innerHeight);
      const progress = Math.min(100, Math.max(0, (scrollY / max) * 100));
      doc.style.setProperty('--v417-reading-progress', `${progress.toFixed(2)}%`);
    };
    updateReadingProgress();
    addEventListener('scroll', updateReadingProgress, { passive: true });
    addEventListener('resize', updateReadingProgress, { passive: true });

    const tocLinks = [...document.querySelectorAll('.article-toc a[href^="#"]')];
    const tocMap = new Map();
    for (const link of tocLinks) {
      try {
        const id = decodeURIComponent(link.getAttribute('href').slice(1));
        const target = document.getElementById(id);
        if (target) tocMap.set(target, link);
      } catch (_) {}
    }
    if ('IntersectionObserver' in window && tocMap.size) {
      let current = null;
      const setCurrent = link => {
        if (current === link) return;
        current?.classList.remove('is-current');
        current?.removeAttribute('aria-current');
        current = link || null;
        current?.classList.add('is-current');
        current?.setAttribute('aria-current', 'location');
      };
      const observer = new IntersectionObserver(entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setCurrent(tocMap.get(visible[0].target));
      }, { rootMargin: '-18% 0px -68% 0px', threshold: [0, 1] });
      tocMap.forEach((_, target) => observer.observe(target));
    }
  }
})();

;/* KAVICO v418 — public shell accessibility/runtime hardening.
   Progressive enhancement only; navigation and content remain usable without JavaScript. */
(() => {
  'use strict';
  const body = document.body;
  const html = document.documentElement;
  if (!body || !body.classList.contains('v418-public')) return;
  const isEn = (html.lang || '').toLowerCase().startsWith('en');

  const header = document.getElementById('header');
  const updateHeaderMetrics = () => {
    if (!header) return;
    html.style.setProperty('--v418-header-h', `${Math.max(56, Math.round(header.getBoundingClientRect().height))}px`);
  };
  if (header) {
    let ticking = false;
    const syncScrolled = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 10);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(syncScrolled);
    };
    syncScrolled();
    updateHeaderMetrics();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', updateHeaderMetrics, { passive: true });
    if ('ResizeObserver' in window) new ResizeObserver(updateHeaderMetrics).observe(header);
  }

  const normalizePath = value => {
    try {
      const u = new URL(value, location.href);
      if (u.origin !== location.origin) return null;
      let p = u.pathname.replace(/\/index\.html$/i, '/').replace(/\/{2,}/g, '/');
      if (!p.endsWith('/')) p += '/';
      return p;
    } catch (_) { return null; }
  };
  const navMenu = document.getElementById('navMenu');
  if (navMenu) {
    const here = normalizePath(location.href);
    const links = [...navMenu.querySelectorAll('a[href]')].filter(a => !a.classList.contains('v343-nav-brief') && !a.classList.contains('v395-nav-call'));
    let current = null;
    for (const a of links) {
      if (normalizePath(a.href) === here) { current = a; break; }
    }
    links.forEach(a => a.removeAttribute('aria-current'));
    navMenu.querySelectorAll('details[data-current]').forEach(d => d.removeAttribute('data-current'));
    if (current) {
      current.setAttribute('aria-current', 'page');
      const parent = current.closest('details.nav-dd');
      if (parent) parent.setAttribute('data-current', 'true');
    }
  }

  const themeToggle = document.getElementById('themeToggle');
  const themeNames = isEn
    ? { dark: 'Dark', light: 'Light', nebula: 'Nebula' }
    : { dark: 'تاریک', light: 'روشن', nebula: 'نبولا' };
  const syncThemeA11y = () => {
    const theme = ['dark','light','nebula'].includes(html.dataset.theme) ? html.dataset.theme : 'dark';
    html.style.colorScheme = theme === 'light' ? 'light' : 'dark';
    if (!themeToggle) return;
    const label = isEn
      ? `Current theme: ${themeNames[theme]}. Change theme`
      : `تم فعلی: ${themeNames[theme]}؛ تغییر تم`;
    themeToggle.setAttribute('aria-label', label);
    themeToggle.setAttribute('title', label);
  };
  syncThemeA11y();
  if ('MutationObserver' in window) {
    new MutationObserver(records => {
      if (records.some(r => r.attributeName === 'data-theme')) syncThemeA11y();
    }).observe(html, { attributes: true, attributeFilter: ['data-theme'] });
  }
  addEventListener('kavico:theme-changed', syncThemeA11y);

  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    const label = isEn ? 'Switch language to Persian' : 'تغییر زبان به انگلیسی';
    langToggle.setAttribute('aria-label', label);
    langToggle.setAttribute('title', label);
  }
  const scrollTop = document.getElementById('scrollTop');
  if (scrollTop && !scrollTop.getAttribute('title')) {
    scrollTop.setAttribute('title', isEn ? 'Back to top' : 'بازگشت به بالا');
  }

  // Make in-page targets keyboard-focusable only when navigated to, without changing normal tab order.
  addEventListener('hashchange', () => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    if (!target.matches('a,button,input,select,textarea,[tabindex]')) target.setAttribute('tabindex', '-1');
    try { target.focus({ preventScroll: true }); } catch (_) {}
  });
})();

