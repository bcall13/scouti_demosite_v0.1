/* ═══════════════════════════════════════
   SCOUTi layout.js
   Injects shared nav + footer into every page.
   Include this script at the bottom of every
   HTML file's <body>, before closing </body>.
   ═══════════════════════════════════════ */

(function () {

  /* ── 1. INJECT NAV ── */
  fetch('nav.html')
    .then(res => res.text())
    .then(html => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = html.trim();
      const nav = wrapper.firstElementChild;
      document.body.insertBefore(nav, document.body.firstChild);

      /* Set active state based on current page */
      const current = window.location.pathname.split('/').pop() || 'index.html';
      nav.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === current) {
          link.classList.add('active');
        }
      });

      /* Scroll shadow */
      window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 20);
      });
    })
    .catch(err => console.warn('SCOUTi: nav.html could not be loaded.', err));


  /* ── 2. INJECT FOOTER ── */
  fetch('footer.html')
    .then(res => res.text())
    .then(html => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = html.trim();
      const footer = wrapper.firstElementChild;
      document.body.appendChild(footer);
    })
    .catch(err => console.warn('SCOUTi: footer.html could not be loaded.', err));


  /* ── 3. SCROLL REVEAL ── */
  // Runs after a short delay to catch elements
  // added by the nav/footer injection above
  setTimeout(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  }, 100);

})();
