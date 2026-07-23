import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import type { TranslationKey } from '../i18n/translations'
import { TiltCard } from './TiltCard'

type Translate = (key: TranslationKey) => string

export function AboutSection({ t }: { t: Translate }) {
  const reduceMotion = useReducedMotion()
  const headingRef = useRef<HTMLElement>(null)
  const headingInView = useInView(headingRef, {
    once: true,
    amount: 0.55,
    margin: '-12% 0px -8% 0px',
  })
  const headingShown = Boolean(reduceMotion || headingInView)

  const title = t('section.about')
  const titleWords = title.split(' ')

  return (
    <section id="o-mnie" className="about-section">
      <div className="about-section__inner">
        <header className="store-projects__head" ref={headingRef}>
          <h2 className="store-projects__heading" aria-label={title}>
            {titleWords.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                className="store-projects__heading-word"
                initial={
                  reduceMotion
                    ? false
                    : {
                        y: '-1.35em',
                        opacity: 0,
                        rotateX: 55,
                        
                      }
                }
                animate={
                  headingShown
                    ? {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        
                      }
                    : undefined
                }
                transition={{
                  type: 'spring',
                  stiffness: 110,
                  damping: 13,
                  mass: 0.85,
                  delay: 0.08 + index * 0.14,
                }}
                aria-hidden
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </header>

        <TiltCard
          className="about-spotlight"
          maxTilt={8}
          initial={reduceMotion ? false : { opacity: 0, y: 36 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <span className="about-spotlight__liquid" aria-hidden />
          <span className="about-spotlight__glass" aria-hidden />

          <motion.p
            className="about-spotlight__text"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.65,
              delay: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {t('about.text')}
          </motion.p>
        </TiltCard>
      </div>
    </section>
  )
}
