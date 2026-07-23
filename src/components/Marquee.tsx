type MarqueeProps = {
  items: string[]
}

export function Marquee({ items }: MarqueeProps) {
  const sequence = [...items, ...items]

  return (
    <div className="marquee" aria-hidden>
      <div className="marquee__track">
        {sequence.map((item, index) => (
          <span className="marquee__item" key={`${item}-${index}`}>
            {item}
            <span className="marquee__dot">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
