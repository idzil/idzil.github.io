import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type TypewriterProps = {
  text: string
  className?: string
  onComplete?: () => void
}

function delayForChar(char: string, next: string | undefined): number {
  const base = 42
  let variance = 0.45

  if (char === '\n') {
    return base * 8 + Math.random() * 60
  }
  if (/[.,—–;:]/.test(char)) {
    return base * 6 + Math.random() * 80
  }
  if (char === ' ') {
    return base * 1.6 + Math.random() * 40
  }
  if (/[A-ZĄĆĘŁŃÓŚŹŻ]/.test(char)) {
    variance = 0.55
  }
  if (next && /[aeiouyąęó]/i.test(char + next)) {
    variance *= 0.85
  }

  const factor = 1 + (Math.random() * 2 - 1) * variance
  return Math.max(18, base * factor)
}

/** Natural typing animation (free stand-in for Motion+ Typewriter). */
export function Typewriter({ text, className, onComplete }: TypewriterProps) {
  const reducedMotion = usePrefersReducedMotion()
  const [visible, setVisible] = useState(reducedMotion ? text : '')
  const [done, setDone] = useState(reducedMotion)
  const completedRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    completedRef.current = false

    const finish = () => {
      if (completedRef.current) return
      completedRef.current = true
      setDone(true)
      onCompleteRef.current?.()
    }

    if (reducedMotion) {
      setVisible(text)
      finish()
      return
    }

    let cancelled = false
    let timeoutId = 0
    setVisible('')
    setDone(false)

    const type = (index: number) => {
      if (cancelled) return
      if (index >= text.length) {
        finish()
        return
      }
      const char = text[index]
      setVisible(text.slice(0, index + 1))
      const wait = delayForChar(char, text[index + 1])
      timeoutId = window.setTimeout(() => type(index + 1), wait)
    }

    timeoutId = window.setTimeout(() => type(0), 400)
    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
    }
  }, [text, reducedMotion])

  return (
    <p className={className} aria-label={text} aria-live="polite">
      <span aria-hidden>{visible}</span>
      <span
        className={`typewriter-caret${done ? ' typewriter-caret--done' : ''}`}
        aria-hidden
      />
    </p>
  )
}
