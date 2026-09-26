import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const GREEN = 0x66ff8c

const SATELLITES = [
  { radius: 2.3, size: 0.16, speed: 0.22, tilt: 0.3, phase: 0.0 },
  { radius: 2.7, size: 0.12, speed: -0.17, tilt: 1.1, phase: 1.4 },
  { radius: 3.1, size: 0.2, speed: 0.13, tilt: 2.0, phase: 3.0 },
  { radius: 2.5, size: 0.1, speed: -0.26, tilt: 0.8, phase: 4.6 },
  { radius: 3.4, size: 0.14, speed: 0.19, tilt: 1.7, phase: 5.6 },
]

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

    const satellites = SATELLITES.map((s) => {
      const geo = new THREE.OctahedronGeometry(s.size, 0)
      const edges = new THREE.EdgesGeometry(geo)
      const mat = new THREE.LineBasicMaterial({ color: GREEN, transparent: true, opacity: 0.7 })
      const mesh = new THREE.LineSegments(edges, mat)
      group.add(mesh)
      return { mesh, geo, ...s }
    })

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

        satellites.forEach((s) => {
          const angle = t * s.speed + s.phase
          const bx = Math.cos(angle) * s.radius
          const bz = Math.sin(angle) * s.radius
          s.mesh.position.set(bx, bz * Math.sin(s.tilt), bz * Math.cos(s.tilt))
          s.mesh.rotation.x = t * 0.6 + s.phase
          s.mesh.rotation.y = t * 0.4 + s.phase
        })
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
      satellites.forEach((s) => {
        s.geo.dispose()
        s.mesh.geometry.dispose()
        s.mesh.material.dispose()
      })
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="hm-ribbon" aria-hidden="true" />
}
