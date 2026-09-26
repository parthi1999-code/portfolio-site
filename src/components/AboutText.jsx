import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function AboutText({ text, className = 'hm-about__text' }) {
  const ref = useRef(null)

  useEffect(() => {
    let cancelled = false
    let ctx
    document.fonts.ready.then(() => {
      if (cancelled || !ref.current) return
      // If the text is already inside (or past) the scroll-trigger's start
      // line the moment this mounts -- true for the About page's hero,
      // which sits at the top of a fresh route rather than being scrolled
      // into from below -- a scrub tied to scroll position has nothing left
      // to animate: it just renders already-revealed with no entrance at
      // all. Play a one-shot reveal on mount instead in that case; keep the
      // scroll-scrubbed version for text that's genuinely scrolled into
      // view (Home's About section).
      const alreadyInView = ref.current.getBoundingClientRect().top < window.innerHeight * 0.85

      ctx = gsap.context(() => {
        SplitText.create(ref.current, {
          type: 'lines,chars',
          mask: 'lines',
          linesClass: 'hm-line',
          autoSplit: true,
          onSplit: (self) =>
            gsap.fromTo(
              self.chars,
              { yPercent: 115, opacity: 0 },
              alreadyInView
                ? {
                    yPercent: 0,
                    opacity: 1,
                    ease: 'power2.out',
                    stagger: 0.02,
                    duration: 0.9,
                  }
                : {
                    yPercent: 0,
                    opacity: 1,
                    ease: 'power2.out',
                    stagger: 0.006,
                    scrollTrigger: {
                      trigger: ref.current,
                      start: 'top 85%',
                      end: 'top 35%',
                      scrub: 0.3,
                    },
                  },
            ),
        })
      }, ref)
    })
    return () => {
      cancelled = true
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <p ref={ref} className={className}>
      {text}
    </p>
  )
}
