import { act, fireEvent, render } from '@testing-library/react';
import About from './About';

beforeEach(() => {
  window.matchMedia = jest.fn(() => ({ matches: true }));
});

test.each(['ru', 'en'])('platform descriptions and links stay paired in %s', language => {
  const { container } = render(<About language={language} />);
  const cards = [...container.querySelectorAll('[data-platform-card]')];
  expect(cards.map(card => card.dataset.platformCard)).toEqual(['allomedin', 'entomix', 'calliphoridae', 'allostatins', 'flip7', 'inova-c']);
  cards.forEach(card => {
    const slug = card.dataset.platformCard;
    const label = container.querySelector(`[data-platform-label="${slug}"]`);
    expect(label).toHaveAttribute('href', `${language === 'en' ? '/en' : ''}/${slug}/`);
    expect(card.querySelector('h3')).not.toBeNull();
  });
  expect(cards[3].querySelectorAll('li')).toHaveLength(3);
  expect(cards[4].querySelectorAll('li')).toHaveLength(3);
  expect(container.querySelectorAll('.platform-formulas article')).toHaveLength(5);
});

test('connectors use actual element bounds and recalculate for resize and language', () => {
  let frame;
  let resize;
  const oldWidth = window.innerWidth;
  const oldObserver = global.ResizeObserver;
  window.innerWidth = 1440;
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => { frame = callback; return 1; });
  jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
  global.ResizeObserver = class { constructor(callback) { resize = callback; } observe() {} disconnect() {} };
  let offset = 0;
  jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function () {
    if (this.hasAttribute('data-platform-label')) return { left: 400, right: 500, top: 100 + offset, height: 40 };
    if (this.hasAttribute('data-platform-card')) return { left: 50, right: 250, top: 200, height: 100 };
    return { left: 0, top: 0 };
  });
  try {
    const { container, rerender, unmount } = render(<About language="ru" />);
    act(() => frame());
    const line = () => container.querySelector('[data-connection="allomedin"]');
    expect(line()).toHaveAttribute('d', 'M400,120 H382 L268,250 H243');
    offset = 20;
    act(() => { resize(); frame(); });
    expect(line().getAttribute('d')).toContain('M400,140');
    rerender(<About language="en" />);
    act(() => frame());
    expect(container.querySelectorAll('[data-connection]')).toHaveLength(6);
    window.innerWidth = 768;
    fireEvent(window, new Event('resize'));
    act(() => frame());
    expect(container.querySelectorAll('[data-connection]')).toHaveLength(0);
    unmount();
  } finally {
    window.innerWidth = oldWidth;
    global.ResizeObserver = oldObserver;
    jest.restoreAllMocks();
  }
});
