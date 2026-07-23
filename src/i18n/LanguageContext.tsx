import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  translations,
  type Lang,
  type TranslationKey,
} from './translations'

type LanguageContextValue = {
  lang: Lang
  t: (key: TranslationKey) => string
  toggleLang: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readStoredLang(): Lang {
  const stored = localStorage.getItem('portfolio-lang')
  if (stored === 'pl' || stored === 'en') return stored
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() =>
    typeof window !== 'undefined' ? readStoredLang() : 'en',
  )

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = translations[lang]['meta.title']
    localStorage.setItem('portfolio-lang', lang)
  }, [lang])

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'pl' ? 'en' : 'pl'))
  }, [])

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      t: (key) => translations[lang][key],
      toggleLang,
    }),
    [lang, toggleLang],
  )

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
