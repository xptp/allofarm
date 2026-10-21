import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { Profiler } from 'react';
import App from './App';

let reportVisibility;

test('homepage language follows the URL and Back restores the previous language', () => {
  localStorage.setItem('allopharm-language', 'en');
  render(<App />);
  expect(document.documentElement.lang).toBe('ru');
  fireEvent.click(screen.getByRole('button', { name: 'EN', exact: true }));
  expect(window.location.pathname).toBe('/en/');
  expect(document.querySelector('.brand')).toHaveAttribute('href', '/en/');
  expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute('href', 'https://allopharm.ru/en/');
  act(() => {
    window.history.replaceState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
  expect(document.documentElement.lang).toBe('ru');
  expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute('href', 'https://allopharm.ru/');
});

test('homepage artwork follows the two text slides as dragonfly and fly', () => {
  window.history.replaceState({}, '', '/');
  render(<App />);

  expect(document.querySelectorAll('.slider-dot')).toHaveLength(2);
  expect(document.querySelector('.molecule-art-fly')).toHaveAttribute('aria-label', 'Стилизованное изображение мухи семейства Calliphoridae');

  fireEvent.click(screen.getByRole('button', { name: 'Слайд 1' }));
  expect(document.querySelector('.molecule-art-dragonfly')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Следующий слайд' }));
  expect(document.querySelector('.molecule-art-fly')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Слайд 2' }));
  expect(document.querySelector('.molecule-art-fly')).toBeInTheDocument();
});

test('English media link returns to the English homepage and scrolls to its section', () => {
  window.history.replaceState({}, '', '/en/articles/');
  render(<App />);
  const nav = screen.getByRole('navigation', { name: 'Main navigation' });
  fireEvent.click(within(nav).getByRole('button', { name: /Press centre/ }));
  fireEvent.click(within(nav).getByRole('link', { name: 'Media about us' }));
  expect(window.location.pathname).toBe('/en/');
  expect(window.location.hash).toBe('#media-title');
  expect(document.documentElement.lang).toBe('en');
  expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
});

test.each(['archive-link', 'browser-back'])('news archive preserves pagination and search after %s', (returnMethod) => {
  window.history.replaceState({}, '', '/articles/');
  render(<App />);
  const returnToArchive = () => {
    if (returnMethod === 'archive-link') {
      fireEvent.click(screen.getByRole('link', { name: 'Все новости', exact: true }));
    } else {
      act(() => {
        window.history.replaceState({}, '', '/articles/');
        window.dispatchEvent(new PopStateEvent('popstate'));
      });
    }
  };
  fireEvent.click(screen.getByRole('button', { name: 'Дальше' }));
  const heading = document.querySelector('.news-card h2').textContent;
  fireEvent.click(document.querySelector('.news-card h2 a'));
  returnToArchive();
  expect(screen.getByRole('button', { name: '2', exact: true })).toHaveAttribute('aria-current', 'page');
  expect(document.querySelector('.news-card h2')).toHaveTextContent(heading);
  fireEvent.change(screen.getByRole('searchbox'), { target: { value: '№2751837' } });
  fireEvent.click(document.querySelector('.news-card h2 a'));
  returnToArchive();
  expect(screen.getByRole('searchbox')).toHaveValue('№2751837');
  expect(document.querySelectorAll('.news-card')).toHaveLength(1);
});

test('article source links preserve query strings and exclude sentence punctuation', () => {
  window.history.replaceState({}, '', '/en/articles/virus-jepshtejn-barr/');
  render(<App />);
  const source = screen.getByRole('link', { name: 'http://www.cbio.ru/modules/news/article.php?storyid=3336' });
  expect(source).toHaveAttribute('href', 'http://www.cbio.ru/modules/news/article.php?storyid=3336');
  expect(source).toHaveAttribute('target', '_blank');
  expect(source).toHaveAttribute('rel', 'noopener noreferrer');
  expect(source.parentElement.textContent).toBe('http://www.cbio.ru/modules/news/article.php?storyid=3336.');
});

beforeEach(() => {
  window.history.replaceState({}, '', '/');
  localStorage.clear();
  window.scrollTo = jest.fn();
  Element.prototype.scrollIntoView = jest.fn();
  document.head.innerHTML = '<title>Аллофарм</title><meta name="description" content="Initial description">';
  window.matchMedia = jest.fn(() => ({ matches: false }));
  window.IntersectionObserver = jest.fn(function (callback) {
    reportVisibility = callback;
    this.observe = jest.fn();
    this.disconnect = jest.fn();
  });
});

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

test.each([
  ['/missing-page/', 'Страница не найдена', 'На главную'],
  ['/en/missing-page/', 'Page not found', 'Back to home'],
])('unknown route %s shows an error and allows returning home', (path, title, action) => {
  window.history.replaceState({}, '', path);
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(title);
  expect(document.title).toContain(title);
  expect(document.querySelector('.hero')).toBeNull();
  expect(document.querySelector('.primary-nav .current')).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: path.startsWith('/en/') ? 'RU' : 'EN', exact: true }));
  expect(window.location.pathname).toBe(path);
  expect(document.querySelector('.not-found-page')).not.toBeNull();
  fireEvent.click(screen.getByRole('button', { name: path.startsWith('/en/') ? 'EN' : 'RU', exact: true }));
  fireEvent.click(screen.getByRole('link', { name: action, exact: true }));
  expect(window.location.pathname).toBe(path.startsWith('/en/') ? '/en/' : '/');
  expect(document.querySelector('.not-found-page')).toBeNull();
  expect(screen.getByRole('heading', { level: 1 })).toHaveFocus();
});

test.each(['ru', 'en'])('company pages receive keyboard focus after navigation in %s', language => {
  window.history.replaceState({}, '', language === 'en' ? '/en/' : '/');
  render(<App />);
  const header = screen.getByRole('navigation', { name: language === 'ru' ? 'Основная навигация' : 'Main navigation' });
  const section = language === 'ru' ? 'О компании' : 'About us';
  for (const page of language === 'ru' ? ['О нас', 'Интеллектуальная собственность'] : ['About us', 'Intellectual property']) {
    fireEvent.click(within(header).getByRole('button', { name: new RegExp(section) }));
    fireEvent.click(within(header).getByRole('link', { name: page, exact: true }));
    expect(screen.getByRole('heading', { level: 1 })).toHaveFocus();
  }
});

test('language survives a remount and updates one set of document metadata', () => {
  const first = render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'EN', exact: true }));
  expect(document.documentElement.lang).toBe('en');
  expect(document.title).toBe('Allopharm — biotechnology company');
  expect(document.querySelector('meta[name="description"]').content).toContain('Allopharm is');
  expect(document.querySelectorAll('title')).toHaveLength(1);
  expect(document.querySelectorAll('meta[name="description"]')).toHaveLength(1);
  first.unmount();
  render(<App />);
  expect(screen.getByRole('button', { name: 'EN', exact: true })).toHaveAttribute('aria-pressed', 'true');
  fireEvent.click(screen.getByRole('button', { name: 'RU', exact: true }));
  expect(document.title).toBe('Аллофарм — биотехнологическая компания');
});

