import { fireEvent, render, screen } from '@testing-library/react';
import CookieNotice from './CookieNotice';

beforeEach(() => window.localStorage.clear());

test('cookie notice links to the local privacy policy and stays dismissed', () => {
  const { rerender } = render(<CookieNotice language="ru" />);

  expect(screen.getByRole('link', { name: 'Узнать больше' })).toHaveAttribute('href', '/privacy-policy/');
  fireEvent.click(screen.getByRole('button', { name: 'Закрыть уведомление о файлах cookie' }));
  expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
  expect(window.localStorage.getItem('allopharm-cookie-notice-dismissed')).toBe('true');

  rerender(<CookieNotice language="en" />);
  expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
});
