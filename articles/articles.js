

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
  query: '',
  sort:  'recommended',  // 'recommended' | 'newest' | 'oldest'
};

//HELPERS

const $ = id => document.getElementById(id);
const t = key => I18N[state.lang][key];
const postTitle = p => (p[state.lang] || p.ja).title;
const tagLabel  = p => (TAG_LABELS[p.tag.id] || {})[state.lang] || p.tag.label;

function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
}

function renderAll() {
  applyTheme();
  renderNav();
  renderHero();
  renderPosts();
  renderFooter();
  document.documentElement.lang = state.lang;
}

//SORT LABELS

const SORT_LABELS = {
  ja: { recommended: 'おすすめ', newest: '新しい順', oldest: '古い順' },
  en: { recommended: 'Recommended', newest: 'Newest',  oldest: 'Oldest' },
};
const sl = key => SORT_LABELS[state.lang][key];

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
    renderPosts();
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
    <h1 class="hero-title">${state.lang === 'ja' ? 'すべての記事' : 'All articles'}</h1>
  `;
}

//SORT

const VALID_SORTS = ['recommended', 'newest', 'oldest'];

function sortedPosts() {
  const base = POSTS.filter(p =>
    !state.query || postTitle(p).toLowerCase().includes(state.query)
  );
  if (state.sort === 'newest') return [...base].sort((a, b) => b.date.localeCompare(a.date));
  if (state.sort === 'oldest') return [...base].sort((a, b) => a.date.localeCompare(b.date));
  return base;
}

//POSTS

function renderPosts() {
  const filtered = sortedPosts();

  const rows = filtered.length
    ? filtered.map(p => `
        <div class="post-row">
          <span class="post-row-date">${escapeHtml(p.date)}</span>
          <span class="post-row-body">
            <a class="post-row-title" href="../articles/${encodeURIComponent(p.id)}/index.html">${escapeHtml(postTitle(p))}</a>
            <a class="post-row-tag ${escapeHtml(p.tag.cls)}" href="../tags/index.html?tag=${encodeURIComponent(p.tag.id)}">${escapeHtml(tagLabel(p))}</a>
          </span>
        </div>
      `).join('')
    : `<div class="no-results">${escapeHtml(t('noResults'))}</div>`;

  $('posts').innerHTML = `
    <div class="sort-bar">
      ${VALID_SORTS.map(k => `
        <button class="sort-btn ${state.sort === k ? 'active' : ''}" data-sort="${k}">${escapeHtml(sl(k))}</button>
      `).join('')}
      <span class="articles-meta">${filtered.length} ${escapeHtml(t('statArticles'))}</span>
    </div>
    <div class="posts-list">${rows}</div>
  `;

  $('posts').querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (VALID_SORTS.includes(btn.dataset.sort)) {
        state.sort = btn.dataset.sort;
        renderPosts();
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
