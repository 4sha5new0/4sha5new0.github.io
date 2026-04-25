 
const I18N = {
  ja: {
    tagline:          '',
    heroTitle:        'どうでもいいことと、\n本当にどうでもいいこと',
    description:      'ナニかをどうにかします',
    statArticles:     '記事',
    statCreations:    '創作',
    nav:              ['すべての記事', 'すべての創作', '私について'],
    searchPlaceholder:'検索...',
    postsLabel:       'articles',
    creationsLabel:   'creations',
    noResults:        '該当する記事はありません',
    noCreationResults:'該当する創作はありません',
    authorRole:       '',
    authorBio:        '最近、何かが終わってしまうということが怖くてしょうがないのです。',
    footerNote:       '',
  },
  en: {
    tagline:          "",
    heroTitle:        "The Petty\nand the Paltry",
    description:      "Writing and Creating",
    statArticles:     'articles',
    statCreations:    'creations',
    nav:              ['All articles', 'All creations', 'About me'],
    searchPlaceholder:'Search...',
    postsLabel:       'articles',
    creationsLabel:   'creations',
    noResults:        'No articles matched your query.',
    noCreationResults:'No creations matched your query.',
    authorRole:       '',
    authorBio:        "Lately, I'm terribly afraid narrative ending.",
    footerNote:       '',
  },
};
 
const AUTHOR = {
  avatar: '',
  name:   '四捨五入したら0',
  skills: [],
};
 
const FOOTER_LINKS = [
  { label: 'GitHub',  href: 'https://github.com/4sha5new0' },
  { label: 'Twitter(X)', href: 'https://twitter.com/4sha5new0' },
];
 
const TAG_LABELS = {
  Trip:     { ja: '旅行',           en: 'Trip'     }, 
  Opinion:   { ja: '主張',           en: 'Opinion'     },
XREA:   { ja: 'XREA',           en: 'XREA'     },
 
};
 
const POSTS = [

{id:3,tag:{id:'XREA',label:'XREA',cls: 't-XREA'},date:'2026.04.06',
ja:{title:'XREAで「IPアドレスを当サーバに向けて下さい。」とでてくる'},
en:{title:'Untranslated yet...'}},
 
{id:2,tag:{id:'Opinion',label:'Opinion',cls: 't-Opinion'},date:'2026.04.06',
ja:{title:'近年の個人サイトでかつてのそれを模倣するのはただのクラシック演奏なのでは？'},
en:{title:'Untranslated yet...'}},
 

{id:1,tag:{id:'Trip',label:'Trip',cls: 't-Trip'},date:'2026.03.20',
ja:{title:'【ハウステンボス感想・批評】雑な「雰囲気」と子供だまし'},
en:{title:'Untranslated yet...'}},
]

//CREATIONS

const CREATIONS = [

{id:1,date:'2026.04.05',
ja:{title:'4D 2048',desc:'2*2*2*2 の2048'},
en:{title:'Untranslated yet...',desc:'Untranslated yet...'}},



]
