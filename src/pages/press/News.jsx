import { useMemo } from 'react';
import { newsData } from './newsData';
import InterfaceIcon from '../../components/InterfaceIcon';
import '../../styles/News.css';

const PAGE_SIZE = 10;

export const normalizeNewsPath = (path) => path.replace(/\/+$/, '') || '/';

export function getNewsRoute(path) {
  const normalized = normalizeNewsPath(path);
  const language = normalized.startsWith('/en/') ? 'en' : 'ru';
  const prefix = language === 'en' ? '/en/articles' : '/articles';
  if (normalized === prefix) return { kind: 'archive', language, slug: null };
  if (normalized.startsWith(`${prefix}/`)) {
    const slug = normalized.slice(prefix.length + 1);
    if (slug && !slug.includes('/')) return { kind: 'article', language, slug };
  }
  return null;
}

export function newsPath(slug, language) {
  const prefix = language === 'en' ? '/en/articles' : '/articles';
  return slug ? `${prefix}/${slug}/` : `${prefix}/`;
}

export const getNewsBySlug = (slug) => newsData.find((article) => article.slug === slug);

const formatDate = (date, language) => new Intl.DateTimeFormat(language === 'ru' ? 'ru-RU' : 'en-GB', {
  day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC',
}).format(new Date(`${date}T00:00:00Z`));

const copy = {
  ru: {
    archiveTitle: 'Новости', searchLabel: 'Поиск по новостям', searchPlaceholder: 'Введите слово или фразу', clearSearch: 'Очистить поиск',
    readMore: 'Читать далее', page: 'Страница', previous: 'Назад', next: 'Дальше', noResults: 'По вашему запросу новости не найдены.',
    back: 'Все новости', related: 'Похожие новости', missingTranslation: 'Для этой статьи пока нет версии на выбранном языке.', noArticleText: 'Полный текст этой статьи отсутствует в исходном архиве.',
  },
  en: {
    archiveTitle: 'News', searchLabel: 'Search news', searchPlaceholder: 'Enter a word or phrase', clearSearch: 'Clear search',
    readMore: 'Read more', page: 'Page', previous: 'Previous', next: 'Next', noResults: 'No news matched your search.',
    back: 'All news', related: 'Related news', missingTranslation: 'This article is not available in the selected language yet.', noArticleText: 'The full text of this article is not available in the source archive.',
  },
};

function getLocalizedArticle(article, language) {
  return article?.[language] || null;
}

function PageHero({ title }) {
  return <div className="news-hero"><div className="news-container"><h1 tabIndex="-1">{title}</h1></div></div>;
}

function DateLabel({ date, language }) {
  return <time className="news-date" dateTime={date}><span aria-hidden="true">◷</span>{formatDate(date, language)}</time>;
}

function NewsCard({ article, language, labels }) {
  const localized = getLocalizedArticle(article, language);
  if (!localized) return null;
  return (
    <article className="news-card">
      <DateLabel date={article.date} language={language} />
      <h2><a href={newsPath(article.slug, language)}>{localized.title}</a></h2>
      <p>{localized.excerpt}{localized.body[0]?.length > localized.excerpt.length ? '…' : ''}</p>
      <div className="news-card-action"><a href={newsPath(article.slug, language)}><span aria-hidden="true">▤</span>{labels.readMore}</a></div>
    </article>
  );
}

function Pagination({ page, pages, onPageChange, labels }) {
  if (pages < 2) return null;
  const visiblePages = Array.from({ length: pages }, (_, index) => index + 1);
  return (
    <nav className="news-pagination" aria-label={labels.page}>
      <button type="button" onClick={() => onPageChange(page - 1)} disabled={page === 1}>{labels.previous}</button>
      <div className="news-page-numbers">
        {visiblePages.map((number) => <button key={number} type="button" aria-current={number === page ? 'page' : undefined} onClick={() => onPageChange(number)}>{number}</button>)}
      </div>
      <button type="button" onClick={() => onPageChange(page + 1)} disabled={page === pages}>{labels.next}</button>
    </nav>
  );
}

