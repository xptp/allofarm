import document from './assets/souT-allopharm.pdf';
import InterfaceIcon from '../../components/InterfaceIcon';

export default function TechnicalDocumentation() {
  return <main className="ip-page"><section className="ip-content"><div className="ip-container">
    <div className="ip-layout"><section className="ip-panel">
      <h1>СОУТ Аллофарм</h1>
      <p>Документы по специальной оценке условий труда ООО «Аллофарм».</p>
      <a href={document} target="_blank" rel="noreferrer">Открыть PDF <InterfaceIcon name="arrow-up-right" /></a>
    </section></div>
  </div></section></main>;
}

