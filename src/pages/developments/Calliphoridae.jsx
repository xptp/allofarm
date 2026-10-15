import DevelopmentContent from '../../components/DevelopmentContent';
import image0 from '../../assets/development-cultivation.jpg';

// Content from https://allopharm.ru/calliphoridae/ and its English counterpart.
export const content = {
  "ru": {
    "title": "Технология выращивания биомассы личинок семейства CALLIPHORIDAE, поддержание культуры",
    "sections": [
      {
        "title": "Метод получения",
        "paragraphs": [
          "Культивирование на микробиологически чистых органических субстратах."
        ]
      },
      {
        "title": "Аналоги",
        "paragraphs": [
          "Культивирование насекомых на отходах птицеводства («Новые биотехнологии»)."
        ]
      },
      {
        "title": "Применение",
        "paragraphs": [
          "Биомасса насекомых может применяться в качестве активной кормовой добавки для животных.",
          "Также может функционировать как экологическая переработка отходов биологического происхождения «Биозавод», эукариотическая система, синтезирующая фармакологически активные вещества"
        ]
      }
    ]
  },
  "en": {
    "title": "TECHNOLOGY OF THE CALLIPHORIDAE FLY CULTIVATION, MAINTAINING CULTURES",
    "sections": [
      {
        "title": "Method of production",
        "paragraphs": [
          "Cultivation with microbiologically pure organic substrates (by-products of the meat industry: liver, kidneys, blood, etc.)"
        ]
      },
      {
        "title": "Analogues",
        "paragraphs": [
          "Cultivation of insects with poultry waste (\"New biotechnologies\")"
        ]
      },
      {
        "title": "Application",
        "paragraphs": [
          "Biomass of insects can be used as an active feed additive for animals.",
          "It can function as ecological recycling of biological waste, a \"Biofactory\", a eukaryotic system that synthesizes pharmacologically active substances"
        ]
      }
    ]
  }
};
content.ru.images = [{ src: image0, alt: "Технология культивирования насекомых" }];
content.en.images = [{ src: image0, alt: "Insect cultivation technology" }];

export default function Calliphoridae({ language }) {
  return <DevelopmentContent content={content[language] || content.ru} language={language} />;
}
