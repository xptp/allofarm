import mapImage from '../../assets/research-fda-map.jpg';
import '../../styles/ResearchBase.css';

export const content = {
  ru: {
    title: 'Исследовательская база', label: 'Наши разработки',
    mapAlt: 'Карта применения биохирургии в мире с логотипом FDA',
    sections: [
      { title: 'Почему насекомые?', paragraphs: [
        'Это самая эволюционно успешная группа животных. Им принадлежит абсолютный рекорд по видовому разнообразию — более 2 000 000 видов и 90% генофонда планеты. Отсюда понятен интерес современной науки к насекомым.',
        'Примером могут служить «хирургические личинки». Известный со времен Крымской войны, Наполеона и Н. И. Пирогова, этот метод в наши дни переживает настоящий ренессанс. Оказалось, что при лечении сложных ран «хирургические личинки» позволяют обходиться вообще без антибиотиков. В эпоху супербактерий трудно переоценить эту особенность личинок.',
      ] },
      { title: 'Food and Drug Administration', paragraphs: [
        'Проведенные по стандартам доказательной медицины исследования позволили FDA в 2004 году зарегистрировать биохирургию как эффективный метод лечения (FDA K033391). Это открыло дорогу широкому применению «хирургических личинок» в современной медицине. На сегодняшний день сотни госпиталей в США, ЕС, Японии, Израиле постоянно используют этот метод в своей практике.',
      ], map: true },
      { title: 'Нобелевская премия', paragraphs: [
        'В 2011 году французский биолог Жюль Хоффман был удостоен Нобелевской премии по физиологии и медицине за «работы по изучению активации врожденного иммунитета». Основой его исследований стало изучение иммунной системы насекомых.',
      ] },
      { title: 'Наши разработки', paragraphs: [
        'В результате многолетних исследований группе ученых АЛЛОФАРМ удалось расшифровать состав антимикробного комплекса «хирургических личинок» и разработать технологию его получения.',
      ] },
    ],
    products: ['АЛЛОМЕДИН® ПРО', 'ЭНТОМИКС®', 'АЛЛОСТАТИН®', 'FLIP®7', 'InOVA-C', 'Технологии культивирования насекомых'],
  },
  en: {
    title: 'Research base', label: 'Our developments',
    mapAlt: 'Map of the use of biosurgery worldwide with the FDA logo',
    sections: [
      { title: 'Why insects?', paragraphs: [
        'Insects are the most evolutionarily successful group of animals. They hold the absolute record for species diversity: more than 2,000,000 species and 90% of the planet’s gene pool. This explains modern science’s interest in insects.',
        '“Surgical maggots” are one example. Known since the times of the Crimean War, Napoleon and N. I. Pirogov, this method is now experiencing a renaissance. It has been found that “surgical maggots” make it possible to treat complex wounds without antibiotics. In the era of superbugs, the significance of this characteristic is hard to overestimate.',
      ] },
      { title: 'Food and Drug Administration', paragraphs: [
        'Studies conducted according to evidence-based medicine standards enabled the FDA to register biosurgery as an effective treatment in 2004 (FDA K033391). This paved the way for the widespread use of “surgical maggots” in modern medicine. Today, hundreds of hospitals in the USA, the EU, Japan and Israel routinely use this method in their practice.',
      ], map: true },
      { title: 'The Nobel Prize', paragraphs: [
        'In 2011, French biologist Jules Hoffmann was awarded the Nobel Prize in Physiology or Medicine for his work on the activation of innate immunity. His research was based on studying the insect immune system.',
      ] },
      { title: 'Our developments', paragraphs: [
        'As a result of many years of research, a group of ALLOPHARM scientists deciphered the composition of the antimicrobial complex of “surgical maggots” and developed a technology for producing it.',
      ] },
    ],
    products: ['ALLOMEDIN® PRO', 'ENTOMIX®', 'ALLOSTATIN®', 'FLIP®7', 'InOVA-C', 'Insect cultivation technologies'],
  },
};

export default function ResearchBase({ language }) {
  const t = content[language];
  return <>
    {t.sections.map((section, index) => (
      <section className="research-section" key={section.title} aria-labelledby={`research-section-${index}`}>
        <span className="research-number" aria-hidden="true">0{index + 1}</span>
        <h2 id={`research-section-${index}`}>{section.title}</h2>
        {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {section.map && <figure className="research-map"><img src={mapImage} alt={t.mapAlt} /></figure>}
      </section>
    ))}
  </>;
}