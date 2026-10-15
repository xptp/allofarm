import { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About/About';
import IntellectualProperty from './pages/About/IntellectualProperty';
import DevelopmentsLayout from './components/DevelopmentsLayout';
import { developmentPages } from './pages/developments/pages';
import { getRoute, normalizePath, developmentPath, developmentMenuSlugs } from './pages/developments/navigation';
import './styles/global.css';

const copy = {
  ru: {
    descriptor: 'Биотехнологическая компания', nav: ['Главная', 'О компании', 'Наши разработки', 'Публикации', 'Пресс-центр', 'Контакты'],
    menu: 'Открыть меню', close: 'Закрыть меню', aboutPages: ['О нас', 'Интеллектуальная собственность'], developmentPages: ['Исследовательская база', 'АЛЛОСТАТИН®', 'FLIP®7', 'InOVA-C', 'АЛЛОМЕДИН® ПРО', 'ЭНТОМИКС®', 'Технология культивирования насекомых'], eyebrow: 'Биомиметика иммунной системы насекомых',
    title: <>АЛЛОФАРМ<br /><span>Биотехнологическая компания</span></>,
    slides: ['Антимикробные и противоопухолевые средства нового поколения на основе природных пептидов врождённого иммунитета.', 'Настоящие биотехнологии: химический пептидный синтез и замкнутый цикл культивирования биомассы.', 'Миллионы лет эволюции в вашей аптечке: биомиметика защитных механизмов насекомых.'],
    metrics: [['20+ лет', 'Фундаментальных исследований'], ['Web of Science', 'Публикации PNAS и PLOS ONE'], ['Патентная база', 'Патенты в России и за рубежом']],
    primary: 'О нашей компании', secondary: 'Наши разработки', imageAlt: 'Схематичное изображение насекомого и пептидной структуры',
    location: 'Санкт-Петербург, Россия', address: 'Санкт-Петербург, пр-т Малый В.О., д. 57, корп. 4/Ж', langLabel: 'Выбрать язык',
    pageTitle: 'Аллофарм — биотехнологическая компания', pageDescription: 'Аллофарм — биотехнологическая компания. Разработка новых лекарственных веществ на основе активных компонентов иммунной системы насекомых.',
  },
  en: {
    descriptor: 'Biotechnology company', nav: ['Home', 'About us', 'Developments', 'Publications', 'Press centre', 'Contacts'],
    menu: 'Open menu', close: 'Close menu', aboutPages: ['About us', 'Intellectual property'], developmentPages: ['Research base', 'ALLOSTATIN®', 'FLIP®7', 'InOVA-C', 'ALLOMEDIN® PRO', 'ENTOMIX®', 'Insect cultivation technology'], eyebrow: 'Biomimetics of the insect immune system',
    title: <>ALLOPHARM<br /><span>Biotechnology company</span></>,
    slides: ['Next-generation antimicrobial and antitumour agents based on natural peptides of innate immunity.', 'Real biotechnology: chemical peptide synthesis and a closed cycle of biomass cultivation.', 'Millions of years of evolution: biomimetics of the protective mechanisms of insects.'],
    metrics: [['20+ years', 'Fundamental research'], ['Web of Science', 'Publications in PNAS and PLOS ONE'], ['Patent portfolio', 'Patents in Russia and internationally']],
    primary: 'About our company', secondary: 'Our developments', imageAlt: 'Schematic illustration of an insect and peptide structure',
    location: 'Saint Petersburg, Russia', address: '57 Maliy Prospect V.O., Saint Petersburg', langLabel: 'Choose language',
    pageTitle: 'Allopharm — biotechnology company', pageDescription: 'Allopharm is a biotechnology company developing new medicinal substances based on active components of the insect immune system.',
  },
};

function App() {
  const focusAfterNavigation = useRef(false);
  const [currentPath, setCurrentPath] = useState(() => normalizePath(window.location.pathname));
  const [language, setLanguage] = useState(() => {
    const path = normalizePath(window.location.pathname);
    const initialRoute = getRoute(path);
    if (initialRoute) return initialRoute.language;
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
  const developmentPage = route?.development ? developmentPages[route.slug] : null;
  const developmentContent = developmentPage && (developmentPage.content[language] || developmentPage.content.ru);
  const DevelopmentPage = developmentPage?.Component;
  const isSecondaryPage = isAboutPage || isIntellectualPropertyPage || Boolean(developmentPage);
  const t = copy[language];
  const pageTitle = developmentPage
    ? `${developmentContent.title} — ${language === 'ru' ? 'Аллофарм' : 'Allopharm'}`
    : isIntellectualPropertyPage
    ? (language === 'ru' ? 'Интеллектуальная собственность — Аллофарм' : 'Intellectual property — Allopharm')
    : isAboutPage
      ? (language === 'ru' ? 'О компании — Аллофарм' : 'About Allopharm')
      : t.pageTitle;
  const pageDescription = developmentPage && !isResearchBasePage
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
      const nextPath = developmentPath(route.slug, nextLanguage);
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
    if (!nextRoute && url.pathname !== '/') return;
    event.preventDefault();
    if (normalizePath(url.pathname) === currentPath) return;
    window.history.pushState({}, '', url.pathname);
    focusAfterNavigation.current = true;
    setCurrentPath(normalizePath(url.pathname));
    if (nextRoute) setLanguage(nextRoute.language);
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
    };
    window.addEventListener('popstate', syncPath);
    return () => window.removeEventListener('popstate', syncPath);
  }, []);

  const pageLinks = language === 'ru'
    ? ['/', '/about/', isSecondaryPage ? '/#developments-title' : '#developments-title', 'https://allopharm.ru/our-publications/', isSecondaryPage ? '/#media-title' : '#media-title', 'https://allopharm.ru/contact/']
    : ['/', '/en/about/', isSecondaryPage ? '/#developments-title' : '#developments-title', 'https://en.allopharm.ru/our-publications/', isSecondaryPage ? '/#media-title' : '#media-title', 'https://en.allopharm.ru/contact/'];

  const developmentLinks = developmentMenuSlugs.map(slug => developmentPath(slug, language));

  return (
    <div className="site-shell" onClick={handleInternalNavigation}>
      <Header language={language} onLanguageChange={handleLanguageChange} t={t} links={pageLinks} aboutLinks={language === 'ru' ? ['/about/', '/intellectual-property/'] : ['/en/about/', '/en/intellectual-property/']} developmentLinks={developmentLinks} activeNavIndex={developmentPage ? 2 : isAboutPage || isIntellectualPropertyPage ? 1 : 0} />
      {developmentPage ? <DevelopmentsLayout language={language} slug={route.slug} title={developmentContent.title} contentLanguage={developmentPage.content[language] ? language : 'ru'}><DevelopmentPage language={language} /></DevelopmentsLayout> : isIntellectualPropertyPage
        ? <IntellectualProperty language={language} />
        : isAboutPage ? <About language={language} /> : <Home language={language} t={t} links={pageLinks} />}
      <Footer
        language={language}
        t={t}
        links={pageLinks}
        aboutLinks={language === 'ru' ? ['/about/', '/intellectual-property/'] : ['/en/about/', '/en/intellectual-property/']}
        developmentLinks={developmentLinks}
      />
    </div>
  );
}

export default App;
