import { useState } from 'react'
import LenisProvider from './components/providers/LenisProvider'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import ShaderBackground from './components/ShaderBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Portfolio from './components/Portfolio'
import Timeline from './components/Timeline'
import GitHubStats from './components/GitHubStats'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [ready, setReady] = useState(false)

  return (
    <LenisProvider>
      <Preloader onDone={() => setReady(true)} />
      <CustomCursor />
      <ShaderBackground />
      <div className="noise-overlay" />
      <div className={`relative ${ready ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}>
        <Navbar />
        <main>
          <Hero />
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
