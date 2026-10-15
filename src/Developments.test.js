import { act, fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  localStorage.clear();
  window.scrollTo = jest.fn();
  document.head.innerHTML = '<title></title><meta name="description" content="">';
});

const cases = [
  ['allomedin', 'АЛЛОМЕДИН® ПРО', 'ALLOMEDIN® PRO'],
  ['entomix', 'ЭНТОМИКС®', 'ENTOMIX®'],
  ['allostatins', 'АЛЛОСТАТИН®', 'АЛЛОСТАТИН®'],
  ['flip7', 'FLIP®7', 'FLIP®7'],
  ['inova-c', 'InOVA-C', 'InOVA-C'],
  ['calliphoridae', 'Технология выращивания', 'TECHNOLOGY OF THE CALLIPHORIDAE'],
];

test.each(cases.flatMap(([slug, ru, en]) => [[`/${slug}/`, 'ru', ru], [`/en/${slug}/`, 'en', en]]))('direct link and refresh preserve %s', (path, language, title) => {
  window.history.replaceState({}, '', path);
  localStorage.setItem('allopharm-language', language === 'en' ? 'ru' : 'en');
  const first = render(<App />);
  expect(screen.getByRole('heading', { level: 1 }).textContent).toContain(title);
  expect(document.documentElement.lang).toBe(language);
  expect(document.title).toContain(title);
  expect(document.querySelector('meta[name="description"]').content).toContain(title);
  expect(document.querySelectorAll('.research-product[aria-current="page"]')).toHaveLength(1);
  first.unmount();
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 }).textContent).toContain(title);
});

test('header, footer and sidebar use identical product addresses and base stays in menus only', () => {
  window.history.replaceState({}, '', '/en/base/');
  render(<App />);
  const header = screen.getByRole('navigation', { name: 'Main navigation' });
  const footer = screen.getByRole('navigation', { name: 'Navigation' });
  fireEvent.click(within(header).getByRole('button', { name: /Developments/ }));
  fireEvent.click(within(footer).getByRole('button', { name: 'Expand Our developments menu' }));
  const sidebar = screen.getByRole('navigation', { name: 'Choose a development' });
  within(sidebar).getAllByRole('link').forEach(link => {
    expect(within(header).getAllByRole('link').some(item => item.getAttribute('href') === link.getAttribute('href'))).toBe(true);
    expect(within(footer).getAllByRole('link').some(item => item.getAttribute('href') === link.getAttribute('href'))).toBe(true);
  });
  fireEvent.click(within(header).getByRole('link', { name: 'ENTOMIX®', exact: true }));
  expect(window.location.pathname).toBe('/en/entomix/');
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('ENTOMIX®');
  fireEvent.click(within(footer).getByRole('link', { name: 'Research base', exact: true }));
  expect(window.location.pathname).toBe('/en/base/');
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Research base');
});

test('language switching preserves a product and Allostatin shows the agreed Russian fallback', () => {
  window.history.replaceState({}, '', '/entomix/');
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'EN', exact: true }));
  expect(window.location.pathname).toBe('/en/entomix/');
  expect(screen.getByText('Used for skin and soft tissue diseases complicated by bacterial infection.')).toBeInTheDocument();
  fireEvent.click(within(screen.getByRole('navigation', { name: 'Choose a development' })).getByRole('link', { name: 'ALLOSTATIN®', exact: true }));
  expect(window.location.pathname).toBe('/en/allostatins/');
  expect(screen.getByText('Content is available in Russian')).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 1 })).toHaveAttribute('lang', 'ru');
  expect(document.documentElement.lang).toBe('en');
  fireEvent.click(screen.getByRole('button', { name: 'RU', exact: true }));
  expect(window.location.pathname).toBe('/allostatins/');
  expect(screen.queryByText('Content is available in Russian')).toBeNull();
});

test('history restores product content and internal related links stay in the selected language', () => {
  window.history.replaceState({}, '', '/en/entomix/');
  render(<App />);
  fireEvent.click(screen.getByRole('link', { name: /The main active substance/ }));
  expect(window.location.pathname).toBe('/en/flip7/');
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('FLIP®7');
  act(() => {
    window.history.replaceState({}, '', '/en/entomix/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('ENTOMIX®');
  act(() => {
    window.history.replaceState({}, '', '/en/flip7/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('FLIP®7');
});

test('FLIP7 retains local brochure, three figures and the full Russian activity spectrum', () => {
  window.history.replaceState({}, '', '/flip7/');
  render(<App />);
  expect(screen.getByRole('link', { name: /Патент РФ/ })).toHaveAttribute('href', 'flip7-brochure.pdf');
  expect(document.querySelectorAll('.development-gallery img')).toHaveLength(3);
  expect(document.querySelectorAll('.development-spectrum details')).toHaveLength(6);
  expect(screen.getByText('Acinetobacter baumannii')).toBeInTheDocument();
});
