import DevelopmentContent from '../../components/DevelopmentContent';
import image0 from '../../assets/development-calliphoridae.jpg';

// Content from https://allopharm.ru/inova-c/ and its English counterpart.
export const content = {
  "ru": {
    "title": "InOVA-C — суперантиген насекомых, иммунологически активный адъювант",
    "sections": [
      {
        "title": "Метод получения",
        "paragraphs": [
          "Метод получения и применения - ноухау"
        ]
      },
      {
        "title": "Аналоги",
        "paragraphs": [
          "Обеспечивает выработку защитных антител к слабым и не иммуногенным антигенам"
        ]
      },
      {
        "title": "Применение",
        "paragraphs": [
          "Применяется в составе вакцин в качестве адъюванта"
        ]
      }
    ]
  },
  "en": {
    "title": "InOVA-C — insect’s superantigen, immunologycally active adjuvant",
    "sections": [
      {
        "title": "Method of preparation",
        "paragraphs": [
          "Method of obtaining and using - know-how"
        ]
      },
      {
        "title": "Аnalogues",
        "paragraphs": [
          "Promotes the production of protective antibodies to weak and non-immunogenic antigens"
        ]
      },
      {
        "title": "Application",
        "paragraphs": [
          "Used in vaccines as an adjuvant"
        ]
      }
    ]
  }
};
content.ru.images = [{ src: image0, alt: "InOVA-C" }];
content.en.images = [{ src: image0, alt: "InOVA-C" }];

export default function InovaC({ language }) {
  return <DevelopmentContent content={content[language] || content.ru} language={language} />;
}
