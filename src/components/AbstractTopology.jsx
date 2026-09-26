import { useEffect, useRef } from 'react'

const GREEN = '102, 255, 140'
const NODE_COUNT = 34
const LINK_DIST = 0.24

function rand(seed) {
  // deterministic-ish PRNG so a given node's motion stays stable across renders
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

export default function AbstractTopology() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let raf = 0
    const start = performance.now()

    const rng = rand(1337)
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: rng(),
      y: rng(),
      z: rng(),
      fx: 0.12 + rng() * 0.16,
      fy: 0.1 + rng() * 0.18,
      ax: 0.03 + rng() * 0.05,
      ay: 0.03 + rng() * 0.05,
      phase: rng() * Math.PI * 2,
    }))

    const isInView = () => {
      const rect = canvas.getBoundingClientRect()
      return rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (now) => {
      if (!isInView()) {
        raf = reduced ? 0 : requestAnimationFrame(draw)
        return
      }

      const t = (now - start) / 1000
      ctx.clearRect(0, 0, width, height)

      const pts = nodes.map((n) => {
        const drift = reduced ? 0 : 1
        const px = n.x + Math.sin(t * n.fx + n.phase) * n.ax * drift
        const py = n.y + Math.cos(t * n.fy + n.phase * 1.3) * n.ay * drift
        const depth = 0.55 + n.z * 0.45
        return { x: px * width, y: py * height, z: n.z, depth }
      })

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i]
          const b = pts[j]
          const dx = (a.x - b.x) / width
          const dy = (a.y - b.y) / height
          const dist = Math.hypot(dx, dy)
          if (dist > LINK_DIST) continue
          const strength = 1 - dist / LINK_DIST
          const alpha = strength * strength * 0.35 * ((a.depth + b.depth) / 2)
          if (alpha <= 0.008) continue
          ctx.strokeStyle = `rgba(${GREEN}, ${alpha.toFixed(3)})`
          ctx.lineWidth = 0.8
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      pts.forEach((p) => {
        const r = 1.3 + p.depth * 2.4
        ctx.save()
        ctx.globalAlpha = 0.35 + p.depth * 0.55
        ctx.shadowColor = `rgba(${GREEN}, 0.9)`
        ctx.shadowBlur = 6 + p.depth * 8
        ctx.fillStyle = `rgb(${GREEN})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      raf = reduced ? 0 : requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="hm-ribbon" aria-hidden="true" />
}
