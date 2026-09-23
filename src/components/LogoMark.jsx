const TILE = 'M36 6 H86 V86 H6 V36 Z'

export default function LogoMark({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 198 198" fill="currentColor" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="10" strokeLinejoin="round">
        <path d={TILE} />
        <path d={TILE} transform="translate(198 0) scale(-1 1)" />
        <path d={TILE} transform="translate(0 198) scale(1 -1)" />
        <path d={TILE} transform="translate(198 198) scale(-1 -1)" />
      </g>
    </svg>
  )
}
