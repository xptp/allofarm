const paths = {
  'arrow-up-right': <><path d="M6 18 18 6" /><path d="M8 6h10v10" /></>,
  'arrow-right': <><path d="M4 12h15" /><path d="m13 6 6 6-6 6" /></>,
  'chevron-right': <path d="m9 5 7 7-7 7" />,
  'chevron-left': <path d="m15 5-7 7 7 7" />,
  download: <><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 20h14" /></>,
};

export default function InterfaceIcon({ name, className = '', expanded }) {
  if (name === 'toggle') {
    return <svg className={`ui-icon ${className}`} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" focusable="false">
      <path d="M4 10h12" />
      {!expanded && <path d="M10 4v12" />}
    </svg>;
  }

  return <svg className={`ui-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {paths[name]}
  </svg>;
}
