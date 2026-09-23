import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import NeonRibbon from '../components/NeonRibbon.jsx'
import GlowLines from '../components/GlowLines.jsx'
import ScrambleText from '../components/ScrambleText.jsx'
import CtaArrow from '../components/CtaArrow.jsx'
import Traces from '../components/Traces.jsx'
import AboutText from '../components/AboutText.jsx'
import Reveal from '../components/Reveal.jsx'
import { scrollToSection } from '../components/HomeChrome.jsx'
import { DURATION_MS as INTRO_DURATION_MS } from '../components/IntroAnimation.jsx'
import { projects } from '../data/projects.js'
import { GMAIL_COMPOSE_URL } from '../data/contact.js'

gsap.registerPlugin(ScrollTrigger, SplitText)

const ABOUT_TEXT =
  'I turn complex problems into practical, intuitive products, helping teams ship interfaces people actually understand. With a research-led and detail-obsessed approach, I support the growth of your product, making every design decision more effective and user-focused.'

const EXPERTISE = [
  {
    tag: '001',
    title: 'Product & Dashboard Design',
    text: 'Complex admin tools and dashboards, designed so non-technical teams can run them without training, one system in place of many.',
    Illustration: DashboardIllustration,
  },
  {
    tag: '002',
    title: 'E-Commerce Experiences',
    text: 'Responsive shopping journeys from browse to checkout, built around the brand for direct-to-consumer launches.',
    Illustration: CommerceIllustration,
  },
  {
    tag: '003',
    title: 'Website Redesign',
    text: 'Clearer structure, stronger hierarchy and trust-building visuals that make credible brands easy to navigate.',
    Illustration: WebsiteIllustration,
  },
]

function riseDelay(offset) {
  const remaining = Math.max(0, INTRO_DURATION_MS - 450 - performance.now()) / 1000
  return `${(remaining + offset).toFixed(2)}s`
}

function Rise({ children, offset = 0 }) {
  return (
    <span className="hm-rise">
      <span style={{ animationDelay: riseDelay(offset) }}>{children}</span>
    </span>
  )
}

function Hero() {
  return (
    <section id="hero" className="hm-hero" data-nav="hero" data-theme="dark">
      <NeonRibbon />
      <p className="hm-hero__tagline" style={{ animationDelay: riseDelay(0.5) }}>
        From <span className="dim">research</span> to <span className="dim">release</span>, I design
        clear, usable products that turn <span className="dim">complex</span> workflows into{' '}
        <span className="dim">simple</span> experiences.
      </p>
      <h1 className="hm-hero__title">
        <Rise>Product and</Rise>
        <Rise offset={0.12}>UX Designer</Rise>
      </h1>
      <GlowLines className="glow-lines--auto hm-hero__glowlines" style={{ '--gl-delay': riseDelay(0.9) }} />
    </section>
  )
}

const CELL = 120

