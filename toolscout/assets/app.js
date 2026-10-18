/* ToolScout — progressive enhancement. All content is pre-rendered; this adds
   theme, favorites, compare, catalog filtering, demo-form validation and the
   local chat helper. No network calls except loading /assets/catalog.json
   (same origin). Nothing typed by the user is sent anywhere. */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var lang = root.lang === 'en' ? 'en' : 'he';
  var $ = function (s, el) { return (el || doc).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || doc).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function readJSON(id) {
    var t = doc.getElementById(id);
    if (!t) return {};
    try { return JSON.parse(t.content ? t.content.textContent : t.textContent); } catch (e) { return {}; }
  }
  var UI = readJSON('ui-i18n');

  // ---------- Storage (wrapped: may be blocked) ----------
  function load(key, fallback) { try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; } }
  function save(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* ignore */ } }

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }

  // Paths: derive language root and site root from the chat widget config.
  var chatEl = $('[data-chat]');
  var CATALOG_URL = chatEl ? chatEl.getAttribute('data-catalog') : 'assets/catalog.json';
  var ASSET_ROOT = CATALOG_URL.replace(/assets\/catalog\.json$/, '');
  var LANG_ROOT = chatEl ? chatEl.getAttribute('data-catalog-base') : './';

  var catalogPromise = null;
  function getCatalog() {
    if (!catalogPromise) {
      catalogPromise = fetch(CATALOG_URL, { credentials: 'same-origin' }).then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      }).catch(function (e) { catalogPromise = null; throw e; });
    }
    return catalogPromise;
  }

  // ---------- Theme ----------
  var themeBtn = $('[data-theme-toggle]');
  function themeNow() { return root.getAttribute('data-theme') || 'system'; }
  function labelTheme() {
    if (!themeBtn) return;
    var t = themeNow();
    var l = themeBtn.getAttribute('data-l-label') + ': ' + themeBtn.getAttribute('data-l-' + t);
    themeBtn.setAttribute('aria-label', l);
    themeBtn.title = l;
  }
  if (themeBtn) {
    labelTheme();
    themeBtn.addEventListener('click', function () {
      var next = { system: 'light', light: 'dark', dark: 'system' }[themeNow()];
      if (next === 'system') { root.removeAttribute('data-theme'); try { localStorage.removeItem('ts-theme'); } catch (e) {} }
      else { root.setAttribute('data-theme', next); try { localStorage.setItem('ts-theme', next); } catch (e) {} }
      labelTheme();
    });
  }

  // Close the mobile menu on outside click / Escape.
  var menu = $('details.menu');
  if (menu) {
    doc.addEventListener('click', function (e) { if (menu.open && !menu.contains(e.target)) menu.open = false; });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.open) { menu.open = false; $('summary', menu).focus(); } });
  }

  // ---------- Favorites ----------
  var favs = load('ts-favs', []);
  if (!Array.isArray(favs)) favs = [];
  function isFav(id) { return favs.indexOf(id) !== -1; }
  function syncFavs() {
    $$('[data-fav]').forEach(function (b) {
      var on = isFav(b.getAttribute('data-fav'));
      b.setAttribute('aria-pressed', String(on));
      var label = b.getAttribute(on ? 'data-l-remove' : 'data-l-add');
      if (label) {
        var inner = $('[data-fav-label]', b);
        if (inner) inner.textContent = label; else b.setAttribute('aria-label', label);
      }
    });
    $$('[data-fav-count]').forEach(function (el) { el.textContent = favs.length; el.hidden = favs.length === 0; });
  }
  doc.addEventListener('click', function (e) {
    var b = e.target.closest('[data-fav]');
    if (!b) return;
    e.preventDefault();
    var id = b.getAttribute('data-fav');
    if (isFav(id)) favs = favs.filter(function (x) { return x !== id; }); else favs.push(id);
    save('ts-favs', favs);
    syncFavs();
    doc.dispatchEvent(new CustomEvent('ts:favs'));
  });
  syncFavs();

  // ---------- Compare picks + tray ----------
  var MAX = 3;
  var picks = load('ts-compare', []);
  if (!Array.isArray(picks)) picks = [];
  var tray = $('[data-tray]');
  function compareHref(ids) {
    var go = tray ? $('[data-tray-go]', tray) : null;
    var base = go ? go.getAttribute('href').split('?')[0] : LANG_ROOT + 'compare.html';
    return base + (ids.length ? '?ids=' + ids.join(',') : '');
  }
  function syncPicks(hitMax) {
    $$('[data-compare]').forEach(function (cb) { cb.checked = picks.indexOf(cb.getAttribute('data-compare')) !== -1; });
    if (!tray) return;
    tray.hidden = picks.length === 0;
    doc.body.classList.toggle('has-tray', picks.length > 0);
    $('[data-tray-n]', tray).textContent = '(' + picks.length + ')';
    $('[data-tray-go]', tray).setAttribute('href', compareHref(picks));
    $('[data-tray-max]', tray).hidden = !hitMax;
    var logos = $('[data-tray-logos]', tray);
    logos.innerHTML = '';
    picks.forEach(function (id) {
      var card = $('.tool[data-id="' + id + '"] .logo');
      if (card) { var clone = card.cloneNode(true); clone.className = clone.className.replace('logo-md', 'logo-xs').replace(/\blogo-sm\b/, 'logo-xs'); if (clone.className.indexOf('logo-xs') === -1) clone.className += ' logo-xs'; logos.appendChild(clone); }
    });
  }
  doc.addEventListener('change', function (e) {
    var cb = e.target.closest('[data-compare]');
    if (!cb) return;
    var id = cb.getAttribute('data-compare');
    var hitMax = false;
    if (cb.checked) {
      if (picks.length >= MAX) { cb.checked = false; hitMax = true; }
      else if (picks.indexOf(id) === -1) picks.push(id);
    } else picks = picks.filter(function (x) { return x !== id; });
    save('ts-compare', picks);
    syncPicks(hitMax);
  });
  if (tray) $('[data-tray-clear]', tray).addEventListener('click', function () { picks = []; save('ts-compare', picks); syncPicks(false); });
  syncPicks(false);

  // ---------- Text normalization for search ----------
  function norm(s) {
    return String(s || '').toLowerCase().normalize('NFD')
      .replace(/[̀-֑ͯ-ׇ]/g, '')
      .replace(/[׳’'`"״]/g, '')
      .replace(/[-_.,:;!?()]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  // ---------- Catalog page ----------
  var grid = $('#results');
  if (grid && doc.body.getAttribute('data-page') === 'catalog') initCatalog();

  function initCatalog() {
    var input = $('#q');
    var form = $('[data-catalog-search]');
    var clearBtn = $('[data-clear]');
    var countEl = $('#result-count');
    var emptyEl = $('[data-empty]');
    var sortSel = $('[data-sort]');
    var filtersEl = $('[data-filters]');
    var filterCount = $('[data-filter-count]');
    var cards = $$('.tool', grid);
    var original = cards.slice();
    cards.forEach(function (c) {
      c._idx = norm(c.getAttribute('data-search'));
      c._hl = $$('[data-hl]', c).map(function (el) { return { el: el, text: el.textContent }; });
    });

    var state = { q: '', cat: 'all', use: [], price: [], platform: [], open: false, fav: false, sort: 'rel' };
    try {
      var p = new URLSearchParams(location.search);
      state.q = p.get('q') || '';
      state.cat = p.get('cat') || 'all';
      ['use', 'price', 'platform'].forEach(function (k) { var v = p.get(k); state[k] = v ? v.split(',').filter(Boolean) : []; });
      state.open = p.get('open') === '1';
      state.fav = p.get('fav') === '1';
      state.sort = p.get('sort') || 'rel';
    } catch (e) {}
    if (!$('[data-f="cat"][data-v="' + state.cat + '"]')) state.cat = 'all';
    input.value = state.q;
    sortSel.value = ['rel', 'name', 'new'].indexOf(state.sort) !== -1 ? state.sort : 'rel';
    if (window.matchMedia('(max-width: 900px)').matches && !(state.use.length || state.price.length || state.platform.length || state.open || state.fav)) filtersEl.open = false;

    function syncControls() {
      $$('[data-f="cat"]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-v') === state.cat)); });
      $$('input[data-f]').forEach(function (cb) {
        var k = cb.getAttribute('data-f');
        cb.checked = (k === 'open' || k === 'fav') ? state[k] : state[k].indexOf(cb.value) !== -1;
      });
      var n = state.use.length + state.price.length + state.platform.length + (state.open ? 1 : 0) + (state.fav ? 1 : 0);
      filterCount.textContent = n; filterCount.hidden = n === 0;
    }

    function highlight(card, terms) {
      card._hl.forEach(function (h) {
        if (!terms.length) { h.el.textContent = h.text; return; }
        var re = new RegExp('(' + terms.map(escapeRe).join('|') + ')', 'gi');
        var parts = h.text.split(re);
        if (parts.length === 1) { h.el.textContent = h.text; return; }
        h.el.innerHTML = parts.map(function (x, i) { return i % 2 ? '<mark>' + escapeHtml(x) + '</mark>' : escapeHtml(x); }).join('');
      });
    }

    function score(card, terms) {
      if (!terms.length) return 0;
      var name = card.getAttribute('data-name');
      var s = 0;
      terms.forEach(function (t) { if (name.indexOf(t) === 0) s += 3; else if (name.indexOf(t) !== -1) s += 2; else s += 1; });
      return s;
    }

    function syncUrl() {
      try {
        var p = new URLSearchParams();
        if (state.q) p.set('q', state.q);
        if (state.cat !== 'all') p.set('cat', state.cat);
        ['use', 'price', 'platform'].forEach(function (k) { if (state[k].length) p.set(k, state[k].join(',')); });
        if (state.open) p.set('open', '1');
        if (state.fav) p.set('fav', '1');
        if (state.sort !== 'rel') p.set('sort', state.sort);
        var qs = p.toString();
        history.replaceState(null, '', location.pathname + (qs ? '?' + qs : ''));
      } catch (e) {}
    }

    function render(animate) {
      var terms = norm(state.q).split(' ').filter(Boolean);
      var shown = [];
      original.forEach(function (card) {
        var uses = card.getAttribute('data-uses').split(' ');
        var plats = card.getAttribute('data-platforms').split(' ');
        var ok = (state.cat === 'all' || card.getAttribute('data-cat') === state.cat) &&
          (!state.use.length || state.use.some(function (u) { return uses.indexOf(u) !== -1; })) &&
          (!state.price.length || state.price.indexOf(card.getAttribute('data-price')) !== -1) &&
          (!state.platform.length || state.platform.some(function (u) { return plats.indexOf(u) !== -1; })) &&
          (!state.open || card.getAttribute('data-open') === '1') &&
          (!state.fav || isFav(card.getAttribute('data-id'))) &&
          terms.every(function (t) { return card._idx.indexOf(t) !== -1; });
        var was = card.hidden;
        card.hidden = !ok;
        card.classList.remove('enter');
        if (ok) { shown.push(card); highlight(card, terms); card._wasHidden = was; }
      });
      // Sort the visible set; hidden cards keep their place at the end.
      var ordered = shown.slice();
      if (state.sort === 'name') ordered.sort(function (a, b) { return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name')); });
      else if (state.sort === 'new') ordered.sort(function (a, b) { return b.getAttribute('data-added').localeCompare(a.getAttribute('data-added')) || original.indexOf(a) - original.indexOf(b); });
      else if (terms.length) ordered.sort(function (a, b) { return score(b, terms) - score(a, terms) || original.indexOf(a) - original.indexOf(b); });
      ordered.forEach(function (c, i) {
        grid.appendChild(c);
        if (animate && !reduceMotion && c._wasHidden) { c.style.setProperty('--i', i); void c.offsetWidth; c.classList.add('enter'); }
      });
      original.forEach(function (c) { if (c.hidden) grid.appendChild(c); });

      var n = shown.length;
      countEl.textContent = n === 0 ? countEl.getAttribute('data-zero') : n === 1 ? countEl.getAttribute('data-one') : countEl.getAttribute('data-tpl').replace('{n}', n);
      emptyEl.hidden = n !== 0;
      clearBtn.hidden = !state.q;
      form.classList.toggle('has-value', !!state.q);
      syncControls();
      syncUrl();
    }

    var timer;
    input.addEventListener('input', function () { clearTimeout(timer); timer = setTimeout(function () { state.q = input.value; render(true); }, 70); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && input.value) { e.preventDefault(); input.value = ''; state.q = ''; render(true); }
    });
    form.addEventListener('submit', function (e) { e.preventDefault(); grid.focus(); });
    clearBtn.addEventListener('click', function () { input.value = ''; state.q = ''; render(true); input.focus(); });
    $$('[data-f="cat"]').forEach(function (b) { b.addEventListener('click', function () { state.cat = b.getAttribute('data-v'); render(true); }); });
    $$('input[data-f]').forEach(function (cb) {
      cb.addEventListener('change', function () {
        var k = cb.getAttribute('data-f');
        if (k === 'open' || k === 'fav') state[k] = cb.checked;
        else if (cb.checked) state[k].push(cb.value); else state[k] = state[k].filter(function (x) { return x !== cb.value; });
        render(true);
      });
    });
    sortSel.addEventListener('change', function () { state.sort = sortSel.value; render(false); });
    $$('[data-reset]').forEach(function (b) {
      b.addEventListener('click', function () {
        state = { q: '', cat: 'all', use: [], price: [], platform: [], open: false, fav: false, sort: state.sort };
        input.value = ''; render(true); input.focus();
      });
    });
    doc.addEventListener('ts:favs', function () { if (state.fav) render(false); });
    doc.addEventListener('keydown', function (e) {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      var a = doc.activeElement;
      if (a && (/INPUT|TEXTAREA|SELECT/.test(a.tagName) || a.isContentEditable)) return;
      e.preventDefault(); input.focus();
    });
    render(false);
  }

  // ---------- Client-rendered card (account favorites) ----------
  function logoHtml(t, size) {
    if (t.logo) return '<span class="logo logo-' + size + '"><img src="' + ASSET_ROOT + 'assets/logos/' + t.logo + '.svg" alt="" width="28" height="28"></span>';
    if (t.monogram) return '<span class="logo logo-' + size + ' logo-mono" data-cat="' + t.category + '" aria-hidden="true">' + escapeHtml(t.monogram) + '</span>';
    var w = t.name.replace(/[^A-Za-z0-9 ]/g, ' ').trim().split(/\s+/);
    var m = (w.length > 1 ? w[0][0] + w[1][0] : t.name.slice(0, 2)).toUpperCase();
    return '<span class="logo logo-' + size + ' logo-mono" data-cat="' + t.category + '" aria-hidden="true">' + escapeHtml(m) + '</span>';
  }
  function nameOf(list, id) { for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i][lang]; return id; }
  function priceHtml(t, cat) {
    var s = UI.card || {};
    return '<span class="price" data-price="' + t.pricing + '">' + escapeHtml(nameOf(cat.pricing, t.pricing)) + '</span>' +
      (t.verification.pricing === 'verified' ? '<span class="vbadge" title="' + escapeHtml(s.verified) + '"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg><span class="sr-only">' + escapeHtml(s.verified) + '</span></span>' : '');
  }
  function cardHtml(t, cat) {
    var s = UI.card || {};
    return '<li class="tool" data-id="' + t.id + '"><article class="card"><div class="card-top">' + logoHtml(t, 'md') +
      '<div class="card-title"><h3 class="card-name"><a class="card-link" href="' + LANG_ROOT + 'tools/' + t.id + '.html">' + escapeHtml(t.name) + '</a></h3>' +
      '<p class="card-meta">' + escapeHtml(nameOf(cat.categories, t.category)) + '</p></div>' +
      '<button type="button" class="fav-btn" data-fav="' + t.id + '" aria-pressed="true" data-l-add="' + escapeHtml(s.fav + ': ' + t.name) + '" data-l-remove="' + escapeHtml(s.unfav + ': ' + t.name) + '" aria-label="' + escapeHtml(s.unfav + ': ' + t.name) + '"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7.5-4.4-7.5-10.1A4.4 4.4 0 0 1 12 7a4.4 4.4 0 0 1 7.5 2.9C19.5 15.6 12 20 12 20z"/></svg></button></div>' +
      '<p class="card-desc">' + escapeHtml(t.description[lang]) + '</p><div class="card-badges">' + priceHtml(t, cat) + '</div></article></li>';
  }

  // ---------- Account: favorites ----------
  var favList = $('[data-fav-list]');
  if (favList) {
    var favEmpty = $('[data-fav-empty]');
    var favClear = $('[data-fav-clear]');
    var renderFavs = function () {
      if (!favs.length) { favList.innerHTML = ''; favEmpty.hidden = false; favClear.hidden = true; return; }
      getCatalog().then(function (cat) {
        var items = favs.map(function (id) { return cat.tools.filter(function (t) { return t.id === id; })[0]; }).filter(Boolean);
        favList.innerHTML = items.map(function (t) { return cardHtml(t, cat); }).join('');
        favEmpty.hidden = items.length > 0; favClear.hidden = items.length === 0;
      }).catch(function () { favEmpty.hidden = false; });
    };
    favClear.addEventListener('click', function () { favs = []; save('ts-favs', favs); syncFavs(); renderFavs(); });
    doc.addEventListener('ts:favs', renderFavs);
    renderFavs();
  }

  // ---------- Compare page ----------
  var cmpOut = $('[data-cmp-out]');
  if (cmpOut) initCompare();
  function initCompare() {
    var addSel = $('[data-cmp-add]');
    var picked = $('[data-cmp-picked]');
    var ids = [];
    try { var q = new URLSearchParams(location.search).get('ids'); ids = q ? q.split(',').filter(Boolean) : picks.slice(); } catch (e) { ids = picks.slice(); }
    var C = UI.compare || {}, K = UI.tool || {}, S = UI.card || {};
    var R = C.rows || {};
    var ICON = function (d) { return '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>'; };
    var OK = '<path d="M5 12.5l4.5 4.5L19 7.5"/>', MINUS = '<path d="M6 12h12"/>', EXT = '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>', X = '<path d="M6 6l12 12M18 6L6 18"/>';
    function fmt(iso) { return new Date(iso + 'T00:00:00Z').toLocaleDateString(lang === 'he' ? 'he-IL' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }); }
    function draw(cat) {
      ids = ids.filter(function (id, i) { return ids.indexOf(id) === i && cat.tools.some(function (t) { return t.id === id; }); }).slice(0, MAX);
      var tools = ids.map(function (id) { return cat.tools.filter(function (t) { return t.id === id; })[0]; });
      try { history.replaceState(null, '', location.pathname + (ids.length ? '?ids=' + ids.join(',') : '')); } catch (e) {}
      picks = ids.slice(); save('ts-compare', picks);
      $$('option', addSel).forEach(function (o) { o.disabled = !!o.value && (ids.indexOf(o.value) !== -1 || ids.length >= MAX); });
      picked.innerHTML = tools.map(function (t) {
        return '<span class="cmp-pill">' + escapeHtml(t.name) + '<button type="button" data-cmp-remove="' + t.id + '" aria-label="' + escapeHtml(cmpOut.getAttribute('data-l-remove') + ': ' + t.name) + '">' + ICON(X) + '</button></span>';
      }).join('');
      if (!tools.length) { cmpOut.innerHTML = '<p class="empty">' + escapeHtml(cmpOut.getAttribute('data-empty')) + '</p>'; return; }
      var ext = '<span class="sr-only"> ' + escapeHtml(S.newTab) + '</span>';
      var facts = function (arr, kind) { return arr.length ? '<ul class="facts-list ' + kind + '">' + arr.map(function (f) { return '<li>' + ICON(kind === 'pros' ? OK : MINUS) + '<span>' + escapeHtml(f[lang]) + '</span></li>'; }).join('') + '</ul>' : '<span class="muted">—</span>'; };
      var yn = function (v) { return v === true ? K.yes : v === false ? K.no : K.unknown; };
      var free = function (t) { return t.pricing === 'unverified' ? C.freeUnknown : t.pricing === 'paid' ? C.freeNo : C.freeYes; };
      var plats = function (t) { return t.platforms ? t.platforms.map(function (p) { return nameOf(cat.platforms, p); }).join(', ') : K.platformsUnverified; };
      var row = function (label, fn) { return '<tr><th scope="row">' + escapeHtml(label) + '</th>' + tools.map(function (t) { return '<td>' + fn(t) + '</td>'; }).join('') + '</tr>'; };
      cmpOut.innerHTML = '<div class="table-wrap" tabindex="0" role="region" aria-label="' + escapeHtml(C.h1) + '"><table class="cmp-table"><thead><tr><td></td>' +
        tools.map(function (t) { return '<th scope="col"><a class="cmp-head" href="' + LANG_ROOT + 'tools/' + t.id + '.html">' + logoHtml(t, 'sm') + '<span>' + escapeHtml(t.name) + '</span></a></th>'; }).join('') + '</tr></thead><tbody>' +
        row(R.category, function (t) { return escapeHtml(nameOf(cat.categories, t.category)); }) +
        row(R.pricing, function (t) { return '<div class="card-badges">' + priceHtml(t, cat) + '</div>'; }) +
        row(R.free, function (t) { return escapeHtml(free(t)); }) +
        row(R.open, function (t) { return escapeHtml(yn(t.openSource)); }) +
        row(R.platforms, function (t) { return escapeHtml(plats(t)); }) +
        row(R.pros, function (t) { return facts(t.pros, 'pros'); }) +
        row(R.cons, function (t) { return facts(t.cons, 'cons'); }) +
        row(R.checked, function (t) { return '<time datetime="' + t.checkedAt + '">' + escapeHtml(fmt(t.checkedAt)) + '</time>'; }) +
        row(R.links, function (t) { return '<a class="ext-link" href="' + escapeHtml(t.url) + '" target="_blank" rel="noopener">' + escapeHtml(S.visit) + ICON(EXT) + ext + '</a><br><a class="ext-link" href="' + escapeHtml(t.pricingUrl) + '" target="_blank" rel="noopener">' + escapeHtml(K.pricingPage) + ICON(EXT) + ext + '</a>'; }) +
        '</tbody></table></div>';
    }
    getCatalog().then(function (cat) {
      draw(cat);
      addSel.addEventListener('change', function () { if (addSel.value) { ids.push(addSel.value); addSel.value = ''; draw(cat); } });
      picked.addEventListener('click', function (e) {
        var b = e.target.closest('[data-cmp-remove]');
        if (!b) return;
        ids = ids.filter(function (x) { return x !== b.getAttribute('data-cmp-remove'); });
        draw(cat); addSel.focus();
      });
    }).catch(function () { cmpOut.innerHTML = '<p class="callout">' + escapeHtml((readJSON('chat-i18n').error) || 'Error') + '</p>'; });
  }

  // ---------- Books filters (active only when real books exist) ----------
  var booksGrid = $('[data-books]');
  if (booksGrid) {
    var bmap = { topic: 'data-topics', lang: 'data-langs', level: 'data-level', format: 'data-formats', price: 'data-price' };
    var applyBooks = function () {
      var sel = {};
      $$('input[data-bf]:checked').forEach(function (cb) { (sel[cb.getAttribute('data-bf')] = sel[cb.getAttribute('data-bf')] || []).push(cb.value); });
      $$('.book', booksGrid).forEach(function (b) {
        b.hidden = !Object.keys(sel).every(function (k) {
          var vals = (b.getAttribute(bmap[k]) || '').split(' ');
          return sel[k].some(function (v) { return vals.indexOf(v) !== -1; });
        });
      });
    };
    $$('input[data-bf]').forEach(function (cb) { cb.addEventListener('change', applyBooks); });
  }

  // ---------- Demo forms (validation works; nothing is sent or stored) ----------
  $$('[data-demo-form]').forEach(function (form) {
    $$('[data-enable-js]', form).forEach(function (b) { b.disabled = false; });
    var status = $('[data-status]', form);
    var summary = $('[data-summary]', form);
    function check(el) {
      var err = doc.getElementById(el.id + '-err');
      var bad = !el.checkValidity();
      el.setAttribute('aria-invalid', String(bad));
      if (err) { err.textContent = bad ? el.getAttribute('data-err') : ''; err.hidden = !bad; }
      return !bad;
    }
    $$('input[required], textarea[required]', form).forEach(function (el) {
      el.addEventListener('blur', function () { if (el.value || el.type === 'checkbox') check(el); });
      el.addEventListener('input', function () { if (el.getAttribute('aria-invalid') === 'true') check(el); });
      el.addEventListener('change', function () { if (el.type === 'checkbox') check(el); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = $$('input[required], textarea[required]', form);
      var firstBad = null;
      fields.forEach(function (el) { if (!check(el) && !firstBad) firstBad = el; });
      status.hidden = true;
      if (firstBad) {
        if (summary) { summary.textContent = summary.getAttribute('data-text'); summary.hidden = false; }
        firstBad.focus();
        return;
      }
      if (summary) summary.hidden = true;
      // Not connected: show the honest status and clear what was typed, so nothing lingers.
      status.textContent = status.getAttribute('data-not-connected');
      status.hidden = false;
      form.reset();
      fields.forEach(function (el) { el.removeAttribute('aria-invalid'); });
    });
  });

  // ---------- Chat helper (local, in-browser only) ----------
  if (chatEl) initChat();
  function initChat() {
    var T = readJSON('chat-i18n');
    var openBtn = $('[data-chat-open]', chatEl);
    var panel = $('.chat-panel', chatEl);
    var closeBtn = $('[data-chat-close]', panel);
    var log = $('[data-chat-log]', panel);
    var formEl = $('[data-chat-form]', panel);
    var input = $('input', formEl);
    var mode = 'search';
    var started = false;

    function time() { return new Date().toLocaleTimeString(lang === 'he' ? 'he-IL' : 'en-GB', { hour: '2-digit', minute: '2-digit' }); }
    function add(who, html, extraClass) {
      var div = doc.createElement('div');
      div.className = 'msg ' + who + (extraClass ? ' ' + extraClass : '');
      div.innerHTML = html + '<time>' + time() + '</time>';
      log.appendChild(div);
      log.scrollTop = log.scrollHeight;
      return div;
    }
    function botText(text) { return add('bot', '<p>' + escapeHtml(text) + '</p>'); }

    function open() {
      panel.hidden = false;
      openBtn.setAttribute('aria-expanded', 'true');
      if (!started) { started = true; botText(T.intro); }
      input.focus();
      doc.addEventListener('keydown', onKey);
    }
    function close() {
      panel.hidden = true;
      openBtn.setAttribute('aria-expanded', 'false');
      doc.removeEventListener('keydown', onKey);
      openBtn.focus();
    }
    function onKey(e) { if (e.key === 'Escape') close(); }
    openBtn.addEventListener('click', open);
    closeBtn.addEventListener('click', close);

    $$('[data-chat-mode]', panel).forEach(function (b) {
      b.addEventListener('click', function () {
        var m = b.getAttribute('data-chat-mode');
        add('user', '<p>' + escapeHtml(b.textContent.replace(T.soon, '').trim()) + '</p>');
        if (m === 'search') { mode = 'search'; botText(T.searchPrompt); input.focus(); }
        else if (m === 'help') { mode = 'help'; botText(T.helpPrompt); input.focus(); }
        else if (m === 'support') { add('bot', '<p>' + escapeHtml(T.supportReply) + ' <a class="inline" href="' + chatEl.getAttribute('data-contact') + '">' + escapeHtml(T.contactLink) + '</a></p>'); }
        else { botText(T.unavailable); }
      });
    });

    function helpAnswer(cat, q) {
      var n = norm(q);
      var best = null, bestScore = 0;
      (cat.help || []).forEach(function (h) {
        var s = 0;
        h.keys.forEach(function (k) { if (n.indexOf(norm(k)) !== -1) s += k.length; });
        if (s > bestScore) { bestScore = s; best = h; }
      });
      return best ? best.a[lang] : null;
    }
    function searchTools(cat, q) {
      var terms = norm(q).split(' ').filter(function (t) { return t.length > 1; });
      if (!terms.length) return [];
      var useNames = {};
      cat.uses.forEach(function (u) { useNames[u.id] = norm(u.he + ' ' + u.en); });
      var catNames = {};
      cat.categories.forEach(function (c) { catNames[c.id] = norm(c.he + ' ' + c.en); });
      return cat.tools.map(function (t) {
        var hay = norm([t.name, t.maker, t.description.he, t.description.en, catNames[t.category], t.uses.map(function (u) { return useNames[u]; }).join(' '),
          t.audience.he.join(' '), t.audience.en.join(' '), t.openSource ? 'open source קוד פתוח' : '', t.pricing === 'free' ? 'free חינמי חינם' : '', t.pricing === 'freemium' ? 'free חינמי חינם' : ''].join(' '));
        var s = 0;
        terms.forEach(function (term) {
          if (norm(t.name).indexOf(term) !== -1) s += 4;
          else if (hay.indexOf(term) !== -1) s += 1;
          else if (term.length > 3 && hay.indexOf(term.slice(0, -1)) !== -1) s += .5; // light stemming (plurals, ה/ים endings)
        });
        return { t: t, s: s };
      }).filter(function (x) { return x.s > 0; }).sort(function (a, b) { return b.s - a.s; }).slice(0, 4).map(function (x) { return x.t; });
    }
    function answer(cat, q) {
      var h = helpAnswer(cat, q);
      if (mode === 'help' && h) { botText(h); return; }
      var found = searchTools(cat, q);
      if (found.length) {
        add('bot', '<p>' + escapeHtml(found.length === 1 ? T.foundOne : T.foundMany.replace('{n}', found.length)) + '</p><div class="msg-results">' +
          found.map(function (t) {
            return '<a class="msg-tool" href="' + LANG_ROOT + 'tools/' + t.id + '.html">' + logoHtml(t, 'xs') + '<span><b>' + escapeHtml(t.name) + '</b><small>' + escapeHtml(nameOf(cat.pricing, t.pricing)) + '</small></span></a>';
          }).join('') + '</div>');
        return;
      }
      if (h) { botText(h); return; }
      add('bot', '<p>' + escapeHtml(T.none) + ' <a class="inline" href="' + chatEl.getAttribute('data-catalog-page') + '?q=' + encodeURIComponent(q) + '">' + escapeHtml(T.openCatalog) + '</a></p>');
    }

    function ask(q) {
      var loading = null;
      var t = setTimeout(function () { loading = add('bot', '<p class="loading-line"><span class="spinner" aria-hidden="true"></span>' + escapeHtml(T.loading) + '</p>'); }, 150);
      getCatalog().then(function (cat) {
        clearTimeout(t); if (loading) loading.remove();
        answer(cat, q);
      }).catch(function () {
        clearTimeout(t); if (loading) loading.remove();
        var m = add('bot', '<p>' + escapeHtml(T.error) + '</p><button type="button" class="btn btn-ghost sm">' + escapeHtml(T.retry) + '</button>', 'is-error');
        $('button', m).addEventListener('click', function () { m.remove(); ask(q); });
      });
    }

    formEl.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = input.value.trim().slice(0, 200);
      if (!q) return;
      add('user', '<p>' + escapeHtml(q) + '</p>');
      input.value = '';
      ask(q);
    });
  }
})();
