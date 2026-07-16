import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiArrowDownTray, HiArrowUpRight } from 'react-icons/hi2'
import { AiOutlineGithub, AiOutlineLinkedin, AiOutlineInstagram } from 'react-icons/ai'
import { HiOutlineMapPin } from 'react-icons/hi2'
import profilepic from '../../assets/profile.webp'
import ResumeModal from '../ResumeModal'
import { scrollTo } from '../providers/LenisProvider'

/* ═══════════════════════════════════════════════════════════
   MOBILE HERO — Premium editorial layout.

   Structure:
   1. Cinematic portrait with gradient overlay + floating pills
   2. Bold name typography with gradient accent
   3. Statement + description
   4. Glass-morphic CTA row
   5. Horizontal-scroll live project cards
   6. About section (in-flow, #about anchor required for nav)
   ═══════════════════════════════════════════════════════════ */

const socials = [
  { icon: AiOutlineGithub, href: 'https://github.com/Vengateshwaran1', label: 'GitHub' },
  { icon: AiOutlineLinkedin, href: 'https://www.linkedin.com/in/vengateshwaran-k', label: 'LinkedIn' },
  { icon: AiOutlineInstagram, href: 'https://www.instagram.com/vengateshwaran_', label: 'Instagram' },
]



/* Coimbatore wall clock */
const IST = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

const riseInView = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

const MobileHero = () => {
  const [resumeOpen, setResumeOpen] = useState(false)
  const [time, setTime] = useState(() => IST.format(new Date()))

  useEffect(() => {
    const id = setInterval(() => setTime(IST.format(new Date())), 60_000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="hero" className="relative">
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />

      {/* ═══════════════════════════════════════════════
          1. CINEMATIC PORTRAIT HEADER
          ═══════════════════════════════════════════════ */}
      <div className="mobile-hero-portrait-wrap">
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mobile-hero-portrait-inner"
        >
          <img
            src={profilepic}
            alt="Vengateshwaran K."
            className="mobile-hero-portrait-img"
          />
          <div className="mobile-hero-portrait-overlay" />
        </motion.div>


      </div>

      {/* ═══════════════════════════════════════════════
          2. NAME + ROLE TAG
          ═══════════════════════════════════════════════ */}
      <div className="container-x mobile-hero-content">
        <motion.div {...rise(0.15)} className="mobile-hero-role-tag">
          <span className="mobile-hero-role-dot" />
          Full-Stack · Realtime Developer
        </motion.div>

        <motion.h1 {...rise(0.25)} className="mobile-hero-name">
          Vengateshwaran
          <span className="mobile-hero-name-accent"> K.</span>
        </motion.h1>

        <motion.div {...rise(0.35)} className="mobile-hero-divider" />

        {/* ═══════════════════════════════════════════════
            3. STATEMENT
            ═══════════════════════════════════════════════ */}
        <motion.p {...rise(0.4)} className="mobile-hero-statement">
          I build realtime web apps — sockets, presence, and data that moves
          the moment it changes.
        </motion.p>

        <motion.p {...rise(0.45)} className="mobile-hero-desc">
          MERN stack, shipped to production. Studying cyber security at PSG
          College of Technology.
        </motion.p>

        {/* ═══════════════════════════════════════════════
            4. CTA ROW — Primary + Resume + Socials
            ═══════════════════════════════════════════════ */}
        <motion.div {...rise(0.55)} className="mobile-hero-ctas">
          <button
            onClick={() => scrollTo('#work')}
            className="mobile-hero-cta-primary"
          >
            <span>View work</span>
            <HiArrowUpRight size={16} />
          </button>

          <button
            onClick={() => setResumeOpen(true)}
            className="mobile-hero-cta-glass"
          >
            <HiArrowDownTray size={15} />
            <span>Resume</span>
          </button>
        </motion.div>

        {/* Social row */}
        <motion.div {...rise(0.6)} className="mobile-hero-socials">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener"
              aria-label={label}
              className="mobile-hero-social-icon"
            >
              <Icon size={18} />
            </a>
          ))}
          <span className="mobile-hero-social-divider" />
          <span className="mobile-hero-time">
            {time} <span style={{ opacity: 0.4 }}>IST</span>
          </span>
        </motion.div>


      </div>

      {/* ═══════════════════════════════════════════════
          6. ABOUT (in-flow, #about anchor for nav)
          ═══════════════════════════════════════════════ */}
      <div id="about" className="container-x pt-14 pb-6">
        <motion.div {...riseInView(0)}>
          <p className="eyebrow mb-4">About</p>
          <h2 className="display-lg text-white text-balance">
            A developer who <span className="gradient-text">obsesses over the details.</span>
          </h2>
        </motion.div>
        <motion.p
          {...riseInView(0.1)}
          className="mt-4 text-white/60 text-base leading-relaxed text-pretty"
        >
          I&apos;m a MERN-stack developer pursuing an Integrated{' '}
          <span className="text-white">M.Sc. in Cyber Security</span> at{' '}
          <span className="text-white">PSG College of Technology</span>. I spent
          2025 at <span className="text-white">Prodoc AI</span> building a
          production analytics dashboard on React, Node, and Redis.
        </motion.p>
      </div>
    </section>
  )
}

export default MobileHero
