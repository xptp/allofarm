import { useEffect, useRef, useState } from 'react';
import patentsImage from '../assets/patents.jpg';
import researchLabImage from '../assets/research-lab.jpg';
import publicationsImage from '../assets/publications.jpg';
import allostatinCoverImage from '../assets/development-allostatin-cover.jpg';
import flipImage from '../assets/development-flip.jpg';
import cultivationImage from '../assets/development-cultivation.jpg';
import inovaImage from '../assets/development-calliphoridae.jpg';
import allomedinProImage from '../assets/development-site-image-1.png';
import entomixPackageImage from '../assets/development-entomix-package.jpg';
import expertPressLogo from '../assets/press-expert-logo.png';
import expertPressPdf from '../assets/press-expert.pdf';
import spbuPressPdf from '../assets/press-spu.pdf';
import '../styles/Home.css';
import '../styles/SectionThemes.css';
import { developmentPath } from './developments/navigation';

const directionsCopy = {
  ru: {
    label: 'Научно-прикладная платформа',
    title: 'Основные направления работы компании Аллофарм',
    introduction: 'Компания «Аллофарм» занимается поиском, разработкой и коммерциализацией новых лекарственных веществ, прототипами которых служат активные компоненты иммунной системы насекомых с противовирусным, противоопухолевым и антибактериальным действием. Некоторые из разработанных компанией препаратов, получаемых путем полного химического синтеза или биосинтеза культурами насекомых, уже нашли применение в медицине и дерматокосметологии.',
    cards: [
      { type: 'feature', icon: 'immune', title: 'Изучение иммунной системы насекомых как основа научных открытий', text: 'В результате многолетних исследований расшифрован состав антимикробного комплекса личинок и разработана технология его получения.' },
      { type: 'feature', icon: 'medicine', title: 'Создание технологий для внедрения полученных знаний в современную медицину', text: 'Поиск, разработка и коммерциализация новых лекарственных веществ на основе активных компонентов иммунной системы насекомых.' },
      { type: 'feature', icon: 'institutes', title: 'Сотрудничество с российскими и зарубежными институтами', text: 'Совместная работа над новыми способами лечения и профилактики, а также развитие взаимовыгодного партнёрства.' },
      { type: 'detail', icon: 'patents', title: 'Интеллектуальная собственность', text: 'Разработки компании защищены патентами в России и за рубежом.', footer: 'Международная патентная защита' },
      { type: 'detail', icon: 'research', title: 'Исследовательская база', text: 'Исследования, лежащие в основе внедряемых разработок, компания ведёт уже более 20 лет.', footer: 'Фундаментальные исследования' },
      { type: 'detail', icon: 'publications', title: 'Наши публикации', text: 'Научные результаты проходят экспертную оценку и публикуются в рецензируемых научных журналах.', footer: 'Научные публикации' },
    ],
  },
  en: {
    label: 'Research and development platform',
    title: 'The main areas of Allopharm’s work',
    introduction: 'Allopharm searches for, develops and commercialises new medicinal substances based on active components of the insect immune system with antiviral, antitumour and antibacterial activity. Some of the company’s preparations, produced through chemical synthesis or biosynthesis using insect cultures, are already used in medicine and dermocosmetics.',
    cards: [
      { type: 'feature', icon: 'immune', title: 'Studying the insect immune system as a basis for scientific discovery', text: 'Years of research have revealed the composition of the antimicrobial complex of larvae and enabled the development of a method to obtain it.' },
      { type: 'feature', icon: 'medicine', title: 'Turning research into technologies for modern medicine', text: 'Searching for, developing and commercialising medicinal substances based on active components of the insect immune system.' },
      { type: 'feature', icon: 'institutes', title: 'Cooperation with Russian and international research institutes', text: 'Joint work on new approaches to treatment and prevention, alongside the development of mutually beneficial partnerships.' },
      { type: 'detail', icon: 'patents', title: 'Intellectual property', text: 'The company’s developments are protected by patents in Russia and internationally.', footer: 'International patent protection' },
      { type: 'detail', icon: 'research', title: 'Research base', text: 'The research behind the company’s developments has been ongoing for more than 20 years.', footer: 'Fundamental research' },
      { type: 'detail', icon: 'publications', title: 'Our publications', text: 'Scientific results undergo expert review and are published in peer-reviewed journals.', footer: 'Scientific publications' },
    ],
  },
};

