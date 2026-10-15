import { developments, developmentPath } from '../pages/developments/navigation';
import '../styles/ResearchBase.css';

export default function DevelopmentsLayout({ language, slug, title, contentLanguage = language, children }) {
  const label = language === 'ru' ? 'Наши разработки' : 'Our developments';
  return (
    <main className={`research-page${slug === 'base' ? '' : ' development-detail-page'}`}>
      <section className="research-hero" aria-labelledby="research-title">
        <div className="research-container">
          <h1 id="research-title" tabIndex={-1} lang={contentLanguage}>{title}</h1>
          <span className="research-eyebrow"><i aria-hidden="true" />{label}</span>
        </div>
      </section>
      <div className="research-container research-layout">
        <div className="research-article">
          {contentLanguage !== language && <p className="development-language-note" lang="en">Content is available in Russian</p>}
          <div lang={contentLanguage}>{children}</div>
        </div>
        <aside className="research-products" aria-label={label}>
          <h2>{label}</h2>
          <nav className="research-product-grid" aria-label={language === 'ru' ? 'Выбрать разработку' : 'Choose a development'}>
            {developments.map((product) => (
              <a className={`research-product${product.package ? ' research-product-package' : ''}`} href={developmentPath(product.slug, language)} aria-current={slug === product.slug ? 'page' : undefined} key={product.slug}>
                <span className="research-product-image"><img src={product.image} alt="" loading="lazy" /></span>
                <span className="research-product-name">{product[language]}</span>
              </a>
            ))}
          </nav>
        </aside>
      </div>
    </main>
  );
}
