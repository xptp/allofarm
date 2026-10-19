import { newsData } from './pages/press/newsData';

// Production domain. Keep this independent of the preview host.
export const SITE_URL = 'https://allopharm.ru';
export const homePath = (language) => language === 'en' ? '/en/' : '/';
const entry = (ruTitle, ruDescription, enTitle, enDescription) => ({
  ru: { title: ruTitle, description: ruDescription },
  en: { title: enTitle, description: enDescription },
});

const pages = {
  '': entry('Аллофарм — биотехнологическая компания', 'Аллофарм (Allopharm) — биотехнологическая компания в Санкт-Петербурге. Разработки, Алломедин Про, научные публикации и сотрудничество.', 'Allopharm — biotechnology company', 'Allopharm is a biotechnology company in Saint Petersburg, Russia. Explore our developments, Allomedin Pro, scientific publications and partnership opportunities.'),
  about: entry('О компании — Аллофарм', 'О компании Аллофарм: исследования иммунной системы насекомых, биотехнологии, разработки и направления деятельности.', 'About Allopharm', 'About Allopharm: insect immune system research, biotechnology, developments and company activities.'),
  'intellectual-property': entry('Интеллектуальная собственность — Аллофарм', 'Патенты, товарные знаки и интеллектуальная собственность компании Аллофарм. Документация и сведения о разработках.', 'Intellectual property — Allopharm', 'Allopharm patents, trademarks and intellectual property. Documentation and information about company developments.'),
  base: entry('Исследовательская база — Аллофарм', 'Исследовательская база Аллофарм: изучение иммунной системы насекомых, пептидов и биотехнологических платформ.', 'Research base — Allopharm', 'Allopharm research base: insect immunity, peptides and biotechnology platforms.'),
  allomedin: entry('АЛЛОМЕДИН® ПРО — гидрогель для ухода за кожей | Аллофарм', 'АЛЛОМЕДИН® ПРО — косметический гидрогель для ухода за кожей лица и тела. Сведения о составе, применении и документации на сайте компании Аллофарм.', 'ALLOMEDIN® PRO — skin care hydrogel | Allopharm', 'ALLOMEDIN® PRO is a cosmetic hydrogel for face and body skin care. Ingredients, application information and product documentation from Allopharm.'),
  entomix: entry('ЭНТОМИКС® — информация о разработке | Аллофарм', 'ЭНТОМИКС®: сведения о гидрогелевом покрытии, составе, применении и документации. Разработка компании Аллофарм.', 'ENTOMIX® — development information | Allopharm', 'ENTOMIX® hydrogel coating: composition, application information and documentation. An Allopharm development.'),
  allostatins: { ru: { title: 'АЛЛОСТАТИН® — пептидная разработка | Аллофарм', description: 'АЛЛОСТАТИН®: информация о пептиде, исследованиях и научных публикациях компании Аллофарм.' } },
  flip7: entry('FLIP®7 — пептидный комплекс | Аллофарм', 'FLIP®7: информация о комплексе пептидов, исследованиях и научных публикациях компании Аллофарм.', 'FLIP®7 — peptide complex | Allopharm', 'FLIP®7 peptide complex: research, scientific publications and development information from Allopharm.'),
  'inova-c': entry('InOVA-C — биотехнологическая разработка | Аллофарм', 'InOVA-C: сведения о биотехнологической разработке, исследованиях и публикациях компании Аллофарм.', 'InOVA-C — biotechnology development | Allopharm', 'InOVA-C: biotechnology development, research and publications from Allopharm.'),
  calliphoridae: entry('Технология выращивания насекомых — Аллофарм', 'Технология выращивания насекомых семейства Calliphoridae: исследовательская платформа и разработки компании Аллофарм.', 'TECHNOLOGY OF THE CALLIPHORIDAE — Allopharm', 'TECHNOLOGY OF THE CALLIPHORIDAE: insect cultivation, research platform and biotechnology developments from Allopharm.'),
  articles: entry('Новости — Аллофарм', 'Новости компании Аллофарм: события, разработки, исследования и публикации. Архив новостей с поиском.', 'News — Allopharm', 'Allopharm news: company events, developments, research and publications. Search the news archive.'),
  publications: entry('Наши публикации — Аллофарм', 'Научные публикации компании Аллофарм о пептидах и иммунной системе насекомых. Список работ и полные тексты в PDF.', 'Our publications — Allopharm', 'Scientific publications from Allopharm on peptides and insect immunity. Browse papers and download full texts in PDF.'),
  contact: entry('Контакты — Аллофарм', 'Контакты ООО «Аллофарм» в Санкт-Петербурге: адрес офиса и лабораторий, телефоны и электронная почта.', 'Contacts — Allopharm', 'Contact Allopharm in Saint Petersburg, Russia: office and laboratory address, phone numbers and email.'),
  cooperation: entry('Сотрудничество — Аллофарм', 'Сотрудничество с Аллофарм: исследования, развитие биотехнологических разработок и интеллектуальная собственность. Информация для партнёров.', 'Cooperation — Allopharm', 'Partner with Allopharm in research, biotechnology development and intellectual property. Information for potential partners.'),
};

