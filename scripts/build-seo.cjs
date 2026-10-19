/* Render the existing React pages to static HTML after the CRA build.
 * No server or backend is needed at runtime. */
const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const root = path.resolve(__dirname, '..');
const source = path.join(root, 'src') + path.sep;
const build = path.join(root, 'build');
const manifest = JSON.parse(fs.readFileSync(path.join(build, 'asset-manifest.json'), 'utf8')).files;
const originalJs = require.extensions['.js'];
function compile(module, filename) {
  if (!filename.startsWith(source)) return originalJs(module, filename);
  const result = babel.transformFileSync(filename, {
    babelrc: false, configFile: false,
    presets: [[require.resolve('@babel/preset-env'), { targets: { node: 'current' } }], [require.resolve('@babel/preset-react'), { runtime: 'automatic' }]],
  });
  module._compile(result.code, filename);
}
require.extensions['.js'] = compile;
require.extensions['.jsx'] = compile;
require.extensions['.css'] = module => { module.exports = {}; };
const mime = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.pdf': 'application/pdf' };
Object.entries(mime).forEach(([ext, type]) => {
  require.extensions[ext] = (module, filename) => {
    module.exports = manifest[`static/media/${path.basename(filename)}`]
      || `data:${type};base64,${fs.readFileSync(filename).toString('base64')}`;
  };
});

const React = require('react');
const { renderToString } = require('react-dom/server');
const App = require('../src/App').default;
const { getSeo, seoTags, getIndexablePaths, SITE_URL } = require('../src/seo');
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const template = fs.readFileSync(path.join(build, 'index.html'), 'utf8');
const paths = getIndexablePaths();
if (paths.length !== new Set(paths).size) throw new Error('Duplicate sitemap paths');

function renderPage(route, output) {
  const seo = getSeo(route);
  const head = seoTags(seo).map(([tag, attrs]) => `<${tag} data-site-seo="" ${Object.entries(attrs).map(([key, value]) => `${key}="${escape(value)}"`).join(' ')}>`).join('');
  const body = renderToString(React.createElement(App, { initialPath: route }));
  const html = template
    .replace('<html lang="ru">', `<html lang="${seo.language}">`)
    .replace(/<title>.*?<\/title>/, `<title>${escape(seo.title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, '')
    .replace('</head>', `${head}</head>`)
    .replace('<div id="root"></div>', () => `<div id="root">${body}</div>`);
  if (!html.includes('data-site-seo') || !html.includes('<h1')) throw new Error(`Incomplete HTML: ${route}`);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, html);
}
paths.forEach(route => renderPage(route, path.join(build, route.slice(1), 'index.html')));
// Existing fallback route stays accessible, but is not presented as an English translation.
renderPage('/en/allostatins/', path.join(build, 'en/allostatins/index.html'));
renderPage('/not-found/', path.join(build, '404.html'));
const sitemap = paths.map(route => {
  const seo = getSeo(route);
  const alternates = seo.alternates.map(item => `<xhtml:link rel="alternate" hreflang="${item.language}" href="${escape(item.href)}"/>`).join('');
  return `<url><loc>${escape(SITE_URL + route)}</loc>${alternates}</url>`;
}).join('\n');
fs.writeFileSync(path.join(build, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sitemap}\n</urlset>\n`);
fs.writeFileSync(path.join(build, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
console.log(`SEO: rendered ${paths.length} indexable pages, language alternates, sitemap and 404.html.`);
