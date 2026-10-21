import { useState } from 'react';
import headerLogo from '../assets/logo-header.png';
import englishLogo from '../assets/logo-header-en.svg';
import InterfaceIcon from './InterfaceIcon';
import '../styles/Header.css';

function Header({ language, onLanguageChange, t, links, aboutLinks, developmentLinks, pressLinks, activeNavIndex = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
  const [developmentsMenuOpen, setDevelopmentsMenuOpen] = useState(false);
  const [pressMenuOpen, setPressMenuOpen] = useState(false);
  const changeLanguage = (nextLanguage) => {
    onLanguageChange(nextLanguage);
    setMenuOpen(false);
    setAboutMenuOpen(false);
    setDevelopmentsMenuOpen(false);
    setPressMenuOpen(false);
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
        <a className="brand" href={language === 'en' ? '/en/' : '/'} aria-label={language === 'ru' ? 'Аллофарм — главная' : 'Allopharm — home'}>
          <img src={language === 'en' ? englishLogo : headerLogo} alt={language === 'en' ? 'ALLOPHARM — biotechnology company' : 'АЛЛОФАРМ — биотехнологическая компания'} />
        </a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? t.close : t.menu} onClick={() => setMenuOpen((open) => !open)}>
          <span /><span /><span />
        </button>
        <nav className={menuOpen ? 'primary-nav open' : 'primary-nav'} aria-label={language === 'ru' ? 'Основная навигация' : 'Main navigation'}>
          {t.nav.map((label, i) => {
            const isAbout = i === 1;
            const isDevelopments = i === 2;
            const isPress = i === 4;
            if (isAbout || isDevelopments || isPress) {
              const isOpen = isAbout ? aboutMenuOpen : isDevelopments ? developmentsMenuOpen : pressMenuOpen;
              const submenuId = isAbout ? 'header-about-submenu' : isDevelopments ? 'header-developments-submenu' : 'header-press-submenu';
              const pages = isAbout ? t.aboutPages : isDevelopments ? t.developmentPages : t.pressPages;
              const submenuLinks = isAbout ? aboutLinks : isDevelopments ? developmentLinks : pressLinks;
              const toggle = () => {
                setAboutMenuOpen(isAbout ? !aboutMenuOpen : false);
                setDevelopmentsMenuOpen(isDevelopments ? !developmentsMenuOpen : false);
                setPressMenuOpen(isPress ? !pressMenuOpen : false);
              };
              return <div className={`header-dropdown${i === activeNavIndex ? ' current' : ''}`} key={label}>
                <button type="button" className="header-dropdown-toggle" aria-expanded={isOpen} aria-controls={submenuId} onClick={toggle}>
                  {label}<InterfaceIcon name="toggle" expanded={isOpen} className="header-dropdown-indicator" />
                </button>
                {isOpen && <div className="header-dropdown-submenu" id={submenuId}>
                  {pages.map((page, pageIndex) => submenuLinks[pageIndex]
                    ? <a key={page} href={submenuLinks[pageIndex]} onClick={() => { setAboutMenuOpen(false); setDevelopmentsMenuOpen(false); setPressMenuOpen(false); setMenuOpen(false); }}>{page}</a>
                    : <span className="header-dropdown-disabled" aria-disabled="true" key={page}>{page}</span>)}
                </div>}
              </div>;
            }
            return <a key={label} className={i === activeNavIndex ? 'current' : ''} href={links[i]} onClick={() => { setMenuOpen(false); setAboutMenuOpen(false); setDevelopmentsMenuOpen(false); setPressMenuOpen(false); }}>{label}<InterfaceIcon name="arrow-up-right" className="nav-arrow" /></a>;
          })}
        </nav>
      </div>
    </header>
  );
}

export default Header;
