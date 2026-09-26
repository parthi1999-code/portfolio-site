import { useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

const VISIBLE_MS = 1300

function Tile({ flipX, flipY, order }) {
  return (
    <div className="page-transition__tile" style={{ '--order': order }}>
      <div className="page-transition__tile-fill">
        <svg
          viewBox="0 0 92 92"
          width="92"
          height="92"
          style={{ transform: `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})` }}
        >
          <path
            d="M36 6 H86 V86 H6 V36 Z"
            fill="#fff"
            stroke="#fff"
            strokeWidth="10"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}

export default function PageTransition() {
  const location = useLocation()
  const isFirst = useRef(true)
  const [visible, setVisible] = useState(false)

  // useLayoutEffect (not useEffect) so the overlay mounts in the same paint
  // as the route swap -- React Router already swapped the page content
  // synchronously by the time this runs, so a deferred effect would let
  // one frame of the new page flash through before the overlay appears.
  useLayoutEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }
    setVisible(true)
    const timer = setTimeout(() => setVisible(false), VISIBLE_MS)
    return () => clearTimeout(timer)
  }, [location.pathname])

  if (!visible) return null

  return (
    <div className="page-transition" aria-hidden="true">
      <div className="page-transition__mark">
        <Tile order={0} />
        <Tile order={1} flipX />
        <Tile order={2} flipY />
        <Tile order={3} flipX flipY />
      </div>
    </div>
  )
}
