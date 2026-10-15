import allomedin from '../../assets/development-site-image-1.png';
import entomix from '../../assets/development-entomix-package.jpg';
import allostatin from '../../assets/development-allostatin-cover.jpg';
import flip from '../../assets/development-flip.jpg';
import inova from '../../assets/development-calliphoridae.jpg';
import cultivation from '../../assets/development-cultivation.jpg';

export const developments = [
  { slug: 'allomedin', image: allomedin, package: true, ru: 'АЛЛОМЕДИН® ПРО', en: 'ALLOMEDIN® PRO' },
  { slug: 'entomix', image: entomix, package: true, ru: 'ЭНТОМИКС®', en: 'ENTOMIX®' },
  { slug: 'allostatins', image: allostatin, ru: 'АЛЛОСТАТИН®', en: 'ALLOSTATIN®' },
  { slug: 'flip7', image: flip, ru: 'FLIP®7', en: 'FLIP®7' },
  { slug: 'inova-c', image: inova, ru: 'InOVA-C', en: 'InOVA-C' },
  { slug: 'calliphoridae', image: cultivation, ru: 'Технологии культивирования насекомых', en: 'Insect cultivation technologies' },
];

export const developmentPath = (slug, language) => `${language === 'en' ? '/en' : ''}/${slug}/`;
export const developmentMenuSlugs = ['base', 'allostatins', 'flip7', 'inova-c', 'allomedin', 'entomix', 'calliphoridae'];
export const normalizePath = (path) => path.replace(/\/+$/, '') || '/';
export function getRoute(path) {
  const normalized = normalizePath(path);
  const language = normalized.startsWith('/en/') ? 'en' : 'ru';
  let slug = normalized.replace(/^\/en\//, '').replace(/^\//, '');
  // Accept the singular spelling used by the old English site as well.
  if (slug === 'allostatin') slug = 'allostatins';
  return [...developmentMenuSlugs, 'about', 'intellectual-property'].includes(slug)
    ? { slug, language, development: developmentMenuSlugs.includes(slug) }
    : null;
}

export function localizeDevelopmentLink(href, language) {
  if (!href) return undefined;
  const url = new URL(href.trim(), language === 'en' ? 'https://en.allopharm.ru' : 'https://allopharm.ru');
  if (['allopharm.ru', 'en.allopharm.ru'].includes(url.hostname)) {
    const route = getRoute(url.pathname);
    if (route?.development) return developmentPath(route.slug, language);
  }
  return url.href;
}