export function NewsArchive({ language, archiveState, onArchiveStateChange }) {
  const labels = copy[language];
  const { query, page } = archiveState;
  const setQuery = (query) => onArchiveStateChange({ query, page: 1 });
  const setPage = (page) => onArchiveStateChange({ query, page });
  const matchingArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase(language === 'ru' ? 'ru-RU' : 'en-GB');
    return newsData.filter((article) => {
      const localized = getLocalizedArticle(article, language);
      if (!localized) return false;
      if (!normalizedQuery) return true;
      return [localized.title, localized.excerpt, ...localized.body]
        .join(' ').toLocaleLowerCase(language === 'ru' ? 'ru-RU' : 'en-GB').includes(normalizedQuery);
    });
  }, [language, query]);
  const pages = Math.ceil(matchingArticles.length / PAGE_SIZE);
  const currentPage = Math.min(page, Math.max(pages, 1));
  const pageArticles = matchingArticles.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <main className="news-page">
      <PageHero title={labels.archiveTitle} />
      <div className="news-container news-archive-content">
        <form className="news-search" role="search" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="news-search-input">{labels.searchLabel}</label>
          <div className="news-search-field">
            <span aria-hidden="true">⌕</span>
            <input id="news-search-input" type="search" value={query} placeholder={labels.searchPlaceholder} onChange={(event) => setQuery(event.target.value)} />
            {query && <button type="button" aria-label={labels.clearSearch} onClick={() => setQuery('')}>×</button>}
          </div>
        </form>
        {pageArticles.length ? <div className="news-list">{pageArticles.map((article) => <NewsCard key={article.slug} article={article} language={language} labels={labels} />)}</div> : <p className="news-empty" role="status">{labels.noResults}</p>}
        <Pagination page={currentPage} pages={pages} onPageChange={setPage} labels={labels} />
      </div>
    </main>
  );
}

function linkifyParagraph(paragraph) {
  return paragraph.split(/(https?:\/\/[^\s<>"«»]+)/g).map((part, index) => {
    if (!/^https?:\/\//.test(part)) return part;
    const href = part.replace(/[.,;:!?]+$/, '');
    const punctuation = part.slice(href.length);
    return <span key={index}><a href={href} target="_blank" rel="noopener noreferrer">{href}</a>{punctuation}</span>;
  });
}

export function NewsArticle({ article, language }) {
  const labels = copy[language];
  const localized = getLocalizedArticle(article, language);
  const articleIndex = newsData.findIndex((item) => item.slug === article.slug);
  const related = newsData.filter((item) => item.slug !== article.slug)
    .sort((a, b) => Math.abs(newsData.indexOf(a) - articleIndex) - Math.abs(newsData.indexOf(b) - articleIndex))
    .slice(0, 3);

  return (
    <main className="news-page news-article-page">
      <PageHero title={localized?.title || labels.archiveTitle} />
      <div className="news-container news-article-content">
        <div className="news-article-toolbar"><a className="news-back" href={newsPath(null, language)} aria-label={labels.back}><InterfaceIcon name="chevron-left" /> <span>{labels.back}</span></a></div>
        {!localized ? <p className="news-empty" role="status">{labels.missingTranslation}</p> : <>
          <DateLabel date={article.date} language={language} />
          <article className="news-article-body">{localized.body.length ? localized.body.map((paragraph, index) => <p key={index}>{linkifyParagraph(paragraph)}</p>) : <p className="news-empty" role="status">{labels.noArticleText}</p>}</article>
          <section className="news-related" aria-labelledby="news-related-title">
            <h2 id="news-related-title">{labels.related}</h2>
            <div className="news-related-grid">{related.map((item) => {
              const itemContent = getLocalizedArticle(item, language);
              return itemContent && <article className="news-related-card" key={item.slug}>
                <DateLabel date={item.date} language={language} />
                <h3><a href={newsPath(item.slug, language)}>{itemContent.title}</a></h3>
                <a className="news-related-link" href={newsPath(item.slug, language)}>{labels.readMore} <InterfaceIcon name="arrow-up-right" /></a>
              </article>;
            })}</div>
          </section>
        </>}
      </div>
    </main>
  );
}
