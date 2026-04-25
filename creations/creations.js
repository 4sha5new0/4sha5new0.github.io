
//SECURITY

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[m]);
}

function safeStorage(key, allowed) {
  const val = localStorage.getItem(key);
  return allowed.includes(val) ? val : allowed[0];
}

//STATE

const state = {
  lang:  safeStorage('devlog-lang',  ['ja', 'en']),
  theme: safeStorage('devlog-theme', ['dark', 'light']),
  sort:  'recommended',  // 'recommended' | 'newest' | 'oldest'
  query: '',
};

//HELPERS

const $ = id => document.getElementById(id);
const t = key => I18N[state.lang][key];
const creationTitle = c => (c[state.lang] || c.ja).title;

function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
}

function renderAll() {
  applyTheme();
  renderNav();
  renderHero();
  renderCreations();
  renderFooter();
  document.documentElement.lang = state.lang;
}

//SORT LABELS

const SORT_LABELS = {
  ja: { recommended: 'おすすめ', newest: '新しい順', oldest: '古い順' },
  en: { recommended: 'Recommended', newest: 'Newest',  oldest: 'Oldest' },
};
const sl = key => SORT_LABELS[state.lang][key];
const VALID_SORTS = ['recommended', 'newest', 'oldest'];

//NAV

function renderNav() {
  const isDark = state.theme === 'dark';
  $('nav').innerHTML = `
    <a class="nav-logo" href="../index.html">o-o0.com</a>
    <ul class="nav-links">
      <li><a href="../articles/index.html">${escapeHtml(t('nav')[0])}</a></li>
      <li><a href="../creations/index.html">${escapeHtml(t('nav')[1])}</a></li>
      <li><a href="../about/index.html">${escapeHtml(t('nav')[2])}</a></li>
    </ul>
    <div class="nav-right">
      <div class="nav-search-wrap">
        <span class="search-icon">⌕</span>
        <input id="searchInput" class="nav-search" type="text"
          placeholder="${escapeHtml(t('searchPlaceholder'))}" value="${escapeHtml(state.query)}">
      </div>
      <button id="themeToggle" class="nav-btn" title="Toggle theme">
        <span class="theme-icon">${isDark ? '☀' : '☾'}</span>
      </button>
      <button id="langToggle" class="nav-btn">
        <span class="${state.lang === 'ja' ? 'btn-active' : ''}">JA</span>
        <span class="btn-sep">/</span>
        <span class="${state.lang === 'en' ? 'btn-active' : ''}">EN</span>
      </button>
    </div>
  `;

  $('searchInput').addEventListener('input', e => {
    state.query = e.target.value.toLowerCase();
    renderCreations();
  });
  $('themeToggle').addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('devlog-theme', state.theme);
    renderAll();
  });
  $('langToggle').addEventListener('click', () => {
    state.lang = state.lang === 'ja' ? 'en' : 'ja';
    localStorage.setItem('devlog-lang', state.lang);
    renderAll();
  });
}

//HERO

function renderHero() {
  $('hero').innerHTML = `
    <div class="hero-label">${state.lang === 'ja' ? '' : ''}</div>
    <h1 class="hero-title">${state.lang === 'ja' ? 'すべての創作' : 'All creations'}</h1>
  `;
}

//SORT

function sortedCreations() {
  const base = CREATIONS.filter(c =>
    !state.query || creationTitle(c).toLowerCase().includes(state.query)
  );
  if (state.sort === 'newest') return [...base].sort((a, b) => b.date.localeCompare(a.date));
  if (state.sort === 'oldest') return [...base].sort((a, b) => a.date.localeCompare(b.date));
  return base;
}

//CREATIONS GRID

function renderCreations() {
  const filtered = sortedCreations();

  const cards = filtered.length
    ? filtered.map(c => {
        const data = c[state.lang] || c.ja;
        return `
          <a class="creation-card" href="${encodeURIComponent(c.id)}/index.html">
            <div class="creation-thumb">
              <img src="${encodeURIComponent(c.id)}/${encodeURIComponent(c.id)}.png" alt="${escapeHtml(data.title)}" loading="lazy">
            </div>
            <div class="creation-info">
              <span class="creation-date">${escapeHtml(c.date)}</span>
              <span class="creation-title">${escapeHtml(data.title)}</span>
              <span class="creation-desc">${escapeHtml(data.desc)}</span>
            </div>
          </a>
        `;
      }).join('')
    : `<div class="no-results">${escapeHtml(t('noCreationResults'))}</div>`;

  $('creations-list').innerHTML = `
    <div class="sort-bar">
      ${VALID_SORTS.map(k => `
        <button class="sort-btn ${state.sort === k ? 'active' : ''}" data-sort="${k}">${escapeHtml(sl(k))}</button>
      `).join('')}
      <span class="articles-meta">${filtered.length} ${escapeHtml(t('statCreations'))}</span>
    </div>
    <div class="creations-grid">${cards}</div>
  `;

  $('creations-list').querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (VALID_SORTS.includes(btn.dataset.sort)) {
        state.sort = btn.dataset.sort;
        renderCreations();
      }
    });
  });
}

//FOOTER

function renderFooter() {
  const links = FOOTER_LINKS.map(function(l) {
    return '<a href="' + escapeHtml(l.href) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(l.label) + '</a>';
  }).join('');
  $('footer').innerHTML =
    '<span>© ' + new Date().getFullYear() + ' ' + escapeHtml(AUTHOR.name) + '</span>' +
    '<div class="footer-links">' + links + '</div>';
}

//INIT

applyTheme();
document.addEventListener('DOMContentLoaded', renderAll);
