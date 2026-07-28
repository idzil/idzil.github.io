import { useState } from 'react'
import { MagneticFilings } from './components/MagneticFilings'
import { WelcomeIntro } from './components/WelcomeIntro'
import { PortfolioPage } from './components/PortfolioPage'
import { LanguageProvider } from './i18n/LanguageContext'
import { useIsMobile } from './hooks/useIsMobile'

function AppShell() {
  const [introDone, setIntroDone] = useState(false)
  const isMobile = useIsMobile()

  return (
    <div className={`app${isMobile ? ' app--mobile' : ''}`}>
      {!isMobile && <MagneticFilings />}
      {isMobile && <div className="mobile-ambient" aria-hidden />}
      {!introDone && <WelcomeIntro onFinished={() => setIntroDone(true)} />}
      {introDone && <PortfolioPage />}
    </div>
  )
}

function App() {
  return (
    <LanguageProvider>
      <AppShell />
    </LanguageProvider>
  )
}

export default App
