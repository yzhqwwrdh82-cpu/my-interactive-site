/* ToolScout analytics consent (loaded only when GA4 is enabled in data/site.json).
   Nothing is sent to Google until the visitor clicks "Allow". The choice is stored
   locally (localStorage "ts-consent") and can be changed from the footer link. */
(function () {
  'use strict';
  var meta = document.querySelector('meta[name="ts-analytics"]');
  if (!meta) return;
  var id = meta.getAttribute('content');
  if (!/^G-[A-Z0-9]+$/.test(id)) return;
  var KEY = 'ts-consent';
  var loaded = false;
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function load() {
    if (loaded) return; loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    // Consent mode v2: analytics only; advertising signals stay denied.
    window.gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted' });
    window.gtag('js', new Date());
    window.gtag('config', id, { anonymize_ip: true });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(s);
  }
  var banner = document.getElementById('consent-banner');
  function show() { if (banner) { banner.hidden = false; var b = banner.querySelector('[data-consent="accept"]'); if (b) b.focus(); } }
  function hide() { if (banner) banner.hidden = true; }
  if (banner) {
    banner.addEventListener('click', function (e) {
      var t = e.target.closest('[data-consent]');
      if (!t) return;
      var v = t.getAttribute('data-consent') === 'accept' ? 'granted' : 'denied';
      set(v); hide();
      if (v === 'granted') load(); else if (loaded) location.reload(); // revoking stops collection on the next page
    });
  }
  document.addEventListener('click', function (e) { if (e.target.closest('[data-consent-open]')) { e.preventDefault(); show(); } });
  var c = get();
  if (c === 'granted') load(); else if (c !== 'denied') show();
})();
