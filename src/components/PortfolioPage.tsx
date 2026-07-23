import { useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'motion/react'
import { useLanguage } from '../i18n/LanguageContext'
import { AboutSection } from './AboutSection'
import { CertificatesSection } from './CertificatesSection'
import { EducationSection } from './EducationSection'
import { ExperienceSection } from './ExperienceSection'
import { LandingHero } from './LandingHero'
import { ProjectsGallery } from './ProjectsGallery'
import { SkillsSection } from './SkillsSection'

export function PortfolioPage() {
  const { lang, t, toggleLang } = useLanguage()
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)

  useMotionValueEvent(scrollY, 'change', (current) => {
    if (reduceMotion) {
      setHidden(false)
      return
    }
    const previous = scrollY.getPrevious() ?? 0
    if (current > previous && current > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  return (
    <motion.div
      className="portfolio"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.nav
        className="site-nav"
        aria-label={t('nav.aria')}
        animate={{
          y: hidden ? -120 : 0,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ pointerEvents: hidden ? 'none' : 'auto' }}
      >
        <div className="site-nav-inner">
          <a className="site-nav__mark" href="#kontakt" aria-label="Idzi Łopatniuk">
            IL
          </a>
          <div className="site-nav__right">
            <ul>
              <li>
                <a href="#projekty">{t('nav.projects')}</a>
              </li>
              <li>
                <a href="#doswiadczenie">{t('nav.experience')}</a>
              </li>
              <li>
                <a href="#o-mnie">{t('nav.about')}</a>
              </li>
              <li>
                <a href="#wyksztalcenie">{t('nav.education')}</a>
              </li>
              <li>
                <a href="#certyfikaty">{t('nav.certificates')}</a>
              </li>
              <li>
                <a href="#umiejetnosci">{t('nav.skills')}</a>
              </li>
            </ul>
            <button
              type="button"
              className="lang-toggle"
              onClick={toggleLang}
              aria-label={t(lang === 'pl' ? 'nav.aria_to_en' : 'nav.aria_to_pl')}
            >
              {lang === 'pl' ? 'EN' : 'PL'}
            </button>
          </div>
        </div>
      </motion.nav>

      <LandingHero
        lang={lang}
        role={t('hero.role')}
        location={t('location')}
        t={t}
      />

      <ProjectsGallery t={t} />
      <ExperienceSection t={t} />
      <AboutSection t={t} />
      <EducationSection t={t} />
      <CertificatesSection t={t} />
      <SkillsSection t={t} />

      <div className="portfolio__wrap portfolio__wrap--footer">
        <footer className="footer">{t('footer.rodo')}</footer>
      </div>
    </motion.div>
  )
}
