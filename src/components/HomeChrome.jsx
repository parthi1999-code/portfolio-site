import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import LogoMark from './LogoMark.jsx'
import { RESUME_URL } from '../data/contact.js'

export const HOME_NAV = [
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]

export function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  const smoother = ScrollSmoother.get()
  if (smoother) smoother.scrollTo(el, true, 'top top')
  else el.scrollIntoView({ behavior: 'smooth' })
}

const QUICK_NAV = [
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'work', label: 'Works' },
  { id: 'contact', label: 'Contact us' },
]

const PIXEL_ARROW_CELLS = [
  [3, 0], [4, 0],
  [2, 1], [3, 1], [4, 1], [5, 1],
  [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2],
  [3, 3], [4, 3],
  [3, 4], [4, 4],
  [3, 5], [4, 5],
  [3, 6], [4, 6],
]

function PixelArrowIcon() {
  return (
    <svg className="hm-quicknav__icon" viewBox="0 0 8 7" aria-hidden="true">
      {PIXEL_ARROW_CELLS.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />
      ))}
    </svg>
  )
}

export default function HomeChrome() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [active, setActive] = useState('')
  const [theme, setTheme] = useState('dark')
  const [inFooter, setInFooter] = useState(false)
  const [topHidden, setTopHidden] = useState(false)

  useEffect(() => {
    setActive('')
    setTopHidden(false)
    setTheme(location.pathname.startsWith('/work/') || location.pathname === '/about' ? 'light' : 'dark')
  }, [location.pathname])

  useEffect(() => {
    let triggers = []
    const raf = requestAnimationFrame(() => {
      if (isHome) {
        const sections = document.querySelectorAll('[data-nav]')
        triggers = Array.from(sections).map((el) => {
          if (el.dataset.nav === 'footer') {
            return ScrollTrigger.create({
              trigger: el,
              start: 'top 95%',
              end: 'bottom top',
              onToggle: (self) => setInFooter(self.isActive),
            })
          }
          return ScrollTrigger.create({
            trigger: el,
            start: 'top 50%',
            end: 'bottom 50%',
            onToggle: (self) => {
              if (!self.isActive) return
              setActive(el.dataset.nav)
              setTheme(el.dataset.theme || 'dark')
            },
          })
        })
      } else {
        const footer = document.querySelector('[data-nav="footer"]')
        if (footer) {
          triggers.push(
            ScrollTrigger.create({
              trigger: footer,
              start: 'top 95%',
              end: 'bottom top',
              onToggle: (self) => setInFooter(self.isActive),
            }),
          )
        }
      }

      const marquee = document.querySelector('.hm-marquee')
      if (marquee) {
        triggers.push(
          ScrollTrigger.create({
            trigger: marquee,
            start: 'top 17%',
            end: 'max',
            onUpdate: (self) => setTopHidden(self.progress > 0),
          }),
        )
      }
      ScrollTrigger.refresh()
    })
    return () => {
      cancelAnimationFrame(raf)
      triggers.forEach((t) => t.kill())
    }
  }, [isHome, location.pathname])

  useEffect(() => {
    if (!isHome) return
    const onTheme = (e) => setTheme(e.detail)
    window.addEventListener('hm-theme', onTheme)
    return () => window.removeEventListener('hm-theme', onTheme)
  }, [isHome])

  return (
    <div className={`hm-chrome hm-chrome--${theme}${topHidden ? ' hm-chrome--top-hidden' : ''}`}>
      <div className="hm-chrome__top">
        <Link
          to="/"
          className="hm-chrome__logo"
          onClick={(e) => {
            if (!isHome) return
            e.preventDefault()
            const smoother = ScrollSmoother.get()
            if (smoother) smoother.scrollTo(0, true)
            else window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          aria-label="Back to top"
        >
          <LogoMark size={38} />
        </Link>
        <nav className="hm-chrome__links">
          <Link to="/about">About me</Link>
          <a href={RESUME_URL} target="_blank" rel="noreferrer">Resume</a>
        </nav>
      </div>

      {isHome && (
        <nav
          className={`hm-chrome__nav${active && active !== 'hero' && !inFooter ? ' is-visible' : ''}`}
          aria-label="Sections"
        >
          {HOME_NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`hm-chrome__nav-item${active === item.id ? ' is-active' : ''}`}
              onClick={() => scrollToSection(item.id)}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      )}

      {isHome && (
        <div className={`hm-quicknav${inFooter ? ' is-visible' : ''}`}>
          <button type="button" className="hm-quicknav__btn" aria-label="Quick navigation">
            <PixelArrowIcon />
          </button>
          <nav className="hm-quicknav__menu" aria-label="Quick navigation">
            {QUICK_NAV.map((item) => (
              <button key={item.id} type="button" onClick={() => scrollToSection(item.id)}>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}
