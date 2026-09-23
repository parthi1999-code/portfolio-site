import { forwardRef, useImperativeHandle, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const PER_CHAR_MS = 90

const ScrambleText = forwardRef(function ScrambleText({ text, className, as: Tag = 'span' }, forwardedRef) {
  const ref = useRef(null)
  const timer = useRef(null)

  const start = () => {
    clearInterval(timer.current)
    const el = ref.current
    if (!el) return
    const startTime = performance.now()
    timer.current = setInterval(() => {
      const elapsed = performance.now() - startTime
      let done = true
      el.textContent = text
        .split('')
        .map((ch, i) => {
          if (ch === ' ') return ' '
          if (elapsed >= i * PER_CHAR_MS + 120) return ch
          done = false
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')
      if (done) clearInterval(timer.current)
    }, 30)
  }

  const reset = () => {
    clearInterval(timer.current)
    if (ref.current) ref.current.textContent = text
  }

  useImperativeHandle(forwardedRef, () => ({ start, reset }))

  return (
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  )
})

export default ScrambleText
