import { act, fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  localStorage.clear();
  window.scrollTo = jest.fn();
  document.head.innerHTML = '<title></title><meta name="description" content="">';
});

test.each([['/base/', 'ru', 'Исследовательская база'], ['/en/base/', 'en', 'Research base']])('research page opens directly and remounts at %s', (path, language, title) => {
  localStorage.setItem('allopharm-language', language === 'ru' ? 'en' : 'ru');
  window.history.replaceState({}, '', path);
  const first = render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument();
  expect(document.documentElement.lang).toBe(language);
  expect(document.title).toContain(title);
  expect(document.querySelector('meta[name="description"]').content).not.toBe('');
  first.unmount();
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument();
});

test('research language switching and history keep the matching page and navigation', () => {
  window.history.replaceState({}, '', '/base/');
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'EN', exact: true }));
  expect(window.location.pathname).toBe('/en/base/');
  expect(screen.getByRole('heading', { level: 1, name: 'Research base' })).toBeInTheDocument();
  const nav = screen.getByRole('navigation', { name: 'Main navigation' });
  fireEvent.click(within(nav).getByRole('button', { name: /Developments/ }));
  expect(within(nav).getByRole('link', { name: 'Research base' })).toHaveAttribute('href', '/en/base/');
  const footer = screen.getByRole('navigation', { name: 'Navigation' });
  fireEvent.click(within(footer).getByRole('button', { name: 'Expand Our developments menu' }));
  expect(within(footer).getByRole('link', { name: 'Research base' })).toHaveAttribute('href', '/en/base/');
  act(() => {
    window.history.replaceState({}, '', '/base/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
  expect(document.documentElement.lang).toBe('ru');
  expect(screen.getByRole('heading', { level: 1, name: 'Исследовательская база' })).toBeInTheDocument();
});

test('all six sidebar cards switch the page and its shareable address', () => {
  window.history.replaceState({}, '', '/base/');
  render(<App />);
  const products = screen.getByRole('complementary', { name: 'Наши разработки' });
  const links = within(products).getAllByRole('link');
  expect(links).toHaveLength(6);
  expect(within(products).queryByRole('link', { name: 'Исследовательская база' })).toBeNull();
  const paths = ['/allomedin/', '/entomix/', '/allostatins/', '/flip7/', '/inova-c/', '/calliphoridae/'];
  links.forEach((link, index) => {
    fireEvent.click(link);
    expect(window.location.pathname).toBe(paths[index]);
    expect(window.location.hash).toBe('');
    expect(link).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('heading', { level: 1 })).toHaveFocus();
  });
  expect(window.scrollTo).toHaveBeenCalledTimes(6);
});
