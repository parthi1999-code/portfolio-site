import { useEffect, useRef } from 'react'

const SECTIONS = 70
const GREEN = '102, 255, 140'

function normalize(v) {
  const l = Math.hypot(v[0], v[1], v[2]) || 1
  return [v[0] / l, v[1] / l, v[2] / l]
}

function cross(a, b) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
}

function centerline(u, phase) {
  const a = u * Math.PI * 2 * 0.95 + phase
  return [0.7 + 0.21 * Math.cos(a), -0.08 + u * 1.16, 0.28 * Math.sin(a * 1.1)]
}

function sectionCorners(u, phase) {
  const e = 0.004
  const p = centerline(u, phase)
  const p1 = centerline(u + e, phase)
  const p0 = centerline(u - e, phase)
  const t = normalize([p1[0] - p0[0], p1[1] - p0[1], p1[2] - p0[2]])
  const b = normalize(cross(t, [0, 0, 1]))
  const n = cross(b, t)
  const theta = phase * 0.15
  const c = Math.cos(theta)
  const s = Math.sin(theta)
  const bx = [b[0] * c + n[0] * s, b[1] * c + n[1] * s, b[2] * c + n[2] * s]
  const nx = [-b[0] * s + n[0] * c, -b[1] * s + n[1] * c, -b[2] * s + n[2] * c]
  const size = 0.052 + 0.006 * Math.sin(u * 9 + phase)
  return [
    [1, 1],
    [1, -1],
    [-1, -1],
    [-1, 1],
  ].map(([i, j]) => [
    p[0] + (bx[0] * i + nx[0] * j) * size,
    p[1] + (bx[1] * i + nx[1] * j) * size,
    p[2] + (bx[2] * i + nx[2] * j) * size,
  ])
}

export default function NeonRibbon() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let raf = 0
    let visible = true
    const start = performance.now()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const project = (pt) => {
      const persp = 1 / (1 - pt[2] * 0.7)
      return [(0.5 + (pt[0] - 0.5) * persp) * width, (0.5 + (pt[1] - 0.5) * persp) * height]
    }

    const draw = (now) => {
      const phase = ((now - start) / 1000) * 0.35
      ctx.clearRect(0, 0, width, height)

      const rings = []
      for (let i = 0; i < SECTIONS; i++) {
        rings.push(sectionCorners(i / (SECTIONS - 1), phase).map(project))
      }

      const path = new Path2D()
      for (let i = 0; i < rings.length; i++) {
        const ring = rings[i]
        if (i % 3 === 0) {
          path.moveTo(ring[0][0], ring[0][1])
          for (let k = 1; k < 4; k++) path.lineTo(ring[k][0], ring[k][1])
          path.closePath()
        }
        if (i > 0) {
          for (let k = 0; k < 4; k++) {
            path.moveTo(rings[i - 1][k][0], rings[i - 1][k][1])
            path.lineTo(ring[k][0], ring[k][1])
          }
        }
      }

      ctx.lineJoin = 'round'
      ctx.strokeStyle = `rgba(${GREEN}, 0.13)`
      ctx.lineWidth = 7
      ctx.stroke(path)
      ctx.strokeStyle = `rgba(${GREEN}, 0.95)`
      ctx.lineWidth = 1.3
      ctx.stroke(path)

      if (!reduced && visible) raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(draw)

    // Stop redrawing once scrolled out of view instead of burning CPU/GPU
    // on an off-screen canvas for the rest of the session.
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible && !raf && !reduced) raf = requestAnimationFrame(draw)
      },
      { threshold: 0 },
    )
    observer.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="hm-ribbon" aria-hidden="true" />
}
