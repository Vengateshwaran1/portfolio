import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import profilepic from '../assets/profile.png'
import Reveal from './primitives/Reveal'
import SplitText from './primitives/SplitText'

const HoloPortrait = () => {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 140, damping: 18 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 140, damping: 18 })

  // Per-layer parallax depth (hooks at top level — one set per layer)
  const bgX = useTransform(mx, [-0.5, 0.5], [-8, 8])
  const bgY = useTransform(my, [-0.5, 0.5], [-8, 8])
  const portraitX = useTransform(mx, [-0.5, 0.5], [-18, 18])
  const portraitY = useTransform(my, [-0.5, 0.5], [-18, 18])
  const sheenX = useTransform(mx, [-0.5, 0.5], [-35, 35])
  const sheenY = useTransform(my, [-0.5, 0.5], [-35, 35])
  const chipX = useTransform(mx, [-0.5, 0.5], [-28, 28])
  const chipY = useTransform(my, [-0.5, 0.5], [-28, 28])
  const orbX = useTransform(mx, [-0.5, 0.5], [-45, 45])
  const orbY = useTransform(my, [-0.5, 0.5], [-45, 45])

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
      className="relative aspect-[4/5] perspective-1200 [transform-style:preserve-3d] cursor-none"
      data-cursor="hover"
    >
      {/* Aurora backdrop */}
      <motion.div
        style={{ x: bgX, y: bgY, transform: 'translateZ(-40px)' }}
        className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-amber-400/30 via-violet-500/10 to-transparent blur-2xl"
      />

      {/* Holo frame */}
      <div className="relative h-full rounded-3xl overflow-hidden glass-metallic shadow-glass">
        {/* Animated mesh-grid pattern */}
        <motion.div
          style={{ x: bgX, y: bgY }}
          className="absolute inset-0 opacity-25"
        >
          <div className="absolute inset-0 bg-grid-faint [background-size:48px_48px] animate-gridPan" />
        </motion.div>

        {/* Portrait */}
        <motion.img
          src={profilepic}
          alt="Vengateshwaran K."
          style={{ x: portraitX, y: portraitY, scale: 1.05 }}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Color sheen overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/15 via-transparent to-silver-200/10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent" />

        {/* Moving rainbow sheen */}
        <motion.div
          style={{ x: sheenX, y: sheenY }}
          className="pointer-events-none absolute -inset-20"
        >
          <div className="absolute top-0 left-1/4 w-[140%] h-px bg-gradient-to-r from-transparent via-white/60 to-transparent rotate-[-25deg]" />
          <div className="absolute top-1/2 left-1/4 w-[140%] h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent rotate-[-25deg]" />
        </motion.div>

        {/* HUD: corner brackets */}
        <Bracket pos="top-left" />
        <Bracket pos="top-right" />
        <Bracket pos="bottom-left" />
        <Bracket pos="bottom-right" />

        {/* HUD: top scan-line */}
        <motion.div
          initial={{ y: '0%' }}
          animate={{ y: ['0%', '100%', '0%'] }}
          transition={{ duration: 6, ease: 'linear', repeat: Infinity }}
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/80 to-transparent shadow-[0_0_18px_rgba(167,139,250,0.8)]"
        />

        {/* HUD: meta strip (top) */}
        <motion.div
          style={{ x: chipX, y: chipY }}
          className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.3em] text-white/70"
        >
          <span className="px-2 py-1 rounded-md glass border-white/10">VK · 001</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online
          </span>
        </motion.div>

        {/* Footer plate */}
        <motion.div
          style={{ x: chipX, y: chipY }}
          className="absolute bottom-5 left-5 right-5 flex items-end justify-between"
        >
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-400 mb-1">
              Based in
            </div>
            <div className="font-display text-white text-2xl font-bold">Coimbatore, IN</div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
              11.0168°N · 76.9558°E
            </div>
          </div>
        </motion.div>

        {/* Floating monogram orb (front-most) */}
        <motion.div
          style={{ x: orbX, y: orbY, transform: 'translateZ(60px)' }}
          className="absolute bottom-5 right-5"
        >
          <div className="relative w-14 h-14 rounded-full gradient-amber grid place-items-center text-ink-950 font-display font-bold text-lg shadow-amber animate-float">
            V
            <span className="absolute inset-0 rounded-full border border-white/30" />
            <span className="absolute -inset-1 rounded-full border border-amber-400/30 animate-pulseRing" />
          </div>
        </motion.div>
      </div>

      {/* Floating side accents */}
      <motion.div
        style={{ x: orbX, y: orbY }}
        className="absolute -left-4 top-1/3 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full glass-metallic font-mono text-[10px] uppercase tracking-[0.25em] text-white/80"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        MERN · Cybersec
      </motion.div>
      <motion.div
        style={{ x: chipX, y: chipY }}
        className="absolute -right-4 top-1/2 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full glass-metallic font-mono text-[10px] uppercase tracking-[0.25em] text-white/80"
      >
        CGPA · 6.83
      </motion.div>
    </motion.div>
  )
}

