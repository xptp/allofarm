import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About/About';
import IntellectualProperty from './pages/About/IntellectualProperty';
import './styles/global.css';

const copy = {
  ru: {
    descriptor: 'Биотехнологическая компания', nav: ['Главная', 'О компании', 'Наши разработки', 'Публикации', 'Пресс-центр', 'Контакты'],
    menu: 'Открыть меню', close: 'Закрыть меню', aboutPages: ['О нас', 'Интеллектуальная собственность'], eyebrow: 'Биомиметика иммунной системы насекомых',
    title: <>АЛЛОФАРМ<br /><span>Биотехнологическая компания</span></>,
    slides: ['Антимикробные и противоопухолевые средства нового поколения на основе природных пептидов врождённого иммунитета.', 'Настоящие биотехнологии: химический пептидный синтез и замкнутый цикл культивирования биомассы.', 'Миллионы лет эволюции в вашей аптечке: биомиметика защитных механизмов насекомых.'],
    metrics: [['20+ лет', 'Фундаментальных исследований'], ['Web of Science', 'Публикации PNAS и PLOS ONE'], ['Патентная база', 'Патенты в России и за рубежом']],
    primary: 'О нашей компании', secondary: 'Наши разработки', imageAlt: 'Схематичное изображение насекомого и пептидной структуры',
    location: 'Санкт-Петербург, Россия', address: 'Санкт-Петербург, пр-т Малый В.О., д. 57, корп. 4/Ж', langLabel: 'Выбрать язык',
    pageTitle: 'Аллофарм — биотехнологическая компания', pageDescription: 'Аллофарм — биотехнологическая компания. Разработка новых лекарственных веществ на основе активных компонентов иммунной системы насекомых.',
  },
  en: {
    descriptor: 'Biotechnology company', nav: ['Home', 'About us', 'Developments', 'Publications', 'Press centre', 'Contacts'],
    menu: 'Open menu', close: 'Close menu', aboutPages: ['About us', 'Intellectual property'], eyebrow: 'Biomimetics of the insect immune system',
    title: <>ALLOPHARM<br /><span>Biotechnology company</span></>,
    slides: ['Next-generation antimicrobial and antitumour agents based on natural peptides of innate immunity.', 'Real biotechnology: chemical peptide synthesis and a closed cycle of biomass cultivation.', 'Millions of years of evolution: biomimetics of the protective mechanisms of insects.'],
    metrics: [['20+ years', 'Fundamental research'], ['Web of Science', 'Publications in PNAS and PLOS ONE'], ['Patent portfolio', 'Patents in Russia and internationally']],
    primary: 'About our company', secondary: 'Our developments', imageAlt: 'Schematic illustration of an insect and peptide structure',
    location: 'Saint Petersburg, Russia', address: '57 Maliy Prospect V.O., Saint Petersburg', langLabel: 'Choose language',
    pageTitle: 'Allopharm — biotechnology company', pageDescription: 'Allopharm is a biotechnology company developing new medicinal substances based on active components of the insect immune system.',
  },
};

function App() {
  const normalizePath = (path) => path.replace(/\/+$/, '') || '/';
  const [currentPath, setCurrentPath] = useState(() => normalizePath(window.location.pathname));
  const [language, setLanguage] = useState(() => {
    const path = normalizePath(window.location.pathname);
    if (path === '/en/about') return 'en';
    if (path === '/about') return 'ru';
    if (path === '/en/intellectual-property') return 'en';
    if (path === '/intellectual-property') return 'ru';
    try {
      return window.localStorage.getItem('allopharm-language') === 'en' ? 'en' : 'ru';
    } catch {
      return 'ru';
    }
  });
  const isAboutPage = currentPath === '/about' || currentPath === '/en/about';
  const isIntellectualPropertyPage = currentPath === '/intellectual-property' || currentPath === '/en/intellectual-property';
  const isSecondaryPage = isAboutPage || isIntellectualPropertyPage;
  const t = copy[language];
  const pageTitle = isIntellectualPropertyPage
    ? (language === 'ru' ? 'Интеллектуальная собственность — Аллофарм' : 'Intellectual property — Allopharm')
    : isAboutPage
      ? (language === 'ru' ? 'О компании — Аллофарм' : 'About Allopharm')
      : t.pageTitle;
  const pageDescription = isIntellectualPropertyPage
    ? (language === 'ru'
      ? 'Патенты и товарные знаки компании «Аллофарм».'
      : 'Allopharm patents and trademarks.')
    : isAboutPage
      ? (language === 'ru'
        ? 'О компании Аллофарм: научные исследования, биотехнологические платформы и разработки.'
        : 'About Allopharm: research, biotechnology platforms and developments.')
      : t.pageDescription;

  const handleLanguageChange = (nextLanguage) => {
    setLanguage(nextLanguage);
    if (isAboutPage || isIntellectualPropertyPage) {
      const nextPath = isIntellectualPropertyPage
        ? (nextLanguage === 'en' ? '/en/intellectual-property/' : '/intellectual-property/')
        : (nextLanguage === 'en' ? '/en/about/' : '/about/');
      window.history.pushState({}, '', nextPath);
      setCurrentPath(normalizePath(nextPath));
    }
  };

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
      if (path === '/about') setLanguage('ru');
      if (path === '/en/about') setLanguage('en');
      if (path === '/intellectual-property') setLanguage('ru');
      if (path === '/en/intellectual-property') setLanguage('en');
    };
    window.addEventListener('popstate', syncPath);
    return () => window.removeEventListener('popstate', syncPath);
  }, []);

  const pageLinks = language === 'ru'
    ? ['/', '/about/', isSecondaryPage ? '/#developments-title' : '#developments-title', 'https://allopharm.ru/our-publications/', isSecondaryPage ? '/#media-title' : '#media-title', 'https://allopharm.ru/contact/']
    : ['/', '/en/about/', isSecondaryPage ? '/#developments-title' : '#developments-title', 'https://en.allopharm.ru/our-publications/', isSecondaryPage ? '/#media-title' : '#media-title', 'https://en.allopharm.ru/contact/'];

  return (
    <div className="site-shell">
      <Header language={language} onLanguageChange={handleLanguageChange} t={t} links={pageLinks} aboutLinks={language === 'ru' ? ['/about/', '/intellectual-property/'] : ['/en/about/', '/en/intellectual-property/']} activeNavIndex={isAboutPage || isIntellectualPropertyPage ? 1 : 0} />
      {isIntellectualPropertyPage
        ? <IntellectualProperty language={language} />
        : isAboutPage ? <About language={language} /> : <Home language={language} t={t} links={pageLinks} />}
      <Footer
        language={language}
        t={t}
        links={pageLinks}
        aboutLinks={language === 'ru' ? ['/about/', '/intellectual-property/'] : ['/en/about/', '/en/intellectual-property/']}
      />
    </div>
  );
}

export default App;
