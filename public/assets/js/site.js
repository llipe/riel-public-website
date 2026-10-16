/* riel public site — header dropdowns, mobile menu, FAQ accordion, theme switch.
   No dependencies. Every feature degrades to plain links and native <details>. */
(function () {
  'use strict';

  var root = document.documentElement;
  var THEME_KEY = 'riel-theme';

  /* ---------- Theme switch ---------- */
  function syncThemeButtons() {
    var current = root.getAttribute('data-theme') || 'light';
    document.querySelectorAll('[data-set-theme]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-set-theme') === current));
    });
  }
  function setTheme(t) {
    if (t !== 'light' && t !== 'dark') return;
    root.setAttribute('data-theme', t);
    syncThemeButtons();
  }
  document.querySelectorAll('[data-set-theme]').forEach(function (b) {
    b.addEventListener('click', function () {
      var t = b.getAttribute('data-set-theme');
      try { localStorage.setItem(THEME_KEY, t); } catch (e) {}
      setTheme(t);
    });
  });
  window.addEventListener('storage', function (e) { if (e.key === THEME_KEY) setTheme(e.newValue); });
  syncThemeButtons();

  /* ---------- Desktop audience dropdowns ---------- */
  var ddButtons = Array.prototype.slice.call(document.querySelectorAll('[data-dd-toggle]'));
  function panelFor(btn) { return document.getElementById(btn.getAttribute('aria-controls')); }
  function closeDropdowns(except) {
    ddButtons.forEach(function (b) {
      if (b === except) return;
      b.setAttribute('aria-expanded', 'false');
      panelFor(b).hidden = true;
    });
  }
  ddButtons.forEach(function (b) {
    b.addEventListener('click', function () {
      var open = b.getAttribute('aria-expanded') === 'true';
      closeDropdowns(b);
      b.setAttribute('aria-expanded', String(!open));
      panelFor(b).hidden = open;
    });
    panelFor(b).addEventListener('click', function (e) {
      if (e.target.closest('a')) closeDropdowns();
    });
  });
  document.addEventListener('mousedown', function (e) {
    if (!e.target.closest('[data-dd]')) closeDropdowns();
  });

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.querySelector('[data-menu-toggle]');
  var menu = menuBtn && document.getElementById(menuBtn.getAttribute('aria-controls'));
  function setMenu(open) {
    if (!menu) return;
    menu.hidden = !open;
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.textContent = open ? 'Cerrar' : 'Menú';
    document.body.classList.toggle('menu-open', open);
  }
  if (menu) {
    menuBtn.addEventListener('click', function () { setMenu(menu.hidden); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    window.matchMedia('(min-width: 900px)').addEventListener('change', function (mq) {
      if (mq.matches) setMenu(false);
    });

    var tabs = Array.prototype.slice.call(menu.querySelectorAll('[role="tab"]'));
    function selectTab(tab) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { selectTab(t); });
      t.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        var next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
        selectTab(next);
        next.focus();
      });
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openDd = ddButtons.filter(function (b) { return b.getAttribute('aria-expanded') === 'true'; })[0];
    if (openDd) { closeDropdowns(); openDd.focus(); }
    if (menu && !menu.hidden) { setMenu(false); menuBtn.focus(); }
  });

  /* ---------- FAQ: one answer open at a time ----------
     <details name="..."> does this natively in current browsers; this covers older ones. */
  document.querySelectorAll('.faq details').forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (!d.open) return;
      d.parentElement.querySelectorAll('details[open]').forEach(function (o) { if (o !== d) o.open = false; });
    });
  });
})();
