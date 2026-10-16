/* Applies the saved theme before first paint. Loaded synchronously in <head>.
   Light is the site's default (set on <html>); a stored choice overrides it. */
(function () {
  try {
    var t = localStorage.getItem('riel-theme');
    if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
  } catch (e) {}
})();
