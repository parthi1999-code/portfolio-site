import { useEffect, useRef } from 'react'

export default function Sparkles({ density = 800, speed = 1, color = '#ffffff' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    let animationId
    let particles = []
    let width = 0
    let height = 0

    function resize() {
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function createParticles() {
      const count = Math.max(20, Math.round((density * width * height) / (1920 * 1080)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.2 + 0.3,
        vy: (Math.random() * 0.5 + 0.5) * speed,
        opacity: Math.random(),
        fade: Math.random() > 0.5 ? 1 : -1,
      }))
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        p.y -= p.vy
        if (p.y < 0) {
          p.y = height
          p.x = Math.random() * width
        }
        p.opacity += p.fade * 0.008
        if (p.opacity <= 0 || p.opacity >= 1) p.fade *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.globalAlpha = Math.max(0, Math.min(1, p.opacity))
        ctx.fill()
      }
      ctx.globalAlpha = 1
      animationId = requestAnimationFrame(draw)
    }

    resize()
    createParticles()
    draw()

    const handleResize = () => {
      resize()
      createParticles()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [density, speed, color])

  return <canvas ref={canvasRef} className="sparkles-canvas" />
}
