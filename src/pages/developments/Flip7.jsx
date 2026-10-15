import DevelopmentContent from '../../components/DevelopmentContent';
import image0 from '../../assets/flip7-structure-1.jpg';
import image1 from '../../assets/flip7-structure-2.jpg';
import image2 from '../../assets/flip7-structure-3.jpg';
import brochure from '../../assets/flip7-brochure.pdf';

// Content from https://allopharm.ru/flip7/ and its English counterpart.
export const content = {
  "ru": {
    "title": "FLIP®7 — лиофилизированный комплекс антимикробных пептидов насекомого",
    "sections": [
      {
        "title": "Свойства комплекса пептидов FLIP®7",
        "paragraphs": [
          "- обладает широким спектром антибактериальной активности in vitro",
          "- защищен от развития генетической (плазмидной) устойчивости у грамотрицательных бактерий",
          "- повышает активность синтетических антибиотиков в отношении бактериальных биопленок (синергический эффект)",
          "- оказывает разрушающее действие на бактериальные биопленки"
        ],
        "list": true
      },
      {
        "title": "Метод получения",
        "paragraphs": [
          "Многоступенчатое хроматографическое обогащение целевых компонентов гемолимфы."
        ]
      },
      {
        "title": "Применение",
        "paragraphs": [
          "Применяется в составе антимикробных препаратов."
        ]
      },
      {
        "title": "Патент РФ №2447896",
        "paragraphs": [
          "«Антимикробное вещество». Автор – С.И. Черныш",
          "Ознакомиться с разработкой подробнее"
        ],
        "href": "http://allopharm.ru/wp-content/uploads/2017/08/Metodichka_FLIP7.pdf"
      },
      {
        "title": "Публикации",
        "paragraphs": [
          "Смотреть публикации >>"
        ],
        "href": "http://allopharm.ru/our-publications/"
      },
      {
        "title": "ЭНТОМИКС®",
        "paragraphs": [
          "Медицинское изделие, содержит комплекс антимикробных пептидов FLIP®7.",
          "www.entomix.ru"
        ],
        "href": "https://entomix.ru/"
      },
      {
        "title": "Спектр антимикробной активности комплекса FLIP®7",
        "paragraphs": []
      }
    ],
    "groups": [
      {
        "title": "Высокочувствительные бактерии",
        "families": [
          {
            "title": "Enterobacteriacea",
            "items": [
              "Escherichia coli",
              "Klebsiella pneumoniae",
              "Salmonella wphimurium",
              "Enterobacter cloacae"
            ]
          },
          {
            "title": "Bacillacea",
            "items": [
              "Bacillus subtilis",
              "Bacillus megaterium"
            ]
          },
          {
            "title": "Moraxellacea",
            "items": [
              "Acinetobacter baumannii"
            ]
          },
          {
            "title": "Coccacea",
            "items": [
              "Staphylococcus aureus",
              "Micrococcus luteus"
            ]
          }
        ]
      },
      {
        "title": "Умеренно чувствительные бактерии",
        "families": [
          {
            "title": "Pseudomonadacea",
            "items": [
              "Pseudomonas aeruginosa"
            ]
          },
          {
            "title": "Corynebacteriacea",
            "items": [
              "Listeria mocytogenes"
            ]
          }
        ]
      }
    ]
  },
  "en": {
    "title": "FLIP®7 is a lyophilized complex of insect antimicrobial peptides",
    "sections": [
      {
        "title": "Properties of the peptide complex FLIP®7",
        "paragraphs": [
          "- has a wide spectrum of antibacterial activity in vitro",
          "- protected from the development of genetic (plasmid) resistance in Gram-negative bacteria",
          "- has a destructive effect on bacterial biofilms",
          "- increases the activity of synthetic antibiotics against bacterial biofilms (synergistic effect)"
        ],
        "list": true
      },
      {
        "title": "Method of preparation",
        "paragraphs": [
          "Multistage chromatographic enrichment of target hemolymph components"
        ]
      },
      {
        "title": "Application",
        "paragraphs": [
          "Used in the preparation of antimicrobials."
        ]
      },
      {
        "title": "Patent of the Russian Federation No. 2447896",
        "paragraphs": []
      },
      {
        "title": "Publications",
        "paragraphs": [],
        "href": "http://en.allopharm.ru/our-publications/"
      },
      {
        "title": "ENTOMIX®",
        "paragraphs": [
          "ENTOMIX®️ — MD hydrogel coating for inhibiting the growth of bacterial biofilms"
        ],
        "href": "https://en.allopharm.ru/entomix/"
      }
    ]
  }
};
content.ru.images = [{ src: image0, alt: "Структура пептидов FLIP®7 1" }, { src: image1, alt: "Структура пептидов FLIP®7 2" }, { src: image2, alt: "Структура пептидов FLIP®7 3" }];
content.en.images = [{ src: image0, alt: "FLIP®7 peptide structure 1" }, { src: image1, alt: "FLIP®7 peptide structure 2" }, { src: image2, alt: "FLIP®7 peptide structure 3" }];
content.ru.sections[3].href = brochure;
content.ru.sections[3].document = true;

export default function Flip7({ language }) {
  return <DevelopmentContent content={content[language] || content.ru} language={language} />;
}
