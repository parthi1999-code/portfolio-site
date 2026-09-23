export default function ImageMarquee({ images, speed = 30, variant }) {
  const items = [...images, ...images]
  const className = variant ? `marquee marquee--${variant}` : 'marquee'

  return (
    <div className={className}>
      <div className="marquee__track" style={{ animationDuration: `${speed}s` }}>
        {items.map((src, i) => (
          <div className="marquee__item" key={i} aria-hidden={i >= images.length}>
            <img src={src} alt="" decoding="async" />
          </div>
        ))}
      </div>
    </div>
  )
}
