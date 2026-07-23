import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from 'motion/react'
import { useRef, type PointerEvent } from 'react'

type TiltCardProps = HTMLMotionProps<'article'> & {
  maxTilt?: number
}

const SPRING = { stiffness: 220, damping: 22, mass: 0.55 }

export function TiltCard({
  children,
  className,
  maxTilt = 11,
  style,
  onPointerMove,
  onPointerLeave,
  ...rest
}: TiltCardProps) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const rotateXRaw = useTransform(y, [0, 1], [maxTilt, -maxTilt])
  const rotateYRaw = useTransform(x, [0, 1], [-maxTilt, maxTilt])
  const rotateX = useSpring(rotateXRaw, SPRING)
  const rotateY = useSpring(rotateYRaw, SPRING)

  const handleMove = (event: PointerEvent<HTMLElement>) => {
    onPointerMove?.(event)
    if (reduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return
    x.set((event.clientX - rect.left) / rect.width)
    y.set((event.clientY - rect.top) / rect.height)
  }

  const handleLeave = (event: PointerEvent<HTMLElement>) => {
    onPointerLeave?.(event)
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <motion.article
      ref={ref}
      className={className}
      style={{
        ...(style as object),
        rotateX: reduceMotion ? 0 : rotateX,
        rotateY: reduceMotion ? 0 : rotateY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d' as const,
      }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      {...rest}
    >
      {children}
    </motion.article>
  )
}