test('blocked storage does not break rendering or language switching', () => {
  jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Blocked'); });
  jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Blocked'); });
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'EN', exact: true }));
  expect(document.documentElement.lang).toBe('en');
});

test('platform links open distinct development pages and privacy is a real link', () => {
  render(<App />);
  const platforms = screen.getByRole('navigation', { name: 'Платформы' });
  const links = within(platforms).getAllByRole('link');
  expect(new Set(links.map(link => link.getAttribute('href'))).size).toBe(4);
  expect(links.map(link => link.getAttribute('href'))).toEqual(['/allostatins/', '/flip7/', '/inova-c/', '/calliphoridae/']);
  expect(screen.getByRole('link', { name: 'Политика конфиденциальности' })).toHaveAttribute('href', '/privacy-policy/');
});

test('privacy policy opens directly and switches to its English route', () => {
  render(<App initialPath="/privacy-policy/" />);
  expect(screen.getByRole('heading', { name: 'Политика конфиденциальности' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'EN', exact: true }));
  expect(window.location.pathname).toBe('/en/privacy-policy/');
  expect(screen.getByRole('heading', { name: 'Privacy Policy' })).toBeInTheDocument();
});

test('visible carousel copies retain the original destinations without extra tab stops', () => {
  const { container } = render(<App />);
  const sets = container.querySelectorAll('.media-track-set');
  const originals = sets[0].querySelectorAll('a');
  const copies = sets[1].querySelectorAll('a');
  expect(copies).toHaveLength(originals.length);
  copies.forEach((link, index) => {
    expect(link.href).toBe(originals[index].href);
    expect(link.tabIndex).toBe(-1);
  });
});

test.each(['ru', 'en'])('homepage company video card opens the requested YouTube Short in %s', (language) => {
  if (language === 'en') localStorage.setItem('allopharm-language', 'en');
  const { container } = render(<App />);
  expect(container.querySelector('.media-card-video')).toHaveAttribute('href', 'https://www.youtube.com/shorts/tLq9eTrZj50');
});

