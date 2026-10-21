import { useEffect, useId, useRef, useState } from 'react';
import '../../styles/About.css';
import pnasLogo from '../../assets/journal-pnas.jpg';
import plosOneLogo from '../../assets/journal-plos-one.jpg';
import jbcLogo from '../../assets/journal-jbc.jpg';
import { developmentPath } from '../developments/navigation';
import InterfaceIcon from '../../components/InterfaceIcon';

const aboutCopy = {
  ru: {
    eyebrow: 'Инновационная пептидная биотехнология', title: 'Аллофарм — биотехнологическая компания',
    pillars: [
      'Изучение иммунной системы насекомых как основа научных открытий',
      'Создание технологий для внедрения полученных знаний в современную медицину',
      'Сотрудничество с российскими и зарубежными институтами в области разработки новых способов лечения и профилактики',
    ],
    mapLabel: 'Интерактивная научная технологическая карта платформы',
    mapTitle: 'Технологическая цепочка: от культуры Calliphoridae до клинических субстанций',
    cultivationLabel: 'Культивирование', cultivationTitle: 'Личинки Calliphoridae',
    cultivationText: 'Технология выращивания личинок семейства Calliphoridae, поддержание непрерывной лабораторной культуры.',
    ecologyLabel: 'Утилизация и экосистема', ecologyTitle: 'Система «Биозавод»',
    ecologyText: 'Глубокая утилизация отходов, экологичные массы естественной очистки органических субстратов.',
    applications: 'Области применения', fields: ['Хирургия', 'Дерматология', 'Гинекология', 'Геронтология', 'Трансплантология', 'Травматология', 'Стоматология'],
    coreTitle: 'Calliphoridae', coreText: 'Иммунная пептидная матрица', nodes: ['Алломедин, гель', 'InOVA-C адъювант', 'Энтомикс, гель', 'Аллостатин, пептид', 'FLIP7 пептиды'],
    vaccineNote: 'InOVA-C: может применяться в составе вакцин',
    therapeuticAreas: [
      { title: 'Герпес, ВПЧ и вирусология', text: 'Лечение и профилактика заболеваний вирусной природы, стимуляция естественного эндогенного интерфероногенеза.' },
      { title: 'Адъюванты и иммуногенность', text: 'В качестве адъюванта для усиления распознавания слабых антигенов при вакцинации.' },
      { title: 'Преодоление резистентности', text: 'Лечение заболеваний, вызванных бактериальной инфекцией. Разрушение биологических биоплёнок. Новый подход к решению проблемы антибиотикорезистентности.' },
    ],
    formulasTitle: 'Ключевые активные платформы',
    formulas: [
      ['Формула I', 'Энтомикс', 'Биогель местного действия'], ['Формула II', 'Алломедин', 'Дерматологический гель'],
      ['Формула III', 'Аллостатин', 'Таргетный пептид'], ['Комплекс', 'FLIP7', 'Антимикробные пептиды'], ['Адъювант', 'InOVA-C', 'Вакцинный компонент'],
    ],
    researchTitle: 'Исследования, патенты и история',
    researchHeading: 'Результаты исследований', researchText: 'Результаты наших исследований прошли рецензирование мировым научным сообществом и опубликованы в рейтинговых международных журналах.',
    journals: 'PNAS, PLoS ONE, Journal of Biological Chemistry, International Immunopharmacology и многие другие.',
    journalSlides: ['Proceedings of the National Academy of Sciences', 'PLOS ONE', 'Journal of Biological Chemistry'],
    journalCarouselLabel: 'Логотипы научных журналов',
    patentsHeading: 'Интеллектуальная собственность', patentsText: 'Все разработки защищены патентами. Товарные знаки и ноу-хау оформлены в соответствии с действующим законодательством РФ. Имеются зарубежные патенты.',
    patentsDetail: 'Патентная чистота и всесторонняя юридическая охрана технологических цепочек, формул и биопрепаратов в юрисдикциях РФ, ЕАЭС и дальнего зарубежья.',
    historyHeading: 'Из истории компании «Аллофарм»', historyText: 'Научная группа компании «Аллофарм» принимала участие в разработке, проведении клинических исследований и продвижении противовирусного препарата «Аллокин-Альфа» на основе аллоферона (автор проекта — Черныш С. И.).',
    historyFact: '«Аллокин-Альфа» — инъекционное средство на основе компонентов иммунной системы насекомых.',
  },
  en: {
    eyebrow: 'Innovative peptide biotechnology', title: 'Allopharm — biotechnology company',
    pillars: [
      'Studying the insect immune system as a basis for scientific discovery',
      'Developing technologies that bring research into modern medicine',
      'Cooperating with Russian and international institutes to develop new approaches to treatment and prevention',
    ],
    mapLabel: 'Scientific and technological platform map',
    mapTitle: 'Technology chain: from Calliphoridae culture to clinical substances',
    cultivationLabel: 'Cultivation', cultivationTitle: 'Calliphoridae larvae',
    cultivationText: 'Technology for rearing Calliphoridae larvae and maintaining a continuous laboratory culture.',
    ecologyLabel: 'Waste processing and ecosystem', ecologyTitle: 'The “Biofactory” system',
    ecologyText: 'Comprehensive waste processing and ecological materials for the natural treatment of organic substrates.',
    applications: 'Fields of application', fields: ['Surgery', 'Dermatology', 'Gynaecology', 'Geriatrics', 'Transplantology', 'Traumatology', 'Dentistry'],
    coreTitle: 'Calliphoridae', coreText: 'Immune peptide matrix', nodes: ['Allomedin gel', 'InOVA-C adjuvant', 'Entomix gel', 'Allostatin peptide', 'FLIP7 peptides'],
    vaccineNote: 'InOVA-C: potential use in vaccines',
    therapeuticAreas: [
      { title: 'Herpes, HPV and virology', text: 'Treatment and prevention of viral diseases, stimulating natural endogenous interferon production.' },
      { title: 'Adjuvants and immunogenicity', text: 'An adjuvant to enhance the recognition of weak antigens during vaccination.' },
      { title: 'Addressing resistance', text: 'Treatment of bacterial infections and disruption of biological biofilms. A new approach to the challenge of antibiotic resistance.' },
    ],
    formulasTitle: 'Key active platforms',
    formulas: [
      ['Formula I', 'Entomix', 'Topical biogel'], ['Formula II', 'Allomedin', 'Dermatological gel'],
      ['Formula III', 'Allostatin', 'Targeted peptide'], ['Complex', 'FLIP7', 'Antimicrobial peptides'], ['Adjuvant', 'InOVA-C', 'Vaccine component'],
    ],
    researchTitle: 'Research, patents and history',
    researchHeading: 'Research results', researchText: 'Our research has been peer-reviewed by the international scientific community and published in leading international journals.',
    journals: 'PNAS, PLoS ONE, Journal of Biological Chemistry, International Immunopharmacology and others.',
    journalSlides: ['Proceedings of the National Academy of Sciences', 'PLOS ONE', 'Journal of Biological Chemistry'],
    journalCarouselLabel: 'Scientific journal logos',
    patentsHeading: 'Intellectual property', patentsText: 'All developments are protected by patents. Trademarks and know-how are registered in accordance with Russian law. The company also holds international patents.',
    patentsDetail: 'Patent clearance and comprehensive legal protection for technology chains, formulas and biological products in Russia, the EAEU and other jurisdictions.',
    historyHeading: 'The history of Allopharm', historyText: 'Allopharm’s research group took part in the development, clinical studies and promotion of the antiviral medicine Allokin-Alpha, based on alloferon (project author: S. I. Chernysh).',
    historyFact: 'Allokin-Alpha is an injectable medicine based on components of the insect immune system.',
  },
};

