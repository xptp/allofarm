import '../styles/News.css';
import '../styles/Cooperation.css';

const content = {
  ru: {
    title: 'Компания Аллофарм осуществляет свою деятельность за счет собственных средств, развивая взаимовыгодное партнерство по следующим направлениям:',
    items: [
      'Продвижение разработок компании Аллофарм на территории РФ и за рубежом.',
      'Разработка, регистрация и коммерциализация новых медицинских изделий и препаратов на основе активных соединений, созданных нашей компанией.',
      'Реализация прав интеллектуальной собственности компании Аллофарм на территории РФ и за рубежом.',
      'Проведение исследований с целью расширить область применения активных компонентов иммунной системы насекомых в фармацевтике, косметологии и ветеринарии.',
    ],
  },
  en: {
    title: 'Allopharm is self-funded and develops mutually beneficial partnerships in the following areas:',
    items: [
      'Promoting Allopharm developments in Russia and internationally.',
      'Developing, registering and commercialising new medical devices and medicines based on active compounds created by our company.',
      'Commercialising Allopharm intellectual property rights in Russia and internationally.',
      'Conducting research to expand the use of active components of the insect immune system in pharmaceuticals, cosmetics and veterinary medicine.',
    ],
  },
};

const destinations = ['/about/', null, '/intellectual-property/', '/about/'];
const icons = ['◎', '▰', '◩', '⚗'];

export function getCooperationRoute(path) {
  const normalized = path.replace(/\/+$/, '') || '/';
  if (normalized === '/cooperation') return { language: 'ru' };
  if (normalized === '/en/cooperation') return { language: 'en' };
  return null;
}

export const cooperationPath = (language) => `${language === 'en' ? '/en' : ''}/cooperation/`;

export default function Cooperation({ language }) {
  const page = content[language];
  return (
    <main className="news-page cooperation-page">
      <div className="news-hero cooperation-hero"><div className="news-container"><h1 tabIndex="-1">{page.title}</h1></div></div>
      <div className="news-container cooperation-content">
        <div className="cooperation-list">
          {page.items.map((item, index) => {
            const href = destinations[index] ? (language === 'en' ? `/en${destinations[index]}` : destinations[index]) : null;
            const ItemText = href ? 'a' : 'p';
            return (
              <article className="cooperation-item" key={item}>
                <span className="cooperation-icon" aria-hidden="true">{icons[index]}</span>
                <ItemText className="cooperation-item-text" {...(href ? { href } : {})}>{item}</ItemText>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
