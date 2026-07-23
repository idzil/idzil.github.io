import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import type { TranslationKey } from '../i18n/translations'
import { LiquidGlassFilter } from './LiquidGlassFilter'
import { TiltCard } from './TiltCard'

type Translate = (key: TranslationKey) => string

const EDUCATION = [
  {
    id: 'edu1',
    title: 'edu1.title',
    org: 'edu1.org',
    desc: 'edu1.desc',
  },
  {
    id: 'edu2',
    title: 'edu2.title',
    org: 'edu2.org',
    desc: 'edu2.desc',
  },
] as const satisfies readonly {
  id: string
  title: TranslationKey
  org: TranslationKey
  desc: TranslationKey
}[]

export function EducationSection({ t }: { t: Translate }) {
  const reduceMotion = useReducedMotion()
  const headingRef = useRef<HTMLElement>(null)
  const headingInView = useInView(headingRef, {
    once: true,
    amount: 0.55,
    margin: '-12% 0px -8% 0px',
  })
  const headingShown = Boolean(reduceMotion || headingInView)

  const title = t('section.education')
  const titleWords = title.split(' ')

  return (
    <section id="wyksztalcenie" className="education-section">
      <div className="education-section__inner">
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
                        filter: 'blur(10px)',
                      }
                }
                animate={
                  headingShown
                    ? {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        filter: 'blur(0px)',
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

        <div className="education-section__grid">
          {EDUCATION.map((item, index) => (
            <TiltCard
              key={item.id}
              className="education-card"
              maxTilt={12}
              initial={reduceMotion ? false : { opacity: 0, y: 36 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.12 + index * 0.1,
              }}
            >
              <LiquidGlassFilter id={`edu-liquid-glass-${item.id}`} scale={22} />
              <span
                className="education-card__liquid"
                style={{ filter: `url(#edu-liquid-glass-${item.id})` }}
                aria-hidden
              />
              <span className="education-card__glass" aria-hidden />

              <div className="education-card__body">
                <h3 className="education-card__title">{t(item.title)}</h3>
                <p className="education-card__org">{t(item.org)}</p>
                <p
                  className="education-card__desc"
                  dangerouslySetInnerHTML={{ __html: t(item.desc) }}
                />
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
