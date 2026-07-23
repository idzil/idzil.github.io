import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type Filing = {
  bx: number
  by: number
  x: number
  y: number
  angle: number
  target: number
  pull: number
  targetPull: number
  phase: number
  speed: number
  amp: number
}

const COLS = 28
const ROWS = 16
const INFLUENCE = 180
const MAX_PULL = 8
const FRAME_SKIP = 1

/** Lightweight magnetic filings background. */
export function MagneticFilings() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const pointer = { x: -9999, y: -9999, active: false }
    const filings: Filing[] = []
    let width = 0
    let height = 0
    let raf = 0
    let frame = 0
    let t0 = performance.now()
    let running = true

    const layout = () => {
      const dpr = 1
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const padX = Math.max(18, width * 0.04)
      const padY = Math.max(18, height * 0.05)
      const stepX = (width - padX * 2) / (COLS - 1)
      const stepY = (height - padY * 2) / (ROWS - 1)

      filings.length = 0
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const jitterX = (Math.random() - 0.5) * stepX * 0.2
          const jitterY = (Math.random() - 0.5) * stepY * 0.2
          filings.push({
            bx: padX + col * stepX + jitterX,
            by: padY + row * stepY + jitterY,
            x: 0,
            y: 0,
            angle: -Math.PI / 2,
            target: -Math.PI / 2,
            pull: 0,
            targetPull: 0,
            phase: Math.random() * Math.PI * 2,
            speed: 0.25 + Math.random() * 0.35,
            amp: 1.5 + Math.random() * 2,
          })
        }
      }
    }

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.active = true
    }

    const onLeave = () => {
      pointer.active = false
    }

    const onVisibility = () => {
      running = !document.hidden
      if (running && !raf) raf = requestAnimationFrame(tick)
    }

    const tick = (now: number) => {
      raf = 0
      if (!running) return

      frame += 1
      if (frame % (FRAME_SKIP + 1) !== 0) {
        raf = requestAnimationFrame(tick)
        return
      }

      const t = (now - t0) / 1000
      ctx.clearRect(0, 0, width, height)
      ctx.lineCap = 'round'

      for (let i = 0; i < filings.length; i++) {
        const f = filings[i]
        const fx = reducedMotion ? 0 : Math.sin(t * f.speed + f.phase) * f.amp
        const fy = reducedMotion
          ? 0
          : Math.cos(t * f.speed * 0.85 + f.phase * 1.25) * f.amp * 0.6
        f.x = f.bx + fx
        f.y = f.by + fy

        if (pointer.active && !reducedMotion) {
          const dx = pointer.x - f.x
          const dy = pointer.y - f.y
          const distSq = dx * dx + dy * dy
          const infSq = INFLUENCE * INFLUENCE

          if (distSq < infSq && distSq > 0.01) {
            const dist = Math.sqrt(distSq)
            f.target = Math.atan2(dy, dx)
            const falloff = (1 - dist / INFLUENCE) ** 2
            f.targetPull = falloff * MAX_PULL
          } else {
            f.targetPull = 0
          }
        } else {
          f.targetPull = 0
          if (!reducedMotion) {
            f.target = -Math.PI / 2 + Math.sin(t * 0.3 + f.phase) * 0.2
          }
        }

        let delta = f.target - f.angle
        if (delta > Math.PI) delta -= Math.PI * 2
        else if (delta < -Math.PI) delta += Math.PI * 2
        f.angle += delta * (reducedMotion ? 1 : 0.14)
        f.pull += (f.targetPull - f.pull) * (reducedMotion ? 1 : 0.12)

        const proximity = f.pull / MAX_PULL
        const len = 4.5 + proximity * 4
        const nx = Math.cos(f.angle)
        const ny = Math.sin(f.angle)
        const cx = f.x + nx * f.pull
        const cy = f.y + ny * f.pull

        ctx.beginPath()
        ctx.moveTo(cx - nx * len * 0.5, cy - ny * len * 0.5)
        ctx.lineTo(cx + nx * len * 0.5, cy + ny * len * 0.5)

        if (proximity > 0.12) {
          ctx.strokeStyle = `rgba(0, 210, 239, ${0.25 + proximity * 0.35})`
          ctx.lineWidth = 1 + proximity * 0.3
        } else {
          ctx.strokeStyle = `rgba(130, 165, 185, ${0.16 + proximity * 0.2})`
          ctx.lineWidth = 1
        }
        ctx.stroke()
      }

      raf = requestAnimationFrame(tick)
    }

    const onScroll = () => {
      // Idle the canvas below the first screen to keep section animations smooth.
      const pastHero = window.scrollY > window.innerHeight * 0.85
      if (pastHero && !pointer.active) {
        running = false
        cancelAnimationFrame(raf)
        raf = 0
        ctx.clearRect(0, 0, width, height)
        return
      }
      if (!running && !document.hidden) {
        running = true
        raf = requestAnimationFrame(tick)
      }
    }

    layout()
    window.addEventListener('resize', layout, { passive: true })
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    document.addEventListener('visibilitychange', onVisibility)
    raf = requestAnimationFrame(tick)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', layout)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reducedMotion])

  return (
    <div className="magnetic-filings" aria-hidden>
      <canvas ref={canvasRef} className="magnetic-filings__canvas" />
    </div>
  )
}
