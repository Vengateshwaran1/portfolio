import { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import { HiArrowDownTray, HiArrowUpRight } from 'react-icons/hi2'
import { AiOutlineGithub, AiOutlineLinkedin, AiOutlineInstagram } from 'react-icons/ai'
import profilepic from '../assets/profile.png'
import MagneticButton from './primitives/MagneticButton'
import ResumeModal from './ResumeModal'
import { scrollTo } from './providers/LenisProvider'
import { gsap } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/utils'

const socials = [
  { icon: AiOutlineGithub, href: 'https://github.com/Vengateshwaran1', label: 'GitHub' },
  { icon: AiOutlineLinkedin, href: 'https://www.linkedin.com/in/vengateshwaran-k', label: 'LinkedIn' },
  { icon: AiOutlineInstagram, href: 'https://www.instagram.com/vengateshwaran_', label: 'Instagram' },
]

/* The hero's claim is that these are deployed and serving traffic right now —
   the same claim the Work section backs up with live embeds. */
const running = [
  { name: 'Zephyr', what: 'Realtime chat', href: 'https://zephyr-dxd8.onrender.com/' },
  { name: 'Echo Connect', what: 'Synced audio', href: 'https://echo-connect.onrender.com/' },
  { name: 'Pipeline Forge', what: 'Node pipelines', href: 'https://pipeline-forge-two.vercel.app/' },
]

/* ── Splits a string into per-char spans the scroll timeline can scatter ── */
const SplitChars = ({ text, className = '' }) => (
  <span className={className}>
    {text.split('').map((c, i) => (
      <span
        key={i}
        className="hero-split-char"
        style={{ display: 'inline-block', whiteSpace: 'pre' }}
      >
        {c}
      </span>
    ))}
  </span>
)

/* ── Coimbatore wall clock. Real time, his timezone — the visitor is
      looking at his working day, not a decoration. ── */
const IST = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
})

