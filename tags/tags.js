
//SECURITY HELPERS

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

const VALID_TAG_IDS = Object.keys(TAG_LABELS);

function tagFromUrl() {
  const raw = new URLSearchParams(location.search).get('tag') || '';
  return VALID_TAG_IDS.includes(raw) ? raw : VALID_TAG_IDS[0];
}

const state = {
  lang:  safeStorage('devlog-lang',  ['ja', 'en']),
  theme: safeStorage('devlog-theme', ['dark', 'light']),
  sort:  'recommended',
  tag:   tagFromUrl(),
  query: '',
};

//HELPERS

const $ = id => document.getElementById(id);
const t = key => I18N[state.lang][key];
const postTitle = p => (p[state.lang] || p.ja).title;
const tagLabel  = id => (TAG_LABELS[id] || {})[state.lang] || id;
const tagCls    = id => { const p = POSTS.find(p => p.tag.id === id); return p ? p.tag.cls : ''; };

function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
}

function pushTag(id) {
  history.pushState({}, '', '?tag=' + encodeURIComponent(id));
  state.tag = id;
}

function renderAll() {
  applyTheme();
  renderNav();
  renderHero();
  renderPosts();
  renderFooter();
  document.documentElement.lang = state.lang;
  document.title = tagLabel(state.tag) + ' — o-o0.com';
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

  //タグページの検索バー
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
    <div class="hero-label">${state.lang === 'ja' ? 'タグ' : 'tag'}</div>
    <h1 class="hero-title">${escapeHtml(tagLabel(state.tag))}</h1>
  `;
}

//SORT

function sortedPosts() {
  //タグでフィルタ、さらに検索クエリでフィルタ
  const base = POSTS.filter(p =>
    p.tag.id === state.tag &&
    (!state.query || postTitle(p).toLowerCase().includes(state.query))
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
            <a class="post-row-tag ${escapeHtml(p.tag.cls)}" href="?tag=${encodeURIComponent(p.tag.id)}">${escapeHtml(tagLabel(p.tag.id))}</a>
          </span>
        </div>
      `).join('')
    : `<div class="no-results">${escapeHtml(t('noResults'))}</div>`;

  //ソート
  const sortBtns = VALID_SORTS.map(k =>
    `<button class="sort-btn ${state.sort === k ? 'active' : ''}" data-sort="${k}">${escapeHtml(sl(k))}</button>`
  ).join('');

  //タグフィルタ
  const tagBtns = VALID_TAG_IDS.map(id =>
    `<button class="tag-filter-btn ${state.tag === id ? 'active' : ''}" data-tag="${id}">${escapeHtml(tagLabel(id))}</button>`
  ).join('');

  $('posts').innerHTML = `
    <div class="sort-bar">
      ${sortBtns}
      <span class="articles-meta">${filtered.length} ${escapeHtml(t('statArticles'))}</span>
    </div>
    <div class="tag-bar">
      ${tagBtns}
    </div>
    <div class="posts-list">${rows}</div>
  `;

  //イベント
  $('posts').querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (VALID_SORTS.includes(btn.dataset.sort)) {
        state.sort = btn.dataset.sort;
        renderPosts();
      }
    });
  });


  $('posts').querySelectorAll('.tag-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (VALID_TAG_IDS.includes(btn.dataset.tag)) {
        pushTag(btn.dataset.tag);
        renderAll();
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
    '<span>\u00a9 ' + new Date().getFullYear() + ' ' + escapeHtml(AUTHOR.name) + '</span>' +
    '<div class="footer-links">' + links + '</div>';
}

//POPSTATE

window.addEventListener('popstate', () => {
  state.tag = tagFromUrl();
  renderAll();
});

//INIT

applyTheme();
document.addEventListener('DOMContentLoaded', renderAll);
