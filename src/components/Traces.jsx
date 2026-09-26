import { useEffect, useRef } from 'react'

const GLOW = 226

export default function Traces({ className = 'hm-about__traces' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const section = canvas.parentElement
    const ctx = canvas.getContext('2d')
    const LIFE = 1500
    let boxes = []
    let lastKey = ''
    let raf = 0

    let dpr = 1
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = section.clientWidth * dpr
      canvas.height = section.clientHeight * dpr
    }

    const glowLine = (x1, y1, x2, y2, a, from, to, vertical) => {
      const g = vertical ? ctx.createLinearGradient(0, y1, 0, y2) : ctx.createLinearGradient(x1, 0, x2, 0)
      const len = vertical ? y2 - y1 : x2 - x1
      const s = Math.min(Math.max((from - (vertical ? y1 : x1)) / len, 0), 1)
      const e = Math.min(Math.max((to - (vertical ? y1 : x1)) / len, 0), 1)
      g.addColorStop(0, 'rgba(47, 95, 255, 0)')
      g.addColorStop(s, `rgba(47, 95, 255, ${a.toFixed(3)})`)
      g.addColorStop(e, `rgba(47, 95, 255, ${a.toFixed(3)})`)
      g.addColorStop(1, 'rgba(47, 95, 255, 0)')
      ctx.strokeStyle = g
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
    }

    const draw = (now) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      boxes = boxes.filter((b) => now - b.t < LIFE)
      ctx.lineWidth = 0.2
      ctx.shadowColor = 'rgba(47, 95, 255, 0.7)'
      ctx.shadowBlur = 3 * dpr
      boxes.forEach((b) => {
        const a = 1 - (now - b.t) / LIFE
        const { x0, y0, ext } = b
        const x1 = x0 + GLOW
        const y1 = y0 + GLOW
        glowLine(x0, y0 - ext[0], x0, y1 + ext[1], a, y0, y1, true)
        glowLine(x1, y0 - ext[2], x1, y1 + ext[3], a, y0, y1, true)
        glowLine(x0 - ext[4], y0, x1 + ext[5], y0, a, x0, x1, false)
        glowLine(x0 - ext[6], y1, x1 + ext[7], y1, a, x0, x1, false)
      })
      raf = boxes.length ? requestAnimationFrame(draw) : 0
    }

    const onMove = (e) => {
      const r = section.getBoundingClientRect()
      const x0 = Math.floor((e.clientX - r.left) / GLOW) * GLOW
      const y0 = Math.floor((e.clientY - r.top) / GLOW) * GLOW
      const key = `${x0}:${y0}`
      if (key === lastKey) return
      lastKey = key
      const ext = Array.from({ length: 8 }, () => 60 + Math.random() * 260)
      boxes.push({ x0, y0, ext, t: performance.now() })
      if (!raf) raf = requestAnimationFrame(draw)
    }
    const onLeave = () => {
      lastKey = ''
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(section)
    section.addEventListener('mousemove', onMove)
    section.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      section.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
