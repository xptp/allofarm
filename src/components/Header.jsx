import { useState } from 'react';
import headerLogo from '../assets/logo-header.png';
import englishLogo from '../assets/logo-header-en.svg';
import '../styles/Header.css';

function Header({ language, onLanguageChange, t, links, aboutLinks, developmentLinks, activeNavIndex = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
  const [developmentsMenuOpen, setDevelopmentsMenuOpen] = useState(false);
  const changeLanguage = (nextLanguage) => {
    onLanguageChange(nextLanguage);
    setMenuOpen(false);
    setAboutMenuOpen(false);
    setDevelopmentsMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="header-container utility-inner">
          <span className="utility-address">{t.address}</span>
          <a href="tel:+78123205542">+7 (812) 320-55-42</a>
          <a href="mailto:allofarm.spb@yandex.ru">allofarm.spb@yandex.ru</a>
          <div className="language-switch" role="group" aria-label={t.langLabel}>
            {['ru', 'en'].map((lang, index) => <span className="language-option" key={lang}>
              {index > 0 && <span className="language-divider" aria-hidden="true">/</span>}
              <button type="button" className={language === lang ? 'language-button active' : 'language-button'} aria-pressed={language === lang} onClick={() => changeLanguage(lang)}>{lang.toUpperCase()}</button>
            </span>)}
          </div>
        </div>
      </div>
      <div className="header-container main-header">
        <a className="brand" href="/" aria-label={language === 'ru' ? 'Аллофарм — главная' : 'Allopharm — home'}>
          <img src={language === 'en' ? englishLogo : headerLogo} alt={language === 'en' ? 'ALLOPHARM — biotechnology company' : 'АЛЛОФАРМ — биотехнологическая компания'} />
        </a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? t.close : t.menu} onClick={() => setMenuOpen((open) => !open)}>
          <span /><span /><span />
        </button>
        <nav className={menuOpen ? 'primary-nav open' : 'primary-nav'} aria-label={language === 'ru' ? 'Основная навигация' : 'Main navigation'}>
          {t.nav.map((label, i) => i === 1 || i === 2 ? <div className={`header-dropdown${i === activeNavIndex ? ' current' : ''}`} key={label}>
            <button type="button" className="header-dropdown-toggle" aria-expanded={i === 1 ? aboutMenuOpen : developmentsMenuOpen} aria-controls={i === 1 ? 'header-about-submenu' : 'header-developments-submenu'} onClick={() => {
              if (i === 1) {
                setAboutMenuOpen((open) => !open);
                setDevelopmentsMenuOpen(false);
              } else {
                setDevelopmentsMenuOpen((open) => !open);
                setAboutMenuOpen(false);
              }
            }}>
              {label}<span className="header-dropdown-indicator" aria-hidden="true">{(i === 1 ? aboutMenuOpen : developmentsMenuOpen) ? '−' : '+'}</span>
            </button>
            {(i === 1 ? aboutMenuOpen : developmentsMenuOpen) && <div className="header-dropdown-submenu" id={i === 1 ? 'header-about-submenu' : 'header-developments-submenu'}>
              {(i === 1 ? t.aboutPages : t.developmentPages).map((page, pageIndex) => <a key={page} href={(i === 1 ? aboutLinks : developmentLinks)[pageIndex]} onClick={() => { setAboutMenuOpen(false); setDevelopmentsMenuOpen(false); setMenuOpen(false); }}>{page}</a>)}
            </div>}
          </div> : <a key={label} className={i === activeNavIndex ? 'current' : ''} href={links[i]} onClick={() => { setMenuOpen(false); setAboutMenuOpen(false); setDevelopmentsMenuOpen(false); }}>{label}<span className="nav-arrow" aria-hidden="true">↗</span></a>)}
        </nav>
      </div>
    </header>
  );
}

export default Header;
