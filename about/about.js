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
  renderAbout();
  renderFooter();
  document.documentElement.lang = state.lang;
}
 
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
 

//ABOUT CONTENT

const ABOUT = {
  ja: {
    nameKanji: '四捨五入したら0',

    bioLabel: 'この人 is だれ？',
    bio: [
      '2009年<span class="t-del">僻地</span>茨城県生。あまりに教養が足らないし、加えてナニかを記述し得るための語彙力も持ち合わせていない。レトリックを利かせられるわけでも、ユーモアがあるわけでもない。県立高校に落ちるほどのジアゲン。300ページのライトノベルでさえ読むのに苦労するドーパミンガキ。',
      ' <strong class="t-bold">N</strong>MARCHに代表される学校の付属校生。微塵程の希望をもって入学した高校は希望通り、所詮僻地にある<span class="t-del">Fランク</span>学歴フィルターに引っかかる程度の学校の付属であることを再認識させられる。具体例を挙げれば、教員の質は発展した地域のコウリッチュー未満である。',
      '「僕はロンダリングを果たすんだい！！」',
      'どうでもいいことだが、私がインターネッツに浸り始めたころの象徴的な出来事は潤羽るしあ契約解除である。スマホなんて持っていないため(狂気的に懇願したが毎度ビンタで突き放されていた...)、学校で配られたPCとテレビのブラウザでTwitterアカウントを作ったほど。',
      '連絡:ユーザー名は「00」',

    ],

    careerLabel: 'みちのり',
    career: [
      { period: '2009',    place: '生まれる',note: '' },
      { period: '2022 — 2024', place: '公立中学校',note: ''  },
      { period: '2025 — ', place: '私立高校',note: ''  },

    ],
  },

  en: {
    nameKanji: '四捨五入したら0',

    bioLabel: 'bio',
    bio: [
      'I regret creating an English version. haha',
      'So,I might not write much...',
    ],

    careerLabel: 'career',
    career: [
      { period: '2009',    place: 'Born',note: '' },
      { period: '2022 — 2024', place: 'Public Junior High School',note: ''  },
      { period: '2025 — ', place: 'Private High School',note: ''  },
    ],
  },
};

//RENDER
 
function renderAbout() {
  const a = ABOUT[state.lang];
  $('about-page').innerHTML = `
    <div class="profile-header">
      <div class="profile-name">${escapeHtml(a.nameKanji)}</div>
    </div>
 
    <div class="about-section">
      <div class="about-section-label">${escapeHtml(a.bioLabel)}</div>
      ${a.bio.map(p => `<p class="about-text">${p}</p>`).join('')}
    </div>
 
    <div class="about-section">
      <div class="about-section-label">${escapeHtml(a.careerLabel)}</div>
      <div class="career-list">
        ${a.career.map(c => `
          <div class="career-row">
            <span class="career-period">${c.period}</span>
            <div>
              <div class="career-place">${c.place}</div>
              <div class="career-note">${c.note}</div>
            </div>
          </div>
        `).join('')}
      </div>
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