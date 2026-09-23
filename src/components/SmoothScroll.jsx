import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

export default function SmoothScroll() {
  useEffect(() => {
    // Desktop only: ScrollSmoother's transform-driven scroll fights native
    // touch momentum and causes visible jank on phones/tablets, so mobile
    // just uses the browser's own (already smooth) scrolling.
    const mm = gsap.matchMedia()
    mm.add('(min-width: 901px)', () => {
      const smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.4,
        effects: true,
      })
      ScrollTrigger.refresh()
      return () => smoother.kill()
    })

    return () => mm.revert()
  }, [])

  return null
}
