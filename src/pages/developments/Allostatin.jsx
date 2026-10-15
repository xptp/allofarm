import DevelopmentContent from '../../components/DevelopmentContent';
import image0 from '../../assets/allostatin-molecule.jpg';
import cells from '../../assets/allostatin-cells.jpg';

// Content from https://allopharm.ru/allostatins/ and its English counterpart.
export const content = {
  "ru": {
    "title": "АЛЛОСТАТИН® — лиофилизированный пептид, имеющий структурное сходство с аллоферонами насекомых и иммуноглобулинами млекопитающих",
    "sections": [
      {
        "title": "Механизм действия",
        "paragraphs": [
          "Селективный активатор цитотоксических клеток иммунной системы человека. В присутствии АЛЛОСТАТИНА® естественные киллеры (NK) эффективнее распознают и лизируют опухолевые и инфицированные вирусами клетки (картинка 1)."
        ]
      },
      {
        "title": "Метод получения",
        "paragraphs": [
          "АЛЛОСТАТИН® получен путем химического синтеза."
        ]
      },
      {
        "title": "Применение",
        "paragraphs": [
          "Применяется в составе препаратов с противовирусной и противоопухолевой активностью и средств по уходу за кожей. Прошел доклинические испытания."
        ]
      },
      {
        "title": "Патент РФ № 2267496",
        "paragraphs": [
          "«Противоопухолевые и антивирусные пептиды». Автор - С. И. Черныш",
          "Изобретение относится получению новых пептидов, обладающих иммуномодулирующей, антипролиферативной, противоопухолевой и антивирусной активностью. Предложены новые пептиды, содержащие до 30 аминокислотных остатков, характеризуемые общей структурной формулой: X1- Trp-Gly-Gln-X2"
        ]
      },
      {
        "title": "Публикации",
        "paragraphs": [
          "Смотреть публикации >>"
        ],
        "href": "http://allopharm.ru/our-publications/"
      },
      {
        "title": "Препарат",
        "paragraphs": [
          "Косметический гель АЛЛОМЕДИН® ПРО"
        ],
        "href": "https://allopharm.ru/allomedin/"
      }
    ]
  }
};
content.ru.images = [{ src: image0, alt: "Молекула АЛЛОСТАТИНА®" }];
content.ru.figure = { src: cells, alt: 'Действие АЛЛОСТАТИНА на клетки иммунной системы', caption: 'Картинка 1' };

export default function Allostatin({ language }) {
  return <DevelopmentContent content={content[language] || content.ru} language={language} />;
}
