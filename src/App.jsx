import { useState } from 'react'
import LenisProvider from './components/providers/LenisProvider'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import ShaderBackground from './components/ShaderBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MobileHero from './components/mobile/MobileHero'
import useIsMobile from './lib/useIsMobile'
import About from './components/About'
import Skills from './components/Skills'
import Portfolio from './components/Portfolio'
import Timeline from './components/Timeline'
import GitHubStats from './components/GitHubStats'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [ready, setReady] = useState(false)
  // Hero is the one section whose desktop structure (200vh GSAP pin, 3D
  // name scatter, About crossfade) cannot be CSS-adapted down — mobile gets
  // its own component tree. Everything else adapts via md: utilities.
  const isMobile = useIsMobile()

  return (
    <LenisProvider>
      <Preloader onDone={() => setReady(true)} />
      <CustomCursor />
      <ShaderBackground />
      <div className="noise-overlay" />
      <div className={`relative ${ready ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}>
        <Navbar />
        <main>
          {isMobile ? <MobileHero /> : <Hero />}
          <About />
          <Skills />
          <Portfolio />
          <Timeline />
          <GitHubStats />
          <Contact />
        </main>
        <Footer />
      </div>
    </LenisProvider>
  )
}

export default App
