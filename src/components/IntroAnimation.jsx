import { useEffect, useRef, useState } from 'react'

export const DURATION_MS = 2400

const TOP_LABEL = 'PARTHI GURU'
const BOTTOM_LABEL = 'PERSONAL WEBSITE'
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const FADE_START_MS = 1900

function scrambleChar() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
}

function randomize(text) {
  return text.replace(/[^ ]/g, scrambleChar)
}

function resolveText(finalText, elapsed, perCharDelay) {
  let out = ''
  for (let i = 0; i < finalText.length; i++) {
    const ch = finalText[i]
    out += ch === ' ' ? ' ' : elapsed >= i * perCharDelay + 240 ? ch : scrambleChar()
  }
  return out
}

// Drives both labels off a single requestAnimationFrame loop (instead of two
// independent setInterval timers) so they stay in step with the browser's
// paint cycle -- and everything else competing for the main thread while the
// rest of the page mounts underneath -- rather than ticking on their own
// disconnected 40ms clock.
function useScrambleLabels() {
  const [labels, setLabels] = useState(() => ({
    top: randomize(TOP_LABEL),
    bottom: randomize(BOTTOM_LABEL),
  }))

  useEffect(() => {
    let raf = 0
    let last = 0
    const start = performance.now()
    const topDone = TOP_LABEL.length * 55 + 240
    const bottomStart = 60
    const bottomDone = bottomStart + BOTTOM_LABEL.length * 38 + 240

    const tick = (now) => {
      // throttle to ~25fps -- plenty smooth for a text scramble, a fraction
      // of the work of updating every animation frame
      if (now - last >= 40) {
        last = now
        const elapsed = now - start
        setLabels({
          top: resolveText(TOP_LABEL, elapsed, 55),
          bottom: resolveText(BOTTOM_LABEL, elapsed - bottomStart, 38),
        })
      }
      if (now - start < Math.max(topDone, bottomDone)) {
        raf = requestAnimationFrame(tick)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return labels
}

function Grain() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const TILE = 512

    const tile = document.createElement('canvas')
    tile.width = TILE
    tile.height = TILE
    const tctx = tile.getContext('2d')
    const data = tctx.createImageData(TILE, TILE)
    for (let i = 0; i < data.data.length; i += 4) {
      const g = 6 + Math.random() * 34
      data.data[i] = g
      data.data[i + 1] = g
      data.data[i + 2] = g
      data.data[i + 3] = 255
    }
    tctx.putImageData(data, 0, 0)

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const ox = -Math.floor(Math.random() * TILE)
      const oy = -Math.floor(Math.random() * TILE)
      for (let x = ox; x < canvas.width; x += TILE) {
        for (let y = oy; y < canvas.height; y += TILE) {
          ctx.drawImage(tile, x, y)
        }
      }
    }

    let raf = 0
    let last = 0
    const tick = (now) => {
      if (now - last >= 40) {
        last = now
        draw()
      }
      raf = requestAnimationFrame(tick)
    }
    draw()
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="intro__grain" />
}

function Tile({ flipX, flipY, order }) {
  return (
    <div className="intro__tile" style={{ '--order': order }}>
      <div className="intro__tile-fill">
        <svg
          viewBox="0 0 92 92"
          width="92"
          height="92"
          style={{ transform: `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})` }}
        >
          <path
            d="M36 6 H86 V86 H6 V36 Z"
            fill="#fff"
            stroke="#fff"
            strokeWidth="10"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}

export default function IntroAnimation() {
  const [visible, setVisible] = useState(true)
  const { top, bottom } = useScrambleLabels()

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), DURATION_MS)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="intro" aria-hidden="true" style={{ '--fade-start': `${FADE_START_MS}ms` }}>
      <Grain />

      <span className="intro__corner intro__corner--tl" />
      <span className="intro__corner intro__corner--tr" />
      <span className="intro__corner intro__corner--bl" />
      <span className="intro__corner intro__corner--br" />

      <span className="intro__label intro__label--top">{top}</span>
      <span className="intro__label intro__label--bottom">{bottom}</span>

      <div className="intro__mark">
        <Tile order={0} />
        <Tile order={1} flipX />
        <Tile order={2} flipY />
        <Tile order={3} flipX flipY />
      </div>
    </div>
  )
}
