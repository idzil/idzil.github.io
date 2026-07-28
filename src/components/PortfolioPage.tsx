import { useEffect, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'motion/react'
import { useLanguage } from '../i18n/LanguageContext'
import { useIsMobile } from '../hooks/useIsMobile'
import { AboutSection } from './AboutSection'
import { CertificatesSection } from './CertificatesSection'
import { EducationSection } from './EducationSection'
import { ExperienceSection } from './ExperienceSection'
import { LandingHero } from './LandingHero'
import { ProjectsGallery } from './ProjectsGallery'
import { SkillsSection } from './SkillsSection'

const NAV_LINKS = [
  { href: '#projekty', key: 'nav.projects' },
  { href: '#doswiadczenie', key: 'nav.experience' },
  { href: '#o-mnie', key: 'nav.about' },
  { href: '#wyksztalcenie', key: 'nav.education' },
  { href: '#certyfikaty', key: 'nav.certificates' },
  { href: '#umiejetnosci', key: 'nav.skills' },
] as const

export function PortfolioPage() {
  const { lang, t, toggleLang } = useLanguage()
  const reduceMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (current) => {
    if (reduceMotion || isMobile || menuOpen) {
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

  useEffect(() => {
    if (!isMobile) setMenuOpen(false)
  }, [isMobile])

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <motion.div
      className="portfolio"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.nav
        className={`site-nav${menuOpen ? ' site-nav--open' : ''}`}
        aria-label={t('nav.aria')}
        animate={{
          y: hidden && !menuOpen ? -120 : 0,
          opacity: hidden && !menuOpen ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ pointerEvents: hidden && !menuOpen ? 'none' : 'auto' }}
      >
        <div className="site-nav-inner">
          <a
            className="site-nav__mark"
            href="#kontakt"
            aria-label="Idzi Łopatniuk"
            onClick={closeMenu}
          >
            IL
          </a>
          <div className="site-nav__right">
            {!isMobile && (
              <ul className="site-nav__links">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} onClick={closeMenu}>
                      {t(link.key)}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <button
              type="button"
              className="lang-toggle"
              onClick={toggleLang}
              aria-label={t(lang === 'pl' ? 'nav.aria_to_en' : 'nav.aria_to_pl')}
            >
              {lang === 'pl' ? 'EN' : 'PL'}
            </button>
            {isMobile && (
              <button
                type="button"
                className={`site-nav__burger${menuOpen ? ' site-nav__burger--open' : ''}`}
                aria-expanded={menuOpen}
                aria-controls="site-nav-drawer"
                aria-label={t(menuOpen ? 'nav.menu_close' : 'nav.menu_open')}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span />
                <span />
                <span />
              </button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {isMobile && menuOpen && (
            <motion.div
              id="site-nav-drawer"
              className="site-nav__drawer"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <ul>
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} onClick={closeMenu}>
                      {t(link.key)}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
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
