import { useState } from 'react'
import { MagneticFilings } from './components/MagneticFilings'
import { WelcomeIntro } from './components/WelcomeIntro'
import { PortfolioPage } from './components/PortfolioPage'
import { LanguageProvider } from './i18n/LanguageContext'

function App() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <LanguageProvider>
      <div className="app">
        <MagneticFilings />
        {!introDone && <WelcomeIntro onFinished={() => setIntroDone(true)} />}
        {introDone && <PortfolioPage />}
      </div>
    </LanguageProvider>
  )
}

export default App
