import '../styles/News.css';
import '../styles/Contact.css';

const content = {
  ru: {
    title: 'Контакты', emailNote: 'Мы постараемся ответить на ваш email в ближайшее время',
    company: 'ООО «Аллофарм»', ogrn: 'ОГРН', inn: 'ИНН', addressTitle: 'Наш адрес',
    address: '199178, г. Санкт-Петербург, пр-т Малый В.О., д. 57, корпус 4, литер Ж, пом. 8-Н, оф. 1.3.1Б',
    weekdays: 'Понедельник — пятница',
  },
  en: {
    title: 'Contacts', emailNote: 'We will do our best to reply to your email as soon as possible',
    company: 'Allopharm LLC', ogrn: 'Registration No.', inn: 'Tax ID', addressTitle: 'Our address',
    address: 'Office 1.3.1B, room 8-N, building 4, letter Zh, 57 Maliy Prospect V.O., Saint Petersburg, 199178, Russia',
    weekdays: 'Monday — Friday',
  },
};

export function getContactRoute(path) {
  const normalized = path.replace(/\/+$/, '') || '/';
  if (normalized === '/contact') return { language: 'ru' };
  if (normalized === '/en/contact') return { language: 'en' };
  return null;
}

export const contactPath = (language) => `${language === 'en' ? '/en' : ''}/contact/`;

export default function Contact({ language }) {
  const labels = content[language];
  return (
    <main className="news-page contact-page">
      <div className="news-hero"><div className="news-container"><h1 tabIndex="-1">{labels.title}</h1></div></div>
      <div className="news-container contact-content">
        <section className="contact-direct" aria-label={labels.title}>
          <div className="contact-method">
            <span className="contact-icon" aria-hidden="true">✉</span>
            <div><a className="contact-primary" href="mailto:allofarm.spb@yandex.ru">allofarm.spb@yandex.ru</a><p>{labels.emailNote}</p></div>
          </div>
          <div className="contact-method">
            <span className="contact-icon" aria-hidden="true">☎</span>
            <div className="contact-phone-list">
              <a className="contact-primary" href="tel:+79315923375">+7 (931) 592-33-75</a>
              <a className="contact-primary" href="tel:+78123205542">+7 (812) 320-55-42</a>
            </div>
          </div>
        </section>
        <div className="contact-cards">
          <section className="contact-card">
            <span className="contact-card-icon" aria-hidden="true">⌂</span>
            <h2>{labels.company}</h2>
            <p>{labels.ogrn} 1047800031663<br />{labels.inn} 7801265876</p>
          </section>
          <section className="contact-card contact-address-card">
            <span className="contact-card-icon" aria-hidden="true">⌖</span>
            <h2>{labels.addressTitle}</h2>
            <p>{labels.address}</p>
            <div className="contact-hours"><span>{labels.weekdays}</span><strong>10:00–18:00</strong></div>
          </section>
        </div>
      </div>
    </main>
  );
}
