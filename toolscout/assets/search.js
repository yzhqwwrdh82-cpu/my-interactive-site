/* TKUMA site search: books, courses, paths, lists, guides and tools.
   Runs entirely in the browser over a static JSON index; nothing is sent anywhere. */
(function () {
  'use strict';
  var list = document.querySelector('[data-sresults]');
  if (!list) return;
  var form = document.querySelector('[data-site-search]');
  var input = form && form.querySelector('input[name="q"]');
  var countEl = document.querySelector('[data-scount]');
  var chips = Array.prototype.slice.call(document.querySelectorAll('[data-stype]'));
  var TYPES = JSON.parse(list.getAttribute('data-types') || '{}');
  var root = list.getAttribute('data-index').replace(/assets\/search-[a-z]+\.json.*$/, '');
  var index = null, type = '';

  function norm(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-֑ͯ-ׇ]/g, '').replace(/[״"׳']/g, ''); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (ch) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]; }); }

  function score(item, terms) {
    var name = norm(item.n), sub = norm(item.s), desc = norm(item.d), kw = norm(item.k), total = 0;
    for (var i = 0; i < terms.length; i++) {
      var t = terms[i], s = 0;
      if (name.indexOf(t) === 0) s = 6; else if (name.indexOf(t) > -1) s = 4;
      else if (sub.indexOf(t) > -1) s = 3; else if (kw.indexOf(t) > -1) s = 2; else if (desc.indexOf(t) > -1) s = 1;
      if (!s) return 0;
      total += s;
    }
    return total;
  }

  function render() {
    var q = input ? input.value.trim() : '';
    var terms = norm(q).split(/\s+/).filter(Boolean);
    var rows = index.filter(function (it) { return !type || it.t === type; });
    if (terms.length) rows = rows.map(function (it) { return [score(it, terms), it]; }).filter(function (r) { return r[0] > 0; }).sort(function (a, b) { return b[0] - a[0]; }).map(function (r) { return r[1]; });
    var shown = rows.slice(0, 60);
    list.innerHTML = shown.map(function (it) {
      return '<li><a class="sr-item" href="' + esc(root + it.u) + '"><span class="tag sr-type" data-type="' + esc(it.t) + '">' + esc(TYPES[it.t] || it.t) + '</span>' +
        '<span class="sr-body"><span class="sr-name">' + esc(it.n) + '</span>' + (it.s ? '<span class="sr-sub">' + esc(it.s) + '</span>' : '') +
        '<span class="sr-desc">' + esc(it.d) + '</span></span></a></li>';
    }).join('');
    if (countEl) countEl.textContent = rows.length ? countEl.getAttribute('data-tpl').replace('{n}', rows.length) : countEl.getAttribute('data-empty');
  }

  function syncUrl() {
    try {
      var u = new URL(location.href);
      if (input.value.trim()) u.searchParams.set('q', input.value.trim()); else u.searchParams.delete('q');
      if (type) u.searchParams.set('type', type); else u.searchParams.delete('type');
      history.replaceState(null, '', u.toString());
    } catch (e) { /* ignore */ }
  }

  function setType(t) {
    type = t;
    chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.getAttribute('data-stype') === t)); });
  }

  var params = new URLSearchParams(location.search);
  if (input && params.get('q')) input.value = params.get('q').slice(0, 100);
  if (params.get('type') && TYPES[params.get('type')]) setType(params.get('type'));
  if (countEl) countEl.textContent = '…';

  fetch(list.getAttribute('data-index'), { credentials: 'same-origin' })
    .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(function (data) { index = data; render(); })
    .catch(function () {
      if (countEl) countEl.textContent = document.documentElement.lang === 'he' ? 'החיפוש לא נטען. נסו לרענן את העמוד.' : 'Search could not load. Please refresh the page.';
    });

  if (form) form.addEventListener('submit', function (e) { e.preventDefault(); if (index) { render(); syncUrl(); } });
  if (input) {
    var t0;
    input.addEventListener('input', function () { clearTimeout(t0); t0 = setTimeout(function () { if (index) { render(); syncUrl(); } }, 120); });
  }
  chips.forEach(function (c) { c.addEventListener('click', function () { setType(c.getAttribute('data-stype')); if (index) { render(); syncUrl(); } }); });
})();
