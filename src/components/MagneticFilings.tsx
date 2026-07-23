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

const COLS = 52
const ROWS = 32
const INFLUENCE = 220
const MAX_PULL = 10

/** Previous magnetic filings + floating drift. */
export function MagneticFilings() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const pointer = { x: -9999, y: -9999, active: false }
    const filings: Filing[] = []
    let width = 0
    let height = 0
    let dpr = 1
    let raf = 0
    let t0 = performance.now()

    const layout = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const padX = Math.max(18, width * 0.035)
      const padY = Math.max(18, height * 0.04)
      const stepX = (width - padX * 2) / (COLS - 1)
      const stepY = (height - padY * 2) / (ROWS - 1)

      filings.length = 0
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const jitterX = (Math.random() - 0.5) * stepX * 0.25
          const jitterY = (Math.random() - 0.5) * stepY * 0.25
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
            speed: 0.3 + Math.random() * 0.5,
            amp: 2 + Math.random() * 3.2,
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

    const tick = (now: number) => {
      const t = (now - t0) / 1000
      ctx.clearRect(0, 0, width, height)

      for (const f of filings) {
        // Floating drift around base position
        const fx = reducedMotion ? 0 : Math.sin(t * f.speed + f.phase) * f.amp
        const fy = reducedMotion
          ? 0
          : Math.cos(t * f.speed * 0.85 + f.phase * 1.25) * f.amp * 0.65
        f.x = f.bx + fx
        f.y = f.by + fy

        if (pointer.active && !reducedMotion) {
          const dx = pointer.x - f.x
          const dy = pointer.y - f.y
          const dist = Math.hypot(dx, dy)
          f.target = Math.atan2(dy, dx)

          if (dist < INFLUENCE && dist > 0.001) {
            const falloff = (1 - dist / INFLUENCE) ** 2
            f.targetPull = falloff * MAX_PULL
          } else {
            f.targetPull = 0
          }
        } else {
          f.targetPull = 0
          if (!reducedMotion) {
            f.target = -Math.PI / 2 + Math.sin(t * 0.35 + f.phase) * 0.25
          }
        }

        let delta = f.target - f.angle
        while (delta > Math.PI) delta -= Math.PI * 2
        while (delta < -Math.PI) delta += Math.PI * 2
        f.angle += delta * (reducedMotion ? 1 : 0.14)
        f.pull += (f.targetPull - f.pull) * (reducedMotion ? 1 : 0.12)

        const proximity = f.pull / MAX_PULL
        const len = 5 + proximity * 5
        const ox = Math.cos(f.angle) * f.pull
        const oy = Math.sin(f.angle) * f.pull
        const cx = f.x + ox
        const cy = f.y + oy
        const nx = Math.cos(f.angle)
        const ny = Math.sin(f.angle)

        ctx.beginPath()
        ctx.moveTo(cx - nx * len * 0.5, cy - ny * len * 0.5)
        ctx.lineTo(cx + nx * len * 0.5, cy + ny * len * 0.5)
        ctx.lineCap = 'round'

        const alpha = 0.18 + proximity * 0.28
        if (proximity > 0.12) {
          ctx.strokeStyle = `rgba(0, 210, 239, ${0.28 + proximity * 0.42})`
          ctx.lineWidth = 1 + proximity * 0.35
        } else {
          ctx.strokeStyle = `rgba(130, 165, 185, ${alpha})`
          ctx.lineWidth = 1
        }
        ctx.stroke()
      }

      raf = requestAnimationFrame(tick)
    }

    layout()
    window.addEventListener('resize', layout)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', layout)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [reducedMotion])

  return (
    <div className="magnetic-filings" aria-hidden>
      <canvas ref={canvasRef} className="magnetic-filings__canvas" />
    </div>
  )
}
