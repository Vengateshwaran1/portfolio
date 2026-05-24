import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { HiArrowDownTray, HiArrowUpRight } from 'react-icons/hi2'
import { AiOutlineGithub, AiOutlineLinkedin, AiOutlineInstagram } from 'react-icons/ai'
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

const Hero = () => {
  const [resumeOpen, setResumeOpen] = useState(false)
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const introRef = useRef(null)
  const aboutRef = useRef(null)
  const aboutHeadlineRef = useRef(null)
  const aboutBioRef = useRef(null)
  const portraitRef = useRef(null)
  const portraitImgRef = useRef(null)
  const viewfinderRef = useRef(null)
  const scrollHintRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const pin = pinRef.current
    if (!section || !pin) return

    const reduce = prefersReducedMotion()
    const mobile = window.matchMedia('(max-width: 767px)').matches

    if (reduce) {
      gsap.set([aboutRef.current, viewfinderRef.current, aboutHeadlineRef.current, aboutBioRef.current], {
        opacity: 1,
        y: 0,
      })
      return
    }

    const refresh = () => ScrollTrigger.refresh()
    portraitImgRef.current?.addEventListener('load', refresh)
    if (portraitImgRef.current?.complete) refresh()

    const ctx = gsap.context(() => {
      if (!mobile) {
        gsap.set([aboutHeadlineRef.current, aboutBioRef.current], { opacity: 0, y: 48 })
      }

      if (mobile) {
        gsap.from(portraitImgRef.current, {
          scale: 1.12,
          duration: 1.2,
          ease: 'power3.out',
        })
        gsap.from(viewfinderRef.current, { opacity: 0, duration: 0.8, delay: 0.4 })

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

        gsap.to(portraitImgRef.current, {
          scale: 1.28,
          ease: 'none',
          scrollTrigger: {
            trigger: portraitRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        })
        return
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=240%',
          pin: pin,
          scrub: 1.1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      tl.fromTo(
        portraitImgRef.current,
        { scale: 1.08, yPercent: 0 },
        { scale: 1.55, yPercent: -4, ease: 'none' },
        0
      )
      tl.fromTo(
        portraitRef.current,
        { borderRadius: '1.5rem' },
        { borderRadius: '0.875rem', ease: 'none' },
        0
      )
      tl.fromTo(viewfinderRef.current, { opacity: 0 }, { opacity: 1, ease: 'none' }, 0.12)
      tl.fromTo(
        portraitRef.current?.querySelector('.portrait-vignette'),
        { opacity: 0 },
        { opacity: 1, ease: 'none' },
        0.15
      )
      tl.to(introRef.current, { opacity: 0, y: -48, filter: 'blur(6px)', ease: 'none' }, 0.18)
      tl.to(scrollHintRef.current, { opacity: 0, ease: 'none' }, 0.1)
      tl.fromTo(
        aboutRef.current,
        { opacity: 0, pointerEvents: 'none' },
        { opacity: 1, pointerEvents: 'auto', ease: 'none' },
        0.22
      )
      tl.fromTo(
        aboutHeadlineRef.current,
        { opacity: 0, y: 56 },
        { opacity: 1, y: 0, ease: 'none' },
        0.28
      )
      tl.fromTo(
        aboutBioRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, ease: 'none' },
        0.42
      )
    }, section)

    return () => {
      portraitImgRef.current?.removeEventListener('load', refresh)
      ctx.revert()
    }
  }, [])

  return (
    <section id="hero" ref={sectionRef} className="relative">
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />

      <div className="md:h-[340vh] h-auto">
        <div
          ref={pinRef}
          className="md:min-h-[100dvh] min-h-0 md:flex md:items-center relative pt-28 md:pt-32 pb-16 md:pb-0"
        >
          <div className="container-x w-full">
            <div className="grid grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="col-span-12 lg:col-span-6 relative min-h-[320px] md:min-h-[420px]">
                <div ref={introRef} className="md:absolute md:inset-0 flex flex-col justify-center">
                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="eyebrow mb-6 md:mb-8"
                  >
                    Full-stack Developer
                  </motion.p>

                  <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="display-xl text-white text-balance"
                  >
                    Vengateshwaran{' '}
                    <span className="gradient-text">K.</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.45 }}
                    className="mt-6 md:mt-8 text-xl md:text-2xl font-display font-medium text-white/90 tracking-tight"
                  >
                    Crafting refined digital experiences.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.55 }}
                    className="mt-4 text-white/50 text-base md:text-lg max-w-lg text-pretty leading-relaxed"
                  >
                    I design and build fast, accessible web products — from polished
                    React interfaces to reliable Node backends.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="mt-9 md:mt-11 flex flex-wrap items-center gap-4"
                  >
                    <MagneticButton
                      onClick={() => scrollTo('#work')}
                      data-cursor="view"
                      data-cursor-label="See Work"
                      className="group px-7 py-4 rounded-full bg-amber-400 text-ink-950 font-semibold shadow-amber hover:shadow-ring transition-shadow"
                    >
                      View Work
                      <HiArrowUpRight className="ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </MagneticButton>

                    <MagneticButton
                      onClick={() => setResumeOpen(true)}
                      data-cursor="hover"
                      data-cursor-label="Preview"
                      className="group px-7 py-4 rounded-full glass text-white font-medium border border-white/10 hover:border-amber-400/40 transition-colors"
                    >
                      <HiArrowDownTray className="mr-2" />
                      Resume
                    </MagneticButton>

                    <div className="flex items-center gap-2 ml-1">
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
                          className="w-11 h-11 rounded-full glass grid place-items-center text-white/70 hover:text-amber-400 transition-colors"
                        >
                          <Icon size={20} />
                        </MagneticButton>
                      ))}
                    </div>
                  </motion.div>
                </div>

                <div
                  id="about"
                  ref={aboutRef}
                  className="md:absolute md:inset-0 flex flex-col justify-center mt-12 md:mt-0 md:opacity-0"
                >
                  <div ref={aboutHeadlineRef}>
                    <p className="eyebrow mb-5">About</p>
                    <h2 className="display-lg text-white text-balance">
                      A developer who{' '}
                      <span className="gradient-text">obsesses over the details.</span>
                    </h2>
                  </div>
                  <p
                    ref={aboutBioRef}
                    className="mt-6 text-white/60 text-lg md:text-xl leading-relaxed text-pretty max-w-xl"
                  >
                    I&apos;m a MERN-stack developer pursuing an Integrated{' '}
                    <span className="text-white">M.Sc. in Cyber Security</span> at{' '}
                    <span className="text-white">PSG College of Technology</span>.
                    Currently interning at <span className="text-white">Prodoc AI</span> —
                    building dynamic applications with a focus on design and UX.
                  </p>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-6">
                <div
                  ref={portraitRef}
                  className="relative aspect-[4/5] max-w-md mx-auto lg:max-w-none lg:ml-auto w-full overflow-hidden rounded-3xl border border-white/[0.08] shadow-glass bg-ink-900/60 will-change-[border-radius]"
                  data-cursor="hover"
                >
                  <img
                    ref={portraitImgRef}
                    src={profilepic}
                    alt="Vengateshwaran K."
                    className="absolute inset-0 w-full h-full object-cover object-[center_22%] will-change-transform origin-[center_28%]"
                    style={{ transform: 'scale(1.08)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-ink-950/10 to-transparent pointer-events-none z-[1]" />
                  <div className="portrait-vignette absolute inset-0 pointer-events-none z-[1] opacity-0" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.06] pointer-events-none" />
                  <div
                    ref={viewfinderRef}
                    className="absolute inset-0 pointer-events-none opacity-0"
                    aria-hidden
                  >
                    <span className="absolute top-5 left-5 w-8 h-8 border-t border-l border-white/40" />
                    <span className="absolute top-5 right-5 w-8 h-8 border-t border-r border-white/40" />
                    <span className="absolute bottom-5 left-5 w-8 h-8 border-b border-l border-white/40" />
                    <span className="absolute bottom-5 right-5 w-8 h-8 border-b border-r border-white/40" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>

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
