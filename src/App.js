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
import PrivacyPolicy, { getPrivacyPolicyRoute, privacyPolicyPath } from './pages/PrivacyPolicy';
import CookieNotice from './components/CookieNotice';
import './styles/global.css';
import { applySeo, getSeo, homePath } from './seo';

const copy = {
  ru: {
    descriptor: 'Биотехнологическая компания', nav: ['Главная', 'О компании', 'Наши разработки', 'Новости', 'Пресс-центр', 'Контакты', 'Сотрудничество'],
    menu: 'Открыть меню', close: 'Закрыть меню', aboutPages: ['О нас', 'Интеллектуальная собственность'], developmentPages: ['Исследовательская база', 'АЛЛОСТАТИН®', 'FLIP®7', 'InOVA-C', 'АЛЛОМЕДИН® ПРО', 'ЭНТОМИКС®', 'Технология культивирования насекомых'], pressPages: ['СМИ о нас', 'Наши публикации'], eyebrow: 'Биомиметика иммунной системы насекомых',
    title: <>АЛЛОФАРМ<br /><span>Биотехнологическая компания</span></>,
    slides: ['Антимикробные и противоопухолевые средства нового поколения на основе природных пептидов врождённого иммунитета.', 'Миллионы лет эволюции в вашей аптечке: биомиметика защитных механизмов насекомых.'],
    metrics: [['20+ лет', 'Фундаментальных исследований'], ['Web of Science', 'Публикации PNAS и PLOS ONE'], ['Патентная база', 'Патенты в России и за рубежом']],
    primary: 'О нашей компании', secondary: 'Наши разработки', imageAlt: 'Схематичное изображение насекомого и пептидной структуры',
    location: 'Санкт-Петербург, Россия', address: 'Санкт-Петербург, пр-т Малый В.О., д. 57, корп. 4/Ж', langLabel: 'Выбрать язык',
    pageTitle: 'Аллофарм — биотехнологическая компания', pageDescription: 'Аллофарм — биотехнологическая компания. Разработка новых лекарственных веществ на основе активных компонентов иммунной системы насекомых.',
  },
  en: {
    descriptor: 'Biotechnology company', nav: ['Home', 'About us', 'Developments', 'News', 'Press centre', 'Contacts', 'Cooperation'],
    menu: 'Open menu', close: 'Close menu', aboutPages: ['About us', 'Intellectual property'], developmentPages: ['Research base', 'ALLOSTATIN®', 'FLIP®7', 'InOVA-C', 'ALLOMEDIN® PRO', 'ENTOMIX®', 'Insect cultivation technology'], pressPages: ['Media about us', 'Our publications'], eyebrow: 'Biomimetics of the insect immune system',
    title: <>ALLOPHARM<br /><span>Biotechnology company</span></>,
    slides: ['Next-generation antimicrobial and antitumour agents based on natural peptides of innate immunity.', 'Millions of years of evolution: biomimetics of the protective mechanisms of insects.'],
    metrics: [['20+ years', 'Fundamental research'], ['Web of Science', 'Publications in PNAS and PLOS ONE'], ['Patent portfolio', 'Patents in Russia and internationally']],
    primary: 'About our company', secondary: 'Our developments', imageAlt: 'Schematic illustration of an insect and peptide structure',
    location: 'Saint Petersburg, Russia', address: '57 Maliy Prospect V.O., Saint Petersburg', langLabel: 'Choose language',
    pageTitle: 'Allopharm — biotechnology company', pageDescription: 'Allopharm is a biotechnology company developing new medicinal substances based on active components of the insect immune system.',
  },
};

