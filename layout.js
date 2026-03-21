/* ═══════════════════════════════════════
SCOUTi layout.js
Injects shared nav + footer into every page.
Include this script at the bottom of every
HTML file’s <body>, before closing </body>.
═══════════════════════════════════════ */

/* ═══════════════════════════════════════
SCOUTi layout.js
Injects shared nav + footer into every page.
Include this script at the bottom of every
HTML file’s <body>, before closing </body>.
═══════════════════════════════════════ */

(function () {

/* ── 1. INJECT NAV ── */
fetch(‘nav.html’)
.then(res => res.text())
.then(html => {
const wrapper = document.createElement(‘div’);
wrapper.innerHTML = html.trim();
const nav = wrapper.firstElementChild;
document.body.insertBefore(nav, document.body.firstChild);

```
  /* Set active state based on current page */
  const current = window.location.pathname.split('/').pop() || 'index.html';
  nav.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === current) link.classList.add('active');
  });

  /* Scroll shadow */
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
})
.catch(err => console.warn('SCOUTi: nav.html could not be loaded.', err));
```

/* ── 2. INJECT FOOTER ── */
fetch(‘footer.html’)
.then(res => res.text())
.then(html => {
const wrapper = document.createElement(‘div’);
wrapper.innerHTML = html.trim();
const footer = wrapper.firstElementChild;
document.body.appendChild(footer);
})
.catch(err => console.warn(‘SCOUTi: footer.html could not be loaded.’, err));

/* ── 3. SCROLL REVEAL ── */
setTimeout(() => {
const obs = new IntersectionObserver(entries => {
entries.forEach((e, i) => {
if (e.isIntersecting) {
setTimeout(() => e.target.classList.add(‘visible’), i * 80);
obs.unobserve(e.target);
}
});
}, { threshold: 0.1 });
document.querySelectorAll(’.reveal’).forEach(el => obs.observe(el));
}, 100);

})();

/* ── MOBILE NAV TOGGLE ── */
function toggleMobileNav() {
const drawer   = document.getElementById(‘mobileDrawer’);
const backdrop = document.getElementById(‘mobileBackdrop’);
const burger   = document.getElementById(‘navBurger’);
if (!drawer) return;
const isOpen = drawer.classList.contains(‘open’);
if (isOpen) {
closeMobileNav();
} else {
drawer.classList.add(‘open’);
backdrop.classList.add(‘open’);
burger.classList.add(‘open’);
burger.setAttribute(‘aria-label’, ‘Close menu’);
document.body.style.overflow = ‘hidden’;
}
}

function closeMobileNav() {
const drawer   = document.getElementById(‘mobileDrawer’);
const backdrop = document.getElementById(‘mobileBackdrop’);
const burger   = document.getElementById(‘navBurger’);
if (!drawer) return;
drawer.classList.remove(‘open’);
backdrop.classList.remove(‘open’);
if (burger) {
burger.classList.remove(‘open’);
burger.setAttribute(‘aria-label’, ‘Open menu’);
}
document.body.style.overflow = ‘’;
}