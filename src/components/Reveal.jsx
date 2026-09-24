import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Reveal({
  children,
  className,
  as: Tag = 'div',
  id,
  y = 28,
  duration = 0.8,
  blur = false,
  delay = 0,
  ...rest
}) {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        blur ? { opacity: 0, y, filter: 'blur(14px)' } : { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          ...(blur ? { filter: 'blur(0px)' } : null),
          duration,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            once: true,
          },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [y, duration, blur, delay])

  return (
    <Tag ref={ref} id={id} className={className} {...rest}>
      {children}
    </Tag>
  )
}