test.each([
  ['ru', ['/intellectual-property/', '/base/', '/publications/']],
  ['en', ['/en/intellectual-property/', '/en/base/', '/en/publications/']],
])('home information cards navigate to their pages in %s', (language, destinations) => {
  if (language === 'en') window.history.replaceState({}, '', '/en/');
  render(<App />);
  const cards = [...document.querySelectorAll('.directions-grid .direction-card-detail')];
  expect(cards).toHaveLength(3);
  expect(cards.map((card) => card.getAttribute('href'))).toEqual(destinations);
  fireEvent.click(cards[0]);
  expect(window.location.pathname).toBe(destinations[0]);
  expect(screen.getByRole('heading', { level: 1, name: language === 'ru' ? 'Интеллектуальная собственность' : 'Intellectual property' })).toBeInTheDocument();
});

test.each([
  ['ru', ['/base/', '/publications/', '/intellectual-property/']],
  ['en', ['/en/base/', '/en/publications/', '/en/intellectual-property/']],
])('home hero metrics navigate to their pages in %s', (language, destinations) => {
  if (language === 'en') window.history.replaceState({}, '', '/en/');
  render(<App />);
  const metrics = [...document.querySelectorAll('.hero-metrics a.metric-card')];
  expect(metrics).toHaveLength(3);
  expect(metrics.map((card) => card.getAttribute('href'))).toEqual(destinations);
  fireEvent.click(metrics[0]);
  expect(window.location.pathname).toBe(destinations[0]);
  expect(screen.getByRole('heading', { level: 1, name: language === 'ru' ? 'Исследовательская база' : 'Research base' })).toBeInTheDocument();
});

test('carousel pauses offscreen and on hover without rerendering the page every tick', () => {
  jest.useFakeTimers();
  const onRender = jest.fn();
  const { container } = render(<Profiler id="home" onRender={onRender}><App /></Profiler>);
  const scroller = container.querySelector('.media-carousel');
  Object.defineProperty(scroller, 'scrollWidth', { value: 4000 });
  onRender.mockClear();
  act(() => { jest.advanceTimersByTime(96); });
  expect(scroller.scrollLeft).toBe(0);
  act(() => {
    reportVisibility([{ isIntersecting: true }]);
    jest.advanceTimersByTime(96);
  });
  expect(scroller.scrollLeft).toBe(3);
  expect(onRender).not.toHaveBeenCalled();
  fireEvent.pointerEnter(scroller);
  act(() => { jest.advanceTimersByTime(96); });
  expect(scroller.scrollLeft).toBe(3);
});

test('changing language closes the mobile navigation', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Открыть меню' }));
  expect(screen.getByRole('button', { name: 'Закрыть меню' })).toHaveAttribute('aria-expanded', 'true');
  fireEvent.click(screen.getByRole('button', { name: 'EN', exact: true }));
  expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
});

test('wheel navigation wraps both ways, updates the range and preserves zoom gestures', () => {
  const { container } = render(<App />);
  const scroller = container.querySelector('.media-carousel');
  Object.defineProperty(scroller, 'scrollWidth', { value: 4000 });
  fireEvent.wheel(scroller, { deltaY: -100 });
  expect(scroller.scrollLeft).toBe(1900);
  fireEvent.scroll(scroller);
  expect(screen.getByRole('slider').value).toBe('950');
  fireEvent.wheel(scroller, { deltaY: 200 });
  expect(scroller.scrollLeft).toBe(100);
  fireEvent.wheel(scroller, { deltaY: 100, ctrlKey: true });
  expect(scroller.scrollLeft).toBe(100);
});

test('footer About menu contains only About us and intellectual property', () => {
  render(<App />);
  const toggle = screen.getByRole('button', { name: 'Раскрыть раздел «О компании»' });
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  const submenu = document.getElementById('footer-about-submenu');
  expect(within(submenu).getAllByRole('link').map((link) => link.textContent)).toEqual(['О нас', 'Интеллектуальная собственность']);
  expect(within(submenu).getByRole('link', { name: 'О нас' })).toHaveAttribute('href', '/about/');
  expect(within(submenu).getByRole('link', { name: 'Интеллектуальная собственность' })).toHaveAttribute('href', '/intellectual-property/');
  fireEvent.click(toggle);
  expect(document.getElementById('footer-about-submenu')).toBeNull();
});

