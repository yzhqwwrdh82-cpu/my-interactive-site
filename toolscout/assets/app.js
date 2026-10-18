// ToolScout — progressive enhancement. All content is already in the HTML;
// this script only adds instant search, filters, highlighting, details and theme.
(function () {
  'use strict';

  var root = document.documentElement;

  // ---------- Theme toggle (system → light → dark) ----------
  var themeBtn = document.getElementById('theme-toggle');
  function store(key, val) { try { if (val === null) localStorage.removeItem(key); else localStorage.setItem(key, val); } catch (e) {} }
  function currentTheme() { return root.dataset.theme || 'system'; }
  function labelTheme() {
    if (!themeBtn) return;
    var t = currentTheme();
    themeBtn.setAttribute('aria-label', themeBtn.dataset.lLabel + ': ' + themeBtn.dataset['l' + t[0].toUpperCase() + t.slice(1)]);
    themeBtn.title = themeBtn.getAttribute('aria-label');
  }
  if (themeBtn) {
    labelTheme();
    themeBtn.addEventListener('click', function () {
      var next = { system: 'light', light: 'dark', dark: 'system' }[currentTheme()];
      if (next === 'system') { delete root.dataset.theme; store('ts-theme', null); }
      else { root.dataset.theme = next; store('ts-theme', next); }
      labelTheme();
    });
  }

  // ---------- Catalog ----------
  var grid = document.getElementById('results');
  if (!grid) return;

  var input = document.getElementById('q');
  var form = input.closest('form');
  var clearBtn = document.getElementById('clear');
  var countEl = document.getElementById('result-count');
  var emptyEl = document.getElementById('empty');
  var resetBtn = document.getElementById('reset');
  var cards = Array.prototype.slice.call(grid.querySelectorAll('.tool'));
  var filterBtns = Array.prototype.slice.call(document.querySelectorAll('[data-filter]'));
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Normalize: lowercase, strip Hebrew niqqud/cantillation and Latin accents, unify geresh/quotes.
  function norm(s) {
    return String(s || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-֑ͯ-ׇ]/g, '')
      .replace(/[׳’'`"״]/g, '')
      .replace(/[-_]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Keep original text for highlight restoration.
  cards.forEach(function (card) {
    card._index = norm(card.dataset.search);
    card._hl = Array.prototype.slice.call(card.querySelectorAll('[data-hl]')).map(function (el) {
      return { el: el, text: el.textContent };
    });
  });

  var state = { q: '', cat: 'all', price: 'all' };

  // Read initial state from URL (?q=&cat=&price=) so filtered views can be shared.
  try {
    var params = new URLSearchParams(location.search);
    state.q = params.get('q') || '';
    var cat = params.get('cat'), price = params.get('price');
    if (cat && filterBtns.some(function (b) { return b.dataset.filter === 'cat' && b.dataset.value === cat; })) state.cat = cat;
    if (price && filterBtns.some(function (b) { return b.dataset.filter === 'price' && b.dataset.value === price; })) state.price = price;
  } catch (e) {}
  input.value = state.q;

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }
  function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  function highlight(card, terms) {
    card._hl.forEach(function (h) {
      if (!terms.length) { h.el.textContent = h.text; return; }
      // Match on the visible text (case-insensitive). Niqqud-free UI text keeps this simple.
      var re = new RegExp('(' + terms.map(escapeRe).join('|') + ')', 'gi');
      var parts = h.text.split(re);
      if (parts.length === 1) { h.el.textContent = h.text; return; }
      h.el.innerHTML = parts.map(function (p, i) { return i % 2 ? '<mark>' + escapeHtml(p) + '</mark>' : escapeHtml(p); }).join('');
    });
  }

  function syncUrl() {
    try {
      var p = new URLSearchParams();
      if (state.q) p.set('q', state.q);
      if (state.cat !== 'all') p.set('cat', state.cat);
      if (state.price !== 'all') p.set('price', state.price);
      var qs = p.toString();
      history.replaceState(null, '', location.pathname + (qs ? '?' + qs : '') + location.hash);
    } catch (e) {}
  }

  function render(animate) {
    var terms = norm(state.q).split(' ').filter(Boolean);
    var shown = 0;

    cards.forEach(function (card) {
      var ok = (state.cat === 'all' || card.dataset.cat === state.cat) &&
               (state.price === 'all' || card.dataset.price === state.price) &&
               terms.every(function (t) { return card._index.indexOf(t) !== -1; });
      var wasHidden = card.hidden;
      card.hidden = !ok;
      card.classList.remove('enter');
      if (ok) {
        if (animate && !reduceMotion && wasHidden) {
          card.style.setProperty('--i', shown);
          void card.offsetWidth; // restart animation
          card.classList.add('enter');
        }
        shown++;
        highlight(card, terms);
      }
    });

    filterBtns.forEach(function (b) {
      b.setAttribute('aria-pressed', String(state[b.dataset.filter] === b.dataset.value));
    });

    countEl.textContent = shown === 0 ? countEl.dataset.zero
      : shown === 1 ? countEl.dataset.one
      : countEl.dataset.tpl.replace('{n}', shown);
    emptyEl.hidden = shown !== 0;
    clearBtn.hidden = !state.q;
    form.classList.toggle('has-value', !!state.q);
    syncUrl();
  }

  var t;
  input.addEventListener('input', function () {
    clearTimeout(t);
    t = setTimeout(function () { state.q = input.value; render(true); }, 60);
  });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && input.value) { e.preventDefault(); input.value = ''; state.q = ''; render(true); }
    if (e.key === 'Enter') { e.preventDefault(); }
  });
  clearBtn.addEventListener('click', function () { input.value = ''; state.q = ''; render(true); input.focus(); });

  filterBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      state[b.dataset.filter] = b.dataset.value;
      render(true);
    });
  });

  resetBtn.addEventListener('click', function () {
    state = { q: '', cat: 'all', price: 'all' };
    input.value = '';
    render(true);
    input.focus();
  });

  // "/" focuses search (unless typing in a field).
  document.addEventListener('keydown', function (e) {
    if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
    var tag = (document.activeElement && document.activeElement.tagName) || '';
    if (/INPUT|TEXTAREA|SELECT/.test(tag) || document.activeElement.isContentEditable) return;
    e.preventDefault();
    input.focus();
  });

  // Card details toggle.
  grid.addEventListener('click', function (e) {
    var btn = e.target.closest('button[aria-controls]');
    if (!btn) return;
    var card = btn.closest('.tool');
    var open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', String(open));
    card.classList.toggle('open', open);
  });

  render(false);
})();
