import { useEffect, useRef, useState } from 'react'

export const DURATION_MS = 2400

const TOP_LABEL = 'PARTHI GURU'
const BOTTOM_LABEL = 'PERSONAL WEBSITE'
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const FADE_START_MS = 1900

function useScramble(finalText, startDelay, perCharDelay) {
  const [text, setText] = useState(() =>
    finalText.replace(/[^ ]/g, () => SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)])
  )

  useEffect(() => {
    const start = performance.now() + startDelay
    const id = setInterval(() => {
      const elapsed = performance.now() - start
      const next = finalText
        .split('')
        .map((ch, i) => {
          if (ch === ' ') return ' '
          if (elapsed >= i * perCharDelay + 240) return ch
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
        })
        .join('')
      setText(next)
      if (next === finalText) clearInterval(id)
    }, 40)
    return () => clearInterval(id)
  }, [finalText, startDelay, perCharDelay])

  return text
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
    draw()
    const id = setInterval(draw, 40)

    return () => {
      clearInterval(id)
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
  const top = useScramble(TOP_LABEL, 0, 55)
  const bottom = useScramble(BOTTOM_LABEL, 60, 38)

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
