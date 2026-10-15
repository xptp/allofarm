import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { Profiler } from 'react';
import App from './App';

let reportVisibility;

beforeEach(() => {
  window.history.replaceState({}, '', '/');
  localStorage.clear();
  window.scrollTo = jest.fn();
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
  expect(window.location.pathname).toBe('/');
  expect(document.querySelector('.not-found-page')).toBeNull();
  expect(screen.getByRole('heading', { level: 1 })).toHaveFocus();
});

test.each(['ru', 'en'])('company pages receive keyboard focus after navigation in %s', language => {
  localStorage.setItem('allopharm-language', language);
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
  expect(screen.getByRole('link', { name: 'Политика конфиденциальности' })).toHaveAttribute('href', 'https://allopharm.ru/privacy-policy');
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
