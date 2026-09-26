import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const GREEN = 0x66ff8c

export default function HeroObject() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    const start = performance.now()

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0, 0, 6.6)

    const group = new THREE.Group()
    scene.add(group)

    const coreGeo = new THREE.IcosahedronGeometry(1.3, 0)
    const coreEdges = new THREE.EdgesGeometry(coreGeo)
    const coreMat = new THREE.LineBasicMaterial({ color: GREEN, transparent: true, opacity: 0.85 })
    const core = new THREE.LineSegments(coreEdges, coreMat)
    group.add(core)

    const shellGeo = new THREE.IcosahedronGeometry(2.05, 0)
    const shellEdges = new THREE.EdgesGeometry(shellGeo)
    const shellMat = new THREE.LineBasicMaterial({ color: GREEN, transparent: true, opacity: 0.16 })
    const shell = new THREE.LineSegments(shellEdges, shellMat)
    group.add(shell)

    const isInView = () => {
      const rect = canvas.getBoundingClientRect()
      return rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth
    }

    const resize = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      if (!width || !height) return
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
    }

    const render = (now) => {
      if (!isInView()) {
        raf = reduced ? 0 : requestAnimationFrame(render)
        return
      }

      const t = (now - start) / 1000

      if (!reduced) {
        group.rotation.y = t * 0.18
        group.rotation.x = Math.sin(t * 0.12) * 0.25
        group.position.y = Math.sin(t * 0.3) * 0.15
      }

      renderer.render(scene, camera)
      raf = reduced ? 0 : requestAnimationFrame(render)
    }

    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      coreGeo.dispose()
      coreEdges.dispose()
      coreMat.dispose()
      shellGeo.dispose()
      shellEdges.dispose()
      shellMat.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="hm-hero-object" aria-hidden="true" />
}
