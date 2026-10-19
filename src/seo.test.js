import { getSeo, getIndexablePaths, applySeo, SITE_URL } from './seo';

test('every sitemap URL has unique metadata and a self canonical on the production domain', () => {
  const paths = getIndexablePaths();
  expect(new Set(paths).size).toBe(paths.length);
  expect(paths).toEqual(expect.arrayContaining(['/', '/en/', '/allomedin/', '/en/allomedin/']));
  for (const path of paths) {
    const seo = getSeo(path);
    expect(seo.noindex).toBe(false);
    expect(seo.canonical).toBe(SITE_URL + path);
    expect(seo.description.length).toBeGreaterThan(40);
    for (const alternate of seo.alternates) {
      const other = getSeo(new URL(alternate.href).pathname);
      expect(other.noindex).toBe(false);
      expect(other.alternates).toContainEqual({ language: seo.language, href: seo.canonical });
    }
  }
  expect(new Set(paths.map(path => getSeo(path).title)).size).toBe(paths.length);
});

test('Allomedin search descriptions stay neutral and aliases canonicalize', () => {
  expect(getSeo('/allomedin/').description).toContain('для ухода за кожей лица и тела');
  expect(getSeo('/allomedin/').description).not.toMatch(/лечит|противовирус|сутки|безопасн|уникаль/i);
  expect(getSeo('/allostatin/').canonical).toBe(SITE_URL + '/allostatins/');
  expect(getSeo('/en/allostatins/').noindex).toBe(true);
  expect(getIndexablePaths()).not.toContain('/en/allostatins/');
});

test('navigation updates metadata without duplicates and errors remove language links', () => {
  document.head.innerHTML = '<title>Initial</title><meta name="description" content="initial">';
  for (const path of ['/', '/en/', '/allomedin/', '/en/allomedin/']) {
    const seo = getSeo(path);
    applySeo(seo);
    expect(document.title).toBe(seo.title);
    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(document.querySelectorAll('meta[name="description"]')).toHaveLength(1);
    expect(document.querySelector('link[rel="canonical"]').href).toBe(seo.canonical);
    expect(document.querySelector('meta[property="og:title"]').content).toBe(seo.title);
  }
  applySeo(getSeo('/missing/'));
  expect(document.querySelector('meta[name="robots"]').content).toBe('noindex, follow');
  expect(document.querySelector('link[rel="canonical"]')).toBeNull();
  expect(document.querySelector('link[hreflang]')).toBeNull();
});
