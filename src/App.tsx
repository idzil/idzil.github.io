import { MagneticFilings } from './components/MagneticFilings'
import { PortfolioPage } from './components/PortfolioPage'
import { LanguageProvider } from './i18n/LanguageContext'
import { useIsMobile } from './hooks/useIsMobile'

function AppShell() {
  const isMobile = useIsMobile()

  return (
    <div className={`app${isMobile ? ' app--mobile' : ''}`}>
      {!isMobile && <MagneticFilings />}
      {isMobile && <div className="mobile-ambient" aria-hidden />}
      <PortfolioPage />
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