const platformCards = {
  ru: [
    { slug: 'allomedin', title: 'Алломедин, гель', items: ['Хирургия, дерматология, гинекология, геронтология, трансплантология, травматология, стоматология.', 'Герпес, ВПЧ.'] },
    { slug: 'entomix', title: 'Энтомикс, гель', items: ['Биологическая утилизация органических отходов «Биозавод», эукариотическая система, синтезирующая фармакологически активные вещества.', 'Использование биомассы насекомых в качестве биологически активной кормовой добавки для животных.'] },
    { slug: 'calliphoridae', title: 'Культивирование', items: ['Технология выращивания биомассы личинок семейства Calliphoridae, поддержание культуры.'] },
    { slug: 'allostatins', title: 'Аллостатин, пептид', items: ['Лечение и профилактика заболеваний вирусной природы.', 'Лечение онкологических заболеваний.', 'В качестве адъюванта для усиления распознавания слабых антигенов при вакцинации.'] },
    { slug: 'flip7', title: 'FLIP7, комплекс антимикробных пептидов', items: ['Лечение заболеваний, вызванных бактериальной инфекцией.', 'Разрушение биологических биоплёнок.', 'Новый подход к решению проблемы антибиотикорезистентности.'] },
    { slug: 'inova-c', title: 'InOVA-C — иммунологически активный адъювант', items: ['Может применяться в составе вакцин.'] },
  ],
  en: [
    { slug: 'allomedin', title: 'Allomedin gel', items: ['Surgery, dermatology, gynaecology, geriatrics, transplantology, traumatology and dentistry.', 'Herpes, HPV.'] },
    { slug: 'entomix', title: 'Entomix gel', items: ['Biological processing of organic waste: the “Biofactory”, a eukaryotic system synthesising pharmacologically active substances.', 'Use of insect biomass as a biologically active feed supplement for animals.'] },
    { slug: 'calliphoridae', title: 'Cultivation', items: ['Technology for growing Calliphoridae larval biomass and maintaining the culture.'] },
    { slug: 'allostatins', title: 'Allostatin peptide', items: ['Treatment and prevention of viral diseases.', 'Treatment of oncological diseases.', 'Use as an adjuvant to enhance the recognition of weak antigens during vaccination.'] },
    { slug: 'flip7', title: 'FLIP7 antimicrobial peptide complex', items: ['Treatment of diseases caused by bacterial infections.', 'Disruption of biological biofilms.', 'A new approach to addressing antibiotic resistance.'] },
    { slug: 'inova-c', title: 'InOVA-C — immunologically active adjuvant', items: ['May be used in vaccines.'] },
  ],
};

