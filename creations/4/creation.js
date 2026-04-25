
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
};

//HELPERS

const $ = id => document.getElementById(id);
const t = key => I18N[state.lang][key];

function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
}

function renderAll() {
  applyTheme();
  renderNav();
  renderCreation();
  renderFooter();
  document.documentElement.lang = state.lang;
  document.title = CREATION[state.lang].title + ' — o-o0.com';
}

//CREATION CONTENT DATA

const CREATION = {
  ja: {
    date:    '2026.04.05',
    title:   '記憶の断片',
    desc:    '消えゆく記憶をコラージュで表現した作品。',
    body:    '<p>断片化された紙と線のコラージュ。曖昧になっていく記憶の輪郭を、重なり合う矩形と薄れゆくテクスチャで表現した。何かが終わることへの恐れ。</p>',
    medium:  'コラージュ / デジタル',
  },
  en: {
    date:    '2026.04.05',
    title:   'Fragments of Memory',
    desc:    'A collage work expressing fading memories.',
    body:    '<p>A collage of fragmented paper and lines. The blurring contours of memory growing indistinct, expressed through overlapping rectangles and fading textures. A fear of things coming to an end.</p>',
    medium:  'Collage / Digital',
  },
};

//NAV

function renderNav() {
  const isDark = state.theme === 'dark';
  $('nav').innerHTML = `
    <a class="nav-logo" href="../../index.html">o-o0.com</a>
    <ul class="nav-links">
      <li><a href="../../articles/index.html">${escapeHtml(t('nav')[0])}</a></li>
      <li><a href="../../creations/index.html">${escapeHtml(t('nav')[1])}</a></li>
      <li><a href="../../about/index.html">${escapeHtml(t('nav')[2])}</a></li>
    </ul>
    <div class="nav-right">
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

//RENDER

function renderCreation() {
  const c = CREATION[state.lang];
  $('creation-page').innerHTML = `
    <div class="creation-header">
      <div class="creation-meta">
        <span class="creation-date">${escapeHtml(c.date)}</span>
        <span class="creation-medium">${escapeHtml(c.medium)}</span>
      </div>
      <h1 class="creation-title">${escapeHtml(c.title)}</h1>
      <p class="creation-desc">${escapeHtml(c.desc)}</p>
    </div>
    <div class="creation-image-wrap">
      <img class="creation-image" src="4.png" alt="${escapeHtml(c.title)}">
    </div>
    <div class="creation-body">${c.body}</div>
    <div class="creation-author">
      <div class="creation-author-name">${escapeHtml(AUTHOR.name)}</div>
      <p class="creation-author-bio">${escapeHtml(t('authorBio'))}</p>
    </div>

  `;
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
