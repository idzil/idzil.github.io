import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Typewriter } from './Typewriter'

const WELCOME_TEXT = "Hello. I'm Idzi.\nLet's look at the data."

type WelcomeIntroProps = {
  onFinished: () => void
}

export function WelcomeIntro({ onFinished }: WelcomeIntroProps) {
  const [exiting, setExiting] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleTyped = useCallback(() => {
    timeoutRef.current = window.setTimeout(() => setExiting(true), 1400)
  }, [])

  return (
    <AnimatePresence onExitComplete={onFinished}>
      {!exiting && (
        <motion.div
          className="welcome"
          key="welcome"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="welcome__inner">
            <Typewriter
              text={WELCOME_TEXT}
              className="welcome__text"
              onComplete={handleTyped}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