function PlatformCard({ card, active, onActivate, language }) {
  return <a
    className={`platform-info-card platform-detail-card${active ? ' is-active' : ''}`}
    href={developmentPath(card.slug, language)}
    data-platform-card={card.slug}
    onFocus={() => onActivate(card.slug)}
    onBlur={(event) => {
      const next = event.relatedTarget?.closest?.('[data-platform-label], [data-platform-card]');
      if (next) onActivate(next.dataset.platformLabel || next.dataset.platformCard);
      else onActivate(null);
    }}
  >
    <h3>{card.title}</h3><ul>{card.items.map(item => <li key={item}>{item}</li>)}</ul>
  </a>;
}

const iconPaths = {
  insect: <><path d="M12 8.5c-2.7 0-4.5 2.1-4.5 5.2 0 2.4 1.8 4.3 4.5 4.3s4.5-1.9 4.5-4.3c0-3.1-1.8-5.2-4.5-5.2Z" /><path d="M9 9 6 6m9 3 3-3M7.5 12H4m16 0h-3.5M8.2 15H4.5m11.3 0h4.2M10 7c0-2-1.3-3-2.8-3M14 7c0-2 1.3-3 2.8-3M12 10v8m-2 2 2-2 2 2" /></>,
  medicine: <><path d="M7 3h10M8 3v5l-4.5 8a3 3 0 0 0 2.6 4.5h11.8a3 3 0 0 0 2.6-4.5L16 8V3" /><path d="M8 8h8m-9.5 6h11" /></>,
  institute: <><path d="M3 21h18M5 21V8l7-4 7 4v13M9 10h1m4 0h1m-6 4h1m4 0h1m-5 7v-4h3v4" /></>,
  book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z" /><path d="M4 17a2.5 2.5 0 0 1 2.5-2.5H20M8 7h8m-8 3h7" /></>,
  patent: <><path d="M5 4h14v17H5zM8 8h8m-8 4h8m-8 4h5" /><path d="m15 17 2 2 4-5" /></>,
  history: <><path d="M4 7v5h5M5 12a8 8 0 1 1 2 5.5M12 8v5l3 2" /></>,
  verified: <><path d="m12 3 2.3 1.2 2.6-.1 1.2 2.3 2.1 1.5-.7 2.5.7 2.6-2.1 1.5-1.2 2.3-2.6-.1L12 18l-2.3 1.2-2.6-.1-1.2-2.3-2.1-1.5.7-2.5-.7-2.6 2.1-1.5 1.2-2.3 2.6.1L12 3Z" /><path d="m8.5 11.5 2.2 2.2 4.8-5" /></>,
};

