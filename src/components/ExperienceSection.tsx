import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { EXPERIENCE, type TranslationKey } from '../i18n/translations'
import { TiltCard } from './TiltCard'

type Translate = (key: TranslationKey) => string

const experience = EXPERIENCE[0]

export function ExperienceSection({ t }: { t: Translate }) {
  const reduceMotion = useReducedMotion()
  const headingRef = useRef<HTMLElement>(null)
  const headingInView = useInView(headingRef, {
    once: true,
    amount: 0.55,
    margin: '-12% 0px -8% 0px',
  })
  const headingShown = Boolean(reduceMotion || headingInView)

  const title = t('section.experience')
  const titleWords = title.split(' ')

  return (
    <section id="doswiadczenie" className="experience-section">
      <div className="experience-section__inner">
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
          className="experience-spotlight"
          maxTilt={8}
          initial={reduceMotion ? false : { opacity: 0, y: 36 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <span className="experience-spotlight__liquid" aria-hidden />
          <span className="experience-spotlight__glass" aria-hidden />

          <div className="experience-spotlight__body">
            <div className="experience-spotlight__meta">
              <span className="experience-spotlight__badge">{t('exp1.badge')}</span>
              <span className="experience-spotlight__date">{experience.date}</span>
            </div>

            <h3 className="experience-spotlight__title">{t(experience.title)}</h3>
            <p className="experience-spotlight__org">{t(experience.org)}</p>

            <ul className="experience-spotlight__bullets">
              {experience.bullets.map((b, index) => (
                <motion.li
                  key={b}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + index * 0.09,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {t(b)}
                </motion.li>
              ))}
            </ul>
          </div>
        </TiltCard>
      </div>
    </section>
  )
}
