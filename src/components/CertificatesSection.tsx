import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { CERTIFICATES, type TranslationKey } from '../i18n/translations'
import { TiltCard } from './TiltCard'

type Translate = (key: TranslationKey) => string

export function CertificatesSection({ t }: { t: Translate }) {
  const reduceMotion = useReducedMotion()
  const headingRef = useRef<HTMLElement>(null)
  const headingInView = useInView(headingRef, {
    once: true,
    amount: 0.55,
    margin: '-12% 0px -8% 0px',
  })
  const headingShown = Boolean(reduceMotion || headingInView)

  const title = t('section.certificates')
  const titleWords = title.split(' ')

  return (
    <section id="certyfikaty" className="certificates-section">
      <div className="certificates-section__inner">
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

        <div className="certificates-section__grid">
          {CERTIFICATES.map((item, index) => {
            const href =
              'href' in item && item.href
                ? `${import.meta.env.BASE_URL}${item.href.replace(/^\//, '')}`
                : null

            return (
              <TiltCard
                key={item.id}
                className="certificate-card"
                maxTilt={12}
                initial={reduceMotion ? false : { opacity: 0, y: 36 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.75,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.1 + index * 0.08,
                }}
              >
                <span className="certificate-card__liquid" aria-hidden />
                <span className="certificate-card__glass" aria-hidden />

                <div className="certificate-card__body">
                  <p className="certificate-card__date">{item.date}</p>
                  <h3 className="certificate-card__title">{t(item.title)}</h3>
                  <p className="certificate-card__org">{t(item.org)}</p>
                  {href ? (
                    <a
                      className="certificate-card__link"
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t('cert.open')}
                    </a>
                  ) : null}
                </div>
              </TiltCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
