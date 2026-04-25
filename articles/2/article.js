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
  renderArticle();
  renderToc();
  renderArticleFooter();
  renderFooter();
  document.documentElement.lang = state.lang;
  document.title = ARTICLE[state.lang].title + ' — o-o0.com';
}
 
//NAV
 
function renderNav() {
  const isDark = state.theme === 'dark';
  $('nav').innerHTML = `
    <a class="nav-logo" href="../../index.html">o-o0.com</a>
    <ul class="nav-links">
      <li><a href="../../articles/index.html">${escapeHtml(t('nav')[0])}</a></li>
      <li><a href="../../about/index.html">${escapeHtml(t('nav')[1])}</a></li>
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
 
//ARTICLE CONTENT DATA
 
const ARTICLE = {
  ja: {
    date:     '2026.04.06',
    tag:      '主張',
    tagCls:   'tag-Opinion',
    tagId:    'Opinion',
    title:    '近年の個人サイトでかつてのそれを模倣するのはただのクラシック演奏なのでは？',
    subtitle: '懐古厨が！',
    body: `
 
<h2>4字の.com を取れた。</h2>
<p>
そうそう、英数字+ハイフンの37種だから37^4で1,874,161種(細かいルールを除く)でそこまでレアなものではない。
しかし人類80億人にそれぞれに4文字の.comは与えられないどころか、二百万総茨城県民にも与えられないのだ！
</p> 
<p>
しかし新規で4字の.comを取るのは難しいらしく、このサイトも韓国人の個人ブログっぽいの、中国の何かx2を経由してコレになっている。
</p>
<p>
それなりにレアではあるっぽいので一生持ち続けたいと、今は思っている。
</p>

<h2>個人ブログに関するアレ</h2>
<p>
個人ブログ全盛の頃の技術を現在で模倣し、それを個人ブログを作っているのはどうなのだろう？
でも無駄に洗練された、ダークパターン味があるものよりは幾分ましだろうが、
せっかく十分な技術があるのに使わないのはどうだろう？言い換えればクラシックである。
</p>
<p>
それがPV数などを除いて、単純な存在する量単体で見たとき、個人ブログにおいてクラシックが顕著なのではと見える。
しかも、クラシックが人気を博す場合も多い。
</p>

<h2>クラシックと言ったら音楽～</h2>
<p>
近年の音楽で大衆ウケするのはPOPSであり、クラシックなんで逆張りキッズ(もしくはアダルト)のものである。
が、個人ブログでは「おお」と受け入れられがちなのは、なんでだろう？
</p>
    `,
  },
 
  en: {
    date:     '2026.04.06',
    tag:      'Opinion',
    tagCls:   'tag-Opinion',
    tagId:    'Opinion',
    title:    'Untranslated yet...',
    subtitle: '',
    body: `
 
<h2>Untranslated yet...</h2>
    `,
  },
};
 
//RENDER ARTICLE
 
function renderArticle() {
  const a = ARTICLE[state.lang];
  const tweetUrl = 'https://twitter.com/intent/tweet?text='
    + encodeURIComponent(a.title)
    + '&url='
    + encodeURIComponent(location.href);
  $('article-header').innerHTML = `
    <div class="article-meta">
      <span class="article-date">${escapeHtml(a.date)}</span>
      <a class="article-tag ${escapeHtml(a.tagCls)}" href="../../tags/index.html?tag=${encodeURIComponent(a.tagId)}">${escapeHtml(a.tag)}</a>
      <a class="article-share" href="${escapeHtml(tweetUrl)}" target="_blank" rel="noopener noreferrer">Tweet(Post)</a>
    </div>
    <h1 class="article-title">${escapeHtml(a.title)}</h1>
    <p class="article-subtitle">${escapeHtml(a.subtitle)}</p>
  `;
  $('article-body').innerHTML = a.body;
}
 
function renderArticleFooter() {
  const skills = AUTHOR.skills.map(function(s) {
    return '<span class="skill-chip">' + escapeHtml(s) + '</span>';
  }).join('');
  $('article-footer').innerHTML =
    '<div class="about-wrap">' +
      '<div class="about-avatar">' + escapeHtml(AUTHOR.avatar) + '</div>' +
      '<div>' +
        '<div class="about-name">' + escapeHtml(AUTHOR.name) + '</div>' +
        '<div class="about-role">' + escapeHtml(t('authorRole')) + '</div>' +
        '<p class="about-bio">' + escapeHtml(t('authorBio')) + '</p>' +
        '<div class="about-skills">' + skills + '</div>' +
      '</div>' +
    '</div>' ;
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
 
//TABLE OF CONTENTS
 
function renderToc() {
  const tocEl = $('article-toc');
  if (!tocEl) return;
 
  const headings = Array.from(
    document.querySelectorAll('#article-body h2')
  );
 
  if (headings.length === 0) {
    tocEl.innerHTML = '';
    return;
  }
 
  headings.forEach((h, i) => {
    if (!h.id) h.id = 'section-' + i;
  });
 
  const tocLabel = state.lang === 'ja' ? '目次' : 'Contents';
 
  tocEl.innerHTML = `
    <div class="toc-label">${escapeHtml(tocLabel)}</div>
    <ol class="toc-list">
      ${headings.map((h, i) => `
        <li class="toc-item">
          <a class="toc-link" href="#${escapeHtml(h.id)}">
            <span class="toc-num">${String(i + 1).padStart(2, '0')}</span>
            <span class="toc-text">${escapeHtml(h.textContent)}</span>
          </a>
        </li>
      `).join('')}
    </ol>
  `;
}
 
//READING PROGRESS BAR
 
function initProgressBar() {
  const bar = document.createElement('div');
  bar.id = 'reading-progress';
  document.body.appendChild(bar);
 
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
  }, { passive: true });
}
 
//INIT
 
applyTheme();
document.addEventListener('DOMContentLoaded', () => {
  renderAll();
  initProgressBar();
});