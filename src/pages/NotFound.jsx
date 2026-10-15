import '../styles/NotFound.css';

export default function NotFound({ language }) {
  const isRussian = language === 'ru';
  return (
    <main className="not-found-page" aria-labelledby="not-found-title">
      <p className="not-found-code">404</p>
      <h1 id="not-found-title" tabIndex={-1}>{isRussian ? 'Страница не найдена' : 'Page not found'}</h1>
      <p>{isRussian ? 'Проверьте адрес или вернитесь на главную страницу.' : 'Check the address or return to the home page.'}</p>
      <a className="not-found-link" href="/">{isRussian ? 'На главную' : 'Back to home'}</a>
    </main>
  );
}
