function Chevron() {
  return (
    <svg width="7" height="14" viewBox="0 0 7 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.5 1.5l5 5.5-5 5.5" />
    </svg>
  )
}

export default function CtaArrow() {
  return (
    <span className="cta-arrow" aria-hidden="true">
      <svg className="cta-arrow__single" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
      <span className="cta-arrow__chevrons">
        <Chevron />
        <Chevron />
        <Chevron />
      </span>
    </span>
  )
}
