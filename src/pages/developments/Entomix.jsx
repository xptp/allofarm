import DevelopmentContent from '../../components/DevelopmentContent';
import image0 from '../../assets/development-entomix-package.jpg';

// Content from https://allopharm.ru/entomix/ and its English counterpart.
export const content = {
  "ru": {
    "title": "ЭНТОМИКС® — покрытие гидрогелевое для подавления развития бактериальных биопленок",
    "sections": [
      {
        "title": "Основное действующее вещество",
        "paragraphs": [
          "Комплекс антимикробных пептидов FLIP®7."
        ],
        "href": "http://allopharm.ru/flip7/"
      },
      {
        "title": "Аналоги",
        "paragraphs": [
          "Структура, фармакологические свойства и технология биосинтеза активных компонентов не имеют прямых аналогов среди применяемых в настоящее время антибактериальных лекарственных веществ и раневых покрытий."
        ]
      },
      {
        "title": "Применение",
        "paragraphs": [
          "Применяется при заболеваниях кожи и мягких тканей, осложненных бактериальной инфекцией."
        ]
      },
      {
        "title": "Документация",
        "paragraphs": [
          "Номер РУ: РЗН 2020/12582"
        ]
      },
      {
        "title": "Подробная информация и где купить",
        "paragraphs": [
          "http://entomix.ru/"
        ],
        "href": "http://entomix.ru/"
      }
    ]
  },
  "en": {
    "title": "ENTOMIX® — hydrogel coating for inhibiting the growth of bacterial biofilms",
    "sections": [
      {
        "title": "The main active substance",
        "paragraphs": [
          "The active substance is the FLIP®7 complex of antimicrobial peptides."
        ],
        "href": "/flip7/"
      },
      {
        "title": "Analogues",
        "paragraphs": [
          "The structure, pharmacological properties and technology of biosynthesis of active components do not have direct analogues among currently used antibacterial drugs and wound coverings."
        ]
      },
      {
        "title": "Application",
        "paragraphs": [
          "Used for skin and soft tissue diseases complicated by bacterial infection."
        ]
      },
      {
        "title": "Additional Information",
        "paragraphs": [
          "The registration certificate number is RZN 2020/12582"
        ]
      },
      {
        "title": "Detailed information",
        "paragraphs": [
          "http://entomix.ru/"
        ],
        "href": "http://entomix.ru/"
      }
    ]
  }
};
content.ru.images = [{ src: image0, alt: "ЭНТОМИКС®" }];
content.en.images = [{ src: image0, alt: "ENTOMIX®" }];

export default function Entomix({ language }) {
  return <DevelopmentContent content={content[language] || content.ru} language={language} />;
}
