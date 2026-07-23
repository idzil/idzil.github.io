import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import {
  PROJECTS,
  translations,
  type TranslationKey,
} from '../i18n/translations'

type Translate = (key: TranslationKey) => string
type ProjectItem = (typeof PROJECTS)[number]

const CARD_RADIUS = 24
const CARD_WIDTH = 340
const CARD_GAP = 20

function tagLabel(tag: string, t: Translate): string {
  if (tag in translations.pl) return t(tag as TranslationKey)
  return tag
}

function projectId(project: ProjectItem) {
  return project.p1
}

function projectTitle(project: ProjectItem, t: Translate) {
  return project.titleKey ? t(project.titleKey) : (project.title ?? '')
}

function projectSub(project: ProjectItem, t: Translate) {
  return project.subKey ? t(project.subKey) : (project.sub ?? '')
}

function ProjectCard({
  project,
  index,
  onOpen,
  t,
}: {
  project: ProjectItem
  index: number
  onOpen: () => void
  t: Translate
}) {
  const label = String(index + 1).padStart(2, '0')

  return (
    <motion.button
      type="button"
      className="store-card"
      onClick={onOpen}
      style={{ borderRadius: CARD_RADIUS }}
      transition={{ type: 'spring', stiffness: 340, damping: 34 }}
      whileHover={{ y: -10 }}
    >
      <span className="store-card__liquid" aria-hidden />
      <span className="store-card__glass" aria-hidden />
      <span className="store-card__eyebrow">{label}</span>
      <h2 className="store-card__title">{projectTitle(project, t)}</h2>
      <p className="store-card__sub">{projectSub(project, t)}</p>
    </motion.button>
  )
}

function ProjectExpanded({
  project,
  index,
  onClose,
  t,
  reduceMotion,
}: {
  project: ProjectItem
  index: number
  onClose: () => void
  t: Translate
  reduceMotion: boolean | null
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <div className="store-expanded">
      <motion.button
        type="button"
        className="store-expanded__backdrop"
        aria-label="Close"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />

      <div className="store-expanded__frame">
        <motion.article
          className="store-expanded__card"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          style={{ borderRadius: CARD_RADIUS }}
          transition={{ type: 'spring', stiffness: 340, damping: 34 }}
        >
          <button
            type="button"
            className="store-expanded__close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>

          <span className="store-card__eyebrow">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h2 className="store-card__title store-card__title--large">
            {projectTitle(project, t)}
          </h2>
          <p className="store-card__sub">{projectSub(project, t)}</p>

          <motion.div
            className="store-expanded__content"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.28, delay: 0.08 }}
          >
            <p className="project-desc">{t(project.p1)}</p>
            <p className="project-desc">{t(project.p2)}</p>
            <div className="tags">
              {project.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tagLabel(tag, t)}
                </span>
              ))}
            </div>
            {project.href && (
              <a
                className="project-link"
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub →
              </a>
            )}
          </motion.div>
        </motion.article>
      </div>
    </div>
  )
}

export function ProjectsGallery({ t }: { t: Translate }) {
  const reduceMotion = useReducedMotion()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [travel, setTravel] = useState(
    Math.max(0, (PROJECTS.length - 1) * (CARD_WIDTH + CARD_GAP)),
  )
  const carouselRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const headingInView = useInView(headingRef, {
    once: true,
    amount: 0.55,
    margin: '-12% 0px -8% 0px',
  })

  const { scrollYProgress: carouselProgress } = useScroll({
    target: carouselRef,
    offset: ['start start', 'end end'],
  })

  const trackX = useTransform(carouselProgress, [0, 1], [0, -travel])

  const title = t('section.projects_selected')
  const titleWords = title.split(' ')

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current
      if (!track) return
      const maxShift = track.scrollWidth - window.innerWidth + 48
      setTravel(Math.max(0, maxShift))
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const selectedIndex = PROJECTS.findIndex((p) => projectId(p) === selectedId)
  const selected = selectedIndex >= 0 ? PROJECTS[selectedIndex] : null
  const headingShown = Boolean(reduceMotion || headingInView)

  return (
    <section id="projekty" className="store-projects">
      <div
        ref={carouselRef}
        className={
          reduceMotion
            ? 'store-carousel store-carousel--static'
            : 'store-carousel'
        }
      >
        <div className="store-carousel__sticky">
          <div className="store-projects__inner store-projects__inner--carousel">
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
              <motion.p
                className="store-carousel__hint"
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={headingShown ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.55, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {t('projects.scroll_hint')}
              </motion.p>
            </header>
          </div>

          <div className="store-carousel__viewport">
            <motion.div
              ref={trackRef}
              className="store-carousel__track"
              style={reduceMotion ? undefined : { x: trackX }}
            >
              {PROJECTS.map((project, index) => (
                <ProjectCard
                  key={projectId(project)}
                  project={project}
                  index={index}
                  t={t}
                  onOpen={() => setSelectedId(projectId(project))}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectExpanded
            key={projectId(selected)}
            project={selected}
            index={selectedIndex}
            t={t}
            reduceMotion={reduceMotion}
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
