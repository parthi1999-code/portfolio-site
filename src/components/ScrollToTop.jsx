import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

export default function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) return
    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      const smoother = ScrollSmoother.get()
      if (smoother) {
        smoother.scrollTo(0, false)
      } else {
        window.scrollTo(0, 0)
      }
    })
    return () => cancelAnimationFrame(raf)
  }, [location.pathname])

  return null
}
