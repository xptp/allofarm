import technicalDocumentation from './assets/allomedin-technical-documentation.pdf';
import '../../styles/IntellectualProperty.css';

const content = {
  ru: {
    eyebrow: 'Патенты и товарные знаки',
    title: 'Интеллектуальная собственность',
    patentsTitle: 'Патенты',
    trademarksTitle: 'Товарные знаки',
    documentationTitle: 'Техдокументация и ноу-хау производства препарата Алломедин®',
    documentationText: 'Документация по производству препарата Алломедин®.',
    documentationAction: 'Открыть PDF',
    patents: [
      'Патент РФ № 2751837 «Способ активации цитотоксических лимфоцитов»',
      'Патент РФ № 2664708 «Способ разрушения и предотвращения образования бактериальных биоплёнок комплексом антимикробных пептидов насекомых»',
      'Патент РФ № 2267496 «Противоопухолевые и антивирусные пептиды»',
      'Патент РФ № 2338553 «Средство для наружного применения, обладающее противовирусной активностью»',
      'Патент РФ № 2276988 «Антивирусное вещество»',
      'Патент РФ № 2447896 «Антимикробное вещество»',
      'Европейский патент № 1705182 «Противоопухолевые и антивирусные пептиды»',
      'Патент США № 8,372,406 B2 «Противоопухолевые и антивирусные пептиды»',
    ],
    trademarks: ['Алломедин (Allomedin)', 'Аллостатин', 'Энтомикс', 'Аллофарм', 'FLIP'],
  },
  en: {
    eyebrow: 'Patents and trademarks',
    title: 'Intellectual property',
    patentsTitle: 'Patents',
    trademarksTitle: 'Trademarks',
    documentationTitle: 'Technical documentation and know-how for Allomedin® production',
    documentationText: 'Documentation for the production of Allomedin®.',
    documentationAction: 'Open PDF',
    patents: [
      'Patent of the Russian Federation No. 2751837 “Method for activation of cytotoxic lymphocytes”',
      'Patent of the Russian Federation No. 2664708 “Method for disrupting bacterial biofilms and preventing bacterial biofilm formation using an insect antimicrobial peptide complex”',
      'Patent of the Russian Federation No. 2267496 “Antineoplastic and antiviral peptides”',
      'RF patent No. 2338553 “An agent for external use with antiviral activity”',
      'Patent of the Russian Federation No. 2276988 “Antiviral substance”',
      'Patent of the Russian Federation No. 2447896 “Antimicrobial substance”',
      'European patent No. 1705182 “Antineoplastic and antiviral peptides”',
      'US Patent No. 8,372,406 B2 “Antineoplastic and antiviral peptides”',
    ],
    trademarks: ['Allomedin', 'Allostatin', 'Entomix', 'Allofarm', 'FLIP'],
  },
};

function IntellectualProperty({ language }) {
  const text = content[language] || content.ru;

  return (
    <main className="ip-page">
      <section className="ip-hero" aria-labelledby="ip-title">
        <div className="ip-container">
          <h1 id="ip-title" tabIndex={-1}>{text.title}</h1>
          <span className="ip-eyebrow"><i />{text.eyebrow}</span>
        </div>
      </section>

      <section className="ip-content" aria-label={text.title}>
        <div className="ip-container">
          <div className="ip-layout">
            <section className="ip-panel ip-patents" aria-labelledby="ip-patents-title">
              <h2 id="ip-patents-title">{text.patentsTitle}</h2>
              <ol>
                {text.patents.map((patent) => <li key={patent}>{patent}</li>)}
              </ol>
            </section>

            <div className="ip-side-column">
              <section className="ip-panel ip-trademarks" aria-labelledby="ip-trademarks-title">
                <h2 id="ip-trademarks-title">{text.trademarksTitle}</h2>
                <ul>
                  {text.trademarks.map((trademark) => <li key={trademark}>{trademark}</li>)}
                </ul>
              </section>

              <a className="ip-document" href={technicalDocumentation} target="_blank" rel="noreferrer">
                <span className="ip-document-icon" aria-hidden="true">PDF</span>
                <span className="ip-document-copy"><strong>{text.documentationTitle}</strong><small>{text.documentationText}</small></span>
                <span className="ip-document-action">{text.documentationAction}<i aria-hidden="true">↗</i></span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default IntellectualProperty;
