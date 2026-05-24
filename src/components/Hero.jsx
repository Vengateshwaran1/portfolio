import { useEffect, useRef, useState, useMemo, useCallback, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import { HiArrowDownTray, HiArrowUpRight } from 'react-icons/hi2'
import { AiOutlineGithub, AiOutlineLinkedin, AiOutlineInstagram } from 'react-icons/ai'
import { TypeAnimation } from 'react-type-animation'
import profilepic from '../assets/profile.png'
import MagneticButton from './primitives/MagneticButton'
import ResumeModal from './ResumeModal'
import { scrollTo } from './providers/LenisProvider'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/utils'

const socials = [
  { icon: AiOutlineGithub, href: 'https://github.com/Vengateshwaran1', label: 'GitHub' },
  { icon: AiOutlineLinkedin, href: 'https://www.linkedin.com/in/vengateshwaran-k', label: 'LinkedIn' },
  { icon: AiOutlineInstagram, href: 'https://www.instagram.com/vengateshwaran_', label: 'Instagram' },
]

const stats = [
  { value: '03', label: 'Projects Shipped' },
  { value: '01+', label: 'Year Experience' },
  { value: 'MERN', label: 'Stack Focus' },
]

/* ── Floating Ember Particles (desktop only) ──────────── */
const Particles = ({ count = 30 }) => {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 4 + 4,
        drift: (Math.random() - 0.5) * 40,
        hue: Math.random() > 0.5 ? '167,139,250' : '124,58,237',
        opacity: Math.random() * 0.5 + 0.2,
      })),
    [count]
  )

  return (
    <div className="hero-particles" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="hero-particle"
          style={{
            '--x': `${p.x}%`,
            '--y': `${p.y}%`,
            '--size': `${p.size}px`,
            '--delay': `${p.delay}s`,
            '--dur': `${p.duration}s`,
            '--drift': `${p.drift}px`,
            '--hue': p.hue,
            '--op': p.opacity,
          }}
        />
      ))}
    </div>
  )
}

/* ── Split Text helper ────────────────────────────────── */
const SplitChars = ({ text, className }) => (
  <span className={className}>
    {text.split('').map((char, i) => (
      <span
        key={i}
        className="hero-split-char"
        style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))}
  </span>
)

/* ═══════════════════════════════════════════════════════════ */