const developmentsCopy = {
  ru: {
    title: 'Научные разработки',
    introduction: 'В основу наиболее перспективных разработок компании «Аллофарм» легли фундаментальные исследования, выполненные её научными сотрудниками в области биофармакологии и иммунологии насекомых.',
    cards: [
      { tone: 'cyan', image: allostatinCoverImage, imageAlt: 'Молекулярная модель на обложке разработки Аллостатин', tag: 'Синтетический пептид', status: 'Доклинический этап', title: 'АЛЛОСТАТИН®', subtitle: 'Лиофилизированный пептид', text: 'Селективно активирует цитотоксические клетки иммунной системы человека. Применяется в составе препаратов с противовирусной и противоопухолевой активностью и средств по уходу за кожей.', footer: 'Патент РФ № 2267496' },
      { tone: 'rose', image: flipImage, imageAlt: 'Модель пептида FLIP®7', tag: 'Комплекс пептидов', status: 'Активность in vitro', title: 'FLIP®7', subtitle: 'Комплекс антимикробных пептидов насекомого', text: 'Обладает широким спектром антибактериальной активности in vitro, разрушает бактериальные биоплёнки и усиливает действие синтетических антибиотиков против них.', footer: 'Патент РФ № 2447896' },
      { tone: 'blue', image: inovaImage, imageAlt: 'Флаконы и шприц на иллюстрации к разработке InOVA-C', tag: 'Суперантиген насекомых', status: 'Адъювант вакцин', title: 'InOVA-C', subtitle: 'Иммунологически активный адъювант', text: 'Обеспечивает выработку защитных антител к слабым и неиммуногенным антигенам. Применяется в составе вакцин в качестве адъюванта.', footer: 'Метод получения и применения — ноу-хау' },
      { tone: 'amber', image: cultivationImage, imageAlt: 'Лаборатория для культивирования биомассы', tag: 'Технология выращивания', status: 'Calliphoridae', title: 'Культивирование насекомых', subtitle: 'Выращивание биомассы личинок Calliphoridae', text: 'Культивирование проводят на микробиологически чистых органических субстратах. Биомасса может применяться как кормовая добавка для животных или для переработки органических отходов.', footer: 'Технология выращивания биомассы' },
      { tone: 'green', image: allomedinProImage, imageAlt: 'Упаковка и тюбик Алломедин Про', imageFit: 'contain', tag: 'Гидрогель с аллостатином', status: 'Средство для ухода за кожей', title: 'АЛЛОМЕДИН® ПРО', subtitle: 'Прозрачный гидрогель для местного применения', text: 'Восстанавливает и защищает кожу после косметических процедур, при атопии, высыпаниях, сухости, чувствительности и раздражении. Используется для ухода за кожей после воздействия повреждающих факторов.', footer: 'Декларация ЕАЭС № RU Д-RU.PA11.B.15055/25' },
      { tone: 'rose', image: entomixPackageImage, imageAlt: 'Упаковка гидрогелевого покрытия Энтомикс', imageFit: 'contain', tag: 'Гидрогелевое покрытие', status: 'С комплексом FLIP®7', title: 'ЭНТОМИКС®', subtitle: 'Покрытие для подавления бактериальных биоплёнок', text: 'Содержит комплекс антимикробных пептидов FLIP®7. Применяется при заболеваниях кожи и мягких тканей, осложнённых бактериальной инфекцией.', footer: 'Регистрационное удостоверение № РЗН 2020/12582' },
    ],
  },
  en: {
    title: 'Scientific developments',
    introduction: 'The company’s most promising developments are based on fundamental research by its scientists in insect biopharmacology and immunology.',
    cards: [
      { tone: 'cyan', image: allostatinCoverImage, imageAlt: 'Molecular model on the Allostatin development cover', tag: 'Synthetic peptide', status: 'Preclinical studies', title: 'ALLOSTATIN®', subtitle: 'Lyophilised peptide', text: 'Selectively activates cytotoxic cells of the human immune system. It is used in preparations with antiviral and antitumour activity and in skin care products.', footer: 'Russian patent No. 2267496' },
      { tone: 'rose', image: flipImage, imageAlt: 'Model of the FLIP®7 peptide', tag: 'Peptide complex', status: 'Activity in vitro', title: 'FLIP®7', subtitle: 'Antimicrobial peptide complex from insects', text: 'Has a broad spectrum of antibacterial activity in vitro, disrupts bacterial biofilms and enhances the activity of synthetic antibiotics against them.', footer: 'Russian patent No. 2447896' },
      { tone: 'blue', image: inovaImage, imageAlt: 'Vials and syringe in an illustration for InOVA-C', tag: 'Insect superantigen', status: 'Vaccine adjuvant', title: 'InOVA-C', subtitle: 'Immunologically active adjuvant', text: 'Promotes the production of protective antibodies to weak and non-immunogenic antigens. It is used as an adjuvant in vaccines.', footer: 'Production and use method: know-how' },
      { tone: 'amber', image: cultivationImage, imageAlt: 'Laboratory for biomass cultivation', tag: 'Cultivation technology', status: 'Calliphoridae', title: 'Insect cultivation', subtitle: 'Cultivation of Calliphoridae larval biomass', text: 'Cultivation uses microbiologically clean organic substrates. The biomass may be used as an active animal feed supplement or in the processing of organic waste.', footer: 'Larval biomass cultivation technology' },
      { tone: 'green', image: allomedinProImage, imageAlt: 'Allomedin Pro box and tube', imageFit: 'contain', tag: 'Hydrogel with allostatin', status: 'Skin care product', title: 'ALLOMEDIN® PRO', subtitle: 'Clear topical hydrogel', text: 'Restores and protects skin after cosmetic procedures and in cases of atopy, rashes, dryness, sensitivity and irritation. It is used for skin care after exposure to damaging factors.', footer: 'EAEU declaration No. RU D-RU.PA11.B.15055/25' },
      { tone: 'rose', image: entomixPackageImage, imageAlt: 'Entomix hydrogel dressing package', imageFit: 'contain', tag: 'Hydrogel dressing', status: 'With FLIP®7 complex', title: 'ENTOMIX®', subtitle: 'Dressing to inhibit bacterial biofilms', text: 'Contains the antimicrobial peptide complex FLIP®7. It is used for skin and soft-tissue conditions complicated by bacterial infection.', footer: 'Registration certificate No. RZN 2020/12582' },
    ],
  },
};