test.each([
  ['/intellectual-property/', 'Интеллектуальная собственность', 'Патенты'],
  ['/en/intellectual-property/', 'Intellectual property', 'Patents'],
])('intellectual property route %s renders localized content and local PDF link', (path, title, patentsHeading) => {
  window.history.replaceState({}, '', path);
  render(<App />);
  expect(document.title).toContain(title);
  expect(screen.getByRole('heading', { name: title, level: 1 })).toBeInTheDocument();
  const patents = screen.getByRole('heading', { name: patentsHeading }).parentElement;
  expect(within(patents).getAllByRole('listitem')).toHaveLength(8);
  const documentation = screen.getByRole('link', { name: /Открыть PDF|Open PDF/ });
  expect(documentation.getAttribute('href')).toContain('allomedin-technical-documentation.pdf');
  expect(documentation).toHaveAttribute('target', '_blank');
  fireEvent.click(screen.getByRole('button', { name: 'EN', exact: true }));
  expect(window.location.pathname).toBe('/en/intellectual-property/');
});

test('hovering a platform label highlights its matching card and connector', async () => {
  const originalWidth = window.innerWidth;
  Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1280 });
  window.history.replaceState({}, '', '/about/');
  render(<App />);
  const label = document.querySelector('[data-platform-label="allomedin"]');
  fireEvent.pointerOver(label);
  expect(label).toHaveClass('is-active');
  expect(document.querySelector('[data-platform-card="allomedin"]')).toHaveClass('is-active');
  await waitFor(() => expect(document.querySelector('[data-connection="allomedin"]')).toHaveClass('is-active'));
  Object.defineProperty(window, 'innerWidth', { configurable: true, value: originalWidth });
});

test.each([
  ['/allomedin/', 'Больше информации'],
  ['/en/allomedin/', 'More information'],
])('Allomedin route %s provides a button to open the product PDF', (path, label) => {
  window.history.replaceState({}, '', path);
  render(<App />);
  const link = screen.getByRole('link', { name: label });
  expect(link).toHaveAttribute('target', '_blank');
  expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  expect(link.getAttribute('href')).toContain('allomedin-pro-information.pdf');
});

test('news archive replaces Publications in the header and footer and paginates ten entries', () => {
  window.history.replaceState({}, '', '/articles/');
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Новости', level: 1 })).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: 'Новости' }).every((link) => link.getAttribute('href') === '/articles/')).toBe(true);
  expect(document.querySelectorAll('.news-card')).toHaveLength(10);
  fireEvent.click(screen.getByRole('button', { name: 'Дальше' }));
  expect(document.querySelectorAll('.news-card')).toHaveLength(10);
  expect(screen.getByRole('heading', { name: /Американский научный журнал «PLOS one»/ })).toBeInTheDocument();
});