const LiveClock = () => {
  const [now, setNow] = useState(() => IST.format(new Date()))

  useEffect(() => {
    const id = setInterval(() => setNow(IST.format(new Date())), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="tabular-nums" aria-label={`Local time in Coimbatore, ${now}`}>
      {now} <span className="text-white/30">IST</span>
    </span>
  )
}

const Hero = () => {
  const [resumeOpen, setResumeOpen] = useState(false)
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const aboutRef = useRef(null)
  const aboutHeadlineRef = useRef(null)
  const aboutBioRef = useRef(null)
  const portraitRef = useRef(null)
  const viewfinderRef = useRef(null)
  const nameH1Ref = useRef(null)
  const nameContainerRef = useRef(null)
  const subtitleRef = useRef(null)
  const descRef = useRef(null)
  const ctaRef = useRef(null)
  const eyebrowRef = useRef(null)
  const horizonRef = useRef(null)
  const liveRef = useRef(null)
  const gradientLineRef = useRef(null)

  /* ── Auto-fit name to fill container width ──────────── */
  const fitName = useCallback(() => {
    const container = nameContainerRef.current
    const el = nameH1Ref.current
    if (!container || !el) return

    const containerWidth = container.clientWidth
    if (!containerWidth) return

    // The h1 is inline-block, so its own box hugs the text. Measuring scrollWidth
    // on a block-level h1 would just return the container width and the fit would
    // always resolve to the probe size.
    el.style.fontSize = '100px'
    const naturalWidth = el.getBoundingClientRect().width
    if (naturalWidth <= 0) return

    const idealSize = (containerWidth / naturalWidth) * 100
    el.style.fontSize = `${Math.max(24, Math.min(idealSize, 220))}px`
  }, [])

  useLayoutEffect(() => {
    fitName()
  }, [fitName])

  useEffect(() => {
    document.fonts?.ready?.then(fitName)
    const timer = setTimeout(fitName, 300)
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

      /* ═══════════ DESKTOP: INTRO DISSOLVES INTO ABOUT ═══════════ */

      const nameChars = nameH1Ref.current?.querySelectorAll('.hero-split-char') || []
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          /* Matched pair with the md:h-[200vh] wrapper above: 100vh of pinned
             content + 100% of scrub. Change one, change the other, or the pin
             spacer and the wrapper disagree and you get dead scroll. */
          end: '+=100%',
          pin: pin,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          /* One flick commits. Any forward scroll off the top runs the whole
             intro→About transition to completion; any backward scroll rewinds
             it whole. There is no resting point in the middle, so the pin never
             feels like scrolling through nothing. */
          /* One flick commits. Any forward scroll off the top runs the whole
             intro→About transition to completion; any backward scroll rewinds
             it whole. There is no resting point in the middle, so the pin never
             feels like scrolling through nothing. */
          snap: {
            snapTo: (progress, self) =>
              self.direction === 1 ? (progress > 0.02 ? 1 : 0) : (progress < 0.98 ? 0 : 1),
            duration: { min: 0.5, max: 0.9 },
            delay: 0.04,
            ease: 'power2.inOut',
            inertia: false,
          },
        },
      })

      /* Name letters scatter in 3D */
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
      }, 0.02)

      tl.to(gradientLineRef.current, { scaleX: 0, opacity: 0, ease: 'power2.in', duration: 0.14 }, 0.05)

      tl.to(eyebrowRef.current, {
        opacity: 0, x: -40, skewX: -15, filter: 'blur(4px)', ease: 'power3.in', duration: 0.14,
      }, 0.04)

      tl.to(subtitleRef.current, {
        opacity: 0, y: -50, filter: 'blur(6px)', ease: 'power2.in', duration: 0.16,
      }, 0.06)

      tl.to(descRef.current, {
        opacity: 0, y: 40, filter: 'blur(6px)', ease: 'power2.in', duration: 0.15,
      }, 0.08)

      tl.to(ctaRef.current, {
        opacity: 0, x: -60, filter: 'blur(4px)', ease: 'power2.in', duration: 0.14,
      }, 0.1)

      /* Running strip drops away last — it's the anchor, so it holds longest */
      tl.to(liveRef.current, { opacity: 0, y: 30, ease: 'power2.in', duration: 0.15 }, 0.12)

      /* Portrait resolves into a framed still */
      tl.fromTo(viewfinderRef.current, { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.12 }, 0.16)
      tl.fromTo(
        portraitRef.current?.querySelector('.portrait-vignette'),
        { opacity: 0 },
        { opacity: 1, ease: 'none', duration: 0.18 },
        0.18
      )

      tl.fromTo(
        horizonRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, ease: 'power2.inOut', duration: 0.2 },
        0.34
      )
      tl.to(horizonRef.current, { opacity: 0, duration: 0.12 }, 0.58)

      /* About lands on 0.92 — near the very end of the pin. Nothing idles after
         it, so the snap that reveals About is the same gesture that finishes it. */
      tl.fromTo(
        aboutRef.current,
        { opacity: 0, pointerEvents: 'none' },
        { opacity: 1, pointerEvents: 'auto', ease: 'none', duration: 0.12 },
        0.44
      )
      tl.fromTo(
        aboutHeadlineRef.current,
        { opacity: 0, y: 80, clipPath: 'inset(100% 0 0 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', ease: 'power3.out', duration: 0.24 },
        0.5
      )
      tl.fromTo(
        aboutBioRef.current,
        { opacity: 0, y: 50, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', ease: 'power2.out', duration: 0.26 },
        0.66
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" ref={sectionRef} className="relative">
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />

      <div className="md:h-[200vh] h-auto">
        <div
          ref={pinRef}
          className="md:min-h-[100dvh] min-h-0 md:flex md:flex-col relative pt-24 md:pt-28 pb-10 md:pb-0 overflow-hidden"
        >
          <div className="container-x w-full md:flex-1 md:flex md:flex-col md:justify-center">
            {/* ─── Content stack (intro / about crossfade) ─── */}
            <div className="relative">
              {/* ═══ INTRO ═══ */}
              <div className="flex flex-col hero-intro-perspective">
                {/* Eyebrow — ruled, sits on the same baseline as the top hairline */}
                <motion.div
                  ref={eyebrowRef}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="relative z-10 flex items-center gap-4 mb-4 md:mb-6"
                >
                  {/* Mobile portrait — same duotone language as desktop */}
                  <span className="hero-portrait-sm lg:hidden relative w-12 h-12 shrink-0 rounded-sm">
                    <img
                      src={profilepic}
                      alt="Vengateshwaran K."
                      className="hero-portrait-img absolute inset-0 w-full h-full object-cover object-[center_18%]"
                    />
                  </span>
                  <p className="eyebrow whitespace-nowrap">Full-stack · Realtime</p>
                  <span className="hero-rule flex-1" />
                  <span className="hidden md:inline eyebrow whitespace-nowrap">Coimbatore, IN</span>
                </motion.div>

                {/* ── The name, fitted edge-to-edge ── */}
                <div ref={nameContainerRef} className="w-full relative z-10">
                  <motion.h1
                    ref={nameH1Ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block font-display font-bold tracking-ultratight text-white whitespace-nowrap leading-[0.92]"
                    style={{ fontSize: 'clamp(2rem, 9vw, 9rem)' }}
                  >
                    <SplitChars text="Vengateshwaran" className="hero-name-wrap" />
                    {' '}
                    <span className="gradient-text hero-split-char" style={{ display: 'inline-block' }}>
                      K.
                    </span>
                  </motion.h1>
                </div>

                <motion.div
                  ref={gradientLineRef}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="hero-gradient-line mt-4 md:mt-5 origin-left"
                />

                {/* ── Statement left / portrait right, interlocked ── */}
                <div className="grid grid-cols-12 gap-5 md:gap-10 mt-5 md:mt-7 items-start">
                  <div className="col-span-12 lg:col-span-7">
                    <motion.p
                      ref={subtitleRef}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.45 }}
                      className="font-display text-xl md:text-[2rem] leading-[1.2] text-white font-medium tracking-tight max-w-[30ch] text-balance"
                    >
                      I build realtime web apps — sockets, presence, and data
                      that moves the moment it changes.
                    </motion.p>

                    <motion.p
                      ref={descRef}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.55 }}
                      className="mt-3 md:mt-4 text-white/45 text-sm md:text-base max-w-md text-pretty leading-relaxed"
                    >
                      MERN stack, shipped to production. Studying cyber security
                      at PSG College of Technology.
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
                        View work
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
                  </div>

                  {/* Portrait — duotone cutout that the name sits in front of */}
                  <div className="hidden lg:block col-span-5 relative">
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="relative ml-auto w-full max-w-[390px] -mt-[10rem] xl:-mt-[12rem] -mr-2"
                    >
                      {/* Registration frame, offset off the image edge */}
                      <span
                        aria-hidden
                        className="absolute top-6 -right-5 bottom-16 left-10 border border-white/[0.09] pointer-events-none"
                      />
                      <div
                        ref={portraitRef}
                        className="hero-portrait relative aspect-[4/5] w-full"
                        data-cursor="hover"
                      >
                        <img
                          src={profilepic}
                          alt="Vengateshwaran K."
                          className="hero-portrait-img absolute inset-0 w-full h-full object-cover object-[center_18%]"
                        />
                        <div className="portrait-vignette absolute inset-0 pointer-events-none opacity-0" />
                      </div>

                      <div
                        ref={viewfinderRef}
                        className="absolute inset-0 pointer-events-none opacity-0"
                        aria-hidden
                      >
                        <span className="absolute top-4 left-4 w-7 h-7 border-t border-l border-white/40" />
                        <span className="absolute top-4 right-4 w-7 h-7 border-t border-r border-white/40" />
                        <span className="absolute bottom-4 left-4 w-7 h-7 border-b border-l border-white/40" />
                        <span className="absolute bottom-4 right-4 w-7 h-7 border-b border-r border-white/40" />
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* ═══ SIGNATURE: everything named here is deployed and serving
                     traffic right now — the hero's whole claim, stated as fact. ═══ */}
                <motion.div
                  ref={liveRef}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 mt-10 md:mt-14"
                >
                  <div className="hero-rule w-full" />
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-8 pt-5 md:pt-6">
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="hero-live-dot" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                        Running now
                      </span>
                    </div>

                    <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 md:gap-x-12">
                      {running.map((r) => (
                        <li key={r.name}>
                          <a
                            href={r.href}
                            target="_blank"
                            rel="noopener"
                            data-cursor="view"
                            data-cursor-label="Open"
                            className="group block"
                          >
                            <span className="block font-display text-sm md:text-base font-semibold text-white/85 group-hover:text-amber-400 transition-colors">
                              {r.name}
                            </span>
                            <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mt-0.5">
                              {r.what}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-3 shrink-0 font-mono text-[11px] text-white/45">
                      <LiveClock />
                      <span className="w-px h-4 bg-white/10" />
                      <span className="flex items-center gap-1.5 text-emerald-400/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Available
                      </span>
                    </div>
                  </div>
                </motion.div>
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
                  <span className="text-white">PSG College of Technology</span>. I spent
                  2025 at <span className="text-white">Prodoc AI</span> building a
                  production analytics dashboard on React, Node, and Redis.
                </p>
              </div>
            </div>
          </div>

          {/* Horizon line sweep (scroll transition) */}
          <div ref={horizonRef} className="hero-horizon hidden md:block" aria-hidden />
        </div>
      </div>
    </section>
  )
}

export default Hero