const mediaCopy = {
  ru: {
    kicker: 'Публикации и материалы',
    title: 'СМИ о нас',
    introduction: 'Публикации о научных исследованиях, разработках и работе компании.',
    cards: [
      { variant: 'spbu', brand: 'САНКТ-ПЕТЕРБУРГСКИЙ УНИВЕРСИТЕТ', title: '«Как лечить то, что не лечится?»', text: 'Журнал «Санкт-Петербургский университет»', href: spbuPressPdf },
      { variant: 'gmp', brand: 'Новости GMP', title: 'Зарегистрировано медизделие для борьбы с бактериальными биоплёнками', text: 'Фармацевтические новости', href: 'https://primfarma.ru/news/1/article/1435' },
      { variant: 'naked', brand: 'NAKED SCIENCE', title: '«Апокалипсис отменяется: нас спасут насекомые»', text: 'Научно-популярный портал Naked Science', href: 'https://naked-science.ru/article/biology/apokalipsis-otmenyaetsya-nas-spasut' },
      { variant: 'forbes', brand: 'Forbes', title: '«Борьба за выживание. Погибнет ли человечество из-за устойчивости к антибиотикам»', text: 'Forbes.ru', href: 'https://www.forbes.ru/tehnologii/352993-borba-za-vyzhivanie-pogibnet-li-chelovechestvo-iz-za-ustoychivosti-k-antibiotikam' },
      { variant: 'expert', brand: 'ЭКСПЕРТ ONLINE', brandImage: expertPressLogo, title: '«Убийцы вирусов»', text: 'Журнал «Эксперт»', href: expertPressPdf },
      { variant: 'itogi', brand: 'Итоги', title: '«Эффект мухи»', text: 'Журнал «Итоги»' },
      { variant: 'spbu-news', brand: 'САНКТ-ПЕТЕРБУРГСКИЙ УНИВЕРСИТЕТ', title: 'Учёные СПбГУ открыли новые антивирусные вещества', text: 'Новости СПбГУ' },
    ],
    video: { variant: 'video', brand: 'YOUTUBE', category: 'Видео о компании', title: 'Аллофарм — научные видео', text: 'Видеоматериалы о компании и её исследованиях.', action: 'Смотреть видео', href: 'https://www.youtube.com/watch?v=jw6Vld-N02Y' },
  },
  en: {
    kicker: 'Articles and media',
    title: 'Media coverage',
    introduction: 'Publications about the company’s research, developments and work.',
    cards: [
      { variant: 'spbu', brand: 'ST PETERSBURG UNIVERSITY', title: '“How do you treat what cannot be treated?”', text: 'St Petersburg University magazine', href: spbuPressPdf },
      { variant: 'gmp', brand: 'GMP NEWS', title: 'A medical device for fighting bacterial biofilms is registered', text: 'Pharmaceutical news', href: 'https://primfarma.ru/news/1/article/1435' },
      { variant: 'naked', brand: 'NAKED SCIENCE', title: '“The apocalypse is cancelled: insects will save us”', text: 'Naked Science popular science portal', href: 'https://naked-science.ru/article/biology/apokalipsis-otmenyaetsya-nas-spasut' },
      { variant: 'forbes', brand: 'Forbes', title: '“The fight for survival: will antibiotic resistance destroy humanity?”', text: 'Forbes.ru', href: 'https://www.forbes.ru/tehnologii/352993-borba-za-vyzhivanie-pogibnet-li-chelovechestvo-iz-za-ustoychivosti-k-antibiotikam' },
      { variant: 'expert', brand: 'EXPERT ONLINE', brandImage: expertPressLogo, title: '“Virus killers”', text: 'Expert magazine', href: expertPressPdf },
      { variant: 'itogi', brand: 'ITOGI', title: '“The fly effect”', text: 'Itogi magazine' },
      { variant: 'spbu-news', brand: 'ST PETERSBURG UNIVERSITY', title: 'SPbU scientists discover new antiviral substances', text: 'SPbU news' },
    ],
    video: { variant: 'video', brand: 'YOUTUBE', category: 'Company videos', title: 'Allopharm — research videos', text: 'Videos about the company and its research.', action: 'Watch video', href: 'https://www.youtube.com/watch?v=jw6Vld-N02Y' },
  },
};

