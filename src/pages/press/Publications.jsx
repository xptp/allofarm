import { publicationsData } from './publicationsData';
import '../../styles/News.css';
import '../../styles/Publications.css';

const copy = {
  ru: { title: 'Наши публикации', download: 'Скачать PDF', pdfLabel: 'PDF-файл' },
  en: { title: 'Our publications', download: 'Download PDF', pdfLabel: 'PDF file' },
};

export const getPublicationsRoute = (path) => {
  const normalized = path.replace(/\/+$/, '') || '/';
  if (normalized === '/publications') return { language: 'ru' };
  if (normalized === '/en/publications') return { language: 'en' };
  return null;
};

export const publicationsPath = (language) => `${language === 'en' ? '/en' : ''}/publications/`;

export default function PublicationsPage({ language }) {
  const labels = copy[language];
  const publications = publicationsData.filter((publication) => publication[language]);

  return (
    <main className="news-page publications-page">
      <div className="news-hero"><div className="news-container"><h1 tabIndex="-1">{labels.title}</h1></div></div>
      <div className="news-container publications-content">
        <div className="publications-list">
          {publications.map((publication) => {
            const item = publication[language];
            return (
              <article className="publication-item" key={publication.id}>
                <div className="publication-year">{publication.year}</div>
                <div className="publication-details">
                  <h2><a className="publication-title-link" href={publication.pdf} target="_blank" rel="noopener noreferrer">{item.title}</a></h2>
                  <p className="publication-authors">{item.authors}</p>
                  <p className="publication-journal"><em>{item.journal}</em></p>
                </div>
                <a className="publication-download" href={publication.pdf} download aria-label={`${labels.download}: ${item.title}`}>
                  <span aria-hidden="true">↓</span>{labels.download}<small>{labels.pdfLabel}</small>
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
