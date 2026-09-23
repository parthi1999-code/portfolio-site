export default function GlowLines({ className = '', style }) {
  return (
    <span className={`glow-lines ${className}`} style={style} aria-hidden="true">
      <span className="glow-lines__v glow-lines__v--l" />
      <span className="glow-lines__v glow-lines__v--r" />
      <span className="glow-lines__h glow-lines__h--t" />
      <span className="glow-lines__h glow-lines__h--b" />
    </span>
  )
}
