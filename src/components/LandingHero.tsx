import { useState } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import { Marquee } from './Marquee'
import { useIsMobile } from '../hooks/useIsMobile'
import {
  CV_HREF,
  MARQUEE_ITEMS,
  type Lang,
  type TranslationKey,
} from '../i18n/translations'

type Translate = (key: TranslationKey) => string

type LandingHeroProps = {
  lang: Lang
  role: string
  location: string
  t: Translate
}

const PHONE_HREF = 'tel:+48532076153'
const EMAIL_HREF = 'mailto:idzi.lopatniuk@gmail.com'

const ease = [0.22, 1, 0.36, 1] as const

export function LandingHero({ lang, role, location, t }: LandingHeroProps) {
  const reduceMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const scrollDriftOff = Boolean(reduceMotion || isMobile)
  const entranceOff = Boolean(reduceMotion)
  const [linesOpen, setLinesOpen] = useState(entranceOff)
  const { scrollY } = useScroll()

  const firstX = useTransform(scrollY, (y) => y * 0.45)
  const lastX = useTransform(scrollY, (y) => y * -0.55)
  const metaX = useTransform(scrollY, (y) => y * 0.22)

  return (
    <header className="landing" id="kontakt">
      <div className="landing__frame">
        <h1 className="landing__name" aria-label="Idzi Łopatniuk">
          <span
            className={
              linesOpen
                ? 'landing__line-mask landing__line-mask--open'
                : 'landing__line-mask'
            }
          >
            <motion.span
              className="landing__line"
              style={scrollDriftOff ? undefined : { x: firstX }}
              initial={entranceOff ? false : { y: '115%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 1.05, ease, delay: 0.08 }}
              aria-hidden
            >
              Idzi
            </motion.span>
          </span>
          <span
            className={
              linesOpen
                ? 'landing__line-mask landing__line-mask--open'
                : 'landing__line-mask'
            }
          >
            <motion.span
              className="landing__line"
              style={scrollDriftOff ? undefined : { x: lastX }}
              initial={entranceOff ? false : { y: '115%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 1.05, ease, delay: 0.22 }}
              onAnimationComplete={() => setLinesOpen(true)}
              aria-hidden
            >
              Łopatniuk
            </motion.span>
          </span>
        </h1>

        <motion.div
          className="landing__meta"
          style={scrollDriftOff ? undefined : { x: metaX }}
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.16,
                delayChildren: entranceOff ? 0 : 0.55,
              },
            },
          }}
        >
          <motion.p
            className="landing__identity"
            variants={{
              hidden: entranceOff ? { opacity: 1 } : { opacity: 0, y: 18 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.9, ease },
              },
            }}
          >
            <span className="landing__role">{role}</span>
            <span className="landing__place">{location}</span>
          </motion.p>

          <motion.div
            className="landing__contact"
            variants={{
              hidden: entranceOff ? { opacity: 1 } : { opacity: 0, y: 16 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.85, ease },
              },
            }}
          >
            <a
              className="landing__contact-link"
              href={PHONE_HREF}
              aria-label={t('hero.phone_aria')}
            >
              {t('hero.phone')}
            </a>
            <a
              className="landing__contact-link"
              href={EMAIL_HREF}
              aria-label={t('hero.email_aria')}
            >
              {t('hero.email')}
            </a>
            <a
              className="landing__contact-link landing__contact-link--cv"
              href={CV_HREF[lang]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('hero.open_cv_aria')}
            >
              {t('hero.open_cv')}
            </a>
          </motion.div>

          <motion.div
            className="landing__marquee-wrap"
            variants={{
              hidden: entranceOff
                ? { opacity: 1 }
                : { opacity: 0, y: 22, clipPath: 'inset(0 40% 0 40%)' },
              show: {
                opacity: 1,
                y: 0,
                clipPath: 'inset(0 0% 0 0%)',
                transition: { duration: 1.05, ease },
              },
            }}
          >
            <Marquee items={[...MARQUEE_ITEMS[lang]]} />
          </motion.div>
        </motion.div>
      </div>
    </header>
  )
}