function Home({ language, t, links }) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isMediaDragging, setIsMediaDragging] = useState(false);
  const mediaRangeRef = useRef(null);
  const mediaVisibleRef = useRef(false);
  const mediaHoveredRef = useRef(false);
  const mediaScrollerRef = useRef(null);
  const mediaDragRef = useRef({ pointerId: null, startX: 0, startScroll: 0, moved: false });
  const mediaSliderActiveRef = useRef(false);
  const mediaAutoPauseUntilRef = useRef(0);
  const slideCount = t.slides.length;
  const directions = directionsCopy[language];
  const developments = developmentsCopy[language];
  const media = mediaCopy[language];
  const mediaVideo = media.video;
  const mediaVideos = language === 'ru'
    ? [
      { id: 'jw6Vld-N02Y', title: 'Аллофарм — Discovery Channel', channel: 'Mikhail Feigelman' },
      { id: 'Z65FWmUvAfo', title: 'Аллофарм — 5 канал', channel: 'Mikhail Feigelman' },
    ]
    : [
      { id: 'jw6Vld-N02Y', title: 'Allopharm — Discovery Channel', channel: 'Mikhail Feigelman' },
      { id: 'Z65FWmUvAfo', title: 'Allopharm — Channel 5', channel: 'Mikhail Feigelman' },
    ];
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setTimeout(() => setCurrentSlide((slide) => (slide + 1) % slideCount), 7000);
    return () => window.clearTimeout(timer);
  }, [currentSlide, slideCount]);

  useEffect(() => {
    const scroller = mediaScrollerRef.current;
    if (!scroller) return undefined;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const observer = new IntersectionObserver(([entry]) => {
      mediaVisibleRef.current = entry.isIntersecting;
    });
    observer.observe(scroller);
    const halfWidth = () => scroller.scrollWidth / 2;
    const timer = window.setInterval(() => {
      if (!document.hidden && mediaVisibleRef.current && !mediaHoveredRef.current && !motionPreference.matches
        && !scroller.contains(document.activeElement) && document.activeElement !== mediaRangeRef.current
        && mediaDragRef.current.pointerId === null && !mediaSliderActiveRef.current && Date.now() >= mediaAutoPauseUntilRef.current) {
        const midpoint = halfWidth();
        if (midpoint > 0) {
          let nextPosition = scroller.scrollLeft + 1;
          if (nextPosition >= midpoint) nextPosition -= midpoint;
          scroller.scrollLeft = nextPosition;
        }
      }
    }, 32);
    return () => {
      window.clearInterval(timer);
      observer.disconnect();
    };
  }, [language]);

  useEffect(() => {
    const scroller = mediaScrollerRef.current;
    if (!scroller) return undefined;
    const handleWheel = (event) => {
      // Leave browser zoom gestures intact. A non-passive listener allows
      // the carousel to consume the wheel without also scrolling the page.
      if (event.ctrlKey) return;
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      const midpoint = scroller.scrollWidth / 2;
      if (!delta || !midpoint) return;
      event.preventDefault();
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? scroller.clientWidth : 1;
      scroller.scrollLeft = ((scroller.scrollLeft + delta * unit) % midpoint + midpoint) % midpoint;
      mediaAutoPauseUntilRef.current = Date.now() + 700;
    };
    scroller.addEventListener('wheel', handleWheel, { passive: false });
    return () => scroller.removeEventListener('wheel', handleWheel);
  }, []);

  const updateMediaProgress = () => {
    const scroller = mediaScrollerRef.current;
    const midpoint = scroller ? scroller.scrollWidth / 2 : 0;
    if (midpoint > 0 && mediaRangeRef.current) {
      mediaRangeRef.current.value = Math.round((scroller.scrollLeft / midpoint) * 1000);
    }
  };

  const handleMediaPointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    const scroller = mediaScrollerRef.current;
    if (!scroller) return;
    mediaDragRef.current = { pointerId: event.pointerId, startX: event.clientX, startScroll: scroller.scrollLeft, moved: false };
    setIsMediaDragging(true);
  };

  const handleMediaPointerMove = (event) => {
    const drag = mediaDragRef.current;
    if (drag.pointerId !== event.pointerId) return;
    const delta = event.clientX - drag.startX;
    const scroller = mediaScrollerRef.current;
    if (!scroller) return;
    if (Math.abs(delta) > 5 && !drag.moved) {
      drag.moved = true;
      scroller.setPointerCapture(event.pointerId);
    }
    if (!drag.moved) return;
    const midpoint = scroller.scrollWidth / 2;
    if (midpoint > 0) scroller.scrollLeft = ((drag.startScroll - delta) % midpoint + midpoint) % midpoint;
  };

  const handleMediaPointerUp = (event) => {
    if (mediaDragRef.current.pointerId !== event.pointerId) return;
    mediaDragRef.current.pointerId = null;
    const scroller = mediaScrollerRef.current;
    if (scroller?.hasPointerCapture(event.pointerId)) scroller.releasePointerCapture(event.pointerId);
    mediaAutoPauseUntilRef.current = Date.now() + 700;
    setIsMediaDragging(false);
  };

  const selectSlide = (index) => setCurrentSlide((index + slideCount) % slideCount);

  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orb" aria-hidden="true" />
        <div className="hero-container">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-mark" /> {t.eyebrow}</div>
            <h1 id="hero-title" tabIndex={-1}>{t.title}</h1>
            <p className="hero-description" key={`${language}-${currentSlide}`}>{t.slides[currentSlide]}</p>
            <div className="hero-metrics">
              {t.metrics.map(([value, label]) => <article className="metric-card" key={value} tabIndex={0} aria-label={`${value}: ${label}`}><strong>{value}</strong><span>{label}</span></article>)}
            </div>
            <div className="hero-actions">
              <a className="button button-primary" href={links[1]}>{t.primary}<span aria-hidden="true">↗</span></a>
              <a className="button button-secondary" href={links[2]}>{t.secondary}<span aria-hidden="true">→</span></a>
            </div>
            <div className="hero-footnote"><span className="footnote-rule" /> {t.location}</div>
          </div>
          <div className="hero-visual">
            <div className="visual-stage">
              <div className="artwork-card">
                <div className="artwork-meta"><span>ALLOPHARM&nbsp; / &nbsp;BIOLOGY</span><span>01 — 04</span></div>
                <svg className="molecule-art" viewBox="0 0 560 410" fill="none" role="img" aria-label={t.imageAlt}>
                  <defs>
                    <radialGradient id="core" cx="0" cy="0" r="1" gradientTransform="matrix(0 140 -140 0 280 188)" gradientUnits="userSpaceOnUse"><stop stopColor="#08BFE4" stopOpacity=".19" /><stop offset="1" stopColor="#08BFE4" stopOpacity="0" /></radialGradient>
                    <linearGradient id="wing" x1="35" y1="70" x2="280" y2="210" gradientUnits="userSpaceOnUse"><stop stopColor="#00D9F4" stopOpacity=".34" /><stop offset="1" stopColor="#007DA5" stopOpacity=".12" /></linearGradient>
                    <filter id="glow"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                  </defs>
                  <circle cx="280" cy="190" r="150" fill="url(#core)" />
                  <g stroke="#167C9E" strokeOpacity=".22" strokeDasharray="2 6"><circle cx="280" cy="190" r="95" /><circle cx="280" cy="190" r="150" /><path d="M28 190h504M280 28v350" /></g>
                  <g stroke="#13C8E8" strokeWidth="1.3" fill="url(#wing)">
                    <path d="M270 119C219 96 111 48 54 70 14 86 40 124 87 140c56 19 128 3 183-12Z" /><path d="M290 119c51-23 159-71 216-49 40 16 14 54-33 70-56 19-128 3-183-12Z" />
                    <path d="M270 133c-62 7-154 26-185 60-24 26 15 48 59 43 48-5 94-45 126-87Z" /><path d="M290 133c62 7 154 26 185 60 24 26-15 48-59 43-48-5-94-45-126-87Z" />
                  </g>
                  <g stroke="#20B7D3" strokeOpacity=".72" strokeWidth=".8"><path d="M35 78 270 119M53 101l216 18M78 132l192-13M90 72l67 72m-25-83 55 91m-16-88 45 91M525 78l-235 41m217-18-216 18m191 13-192-13m180-47-67 72m25-83-55 91m16-88-45 91" /><path d="m88 188 182-55m-157 92 157-92m-124 99 124-99m202 55-182-55m157 92-157-92m124 99-124-99" /></g>
                  <g stroke="#20B7D3" strokeOpacity=".65" strokeWidth=".7"><path d="M270 119 87 70m183 49L54 70m236 49 183-49m-183 49 233-49M270 133 85 193m185-60-126 99m126-99 185 60m-185-60 126 99" /></g>
                  <g filter="url(#glow)" stroke="#13D8F2" strokeWidth="1.6" strokeLinecap="round">
                    <path d="M271 91 248 42m41 49 23-49" /><circle cx="248" cy="41" r="2.3" fill="#13D8F2" /><circle cx="312" cy="41" r="2.3" fill="#13D8F2" />
                    <ellipse cx="267" cy="94" rx="7" ry="11" fill="#062237" /><ellipse cx="293" cy="94" rx="7" ry="11" fill="#062237" /><circle cx="267" cy="94" r="3" fill="#17D8F2" /><circle cx="293" cy="94" r="3" fill="#17D8F2" />
                    <path d="M267 106Q280 101 293 106L289 128Q280 134 271 128Z" fill="#082238" /><path d="M271 132 268 150 292 150 289 132Z" fill="#082238" />
                    <path d="M269 152 270 173 290 173 291 152Z" fill="#082238" /><path d="M270 175 271 197 289 197 290 175Z" fill="#082238" /><path d="M271 199 272 220 288 220 289 199Z" fill="#082238" /><path d="M272 222 273 244 287 244 288 222Z" fill="#082238" /><path d="M273 246 274 269 286 269 287 246Z" fill="#082238" /><path d="M274 271 276 297 284 297 286 271Z" fill="#082238" /><path d="m276 299 4 22 4-22Z" fill="#082238" />
                    <path d="M271 132h18M270 152h20M271 175h18M272 199h16M273 222h14M274 246h12M276 271h8" />
                  </g>
                  <g fill="#A9F7FC" filter="url(#glow)"><circle cx="280" cy="116" r="2.2" /><circle cx="280" cy="162" r="1.7" /><circle cx="280" cy="187" r="1.7" /><circle cx="280" cy="211" r="1.7" /><circle cx="280" cy="235" r="1.7" /><circle cx="280" cy="260" r="1.7" /></g>
                  <circle cx="280" cy="321" r="3.2" fill="#ED5575" filter="url(#glow)" />
                  <g stroke="#1D718B" strokeOpacity=".72" strokeWidth=".8"><path d="M89 43h47l25 24M471 43h-48l-25 24M316 331l34 42" /></g>
                  <g fill="#61CDE0" fontFamily="monospace" fontSize="10" letterSpacing=".8"><text x="26" y="39">BIO-SCAN / 01</text><text x="395" y="39">INSECT IMMUNITY</text></g>
                </svg>
                <div className="artwork-caption"><span className="caption-dot" /><span>{language === 'ru' ? 'Биомиметика Calliphoridae' : 'Calliphoridae biomimetics'}</span><span className="artwork-caption-secondary">{language === 'ru' ? 'Иммунитет насекомых' : 'Insect immunity'}</span></div>
              </div>
              <div className="slider-controls">
                <div className="slider-dots" role="group" aria-label={language === 'ru' ? 'Выбрать слайд' : 'Choose a slide'}>
                  {Array.from({ length: slideCount }, (_, index) => <button key={index} type="button" className={currentSlide === index ? 'slider-dot active' : 'slider-dot'} aria-label={`${language === 'ru' ? 'Слайд' : 'Slide'} ${index + 1}`} aria-pressed={currentSlide === index} onClick={() => selectSlide(index)} />)}
                </div>
                <div className="slider-arrows">
                  <button type="button" className="slider-arrow" aria-label={language === 'ru' ? 'Предыдущий слайд' : 'Previous slide'} onClick={() => selectSlide(currentSlide - 1)}><span aria-hidden="true">‹</span></button>
                  <button type="button" className="slider-arrow" aria-label={language === 'ru' ? 'Следующий слайд' : 'Next slide'} onClick={() => selectSlide(currentSlide + 1)}><span aria-hidden="true">›</span></button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-index" aria-hidden="true"><span>01</span><i /> 04</div>
      </section>
      <section className="directions-section" aria-labelledby="directions-title">
        <div className="directions-container">
          <header className="directions-intro">
            <p className="directions-kicker">{directions.label}</p>
            <h2 id="directions-title">{directions.title}</h2>
            <span className="directions-rule" aria-hidden="true" />
            <p className="directions-description">{directions.introduction}</p>
          </header>
          <div className="directions-grid">
            {directions.cards.map((card) => (
              <article className={`direction-card direction-card-${card.type}`} key={card.icon} tabIndex={0}>
                {card.type === 'feature' ? (
                  <>
                    <div className={`direction-icon direction-icon-${card.icon}`} aria-hidden="true">
                      <svg viewBox="0 0 32 32" fill="none">
                        {card.icon === 'immune' && <><path d="M16 4v5m-6 2 3 3m9-3-3 3M8 17h5m6 0h5m-8-3v7m-5 2h10" /><circle cx="16" cy="12" r="3" /><circle cx="10" cy="24" r="2" /><circle cx="22" cy="24" r="2" /><path d="M12 22h8" /></>}
                        {card.icon === 'medicine' && <><path d="M16 27 5.5 16.8C-.1 10.9 8.4 3.4 14 9l2 2 2-2c5.6-5.6 14.1 1.9 8.5 7.8L16 27Z" /><path d="M16 12v9m-4.5-4.5h9" /></>}
                        {card.icon === 'institutes' && <><rect x="5" y="5" width="22" height="23" rx="2" /><path d="M12 28v-7h8v7M11 11h2m6 0h2m-10 5h2m6 0h2" /></>}
                      </svg>
                    </div>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </>
                ) : (
                  <>
                    <div className={`direction-visual direction-visual-${card.icon}`} aria-hidden="true">
                      <img
                        className="direction-image"
                        src={card.icon === 'patents' ? patentsImage : card.icon === 'research' ? researchLabImage : publicationsImage}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="direction-card-content">
                      <h3>{card.title}</h3>
                      <p>{card.text}</p>
                      <div className="direction-card-footer">{card.footer}</div>
                    </div>
                  </>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="developments-section" aria-labelledby="developments-title">
        <div className="developments-container">
          <header className="developments-intro">
            <span className="developments-icon" aria-hidden="true">
              <svg viewBox="0 0 32 32" fill="none"><path d="M12 5h8m-2 0v8l7 10a2 2 0 0 1-1.7 3H8.7A2 2 0 0 1 7 23l7-10V5m-4 13h12" /></svg>
            </span>
            <h2 id="developments-title">{developments.title}</h2>
            <span className="developments-rule" aria-hidden="true" />
            <p className="developments-description">{developments.introduction}</p>
          </header>
          <div className="developments-grid">
            {developments.cards.map((card, index) => (
              <article id={`development-${['allostatin', 'flip7', 'inova', 'cultivation', 'allomedin', 'entomix'][index]}`} className={`development-card development-card-${card.tone}`} key={card.title}>
                <a className="development-card-link" href={developmentPath(['allostatins', 'flip7', 'inova-c', 'calliphoridae', 'allomedin', 'entomix'][index], language)}>
                {card.image && <div className={`development-visual${card.imageFit === 'contain' ? ' development-visual-contain' : ''}`}><img src={card.image} alt={card.imageAlt} loading="lazy" /></div>}
                <div className="development-copy">
                  <div className="development-labels">
                    <span className="development-tag">{card.tag}</span>
                    <span className="development-status">{card.status}</span>
                  </div>
                  <h3>{card.title}</h3>
                  <h4>{card.subtitle}</h4>
                  <p>{card.text}</p>
                  <footer>{card.footer}</footer>
                </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="media-section" aria-labelledby="media-title">
        <div className="media-container">
          <header className="media-intro">
            <div>
              <span className="media-kicker">{media.kicker}</span>
              <h2 id="media-title">{media.title}</h2>
            </div>
            <p>{media.introduction}</p>
          </header>
          <div
            className={`media-carousel${isMediaDragging ? ' is-dragging' : ''}`}
            ref={mediaScrollerRef}
            onPointerDown={handleMediaPointerDown}
            onPointerMove={handleMediaPointerMove}
            onPointerUp={handleMediaPointerUp}
            onPointerCancel={handleMediaPointerUp}
            onPointerEnter={() => { mediaHoveredRef.current = true; }}
            onPointerLeave={(event) => {
              mediaHoveredRef.current = false;
              if (!mediaDragRef.current.moved) handleMediaPointerUp(event);
            }}
            onLostPointerCapture={handleMediaPointerUp}
            onScroll={updateMediaProgress}
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                event.preventDefault();
                event.currentTarget.scrollBy({ left: event.key === 'ArrowRight' ? 340 : -340, behavior: 'smooth' });
              }
            }}
            onClickCapture={(event) => {
              if (mediaDragRef.current.moved) {
                event.preventDefault();
                event.stopPropagation();
                mediaDragRef.current.moved = false;
              }
            }}
            aria-label={language === 'ru' ? 'Лента публикаций СМИ' : 'Media publications carousel'}
            aria-roledescription={language === 'ru' ? 'карусель' : 'carousel'}
            role="region"
            tabIndex={0}
          >
            <div className="media-track">
              {[false, true].map((isDuplicate) => (
                <div className="media-track-set" aria-hidden={isDuplicate ? 'true' : undefined} key={isDuplicate ? 'duplicate' : 'original'}>
                  {media.cards.map((card) => {
                    const ItemTag = card.href ? 'a' : 'article';
                    return (
                      <ItemTag
                        className={`media-logo-card media-logo-card-${card.variant}`}
                        href={card.href || undefined}
                        target={card.href ? '_blank' : undefined}
                        rel={card.href ? 'noreferrer' : undefined}
                        onDragStart={(event) => event.preventDefault()}
                        tabIndex={isDuplicate ? -1 : undefined}
                        key={card.title}
                      >
                        <div className="media-logo-panel">
                          {card.brandImage ? <img src={card.brandImage} alt="" /> : <span>{card.brand}</span>}
                          {card.href && <span className="media-logo-link" aria-hidden="true">↗</span>}
                        </div>
                        <h3>{card.title}</h3>
                        <p>{card.text}</p>
                      </ItemTag>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="media-scroll-control">
            <input
              id="media-scroll-range"
              ref={mediaRangeRef}
              type="range"
              min="0"
              max="1000"
              defaultValue="0"
              aria-label={language === 'ru' ? 'Положение ленты СМИ' : 'Media carousel position'}
              onChange={(event) => {
                const scroller = mediaScrollerRef.current;
                const midpoint = scroller ? scroller.scrollWidth / 2 : 0;
                const progress = Number(event.target.value);
                if (scroller && midpoint > 0) scroller.scrollLeft = midpoint * progress / 1000;
              }}
              onPointerDown={() => { mediaSliderActiveRef.current = true; }}
              onPointerUp={() => { mediaSliderActiveRef.current = false; }}
              onPointerCancel={() => { mediaSliderActiveRef.current = false; }}
              onPointerLeave={() => { mediaSliderActiveRef.current = false; }}
            />
          </div>

          <div className="media-videos" aria-label={language === 'ru' ? 'Видео Аллофарм' : 'Allopharm videos'}>
            {mediaVideos.map((video) => (
              <a className="media-video-link" href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer" key={video.id}>
                <span className="media-video-link-mark" aria-hidden="true">{video.id === 'jw6Vld-N02Y' ? 'D' : '5'}</span>
                <span className="media-video-link-copy">
                  <span>YOUTUBE</span>
                  <h3>{video.title}</h3>
                </span>
                <span className="media-video-link-play" aria-hidden="true">▶</span>
              </a>
            ))}
          </div>

          <a className="media-card media-card-video media-card-wide" href={mediaVideo.href} target="_blank" rel="noreferrer">
            <div className="media-card-head">
              <div className="media-brand"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 7.2a2.9 2.9 0 0 0-2-2C18.2 4.7 12 4.7 12 4.7s-6.2 0-8 .5a2.9 2.9 0 0 0-2 2A30 30 0 0 0 1.5 12 30 30 0 0 0 2 16.8a2.9 2.9 0 0 0 2 2c1.8.5 8 .5 8 .5s6.2 0 8-.5a2.9 2.9 0 0 0 2-2 30 30 0 0 0 .5-4.8 30 30 0 0 0-.5-4.8ZM9.7 15.4V8.6l6 3.4-6 3.4Z" /></svg><span>{mediaVideo.brand}</span></div>
              <span className="media-card-category">{mediaVideo.category}</span>
            </div>
            <div className="media-card-copy">
              <h3>{mediaVideo.title}</h3>
              <p>{mediaVideo.text}</p>
              <span className="media-card-action">{mediaVideo.action}<span aria-hidden="true">↗</span></span>
            </div>
            <span className="media-video-play" aria-hidden="true">▶</span>
          </a>
        </div>
      </section>
    </main>
  );
}

export default Home;