function App({ initialPath } = {}) {
  const [newsArchiveState, setNewsArchiveState] = useState({
    ru: { query: '', page: 1 },
    en: { query: '', page: 1 },
  });
  const focusAfterNavigation = useRef(false);
  const pendingAnchor = useRef(null);
  const [currentPath, setCurrentPath] = useState(() => normalizePath(initialPath || window.location.pathname));
  const [language, setLanguage] = useState(() => {
    const path = normalizePath(initialPath || window.location.pathname);
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
    const initialPrivacyPolicyRoute = getPrivacyPolicyRoute(path);
    if (initialPrivacyPolicyRoute) return initialPrivacyPolicyRoute;
    return path === '/en' || path.startsWith('/en/') ? 'en' : 'ru';
  });
  const isAboutPage = currentPath === '/about' || currentPath === '/en/about';
  const isIntellectualPropertyPage = currentPath === '/intellectual-property' || currentPath === '/en/intellectual-property';
  const route = getRoute(currentPath);
  const newsRoute = getNewsRoute(currentPath);
  const publicationsRoute = getPublicationsRoute(currentPath);
  const contactRoute = getContactRoute(currentPath);
  const cooperationRoute = getCooperationRoute(currentPath);
  const privacyPolicyRoute = getPrivacyPolicyRoute(currentPath);
  const newsArticle = newsRoute?.kind === 'article' ? getNewsBySlug(newsRoute.slug) : null;
  const isNotFound = currentPath !== '/' && currentPath !== '/en' && !route && !publicationsRoute && !contactRoute && !cooperationRoute && !privacyPolicyRoute && (!newsRoute || (newsRoute.kind === 'article' && !newsArticle));
  const developmentPage = route?.development ? developmentPages[route.slug] : null;
  const developmentContent = developmentPage && (developmentPage.content[language] || developmentPage.content.ru);
  const DevelopmentPage = developmentPage?.Component;
  const isSecondaryPage = isAboutPage || isIntellectualPropertyPage || Boolean(developmentPage) || Boolean(newsRoute) || Boolean(publicationsRoute) || Boolean(contactRoute) || Boolean(cooperationRoute) || Boolean(privacyPolicyRoute);
  const t = copy[language];
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
        : privacyPolicyRoute
        ? privacyPolicyPath(nextLanguage)
        : developmentPath(route.slug, nextLanguage);
      window.history.pushState({}, '', nextPath);
      setCurrentPath(normalizePath(nextPath));
    } else if (currentPath === '/' || currentPath === '/en') {
      const nextPath = homePath(nextLanguage) + window.location.hash;
      window.history.pushState({}, '', nextPath);
      setCurrentPath(normalizePath(homePath(nextLanguage)));
    }
  };

  const handleInternalNavigation = (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = event.target.closest('a[href]');
    if (!anchor || anchor.target || anchor.hasAttribute('download')) return;
    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin || url.search) return;
    if (url.hash) {
      const anchorId = url.hash.slice(1);
      if (!['/', '/en/'].includes(url.pathname) || !['media-title', 'developments-title'].includes(anchorId)) return;
      event.preventDefault();
      window.history.pushState({}, '', `${url.pathname}${url.hash}`);
      if (currentPath === normalizePath(url.pathname)) {
        document.getElementById(anchorId)?.scrollIntoView({ behavior: 'instant', block: 'start' });
      } else {
        pendingAnchor.current = anchorId;
        focusAfterNavigation.current = true;
        setCurrentPath(normalizePath(url.pathname));
        setLanguage(url.pathname === '/en/' ? 'en' : 'ru');
      }
      return;
    }
    const nextRoute = getRoute(url.pathname);
    const nextNewsRoute = getNewsRoute(url.pathname);
    const nextPublicationsRoute = getPublicationsRoute(url.pathname);
    const nextContactRoute = getContactRoute(url.pathname);
    const nextCooperationRoute = getCooperationRoute(url.pathname);
    const nextPrivacyPolicyRoute = getPrivacyPolicyRoute(url.pathname);
    if (!nextRoute && !nextNewsRoute && !nextPublicationsRoute && !nextContactRoute && !nextCooperationRoute && !nextPrivacyPolicyRoute && !['/', '/en', '/en/'].includes(url.pathname)) return;
    event.preventDefault();
    if (normalizePath(url.pathname) === currentPath) return;
    window.history.pushState({}, '', url.pathname);
    focusAfterNavigation.current = true;
    setCurrentPath(normalizePath(url.pathname));
    if (['/', '/en', '/en/'].includes(url.pathname)) setLanguage(url.pathname === '/' ? 'ru' : 'en');
    else if (nextRoute) setLanguage(nextRoute.language);
    else if (nextNewsRoute) setLanguage(nextNewsRoute.language);
    else if (nextPublicationsRoute) setLanguage(nextPublicationsRoute.language);
    else if (nextContactRoute) setLanguage(nextContactRoute.language);
    else if (nextCooperationRoute) setLanguage(nextCooperationRoute.language);
    else if (nextPrivacyPolicyRoute) setLanguage(nextPrivacyPolicyRoute);
  };

  useEffect(() => {
    if (!focusAfterNavigation.current) return;
    focusAfterNavigation.current = false;
    if (pendingAnchor.current) {
      document.getElementById(pendingAnchor.current)?.scrollIntoView({ behavior: 'instant', block: 'start' });
      pendingAnchor.current = null;
      return;
    }
    document.querySelector('main h1')?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPath]);

  useEffect(() => {
    applySeo(getSeo(currentPath));
    try {
      window.localStorage.setItem('allopharm-language', language);
    } catch {
      // Language switching still works when browser storage is unavailable.
    }
  }, [language, currentPath]);

  useEffect(() => {
    const syncPath = () => {
      const path = normalizePath(window.location.pathname);
      setCurrentPath(path);
      const nextRoute = getRoute(path);
      if (path === '/' || path === '/en') setLanguage(path === '/en' ? 'en' : 'ru');
      else if (nextRoute) setLanguage(nextRoute.language);
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
            else {
              const nextPrivacyPolicyRoute = getPrivacyPolicyRoute(path);
              if (nextPrivacyPolicyRoute) setLanguage(nextPrivacyPolicyRoute);
            }
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
    : ['/en/', '/en/about/', currentPath !== '/en' ? '/en/#developments-title' : '#developments-title', '/en/articles/', currentPath !== '/en' ? '/en/#media-title' : '#media-title', contactPath('en'), cooperationPath('en')];

  const developmentLinks = developmentMenuSlugs.map(slug => developmentPath(slug, language));
  const pressLinks = [pageLinks[4], publicationsPath(language)];

  return (
    <div className="site-shell" onClick={handleInternalNavigation}>
      <CookieNotice language={language} />
      <Header language={language} onLanguageChange={handleLanguageChange} t={t} links={pageLinks} aboutLinks={language === 'ru' ? ['/about/', '/intellectual-property/'] : ['/en/about/', '/en/intellectual-property/']} developmentLinks={developmentLinks} pressLinks={pressLinks} activeNavIndex={isNotFound || privacyPolicyRoute ? -1 : newsRoute ? 3 : publicationsRoute ? 4 : contactRoute ? 5 : cooperationRoute ? 6 : developmentPage ? 2 : isAboutPage || isIntellectualPropertyPage ? 1 : 0} />
      {privacyPolicyRoute ? <PrivacyPolicy language={language} /> : isNotFound ? <NotFound language={language} /> : developmentPage ? <DevelopmentsLayout language={language} slug={route.slug} title={developmentContent.title} contentLanguage={developmentPage.content[language] ? language : 'ru'}><DevelopmentPage language={language} /></DevelopmentsLayout> : isIntellectualPropertyPage
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
