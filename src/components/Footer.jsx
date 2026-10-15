import footerLogo from '../assets/logo-header.png';
import englishLogo from '../assets/logo-header-en.svg';
import { useState } from 'react';
import '../styles/Footer.css';

const footerCopy = {
  ru: {
    description: 'Разработка и внедрение оригинальных фармацевтических субстанций на основе молекулярных факторов иммунной системы насекомых.',
    navigation: 'Навигация',
    platforms: 'Платформы',
    about: 'О компании',
    aboutPages: ['О нас', 'Интеллектуальная собственность'],
    expandAbout: 'Раскрыть раздел «О компании»',
    collapseAbout: 'Свернуть раздел «О компании»',
    developments: 'Наши разработки',
    developmentPages: ['Исследовательская база', 'АЛЛОСТАТИН®', 'FLIP®7', 'InOVA-C', 'АЛЛОМЕДИН® ПРО', 'ЭНТОМИКС®', 'Технология культивирования насекомых'],
    expandDevelopments: 'Раскрыть раздел «Наши разработки»',
    collapseDevelopments: 'Свернуть раздел «Наши разработки»',
    contacts: 'Контакты',
    office: 'Адрес офиса и лабораторий:',
    phone: 'Телефон:',
    email: 'Email:',
    collaboration: 'Научное сотрудничество: открыты к диалогу',
    privacy: 'Политика конфиденциальности',
    copyright: `© 2003–${new Date().getFullYear()} Аллофарм. Все права защищены. Инновационная пептидная биотехнология.`,
    city: 'Санкт-Петербург, Россия',
    tagline: 'Биотехнология и R&D',
    platformsList: ['АЛЛОСТАТИН®', 'FLIP®7 Комплекс', 'InOVA-C & Адъювант', 'Аллофероны', 'Calliphoridae Tech'],
  },
  en: {
    description: 'Development and implementation of original pharmaceutical substances based on molecular factors of the insect immune system.',
    navigation: 'Navigation',
    platforms: 'Platforms',
    about: 'About the company',
    aboutPages: ['About us', 'Intellectual property'],
    expandAbout: 'Expand About the company menu',
    collapseAbout: 'Collapse About the company menu',
    developments: 'Our developments',
    developmentPages: ['Research base', 'ALLOSTATIN®', 'FLIP®7', 'InOVA-C', 'ALLOMEDIN® PRO', 'ENTOMIX®', 'Insect cultivation technology'],
    expandDevelopments: 'Expand Our developments menu',
    collapseDevelopments: 'Collapse Our developments menu',
    contacts: 'Contacts',
    office: 'Office and laboratory address:',
    phone: 'Phone:',
    email: 'Email:',
    collaboration: 'Research partnerships: open to collaboration',
    privacy: 'Privacy policy',
    copyright: `© 2003–${new Date().getFullYear()} Allopharm. All rights reserved. Innovative peptide biotechnology.`,
    city: 'Saint Petersburg, Russia',
    tagline: 'Biotechnology & R&D',
    platformsList: ['ALLOSTATIN®', 'FLIP®7 Complex', 'InOVA-C & Adjuvant', 'Alloferons', 'Calliphoridae Tech'],
  },
};

function Footer({ language, t, links, aboutLinks, developmentLinks }) {
  const copy = footerCopy[language];
  const platformNames = copy.platformsList;
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
  const [developmentsMenuOpen, setDevelopmentsMenuOpen] = useState(false);
  const platformLinks = [developmentLinks[1], developmentLinks[2], developmentLinks[3], null, developmentLinks[6]];

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-main">
          <section className="footer-company" aria-label={language === 'ru' ? 'О компании' : 'About the company'}>
            <a className="footer-brand" href="/" aria-label={language === 'ru' ? 'Аллофарм — главная' : 'Allopharm — home'}>
              <img src={language === 'en' ? englishLogo : footerLogo} alt={language === 'en' ? 'ALLOPHARM — biotechnology company' : 'АЛЛОФАРМ — биотехнологическая компания'} />
            </a>
            <p>{copy.description}</p>
            <p className="footer-legal">{language === 'ru' ? 'ООО «Аллофарм»' : 'Allopharm LLC'}<br />{language === 'ru' ? 'ОГРН' : 'Registration No.'}: 1047800031663<br />{language === 'ru' ? 'ИНН' : 'Tax ID'}: 7801265876</p>
            <a className="footer-privacy" href="https://allopharm.ru/privacy-policy">{copy.privacy}</a>
          </section>

          <nav className="footer-column" aria-label={copy.navigation}>
            <h2>{copy.navigation}</h2>
            {t.nav.map((label, index) => index === 1
              ? <div className="footer-about-menu" key={label}>
                  <button
                    className="footer-about-toggle"
                    type="button"
                    aria-expanded={aboutMenuOpen}
                    aria-controls="footer-about-submenu"
                    aria-label={aboutMenuOpen ? copy.collapseAbout : copy.expandAbout}
                    onClick={() => setAboutMenuOpen((open) => !open)}
                  >
                    {copy.about}<span aria-hidden="true">{aboutMenuOpen ? '−' : '+'}</span>
                  </button>
                  {aboutMenuOpen && <div className="footer-about-submenu" id="footer-about-submenu">
                    {copy.aboutPages.map((page, pageIndex) => <a href={aboutLinks[pageIndex]} key={page}>{page}</a>)}
                  </div>}
                </div>
              : index === 2
                ? <div className="footer-about-menu" key={label}>
                    <button
                      className="footer-about-toggle"
                      type="button"
                      aria-expanded={developmentsMenuOpen}
                      aria-controls="footer-developments-submenu"
                      aria-label={developmentsMenuOpen ? copy.collapseDevelopments : copy.expandDevelopments}
                      onClick={() => setDevelopmentsMenuOpen((open) => !open)}
                    >
                      {copy.developments}<span aria-hidden="true">{developmentsMenuOpen ? '−' : '+'}</span>
                    </button>
                    {developmentsMenuOpen && <div className="footer-about-submenu" id="footer-developments-submenu">
                      {copy.developmentPages.map((page, pageIndex) => <a href={developmentLinks[pageIndex]} key={page}>{page}</a>)}
                    </div>}
                  </div>
              : <a href={links[index]} key={label}>{label}</a>)}
          </nav>

          <nav className="footer-column" aria-label={copy.platforms}>
            <h2>{copy.platforms}</h2>
            {platformNames.map((name, index) => platformLinks[index]
              ? <a href={platformLinks[index]} key={name}>{name}</a>
              : <span className="footer-platform-label" key={name}>{name}</span>)}
          </nav>

          <section className="footer-column footer-contacts" aria-label={copy.contacts}>
            <h2>{copy.contacts}</h2>
            <p><strong>{copy.office}</strong><br />{t.address}</p>
            <p><strong>{copy.phone}</strong> <a href="tel:+79315923375">+7 (931) 592-33-75</a><br /><strong>{copy.phone}</strong> <a href="tel:+78123205542">+7 (812) 320-55-42</a></p>
            <p><strong>{copy.email}</strong> <a className="footer-email" href="mailto:allofarm.spb@yandex.ru">allofarm.spb@yandex.ru</a></p>
            <a className="footer-collaboration" href="mailto:allofarm.spb@yandex.ru">{copy.collaboration}</a>
          </section>
        </div>

        <div className="footer-bottom">
          <p>{copy.copyright}</p>
          <div><span>{copy.city}</span><span className="footer-separator" aria-hidden="true">•</span><span>{copy.tagline}</span></div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
