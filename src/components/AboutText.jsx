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
              {
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
