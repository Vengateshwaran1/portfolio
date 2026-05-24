import { Suspense, lazy, useState } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { HiArrowDownTray, HiArrowUpRight } from 'react-icons/hi2'
import { AiOutlineGithub, AiOutlineLinkedin, AiOutlineInstagram } from 'react-icons/ai'
import MagneticButton from './primitives/MagneticButton'
import SplitText from './primitives/SplitText'
import ResumeModal from './ResumeModal'
import { scrollTo } from './providers/LenisProvider'

const Hero3DScene = lazy(() => import('./Hero3DScene'))

const socials = [
  { icon: AiOutlineGithub, href: 'https://github.com/Vengateshwaran1', label: 'GitHub' },
  { icon: AiOutlineLinkedin, href: 'https://www.linkedin.com/in/vengateshwaran-k', label: 'LinkedIn' },
  { icon: AiOutlineInstagram, href: 'https://www.instagram.com/vengateshwaran_', label: 'Instagram' },
]

const Hero = () => {
  const [resumeOpen, setResumeOpen] = useState(false)
  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center pt-28 md:pt-32 overflow-hidden">
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
      <Suspense fallback={null}>
        <div className="hidden md:block absolute right-[-8%] top-1/2 -translate-y-1/2 w-[60%] aspect-square">
          <Hero3DScene />
        </div>
      </Suspense>
      {/* Mobile-only glow accent in place of 3D scene */}
      <div className="md:hidden absolute top-24 -right-20 w-[420px] h-[420px] rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />

      <div className="container-x relative z-10 w-full">
        <div className="grid grid-cols-12 gap-6 items-center">
          <div className="col-span-12 md:col-span-7 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="flex items-center gap-3 mb-7"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.8)]" />
              <span className="eyebrow">Interning @ Prodoc AI · 2026</span>
            </motion.div>

            <h1 className="display-xl text-white text-balance">
              <SplitText by="word" stagger={0.08}>Crafting</SplitText>{' '}
              <SplitText by="word" stagger={0.08} delay={0.15} className="gradient-text">premium</SplitText>{' '}
              <SplitText by="word" stagger={0.08} delay={0.3}>digital</SplitText>
              <br />
              <SplitText by="word" stagger={0.08} delay={0.45}>experiences.</SplitText>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="mt-7 flex items-center gap-4 text-white/70"
            >
              <span className="text-sm md:text-base font-mono uppercase tracking-widest">I&apos;m</span>
              <span className="h-px w-10 bg-white/30" />
              <TypeAnimation
                sequence={[
                  'Vengateshwaran K.',
                  2000,
                  'a Full-stack Developer.',
                  2000,
                  'a Security Student.',
                  2000,
                  'a Problem Solver.',
                  2000,
                ]}
                repeat={Infinity}
                speed={55}
                className="text-lg md:text-2xl font-display font-medium text-white"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="mt-6 text-white/55 text-base md:text-lg max-w-xl text-pretty"
            >
              I design and build fast, accessible, and beautiful web products —
              from the React side of the interface to the Node backbone behind it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.45 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                onClick={() => scrollTo('#work')}
                data-cursor="view"
                data-cursor-label="See Work"
                className="group px-7 py-4 rounded-full bg-amber-400 text-ink-950 font-semibold shadow-amber hover:shadow-ring transition-shadow"
              >
                See My Work
                <HiArrowUpRight className="ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MagneticButton>

              <MagneticButton
                onClick={() => setResumeOpen(true)}
                data-cursor="hover"
                data-cursor-label="Preview"
                className="group px-7 py-4 rounded-full glass text-white font-medium border border-white/10 hover:border-amber-400/50 transition-colors"
              >
                <HiArrowDownTray className="mr-2" />
                Resume
              </MagneticButton>

              <div className="flex items-center gap-2 ml-2">
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
                    className="w-11 h-11 rounded-full glass grid place-items-center text-white/80 hover:text-amber-400 transition-colors"
                  >
                    <Icon size={20} />
                  </MagneticButton>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.7 }}
              className="mt-14 flex items-center gap-8 text-white/40 text-sm"
            >
              <Stat n="3+" label="Years coding" />
              <Stat n="12+" label="Projects shipped" />
              <Stat n="∞" label="Coffee" />
            </motion.div>
          </div>

          {/* Right reserved for 3D scene; on mobile keep balance */}
          <div className="hidden md:block col-span-5" />
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-amber-400 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}

const Stat = ({ n, label }) => (
  <motion.div whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 280, damping: 18 }} className="group">
    <div className="font-display text-2xl md:text-3xl gradient-metallic transition-all group-hover:tracking-wide">{n}</div>
    <div className="font-mono text-[10px] uppercase tracking-[0.25em] mt-1 group-hover:text-amber-400/80 transition-colors">{label}</div>
  </motion.div>
)

export default Hero
