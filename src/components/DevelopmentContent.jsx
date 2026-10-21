import { localizeDevelopmentLink } from '../pages/developments/navigation';
import InterfaceIcon from './InterfaceIcon';

export default function DevelopmentContent({ content, language }) {
  return <>
    {content.images?.length > 0 && <div className={`development-images${content.images.length > 1 ? ' development-gallery' : ''}`}>
      {content.images.map((image, index) => <a href={image.src} target="_blank" rel="noreferrer" key={image.src} aria-label={image.alt}>
        <img src={image.src} alt={image.alt} loading={index === 0 ? 'eager' : 'lazy'} />
      </a>)}
    </div>}
    <div className="development-facts">
      {content.sections.map((section, index) => {
        const href = section.document ? section.href : localizeDevelopmentLink(section.href, language);
        const external = section.document || (href && !href.startsWith('/'));
        return <section className="development-fact" key={`${section.title}-${index}`}>
          <span className="development-fact-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <div>
            <h2>{href ? <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>{section.title}<InterfaceIcon name="arrow-up-right" className="development-link-arrow" /></a> : section.title}</h2>
            {section.list ? <ul>{section.paragraphs.map(text => <li key={text}>{text.replace(/^[-–]\s*/, '')}</li>)}</ul>
              : section.paragraphs.map(text => <p key={text}>{text}</p>)}
          </div>
        </section>;
      })}
    </div>
    {content.groups?.length > 0 && <div className="development-spectrum">
      {content.groups.map(group => <section key={group.title}>
        <h3>{group.title}</h3>
        {group.families.map(family => <details key={family.title}>
          <summary>{family.title}</summary>
          <ul>{family.items.map(item => <li key={item}>{item}</li>)}</ul>
        </details>)}
      </section>)}
    </div>}
    {content.figure && <figure className="development-figure">
      <a href={content.figure.src} target="_blank" rel="noreferrer"><img src={content.figure.src} alt={content.figure.alt} loading="lazy" /></a>
      <figcaption>{content.figure.caption}</figcaption>
    </figure>}
  </>;
}
