//SECURITY HELPERS
function escapeHtml(str) {
  return String(str).replace(/[&<>\"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[m]);
}

//
function safeStorage(key, allowed) {
  const val = localStorage.getItem(key);
  return allowed.includes(val) ? val : allowed[0];
}

//STATE
const state = {
  lang:  safeStorage('devlog-lang',  ['ja', 'en']),
  theme: safeStorage('devlog-theme', ['dark', 'light']),
  query: '',
};

//HELPERS
const $ = id => document.getElementById(id);
const t = key => I18N[state.lang][key];
const postTitle = p => (p[state.lang] || p.ja).title;
const tagLabel  = p => (TAG_LABELS[p.tag.id] || {})[state.lang] || p.tag.label;
const creationTitle = c => (c[state.lang] || c.ja).title;
function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
}

function renderAll() {
  applyTheme();
  renderNav();
  renderHero();
  renderPosts();
  renderCreations();
  renderSidebar();
  renderFooter();
  document.documentElement.lang = state.lang;
}

//ROUTING
const NAV_HREFS = [
  'articles/index.html',
  'creations/index.html',
  'about/index.html',
];

//NAV
function renderNav() {
  const isDark = state.theme === 'dark';

  $('nav').innerHTML = `
    <div class="nav-logo">o-o0.com</div>
    <ul class="nav-links">
      ${t('nav').map((n, i) => `<li><a href="${NAV_HREFS[i]}">${escapeHtml(n)}</a></li>`).join('')}
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
  const lines = t('heroTitle').split('\n').map(escapeHtml);
  $('hero').innerHTML = `
    <div class="hero-label">${escapeHtml(t('tagline'))}</div>
    <h1 class="hero-title">${lines.join('<br>')}</h1>
    <p class="hero-desc">${escapeHtml(t('description'))}</p>
    <div class="hero-stats">
      <div class="hero-stat">
        <span class="hero-stat-num">${POSTS.length}</span>
        <span>${escapeHtml(t('statArticles'))}</span>
      </div>
      <div class="hero-stat">
        <span class="hero-stat-num">${CREATIONS.length}</span>
        <span>${escapeHtml(t('statCreations'))}</span>
      </div>
    </div>
  `;
}

//POSTS — 16記事まで
const HOME_MAX_POSTS = 16;

function renderPosts() {
  const filtered = POSTS.filter(p =>
    !state.query || postTitle(p).toLowerCase().includes(state.query)
  ).slice(0, HOME_MAX_POSTS);

  const rows = filtered.length
    ? filtered.map(p => `
        <div class="post-row">
          <span class="post-row-date">${escapeHtml(p.date)}</span>
          <span class="post-row-body">
            <a class="post-row-title" href="articles/${encodeURIComponent(p.id)}/index.html">${escapeHtml(postTitle(p))}</a>
            <a class="post-row-tag ${escapeHtml(p.tag.cls)}" href="tags/index.html?tag=${encodeURIComponent(p.tag.id)}">${escapeHtml(tagLabel(p))}</a>
          </span>
        </div>
      `).join('')
    : `<div class="no-results">${escapeHtml(t('noResults'))}</div>`;

  $('posts').innerHTML = `
    <div class="section-label">${escapeHtml(t('postsLabel'))}</div>
    <div class="posts-list">${rows}</div>
  `;
}

//CREATIONS — ホームは最大16作品まで表示。それ以上はフッターのリンクからアクセス
const HOME_MAX_CREATIONS = 16;

function renderCreations() {
  const filtered = CREATIONS.filter(c =>
    !state.query || creationTitle(c).toLowerCase().includes(state.query)
  ).slice(0, HOME_MAX_CREATIONS);

  const cards = filtered.length
    ? filtered.map(c => {
        const data = c[state.lang] || c.ja;
        return `
          <a class="creation-card" href="creations/${encodeURIComponent(c.id)}/index.html">
            <div class="creation-thumb">
              <img src="${encodeURIComponent(c.id)}.png" alt="${escapeHtml(data.title)}" loading="lazy">
            </div>
            <div class="creation-info">
              <span class="creation-date">${escapeHtml(c.date)}</span>
              <span class="creation-title">${escapeHtml(data.title)}</span>
            </div>
          </a>
        `;
      }).join('')
    : `<div class="no-results">${escapeHtml(t('noCreationResults'))}</div>`;

  $('creations').innerHTML = `
    <div class="section-label">${escapeHtml(t('creationsLabel'))}</div>
    <div class="creations-grid">${cards}</div>
  `;
}

//ABOUT
function renderSidebar() {
  $('sidebar').innerHTML = `
    <div class="about-wrap">
      <div class="about-avatar">${escapeHtml(AUTHOR.avatar)}</div>
      <div>
        <div class="about-name">${escapeHtml(AUTHOR.name)}</div>
        <div class="about-role">${escapeHtml(t('authorRole'))}</div>
        <p class="about-bio">${escapeHtml(t('authorBio'))}</p>
        <div class="about-skills">
          ${AUTHOR.skills.map(s => `<span class="skill-chip">${escapeHtml(s)}</span>`).join('')}
        </div>
      </div>
    </div>`;
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