function AboutIcon({ name, className = '' }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[name]}</svg>;
}

function About({ language }) {
  const content = aboutCopy[language] || aboutCopy.ru;
  const platformRef = useRef(null);
  const markerId = useId().replace(/:/g, '');
  const [connections, setConnections] = useState([]);
  const [activePlatform, setActivePlatform] = useState(null);
  const cards = platformCards[language] || platformCards.ru;

  useEffect(() => {
    const grid = platformRef.current;
    let frame;
    let disposed = false;
    const measure = () => {
      if (disposed) return;
      if (window.innerWidth <= 1100) {
        setConnections(previous => previous.length ? [] : previous);
        return;
      }
      const box = grid.getBoundingClientRect();
      const next = cards.map((card, index) => {
        const label = grid.querySelector(`[data-platform-label="${card.slug}"]`).getBoundingClientRect();
        const target = grid.querySelector(`[data-platform-card="${card.slug}"]`).getBoundingClientRect();
        const left = index < 3;
        const x1 = (left ? label.left : label.right) - box.left;
        const y1 = label.top + label.height / 2 - box.top;
        const x2 = (left ? target.right : target.left) - box.left;
        const y2 = target.top + target.height / 2 - box.top;
        const direction = left ? -1 : 1;
        const elbow = Math.min(18, Math.abs(x2 - x1) / 4);
        const arrowOverlap = 7;
        const arrowTipX = x2 + direction * arrowOverlap;
        return { slug: card.slug, d: `M${x1},${y1} H${x1 + direction * elbow} L${x2 - direction * elbow},${y2} H${arrowTipX}` };
      });
      setConnections(previous => JSON.stringify(previous) === JSON.stringify(next) ? previous : next);
    };
    const schedule = () => {
      if (disposed) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(schedule) : null;
    [grid, ...grid.querySelectorAll('[data-platform-label], [data-platform-card]')].forEach(node => observer?.observe(node));
    window.addEventListener('resize', schedule);
    document.fonts?.ready.then(schedule);
    schedule();
    return () => {
      disposed = true;
      observer?.disconnect();
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, [cards]);

  const [activeJournal, setActiveJournal] = useState(0);
  const [journalCarouselPaused, setJournalCarouselPaused] = useState(false);

  useEffect(() => {
    if (journalCarouselPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(() => setActiveJournal((slide) => (slide + 1) % content.journalSlides.length), 5000);
    return () => window.clearInterval(timer);
  }, [content.journalSlides.length, journalCarouselPaused]);

  return (
    <main className="about-page">
      <section className="about-hero" aria-labelledby="about-title">
        <div className="about-hero-dots" aria-hidden="true" />
        <div className="about-container about-hero-content">
          <h1 id="about-title" tabIndex={-1}>{content.title}</h1>
          <span className="about-eyebrow"><i />{content.eyebrow}</span>
        </div>
      </section>

      <section className="about-pillars" aria-label={content.eyebrow}>
        <div className="about-container about-pillar-grid">
          {content.pillars.map((text, index) => (
            <article className="about-pillar" key={text}>
              <span className={`about-icon about-icon-${index + 1}`}><AboutIcon name={['insect', 'medicine', 'institute'][index]} /></span>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-platform" aria-labelledby="about-platform-title">
        <div className="about-container">
          <header className="about-section-heading">
            <span><AboutIcon name="insect" />{content.mapLabel}</span>
            <h2 id="about-platform-title">{content.mapTitle}</h2>
          </header>

          <div className="platform-dashboard">
            <div
              className="platform-main-grid"
              ref={platformRef}
              onPointerOver={(event) => {
                const item = event.target.closest?.('[data-platform-label], [data-platform-card]');
                if (item && event.currentTarget.contains(item)) setActivePlatform(item.dataset.platformLabel || item.dataset.platformCard);
              }}
              onPointerLeave={() => setActivePlatform(null)}
            >
              <svg className="platform-connections" aria-hidden="true" focusable="false">
                <defs>
                  <marker id={markerId} viewBox="0 0 8 8" refX="8" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 8 4 0 8Z" fill="#7ea9b5" /></marker>
                  <marker id={`${markerId}-active`} viewBox="0 0 8 8" refX="8" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 8 4 0 8Z" fill="#ce1248" /></marker>
                </defs>
                {connections.map(line => <path className={activePlatform === line.slug ? 'is-active' : ''} key={line.slug} data-connection={line.slug} d={line.d} markerEnd={`url(#${activePlatform === line.slug ? `${markerId}-active` : markerId})`} />)}
              </svg>
              <div className="platform-left">{cards.slice(0, 3).map(card => <PlatformCard card={card} active={activePlatform === card.slug} onActivate={setActivePlatform} language={language} key={card.slug} />)}</div>

              <div className="platform-core-column">
                <div className="platform-fly-caption"><strong>{content.coreTitle}</strong><span>{content.coreText}</span></div>
                <div className="platform-fly">
                  <svg className="platform-fly-drawing" viewBox="0 0 480 550" fill="none" aria-hidden="true" focusable="false">
                    <g className="fly-legs" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M199 192 139 145 102 64 75 40 M281 192 341 145 378 64 405 40" />
                      <path d="M187 244 123 258 66 209 29 195 M293 244 357 258 414 209 451 195" />
                      <path d="M198 314 142 383 119 477 83 510 M282 314 338 383 361 477 397 510" />
                    </g>
                    <path className="fly-abdomen" d="M184 259C165 309 173 423 205 465Q240 505 275 465C307 423 315 309 296 259Z" />
                    <g className="fly-abdomen-lines">
                      <path d="M180 327Q240 348 300 327 M181 368Q240 389 299 368 M187 410Q240 432 293 410 M202 448Q240 463 278 448" />
                    </g>
                    <g className="fly-wings">
                      <path d="M211 208C169 219 84 343 42 458C17 530 71 528 124 480C194 418 216 297 225 226Z" />
                      <path d="M269 208C311 219 396 343 438 458C463 530 409 528 356 480C286 418 264 297 255 226Z" />
                    </g>
                    <g className="fly-wing-veins">
                      <path d="M209 235 66 486 137 437 171 342 209 235 M171 342 108 371 137 437 M108 371 75 430 66 486 M271 235 414 486 343 437 309 342 271 235 M309 342 372 371 343 437 M372 371 405 430 414 486" />
                    </g>
                    <path className="fly-thorax" d="M240 115C181 115 164 175 179 240L193 282Q240 305 287 282L301 240C316 175 299 115 240 115Z" />
                    <path className="fly-thorax-line" d="M223 137Q203 204 219 272 M257 137Q277 204 261 272" />
                    <path className="fly-head" d="M193 119C168 104 174 69 196 58Q240 36 284 58C306 69 312 104 287 119Q240 141 193 119Z" />
                    <path className="fly-eyes" d="M211 61C183 58 174 87 187 105Q199 118 214 110Z M269 61C297 58 306 87 293 105Q281 118 266 110Z" />
                    <path className="fly-antennae" d="M230 56 222 30 211 24 M250 56 258 30 269 24" />
                    <g className="fly-dividers"><path d="M240 141V487 M139 267H341 M88 382H392" /></g>
                  </svg>
                  <div className="platform-fly-labels">
                    {[
                      ['allomedin', content.nodes[0]], ['allostatins', content.nodes[3]],
                      ['entomix', content.nodes[2]], ['flip7', content.nodes[4]],
                      ['calliphoridae', content.cultivationLabel], ['inova-c', content.nodes[1]],
                    ].map(([slug, label], index) => <a className={`platform-fly-label platform-fly-label-${index + 1}${activePlatform === slug ? ' is-active' : ''}`} href={developmentPath(slug, language)} data-platform-label={slug} onFocus={() => setActivePlatform(slug)} onBlur={(event) => {
                      const next = event.relatedTarget?.closest?.('[data-platform-label], [data-platform-card]');
                      if (next) setActivePlatform(next.dataset.platformLabel || next.dataset.platformCard);
                      else setActivePlatform(null);
                    }} key={slug}><i aria-hidden="true" />{label}<InterfaceIcon name="arrow-up-right" /></a>)}
                  </div>
                </div>
              </div>

              <div className="platform-right">{cards.slice(3).map(card => <PlatformCard card={card} active={activePlatform === card.slug} onActivate={setActivePlatform} language={language} key={card.slug} />)}</div>
            </div>

            <div className="platform-formulas"><h3>{content.formulasTitle}</h3><div>{content.formulas.map(([label, name, description]) => <article key={name}><span>{label}</span><strong>{name}</strong><small>{description}</small></article>)}</div></div>
          </div>
        </div>
      </section>

      <section className="about-research" aria-labelledby="about-research-title">
        <div className="about-container">
          <header className="about-research-heading"><span>{content.eyebrow}</span><h2 id="about-research-title">{content.researchTitle}</h2></header>
          <div className="about-research-list">
            <article className="about-research-card about-publications">
              <AboutIcon name="book" className="about-research-icon" />
              <div><h3>{content.researchHeading}</h3><p>{content.researchText}</p><strong>{content.journals}</strong></div>
              <div className="about-journal-carousel" aria-label={content.journalCarouselLabel} onMouseEnter={() => setJournalCarouselPaused(true)} onMouseLeave={() => setJournalCarouselPaused(false)} onFocus={() => setJournalCarouselPaused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setJournalCarouselPaused(false); }}>
                <div className="about-journal-slide" role="group" aria-roledescription={language === 'ru' ? 'слайд' : 'slide'} aria-label={`${activeJournal + 1} / ${content.journalSlides.length}`} key={activeJournal}>
                  <img src={[pnasLogo, plosOneLogo, jbcLogo][activeJournal]} alt={content.journalSlides[activeJournal]} />
                </div>
                <div className="about-journal-indicators" aria-label={content.journalCarouselLabel}>
                  {content.journalSlides.map((name, index) => <button className={index === activeJournal ? 'is-active' : ''} type="button" key={name} onClick={() => setActiveJournal(index)} aria-label={`${name} (${index + 1} / ${content.journalSlides.length})`} aria-current={index === activeJournal ? 'true' : undefined} />)}
                </div>
              </div>
            </article>
            <article className="about-research-card">
              <AboutIcon name="patent" className="about-research-icon" />
              <div><h3>{content.patentsHeading}</h3><p>{content.patentsText}</p><strong>{content.patentsDetail}</strong></div>
            </article>
            <article className="about-research-card">
              <AboutIcon name="history" className="about-research-icon" />
              <div><h3>{content.historyHeading}</h3><p>{content.historyText}</p><blockquote><AboutIcon name="verified" />{content.historyFact}</blockquote></div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
