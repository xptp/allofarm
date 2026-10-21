import { useState } from 'react';
import '../styles/CookieNotice.css';

const copy = {
  ru: {
    message: 'Наш веб-сайт использует файлы cookie, чтобы гарантировать, что мы предоставляем вам наилучший пользовательский опыт.',
    more: 'Узнать больше',
    close: 'Закрыть уведомление о файлах cookie',
    href: '/privacy-policy/',
  },
  en: {
    message: 'Our website uses cookies to ensure that we provide you with the best user experience.',
    more: 'Learn more',
    close: 'Close cookie notice',
    href: '/en/privacy-policy/',
  },
};

const STORAGE_KEY = 'allopharm-cookie-notice-dismissed';

export default function CookieNotice({ language }) {
  const [visible, setVisible] = useState(() => {
    try {
      return window.localStorage.getItem(STORAGE_KEY) !== 'true';
    } catch {
      return true;
    }
  });
  const text = copy[language] || copy.ru;

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // The notice can still be dismissed for this page view.
    }
  };

  return <aside className="cookie-notice" aria-label={language === 'ru' ? 'Уведомление о файлах cookie' : 'Cookie notice'}>
    <p>{text.message} <a href={text.href}>{text.more}</a></p>
    <button type="button" onClick={dismiss} aria-label={text.close}>
      <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="m5 5 10 10M15 5 5 15" /></svg>
    </button>
  </aside>;
}
