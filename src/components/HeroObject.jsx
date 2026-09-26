import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const GREEN = 0x2f5fff
const DRAG_SENSITIVITY = 0.008
const INERTIA_DECAY = 0.94

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

    // invisible solid volume used only for hover/hit-testing, so the drag
    // cursor and drag-start only engage over the object itself, not the
    // full-bleed transparent canvas around it
    const hitMat = new THREE.MeshBasicMaterial({ visible: false })
    const hitMesh = new THREE.Mesh(coreGeo, hitMat)
    group.add(hitMesh)

    const raycaster = new THREE.Raycaster()
    const pointerNDC = new THREE.Vector2()
    const isOverObject = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect()
      pointerNDC.x = ((clientX - rect.left) / rect.width) * 2 - 1
      pointerNDC.y = -((clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(pointerNDC, camera)
      return raycaster.intersectObject(hitMesh).length > 0
    }

    // drag-to-rotate: offset accumulates on top of the ambient auto-rotation
    // below, and carries a bit of spin momentum after release.
    const offset = { x: 0, y: 0 }
    const velocity = { x: 0, y: 0 }
    const drag = { active: false, lastX: 0, lastY: 0, pointerId: null }

    const onPointerDown = (e) => {
      if (!isOverObject(e.clientX, e.clientY)) return
      drag.active = true
      drag.lastX = e.clientX
      drag.lastY = e.clientY
      drag.pointerId = e.pointerId
      velocity.x = 0
      velocity.y = 0
      canvas.setPointerCapture(e.pointerId)
      canvas.style.cursor = 'grabbing'
    }
    const onPointerMove = (e) => {
      if (drag.active) {
        if (e.pointerId !== drag.pointerId) return
        const dx = e.clientX - drag.lastX
        const dy = e.clientY - drag.lastY
        drag.lastX = e.clientX
        drag.lastY = e.clientY
        const vy = dx * DRAG_SENSITIVITY
        const vx = dy * DRAG_SENSITIVITY
        offset.y += vy
        offset.x += vx
        velocity.y = vy
        velocity.x = vx
        return
      }
      canvas.style.cursor = isOverObject(e.clientX, e.clientY) ? 'grab' : ''
    }
    const endDrag = (e) => {
      if (drag.pointerId !== null && e.pointerId !== undefined && e.pointerId !== drag.pointerId) return
      drag.active = false
      drag.pointerId = null
      canvas.style.cursor = isOverObject(e.clientX, e.clientY) ? 'grab' : ''
    }

    // Drag-to-rotate needs touch-action: none to stop the browser trying to
    // scroll while you drag the object, but this canvas spans the entire
    // hero banner -- on a touch device that means EVERY touch anywhere in
    // the hero, not just on the object, would be blocked from scrolling the
    // page. Only wire up the drag interaction (and disable touch scrolling)
    // on devices with a fine pointer; touch devices keep native scroll and
    // just get the ambient auto-rotation.
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (!isCoarsePointer) {
      canvas.style.touchAction = 'none'
      canvas.addEventListener('pointerdown', onPointerDown)
      canvas.addEventListener('pointermove', onPointerMove)
      canvas.addEventListener('pointerup', endDrag)
      canvas.addEventListener('pointercancel', endDrag)
    }

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
        if (!drag.active) {
          // let released spin decay smoothly back to rest
          offset.y += velocity.y
          offset.x += velocity.x
          velocity.y *= INERTIA_DECAY
          velocity.x *= INERTIA_DECAY
        }
        group.rotation.y = t * 0.18 + offset.y
        group.rotation.x = Math.sin(t * 0.12) * 0.25 + offset.x
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
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerup', endDrag)
      canvas.removeEventListener('pointercancel', endDrag)
      coreGeo.dispose()
      coreEdges.dispose()
      coreMat.dispose()
      shellGeo.dispose()
      shellEdges.dispose()
      shellMat.dispose()
      hitMat.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="hm-hero-object" aria-hidden="true" />
}