const Bracket = ({ pos }) => {
  const map = {
    'top-left': 'top-3 left-3 border-t border-l',
    'top-right': 'top-3 right-3 border-t border-r',
    'bottom-left': 'bottom-3 left-3 border-b border-l',
    'bottom-right': 'bottom-3 right-3 border-b border-r',
  }
  return <span className={`absolute w-5 h-5 ${map[pos]} border-amber-400/70`} aria-hidden />
}

const About = () => {
  return (
    <section id="about" className="relative py-32 md:py-44">
      <div className="container-x grid grid-cols-12 gap-8 md:gap-16 items-center">
        <div className="col-span-12 md:col-span-5">
          <Reveal>
            <HoloPortrait />
          </Reveal>
        </div>

        <div className="col-span-12 md:col-span-7">
          <Reveal delay={0.1}>
            <p className="eyebrow mb-6">— 01 / About</p>
          </Reveal>
          <h2 className="display-lg text-white text-balance">
            <SplitText by="word" stagger={0.06}>A developer who</SplitText>{' '}
            <span className="gradient-text">
              <SplitText by="word" stagger={0.06} delay={0.15}>obsesses over</SplitText>{' '}
              <SplitText by="word" stagger={0.06} delay={0.3}>the details.</SplitText>
            </span>
          </h2>
          <Reveal delay={0.3}>
            <p className="mt-7 text-white/65 text-lg md:text-xl leading-relaxed text-pretty">
              I&apos;m <span className="text-white">Vengateshwaran K.</span>, a MERN-stack
              developer pursuing an Integrated <span className="text-white">M.Sc. in Cyber Security</span>
              {' '}at <span className="text-white">PSG College of Technology</span>.
              Currently interning at <span className="text-white">Prodoc AI</span> — building
              dynamic, user-friendly applications with a focus on innovative design and UX.
            </p>
          </Reveal>

          <Reveal delay={0.45}>
            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { k: 'Focus', v: 'Web & Cybersecurity' },
                { k: 'Stack', v: 'MERN · Docker · AWS' },
                { k: 'Status', v: 'Intern @ Prodoc AI' },
              ].map((i) => (
                <motion.div
                  key={i.k}
                  whileHover={{ y: -4 }}
                  className="glass rounded-2xl p-4 md:p-5"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-400/80">
                    {i.k}
                  </div>
                  <div className="mt-2 text-white font-medium text-sm md:text-base">
                    {i.v}
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Tech marquee */}
      <Marquee />
    </section>
  )
}

import { DiHtml5, DiCss3, DiJavascript1, DiReact, DiNodejsSmall, DiPython, DiGit, DiMongodb } from 'react-icons/di'
import { SiCplusplus, SiTailwindcss, SiOracle, SiDocker, SiExpress, SiPostman, SiAmazonec2, SiSocketdotio, SiRedis } from 'react-icons/si'

const techs = [
  { Icon: DiReact, name: 'React' },
  { Icon: DiNodejsSmall, name: 'Node.js' },
  { Icon: SiExpress, name: 'Express' },
  { Icon: DiMongodb, name: 'MongoDB' },
  { Icon: DiJavascript1, name: 'JavaScript' },
  { Icon: DiPython, name: 'Python' },
  { Icon: SiCplusplus, name: 'C++' },
  { Icon: SiOracle, name: 'Oracle' },
  { Icon: SiDocker, name: 'Docker' },
  { Icon: SiAmazonec2, name: 'AWS EC2' },
  { Icon: SiSocketdotio, name: 'Socket.io' },
  { Icon: SiRedis, name: 'Redis' },
  { Icon: SiPostman, name: 'Postman' },
  { Icon: DiGit, name: 'Git' },
  { Icon: SiTailwindcss, name: 'Tailwind' },
  { Icon: DiHtml5, name: 'HTML' },
  { Icon: DiCss3, name: 'CSS' },
]

const Row = ({ reverse }) => (
  <div className="flex shrink-0 items-center gap-12 px-6" style={{ animationDirection: reverse ? 'reverse' : 'normal' }}>
    {techs.map(({ Icon, name }, i) => (
      <div key={i} className="flex items-center gap-3 text-white/40 hover:text-amber-400 transition-colors group">
        <Icon className="text-3xl md:text-5xl group-hover:scale-110 transition-transform" />
        <span className="font-display text-xl md:text-3xl tracking-tight">{name}</span>
        <span className="text-amber-400/40 mx-3">/</span>
      </div>
    ))}
  </div>
)

const Marquee = () => (
  <div className="relative mt-24 md:mt-32">
    <div className="ring-divider mb-12" />
    <div className="flex w-max animate-marquee will-change-transform">
      <Row />
      <Row />
    </div>
    {/* Fade edges */}
    <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-ink-950 to-transparent z-10" />
    <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-ink-950 to-transparent z-10" />
  </div>
)

export default About
