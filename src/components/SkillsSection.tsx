import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import {
  SKILL_KEYS,
  TOOLS,
  type TranslationKey,
} from '../i18n/translations'
import { TiltCard } from './TiltCard'

type Translate = (key: TranslationKey) => string

const TILES = [
  {
    id: 'stack',
    title: 'skills.stack' as const,
    kind: 'tools' as const,
  },
  {
    id: 'analytics',
    title: 'skills.analytics' as const,
    kind: 'skills' as const,
  },
] as const

export function SkillsSection({ t }: { t: Translate }) {
  const reduceMotion = useReducedMotion()
  const headingRef = useRef<HTMLElement>(null)
  const headingInView = useInView(headingRef, {
    once: true,
    amount: 0.55,
    margin: '-12% 0px -8% 0px',
  })
  const headingShown = Boolean(reduceMotion || headingInView)

  const title = t('section.skills')
  const titleWords = title.split(' ')

  return (
    <section id="umiejetnosci" className="skills-section">
      <div className="skills-section__inner">
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

        <div className="skills-section__grid">
          {TILES.map((tile, index) => (
            <TiltCard
              key={tile.id}
              className="skills-card"
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
              <span className="skills-card__liquid" aria-hidden />
              <span className="skills-card__glass" aria-hidden />

              <div className="skills-card__body">
                <h3 className="skills-card__title">{t(tile.title)}</h3>
                <div className="skills-card__tags">
                  {tile.kind === 'tools'
                    ? TOOLS.map((tool) => (
                        <span className="skills-card__tag" key={tool}>
                          {tool}
                        </span>
                      ))
                    : SKILL_KEYS.map((key) => (
                        <span className="skills-card__tag" key={key}>
                          {t(key)}
                        </span>
                      ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