function useGridSize() {
  const calc = () => ({
    cols: Math.ceil(window.innerWidth / CELL),
    rows: Math.ceil(window.innerHeight / CELL),
  })
  const [size, setSize] = useState(calc)

  useEffect(() => {
    let timer
    const onResize = () => {
      clearTimeout(timer)
      timer = setTimeout(() => setSize(calc()), 200)
    }
    window.addEventListener('resize', onResize)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return size
}

function About({ cols, rows }) {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const fillRef = useRef(null)

  useEffect(() => {
    const cells = gridRef.current.children
    const mm = gsap.matchMedia()
    mm.add('(min-width: 901px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=160%',
          pin: true,
          scrub: true,
          onUpdate: (self) =>
            window.dispatchEvent(
              new CustomEvent('hm-theme', { detail: self.progress > 0.72 ? 'dark' : 'light' }),
            ),
        },
      })
      tl.addLabel('dissolve', 0.7)
      tl.fromTo(
        cells,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.001, ease: 'none', stagger: { amount: 0.9, from: 'random' } },
        'dissolve',
      )
      tl.fromTo(fillRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.001, ease: 'none' }, '>')
      tl.fromTo(
        sectionRef.current,
        { backgroundColor: '#faf5f5' },
        { backgroundColor: '#111111', duration: 0.001, ease: 'none', immediateRender: false },
        '>',
      )
      return () => tl.scrollTrigger?.kill()
    })
    return () => mm.revert()
  }, [cols, rows])

  return (
    <section ref={sectionRef} id="about" className="hm-about" data-nav="about" data-theme="light">
      <Traces />
      <AboutText text={ABOUT_TEXT} />
      <div ref={fillRef} className="hm-pixels-fill" aria-hidden="true" />
      <div
        ref={gridRef}
        className="hm-pixels"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${CELL}px)`,
          gridTemplateRows: `repeat(${rows}, ${CELL}px)`,
        }}
        aria-hidden="true"
      >
        {Array.from({ length: cols * rows }).map((_, i) => (
          <span key={i} />
        ))}
      </div>
    </section>
  )
}
const GREEN_RGB = '98, 225, 122'
const MAIN_TRACK = [[0.6, 0.055, 0.463], [4.2, 0.597, 0.632], [6.6, 0.692, 0.537], [7.6, 0.593, 0.414], [8.6, 0.578, 0.459], [10, 0.544, 0.49]]
const NET_NODES = [
  { label: 'Testing', ay: 0.38, bend: -70, track: [[2.4, 0.16, 0.16], [4.2, 0.323, 0.248], [6.6, 0.27, 0.415], [7.6, 0.403, 0.63], [8.6, 0.418, 0.646], [10, 0.544, 0.49]] },
  { label: 'Strategy', ay: 0.52, bend: 45, track: [[2.2, 0.1, 0.34], [4.2, 0.265, 0.308], [6.6, 0.414, 0.452], [7.6, 0.492, 0.65], [8.6, 0.485, 0.535], [10, 0.544, 0.49]] },
  { label: 'Research', ay: 0.68, bend: -30, track: [[2.6, 0.06, 0.72], [4.2, 0.15, 0.663], [6.6, 0.284, 0.545], [7.6, 0.43, 0.39], [8.6, 0.407, 0.449], [10, 0.544, 0.49]] },
]

function sampleTrack(track, t) {
  const n = track.length
  if (t <= track[0][0]) return [track[0][1], track[0][2]]
  if (t >= track[n - 1][0]) return [track[n - 1][1], track[n - 1][2]]
  let i = 0
  while (i < n - 2 && t > track[i + 1][0]) i++
  const a = track[i]
  const b = track[i + 1]
  const dt = b[0] - a[0]
  const s = (t - a[0]) / dt
  const slope = (p, q) => [(q[1] - p[1]) / (q[0] - p[0]), (q[2] - p[2]) / (q[0] - p[0])]
  const m0 = i === 0 ? [0, 0] : slope(track[i - 1], b)
  const m1 = i + 2 >= n ? [0, 0] : slope(a, track[i + 2])
  const h00 = 2 * s ** 3 - 3 * s ** 2 + 1
  const h10 = s ** 3 - 2 * s ** 2 + s
  const h01 = -2 * s ** 3 + 3 * s ** 2
  const h11 = s ** 3 - s ** 2
  return [
    h00 * a[1] + h10 * dt * m0[0] + h01 * b[1] + h11 * dt * m1[0],
    h00 * a[2] + h10 * dt * m0[1] + h01 * b[2] + h11 * dt * m1[1],
  ]
}

function Network() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const labelRefs = useRef([])
  const textRef = useRef(null)
  const ctaTitleRef = useRef(null)
  const ctaTextRef = useRef(null)
  const ctaBtnRef = useRef(null)
  const ctaScrambleRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx2d = canvas.getContext('2d')
    let W = 0
    let H = 0
    let dpr = 1
    let cancelled = false
    let ctx
    let timeline = null
    const splits = []

    const state = {
      main: { x: MAIN_TRACK[0][1], y: MAIN_TRACK[0][2], a: 0, la: 1, white: 0, r: 13 },
      nodes: NET_NODES.map((n) => ({ x: n.track[0][1], y: n.track[0][2], a: 0, da: 1, la: 1 })),
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = canvas.clientWidth
      H = canvas.clientHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      draw()
    }

    const line = (ay, bend, node, alphaScale) => {
      const a = node.a * alphaScale
      if (a <= 0.01) return
      const x = node.x * W
      const y = node.y * H
      const g = ctx2d.createLinearGradient(0, 0, Math.max(x, 1), 0)
      g.addColorStop(0, `rgba(${GREEN_RGB}, ${(0.12 * a).toFixed(3)})`)
      g.addColorStop(1, `rgba(${GREEN_RGB}, ${(0.95 * a).toFixed(3)})`)
      ctx2d.strokeStyle = g
      ctx2d.lineWidth = 1.5
      ctx2d.beginPath()
      ctx2d.moveTo(0, ay * H)
      ctx2d.bezierCurveTo(x * 0.42, ay * H + bend, x * 0.7, y + bend * 0.55, x, y)
      ctx2d.stroke()
    }

    const dot = (node, r, white) => {
      if (node.a <= 0.01) return
      const c = (v) => Math.round(v + (255 - v) * white)
      ctx2d.save()
      ctx2d.globalAlpha = node.a * (node.da ?? 1)
      ctx2d.shadowColor = `rgba(${GREEN_RGB}, 0.9)`
      ctx2d.shadowBlur = r > 6 ? 14 : 6
      ctx2d.fillStyle = `rgb(${c(98)}, ${c(225)}, ${c(122)})`
      ctx2d.beginPath()
      ctx2d.arc(node.x * W, node.y * H, r, 0, Math.PI * 2)
      ctx2d.fill()
      ctx2d.restore()
    }

    const place = (i, node, r) => {
      const el = labelRefs.current[i]
      if (!el) return
      el.style.opacity = String(Math.min(node.a, node.la))
      el.style.transform = `translate(${node.x * W}px, ${node.y * H - r - 10}px) translate(-50%, -100%)`
    }

    function draw() {
      if (!W) return
      const time = timeline ? timeline.time() : 0
      ;[state.main.x, state.main.y] = sampleTrack(MAIN_TRACK, time)
      NET_NODES.forEach((n, i) => {
        ;[state.nodes[i].x, state.nodes[i].y] = sampleTrack(n.track, time)
      })
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx2d.clearRect(0, 0, W, H)
      const trail = (track, node) => {
        const back = sampleTrack(track, Math.max(time - 0.22, 0))
        return Math.max(-230, Math.min(230, (back[1] - node.y) * H * 2.1))
      }
      NET_NODES.forEach((n, i) => line(n.ay, trail(n.track, state.nodes[i]) + n.bend * 0.35, state.nodes[i], 1))
      line(0.46, trail(MAIN_TRACK, state.main) + 20, state.main, 1)
      state.nodes.forEach((n) => dot(n, 3.5, 0))
      dot(state.main, state.main.r, state.main.white)
      state.nodes.forEach((n, i) => place(i + 1, n, 3.5))
      place(0, state.main, state.main.r)
    }

    resize()
    window.addEventListener('resize', resize)

    document.fonts.ready.then(() => {
      if (cancelled) return
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: 'sine.inOut' },
          onUpdate: draw,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=420%',
            pin: true,
            scrub: true,
            anticipatePin: 1,
          },
        })

        timeline = tl
        tl.to(state.main, { a: 1, duration: 0.8, ease: 'none' }, 0.2)
        NET_NODES.forEach((n, i) => {
          tl.to(state.nodes[i], { a: 1, duration: 0.6, ease: 'none' }, n.track[0][0])
        })
        tl.to([state.main, ...state.nodes], { la: 0, duration: 1, ease: 'none' }, 8.8)
        tl.to(state.main, { white: 1, r: 9, duration: 0.8 }, 9.4)
        tl.to(state.nodes, { da: 0, duration: 0.3, ease: 'none' }, 10)
        if (window.innerWidth <= 1024) {
          tl.to(canvasRef.current, { opacity: 0, duration: 1, ease: 'none' }, 9.6)
        }

        const text = new SplitText(textRef.current, { type: 'words' })
        const title = new SplitText(ctaTitleRef.current, { type: 'words' })
        const sub = new SplitText(ctaTextRef.current, { type: 'words' })
        splits.push(text, title, sub)
        const rnd = (amount) => ({ amount, from: 'random' })
        tl.fromTo(text.words, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'none', stagger: rnd(1.4) }, 0.5)
        tl.fromTo(text.words, { opacity: 1 }, { opacity: 0, duration: 0.3, ease: 'none', stagger: rnd(1.2), immediateRender: false }, 8.4)
        tl.fromTo(title.words, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'none', stagger: rnd(0.8) }, 10)
        tl.fromTo(sub.words, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'none', stagger: rnd(1) }, 10.4)
        tl.fromTo(ctaBtnRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, ease: 'none' }, 11.2)

        tl.to(stageRef.current, { yPercent: -100, duration: 2, ease: 'power1.in' }, 12.6)
        tl.to({}, { duration: 0.2 }, 14.6)
      }, sectionRef)
    })

    return () => {
      cancelled = true
      window.removeEventListener('resize', resize)
      if (ctx) ctx.revert()
      splits.forEach((s) => s.revert())
    }
  }, [])

  return (
    <section ref={sectionRef} id="network" className="hm-net" data-nav="about" data-theme="dark">
      <div ref={stageRef} className="hm-net__stage">
        <canvas ref={canvasRef} className="hm-net__canvas" aria-hidden="true" />
        {['Design', ...NET_NODES.map((n) => n.label)].map((label, i) => (
          <span key={label} ref={(el) => (labelRefs.current[i] = el)} className="hm-net__label" aria-hidden="true">
            {label}
          </span>
        ))}
        <p ref={textRef} className="hm-net__text">
          I <span className="dim">turn</span> complex problems <span className="dim">into</span>{' '}
          intuitive interfaces, making products <span className="dim">clear</span> and accessible{' '}
          <span className="dim">for</span> fast, confident decisions.
        </p>
        <div className="hm-net__cta">
          <h3 ref={ctaTitleRef}>
            Your next product starts <span className="hm-glow">now.</span>
          </h3>
          <p ref={ctaTextRef}>
            Your users deserve clarity. I turn complex problems into clear flows and considered
            interfaces that get used.
          </p>
          <a
            ref={ctaBtnRef}
            className="hm-btn"
            href={GMAIL_COMPOSE_URL}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => ctaScrambleRef.current?.start()}
            onMouseLeave={() => ctaScrambleRef.current?.reset()}
          >
            <GlowLines />
            <ScrambleText ref={ctaScrambleRef} text="Get in touch" />
            <span className="hm-btn__arrow" aria-hidden="true">
              <CtaArrow />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
const DASH_CURVE = 'M60 178 C 130 168, 170 124, 240 108 S 350 72, 412 44'

function DashboardIllustration() {
  const bars = [[76, 50], [136, 80], [196, 68], [256, 110], [316, 96], [376, 134]]
  return (
    <svg viewBox="0 0 472 240" className="hm-illus" aria-hidden="true">
      <path d="M50 30 V205 H430" />
      {bars.map(([x, h], i) => (
        <rect key={x} className="hm-anim-bar" style={{ '--i': i }} x={x} y={200 - h} width="34" height={h} />
      ))}
      <path d={DASH_CURVE} pathLength="1" className="hm-illus__curve hm-anim-draw" />
      <circle cx="240" cy="108" r="4" className="hm-illus__dot hm-anim-pulse" style={{ '--i': 0 }} />
      <circle cx="412" cy="44" r="6" className="hm-illus__dot hm-illus__dot--big hm-anim-pulse" style={{ '--i': 1 }} />
      <circle r="4.5" className="hm-illus__dot hm-anim-travel" style={{ offsetPath: `path('${DASH_CURVE}')` }} />
    </svg>
  )
}

function CommerceIllustration() {
  const xs = [70, 190, 310]
  return (
    <svg viewBox="0 0 472 240" className="hm-illus" aria-hidden="true">
      {xs.map((x, i) => (
        <g key={x}>
          <rect x={x} y="52" width="92" height="110" className="hm-anim-hl" style={{ '--i': i }} />
          <circle cx={x + 46} cy="98" r="18" className="hm-anim-pulse hm-anim-pulse--soft" style={{ '--i': i }} />
          <path d={`M${x} 182 H${x + 92}`} className="hm-anim-line" style={{ '--i': i }} />
          <path d={`M${x} 198 H${x + 60}`} className="hm-anim-line" style={{ '--i': i + 0.5 }} />
          <circle
            r="3.5"
            className="hm-illus__dot hm-anim-cart"
            style={{ '--i': i, offsetPath: `path('M${x + 46} 98 Q ${x + 160} -20 402 44')` }}
          />
        </g>
      ))}
      <circle cx="402" cy="44" r="5" className="hm-illus__dot hm-anim-pulse" style={{ '--i': 0 }} />
    </svg>
  )
}

function WebsiteIllustration() {
  return (
    <svg viewBox="0 0 472 240" className="hm-illus" aria-hidden="true">
      <rect x="78" y="28" width="316" height="184" />
      <path d="M78 54 H394" />
      <circle cx="94" cy="41" r="3" className="hm-illus__dot" />
      <circle cx="108" cy="41" r="3" />
      <circle cx="122" cy="41" r="3" />
      <rect x="98" y="72" width="276" height="52" />
      <rect x="98" y="140" width="84" height="56" className="hm-anim-hl" style={{ '--i': 0 }} />
      <rect x="194" y="140" width="84" height="56" className="hm-anim-hl" style={{ '--i': 1 }} />
      <rect x="290" y="140" width="84" height="56" className="hm-anim-hl" style={{ '--i': 2 }} />
      <path d="M116 98 H210" className="hm-illus__curve hm-anim-line hm-anim-line--type" />
      <path d="M116 108 H170" className="hm-anim-line hm-anim-line--type" style={{ '--i': 1 }} />
      <polygon points="0,0 0,14 4,11 8,18 11,16 7,10 12,10" className="hm-illus__dot hm-anim-cursor" />
    </svg>
  )
}
function Expertise({ cols, rows }) {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const fillRef = useRef(null)

  useEffect(() => {
    const cells = gridRef.current.children
    const mm = gsap.matchMedia()
    mm.add('(min-width: 901px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'bottom bottom',
          end: '+=200%',
          pin: true,
          scrub: true,
          onUpdate: (self) =>
            window.dispatchEvent(
              new CustomEvent('hm-theme', { detail: self.progress > 0.78 ? 'light' : 'dark' }),
            ),
        },
      })
      tl.addLabel('dissolve', 1.1)
      tl.fromTo(
        cells,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.001, ease: 'none', stagger: { amount: 0.9, from: 'random' } },
        'dissolve',
      )
      tl.fromTo(fillRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.001, ease: 'none' }, '>')
      return () => tl.scrollTrigger?.kill()
    })
    return () => mm.revert()
  }, [cols, rows])

  return (
    <section ref={sectionRef} id="expertise" className="hm-expertise" data-nav="expertise" data-theme="dark">
      <Traces />
      <div className="hm-dissolve" aria-hidden="true">
        <div ref={fillRef} className="hm-dissolve__fill" />
        <div
          ref={gridRef}
          className="hm-pixels hm-pixels--light"
          style={{
            gridTemplateColumns: `repeat(${cols}, ${CELL}px)`,
            gridTemplateRows: `repeat(${rows}, ${CELL}px)`,
          }}
        >
          {Array.from({ length: cols * rows }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
      </div>
      <div className="hm-expertise__head">
        <Reveal as="h2" className="hm-h2">
          I design end-to-end digital products.
        </Reveal>
        <Reveal as="p" className="hm-lead">
          From research and flows to high-fidelity screens and developer handoff, I shape products
          that are as clear to use as they are considered in detail.
        </Reveal>
      </div>
      <div className="hm-cards">
        {EXPERTISE.map(({ tag, title, text, Illustration }) => (
          <Reveal key={tag} className="hm-card">
            <span className="hm-card__corner hm-card__corner--tl" />
            <span className="hm-card__corner hm-card__corner--tr" />
            <span className="hm-card__corner hm-card__corner--bl" />
            <span className="hm-card__corner hm-card__corner--br" />
            <div className="hm-card__frame">
              <Illustration />
            </div>
            <div className="hm-card__title-row">
              <h3>{title}</h3>
              <span className="hm-card__tag">[{tag}]</span>
            </div>
            <p>{text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

const SWEEP = Array.from({ length: 64 }, (_, i) => ({
  din: Math.round(i * 6 + ((i * 7919) % 5) * 4),
  dout: Math.round(i * 6 + ((i * 104729) % 5) * 4),
}))

function Work() {
  const list = projects.filter((p) => p.cover)

  return (
    <section id="work" className="hm-work" data-nav="work" data-theme="light">
      <div className="hm-work__head">
        <Reveal as="h2" className="hm-h2">
          Selected works over the years.
        </Reveal>
        <Reveal as="p" className="hm-lead">
          Every project starts with a real problem. Explore how I turned complexity into clear,
          usable products.
        </Reveal>
      </div>
      <ul className="hm-rows">
        {list.map((p, i) => (
          <li key={p.slug}>
            <Link to={`/work/${p.slug}`} className="hm-row">
              <span className="hm-row__sweep" aria-hidden="true">
                {SWEEP.map((d, i) => (
                  <i key={i} style={{ '--din': `${d.din}ms`, '--dout': `${d.dout}ms` }} />
                ))}
              </span>
              <span className="hm-row__index">{String(i + 1).padStart(2, '0')}</span>
              <span className="hm-row__title">{p.title}</span>
              <span className="hm-row__year">{p.year ? `[${p.year}]` : ''}</span>
              <span className="hm-row__cat">{p.category}</span>
              <span className="hm-row__arrow" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

function ContactCta() {
  const rootRef = useRef(null)
  const tintRef = useRef(null)
  const ringRefs = useRef([])
  const titleRef = useRef(null)
  const textRef = useRef(null)
  const btnRef = useRef(null)
  const scrambleRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    let ctx
    const splits = []
    document.fonts.ready.then(() => {
      if (cancelled || !rootRef.current) return
      ctx = gsap.context(() => {
        const title = new SplitText(titleRef.current, { type: 'words' })
        const text = new SplitText(textRef.current, { type: 'words' })
        splits.push(title, text)

        gsap.set(title.words, { opacity: 0 })
        gsap.set(text.words, { opacity: 0 })
        gsap.set(btnRef.current, { clipPath: 'inset(0 0 100% 0)' })
        gsap.set(tintRef.current, { opacity: 0 })
        gsap.set(ringRefs.current, { opacity: 0, scale: 0.5 })

        const tl = gsap.timeline({
          paused: true,
          scrollTrigger: { trigger: rootRef.current, start: 'top 55%', once: true, onEnter: () => tl.play() },
        })
        tl.to(tintRef.current, { opacity: 1, duration: 0.5, ease: 'power1.out' }, 0)
        tl.to(tintRef.current, { opacity: 0, duration: 2.2, ease: 'power1.inOut' }, 0.7)
        ringRefs.current.forEach((ring, i) => {
          tl.to(ring, { opacity: 0.7, duration: 0.5, ease: 'none' }, 0.1 + i * 0.22)
          tl.to(ring, { scale: 3.6 + i * 0.5, duration: 3.4, ease: 'power2.out' }, 0.1 + i * 0.22)
          tl.to(ring, { opacity: 0, duration: 1.4, ease: 'power1.in' }, 1.9 + i * 0.3)
        })
        tl.to(title.words, { opacity: 1, duration: 0.35, ease: 'none', stagger: 0.16 }, 0.5)
        tl.to(text.words, { opacity: 1, duration: 0.3, ease: 'none', stagger: 0.05 }, 1.3)
        tl.to(btnRef.current, { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power2.out' }, 2)
      }, rootRef)
    })
    return () => {
      cancelled = true
      if (ctx) ctx.revert()
      splits.forEach((s) => s.revert())
    }
  }, [])

  return (
    <div ref={rootRef} className="hm-cta" data-nav="contact" data-theme="dark">
      <div ref={tintRef} className="hm-cta__tint" aria-hidden="true" />
      {[0, 1, 2].map((i) => (
        <span key={i} ref={(el) => (ringRefs.current[i] = el)} className="hm-ring" aria-hidden="true" />
      ))}
      <h2 ref={titleRef} className="hm-cta__title">
        Let&apos;s build something <span className="hm-glow">great</span>
      </h2>
      <p ref={textRef} className="hm-cta__text">
        Your users already know what they need. You just need the right design to answer it.
      </p>
      <a
        ref={btnRef}
        className="hm-btn"
        href={GMAIL_COMPOSE_URL}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => scrambleRef.current?.start()}
        onMouseLeave={() => scrambleRef.current?.reset()}
      >
        <GlowLines />
        <ScrambleText ref={scrambleRef} text="Get in touch" />
        <span className="hm-btn__arrow" aria-hidden="true">
          <CtaArrow />
        </span>
      </a>
    </div>
  )
}

function Contact() {
  return (
    <section id="contact" className="hm-contact">
      <ContactCta />
    </section>
  )
}

export default function Home() {
  const location = useLocation()
  const { cols, rows } = useGridSize()

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
      })
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        scrollToSection(id)
      })
    })
    return () => cancelAnimationFrame(raf)
  }, [location])

  return (
    <div className="home hm" id="top">
      <Hero />
      <About cols={cols} rows={rows} />
      <Network />
      <Expertise cols={cols} rows={rows} />
      <Work />
      <Contact />
    </div>
  )
}
