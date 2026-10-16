import { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import About from './pages/About/About';
import IntellectualProperty from './pages/About/IntellectualProperty';
import DevelopmentsLayout from './components/DevelopmentsLayout';
import { developmentPages } from './pages/developments/pages';
import { getRoute, normalizePath, developmentPath, developmentMenuSlugs } from './pages/developments/navigation';
import { getNewsRoute, newsPath, getNewsBySlug, NewsArchive, NewsArticle } from './pages/press/News';
import PublicationsPage, { getPublicationsRoute, publicationsPath } from './pages/press/Publications';
import Contact, { contactPath, getContactRoute } from './pages/Contact';
import Cooperation, { cooperationPath, getCooperationRoute } from './pages/Cooperation';
import './styles/global.css';

const copy = {
  ru: {
    descriptor: 'Биотехнологическая компания', nav: ['Главная', 'О компании', 'Наши разработки', 'Новости', 'Пресс-центр', 'Контакты', 'Сотрудничество'],
    menu: 'Открыть меню', close: 'Закрыть меню', aboutPages: ['О нас', 'Интеллектуальная собственность'], developmentPages: ['Исследовательская база', 'АЛЛОСТАТИН®', 'FLIP®7', 'InOVA-C', 'АЛЛОМЕДИН® ПРО', 'ЭНТОМИКС®', 'Технология культивирования насекомых'], pressPages: ['СМИ о нас', 'Наши публикации'], eyebrow: 'Биомиметика иммунной системы насекомых',
    title: <>АЛЛОФАРМ<br /><span>Биотехнологическая компания</span></>,
    slides: ['Антимикробные и противоопухолевые средства нового поколения на основе природных пептидов врождённого иммунитета.', 'Настоящие биотехнологии: химический пептидный синтез и замкнутый цикл культивирования биомассы.', 'Миллионы лет эволюции в вашей аптечке: биомиметика защитных механизмов насекомых.'],
    metrics: [['20+ лет', 'Фундаментальных исследований'], ['Web of Science', 'Публикации PNAS и PLOS ONE'], ['Патентная база', 'Патенты в России и за рубежом']],
    primary: 'О нашей компании', secondary: 'Наши разработки', imageAlt: 'Схематичное изображение насекомого и пептидной структуры',
    location: 'Санкт-Петербург, Россия', address: 'Санкт-Петербург, пр-т Малый В.О., д. 57, корп. 4/Ж', langLabel: 'Выбрать язык',
    pageTitle: 'Аллофарм — биотехнологическая компания', pageDescription: 'Аллофарм — биотехнологическая компания. Разработка новых лекарственных веществ на основе активных компонентов иммунной системы насекомых.',
  },
  en: {
    descriptor: 'Biotechnology company', nav: ['Home', 'About us', 'Developments', 'News', 'Press centre', 'Contacts', 'Cooperation'],
    menu: 'Open menu', close: 'Close menu', aboutPages: ['About us', 'Intellectual property'], developmentPages: ['Research base', 'ALLOSTATIN®', 'FLIP®7', 'InOVA-C', 'ALLOMEDIN® PRO', 'ENTOMIX®', 'Insect cultivation technology'], pressPages: ['Media about us', 'Our publications'], eyebrow: 'Biomimetics of the insect immune system',
    title: <>ALLOPHARM<br /><span>Biotechnology company</span></>,
    slides: ['Next-generation antimicrobial and antitumour agents based on natural peptides of innate immunity.', 'Real biotechnology: chemical peptide synthesis and a closed cycle of biomass cultivation.', 'Millions of years of evolution: biomimetics of the protective mechanisms of insects.'],
    metrics: [['20+ years', 'Fundamental research'], ['Web of Science', 'Publications in PNAS and PLOS ONE'], ['Patent portfolio', 'Patents in Russia and internationally']],
    primary: 'About our company', secondary: 'Our developments', imageAlt: 'Schematic illustration of an insect and peptide structure',
    location: 'Saint Petersburg, Russia', address: '57 Maliy Prospect V.O., Saint Petersburg', langLabel: 'Choose language',
    pageTitle: 'Allopharm — biotechnology company', pageDescription: 'Allopharm is a biotechnology company developing new medicinal substances based on active components of the insect immune system.',
  },
};

function App() {
  const [newsArchiveState, setNewsArchiveState] = useState({
    ru: { query: '', page: 1 },
    en: { query: '', page: 1 },
  });
  const focusAfterNavigation = useRef(false);
  const [currentPath, setCurrentPath] = useState(() => normalizePath(window.location.pathname));
  const [language, setLanguage] = useState(() => {
    const path = normalizePath(window.location.pathname);
    const initialRoute = getRoute(path);
    if (initialRoute) return initialRoute.language;
    const initialNewsRoute = getNewsRoute(path);
    if (initialNewsRoute) return initialNewsRoute.language;
    const initialPublicationsRoute = getPublicationsRoute(path);
    if (initialPublicationsRoute) return initialPublicationsRoute.language;
    const initialContactRoute = getContactRoute(path);
    if (initialContactRoute) return initialContactRoute.language;
    const initialCooperationRoute = getCooperationRoute(path);
    if (initialCooperationRoute) return initialCooperationRoute.language;
    if (path.startsWith('/en/')) return 'en';
    try {
      return window.localStorage.getItem('allopharm-language') === 'en' ? 'en' : 'ru';
    } catch {
      return 'ru';
    }
  });
  const isAboutPage = currentPath === '/about' || currentPath === '/en/about';
  const isIntellectualPropertyPage = currentPath === '/intellectual-property' || currentPath === '/en/intellectual-property';
  const isResearchBasePage = currentPath === '/base' || currentPath === '/en/base';
  const route = getRoute(currentPath);
  const newsRoute = getNewsRoute(currentPath);
  const publicationsRoute = getPublicationsRoute(currentPath);
  const contactRoute = getContactRoute(currentPath);
  const cooperationRoute = getCooperationRoute(currentPath);
  const newsArticle = newsRoute?.kind === 'article' ? getNewsBySlug(newsRoute.slug) : null;
  const newsContent = newsArticle?.[language];
  const isNotFound = currentPath !== '/' && !route && !publicationsRoute && !contactRoute && !cooperationRoute && (!newsRoute || (newsRoute.kind === 'article' && !newsArticle));
  const developmentPage = route?.development ? developmentPages[route.slug] : null;
  const developmentContent = developmentPage && (developmentPage.content[language] || developmentPage.content.ru);
  const DevelopmentPage = developmentPage?.Component;
  const isSecondaryPage = isAboutPage || isIntellectualPropertyPage || Boolean(developmentPage) || Boolean(newsRoute) || Boolean(publicationsRoute) || Boolean(contactRoute) || Boolean(cooperationRoute);
  const t = copy[language];
  const pageTitle = isNotFound
    ? (language === 'ru' ? 'Страница не найдена — Аллофарм' : 'Page not found — Allopharm')
    : newsRoute?.kind === 'article'
    ? `${newsContent?.title || (language === 'ru' ? 'Новость' : 'News')} — ${language === 'ru' ? 'Аллофарм' : 'Allopharm'}`
    : newsRoute?.kind === 'archive'
    ? (language === 'ru' ? 'Новости — Аллофарм' : 'News — Allopharm')
    : publicationsRoute
    ? (language === 'ru' ? 'Наши публикации — Аллофарм' : 'Our publications — Allopharm')
    : contactRoute
    ? (language === 'ru' ? 'Контакты — Аллофарм' : 'Contacts — Allopharm')
    : cooperationRoute
    ? (language === 'ru' ? 'Сотрудничество — Аллофарм' : 'Cooperation — Allopharm')
    : developmentPage
    ? `${developmentContent.title} — ${language === 'ru' ? 'Аллофарм' : 'Allopharm'}`
    : isIntellectualPropertyPage
    ? (language === 'ru' ? 'Интеллектуальная собственность — Аллофарм' : 'Intellectual property — Allopharm')
    : isAboutPage
      ? (language === 'ru' ? 'О компании — Аллофарм' : 'About Allopharm')
      : t.pageTitle;
  const pageDescription = isNotFound
    ? (language === 'ru' ? 'Запрошенная страница не найдена.' : 'The requested page could not be found.')
    : newsRoute?.kind === 'article'
    ? (newsContent?.excerpt || newsContent?.title || (language === 'ru' ? 'Новость компании Аллофарм.' : 'Allopharm company news.'))
    : newsRoute?.kind === 'archive'
    ? (language === 'ru' ? 'Новости и события компании «Аллофарм».' : 'News and updates from Allopharm.')
    : publicationsRoute
    ? (language === 'ru' ? 'Научные публикации компании «Аллофарм».' : 'Scientific publications by Allopharm.')
    : contactRoute
    ? (language === 'ru' ? 'Свяжитесь с компанией «Аллофарм»: адрес, телефоны и электронная почта.' : 'Contact Allopharm: address, phone numbers and email.')
    : cooperationRoute
    ? (language === 'ru' ? 'Направления сотрудничества с компанией «Аллофарм».' : 'Areas of cooperation with Allopharm.')
    : developmentPage && !isResearchBasePage
    ? developmentContent.title
    : isResearchBasePage
    ? (language === 'ru' ? 'Исследовательская база Аллофарм: изучение иммунной системы насекомых и создание новых разработок.' : 'Allopharm research base: studying the insect immune system and developing new technologies.')
    : isIntellectualPropertyPage
    ? (language === 'ru'
      ? 'Патенты и товарные знаки компании «Аллофарм».'
      : 'Allopharm patents and trademarks.')
    : isAboutPage
      ? (language === 'ru'
        ? 'О компании Аллофарм: научные исследования, биотехнологические платформы и разработки.'
        : 'About Allopharm: research, biotechnology platforms and developments.')
      : t.pageDescription;

  const handleLanguageChange = (nextLanguage) => {
    if (nextLanguage === language) return;
    setLanguage(nextLanguage);
    if (isSecondaryPage) {
      const nextPath = newsRoute
        ? newsPath(newsRoute.kind === 'article' ? newsRoute.slug : null, nextLanguage)
        : publicationsRoute
        ? publicationsPath(nextLanguage)
        : contactRoute
        ? contactPath(nextLanguage)
        : cooperationRoute
        ? cooperationPath(nextLanguage)
        : developmentPath(route.slug, nextLanguage);
      window.history.pushState({}, '', nextPath);
      setCurrentPath(normalizePath(nextPath));
    }
  };

  const handleInternalNavigation = (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = event.target.closest('a[href]');
    if (!anchor || anchor.target || anchor.hasAttribute('download')) return;
    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin || url.hash || url.search) return;
    const nextRoute = getRoute(url.pathname);
    const nextNewsRoute = getNewsRoute(url.pathname);
    const nextPublicationsRoute = getPublicationsRoute(url.pathname);
    const nextContactRoute = getContactRoute(url.pathname);
    const nextCooperationRoute = getCooperationRoute(url.pathname);
    if (!nextRoute && !nextNewsRoute && !nextPublicationsRoute && !nextContactRoute && !nextCooperationRoute && url.pathname !== '/') return;
    event.preventDefault();
    if (normalizePath(url.pathname) === currentPath) return;
    window.history.pushState({}, '', url.pathname);
    focusAfterNavigation.current = true;
    setCurrentPath(normalizePath(url.pathname));
    if (nextRoute) setLanguage(nextRoute.language);
    else if (nextNewsRoute) setLanguage(nextNewsRoute.language);
    else if (nextPublicationsRoute) setLanguage(nextPublicationsRoute.language);
    else if (nextContactRoute) setLanguage(nextContactRoute.language);
    else if (nextCooperationRoute) setLanguage(nextCooperationRoute.language);
  };

  useEffect(() => {
    if (!focusAfterNavigation.current) return;
    focusAfterNavigation.current = false;
    document.querySelector('main h1')?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPath]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = pageTitle;
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) descriptionTag.content = pageDescription;
    try {
      window.localStorage.setItem('allopharm-language', language);
    } catch {
      // Language switching still works when browser storage is unavailable.
    }
  }, [language, pageDescription, pageTitle, t]);

  useEffect(() => {
    const syncPath = () => {
      const path = normalizePath(window.location.pathname);
      setCurrentPath(path);
      const nextRoute = getRoute(path);
      if (nextRoute) setLanguage(nextRoute.language);
      else {
        const nextNewsRoute = getNewsRoute(path);
        if (nextNewsRoute) setLanguage(nextNewsRoute.language);
        else {
          const nextPublicationsRoute = getPublicationsRoute(path);
          if (nextPublicationsRoute) setLanguage(nextPublicationsRoute.language);
          else {
            const nextContactRoute = getContactRoute(path);
            if (nextContactRoute) setLanguage(nextContactRoute.language);
            else {
              const nextCooperationRoute = getCooperationRoute(path);
              if (nextCooperationRoute) setLanguage(nextCooperationRoute.language);
            }
          }
        }
      }
    };
    window.addEventListener('popstate', syncPath);
    return () => window.removeEventListener('popstate', syncPath);
  }, []);

  const pageLinks = language === 'ru'
    ? ['/', '/about/', currentPath !== '/' ? '/#developments-title' : '#developments-title', '/articles/', currentPath !== '/' ? '/#media-title' : '#media-title', contactPath('ru'), cooperationPath('ru')]
    : ['/', '/en/about/', currentPath !== '/' ? '/#developments-title' : '#developments-title', '/en/articles/', currentPath !== '/' ? '/#media-title' : '#media-title', contactPath('en'), cooperationPath('en')];

  const developmentLinks = developmentMenuSlugs.map(slug => developmentPath(slug, language));
  const pressLinks = [pageLinks[4], publicationsPath(language)];

  return (
    <div className="site-shell" onClick={handleInternalNavigation}>
      <Header language={language} onLanguageChange={handleLanguageChange} t={t} links={pageLinks} aboutLinks={language === 'ru' ? ['/about/', '/intellectual-property/'] : ['/en/about/', '/en/intellectual-property/']} developmentLinks={developmentLinks} pressLinks={pressLinks} activeNavIndex={isNotFound ? -1 : newsRoute ? 3 : publicationsRoute ? 4 : contactRoute ? 5 : cooperationRoute ? 6 : developmentPage ? 2 : isAboutPage || isIntellectualPropertyPage ? 1 : 0} />
      {isNotFound ? <NotFound language={language} /> : developmentPage ? <DevelopmentsLayout language={language} slug={route.slug} title={developmentContent.title} contentLanguage={developmentPage.content[language] ? language : 'ru'}><DevelopmentPage language={language} /></DevelopmentsLayout> : isIntellectualPropertyPage
        ? <IntellectualProperty language={language} />
        : isAboutPage ? <About language={language} /> : newsRoute?.kind === 'article' && newsArticle ? <NewsArticle article={newsArticle} language={language} /> : newsRoute?.kind === 'archive' ? <NewsArchive language={language} archiveState={newsArchiveState[language]} onArchiveStateChange={(state) => setNewsArchiveState((previous) => ({ ...previous, [language]: state }))} /> : publicationsRoute ? <PublicationsPage language={language} /> : contactRoute ? <Contact language={language} /> : cooperationRoute ? <Cooperation language={language} /> : <Home language={language} t={t} links={pageLinks} />}
      <Footer
        language={language}
        t={t}
        links={pageLinks}
        aboutLinks={language === 'ru' ? ['/about/', '/intellectual-property/'] : ['/en/about/', '/en/intellectual-property/']}
        developmentLinks={developmentLinks}
        pressLinks={pressLinks}
      />
    </div>
  );
}

export default App;
