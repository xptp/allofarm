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
import { publicationsPath } from './press/Publications';
import InterfaceIcon from '../components/InterfaceIcon';

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
    video: { variant: 'video', brand: 'YOUTUBE', category: 'Видео о компании', title: 'Аллофарм — научные видео', text: 'Видеоматериалы о компании и её исследованиях.', action: 'Смотреть видео', href: 'https://www.youtube.com/shorts/tLq9eTrZj50' },
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
    video: { variant: 'video', brand: 'YOUTUBE', category: 'Company videos', title: 'Allopharm — research videos', text: 'Videos about the company and its research.', action: 'Watch video', href: 'https://www.youtube.com/shorts/tLq9eTrZj50' },
  },
};

function FlyArtwork({ language }) {
  const label = language === 'ru' ? 'Стилизованное изображение мухи семейства Calliphoridae' : 'Stylised illustration of a Calliphoridae fly';
  return <svg className="molecule-art molecule-art-fly" viewBox="0 0 560 410" fill="none" role="img" aria-label={label}>
    <defs>
      <radialGradient id="fly-core" cx="0" cy="0" r="1" gradientTransform="matrix(0 148 -166 0 280 190)" gradientUnits="userSpaceOnUse"><stop stopColor="#08BFE4" stopOpacity=".2" /><stop offset="1" stopColor="#08BFE4" stopOpacity="0" /></radialGradient>
      <linearGradient id="fly-wing" x1="84" y1="101" x2="280" y2="188" gradientUnits="userSpaceOnUse"><stop stopColor="#00D9F4" stopOpacity=".28" /><stop offset="1" stopColor="#087DA5" stopOpacity=".08" /></linearGradient>
      <filter id="fly-glow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
    </defs>
    <circle cx="280" cy="190" r="158" fill="url(#fly-core)" />
    <g stroke="#167C9E" strokeOpacity=".2" strokeDasharray="2 7"><circle cx="280" cy="190" r="104" /><circle cx="280" cy="190" r="158" /><path d="M26 190h508M280 27v350" /></g>
    <g stroke="#18BBD8" strokeOpacity=".85" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M250 159 209 132 182 81 166 70 M310 159 351 132 378 81 394 70" />
      <path d="M244 190 198 205 156 186 128 194 M316 190 362 205 404 186 432 194" />
      <path d="M250 215 215 268 197 329 175 348 M310 215 345 268 363 329 385 348" />
      <path d="m182 81-9 3m25 245-10-2m190-246 9 3m-25 245 10-2" strokeWidth="1" />
    </g>
    <path d="M250 213C233 235 237 284 254 310Q280 339 306 310C323 284 327 235 310 213Z" fill="#092B3D" stroke="#13C8E8" strokeWidth="1.7" />
    <g stroke="#20BED8" strokeWidth="1.1">
      <path d="M243 246Q280 261 317 246 M244 266Q280 281 316 266 M249 287Q280 302 311 287 M261 308Q280 316 299 308" />
    </g>
    <g fill="url(#fly-wing)" stroke="#21C9E3" strokeWidth="1.4" strokeLinejoin="round">
      <path d="M253 164C225 164 183 203 148 253C116 299 110 332 130 338C152 347 189 316 216 274C240 238 252 192 263 172Z" />
      <path d="M307 164C335 164 377 203 412 253C444 299 450 332 430 338C408 347 371 316 344 274C320 238 308 192 297 172Z" />
    </g>
    <g stroke="#36B4CE" strokeOpacity=".65" strokeWidth=".9" strokeLinejoin="round">
      <path d="M251 179 132 325 183 302 216 247 251 179 M216 247 169 266 183 302 M169 266 142 296 132 325 M234 210 190 222 169 266 M216 247 206 287" />
      <path d="M309 179 428 325 377 302 344 247 309 179 M344 247 391 266 377 302 M391 266 418 296 428 325 M326 210 370 222 391 266 M344 247 354 287" />
    </g>
    <g filter="url(#fly-glow)" stroke="#13D8F2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M247 130C228 149 233 191 248 214Q280 232 312 214C327 191 332 149 313 130Q280 115 247 130Z" fill="#0A3042" strokeWidth="1.8" />
      <path d="M264 137Q252 171 262 204 M280 133V209 M296 137Q308 171 298 204" stroke="#36A5BF" strokeWidth="1.2" />
      <path d="M255 216Q280 229 305 216L291 236H269Z" fill="#103A4A" strokeWidth="1.2" />
      <path d="M239 109C228 95 237 73 253 68Q280 57 307 68C323 73 332 95 321 109Q306 130 280 129Q254 130 239 109Z" fill="#092B3D" strokeWidth="1.6" />
      <ellipse cx="251" cy="94" rx="15" ry="23" transform="rotate(15 251 94)" fill="#125267" strokeWidth="1.3" />
      <ellipse cx="309" cy="94" rx="15" ry="23" transform="rotate(-15 309 94)" fill="#125267" strokeWidth="1.3" />
      <path d="M274 74 269 58 259 53 M286 74 291 58 301 53 M275 119 280 128 285 119" strokeWidth="1.3" />
    </g>
    <g stroke="#68DCE9" strokeOpacity=".55" strokeWidth=".7">
      <path d="m245 80 12 7-15 8 16 7-14 6 M315 80l-12 7 15 8-16 7 14 6" />
      <path d="m240 148-8-5m6 20-9-2m11 21-9 2m14 17-8 5m83-58 8-5m-6 20 9-2m-11 21 9 2m-14 17 8 5" />
    </g>
    <g fill="#A9F7FC" filter="url(#fly-glow)"><circle cx="280" cy="145" r="1.8" /><circle cx="280" cy="173" r="1.5" /><circle cx="280" cy="201" r="1.5" /></g>
    <circle cx="280" cy="320" r="2.5" fill="#ED5575" filter="url(#fly-glow)" />
    <g stroke="#1D718B" strokeOpacity=".72" strokeWidth=".8"><path d="M88 44h55l20 22" /></g>
    <g fill="#61CDE0" fontFamily="monospace" fontSize="10" letterSpacing=".8"><text x="26" y="39">BIO-SCAN / 02</text></g>
  </svg>;
}

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
  const metricLinks = [
    developmentPath('base', language),
    publicationsPath(language),
    language === 'ru' ? '/intellectual-property/' : '/en/intellectual-property/',
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
              {t.metrics.map(([value, label], index) => <a className="metric-card" href={metricLinks[index]} key={value} aria-label={`${value}: ${label}`}><strong>{value}</strong><span>{label}</span></a>)}
            </div>
            <div className="hero-actions">
              <a className="button button-primary" href={links[1]}>{t.primary}<InterfaceIcon name="arrow-up-right" /></a>
              <a className="button button-secondary" href={links[2]}>{t.secondary}<InterfaceIcon name="arrow-right" /></a>
            </div>
            <div className="hero-footnote"><span className="footnote-rule" /> {t.location}</div>
          </div>
          <div className="hero-visual">
            <div className="visual-stage">
              <div className="artwork-card">
                <div className="artwork-meta"><span>ALLOPHARM&nbsp; / &nbsp;BIOLOGY</span><span>01 — 04</span></div>
                {currentSlide === 1 ? <FlyArtwork language={language} /> : <svg className="molecule-art molecule-art-dragonfly" viewBox="0 0 560 410" fill="none" role="img" aria-label={language === 'ru' ? 'Стилизованное изображение стрекозы в бирюзовых тонах' : 'Stylised turquoise illustration of a dragonfly'}>
                  <defs>
                    <radialGradient id="core" cx="0" cy="0" r="1" gradientTransform="matrix(0 140 -140 0 280 188)" gradientUnits="userSpaceOnUse"><stop stopColor="#08BFE4" stopOpacity=".19" /><stop offset="1" stopColor="#08BFE4" stopOpacity="0" /></radialGradient>
                    <linearGradient id="wing" x1="35" y1="70" x2="280" y2="210" gradientUnits="userSpaceOnUse"><stop stopColor="#00D9F4" stopOpacity=".34" /><stop offset="1" stopColor="#007DA5" stopOpacity=".12" /></linearGradient>
                    <clipPath id="dragonfly-upper-veins">
                      <path d="M270 119C219 96 111 48 54 70 14 86 40 124 87 140c56 19 128 3 183-12Z" />
                      <path d="M290 119c51-23 159-71 216-49 40 16 14 54-33 70-56 19-128 3-183-12Z" />
                    </clipPath>
                    <clipPath id="dragonfly-lower-veins">
                      <path d="M270 133c-62 7-154 26-185 60-24 26 15 48 59 43 48-5 94-45 126-87Z" />
                      <path d="M290 133c62 7 154 26 185 60 24 26-15 48-59 43-48-5-94-45-126-87Z" />
                    </clipPath>
                    <filter id="glow"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                  </defs>
                  <circle cx="280" cy="190" r="150" fill="url(#core)" />
                  <g stroke="#167C9E" strokeOpacity=".22" strokeDasharray="2 6"><circle cx="280" cy="190" r="95" /><circle cx="280" cy="190" r="150" /><path d="M28 190h504M280 28v350" /></g>
                  <g stroke="#13C8E8" strokeWidth="1.3" fill="url(#wing)">
                    <path d="M270 119C219 96 111 48 54 70 14 86 40 124 87 140c56 19 128 3 183-12Z" /><path d="M290 119c51-23 159-71 216-49 40 16 14 54-33 70-56 19-128 3-183-12Z" />
                    <path d="M270 133c-62 7-154 26-185 60-24 26 15 48 59 43 48-5 94-45 126-87Z" /><path d="M290 133c62 7 154 26 185 60 24 26-15 48-59 43-48-5-94-45-126-87Z" />
                  </g>
                  <g stroke="#20B7D3" strokeOpacity=".72" strokeWidth=".8" strokeLinecap="round">
                    <g clipPath="url(#dragonfly-upper-veins)">
                      <path d="M61 77 267 120 M54 101 267 122 M81 129 267 125" />
                      <path d="M499 77 293 120 M506 101 293 122 M479 129 293 125" />
                    </g>
                    <g clipPath="url(#dragonfly-lower-veins)">
                      <path d="M94 196 268 138 M111 220 268 143 M151 228 268 148" />
                      <path d="M466 196 292 138 M449 220 292 143 M409 228 292 148" />
                    </g>
                  </g>
                  <g filter="url(#glow)" stroke="#13D8F2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M274 83 270 72 M286 83 290 72" strokeWidth="1.2" />
                    <path d="M258 94C258 81 269 78 280 81C291 78 302 81 302 94C302 107 291 113 280 112C269 113 258 107 258 94Z" fill="#0A2C3E" />
                    <ellipse cx="267" cy="94" rx="9" ry="12" transform="rotate(18 267 94)" fill="#0B4053" strokeWidth="1.3" />
                    <ellipse cx="293" cy="94" rx="9" ry="12" transform="rotate(-18 293 94)" fill="#0B4053" strokeWidth="1.3" />
                    <path d="M273 106Q280 111 287 106" strokeWidth="1" />
                    <path d="M270 145C265 158 268 182 270 201L274 270Q275 299 280 321Q285 299 286 270L290 201C292 182 295 158 290 145Z" fill="#082B3D" />
                    <path d="M268 168Q280 174 292 168 M270 191Q280 197 290 191 M271 215Q280 220 289 215 M272 239Q280 244 288 239 M274 262Q280 267 286 262 M275 285Q280 289 285 285 M277 304Q280 307 283 304" strokeWidth="1" strokeOpacity=".75" />
                    <path d="M273 111C260 116 260 131 264 142Q268 154 280 157Q292 154 296 142C300 131 300 116 287 111Q280 108 273 111Z" fill="#0B3547" />
                    <path d="M275 117Q269 132 275 147 M285 117Q291 132 285 147" strokeWidth="1" strokeOpacity=".65" />
                  </g>
                  <g fill="#A9F7FC" filter="url(#glow)"><circle cx="264" cy="90" r="1.5" /><circle cx="296" cy="90" r="1.5" /><circle cx="280" cy="130" r="2" /><circle cx="280" cy="182" r="1.3" /><circle cx="280" cy="228" r="1.2" /><circle cx="280" cy="274" r="1" /></g>
                  <circle cx="280" cy="321" r="3.2" fill="#ED5575" filter="url(#glow)" />
                  <g stroke="#1D718B" strokeOpacity=".72" strokeWidth=".8"><path d="M89 43h47l25 24" /></g>
                  <g fill="#61CDE0" fontFamily="monospace" fontSize="10" letterSpacing=".8"><text x="26" y="39">BIO-SCAN / 01</text></g>
                </svg>}
                <div className="artwork-caption"><span className="caption-dot" /><span>{language === 'ru' ? `Биомиметика ${currentSlide === 1 ? 'Calliphoridae' : 'Odonata'}` : `${currentSlide === 1 ? 'Calliphoridae' : 'Odonata'} biomimetics`}</span><span className="artwork-caption-secondary">{language === 'ru' ? 'Иммунитет насекомых' : 'Insect immunity'}</span></div>
              </div>
              <div className="slider-controls">
                <div className="slider-dots" role="group" aria-label={language === 'ru' ? 'Выбрать слайд' : 'Choose a slide'}>
                  {Array.from({ length: slideCount }, (_, index) => <button key={index} type="button" className={currentSlide === index ? 'slider-dot active' : 'slider-dot'} aria-label={`${language === 'ru' ? 'Слайд' : 'Slide'} ${index + 1}`} aria-pressed={currentSlide === index} onClick={() => selectSlide(index)} />)}
                </div>
                <div className="slider-arrows">
                  <button type="button" className="slider-arrow" aria-label={language === 'ru' ? 'Предыдущий слайд' : 'Previous slide'} onClick={() => selectSlide(currentSlide - 1)}><InterfaceIcon name="chevron-left" /></button>
                  <button type="button" className="slider-arrow" aria-label={language === 'ru' ? 'Следующий слайд' : 'Next slide'} onClick={() => selectSlide(currentSlide + 1)}><InterfaceIcon name="chevron-right" /></button>
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
            {directions.cards.map((card) => {
              const cardPath = card.icon === 'patents'
                ? (language === 'ru' ? '/intellectual-property/' : '/en/intellectual-property/')
                : card.icon === 'research'
                ? developmentPath('base', language)
                : card.icon === 'publications'
                ? publicationsPath(language)
                : null;
              const Card = cardPath ? 'a' : 'article';
              return <Card className={`direction-card direction-card-${card.type}`} key={card.icon} tabIndex={cardPath ? undefined : 0} {...(cardPath ? { href: cardPath } : {})}>
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
              </Card>;
            })}
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
                          {card.href && <InterfaceIcon name="arrow-up-right" className="media-logo-link" />}
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
              <span className="media-card-action">{mediaVideo.action}<InterfaceIcon name="arrow-up-right" /></span>
            </div>
            <span className="media-video-play" aria-hidden="true">▶</span>
          </a>
        </div>
      </section>
    </main>
  );
}

export default Home;
