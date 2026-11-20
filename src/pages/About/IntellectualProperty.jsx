import '../../styles/IntellectualProperty.css';

const content = {
  ru: {
    eyebrow: 'Патенты и товарные знаки',
    title: 'Интеллектуальная собственность',
    patentsTitle: 'Патенты',
    trademarksTitle: 'Товарные знаки',
    patents: [
      'Патент РФ № 2751837 «Способ активации цитотоксических лимфоцитов»',
      'Патент РФ № 2664708 «Способ разрушения и предотвращения образования бактериальных биоплёнок комплексом антимикробных пептидов насекомых»',
      'Патент РФ № 2267496 «Противоопухолевые и антивирусные пептиды»',
      'Патент РФ № 2447896 «Антимикробное вещество»',
    ],
    trademarks: ['Алломедин (Allomedin)', 'Аллостатин', 'Энтомикс', 'Аллофарм', 'FLIP', 'ОНКоВир'],
  },
  en: {
    eyebrow: 'Patents and trademarks',
    title: 'Intellectual property',
    patentsTitle: 'Patents',
    trademarksTitle: 'Trademarks',
    patents: [
      'Patent of the Russian Federation No. 2751837 “Method for activation of cytotoxic lymphocytes”',
      'Patent of the Russian Federation No. 2664708 “Method for disrupting bacterial biofilms and preventing bacterial biofilm formation using an insect antimicrobial peptide complex”',
      'Patent of the Russian Federation No. 2267496 “Antineoplastic and antiviral peptides”',
      'Patent of the Russian Federation No. 2447896 “Antimicrobial substance”',
    ],
    trademarks: ['Allomedin', 'Allostatin', 'Entomix', 'Allofarm', 'FLIP', 'ОНКоВир'],
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

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default IntellectualProperty;