const pathFor = (slug, lang) => slug ? `${lang === 'en' ? '/en' : ''}/${slug}/` : homePath(lang);
export function getSeo(path) {
  const clean = path.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
  const language = clean === '/en' || clean.startsWith('/en/') ? 'en' : 'ru';
  let slug = clean.replace(/^\/en(?=\/|$)/, '').replace(/^\//, '');
  if (slug === 'allostatin') slug = 'allostatins';
  let variants = pages[slug];
  if (slug.startsWith('articles/')) {
    const article = newsData.find(item => item.slug === slug.slice(9));
    if (article) variants = Object.fromEntries(['ru', 'en'].filter(lang => article[lang]).map(lang => [lang, {
      title: `${article[lang].title} — ${lang === 'ru' ? 'Аллофарм' : 'Allopharm'}`,
      description: lang === 'ru' ? `Материал из архива новостей Аллофарм: ${article[lang].title}.` : `From the Allopharm news archive: ${article[lang].title}.`,
    }]));
  }
  const localized = variants?.[language];
  const fallback = variants?.ru;
  const canonicalLanguage = localized ? language : 'ru';
  const canonical = variants ? SITE_URL + pathFor(slug, canonicalLanguage) : null;
  return {
    language,
    title: localized?.title || fallback?.title || (language === 'ru' ? 'Страница не найдена — Аллофарм' : 'Page not found — Allopharm'),
    description: localized?.description || fallback?.description || (language === 'ru' ? 'Запрошенная страница не найдена.' : 'The requested page could not be found.'),
    canonical,
    noindex: !localized,
    alternates: variants ? Object.keys(variants).map(lang => ({ language: lang, href: SITE_URL + pathFor(slug, lang) })) : [],
  };
}

export function getIndexablePaths() {
  return [
    ...Object.entries(pages).flatMap(([slug, variants]) => Object.keys(variants).map(lang => pathFor(slug, lang))),
    ...newsData.flatMap(article => ['ru', 'en'].filter(lang => article[lang]).map(lang => pathFor(`articles/${article.slug}`, lang))),
  ];
}

// Shared between static HTML generation and client-side navigation.
export function seoTags(seo) {
  const tags = [
    ['meta', { name: 'description', content: seo.description }],
    ['meta', { name: 'robots', content: seo.noindex ? 'noindex, follow' : 'index, follow' }],
    ['meta', { property: 'og:title', content: seo.title }],
    ['meta', { property: 'og:description', content: seo.description }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Allopharm / Аллофарм' }],
    ['meta', { property: 'og:locale', content: seo.language === 'ru' ? 'ru_RU' : 'en_GB' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: seo.title }],
    ['meta', { name: 'twitter:description', content: seo.description }],
  ];
  if (seo.canonical) tags.push(['link', { rel: 'canonical', href: seo.canonical }], ['meta', { property: 'og:url', content: seo.canonical }]);
  if (!seo.noindex) {
    seo.alternates.forEach(item => tags.push(['link', { rel: 'alternate', hreflang: item.language, href: item.href }]));
    const ru = seo.alternates.find(item => item.language === 'ru');
    if (ru) tags.push(['link', { rel: 'alternate', hreflang: 'x-default', href: ru.href }]);
  }
  return tags;
}

export function applySeo(seo) {
  document.title = seo.title;
  document.documentElement.lang = seo.language;
  document.head.querySelectorAll('[data-site-seo], meta[name="description"]').forEach(node => node.remove());
  seoTags(seo).forEach(([tag, attributes]) => {
    const node = document.createElement(tag);
    node.setAttribute('data-site-seo', '');
    Object.entries(attributes).forEach(([name, value]) => node.setAttribute(name, value));
    document.head.appendChild(node);
  });
}