const Hero = () => {
  const [resumeOpen, setResumeOpen] = useState(false)
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const introRef = useRef(null)
  const aboutRef = useRef(null)
  const aboutHeadlineRef = useRef(null)
  const aboutBioRef = useRef(null)
  const portraitRef = useRef(null)
  const viewfinderRef = useRef(null)
  const scrollHintRef = useRef(null)
  const nameH1Ref = useRef(null)
  const nameContainerRef = useRef(null)
  const subtitleRef = useRef(null)
  const descRef = useRef(null)
  const ctaRef = useRef(null)
  const eyebrowRef = useRef(null)
  const horizonRef = useRef(null)
  const statsRef = useRef(null)
  const gradientLineRef = useRef(null)

  /* ── Auto-fit name to fill container width ──────────── */
  const fitName = useCallback(() => {
    const container = nameContainerRef.current
    const el = nameH1Ref.current
    if (!container || !el) return

    const containerWidth = container.clientWidth
    // Temporarily set a base size for accurate measurement
    el.style.fontSize = '100px'
    const naturalWidth = el.scrollWidth
    if (naturalWidth <= 0) return

    const idealSize = (containerWidth / naturalWidth) * 100
    // Clamp: min 24px (tiny mobile), max 200px (ultra-wide)
    el.style.fontSize = `${Math.max(24, Math.min(idealSize, 200))}px`
  }, [])

  // Fit before first paint so there's no flash of wrong size
  useLayoutEffect(() => {
    fitName()
  }, [fitName])

  // Re-fit on resize and after fonts load
  useEffect(() => {
    document.fonts?.ready?.then(fitName)
    const timer = setTimeout(fitName, 300) // fallback for slow font loads
    window.addEventListener('resize', fitName)
    return () => {
      window.removeEventListener('resize', fitName)
      clearTimeout(timer)
    }
  }, [fitName])

  /* ── GSAP scroll animation ─────────────────────────── */
  useEffect(() => {
    const section = sectionRef.current
    const pin = pinRef.current
    if (!section || !pin) return

    const reduce = prefersReducedMotion()
    const mobile = window.matchMedia('(max-width: 767px)').matches

    if (reduce) {
      gsap.set([aboutRef.current, aboutHeadlineRef.current, aboutBioRef.current], {
        opacity: 1,
        y: 0,
      })
      return
    }

    const ctx = gsap.context(() => {
      if (!mobile) {
        gsap.set([aboutHeadlineRef.current, aboutBioRef.current], { opacity: 0, y: 48 })
      }

      if (mobile) {
        ;[aboutHeadlineRef.current, aboutBioRef.current].forEach((el, i) => {
          if (!el) return
          gsap.from(el, {
            opacity: 0,
            y: 36,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
            delay: i * 0.05,
          })
        })
        return
      }

      /* ═══════════ DESKTOP: DIMENSIONAL RIFT SCROLL SEQUENCE ═══════════ */

      const nameChars = nameH1Ref.current?.querySelectorAll('.hero-split-char') || []
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=280%',
          pin: pin,
          scrub: 1.1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      /* Phase 1: Scroll hint fades */
      tl.to(scrollHintRef.current, { opacity: 0, y: 20, ease: 'none', duration: 0.06 }, 0)

      /* Phase 2: Name letters explode — 3D scatter */
      tl.to(nameChars, {
        y: (i) => (i % 2 === 0 ? -140 - i * 20 : 120 + i * 16),
        x: (i) => (i - nameChars.length / 2) * 45,
        rotationX: (i) => (i % 2 === 0 ? 45 : -35),
        rotationY: (i) => (i % 3 === 0 ? 60 : -40),
        rotationZ: (i) => (i % 2 === 0 ? 15 : -12),
        scale: (i) => 0.3 + (i % 3) * 0.12,
        opacity: 0,
        filter: 'blur(10px)',
        ease: 'power2.in',
        duration: 0.3,
        stagger: 0.01,
      }, 0.04)

      /* Phase 2b: Gradient line contracts */
      tl.to(gradientLineRef.current, {
        scaleX: 0,
        opacity: 0,
        ease: 'power2.in',
        duration: 0.14,
      }, 0.08)

      /* Phase 2c: Eyebrow glitches out */
      tl.to(eyebrowRef.current, {
        opacity: 0,
        x: -40,
        skewX: -15,
        filter: 'blur(4px)',
        ease: 'power3.in',
        duration: 0.14,
      }, 0.06)

      /* Phase 2d: Subtitle & desc scatter */
      tl.to(subtitleRef.current, {
        opacity: 0,
        y: -50,
        filter: 'blur(6px)',
        ease: 'power2.in',
        duration: 0.16,
      }, 0.1)

      tl.to(descRef.current, {
        opacity: 0,
        y: 40,
        filter: 'blur(6px)',
        ease: 'power2.in',
        duration: 0.14,
      }, 0.12)

      /* Phase 2e: CTAs scatter sideways */
      tl.to(ctaRef.current, {
        opacity: 0,
        x: -60,
        filter: 'blur(4px)',
        ease: 'power2.in',
        duration: 0.12,
      }, 0.14)

      /* Phase 2f: Stats fade out */
      tl.to(statsRef.current, {
        opacity: 0,
        y: 30,
        ease: 'power2.in',
        duration: 0.12,
      }, 0.14)

      /* Phase 3: Portrait — viewfinder + vignette */
      tl.fromTo(viewfinderRef.current, { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.12 }, 0.18)
      tl.fromTo(
        portraitRef.current?.querySelector('.portrait-vignette'),
        { opacity: 0 },
        { opacity: 1, ease: 'none', duration: 0.2 },
        0.2
      )

      /* Phase 4: Particles flash */
      tl.fromTo('.hero-particles', { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.12 }, 0.08)
      tl.to('.hero-particles', { opacity: 0, duration: 0.1 }, 0.6)

      /* Phase 5: Horizon line sweeps */
      tl.fromTo(
        horizonRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, ease: 'power2.inOut', duration: 0.2 },
        0.4
      )
      tl.to(horizonRef.current, { opacity: 0, duration: 0.12 }, 0.65)

      /* Phase 6: About materializes — clip reveal */
      tl.fromTo(
        aboutRef.current,
        { opacity: 0, pointerEvents: 'none' },
        { opacity: 1, pointerEvents: 'auto', ease: 'none', duration: 0.12 },
        0.48
      )
      tl.fromTo(
        aboutHeadlineRef.current,
        { opacity: 0, y: 80, clipPath: 'inset(100% 0 0 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', ease: 'power3.out', duration: 0.22 },
        0.52
      )
      tl.fromTo(
        aboutBioRef.current,
        { opacity: 0, y: 50, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', ease: 'power2.out', duration: 0.2 },
        0.68
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" ref={sectionRef} className="relative">
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />

      <div className="md:h-[380vh] h-auto">
        <div
          ref={pinRef}
          className="md:min-h-[100dvh] min-h-0 md:flex md:items-center relative pt-24 md:pt-28 pb-12 md:pb-0"
        >
          <div className="container-x w-full">
            {/* ─── Mobile portrait (circle avatar) ─── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="lg:hidden flex justify-center mb-6"
            >
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-white/10 shadow-glass">
                <img
                  src={profilepic}
                  alt="Vengateshwaran K."
                  className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.08]" />
              </div>
            </motion.div>

            {/* ─── Content stack (intro / about crossfade) ─── */}
            <div className="relative">
              {/* ═══ INTRO ═══ */}
              <div ref={introRef} className="flex flex-col hero-intro-perspective">
                {/* Eyebrow row + Available badge */}
                <motion.div
                  ref={eyebrowRef}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="flex items-center gap-3 md:gap-4 mb-3 md:mb-5"
                >
                  <p className="eyebrow">Full-stack Developer</p>
                  <span className="hero-available-badge">
                    <span className="hero-available-dot" />
                    Available
                  </span>
                </motion.div>

                {/* ── Full-width auto-fit name ── */}
                <div ref={nameContainerRef} className="w-full">
                  <motion.h1
                    ref={nameH1Ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display font-bold tracking-ultratight text-white whitespace-nowrap leading-[0.92]"
                    style={{ fontSize: 'clamp(2rem, 9vw, 9rem)' }} /* CSS fallback */
                  >
                    <SplitChars text="Vengateshwaran" className="hero-name-wrap" />
                    {' '}
                    <span className="gradient-text hero-split-char" style={{ display: 'inline-block' }}>
                      K.
                    </span>
                  </motion.h1>
                </div>

                {/* ── Animated gradient shimmer line ── */}
                <motion.div
                  ref={gradientLineRef}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="hero-gradient-line mt-4 md:mt-6 origin-left"
                />

                {/* ── Two-column: info left / portrait right ── */}
                <div className="grid grid-cols-12 gap-5 md:gap-10 lg:gap-14 mt-5 md:mt-8 items-start">
                  {/* Left column — text & CTAs */}
                  <div className="col-span-12 lg:col-span-7 xl:col-span-6">
                    {/* Typewriter role */}
                    <motion.div
                      ref={subtitleRef}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.45 }}
                    >
                      <TypeAnimation
                        sequence={[
                          'Full-stack Developer.',
                          2500,
                          'UI / UX Engineer.',
                          2500,
                          'Cyber Security Student.',
                          2500,
                          'MERN Stack Builder.',
                          2500,
                        ]}
                        wrapper="p"
                        className="text-lg md:text-2xl font-display font-medium text-white/90 tracking-tight"
                        repeat={Infinity}
                        cursor={true}
                        speed={45}
                      />
                    </motion.div>

                    <motion.p
                      ref={descRef}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.55 }}
                      className="mt-3 md:mt-4 text-white/50 text-sm md:text-lg max-w-lg text-pretty leading-relaxed"
                    >
                      I design and build fast, accessible web products — from polished
                      React interfaces to reliable Node backends.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                      ref={ctaRef}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.65 }}
                      className="mt-6 md:mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3"
                    >
                      <MagneticButton
                        onClick={() => scrollTo('#work')}
                        data-cursor="view"
                        data-cursor-label="See Work"
                        className="group px-6 py-3.5 md:px-7 md:py-4 rounded-full bg-amber-400 text-ink-950 font-semibold shadow-amber hover:shadow-ring transition-shadow text-sm md:text-base justify-center"
                      >
                        View Work
                        <HiArrowUpRight className="ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </MagneticButton>

                      <MagneticButton
                        onClick={() => setResumeOpen(true)}
                        data-cursor="hover"
                        data-cursor-label="Preview"
                        className="group px-6 py-3.5 md:px-7 md:py-4 rounded-full glass text-white font-medium border border-white/10 hover:border-amber-400/40 transition-colors text-sm md:text-base justify-center"
                      >
                        <HiArrowDownTray className="mr-2" />
                        Resume
                      </MagneticButton>

                      <div className="flex items-center gap-2 justify-center sm:justify-start sm:ml-1 mt-1 sm:mt-0">
                        {socials.map(({ icon: Icon, href, label }) => (
                          <MagneticButton
                            key={label}
                            as="a"
                            href={href}
                            target="_blank"
                            rel="noopener"
                            aria-label={label}
                            data-cursor="hover"
                            strength={0.4}
                            className="w-10 h-10 md:w-11 md:h-11 rounded-full glass grid place-items-center text-white/70 hover:text-amber-400 transition-colors"
                          >
                            <Icon size={18} />
                          </MagneticButton>
                        ))}
                      </div>
                    </motion.div>

                    {/* Stats strip */}
                    <motion.div
                      ref={statsRef}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                      className="mt-8 md:mt-10 flex items-center gap-5 md:gap-8"
                    >
                      {stats.map((s, i) => (
                        <div key={i} className="flex items-center gap-5 md:gap-8">
                          {i > 0 && <span className="w-px h-8 bg-white/10 -ml-2 md:-ml-4" />}
                          <div>
                            <span className="font-display text-xl md:text-3xl font-bold text-white tracking-tight">
                              {s.value}
                            </span>
                            <span className="block font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/40 mt-0.5">
                              {s.label}
                            </span>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Right column — desktop portrait */}
                  <div className="hidden lg:block col-span-5 xl:col-span-6 relative">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 0.3 }}
                    >
                      <div
                        ref={portraitRef}
                        className="hero-portrait-float relative aspect-[4/5] max-w-[380px] xl:max-w-[420px] ml-auto w-full overflow-hidden rounded-2xl border border-white/[0.08] shadow-glass bg-ink-900/60"
                        data-cursor="hover"
                      >
                        <img
                          src={profilepic}
                          alt="Vengateshwaran K."
                          className="absolute inset-0 w-full h-full object-cover object-[center_22%]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-ink-950/10 to-transparent pointer-events-none z-[1]" />
                        <div className="portrait-vignette absolute inset-0 pointer-events-none z-[1] opacity-0" />
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.06] pointer-events-none" />

                        <div
                          ref={viewfinderRef}
                          className="absolute inset-0 pointer-events-none opacity-0"
                          aria-hidden
                        >
                          <span className="absolute top-4 left-4 w-7 h-7 border-t border-l border-white/40" />
                          <span className="absolute top-4 right-4 w-7 h-7 border-t border-r border-white/40" />
                          <span className="absolute bottom-4 left-4 w-7 h-7 border-b border-l border-white/40" />
                          <span className="absolute bottom-4 right-4 w-7 h-7 border-b border-r border-white/40" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Floating Particles */}
                    <Particles count={25} />
                  </div>
                </div>
              </div>

              {/* ═══ ABOUT (overlay on desktop, below on mobile) ═══ */}
              <div
                id="about"
                ref={aboutRef}
                className="md:absolute md:inset-0 flex flex-col justify-center mt-10 md:mt-0 md:opacity-0 md:pointer-events-none"
              >
                <div ref={aboutHeadlineRef}>
                  <p className="eyebrow mb-4 md:mb-5">About</p>
                  <h2 className="display-lg text-white text-balance max-w-3xl">
                    A developer who{' '}
                    <span className="gradient-text">obsesses over the details.</span>
                  </h2>
                </div>
                <p
                  ref={aboutBioRef}
                  className="mt-4 md:mt-6 text-white/60 text-base md:text-xl leading-relaxed text-pretty max-w-xl"
                >
                  I&apos;m a MERN-stack developer pursuing an Integrated{' '}
                  <span className="text-white">M.Sc. in Cyber Security</span> at{' '}
                  <span className="text-white">PSG College of Technology</span>.
                  Currently interning at <span className="text-white">Prodoc AI</span> —
                  building dynamic applications with a focus on design and UX.
                </p>
              </div>
            </div>
          </div>

          {/* Horizon line sweep */}
          <div ref={horizonRef} className="hero-horizon hidden md:block" aria-hidden />

          {/* Scroll hint */}
          <div
            ref={scrollHintRef}
            className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-3"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/30">
              Scroll to explore
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-white/25 to-transparent animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
