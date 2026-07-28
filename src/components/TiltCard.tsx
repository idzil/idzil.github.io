import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from 'motion/react'
import { useRef, type PointerEvent } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'

type TiltCardProps = HTMLMotionProps<'article'> & {
  maxTilt?: number
}

const SPRING = { stiffness: 180, damping: 24, mass: 0.7 }

export function TiltCard({
  children,
  className,
  maxTilt = 8,
  style,
  onPointerMove,
  onPointerLeave,
  ...rest
}: TiltCardProps) {
  const reduceMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const tiltOff = Boolean(reduceMotion || isMobile)
  const ref = useRef<HTMLElement>(null)
  const rectRef = useRef<DOMRect | null>(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const rotateXRaw = useTransform(y, [0, 1], [maxTilt, -maxTilt])
  const rotateYRaw = useTransform(x, [0, 1], [-maxTilt, maxTilt])
  const rotateX = useSpring(rotateXRaw, SPRING)
  const rotateY = useSpring(rotateYRaw, SPRING)

  const handleEnter = () => {
    if (tiltOff || !ref.current) return
    rectRef.current = ref.current.getBoundingClientRect()
  }

  const handleMove = (event: PointerEvent<HTMLElement>) => {
    onPointerMove?.(event)
    if (tiltOff || !ref.current) return
    const rect = rectRef.current ?? ref.current.getBoundingClientRect()
    rectRef.current = rect
    if (rect.width === 0 || rect.height === 0) return
    x.set((event.clientX - rect.left) / rect.width)
    y.set((event.clientY - rect.top) / rect.height)
  }

  const handleLeave = (event: PointerEvent<HTMLElement>) => {
    onPointerLeave?.(event)
    rectRef.current = null
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <motion.article
      ref={ref}
      className={className}
      style={{
        ...(style as object),
        rotateX: tiltOff ? 0 : rotateX,
        rotateY: tiltOff ? 0 : rotateY,
        transformPerspective: 900,
        transformStyle: 'preserve-3d' as const,
      }}
      onPointerEnter={tiltOff ? undefined : handleEnter}
      onPointerMove={tiltOff ? onPointerMove : handleMove}
      onPointerLeave={tiltOff ? onPointerLeave : handleLeave}
      {...rest}
    >
      {children}
    </motion.article>
  )
}
