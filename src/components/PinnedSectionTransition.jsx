import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function PinnedSectionTransition({
  topContent,
  bottomContent,
  pinDistance = '100%',
  id,
}) {
  const containerRef = useRef(null)
  const topRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${pinDistance}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      })

      tl.to(topRef.current, { opacity: 0, scale: 0.92, ease: 'none', duration: 0.6 }, 0)
      tl.fromTo(
        bottomRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, ease: 'none', duration: 1 },
        0,
      )
    }, containerRef)

    return () => ctx.revert()
  }, [pinDistance])

  return (
    <div id={id} ref={containerRef} className="pinned-transition">
      <div ref={topRef} className="pinned-transition__top">
        {topContent}
      </div>
      <div ref={bottomRef} className="pinned-transition__bottom">
        <div className="pinned-transition__inner">{bottomContent}</div>
      </div>
    </div>
  )
}
