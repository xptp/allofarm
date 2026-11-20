import DevelopmentContent from '../../components/DevelopmentContent';
import image0 from '../../assets/development-site-image-1.png';
import productInformation from '../../assets/allomedin-pro-information-v2.pdf';
import InterfaceIcon from '../../components/InterfaceIcon';

// Content from https://allopharm.ru/allomedin/ and its English counterpart.
export const content = {
  "ru": {
    "title": "АЛЛОМЕДИН® ПРО — гель, содержащий уникальный синтетический пептид АЛЛОСТАТИН®.",
    "sections": [
      {
        "title": "Свойства геля АЛЛОМЕДИН® ПРО",
        "paragraphs": [
          "Восстанавливает и защищает кожу после косметических процедур, при атопии, высыпаниях, сухости, чувствительности и раздражении кожи. Содержит пептид аллостатин®, созданный на основе активных компонентов противовирусного иммунитета насекомых."
        ]
      },
      {
        "title": "Форма выпуска",
        "paragraphs": [
          "Выпускается в виде прозрачного гидрогеля для местного применения."
        ]
      },
      {
        "title": "Состав",
        "paragraphs": [
          "Вода, трегалоза, карбопол, феноксиэтанол, гидроксид натрия, аллантоин, этилгексилглицерин, динатрий ЭДТА, аллостатин®."
        ]
      },
      {
        "title": "Аналоги",
        "paragraphs": [
          "Аналоги отсутствуют."
        ]
      },
      {
        "title": "Применение",
        "paragraphs": [
          "Уход за кожей лица и тела, испытавшей стресс во время переохлаждения, излишнего воздействия УФ излучения, резкой смены климата, косметических процедур и других повреждающих факторов."
        ]
      },
      {
        "title": "Документация",
        "paragraphs": [
          "Декларация о соответствии ЕАЭС N RU Д-RU.PA11.B.15055/25"
        ]
      },
      {
        "title": "Подробная информация",
        "paragraphs": [
          "На нашем YouTube канале"
        ],
        "href": "https://youtube.com/shorts/tLq9eTrZj50?si=QJMaAjiDleD5WzXT"
      }
    ]
  },
  "en": {
    "title": "ALLOMEDIN® PRO is a regenerative cosmetic gel intended for face and body skin care.",
    "sections": [
      {
        "title": "Allomedin® PRO gel properties",
        "paragraphs": [
          "Restores and protects the skin after cosmetic procedures, in cases of atopy, breakouts, dryness, sensitivity, and irritation. Contains Allostatin® peptide, developed based on active components of insect antiviral immunity."
        ]
      },
      {
        "title": "Dosage form",
        "paragraphs": [
          "Available as a clear hydrogel for topical application."
        ]
      },
      {
        "title": "Ingredients",
        "paragraphs": [
          "Aqua, Trehalose, Carbopol, Phenoxyethanol, Sodium Hydroxide, Allantoin, Ethylhexylglycerin, Disodium EDTA, Allostatin®."
        ]
      },
      {
        "title": "Аnalogues",
        "paragraphs": [
          "No analogues exist"
        ]
      },
      {
        "title": "Application",
        "paragraphs": [
          "Skincare for face and body experiencing stress from hypothermia, excessive UV radiation, sudden climate changes, cosmetic procedures, and other damaging factors."
        ]
      },
      {
        "title": "Documentation",
        "paragraphs": [
          "Declaration of conformity ЕАЭС N RU Д-RU.PA11.B.15055/25",
          "Trademarks No. 319596, No. 340057"
        ]
      },
      {
        "title": "Detailed information",
        "paragraphs": [
          "On our YouTube channel"
        ],
        "href": "https://youtube.com/shorts/tLq9eTrZj50?si=QJMaAjiDleD5WzXT"
      }
    ]
  }
};
content.ru.images = [{ src: image0, alt: "АЛЛОМЕДИН® ПРО" }];
content.en.images = [{ src: image0, alt: "ALLOMEDIN® PRO" }];

export default function Allomedin({ language }) {
  return <>
    <DevelopmentContent content={content[language] || content.ru} language={language} />
    <section className="development-fact allomedin-purchase">
      <span className="development-fact-number" aria-hidden="true">08</span>
      <div>
        <h2>{language === 'en' ? 'Where to buy' : 'Где купить'}</h2>
        <div className="allomedin-purchase-links">
          <a className="allomedin-store-link allomedin-store-link--wb" href="https://www.wildberries.ru/catalog/1152464970/detail.aspx?size=1704929427" target="_blank" rel="noopener noreferrer">
            {language === 'en' ? 'Buy on Wildberries' : 'Купить на Wildberries'}<InterfaceIcon name="arrow-up-right" />
          </a>
          <a className="allomedin-store-link allomedin-store-link--ozon" href="https://www.ozon.ru/product/vosstanavlivayushchiy-gel-ot-prostudy-gerpesa-na-gubah-allomedin-pro-na-osnove-peptidov-10-gr-4031361138/?from=share_ios&perehod=smm_share_button_productpage_link&sh=Gl7Rpbzdww&short=bTFQiOA&__rr=1" target="_blank" rel="noopener noreferrer">
            {language === 'en' ? 'Buy on Ozon' : 'Купить на Ozon'}<InterfaceIcon name="arrow-up-right" />
          </a>
        </div>
      </div>
    </section>
    <div className="allomedin-document-action">
      <a className="allomedin-document-link" href={productInformation} target="_blank" rel="noopener noreferrer">
        {language === 'ru' ? 'Больше информации' : 'More information'}<InterfaceIcon name="arrow-up-right" />
      </a>
    </div>
  </>;
}
