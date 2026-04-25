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
    tag:      '旅行',
    tagCls:   'tag-Trip',
    tagId:  'Trip',
    title:    '【ハウステンボス感想・批評】雑な「雰囲気」と子供だまし',
    subtitle: 'なぜ古びれた過剰演出、雰囲気だけのテーマパークが存続し得るのか?女性的価値観・デザイン・人相・オランダ',
    body: `




<div class="callout">
  「真理が女であると考えてみては―――、どうだろう?」
  <br><div style="display: flex; justify-content: flex-end;"> ――― ニーチェ</div>
  <br>ニーチェ著、中山元訳『善悪の彼岸』(光文社古典新訳文庫、2009)
</div>

    <h2>簡単に言ってやれば、もう子孫を残した本邦の男性は行くことを拒否していい。</h2>
<p>
  長崎県といったらナニがあるだろうか。軍艦島?
  ちゃんぽん?
<p>
  違う。「ハウステンボス」だ。
</p>
<p>
ハウステンボス。それはオランダの街並みを<strong class="t-bold">再現</strong>した長崎にあるテーマパークである。
民放でまれに取り上げられる、城がライトでプロジェクションされるアレがある場所である、夢のような場所...?
しかしこのテーマパークはディズニーリゾートとは違う。街並みを再現しているだけで、あくまで現実なのだ。
ふつうにおじさんがチューリップを植えているし、トラックも真昼間に通行している。
<p>
あくまでこの点はいい。これは別にいいのだ。まったく問題ない。問題はアトラクションである。アトラクションがあまりに酷い。
様々なアトラクションで子供や、<span class="t-del">通俗的</span>本邦の女性にとってはエキゾチックなアトモスフィアを楽しめるだろうが、
私を含むちょっと神経質なアレな人たちは内心に隠しておくべき(認識すべきではない)「う、うぉ...」を認識してしまいうるのだ。
</p>
<p>
ハウステンボスにあこがれる(ここで、任意のテーマパークにあこがれうるのは女性のみという仮定をする。)ようなパートナーとの旅行で、
紳士側は高次認知故にシニカルな感情を持つまたは最悪、態度を呈してしまう。だが淑女はここで述べているように、楽しいのだ。このことが言えるのは、
もう子孫を残した本邦の男性は行くことを拒否していい。
</p>




<h2>個々の素晴らしい点について。</h2>
<p>
  ハウステンボスの何もかもが散々な訳ではない。勿論、一定の評価を与えるべきものはたくさんある。
</p>

<p>
代名詞ともいえよう3Dプロジェクションは構成はともかく、圧倒されるだけの迫力があったし、
噴水ショーはかつて見た中で最も美しかった。特筆すべきではないが、ここでしか見られないもの、ここぐらいでしかできない体験がたくさんある。
(それはすべてのテーマパーク、ましてやパークにも言えることだが...)
</p>

<h2>飲み込むべき点</h2>
<p>
  学生アルバイトがほとんど、つまりヒト to ヒトのサービスは飲み込もう。別に模範的な場合のほうが多いし、さすがに接客に難をつけるのはかわいそうだろう。
</p>


<h2>酷い点：食事</h2>
<p>
  高い。特別感がズレている。店内の演出が過剰。おいしいわけではない。(言い換えると?)
</p>
<p>
よく食べ物は見た目も重要であるといわれる。私もそう思うし、たいていそう思っているだろう。
実際、ハウステンボスの食事の見た目はよくできている。
ただ、見た目の前に直すところがあるのではないか?
見た目の良さが問われるのは食の本質―――味がすでによくできている場合であるという前提条件が必須だろう。
</p>
<p>
しかしどうだろう。私は寿司を昼食に食べたのだが、回転寿司程度の質だが値段は特別だ。海が近いから魚もうまいだろう。こう考えてハウステンボスで魚を食べるべきではない。
</p>
<p>
ここである矛盾が生じる。ハウステンボスはオランダの牧歌的日常生活を長崎という日本国内で楽しめるものであるはずだが、財やサービスに日常とはかけ離れた対価を要求される。
テーマパークであるからして、それ自体がある程度の「特別感」的要素であるのは理解している。認めよう。
しかし、前に述べたようにハウステンボスは「現実ではないそれ」を提供していない。
ならば現実的な対価であるべきなのではないか。
(もしかしたらオランダを完全再現するあまり、WASYOKU in オランダ 価格なのかもしれない...)

</p>
<h2>酷い点：アトラクション</h2>

<h3>デザイン</h3>
<p>
デザイナーは子供を舐めている、もしくはデザイナーが子供の知能であるのどちらかかは分かりっこないが、なに、細部が雑。本当に雑。見てられない。
</p>
<p>
動きは面白い。たのしいぃ！が、ストーリーベースのアトラクションや細部の意味が付与される(本棚の並びかたなど)の作りが甘いし雑。
どうにかならなかったものなのか。
</p>
ストーリーに関して、予定調和にキれているのではない。子供が入るアトラクションでバットエンドなんか採用するバカはいない。
滑稽さにキれているのだ。
ナニかはあえて言わないが、現実のニュースを
追っているのなら避けるべきではないのか?
と思ったテーマのストーリーがあったり、これは喜劇なのか...?
自己言及的すぎるな...?
というものがあったりする。
</p>
<p>
子供をバカにしている、舐めていると感じたのは本棚の並びかただ。例を挙げれば、百科事典A-B?D?(曖昧)-まったく別の本4冊-百科事典M-Zという、現実では到底見られないであろう、
A型さんブチギレ案件の本棚であり、いくら子供に向けてるとはいえ、せめて順番程度は現実に即したものにすべきである。
二冊連続しておいてあったら「うーん...なんか変わり映えしないなぁ...」ランダムに並び変えて、「お、なんかいい感じだな！じゃないんですよ。
もしかして英語を読めない幼稚園児の感性（笑）をおもちでしたか?
</p>
<p>
近未来的なナニかを感じさせるために低品質な合成音声を使って楽しようとした過去のせいで、高度なAIが発達した今は違和感があるし、
デザインとしての数式は全体を頑張れば読解できるくらいにぼかすくせして高校数学レベルで「理解できない」感を与えたいのか「読解して」もらいたいのかよくわからないし、
科学が来たか...!とおもえば光速を超えていたり、オカルトと混同していたり、細部がテキトウである。
</p>
<p>
さらに、老朽化への整備が行き届いていない。スクリーンにある傷はものすごくノイズで、「おお！」
から目を覚まさせてくれる。子供が多く入るかつ人気がないかつ小さなアトラクションではテキトウな設備が多かったりする。
いちいちのデザイン、椅子、設備が安っぽく、古臭いままであるのだ。
</p>
<p>
徹底して来場者を楽しませたい、そういう熱意がデザインから一切感じられなかった。逆にこうしとけばいいんじゃね?www のような、
いわゆる文化祭の陽キャ的美的価値観により創造されたものだとさえ感じさせてくれた。
</p>
<p>
神は細部に宿るなんて言ったりするが、たぶん、ハウステンボスに神はいないだろう。
</p>

<h3>迫力</h3>
<p>
これに難をつけるのはかわいそうだが、全体的に弱い・うるさい。
</p>

<p>

</p>
<h3>不便</h3>
<p>
トイレが少ない。増やしてほしいものだ。ゴミ箱はたくさんあるのに。
</p>
<p>
敷地が広大なくせして設計が雑。誘導ができていないから主体的に動かざるを得ない。
</p>


<h2>人相</h2>
<p>
ところで、人相学という、嘘SSランクの学問が存在していることは有名だろう。
別にこの記事は「あなたを人相学に誘う～人相学の世界～」なんて馬鹿げたものではない。
一般的な人相の使われ方、ファーストインプレッションにおける場合だ。
</p>

<p>
たいていの人間、いやこれは私だけかもしれないが、
ふと通りがかる、視界に映る人の顔を嫌でも見てしまう。そこで長崎人について
主に東京、広く関東とは別の顔の雰囲気の形、要するに人相の差異を感じたのだ。
</p>
<p>
これは完全に長崎人の悪口へとなるのだが、圧倒的競争社会からはかけ離れているゆえんか子供はもちろん、
定年後余暇を過ごしているであろう大人・老人が要するに「垢ぬけ」ていないのだ。TikTok のクソガキのような主張なのも知れないがこれは私の感じた事実だ。
ここでお前の顔はどうなんだ?
という主張はやめてもらいたい。あと私は執筆時未成年だし。
</p>
<p>
疑似科学に懐疑的姿勢を取っているが、生物の本能、直観でどうしても顔からの情報を得てしまうのは
どうしようもないことではないか?
よろしくないというのならダウン症と調べてみてほしい。本能からの
拒絶を感じることができるのではないか?
</p>
<p>
これは欧州のプロパガンダに適合しないか?
ならば東海村jco臨界事故
に関する感想で
「大量被曝して染色体がバラバラになった瞬間、生物学的に人ではなくなり、人の形をしただけの何かになるからな」
というのはまるで巧妙な叙述とされるが、
大量被曝とダウン症の本質は割と等しい(等しい原理で生殖が難しい)ので
「染色体異常として染色体がヒトであるべき姿とは違う形でヒトが作られたら、それはもはや人の形をしただけの何かだからな」
と叙述したところでこれは評価されるべきかもしれない...
</p>

<p>
少々脱線した。安心してほしいが、私は優生学的思想ではない。つまり殺せと言っているわけではなく、産み落とされたら
一般人とは隔離すべきというわけだ。それもそこで倫理的に問題ないように。そしてそこで従事する人は公務員にするべきなのだ。
</p>

<p>
テキトウな駄文を並べたが、「垢ぬけ」についてもう少し話す。長崎人が競争していないのは容易に想像できるだろうが、
それも人相に表れているように見えた。男性も女性も多くがどこか幼げで、洗練されていない、欧州の生まれたときから「垢ぬけ」ている白色人種とは
対比されるような人々であって、とてもよかった。
</p>






<h2>簡単に言ってやれば、もう子孫を残した本邦の男性も行ってみてもいいかもしれない。</h2>
<p>
オランダと聞いて、ナニを思うだろうか。チューリップ?
自転車?
ミッフィー?
大麻?
売春...?
<br>まあいいさ。俺は童貞だよ
</p>
<p>
えー残念ながら、ハウステンボスには、上の後者はありません。
逆に言えば、前者―――まるでオランダを象徴するかのようなモノは大々的にある。
ハウステンボスは我々貧乏で生涯海外に行けずとも、オランダアトモスフィアを楽しめるある種福祉的健全テーマパークなのである。

</p>

    `,
  },

  en: {
    date:     '2026.04.06',
    tag:      'Trip ',
    tagCls:   'tag-Trip',
    tagId:  'Trip',
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

  //h2 収集
  const headings = Array.from(
    document.querySelectorAll('#article-body h2')
  );

  if (headings.length === 0) {
    tocEl.innerHTML = '';
    return;
  }

  //各 h2 に id 
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