test('news search matches full article text and resets pagination when the query changes', () => {
  window.history.replaceState({}, '', '/articles/');
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Дальше' }));
  fireEvent.change(screen.getByRole('searchbox', { name: 'Поиск по новостям' }), { target: { value: '№2751837' } });
  expect(document.querySelectorAll('.news-card')).toHaveLength(1);
  expect(screen.getByRole('heading', { name: 'Компания «Аллофарм» получила новый патент' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Дальше' })).not.toBeInTheDocument();
});

test('news article routes localize the same article between English and Russian', () => {
  window.history.replaceState({}, '', '/en/articles/virus-jepshtejn-barr/');
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Epstein–Barr Virus May Be Associated with the Development of Multiple Sclerosis', level: 1 })).toBeInTheDocument();
  expect(document.documentElement.lang).toBe('en');
  fireEvent.click(screen.getByRole('button', { name: 'RU', exact: true }));
  expect(window.location.pathname).toBe('/articles/virus-jepshtejn-barr/');
  expect(screen.getByRole('heading', { name: 'Вирус Эпштейн-Барр может быть ассоциирован с развитием рассеянного склероза', level: 1 })).toBeInTheDocument();
});

test('Press centre dropdown links to media coverage and publications', () => {
  window.history.replaceState({}, '', '/articles/');
  render(<App />);
  const header = screen.getByRole('navigation', { name: 'Основная навигация' });
  fireEvent.click(within(header).getByRole('button', { name: /Пресс-центр/ }));
  expect(within(header).getByRole('link', { name: 'СМИ о нас' })).toHaveAttribute('href', '/#media-title');
  expect(within(header).getByRole('link', { name: 'Наши публикации' })).toHaveAttribute('href', '/publications/');
  const footer = screen.getByRole('navigation', { name: 'Навигация' });
  const footerToggle = within(footer).getByRole('button', { name: 'Раскрыть раздел «Пресс-центр»' });
  fireEvent.click(footerToggle);
  expect(within(footer).getByRole('link', { name: 'СМИ о нас' })).toHaveAttribute('href', '/#media-title');
  expect(within(footer).getByRole('link', { name: 'Наши публикации' })).toHaveAttribute('href', '/publications/');
});

test.each(['/articles/', '/'])('media coverage menu link scrolls to the homepage section from %s', (path) => {
  window.history.replaceState({}, '', path);
  render(<App />);
  const header = screen.getByRole('navigation', { name: 'Основная навигация' });
  fireEvent.click(within(header).getByRole('button', { name: /Пресс-центр/ }));
  fireEvent.click(within(header).getByRole('link', { name: 'СМИ о нас' }));
  expect(window.location.pathname).toBe('/');
  expect(window.location.hash).toBe('#media-title');
  expect(document.getElementById('media-title')).toBeInTheDocument();
  expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({ behavior: 'instant', block: 'start' });
});

test.each([
  ['/publications/', 'Наши публикации', 14, 'clinical-flip7-burns-2022.pdf'],
  ['/en/publications/', 'Our publications', 12, 'clinical-flip7-burns-2022.pdf'],
])('publications route %s lists localized records and downloadable PDFs', (path, title, count, pdfName) => {
  window.history.replaceState({}, '', path);
  render(<App />);
  expect(screen.getByRole('heading', { name: title, level: 1 })).toBeInTheDocument();
  expect(document.title).toContain(title);
  expect(document.querySelectorAll('.publication-item')).toHaveLength(count);
  const download = document.querySelector('.publication-download');
  expect(download).toHaveAttribute('download');
  expect(download.getAttribute('href')).toContain(pdfName);
  const titleLink = document.querySelector('.publication-title-link');
  expect(titleLink).toHaveAttribute('target', '_blank');
  expect(titleLink.getAttribute('href')).toContain(pdfName);
  fireEvent.click(screen.getByRole('button', { name: path.startsWith('/en/') ? 'RU' : 'EN', exact: true }));
  expect(window.location.pathname).toBe(path.startsWith('/en/') ? '/publications/' : '/en/publications/');
});

test.each([
  ['/contact/', 'Контакты', 'Наш адрес', '199178'],
  ['/en/contact/', 'Contacts', 'Our address', 'Saint Petersburg'],
])('contact route %s shows localized details and localizes the header link', (path, title, addressTitle, addressText) => {
  window.history.replaceState({}, '', path);
  render(<App />);
  expect(screen.getByRole('heading', { name: title, level: 1 })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: addressTitle, level: 2 })).toBeInTheDocument();
  expect(document.querySelector('.contact-address-card')).toHaveTextContent(addressText);
  expect(document.querySelector('.contact-direct a[href^="mailto:"]')).toHaveAttribute('href', 'mailto:allofarm.spb@yandex.ru');
  const nav = screen.getByRole('navigation', { name: path.startsWith('/en/') ? 'Main navigation' : 'Основная навигация' });
  expect(within(nav).getByRole('link', { name: title })).toHaveAttribute('href', path);
  fireEvent.click(screen.getByRole('button', { name: path.startsWith('/en/') ? 'RU' : 'EN', exact: true }));
  expect(window.location.pathname).toBe(path.startsWith('/en/') ? '/contact/' : '/en/contact/');
});

test.each([
  ['/cooperation/', 'Сотрудничество', 'Продвижение разработок компании Аллофарм на территории РФ и за рубежом.'],
  ['/en/cooperation/', 'Cooperation', 'Promoting Allopharm developments in Russia and internationally.'],
])('cooperation route %s links the partnership areas to local pages', (path, navLabel, firstItem) => {
  window.history.replaceState({}, '', path);
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  expect(document.querySelectorAll('.cooperation-item')).toHaveLength(4);
  const nav = screen.getByRole('navigation', { name: path.startsWith('/en/') ? 'Main navigation' : 'Основная навигация' });
  expect(within(nav).getByRole('link', { name: navLabel })).toHaveAttribute('href', path);
  const items = document.querySelectorAll('.cooperation-item-text');
  expect(items[0]).toHaveAttribute('href', path.startsWith('/en/') ? '/en/about/' : '/about/');
  expect(items[0]).toHaveTextContent(firstItem);
  expect(items[1].tagName).toBe('P');
  expect(items[2]).toHaveAttribute('href', path.startsWith('/en/') ? '/en/intellectual-property/' : '/intellectual-property/');
  expect(items[3]).toHaveAttribute('href', path.startsWith('/en/') ? '/en/about/' : '/about/');
  fireEvent.click(items[0]);
  expect(window.location.pathname).toBe(path.startsWith('/en/') ? '/en/about/' : '/about/');
});
