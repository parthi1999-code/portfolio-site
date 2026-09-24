import { EMAIL, LINKEDIN, RESUME_URL } from '../data/contact.js'

const ARROW_CELLS = [
  [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4],
  [3, 0], [4, 1], [5, 2], [6, 3],
  [3, 8], [4, 7], [5, 6], [6, 5],
]

function PixelArrow() {
  return (
    <svg className="hm-marquee__arrow" viewBox="0 0 8.6 8.6" aria-hidden="true">
      {ARROW_CELLS.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x + 0.06} y={y + 0.06} width="0.88" height="0.88" />
      ))}
    </svg>
  )
}

const MARQUEE_ITEMS = Array.from({ length: 6 })

export default function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <div className="hm-footer" data-nav="footer" data-theme="dark">
      <div className="hm-footer__floor" aria-hidden="true">
        <div className="hm-footer__grid" />
      </div>

      <div className="hm-marquee" aria-hidden="true">
        <div className="hm-marquee__track">
          {MARQUEE_ITEMS.map((_, i) => (
            <span key={i} className="hm-marquee__item">
              <PixelArrow />
              <span>Work with me</span>
            </span>
          ))}
        </div>
      </div>

      <div className="hm-footer__body">
        <div className="hm-footer__info">
          <h4>Contact information</h4>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={RESUME_URL} target="_blank" rel="noreferrer">Resume</a>
        </div>
      </div>

      <div className="hm-footer__legal">
        <span>© {year} Parthi Guru. All rights reserved.</span>
        <span>UX Designer @e4</span>
      </div>
    </div>
  )
}
